interface DogTreatProps {
  x: number;
  y: number;
}

function DogTreat({ x, y }: DogTreatProps) {
  return (
    <svg
      className="dog-treat"
      style={{
        position: 'fixed',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      width={48}
      height={30}
      viewBox="0 0 80 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bone bar */}
      <rect x="18" y="16" width="44" height="16" rx="8" fill="#C8965A" />
      {/* Left top knob */}
      <circle cx="20" cy="16" r="12" fill="#C8965A" />
      {/* Left bottom knob */}
      <circle cx="20" cy="32" r="12" fill="#C8965A" />
      {/* Right top knob */}
      <circle cx="60" cy="16" r="12" fill="#C8965A" />
      {/* Right bottom knob */}
      <circle cx="60" cy="32" r="12" fill="#C8965A" />
      {/* Highlight sheen */}
      <circle cx="14" cy="11" r="4" fill="rgba(255,255,255,0.38)" />
      <circle cx="66" cy="11" r="4" fill="rgba(255,255,255,0.38)" />
      <rect x="28" y="17" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

export default DogTreat;
