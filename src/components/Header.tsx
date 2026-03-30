import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-paw">🐾</span>
        <h1 className="header-title">하루 갤러리</h1>
        <p className="header-subtitle">사랑스러운 강아지 하루의 사진과 영상 모음</p>
      </div>
    </header>
  );
}

export default Header;
