import './EmptyState.css';

function EmptyState() {
  return (
    <div className="empty-state">
      <svg
        className="empty-state-dog"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Tail */}
        <path
          d="M 148 138 Q 176 115 170 92"
          stroke="#E59866"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />
        {/* Body */}
        <ellipse cx="100" cy="148" rx="52" ry="42" fill="#F5CBA7" />
        {/* Left ear (behind head) */}
        <ellipse
          cx="63"
          cy="62"
          rx="17"
          ry="28"
          fill="#E59866"
          transform="rotate(-15 63 62)"
        />
        {/* Right ear (behind head) */}
        <ellipse
          cx="137"
          cy="62"
          rx="17"
          ry="28"
          fill="#E59866"
          transform="rotate(15 137 62)"
        />
        {/* Head */}
        <circle cx="100" cy="88" r="44" fill="#F5CBA7" />
        {/* Left eye */}
        <circle cx="84" cy="82" r="7" fill="#2C3E50" />
        {/* Right eye */}
        <circle cx="116" cy="82" r="7" fill="#2C3E50" />
        {/* Eye shine left */}
        <circle cx="87" cy="79" r="2.5" fill="white" />
        {/* Eye shine right */}
        <circle cx="119" cy="79" r="2.5" fill="white" />
        {/* Nose */}
        <ellipse cx="100" cy="98" rx="7" ry="5" fill="#2C3E50" />
        {/* Smile */}
        <path
          d="M 88 108 Q 100 118 112 108"
          stroke="#2C3E50"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left front leg */}
        <rect x="72" y="178" width="17" height="18" rx="8" fill="#F5CBA7" />
        {/* Right front leg */}
        <rect x="111" y="178" width="17" height="18" rx="8" fill="#F5CBA7" />
      </svg>
      <p className="empty-state-text">등록된 콘텐츠가 없습니다.</p>
    </div>
  );
}

export default EmptyState;
