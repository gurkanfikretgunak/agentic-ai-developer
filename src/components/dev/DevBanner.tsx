"use client";

import { usePathname } from "next/navigation";
import { isLocalDevelopment } from "@/lib/env";

/**
 * Fixed construction-style banner shown only during local development.
 * Hidden on /embed/* so badge iframes stay clean.
 */
export function DevBanner() {
  const pathname = usePathname() ?? "";
  if (!isLocalDevelopment()) return null;
  if (pathname.startsWith("/embed")) return null;

  return (
    <>
      <div
        className="dev-banner fixed inset-x-0 top-0 z-[300] flex h-12 items-center justify-center px-4"
        role="status"
        aria-live="polite"
      >
        <p className="dev-banner-text text-center text-sm font-extrabold sm:text-base">
          <span className="dev-banner-icon" aria-hidden>
            ⚠
          </span>{" "}
          LOCALHOST — Local development environment
        </p>
      </div>
      <div aria-hidden className="h-12 shrink-0" />
    </>
  );
}
