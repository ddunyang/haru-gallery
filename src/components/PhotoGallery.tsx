import './PhotoGallery.css';
import { photos } from '../data/mediaData';
import EmptyState from './EmptyState';

const BASE_URL = import.meta.env.BASE_URL;

function PhotoGallery() {
  return (
    <section className="photo-gallery">
      <h2 className="section-title">📷 사진 갤러리</h2>
      {photos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="photo-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <div className="photo-wrapper">
                <img
                  src={`${BASE_URL}haru/photos/${photo.filename}`}
                  alt={photo.alt}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const wrapper = img.parentElement;
                    if (wrapper && !wrapper.querySelector('.photo-error')) {
                      const err = document.createElement('p');
                      err.className = 'photo-error';
                      err.textContent = `이미지를 불러올 수 없습니다: ${photo.filename}`;
                      wrapper.appendChild(err);
                    }
                  }}
                />
              </div>
              {photo.caption && (
                <p className="photo-caption">{photo.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PhotoGallery;
