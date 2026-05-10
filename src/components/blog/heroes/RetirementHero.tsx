export default function RetirementHero() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 540"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full max-h-[400px] rounded-2xl"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="rt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe0d6" />
          <stop offset="50%" stopColor="#e8d59e" />
          <stop offset="100%" stopColor="#c9a44c" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="rt-mountain-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a7a5a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0f4d3a" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="rt-mountain-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f4d3a" />
          <stop offset="100%" stopColor="#072821" />
        </linearGradient>
        <radialGradient id="rt-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff5d8" />
          <stop offset="60%" stopColor="#e8d59e" />
          <stop offset="100%" stopColor="#c9a44c" />
        </radialGradient>
        <style>{`
          @keyframes rt-draw {
            from { stroke-dashoffset: 1800; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes rt-pop {
            from { opacity: 0; transform: scale(0); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes rt-wave {
            0%,100% { transform: rotate(-3deg); }
            50%     { transform: rotate(3deg); }
          }
          @keyframes rt-shine {
            0%,100% { transform: scale(1); opacity: 0.85; }
            50%     { transform: scale(1.06); opacity: 1; }
          }
          .rt-path { stroke-dasharray: 1800; stroke-dashoffset: 1800; animation: rt-draw 2.4s ease-out 0.3s forwards; }
          .rt-mile { transform-box: fill-box; transform-origin: center; opacity: 0; animation: rt-pop 0.6s cubic-bezier(.34,1.56,.64,1) forwards; }
          .rt-m1 { animation-delay: 1.0s; }
          .rt-m2 { animation-delay: 1.4s; }
          .rt-m3 { animation-delay: 1.8s; }
          .rt-m4 { animation-delay: 2.2s; }
          .rt-flag { transform-box: fill-box; transform-origin: 4px 100%; animation: rt-wave 3s ease-in-out infinite; }
          .rt-flag-pop { transform-box: fill-box; transform-origin: center bottom; opacity: 0; animation: rt-pop 0.7s cubic-bezier(.34,1.56,.64,1) 2.6s forwards; }
          .rt-sun { transform-box: fill-box; transform-origin: center; animation: rt-shine 4s ease-in-out infinite; }
        `}</style>
      </defs>

      <rect width="1200" height="540" fill="url(#rt-bg)" />

      {/* sun */}
      <g className="rt-sun" style={{ transformOrigin: "950px 130px" }}>
        <circle cx="950" cy="130" r="62" fill="#fff5d8" opacity="0.4" />
        <circle cx="950" cy="130" r="46" fill="url(#rt-sun)" />
      </g>

      {/* far mountains */}
      <path
        d="M 0 360 L 140 240 L 260 300 L 380 200 L 520 280 L 660 180 L 820 250 L 960 160 L 1100 220 L 1200 180 L 1200 540 L 0 540 Z"
        fill="url(#rt-mountain-far)"
      />
      {/* near mountain — main with peak at right */}
      <path
        d="M 0 540 L 0 420 L 220 380 L 380 350 L 560 310 L 740 260 L 880 200 L 1000 130 L 1200 90 L 1200 540 Z"
        fill="url(#rt-mountain-near)"
      />

      {/* path snake going up-right */}
      <path
        className="rt-path"
        d="M 60 480 Q 200 470 280 440 Q 380 410 440 380 Q 540 350 600 320 Q 700 295 760 260 Q 860 220 920 180 Q 970 150 1000 130"
        fill="none"
        stroke="#e8d59e"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="14 10"
      />
      <path
        d="M 60 480 Q 200 470 280 440 Q 380 410 440 380 Q 540 350 600 320 Q 700 295 760 260 Q 860 220 920 180 Q 970 150 1000 130"
        fill="none"
        stroke="#c9a44c"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* milestones */}
      <g className="rt-mile rt-m1" transform="translate(280 440)">
        <circle r="28" fill="#0f4d3a" />
        <circle r="28" fill="none" stroke="#e8d59e" strokeWidth="2" />
        <text textAnchor="middle" y="7" fontFamily="Fraunces, serif" fontWeight="700" fontSize="20" fill="#e8d59e">30</text>
      </g>
      <g className="rt-mile rt-m2" transform="translate(440 380)">
        <circle r="30" fill="#0f4d3a" />
        <circle r="30" fill="none" stroke="#e8d59e" strokeWidth="2" />
        <text textAnchor="middle" y="7" fontFamily="Fraunces, serif" fontWeight="700" fontSize="22" fill="#e8d59e">40</text>
      </g>
      <g className="rt-mile rt-m3" transform="translate(600 320)">
        <circle r="32" fill="#1a7a5a" />
        <circle r="32" fill="none" stroke="#e8d59e" strokeWidth="2" />
        <text textAnchor="middle" y="8" fontFamily="Fraunces, serif" fontWeight="700" fontSize="24" fill="#f5f1e8">50</text>
      </g>
      <g className="rt-mile rt-m4" transform="translate(760 260)">
        <circle r="34" fill="#c9a44c" />
        <circle r="34" fill="none" stroke="#0f4d3a" strokeWidth="2" />
        <text textAnchor="middle" y="9" fontFamily="Fraunces, serif" fontWeight="700" fontSize="26" fill="#0c1f1a">60</text>
      </g>

      {/* summit flag */}
      <g className="rt-flag-pop" transform="translate(1000 130)">
        {/* base star */}
        <circle r="6" fill="#c9a44c" />
        {/* pole */}
        <line x1="0" y1="0" x2="0" y2="-60" stroke="#0c1f1a" strokeWidth="2.5" strokeLinecap="round" />
        {/* flag */}
        <g className="rt-flag" transform="translate(0 -60)">
          <path d="M 0 0 L 36 6 L 28 14 L 36 22 L 0 28 Z" fill="#c9a44c" stroke="#0c1f1a" strokeWidth="1" strokeLinejoin="round" />
        </g>
      </g>

      {/* small clouds */}
      <g opacity="0.6">
        <ellipse cx="180" cy="120" rx="50" ry="10" fill="#fff" />
        <ellipse cx="200" cy="115" rx="34" ry="9" fill="#fff" />
        <ellipse cx="500" cy="80" rx="40" ry="8" fill="#fff" />
        <ellipse cx="780" cy="100" rx="36" ry="7" fill="#fff" />
      </g>

      {/* footer caption */}
      <text x="600" y="520" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#0c1f1a" letterSpacing="2" opacity="0.7">
        ROAD · TO · RETIREMENT
      </text>
    </svg>
  );
}
