// ============================================================
// 📷 사진 등록 방법
//   1. public/haru/photos/ 폴더에 사진 파일을 넣으세요.
//   2. 아래 photos 배열에 항목을 추가하세요.
//
// 예시:
//   { id: 1, filename: 'photo1.jpg', alt: '하루', caption: '🐾 하루의 산책' },
// ============================================================

export interface Photo {
  id: number;
  filename: string;
  alt: string;
  caption?: string;
}

export const photos: Photo[] = [
  // 여기에 사진 정보를 추가하세요.
];

// ============================================================
// 🎬 영상 등록 방법
//   1. public/haru/videos/ 폴더에 영상 파일을 넣으세요.
//   2. 아래 videos 배열에 항목을 추가하세요.
//
// 예시:
//   { id: 1, filename: 'video1.mp4', title: '하루 영상', caption: '🎬 하루의 하루' },
// ============================================================

export interface Video {
  id: number;
  filename: string;
  title: string;
  caption?: string;
}

export const videos: Video[] = [
  // 여기에 영상 정보를 추가하세요.
];
