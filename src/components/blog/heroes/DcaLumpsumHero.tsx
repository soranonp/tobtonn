export default function DcaLumpsumHero() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 540"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full max-h-[400px] rounded-2xl"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="dca-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f1e8" />
          <stop offset="100%" stopColor="#e8e0c8" />
        </linearGradient>
        <linearGradient id="dca-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a7a5a" />
          <stop offset="100%" stopColor="#0f4d3a" />
        </linearGradient>
        <linearGradient id="ls-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8d59e" />
          <stop offset="100%" stopColor="#c9a44c" />
        </linearGradient>
        <pattern id="dca-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#0f4d3a" fillOpacity="0.06" />
        </pattern>
        <style>{`
          @keyframes drop-fall {
            0%   { transform: translateY(-130px); opacity: 0; }
            10%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translateY(0); opacity: 0; }
          }
          @keyframes lump-fall {
            0%   { transform: translateY(-180px); opacity: 0; }
            15%  { opacity: 1; }
            70%  { opacity: 1; }
            100% { transform: translateY(0); opacity: 0; }
          }
          @keyframes ripple {
            from { r: 6; opacity: 0.7; }
            to   { r: 36; opacity: 0; }
          }
          @keyframes vs-pulse {
            0%,100% { transform: scale(1); }
            50%     { transform: scale(1.07); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          .dca-drop {
            transform-box: fill-box;
            animation: drop-fall 2.4s ease-in infinite;
          }
          .dca-d1 { animation-delay: 0s; }
          .dca-d2 { animation-delay: 0.8s; }
          .dca-d3 { animation-delay: 1.6s; }
          .ls-block {
            transform-box: fill-box;
            animation: lump-fall 4s ease-in infinite;
          }
          .vs-mark { transform-box: fill-box; transform-origin: center; animation: vs-pulse 2.5s ease-in-out infinite; }
          .fade { opacity: 0; animation: fade-in 0.8s ease-out 0.3s forwards; }
        `}</style>
      </defs>

      <rect width="1200" height="540" fill="url(#dca-bg)" />
      <rect width="1200" height="540" fill="url(#dca-dots)" />

      {/* === LEFT JAR (DCA) === */}
      <g className="fade">
        <text x="280" y="80" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontSize="34" fill="#0f4d3a">DCA</text>
        <text x="280" y="108" textAnchor="middle" fontFamily="IBM Plex Sans Thai, sans-serif" fontSize="14" fill="#4a5a55">ทยอยลงทุน</text>
      </g>

      {/* drops falling */}
      <g>
        <ellipse className="dca-drop dca-d1" cx="280" cy="160" rx="6" ry="10" fill="#1a7a5a" />
        <ellipse className="dca-drop dca-d2" cx="280" cy="160" rx="6" ry="10" fill="#1a7a5a" />
        <ellipse className="dca-drop dca-d3" cx="280" cy="160" rx="6" ry="10" fill="#1a7a5a" />
      </g>

      {/* jar */}
      <g>
        {/* jar mouth */}
        <rect x="220" y="160" width="120" height="14" rx="3" fill="#d8d2c0" stroke="#0f4d3a" strokeOpacity="0.3" strokeWidth="1.5" />
        {/* jar body */}
        <path
          d="M 230 174 L 230 470 Q 230 490 250 490 L 310 490 Q 330 490 330 470 L 330 174 Z"
          fill="#fff"
          fillOpacity="0.5"
          stroke="#0f4d3a"
          strokeOpacity="0.4"
          strokeWidth="2.5"
        />
        {/* water (DCA - same level as LS) */}
        <path
          d="M 233 290 L 233 467 Q 233 487 251 487 L 309 487 Q 327 487 327 467 L 327 290 Z"
          fill="url(#dca-water)"
        />
        {/* surface line */}
        <ellipse cx="280" cy="290" rx="47" ry="5" fill="#1a7a5a" />
        <ellipse cx="280" cy="290" rx="47" ry="3" fill="#fff" opacity="0.25" />
        {/* highlight */}
        <rect x="245" y="200" width="6" height="240" rx="3" fill="#fff" opacity="0.3" />
        {/* ripple at impact */}
        <circle cx="280" cy="288" r="6" fill="none" stroke="#1a7a5a" strokeWidth="2">
          <animate attributeName="r" values="6;36" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* === VS MARK === */}
      <g className="vs-mark" transform="translate(600 290)">
        <circle r="40" fill="#0f4d3a" />
        <circle r="40" fill="none" stroke="#c9a44c" strokeWidth="2" strokeOpacity="0.6" />
        <text textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontStyle="italic" fontSize="28" fill="#e8d59e" y="10">vs</text>
      </g>
      {/* arrow lines */}
      <path d="M 360 290 L 555 290" stroke="#0f4d3a" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M 645 290 L 840 290" stroke="#0f4d3a" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 6" />

      {/* === RIGHT JAR (Lump Sum) === */}
      <g className="fade">
        <text x="920" y="80" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontSize="34" fill="#c9a44c">Lump Sum</text>
        <text x="920" y="108" textAnchor="middle" fontFamily="IBM Plex Sans Thai, sans-serif" fontSize="14" fill="#4a5a55">ลงทุนครั้งเดียว</text>
      </g>

      {/* big lump falling */}
      <rect className="ls-block" x="888" y="155" width="64" height="64" rx="8" fill="url(#ls-water)" stroke="#c9a44c" strokeOpacity="0.6" strokeWidth="1.5" />

      {/* jar */}
      <g>
        <rect x="860" y="160" width="120" height="14" rx="3" fill="#d8d2c0" stroke="#c9a44c" strokeOpacity="0.4" strokeWidth="1.5" />
        <path
          d="M 870 174 L 870 470 Q 870 490 890 490 L 950 490 Q 970 490 970 470 L 970 174 Z"
          fill="#fff"
          fillOpacity="0.5"
          stroke="#c9a44c"
          strokeOpacity="0.5"
          strokeWidth="2.5"
        />
        {/* water (LS - same level as DCA) */}
        <path
          d="M 873 290 L 873 467 Q 873 487 891 487 L 949 487 Q 967 487 967 467 L 967 290 Z"
          fill="url(#ls-water)"
        />
        <ellipse cx="920" cy="290" rx="47" ry="5" fill="#c9a44c" />
        <ellipse cx="920" cy="290" rx="47" ry="3" fill="#fff" opacity="0.3" />
        <rect x="885" y="200" width="6" height="240" rx="3" fill="#fff" opacity="0.35" />
      </g>

      {/* footer caption */}
      <text x="600" y="510" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#4a5a55" letterSpacing="2">
        SAME TOTAL · DIFFERENT TIMING
      </text>
    </svg>
  );
}
