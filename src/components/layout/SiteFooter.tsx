import type { Dictionary } from "@/lib/i18n";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="print-hidden mt-auto border-t border-white/15">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a
          href={dict.footer.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap font-mono text-[11px] tracking-wide text-white/45 transition hover:text-white"
        >
          {dict.footer.sourceLabel} — {dict.footer.sourceText}
        </a>
        <p className="whitespace-nowrap text-right font-mono text-[11px] tracking-wide text-white/45">
          {dict.footer.line}
        </p>
      </div>
    </footer>
  );
}
