// scripts/fetchNotionData.mjs
// Fetches photo and medical record data from Notion DBs at build time.
// Requires environment variables:
//   NOTION_TOKEN          — Notion Internal Integration Secret
//   NOTION_PHOTO_DB_ID    — (optional) Notion photo database ID
//   NOTION_MEDICAL_DB_ID  — (optional) Notion medical records database ID

import { Client } from '@notionhq/client';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

const NOTION_TOKEN = process.env.NOTION_TOKEN;
if (!NOTION_TOKEN) {
  console.error('Error: NOTION_TOKEN environment variable is not set.');
  process.exit(1);
}

// These DB IDs are specific to this project and safe to include as defaults.
const PHOTO_DB_ID =
  process.env.NOTION_PHOTO_DB_ID ?? '334fb4c819b38038ad45e080de3073a0';
const MEDICAL_DB_ID =
  process.env.NOTION_MEDICAL_DB_ID ?? '334fb4c819b380369703fb51bf261229';

const PHOTOS_DIR = join(__dirname, '../public/haru/photos');
const THUMBNAILS_DIR = join(PHOTOS_DIR, 'thumbnails');

/** Max width/height for thumbnail images (px). */
const THUMBNAIL_SIZE = 400;

const notion = new Client({ auth: NOTION_TOKEN });

/** Download a remote file and save it to disk, skipping if already present. */
async function downloadFile(url, filepath) {
  if (existsSync(filepath)) {
    console.log(`  Skipping (already exists): ${filepath}`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.statusText}`);
  const buffer = await res.arrayBuffer();
  writeFileSync(filepath, Buffer.from(buffer));
}

/**
 * Generate a thumbnail (WebP, max THUMBNAIL_SIZE px on longest side) from
 * the source file, saving it to THUMBNAILS_DIR with a `.webp` extension.
 * Skips generation if the thumbnail already exists.
 */
async function generateThumbnail(srcPath, thumbFilename) {
  const thumbPath = join(THUMBNAILS_DIR, thumbFilename);
  if (existsSync(thumbPath)) {
    console.log(`  Thumbnail exists, skipping: ${thumbFilename}`);
    return;
  }
  await sharp(srcPath)
    .rotate()
    .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbPath);
  console.log(`  Thumbnail generated: ${thumbFilename}`);
}

/** Extract the file extension from a URL path, defaulting to 'jpg'. */
function extractExt(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = pathname.split('.').pop()?.toLowerCase() ?? '';
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext) ? ext : 'jpg';
  } catch {
    return 'jpg';
  }
}

async function fetchAllPages(databaseId) {
  const pages = [];
  let cursor = undefined;
  do {
    const res = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function processPage(page) {
  // Extract caption property (rich_text type)
  const captionProp = page.properties?.caption ?? page.properties?.Caption;
  let caption = '';
  if (captionProp?.type === 'rich_text' && captionProp.rich_text.length > 0) {
    caption = captionProp.rich_text.map((t) => t.plain_text).join('');
  }

  // Find the first image block in the page body
  let imageUrl = null;
  let blockCursor = undefined;
  outer: do {
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blockCursor,
      page_size: 100,
    });
    for (const block of blocks.results) {
      if (block.type === 'image') {
        const img = block.image;
        imageUrl =
          img.type === 'file' ? img.file.url : (img.external?.url ?? null);
        break outer;
      }
    }
    blockCursor = blocks.has_more ? blocks.next_cursor : undefined;
  } while (blockCursor);

  if (!imageUrl) {
    console.warn(`Page ${page.id}: no image found, skipping.`);
    return null;
  }

  const ext = extractExt(imageUrl);
  const filename = `photo_${page.id.replace(/-/g, '')}.${ext}`;
  const filepath = join(PHOTOS_DIR, filename);

  console.log(`Downloading: ${filename}`);
  await downloadFile(imageUrl, filepath);

  const thumbFilename = `photo_${page.id.replace(/-/g, '')}_thumb.webp`;
  await generateThumbnail(filepath, thumbFilename);

  return {
    id: page.id,
    filename,
    thumbnail: `thumbnails/${thumbFilename}`,
    alt: caption || '하루',
    ...(caption ? { caption } : {}),
  };
}

async function fetchPhotos() {
  mkdirSync(PHOTOS_DIR, { recursive: true });
  mkdirSync(THUMBNAILS_DIR, { recursive: true });

  const pages = await fetchAllPages(PHOTO_DB_ID);
  console.log(`Found ${pages.length} pages in Notion photo DB.`);

  // Process pages in parallel with a concurrency limit of 5
  const CONCURRENCY = 5;
  const results = [];
  for (let i = 0; i < pages.length; i += CONCURRENCY) {
    const batch = pages.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(processPage));
    results.push(...batchResults);
  }

  return results.filter(Boolean);
}

async function fetchMedicalRecords() {
  const pages = await fetchAllPages(MEDICAL_DB_ID);
  console.log(`Found ${pages.length} pages in Notion medical DB.`);

  const records = [];
  for (const page of pages) {
    // Extract title (Notion title property)
    const titleProp =
      page.properties?.title ??
      page.properties?.Title ??
      page.properties?.['이름'] ??
      page.properties?.['Name'];
    let title = '';
    if (titleProp?.type === 'title' && titleProp.title.length > 0) {
      title = titleProp.title.map((t) => t.plain_text).join('');
    }

    // Extract date property
    const dateProp =
      page.properties?.date ??
      page.properties?.Date ??
      page.properties?.['날짜'];
    let date = '';
    if (dateProp?.type === 'date' && dateProp.date?.start) {
      date = dateProp.date.start;
    }

    if (!title || !date) continue;

    records.push({ id: page.id, date, title });
  }

  // Sort by date descending (most recent first)
  records.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

  return records;
}

async function main() {
  console.log('Fetching photos from Notion…');
  const photos = await fetchPhotos();
  console.log(`Generated ${photos.length} photo entries.`);

  console.log('Fetching medical records from Notion…');
  const medicalRecords = await fetchMedicalRecords();
  console.log(`Generated ${medicalRecords.length} medical record entries.`);

  const mediaDataPath = join(__dirname, '../src/data/mediaData.ts');
  const content = `// Auto-generated by scripts/fetchNotionData.mjs — do not edit manually

export interface Photo {
  id: string;
  filename: string;
  thumbnail: string;
  alt: string;
  caption?: string;
}

export const photos: Photo[] = ${JSON.stringify(photos, null, 2)};

export interface MedicalRecord {
  id: string;
  date: string;
  title: string;
}

export const medicalRecords: MedicalRecord[] = ${JSON.stringify(medicalRecords, null, 2)};
`;

  writeFileSync(mediaDataPath, content, 'utf-8');
  console.log('Wrote src/data/mediaData.ts');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
