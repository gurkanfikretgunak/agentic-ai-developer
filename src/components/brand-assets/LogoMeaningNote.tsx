"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface LogoMeaningCopy {
  trigger: string;
  title: string;
  paragraphs: string[];
  attribution: string;
  close: string;
}

export function LogoMeaningNote({
  subtitle,
  meaning,
}: {
  subtitle: string;
  meaning: LogoMeaningCopy;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <p className="mt-3 max-w-2xl text-sm text-white/55">
        {subtitle}{" "}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-bold text-white underline decoration-white/50 underline-offset-4 transition hover:decoration-white"
        >
          {meaning.trigger}
        </button>
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label={meaning.close}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative w-full max-w-lg border border-white/40 bg-black p-2"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden border border-white/20 px-6 py-8 sm:px-8">
                <MasterFabricLogo className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-44 text-white opacity-[0.05]" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <MasterFabricLogo className="h-10 w-12 shrink-0 text-white" />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-mono text-[10px] uppercase tracking-widest text-white/45 transition hover:text-white"
                    >
                      {meaning.close}
                    </button>
                  </div>

                  <h2
                    id={titleId}
                    className="mt-6 text-xl font-bold text-white sm:text-2xl"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {meaning.title}
                  </h2>
                  <div className="mt-3 h-px w-14 bg-white/40" />

                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/65">
                    {meaning.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <p className="mt-6 border-t border-white/15 pt-4 font-mono text-[10px] leading-relaxed tracking-wide text-white/40">
                    {meaning.attribution}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
