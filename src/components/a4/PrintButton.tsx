"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden border border-white bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
    >
      {label}
    </button>
  );
}
