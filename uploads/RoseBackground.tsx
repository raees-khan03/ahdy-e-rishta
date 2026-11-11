/** Petals ki shakal (center se upar ki taraf) */
const PETAL =
  "M0 0 C-48 -10 -62 -62 -28 -84 C-6 -96 34 -92 50 -66 C62 -44 40 -8 0 0Z";

/** Ek gulab ko bar bar use karne ke liye sprite (sirf ek dafa define hota hai) */
function RoseSprite() {
  return (
    <symbol id="ah-rose" viewBox="-130 -130 260 260">
      <defs>
        <radialGradient id="ah-rose-outer" cx="50%" cy="80%" r="85%">
          <stop offset="0" stopColor="#7d1424" />
          <stop offset="1" stopColor="#d4606f" />
        </radialGradient>
        <radialGradient id="ah-rose-mid" cx="50%" cy="80%" r="85%">
          <stop offset="0" stopColor="#8f1a2c" />
          <stop offset="1" stopColor="#e07a86" />
        </radialGradient>
        <radialGradient id="ah-rose-inner" cx="50%" cy="80%" r="85%">
          <stop offset="0" stopColor="#a3263a" />
          <stop offset="1" stopColor="#f0a0a8" />
        </radialGradient>
      </defs>

      {/* patte */}
      <g fill="#3c5a3a" stroke="#27402a" strokeWidth="1.5" strokeOpacity="0.6">
        <path
          d="M0 0 C-30 -40 -20 -100 0 -125 C20 -100 30 -40 0 0Z"
          transform="rotate(-48)"
        />
        <path
          d="M0 0 C-30 -40 -20 -100 0 -125 C20 -100 30 -40 0 0Z"
          transform="rotate(128)"
        />
        <path
          d="M0 0 C-26 -36 -16 -88 0 -110 C16 -88 26 -36 0 0Z"
          transform="rotate(205)"
        />
      </g>

      {/* bahar ki pankhuriyan */}
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={`o${a}`}
          d={PETAL}
          transform={`rotate(${a})`}
          fill="url(#ah-rose-outer)"
          stroke="#5c0d1a"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      ))}

      {/* beech ki pankhuriyan */}
      {[36, 108, 180, 252, 324].map((a) => (
        <path
          key={`m${a}`}
          d={PETAL}
          transform={`rotate(${a}) scale(0.72)`}
          fill="url(#ah-rose-mid)"
          stroke="#6b1020"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
      ))}

      {/* andar ki pankhuriyan */}
      {[0, 90, 180, 270].map((a) => (
        <path
          key={`i${a}`}
          d={PETAL}
          transform={`rotate(${a + 20}) scale(0.44)`}
          fill="url(#ah-rose-inner)"
          stroke="#7d1424"
          strokeOpacity="0.4"
          strokeWidth="3"
        />
      ))}

      {/* beech ka spiral */}
      <path
        d="M0 -4 C8 -4 12 2 8 8 C3 14 -8 12 -10 3 C-12 -8 -2 -16 10 -14"
        fill="none"
        stroke="#fbd5d9"
        strokeOpacity="0.7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </symbol>
  );
}

/** x, y, size, rotation: har gulab ki jagah aur size */
const roses = [
  { x: 560, y: 70, size: 1.25, rotate: 15 },
  { x: 40, y: 840, size: 1.45, rotate: -20 },
  { x: 575, y: 560, size: 0.6, rotate: 40 },
  { x: 30, y: 250, size: 0.5, rotate: 70 },
];

export function RoseBackground({ opacity = 0.55 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full select-none"
    >
      <defs>
        <RoseSprite />
      </defs>
      <g opacity={opacity}>
        {roses.map((r, i) => (
          <g
            key={i}
            transform={`translate(${r.x} ${r.y}) rotate(${r.rotate}) scale(${r.size})`}
          >
            <use href="#ah-rose" x="-130" y="-130" width="260" height="260" />
          </g>
        ))}
      </g>
    </svg>
  );
}
