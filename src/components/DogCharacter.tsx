type DogExpression = 'neutral' | 'happy' | 'sad' | 'eating';

interface DogCharacterProps {
  size?: number;
  className?: string;
  expression?: DogExpression;
}

function DogCharacter({ size = 110, className, expression = 'neutral' }: DogCharacterProps) {
  const isSad = expression === 'sad';
  const isHappy = expression === 'happy';
  const isEating = expression === 'eating';

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Tail */}
      <path
        d="M 148 138 Q 176 115 170 92"
        stroke="#DDD0BC"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      {/* Body */}
      <ellipse cx="100" cy="148" rx="52" ry="42" fill="#F5EFE2" />
      {/* Left ear – droops when sad */}
      <ellipse
        cx={isSad ? 58 : 63}
        cy={isSad ? 68 : 62}
        rx="17"
        ry="28"
        fill="#DDD0BC"
        transform={isSad ? 'rotate(-28 58 68)' : 'rotate(-15 63 62)'}
      />
      {/* Right ear – droops when sad */}
      <ellipse
        cx={isSad ? 142 : 137}
        cy={isSad ? 68 : 62}
        rx="17"
        ry="28"
        fill="#DDD0BC"
        transform={isSad ? 'rotate(28 142 68)' : 'rotate(15 137 62)'}
      />
      {/* Head */}
      <circle cx="100" cy="88" r="44" fill="#F5EFE2" />
      {/* Blush cheeks when happy or eating */}
      {(isHappy || isEating) && (
        <>
          <ellipse cx="73" cy="97" rx="10" ry="7" fill="rgba(255,155,120,0.32)" />
          <ellipse cx="127" cy="97" rx="10" ry="7" fill="rgba(255,155,120,0.32)" />
        </>
      )}
      {/* Eyes */}
      {isEating ? (
        /* Happy squint when eating */
        <>
          <path d="M 78 84 Q 84 77 90 84" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 110 84 Q 116 77 122 84" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="84" cy="82" r="7" fill="#2C3E50" />
          <circle cx="116" cy="82" r="7" fill="#2C3E50" />
          {/* Eye shines – larger when happy, hidden when sad */}
          {!isSad && (
            <>
              <circle cx="87" cy="79" r={isHappy ? 3.5 : 2.5} fill="white" />
              <circle cx="119" cy="79" r={isHappy ? 3.5 : 2.5} fill="white" />
            </>
          )}
        </>
      )}
      {/* Sad brows */}
      {isSad && (
        <>
          <path d="M 78 73 L 90 77" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 110 77 L 122 73" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {/* Nose */}
      <ellipse cx="100" cy="98" rx="7" ry="5" fill="#2C3E50" />
      {/* Mouth – varies by expression */}
      {isSad ? (
        <path
          d="M 88 113 Q 100 106 112 113"
          stroke="#2C3E50"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : isEating ? (
        <>
          {/* Open mouth filled with pink, tongue visible */}
          <path
            d="M 88 106 Q 100 124 112 106"
            stroke="#2C3E50"
            strokeWidth="2.5"
            fill="#C86060"
            strokeLinecap="round"
          />
          <ellipse cx="100" cy="117" rx="7" ry="5" fill="#E06868" />
        </>
      ) : isHappy ? (
        <path
          d="M 85 107 Q 100 122 115 107"
          stroke="#2C3E50"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M 88 108 Q 100 118 112 108"
          stroke="#2C3E50"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {/* Left front leg */}
      <rect className="dog-leg-left" x="72" y="178" width="17" height="18" rx="8" fill="#F5EFE2" />
      {/* Right front leg */}
      <rect className="dog-leg-right" x="111" y="178" width="17" height="18" rx="8" fill="#F5EFE2" />
    </svg>
  );
}

export default DogCharacter;
