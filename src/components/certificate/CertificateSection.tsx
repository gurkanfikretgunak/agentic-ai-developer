"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AcademyBadge } from "@/components/brand/AcademyBadge";
import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface CertificateCopy {
  kicker: string;
  title: string;
  subtitle: string;
  dynamicNote: string;
  docTitle: string;
  program: string;
  presentedTo: string;
  sampleName: string;
  completedText: string;
  nextModule: string;
  issuedLabel: string;
  issuedValue: string;
  refLabel: string;
  refValue: string;
  directorLabel: string;
  directorName: string;
  weightWord: string;
}

export interface CertModule {
  title: string;
  weight?: number;
}

/** The recipient name types itself in once the certificate scrolls into view. */
function TypewriterName({ name }: { name: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const done = count >= name.length;

  useEffect(() => {
    if (!inView || done) return;
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 500 : 85);
    return () => clearTimeout(t);
  }, [inView, count, done]);

  return (
    <p
      ref={ref}
      className="mt-2 text-2xl italic text-white sm:text-3xl"
      style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
    >
      {name.slice(0, count)}
      <motion.span
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-white/80"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        aria-hidden
      />
      {/* Reserve space so layout doesn't shift while typing */}
      <span className="invisible absolute">{name}</span>
    </p>
  );
}

/** Live verification seal: rotating dashed ring + cycling check statuses. */
const SEAL_STATES = ["HASH MATCH", "ED25519 SIG", "ISSUER: MFA"];

function VerificationSeal() {
  const [state, setState] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setState((s) => (s + 1) % SEAL_STATES.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      aria-hidden
      className="absolute right-5 top-5 hidden flex-col items-center gap-1.5 sm:flex"
    >
      <div className="relative h-14 w-14">
        <svg viewBox="0 0 56 56" className="cert-seal-ring absolute inset-0 h-full w-full">
          <circle
            cx="28"
            cy="28"
            r="25"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="4 5"
          />
        </svg>
        <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full">
          <circle
            cx="28"
            cy="28"
            r="18"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-sm text-white"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ✓
        </motion.span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          className="font-mono text-[8px] uppercase tracking-widest text-white/45"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {SEAL_STATES[state]} ✓
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * Sample certificate preview. The module list is passed in from the server,
 * read live from the markdown curriculum — publishing a new markdown module
 * automatically extends every certificate rendered after that moment.
 */
export function CertificateSection({
  copy,
  modules,
}: {
  copy: CertificateCopy;
  modules: CertModule[];
}) {
  return (
    <section id="certificate" className="border-t border-white/15">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
            {copy.kicker}
          </span>
          <h2
            className="mt-4 text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/55">{copy.subtitle}</p>

          <div className="mt-5 inline-flex items-center gap-2 border border-white/30 bg-white/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
              {copy.dynamicNote}
            </span>
          </div>
        </motion.div>

        {/* Certificate document */}
        <motion.div
          className="relative mx-auto mt-12 max-w-4xl border border-white/40 bg-black p-2"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative overflow-hidden border border-white/20 px-6 py-12 sm:px-14">
            {/* Watermark */}
            <MasterFabricLogo className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-80 text-white opacity-[0.04]" />

            {/* Periodic verification scan sweeping down the document */}
            <div aria-hidden className="cert-scan pointer-events-none absolute inset-x-0 h-24" />

            {/* Live digital seal */}
            <VerificationSeal />

            <div className="relative flex flex-col items-center text-center">
              <AcademyBadge size={88} className="border border-white/20" />

              <span className="mt-8 font-mono text-[10px] uppercase tracking-[0.5em] text-white/50">
                {copy.docTitle}
              </span>
              <h3
                className="mt-3 text-3xl font-bold text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {copy.program}
              </h3>
              <div className="mt-4 h-px w-24 bg-white/40" />

              <p className="mt-8 text-xs uppercase tracking-widest text-white/45">
                {copy.presentedTo}
              </p>
              <TypewriterName name={copy.sampleName} />
              <p className="mt-2 text-xs text-white/45">{copy.completedText}</p>

              {/* Dynamic module list */}
              <div className="mt-8 grid w-full grid-cols-1 gap-x-10 gap-y-1 text-left sm:grid-cols-2">
                {modules.map((mod, i) => (
                  <motion.div
                    key={mod.title}
                    className="flex items-baseline justify-between gap-3 border-b border-dashed border-white/15 py-2"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <span className="text-[11px] leading-snug text-white/75">
                      {mod.title}
                    </span>
                    {mod.weight !== undefined && (
                      <span className="shrink-0 font-mono text-[10px] text-white/45">
                        {mod.weight}% {copy.weightWord}
                      </span>
                    )}
                  </motion.div>
                ))}

                {/* Ghost slot: visualizes that new markdown modules land here */}
                <motion.div
                  className="flex items-baseline justify-between gap-3 border border-dashed border-white/25 px-3 py-2"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    + {copy.nextModule}
                  </span>
                </motion.div>
              </div>

              {/* Footer row */}
              <div className="mt-12 grid w-full grid-cols-1 items-end gap-8 text-left sm:grid-cols-3">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                    {copy.issuedLabel}
                  </span>
                  <span className="mt-1 block text-xs text-white/80">
                    {copy.issuedValue}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                    {copy.refLabel}
                  </span>
                  <span className="mt-1 block font-mono text-xs text-white/80">
                    {copy.refValue}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className="block text-lg italic text-white"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {copy.directorName}
                  </span>
                  <div className="ml-auto mt-1 h-px w-40 bg-white/40" />
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-white/40">
                    {copy.directorLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
