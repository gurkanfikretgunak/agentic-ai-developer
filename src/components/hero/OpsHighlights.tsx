export interface OpsItem {
  name: string;
  tag: string;
  short: string;
  long: string;
}

export interface OpsCopy {
  kicker: string;
  statement: string;
  items: OpsItem[];
}

/**
 * DevOps + SecOps + LLMOps highlight strip under the hero lead.
 * Each card reveals a long-form explanation on hover dwell, conveying that
 * the AI SDLC is now its own discipline.
 */
export function OpsHighlights({ copy }: { copy: OpsCopy }) {
  return (
    <div className="mt-10 max-w-2xl">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
        {copy.kicker}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{copy.statement}</p>

      <div className="mt-5 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
        {copy.items.map((item) => (
          <div key={item.name} className="ops-card bg-black p-5">
            <div className="flex items-baseline gap-2">
              <span className="ops-card-title font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
                {item.name}
              </span>
              <span className="text-white/30">+</span>
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
              {item.tag}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/55">{item.short}</p>

            {/* Long-form explanation revealed on hover dwell */}
            <div className="ops-tip" role="tooltip">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                {item.name}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/70">{item.long}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
