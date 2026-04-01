// ============================================================
// 📷 사진 등록 방법
//   Notion DB (334fb4c819b38038ad45e080de3073a0)에서 자동으로 불러옵니다.
//   페이지 제목(title)이 alt/caption으로 사용됩니다.
//   이미지는 페이지 본문의 첫 번째 이미지 블록에서 가져옵니다.
// ============================================================

export interface Photo {
  id: string;
  filename: string;
  thumbnail: string;
  alt: string;
  caption?: string;
}

export const photos: Photo[] = [];

// ============================================================
// 🏥 진료기록 등록 방법
//   Notion DB (334fb4c819b380369703fb51bf261229)에서 자동으로 불러옵니다.
//   date(날짜)와 title(제목) 필드를 사용합니다.
// ============================================================

export interface MedicalRecord {
  id: string;
  date: string;
  title: string;
}

export const medicalRecords: MedicalRecord[] = [];

