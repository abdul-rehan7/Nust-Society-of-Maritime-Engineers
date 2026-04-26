export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        className="w-full h-12 md:h-20"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="url(#waveGrad)"
          opacity="0.5"
        />
        <path
          d="M0,50 C320,90 640,10 960,50 C1200,80 1320,30 1440,50 L1440,80 L0,80 Z"
          fill="oklch(0.24 0.07 250)"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.15 210)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.42 0.10 245)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
