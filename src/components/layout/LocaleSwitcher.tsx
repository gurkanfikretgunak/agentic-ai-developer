"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALES = ["en", "tr"] as const;

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname() ?? "/";

  function pathFor(target: string) {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="flex items-center border border-white/25 font-mono text-[11px]">
      {LOCALES.map((code) => (
        <Link
          key={code}
          href={pathFor(code)}
          className={
            code === locale
              ? "bg-white px-2.5 py-1 font-bold uppercase text-black"
              : "px-2.5 py-1 uppercase text-white/60 transition hover:text-white"
          }
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
