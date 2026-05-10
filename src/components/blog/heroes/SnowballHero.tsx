export default function SnowballHero() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 540"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full max-h-[400px] rounded-2xl"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="snowball-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f1e8" />
          <stop offset="100%" stopColor="#e8e0c8" />
        </linearGradient>
        <radialGradient id="ball-1" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e8d59e" />
          <stop offset="100%" stopColor="#c9a44c" />
        </radialGradient>
        <radialGradient id="ball-2" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a8c5b3" />
          <stop offset="100%" stopColor="#1a7a5a" />
        </radialGradient>
        <radialGradient id="ball-3" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1a7a5a" />
          <stop offset="100%" stopColor="#0f4d3a" />
        </radialGradient>
        <radialGradient id="ball-4" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1a7a5a" />
          <stop offset="50%" stopColor="#0f4d3a" />
          <stop offset="100%" stopColor="#c9a44c" />
        </radialGradient>
        <radialGradient id="ball-5" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e8d59e" />
          <stop offset="60%" stopColor="#c9a44c" />
          <stop offset="100%" stopColor="#0f4d3a" />
        </radialGradient>
        <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#0f4d3a" fillOpacity="0.07" />
        </pattern>
        <style>{`
          @keyframes sb-draw {
            from { stroke-dashoffset: 1600; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes sb-pop {
            from { transform: scale(0); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
          @keyframes sb-float {
            0%,100% { transform: translateY(0); }
            50%     { transform: translateY(-6px); }
          }
          .sb-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: sb-draw 2s ease-out 0.2s forwards;
          }
          .sb-ball {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;
            animation: sb-pop 0.7s cubic-bezier(.34,1.56,.64,1) forwards, sb-float 4s ease-in-out infinite;
          }
          .sb-b1 { animation-delay: 0.5s, 1.2s; }
          .sb-b2 { animation-delay: 0.8s, 1.5s; }
          .sb-b3 { animation-delay: 1.1s, 1.8s; }
          .sb-b4 { animation-delay: 1.4s, 2.1s; }
          .sb-b5 { animation-delay: 1.7s, 2.4s; }
        `}</style>
      </defs>

      <rect width="1200" height="540" fill="url(#snowball-bg)" />
      <rect width="1200" height="540" fill="url(#dotgrid)" />

      {/* slope */}
      <path
        d="M 60 380 Q 320 360 600 320 T 1140 220"
        fill="none"
        stroke="#0f4d3a"
        strokeOpacity="0.18"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      {/* rolling path */}
      <path
        className="sb-path"
        d="M 130 400 Q 280 390 360 360 Q 470 330 560 320 Q 690 305 760 270 Q 870 230 940 200 Q 1030 165 1080 130"
        fill="none"
        stroke="#c9a44c"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* shadows */}
      <ellipse cx="130" cy="425" rx="22" ry="4" fill="#0c1f1a" opacity="0.12" />
      <ellipse cx="340" cy="415" rx="34" ry="5" fill="#0c1f1a" opacity="0.14" />
      <ellipse cx="580" cy="395" rx="52" ry="7" fill="#0c1f1a" opacity="0.16" />
      <ellipse cx="830" cy="370" rx="76" ry="9" fill="#0c1f1a" opacity="0.18" />
      <ellipse cx="1030" cy="335" rx="105" ry="12" fill="#0c1f1a" opacity="0.2" />

      {/* snowballs (small to large) */}
      <circle className="sb-ball sb-b1" cx="130" cy="410" r="20" fill="url(#ball-1)" stroke="#0f4d3a" strokeOpacity="0.2" strokeWidth="1" />
      <circle className="sb-ball sb-b2" cx="340" cy="395" r="32" fill="url(#ball-2)" stroke="#0f4d3a" strokeOpacity="0.2" strokeWidth="1" />
      <circle className="sb-ball sb-b3" cx="580" cy="370" r="50" fill="url(#ball-3)" stroke="#0f4d3a" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle className="sb-ball sb-b4" cx="830" cy="338" r="74" fill="url(#ball-4)" stroke="#0f4d3a" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle className="sb-ball sb-b5" cx="1030" cy="298" r="100" fill="url(#ball-5)" stroke="#c9a44c" strokeOpacity="0.5" strokeWidth="2" />

      {/* highlight specks */}
      <circle cx="125" cy="403" r="4" fill="#fff" opacity="0.5" />
      <circle cx="332" cy="385" r="6" fill="#fff" opacity="0.45" />
      <circle cx="568" cy="356" r="9" fill="#fff" opacity="0.4" />
      <circle cx="813" cy="320" r="12" fill="#fff" opacity="0.35" />
      <circle cx="1010" cy="276" r="16" fill="#fff" opacity="0.32" />
    </svg>
  );
}
