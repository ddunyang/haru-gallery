import DogCharacter from './DogCharacter';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-eyebrow">Haru's Daily Life</span>
        <div className="header-title-row">
          <DogCharacter className="header-dog" size={84} />
          <h1 className="header-title">하루 일상</h1>
        </div>
        <div className="header-divider" />
        <p className="header-subtitle">강아지 하루의 사랑스러운 일상 속 소중한 순간들</p>
      </div>
    </header>
  );
}

export default Header;
