import { useState, useRef, useEffect, useCallback } from 'react';
import DogCharacter from './DogCharacter';
import DogTreat from './DogTreat';
import './Header.css';

type DogExpression = 'neutral' | 'happy' | 'sad' | 'eating';

const FOLLOW_SPEED = 4;   // px per animation frame while following treat
const RETURN_SPEED = 1.5; // px per animation frame while returning home
const REACH_THRESHOLD = 38; // px – distance at which dog "catches" the treat

function Header() {
  const [expression, setExpression] = useState<DogExpression>('neutral');
  const [treatPos, setTreatPos] = useState<{ x: number; y: number } | null>(null);

  const dogWrapperRef = useRef<HTMLDivElement>(null);

  // All mutable animation state lives in a single ref to avoid stale closures
  const s = useRef({
    state: 'idle' as 'idle' | 'following' | 'eating' | 'returning',
    offset: { x: 0, y: 0 },
    naturalPos: null as { x: number; y: number } | null,
    treatTarget: null as { x: number; y: number } | null,
    dragging: false,
    raf: 0,
    eatTimer: null as ReturnType<typeof setTimeout> | null,
  });

  /** Apply pixel offset to the dog wrapper via direct DOM mutation (no re-render) */
  const applyOffset = useCallback((ox: number, oy: number) => {
    s.current.offset = { x: ox, y: oy };
    if (dogWrapperRef.current) {
      dogWrapperRef.current.style.transform = `translate(${ox}px, ${oy}px)`;
    }
  }, []);

  /** Animate dog back to its original position */
  const doReturn = useCallback(() => {
    const { x, y } = s.current.offset;
    const dist = Math.sqrt(x * x + y * y);
    if (dist < 0.5) {
      applyOffset(0, 0);
      s.current.state = 'idle';
      setExpression('neutral');
      return;
    }
    const step = Math.min(RETURN_SPEED, dist);
    applyOffset(x - (x / dist) * step, y - (y / dist) * step);
    s.current.raf = requestAnimationFrame(doReturn);
  }, [applyOffset]);

  /** Animate dog toward treat position */
  const doFollow = useCallback(() => {
    if (s.current.state !== 'following') return;
    const { naturalPos, treatTarget, offset } = s.current;
    if (!naturalPos || !treatTarget) return;

    const dx = treatTarget.x - (naturalPos.x + offset.x);
    const dy = treatTarget.y - (naturalPos.y + offset.y);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < REACH_THRESHOLD) {
      // Dog caught the treat!
      s.current.state = 'eating';
      s.current.dragging = false;
      setExpression('eating');
      setTreatPos(null);
      s.current.treatTarget = null;

      s.current.eatTimer = setTimeout(() => {
        s.current.state = 'returning';
        setExpression('neutral');
        s.current.raf = requestAnimationFrame(doReturn);
      }, 2500);
      return;
    }

    const step = Math.min(FOLLOW_SPEED, dist);
    applyOffset(offset.x + (dx / dist) * step, offset.y + (dy / dist) * step);
    s.current.raf = requestAnimationFrame(doFollow);
  }, [applyOffset, doReturn]);

  const onStart = useCallback(
    (cx: number, cy: number) => {
      if (s.current.state === 'eating') return;

      cancelAnimationFrame(s.current.raf);
      if (s.current.eatTimer !== null) clearTimeout(s.current.eatTimer);

      // Capture the dog's natural (layout) centre once, accounting for any existing offset
      if (dogWrapperRef.current) {
        const r = dogWrapperRef.current.getBoundingClientRect();
        s.current.naturalPos = {
          x: r.left + r.width / 2 - s.current.offset.x,
          y: r.top + r.height / 2 - s.current.offset.y,
        };
      }

      s.current.dragging = true;
      s.current.state = 'following';
      s.current.treatTarget = { x: cx, y: cy };

      setExpression('happy');
      setTreatPos({ x: cx, y: cy });

      s.current.raf = requestAnimationFrame(doFollow);
    },
    [doFollow],
  );

  const onMove = useCallback((cx: number, cy: number) => {
    if (!s.current.dragging) return;
    s.current.treatTarget = { x: cx, y: cy };
    setTreatPos({ x: cx, y: cy });
  }, []);

  const onEnd = useCallback(() => {
    if (!s.current.dragging) return;
    s.current.dragging = false;

    if (s.current.state === 'following') {
      cancelAnimationFrame(s.current.raf);
      setTreatPos(null);
      s.current.treatTarget = null;
      s.current.state = 'returning';
      setExpression('sad');
      s.current.raf = requestAnimationFrame(doReturn);
    }
  }, [doReturn]);

  // Attach global pointer listeners so movement/release works outside the dog element
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onMouseUp = () => onEnd();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => onEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(s.current.raf);
      if (s.current.eatTimer !== null) clearTimeout(s.current.eatTimer);
    };
  }, [onMove, onEnd]);

  const dogClassName = [
    'header-dog',
    expression === 'neutral' ? 'header-dog--wag' : '',
    expression === 'eating' ? 'header-dog--eating' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header
      className="header"
      onMouseDown={(e) => {
        e.preventDefault();
        onStart(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        if (e.touches[0]) onStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      <div className="header-inner">
        <span className="header-eyebrow">Haru's Daily Life</span>
        <div className="header-title-row">
          {/* Outer div handles position; inner SVG handles expression animations */}
          <div ref={dogWrapperRef} className="header-dog-wrapper">
            <DogCharacter className={dogClassName} size={84} expression={expression} />
          </div>
          <h1 className="header-title">하루 일상</h1>
        </div>
        <div className="header-divider" />
        <p className="header-subtitle">강아지 하루의 사랑스러운 일상 속 소중한 순간들</p>
      </div>
      {treatPos && <DogTreat x={treatPos.x} y={treatPos.y} />}
    </header>
  );
}

export default Header;
