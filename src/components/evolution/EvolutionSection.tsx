"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IdeSimulation, type IdeSim } from "@/components/evolution/IdeSimulation";
import type { PrismBadge } from "@/components/evolution/PrismBadges";
import { PrismScene } from "@/components/evolution/PrismScene";
import { SunriseScene } from "@/components/evolution/SunriseScene";

export interface Era {
  year: string;
  title: string;
  description: string;
  detail: string;
  statLabel: string;
  statValue: number;
  statSuffix: string;
  sim: IdeSim;
}

export interface EvolutionCopy {
  kicker: string;
  title: string;
  subtitle: string;
  prismCaption: string;
  prismBadges: PrismBadge[];
  sunriseCaption: string;
  outro: string;
  eras: Era[];
}

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono text-5xl font-bold text-white sm:text-6xl">
      {display}
      <span className="text-2xl text-white/50">{suffix}</span>
    </span>
  );
}

function EraPanel({ era, index }: { era: Era; index: number }) {
  const fromLeft = index % 2 === 0;

  return (
    <div className="relative grid items-start gap-x-10 gap-y-8 py-20 md:grid-cols-2">
      {/* Era text */}
      <motion.div
        className={fromLeft ? "md:order-1" : "md:order-2"}
        initial={{ opacity: 0, x: fromLeft ? -80 : 80, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-serif text-7xl font-bold text-white/10 sm:text-8xl">
          {era.year}
        </span>
        <h3
          className="mt-2 text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {era.title}
        </h3>
        <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-white/70">
          {era.description}
        </p>
        <p className="mt-3 max-w-md text-justify text-[13px] leading-relaxed text-white/45">
          {era.detail}
        </p>
      </motion.div>

      {/* Era stat */}
      <motion.div
        className={`flex flex-col items-start gap-3 border border-white/15 bg-white/[0.03] p-8 ${
          fromLeft ? "md:order-2" : "md:order-1"
        }`}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        <AnimatedStat value={era.statValue} suffix={era.statSuffix} />
        <div className="h-px w-full bg-white/15" />
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">
          {era.statLabel}
        </p>
        <div className="h-1.5 w-full border border-white/20 bg-white/5">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            whileInView={{ width: `${era.statValue}%` }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Era IDE simulation — how the editor felt that year */}
      <motion.div
        className="md:order-3 md:col-span-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <IdeSimulation sim={era.sim} />
      </motion.div>
    </div>
  );
}

export function EvolutionSection({ copy }: { copy: EvolutionCopy }) {
  return (
    <section id="why-agentic" className="relative overflow-hidden border-y border-white/15">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        {/* Section heading */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/45">
            {copy.kicker}
          </span>
          <h2
            className="mt-4 text-4xl font-bold text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {copy.title}
          </h2>
          <p className="mt-4 text-sm text-white/55">{copy.subtitle}</p>
        </motion.div>

        {/* Prism */}
        <div className="mt-20">
          <PrismScene caption={copy.prismCaption} badges={copy.prismBadges} />
        </div>

        {/* Timeline spine */}
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
          {copy.eras.map((era, index) => (
            <EraPanel key={era.year} era={era} index={index} />
          ))}
        </div>
      </div>

      {/* Sunrise finale: rises while scrolling, carries the outro, fades out */}
      <SunriseScene caption={copy.sunriseCaption} outro={copy.outro} />
    </section>
  );
}
