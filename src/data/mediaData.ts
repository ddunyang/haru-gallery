// ============================================================
// 📷 사진 등록 방법
//   1. public/haru/photos/ 폴더에 사진 파일을 넣으세요.
//   2. 아래 photos 배열에 항목을 추가하세요.
//
// 예시:
//   { id: 1, filename: 'photo1.jpg', alt: '하루', caption: '🐾 하루의 산책' },
// ============================================================

export interface Photo {
  id: string;
  filename: string;
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

