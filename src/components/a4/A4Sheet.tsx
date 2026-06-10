import type { ReactNode } from "react";

/**
 * Simulates a single A4 page (210mm x 297mm) on screen and maps 1:1
 * onto a physical page when printed.
 */
export function A4Sheet({
  header,
  footer,
  children,
}: {
  header: { left: string; right: string };
  footer: { left: string; right: string };
  children: ReactNode;
}) {
  return (
    <section className="a4-sheet">
      <div className="mb-6 flex items-center justify-between border-b border-white/15 pb-3 font-mono text-[10px] uppercase tracking-widest text-white/45">
        <span>{header.left}</span>
        <span>{header.right}</span>
      </div>

      <div className="flex-1">{children}</div>

      <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-3 font-mono text-[10px] text-white/45">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </div>
    </section>
  );
}
