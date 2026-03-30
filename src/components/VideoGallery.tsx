import './VideoGallery.css';

interface Video {
  id: number;
  embedUrl: string;
  title: string;
  caption: string;
}

const videos: Video[] = [
  {
    id: 1,
    embedUrl: 'https://www.youtube.com/embed/YCaGYUIfdy4',
    title: '강아지 하루의 하루 일상',
    caption: '🌅 하루의 하루 일상 브이로그',
  },
  {
    id: 2,
    embedUrl: 'https://www.youtube.com/embed/yPPiMcXEsHc',
    title: '강아지 놀이',
    caption: '🎾 공을 가지고 노는 하루',
  },
  {
    id: 3,
    embedUrl: 'https://www.youtube.com/embed/ss9UQiTTHKI',
    title: '귀여운 강아지 모음',
    caption: '🐾 귀여운 하루의 순간들',
  },
];

function VideoGallery() {
  return (
    <section className="video-gallery">
      <div className="video-gallery-inner">
        <h2 className="section-title">🎬 영상 갤러리</h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-wrapper">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="video-caption">{video.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoGallery;
