import DogCharacter from './DogCharacter';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-eyebrow">Dog Gallery</span>
        <div className="header-title-row">
          <DogCharacter className="header-dog" size={84} />
          <h1 className="header-title">하루 갤러리</h1>
        </div>
        <div className="header-divider" />
        <p className="header-subtitle">사랑스러운 강아지 하루의 사진과 영상 모음</p>
      </div>
    </header>
  );
}

export default Header;
