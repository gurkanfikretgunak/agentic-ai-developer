import Link from "next/link";

export interface AcademyAppCopy {
  kicker: string;
  title: string;
  body: string;
  academyCta: string;
  academyUrl: string;
  applyCta: string;
}

/**
 * Compact admissions notice under the hero lead: Cohort 1 complete,
 * free access via academy-app, Cohort 2 applications open.
 */
export function AcademyAppBanner({
  copy,
  applyHref,
}: {
  copy: AcademyAppCopy;
  applyHref: string;
}) {
  return (
    <aside
      aria-label={copy.kicker}
      className="mt-6 max-w-2xl border border-white/25 bg-white/[0.04] p-5"
    >
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
        {copy.kicker}
      </span>
      <p
        className="mt-3 text-base font-bold leading-snug text-white sm:text-lg"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {copy.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{copy.body}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={copy.academyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white bg-white px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
        >
          {copy.academyCta} ↗
        </a>
        <Link
          href={applyHref}
          className="border border-white/40 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          {copy.applyCta}
        </Link>
      </div>
    </aside>
  );
}
