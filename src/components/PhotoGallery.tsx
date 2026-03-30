import './PhotoGallery.css';

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    alt: '하루의 산책',
    caption: '🌿 산책하는 하루',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80',
    alt: '하루의 낮잠',
    caption: '😴 낮잠 자는 하루',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80',
    alt: '하루의 공원 나들이',
    caption: '🌸 공원 나들이',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80',
    alt: '하루의 바다 여행',
    caption: '🌊 바다 여행',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    alt: '하루와 친구들',
    caption: '🐶 친구들과 함께',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1583512603806-077998240c7a?w=600&q=80',
    alt: '하루의 행복한 표정',
    caption: '😊 행복한 하루',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80',
    alt: '하루의 달리기',
    caption: '🏃 신나게 달리는 하루',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&crop=entropy&sig=2',
    alt: '하루의 포즈',
    caption: '📸 포즈 취하는 하루',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=600&q=80',
    alt: '하루의 귀여운 얼굴',
    caption: '🐾 귀여운 하루',
  },
];

function PhotoGallery() {
  return (
    <section className="photo-gallery">
      <h2 className="section-title">📷 사진 갤러리</h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <div className="photo-wrapper">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placedog.net/600/400?id=${photo.id}`;
                }}
              />
            </div>
            <p className="photo-caption">{photo.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PhotoGallery;
