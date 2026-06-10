const ACADEMY_EMAIL = "academy@masterfabric.co";

export interface EnterpriseCopy {
  kicker: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
  subject: string;
}

/** Abstract enterprise AI SDLC objects: fleet mesh, delivery loop, guardrail, eval radar. */
function EnterpriseObjects() {
  return (
    <div
      aria-hidden
      className="ent-objs hidden w-44 shrink-0 grid-cols-2 content-center gap-3 sm:grid"
    >
      {/* Fleet: orchestrator node + symmetric workers */}
      <div className="ent-tile">
        <svg viewBox="0 0 56 56" className="h-12 w-12">
          <g stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1" fill="none">
            <line x1="28" y1="28" x2="12" y2="12" />
            <line x1="28" y1="28" x2="44" y2="12" />
            <line x1="28" y1="28" x2="12" y2="44" />
            <line x1="28" y1="28" x2="44" y2="44" />
          </g>
          <circle cx="12" cy="12" r="3" fill="none" stroke="#ffffff" strokeOpacity="0.7" className="ent-anim ent-pulse" />
          <circle cx="44" cy="12" r="3" fill="none" stroke="#ffffff" strokeOpacity="0.7" className="ent-anim ent-pulse [animation-delay:0.4s]" />
          <circle cx="12" cy="44" r="3" fill="none" stroke="#ffffff" strokeOpacity="0.7" className="ent-anim ent-pulse [animation-delay:0.8s]" />
          <circle cx="44" cy="44" r="3" fill="none" stroke="#ffffff" strokeOpacity="0.7" className="ent-anim ent-pulse [animation-delay:1.2s]" />
          <circle cx="28" cy="28" r="4.5" fill="#ffffff" className="ent-anim ent-pulse" />
        </svg>
        <span className="ent-tile-label">fleet</span>
      </div>

      {/* Loop: rotating dashed SDLC delivery cycle */}
      <div className="ent-tile">
        <svg viewBox="0 0 56 56" className="h-12 w-12">
          <g className="ent-anim ent-spin">
            <circle
              cx="28"
              cy="28"
              r="16"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.7"
              strokeWidth="1.5"
              strokeDasharray="7 5"
            />
            <path d="M44 28 l-4 -4 l0 8 Z" fill="#ffffff" fillOpacity="0.9" />
          </g>
          <circle cx="28" cy="28" r="2" fill="#ffffff" fillOpacity="0.5" />
        </svg>
        <span className="ent-tile-label">loop</span>
      </div>

      {/* Guard: hexagonal guardrail + blinking HITL gate */}
      <div className="ent-tile">
        <svg viewBox="0 0 56 56" className="h-12 w-12">
          <path
            d="M28 8 L44 17 L44 39 L28 48 L12 39 L12 17 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
          <line
            x1="20"
            y1="28"
            x2="36"
            y2="28"
            stroke="#ffffff"
            strokeWidth="2"
            className="ent-anim ent-blink"
          />
          <circle cx="28" cy="28" r="6" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
        </svg>
        <span className="ent-tile-label">guard</span>
      </div>

      {/* Eval: radar sweep over concentric trace rings */}
      <div className="ent-tile">
        <svg viewBox="0 0 56 56" className="h-12 w-12">
          <circle cx="28" cy="28" r="6" fill="none" stroke="#ffffff" strokeOpacity="0.2" />
          <circle cx="28" cy="28" r="12" fill="none" stroke="#ffffff" strokeOpacity="0.3" />
          <circle cx="28" cy="28" r="18" fill="none" stroke="#ffffff" strokeOpacity="0.4" />
          <g className="ent-anim ent-sweep">
            <line x1="28" y1="28" x2="28" y2="10" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="28" cy="13" r="2" fill="#ffffff" />
          </g>
          <circle cx="28" cy="28" r="1.5" fill="#ffffff" />
        </svg>
        <span className="ent-tile-label">eval</span>
      </div>
    </div>
  );
}

/**
 * Enterprise / large-organization card in the hero: separate application
 * channel for custom training programs and project partnership.
 */
export function EnterpriseCard({ copy }: { copy: EnterpriseCopy }) {
  const mailtoHref = `mailto:${ACADEMY_EMAIL}?subject=${encodeURIComponent(copy.subject)}`;

  return (
    <div className="instructor-card mt-12 max-w-2xl border border-white/15 bg-white/[0.03] p-6 sm:flex sm:items-stretch sm:gap-8 sm:p-8">
      <div className="min-w-0 flex-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
          {copy.kicker}
        </span>
        <h2
          className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {copy.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
          {copy.description}
        </p>

        <ul className="mt-5 space-y-1.5">
          {copy.points.map((point) => (
            <li
              key={point}
              className="flex items-baseline gap-2.5 font-mono text-[11px] uppercase tracking-widest text-white/60"
            >
              <span className="text-white">+</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={mailtoHref}
            className="border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
          >
            {copy.cta}
          </a>
          <span className="font-mono text-[11px] tracking-wide text-white/40">
            {ACADEMY_EMAIL}
          </span>
        </div>
      </div>

      <EnterpriseObjects />
    </div>
  );
}
