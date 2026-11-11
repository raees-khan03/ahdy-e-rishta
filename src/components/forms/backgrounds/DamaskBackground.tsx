/** Maroon section ke peeche nakshi (damask) pattern. Koi image file nahi chahiye. */
export function DamaskBackground({
  color = "#4a0a12", // pattern ka rang, background se thora gehra
  opacity = 0.55,
  size = 240, // pattern ka size (px), bara/chota karne ke liye
}: {
  color?: string;
  opacity?: number;
  size?: number;
}) {
  // Aadha motif, phir mirror karke poora banta hai
  const half = (
    <>
      {/* ooper ka scroll */}
      <path
        d="M120 118 C152 108 176 88 170 60 C167 44 148 42 146 56 C145 66 157 69 160 60"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* bara patta */}
      <path d="M124 150 C156 152 182 136 194 108 C162 110 134 124 124 150Z" />
      {/* neeche ka scroll */}
      <path
        d="M120 168 C146 176 168 196 162 220 C159 232 142 232 141 220 C140 212 150 210 152 217"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* chhota patta */}
      <path d="M104 40 C124 30 146 34 156 18 C150 44 128 56 104 40Z" />
    </>
  );

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full select-none"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="damask"
          width={size}
          height={size}
          viewBox="0 0 240 240"
          patternUnits="userSpaceOnUse"
        >
          <g fill={color}>
            {/* beech ka phool */}
            <path d="M120 24 C140 58 140 92 120 124 C100 92 100 58 120 24Z" />
            <path d="M120 120 C136 150 136 184 120 218 C104 184 104 150 120 120Z" />
            <circle cx="120" cy="122" r="7" />

            {half}
            <g transform="translate(240 0) scale(-1 1)">{half}</g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#damask)" />
    </svg>
  );
}
