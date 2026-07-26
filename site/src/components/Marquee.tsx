const PRINCIPLES = [
  "Human-led · AI-assisted",
  "Evidence-informed",
  "Community-validated",
  "Equity by default",
  "Privacy by design",
  "Strengths-based",
  "Ottawa Charter aligned",
  "OCAP® principles",
];

/** Design-philosophy ticker — a quiet ledger of the principles the platform is built on. */
export default function Marquee() {
  return (
    <div
      className="marquee relative z-10 overflow-hidden border-y border-ocean/10 bg-ocean py-4"
      aria-label="Phronesis design philosophy"
    >
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1}
          >
            {PRINCIPLES.map((p) => (
              <span key={`${dup}-${p}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-cream/85">
                  {p}
                </span>
                <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
                  <rect x="4.5" y="0" width="6.4" height="6.4" transform="rotate(45 4.5 0)" fill="#E8A87C" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
