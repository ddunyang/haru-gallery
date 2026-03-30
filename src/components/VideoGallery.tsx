import './VideoGallery.css';
import { videos } from '../data/mediaData';
import EmptyState from './EmptyState';

const BASE_URL = import.meta.env.BASE_URL;

function VideoGallery() {
  return (
    <section className="video-gallery">
      <div className="video-gallery-inner">
        <h2 className="section-title">🎬 영상 갤러리</h2>
        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-wrapper">
                  <video
                    src={`${BASE_URL}haru/videos/${video.filename}`}
                    title={video.title}
                    controls
                    preload="metadata"
                    onError={(e) => {
                      const vid = e.currentTarget;
                      vid.style.display = 'none';
                      const wrapper = vid.parentElement;
                      if (wrapper && !wrapper.querySelector('.video-error')) {
                        const err = document.createElement('p');
                        err.className = 'video-error';
                        err.textContent = `영상을 불러올 수 없습니다: ${video.filename}`;
                        wrapper.appendChild(err);
                      }
                    }}
                  />
                </div>
                {video.caption && (
                  <p className="video-caption">{video.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default VideoGallery;
