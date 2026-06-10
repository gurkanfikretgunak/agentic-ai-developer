"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { PrismBadges, type PrismBadge } from "@/components/evolution/PrismBadges";
import { ORIGIN, SPECTRUM } from "@/components/evolution/spectrum";

/**
 * Dark-Side-of-the-Moon prism: a liquid-glass prism with a moving specular
 * sheen, and a single white beam dispersing into a full-color spectrum — the
 * one deliberate burst of color on a monochrome site.
 *
 * Scroll progress is passed through a spring so the draw stays smooth and
 * stable while scrolling. Bands stagger in bottom-to-top, each with its own
 * final length, and a color-matched interactive SDLC badge row sits under
 * the prism in band order.
 */

/** Stagger window per band, ordered bottom (violet) → top (red). */
function bandRange(index: number): [number, number] {
  const fromBottom = SPECTRUM.length - 1 - index;
  const start = 0.34 + fromBottom * 0.055;
  return [start, Math.min(start + 0.32, 1)];
}

function bandPath(y2: number, x2: number) {
  const midY = ORIGIN.y + (y2 - ORIGIN.y) * 0.35;
  const c1x = ORIGIN.x + (x2 - ORIGIN.x) * 0.37;
  const c2x = ORIGIN.x + (x2 - ORIGIN.x) * 0.66;
  return `M${ORIGIN.x} ${ORIGIN.y} C ${c1x} ${midY}, ${c2x} ${y2}, ${x2} ${y2}`;
}

function SpectrumBand({
  band,
  index,
  progress,
}: {
  band: (typeof SPECTRUM)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const draw = useTransform(progress, bandRange(index), [0, 1]);
  const d = bandPath(band.y2, band.x2);

  return (
    <>
      {/* Soft halo behind the band (liquid light bleed) */}
      <motion.path
        d={d}
        fill="none"
        stroke={band.color}
        strokeWidth="10"
        strokeOpacity="0.18"
        strokeLinecap="round"
        filter="url(#halo)"
        style={{ pathLength: draw }}
      />
      {/* Main band */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#band-${band.color.slice(1)})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#beam-glow)"
        style={{ pathLength: draw }}
      />
    </>
  );
}

export function PrismScene({
  caption,
  badges,
}: {
  caption: string;
  badges: PrismBadge[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.35"],
  });

  // Spring-smoothed progress: eliminates jitter while scrolling.
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.6,
    restDelta: 0.001,
  });

  const beamDraw = useTransform(progress, [0, 0.4], [0, 1]);
  const refractionDraw = useTransform(progress, [0.28, 0.42], [0, 1]);
  const prismGlow = useTransform(progress, [0.25, 0.65], [0.25, 1]);
  const captionOpacity = useTransform(progress, [0.45, 0.85], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-3xl">
      <svg viewBox="0 0 800 280" className="w-full" role="img" aria-label={caption}>
        <defs>
          {/* Liquid glass body */}
          <linearGradient id="glass-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="75%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="glass-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </linearGradient>

          {/* Spectrum band gradients: white core fading into pure color */}
          {SPECTRUM.map((band) => (
            <linearGradient
              key={band.color}
              id={`band-${band.color.slice(1)}`}
              gradientUnits="userSpaceOnUse"
              x1={ORIGIN.x}
              y1={ORIGIN.y}
              x2={band.x2}
              y2={band.y2}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="18%" stopColor={band.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={band.color} stopOpacity="0.75" />
            </linearGradient>
          ))}

          <filter id="beam-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="halo" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>

          {/* Heavy blurs for the specular sheen sweeping through the glass */}
          <filter id="sheen-soft" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="sheen-core" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" />
          </filter>

          {/* Keep every sheen layer inside the glass body */}
          <clipPath id="prism-clip">
            <path d="M400 40 L510 230 L290 230 Z" />
          </clipPath>
        </defs>

        {/* Incoming white beam */}
        <motion.line
          x1="0"
          y1="190"
          x2="330"
          y2="142"
          stroke="#ffffff"
          strokeWidth="2.5"
          filter="url(#beam-glow)"
          style={{ pathLength: beamDraw }}
        />

        {/* Spectrum bands: staggered bottom-to-top, varying lengths */}
        {SPECTRUM.map((band, index) => (
          <SpectrumBand
            key={band.color}
            band={band}
            index={index}
            progress={progress}
          />
        ))}

        {/* Refraction inside the prism */}
        <motion.line
          x1="330"
          y1="142"
          x2={ORIGIN.x}
          y2={ORIGIN.y}
          stroke="#ffffff"
          strokeWidth="1.6"
          opacity="0.75"
          filter="url(#beam-glow)"
          style={{ pathLength: refractionDraw }}
        />

        {/* Liquid glass prism (drawn after beams so the glass sits on top) */}
        <motion.g style={{ opacity: prismGlow }}>
          <path
            d="M400 40 L510 230 L290 230 Z"
            fill="url(#glass-fill)"
            stroke="url(#glass-edge)"
            strokeWidth="2"
          />
          {/* Inner facet */}
          <path
            d="M400 40 L400 230"
            stroke="#ffffff"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          {/* Ghost outline (depth) */}
          <path
            d="M400 40 L510 230 L290 230 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.35"
            transform="translate(7 -7)"
          />
          {/* Specular sheen: blurred light sweep clipped inside the glass */}
          <g clipPath="url(#prism-clip)">
            {/* Broad ambient glow trailing the sweep */}
            <motion.path
              d="M395 30 L320 240"
              stroke="#ffffff"
              strokeWidth="64"
              strokeLinecap="round"
              filter="url(#sheen-soft)"
              initial={{ x: -90, opacity: 0 }}
              animate={{ x: [-90, 200], opacity: [0, 0.14, 0.14, 0] }}
              transition={{
                duration: 6,
                times: [0, 0.25, 0.75, 1],
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
            />
            {/* Brighter core of the sweep */}
            <motion.path
              d="M392 30 L325 240"
              stroke="#ffffff"
              strokeWidth="18"
              strokeLinecap="round"
              filter="url(#sheen-core)"
              initial={{ x: -90, opacity: 0 }}
              animate={{ x: [-90, 200], opacity: [0, 0.32, 0.32, 0] }}
              transition={{
                duration: 6,
                times: [0, 0.25, 0.75, 1],
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
            />
            {/* Faint counter-sheen drifting the other way (liquid depth) */}
            <motion.path
              d="M405 30 L470 240"
              stroke="#ffffff"
              strokeWidth="30"
              strokeLinecap="round"
              filter="url(#sheen-soft)"
              initial={{ x: 90, opacity: 0 }}
              animate={{ x: [90, -180], opacity: [0, 0.07, 0.07, 0] }}
              transition={{
                duration: 9,
                times: [0, 0.3, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 2.4,
                ease: "easeInOut",
              }}
            />
            {/* Breathing glow pooled at the base of the glass */}
            <motion.ellipse
              cx="400"
              cy="226"
              rx="95"
              ry="14"
              fill="#ffffff"
              filter="url(#sheen-soft)"
              animate={{ opacity: [0.04, 0.1, 0.04] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* Corner glints */}
          <motion.circle
            cx="400"
            cy="40"
            r="3"
            fill="#ffffff"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="510"
            cy="230"
            r="2.2"
            fill="#ffffff"
            animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.25, 0.8] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.1,
            }}
          />
          <motion.circle
            cx="290"
            cy="230"
            r="2.2"
            fill="#ffffff"
            animate={{ opacity: [0.1, 0.6, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.g>
      </svg>

      {/* Interactive color-matched SDLC badges, in band order */}
      <PrismBadges badges={badges} />

      <motion.p
        className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/45"
        style={{ opacity: captionOpacity }}
      >
        {caption}
      </motion.p>
    </div>
  );
}
