export function WaveDivider({
  flip = false,
  variant = "default",
}: {
  flip?: boolean;
  variant?: "default" | "to-sea" | "from-sea" | "to-pale" | "from-pale" | "to-sea-foam";
}) {
  /* Choose colours based on the transition direction */
  let fillMain: string;
  let gradStart: string;
  let gradEnd: string;

  switch (variant) {
    case "to-sea":
      /* white ▸ sea-deep section */
      fillMain = "oklch(0.28 0.12 235)";
      gradStart = "oklch(0.52 0.14 230 / 0.3)";
      gradEnd = "oklch(0.28 0.12 235 / 0.4)";
      break;
    case "from-sea":
      /* sea-deep section ▸ white */
      fillMain = "oklch(0.99 0.002 220)";
      gradStart = "oklch(0.52 0.14 230 / 0.25)";
      gradEnd = "oklch(0.62 0.13 225 / 0.15)";
      break;
    case "to-pale":
      /* white ▸ pale blue section */
      fillMain = "oklch(0.92 0.04 225)";
      gradStart = "oklch(0.52 0.14 230 / 0.14)";
      gradEnd = "oklch(0.62 0.13 225 / 0.08)";
      break;
    case "to-sea-foam":
      /* to sea-foam */
      fillMain = "oklch(0.97 0.01 220)";
      gradStart = "oklch(0.52 0.14 230 / 0.10)";
      gradEnd = "oklch(0.62 0.13 225 / 0.06)";
      break;
      break;
    default:
      /* neutral, white-to-white with faint sea tint */
      fillMain = "oklch(0.97 0.01 220)";
      gradStart = "oklch(0.52 0.14 230 / 0.10)";
      gradEnd = "oklch(0.62 0.13 225 / 0.06)";
  }

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
          fill={fillMain}
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
