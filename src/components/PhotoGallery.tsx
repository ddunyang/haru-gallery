import { useState, useEffect, useCallback } from 'react';
import './PhotoGallery.css';
import { photos } from '../data/mediaData';
import EmptyState from './EmptyState';

const BASE_URL = import.meta.env.BASE_URL;

type Photo = (typeof photos)[number];

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const closeModal = useCallback(() => setSelectedPhoto(null), []);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto, closeModal]);

  return (
    <>
      <section className="photo-gallery">
        <div className="section-header">
          <span className="section-label">Photos</span>
          <div className="section-line" />
          {photos.length > 0 && (
            <span className="section-count">{photos.length}</span>
          )}
        </div>
        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="photo-grid">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card"
                onClick={() => setSelectedPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPhoto(photo)}
                aria-label={photo.alt}
              >
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
                  {photo.caption && (
                    <div className="photo-overlay">
                      <p className="photo-caption">{photo.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedPhoto && (
        <div
          className="photo-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="원본 이미지 보기"
        >
          <button
            className="photo-modal-close"
            onClick={closeModal}
            aria-label="닫기"
          >
            ✕
          </button>
          <div
            className="photo-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${BASE_URL}haru/photos/${selectedPhoto.filename}`}
              alt={selectedPhoto.alt}
            />
            {selectedPhoto.caption && (
              <p className="photo-modal-caption">{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoGallery;
