import type { ReactNode } from "react";

/** Minimal chrome for embed iframes — no header/footer from locale layout. */
export default function EmbedLayout({ children }: { children: ReactNode }) {
  return <div className="embed-shell min-h-0 bg-black text-white">{children}</div>;
}
