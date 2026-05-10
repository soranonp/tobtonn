export default function Rule72Hero() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 540"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full max-h-[400px] rounded-2xl"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="r72-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f4d3a" />
          <stop offset="100%" stopColor="#072821" />
        </linearGradient>
        <radialGradient id="r72-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#c9a44c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c9a44c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="r72-num" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8d59e" />
          <stop offset="100%" stopColor="#c9a44c" />
        </linearGradient>
        <pattern id="r72-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#c9a44c" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
        <style>{`
          @keyframes r72-orbit-1 { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
          @keyframes r72-orbit-2 { from{transform:rotate(360deg);} to{transform:rotate(0deg);} }
          @keyframes r72-fadein { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
          @keyframes r72-float-a { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
          @keyframes r72-float-b { 0%,100%{transform:translateY(0);} 50%{transform:translateY(8px);} }
          @keyframes r72-pop {
            from{opacity:0;transform:scale(0.6);}
            to{opacity:1;transform:scale(1);}
          }
          .r72-orbit-a { transform-origin: 600px 270px; animation: r72-orbit-1 40s linear infinite; }
          .r72-orbit-b { transform-origin: 600px 270px; animation: r72-orbit-2 60s linear infinite; }
          .r72-num     { opacity:0; animation: r72-pop 1s cubic-bezier(.34,1.56,.64,1) 0.3s forwards; transform-origin: 600px 270px; }
          .r72-tag     { transform-box: fill-box; transform-origin: center; opacity:0; animation: r72-fadein 0.7s ease-out forwards; }
          .r72-fa      { animation: r72-float-a 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .r72-fb      { animation: r72-float-b 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .r72-d1 { animation-delay: 0.6s; }
          .r72-d2 { animation-delay: 0.9s; }
          .r72-d3 { animation-delay: 1.2s; }
          .r72-d4 { animation-delay: 1.5s; }
          .r72-d5 { animation-delay: 1.8s; }
          .r72-d6 { animation-delay: 2.1s; }
        `}</style>
      </defs>

      <rect width="1200" height="540" fill="url(#r72-bg)" />
      <rect width="1200" height="540" fill="url(#r72-grid)" />
      <rect width="1200" height="540" fill="url(#r72-glow)" />

      {/* orbit rings */}
      <g className="r72-orbit-a">
        <circle cx="600" cy="270" r="200" fill="none" stroke="#c9a44c" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 7" />
        <circle cx="600" cy="270" r="200" fill="none" stroke="#c9a44c" strokeOpacity="0.4" strokeWidth="0" />
        <circle cx="800" cy="270" r="3" fill="#c9a44c" />
      </g>
      <g className="r72-orbit-b">
        <circle cx="600" cy="270" r="280" fill="none" stroke="#c9a44c" strokeOpacity="0.12" strokeWidth="1" />
        <circle cx="320" cy="270" r="2.5" fill="#e8d59e" />
      </g>

      {/* big "72" */}
      <text
        className="r72-num"
        x="600"
        y="345"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="320"
        fill="url(#r72-num)"
      >
        72
      </text>

      {/* floating numbers */}
      <g className="r72-fa">
        <text className="r72-tag r72-d1" x="240" y="140" fontFamily="JetBrains Mono, monospace" fontSize="38" fill="#e8d59e" fillOpacity="0.85" fontWeight="600">6</text>
      </g>
      <g className="r72-fb">
        <text className="r72-tag r72-d2" x="350" y="430" fontFamily="JetBrains Mono, monospace" fontSize="32" fill="#c9a44c" fillOpacity="0.8" fontWeight="600">8</text>
      </g>
      <g className="r72-fa">
        <text className="r72-tag r72-d3" x="900" y="120" fontFamily="JetBrains Mono, monospace" fontSize="40" fill="#e8d59e" fillOpacity="0.9" fontWeight="600">9</text>
      </g>
      <g className="r72-fb">
        <text className="r72-tag r72-d4" x="950" y="450" fontFamily="JetBrains Mono, monospace" fontSize="44" fill="#c9a44c" fillOpacity="0.85" fontWeight="600">12</text>
      </g>
      <g className="r72-fa">
        <text className="r72-tag r72-d5" x="180" y="320" fontFamily="JetBrains Mono, monospace" fontSize="56" fill="#c9a44c" fillOpacity="0.7" fontWeight="500" fontStyle="italic">÷</text>
      </g>
      <g className="r72-fb">
        <text className="r72-tag r72-d6" x="1010" y="290" fontFamily="JetBrains Mono, monospace" fontSize="48" fill="#e8d59e" fillOpacity="0.7" fontWeight="500">%</text>
      </g>

      {/* tiny accent dots */}
      <circle cx="120" cy="200" r="2.5" fill="#c9a44c" opacity="0.6" />
      <circle cx="1080" cy="180" r="2" fill="#e8d59e" opacity="0.6" />
      <circle cx="160" cy="400" r="2" fill="#c9a44c" opacity="0.5" />
      <circle cx="1060" cy="380" r="2.5" fill="#e8d59e" opacity="0.55" />
      <circle cx="600" cy="60" r="1.5" fill="#c9a44c" opacity="0.5" />
      <circle cx="600" cy="500" r="1.5" fill="#c9a44c" opacity="0.4" />
    </svg>
  );
}
