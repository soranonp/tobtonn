export default function InvestingYoungHero() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 540"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full max-h-[400px] rounded-2xl"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="iy-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f1e8" />
          <stop offset="100%" stopColor="#e8d59e" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="iy-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a5a3a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7a5a3a" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="iy-canopy-big" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a7a5a" />
          <stop offset="100%" stopColor="#0f4d3a" />
        </radialGradient>
        <radialGradient id="iy-canopy-mid" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a7a5a" />
          <stop offset="100%" stopColor="#0f4d3a" />
        </radialGradient>
        <radialGradient id="iy-canopy-sml" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a8c5b3" />
          <stop offset="100%" stopColor="#1a7a5a" />
        </radialGradient>
        <pattern id="iy-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#0f4d3a" fillOpacity="0.05" />
        </pattern>
        <style>{`
          @keyframes iy-grow {
            from { transform: scaleY(0.2); opacity: 0; }
            to   { transform: scaleY(1); opacity: 1; }
          }
          @keyframes iy-sway-a { 0%,100%{transform:rotate(-1.5deg);} 50%{transform:rotate(1.5deg);} }
          @keyframes iy-sway-b { 0%,100%{transform:rotate(1deg);} 50%{transform:rotate(-1deg);} }
          @keyframes iy-fadein { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
          @keyframes iy-draw {
            from { stroke-dashoffset: 600; }
            to   { stroke-dashoffset: 0; }
          }
          .iy-tree { transform-origin: center bottom; animation: iy-grow 1.4s cubic-bezier(.34,1.4,.64,1) forwards; }
          .iy-canopy-a { transform-box: fill-box; transform-origin: center bottom; animation: iy-sway-a 6s ease-in-out infinite; }
          .iy-canopy-b { transform-box: fill-box; transform-origin: center bottom; animation: iy-sway-b 5s ease-in-out infinite; }
          .iy-root { stroke-dasharray: 600; stroke-dashoffset: 600; animation: iy-draw 1.6s ease-out 0.4s forwards; }
          .iy-label { opacity: 0; animation: iy-fadein 0.7s ease-out forwards; }
          .iy-d1 { animation-delay: 0.2s; }
          .iy-d2 { animation-delay: 0.5s; }
          .iy-d3 { animation-delay: 0.8s; }
          .iy-ld1 { animation-delay: 1.4s; }
          .iy-ld2 { animation-delay: 1.7s; }
          .iy-ld3 { animation-delay: 2s; }
        `}</style>
      </defs>

      <rect width="1200" height="540" fill="url(#iy-bg)" />
      <rect width="1200" height="540" fill="url(#iy-dots)" />

      {/* ground line */}
      <line x1="80" y1="380" x2="1120" y2="380" stroke="#0f4d3a" strokeOpacity="0.3" strokeWidth="2" />
      <rect x="80" y="380" width="1040" height="120" fill="url(#iy-soil)" />

      {/* === LEFT TREE — age 25 (biggest, deep roots, has fruit) === */}
      <g className="iy-tree iy-d1" style={{ transformOrigin: "260px 380px" }}>
        {/* roots — deep */}
        <path className="iy-root" d="M 260 380 Q 230 440 210 480 M 260 380 Q 280 450 295 490 M 260 380 Q 250 430 240 470 M 260 380 Q 270 440 280 485" fill="none" stroke="#7a5a3a" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
        {/* trunk */}
        <rect x="252" y="220" width="16" height="160" rx="2" fill="#7a5a3a" />
        {/* canopy */}
        <g className="iy-canopy-a">
          <circle cx="260" cy="200" r="105" fill="url(#iy-canopy-big)" />
          <circle cx="220" cy="180" r="55" fill="url(#iy-canopy-big)" />
          <circle cx="305" cy="195" r="60" fill="url(#iy-canopy-big)" />
        </g>
        {/* fruit */}
        <circle cx="225" cy="200" r="7" fill="#c9a44c" />
        <circle cx="285" cy="170" r="7" fill="#c9a44c" />
        <circle cx="305" cy="225" r="7" fill="#c9a44c" />
        <circle cx="240" cy="240" r="6" fill="#c9a44c" />
        <circle cx="270" cy="155" r="6" fill="#c9a44c" />
        <circle cx="320" cy="180" r="5" fill="#e8d59e" />
      </g>

      {/* === MIDDLE TREE — age 35 === */}
      <g className="iy-tree iy-d2" style={{ transformOrigin: "600px 380px" }}>
        <path className="iy-root" d="M 600 380 Q 580 420 570 450 M 600 380 Q 615 425 625 455 M 600 380 Q 595 415 590 445" fill="none" stroke="#7a5a3a" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        <rect x="594" y="265" width="12" height="115" rx="2" fill="#7a5a3a" />
        <g className="iy-canopy-b">
          <circle cx="600" cy="250" r="68" fill="url(#iy-canopy-mid)" />
          <circle cx="568" cy="240" r="38" fill="url(#iy-canopy-mid)" />
          <circle cx="635" cy="245" r="42" fill="url(#iy-canopy-mid)" />
        </g>
        <circle cx="580" cy="240" r="5" fill="#c9a44c" />
        <circle cx="618" cy="265" r="5" fill="#c9a44c" />
      </g>

      {/* === RIGHT TREE — age 45 (smallest, shallow roots) === */}
      <g className="iy-tree iy-d3" style={{ transformOrigin: "940px 380px" }}>
        <path className="iy-root" d="M 940 380 Q 930 400 925 415 M 940 380 Q 950 400 955 415" fill="none" stroke="#7a5a3a" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        <rect x="936" y="320" width="8" height="60" rx="2" fill="#7a5a3a" />
        <g className="iy-canopy-a">
          <circle cx="940" cy="312" r="36" fill="url(#iy-canopy-sml)" />
          <circle cx="922" cy="308" r="20" fill="url(#iy-canopy-sml)" />
          <circle cx="958" cy="310" r="22" fill="url(#iy-canopy-sml)" />
        </g>
        {/* sapling — single small leaf accent */}
        <circle cx="945" cy="305" r="3" fill="#a8c5b3" />
      </g>

      {/* labels */}
      <g className="iy-label iy-ld1">
        <rect x="200" y="430" width="120" height="36" rx="18" fill="#0f4d3a" />
        <text x="260" y="453" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontSize="20" fill="#e8d59e">อายุ 25</text>
      </g>
      <g className="iy-label iy-ld2">
        <rect x="540" y="430" width="120" height="36" rx="18" fill="#1a7a5a" />
        <text x="600" y="453" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontSize="20" fill="#f5f1e8">อายุ 35</text>
      </g>
      <g className="iy-label iy-ld3">
        <rect x="880" y="430" width="120" height="36" rx="18" fill="#c9a44c" />
        <text x="940" y="453" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="700" fontSize="20" fill="#0c1f1a">อายุ 45</text>
      </g>

      {/* sun */}
      <circle cx="1080" cy="100" r="36" fill="#e8d59e" opacity="0.5" />
      <circle cx="1080" cy="100" r="22" fill="#c9a44c" opacity="0.7" />
    </svg>
  );
}
