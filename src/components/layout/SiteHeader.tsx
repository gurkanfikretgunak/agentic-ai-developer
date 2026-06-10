import Link from "next/link";
import { AcademyBadge } from "@/components/brand/AcademyBadge";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { Dictionary, Locale } from "@/lib/i18n";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="print-hidden sticky top-0 z-50 border-b border-white/15 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <AcademyBadge size={56} className="border border-white/20" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide text-white">
              MasterFabric
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
              {dict.header.academy}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-widest text-white/60 sm:flex">
          <Link href={`/${locale}`} className="transition hover:text-white">
            {dict.header.nav.home}
          </Link>
          <Link
            href={`/${locale}#why-agentic`}
            className="transition hover:text-white"
          >
            {dict.header.nav.why}
          </Link>
          <Link
            href={`/${locale}#certificate`}
            className="transition hover:text-white"
          >
            {dict.header.nav.certificate}
          </Link>
          <Link
            href={`/${locale}#apply`}
            className="transition hover:text-white"
          >
            {dict.header.nav.apply}
          </Link>
          <Link
            href={`/${locale}/guide`}
            className="border border-white/30 px-3 py-1.5 transition hover:border-white hover:bg-white hover:text-black"
          >
            {dict.header.nav.guide}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] text-white/40 lg:block">
            {dict.header.docRef}
          </span>
          <LocaleSwitcher locale={locale} />
          <a
            href={dict.footer.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="text-white/60 transition hover:text-white"
          >
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
