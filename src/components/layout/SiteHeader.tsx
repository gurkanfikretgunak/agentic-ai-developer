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
        </div>
      </div>
    </header>
  );
}
