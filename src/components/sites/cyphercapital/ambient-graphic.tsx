"use client";

type AmbientGraphicProps = {
  variant: "hero" | "ribbon" | "swirl" | "bloom";
  className?: string;
};

/**
 * CSS/SVG approximation of the source site's WebGL liquid-metal shader.
 * The original renders a pointer- and scroll-reactive chrome/iridescent
 * surface on a <canvas>; this reproduces its visual impression (soft
 * metallic ribbons, a silver swirl, a dark iridescent bloom) with layered
 * gradient strokes and slow CSS animation instead of a real shader.
 */
export function AmbientGraphic({ variant, className = "" }: AmbientGraphicProps) {
  if (variant === "bloom") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite] opacity-70">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-[55%] w-[10%] origin-bottom rounded-full blur-2xl"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 36}deg)`,
                background:
                  i % 3 === 0
                    ? "linear-gradient(to top, transparent, rgba(255,170,110,0.35))"
                    : i % 3 === 1
                      ? "linear-gradient(to top, transparent, rgba(120,200,255,0.25))"
                      : "linear-gradient(to top, transparent, rgba(255,255,255,0.18))",
              }}
            />
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>
    );
  }

  if (variant === "swirl") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 800 600"
          className="absolute right-[-10%] top-1/2 h-[140%] w-[90%] -translate-y-1/2 animate-[spin_60s_linear_infinite] opacity-80"
          style={{ transformOrigin: "60% 50%" }}
        >
          <defs>
            <linearGradient id="swirl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c9ccd1" />
              <stop offset="35%" stopColor="#f5f6f8" />
              <stop offset="55%" stopColor="#9aa0a8" />
              <stop offset="75%" stopColor="#f5f6f8" />
              <stop offset="100%" stopColor="#babfc6" />
            </linearGradient>
          </defs>
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M ${400 + i * 10} 50 C ${150 - i * 20} 150, ${150 - i * 20} 450, ${400 + i * 10} 550`}
              fill="none"
              stroke="url(#swirl-grad)"
              strokeWidth={14 - i}
              strokeLinecap="round"
              opacity={1 - i * 0.12}
            />
          ))}
        </svg>
      </div>
    );
  }

  // hero / ribbon: crossing chrome ribbons, top-right
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 900 700"
        className="absolute right-[-15%] top-[-10%] h-[120%] w-[90%] opacity-90"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ribbon-grad-1" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#aeb3ba" />
            <stop offset="30%" stopColor="#f7f8fa" />
            <stop offset="45%" stopColor="#8fd8e8" />
            <stop offset="55%" stopColor="#f3c7a6" />
            <stop offset="70%" stopColor="#f7f8fa" />
            <stop offset="100%" stopColor="#9aa0a8" />
          </linearGradient>
          <linearGradient id="ribbon-grad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4c8cd" />
            <stop offset="50%" stopColor="#f7f8fa" />
            <stop offset="100%" stopColor="#a7acb3" />
          </linearGradient>
        </defs>
        <g className="origin-center animate-[pulse_8s_ease-in-out_infinite]">
          <path
            d="M -100 420 C 150 420, 280 260, 500 280 C 680 296, 760 180, 950 60"
            fill="none"
            stroke="url(#ribbon-grad-1)"
            strokeWidth="46"
            strokeLinecap="round"
          />
          <path
            d="M -100 480 C 180 480, 300 340, 520 340 C 700 340, 800 420, 980 520"
            fill="none"
            stroke="url(#ribbon-grad-2)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d="M 150 700 C 320 560, 420 420, 560 300 C 660 216, 760 180, 900 120"
            fill="none"
            stroke="url(#ribbon-grad-2)"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
}
