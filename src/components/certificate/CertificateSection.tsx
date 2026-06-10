"use client";

import { motion } from "framer-motion";
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
              <p
                className="mt-2 text-2xl italic text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                {copy.sampleName}
              </p>
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
