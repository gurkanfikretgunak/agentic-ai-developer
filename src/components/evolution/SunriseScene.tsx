"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-driven finale: as the user keeps scrolling past the timeline,
 * a sun rises over a horizon line, carries the closing thought with it,
 * then dissolves away.
 */
export function SunriseScene({
  caption,
  outro,
}: {
  caption: string;
  outro: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sunY = useTransform(scrollYProgress, [0.12, 0.62], ["24vh", "-4vh"]);
  const sunOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.75, 0.92],
    [0, 1, 1, 0],
  );
  const sunScale = useTransform(scrollYProgress, [0.1, 0.88], [0.75, 1.2]);
  const horizonOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.8, 0.93],
    [0, 1, 1, 0],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.52, 0.78, 0.92],
    [0, 1, 1, 0],
  );
  const captionOpacity = useTransform(scrollYProgress, [0.12, 0.26, 0.4], [0, 1, 0]);

  return (
    <div ref={ref} className="relative h-[120vh]">
      <div className="sticky top-0 flex h-[70vh] min-h-[480px] flex-col items-center justify-center overflow-hidden">
        {/* Caption (early hint) */}
        <motion.p
          className="absolute top-24 px-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/40"
          style={{ opacity: captionOpacity }}
        >
          {caption}
        </motion.p>

        {/* Outro quote rides above the sun */}
        <motion.blockquote
          className="relative z-10 mx-auto max-w-2xl px-6 text-center text-lg italic leading-relaxed text-white/85 sm:text-xl"
          style={{
            opacity: textOpacity,
            fontFamily: "var(--font-lora), Georgia, serif",
          }}
        >
          {outro}
        </motion.blockquote>

        {/* Sun */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full"
          style={{
            y: sunY,
            opacity: sunOpacity,
            scale: sunScale,
            background:
              "radial-gradient(circle, #fffdf4 0%, #ffedb8 28%, rgba(255,200,120,0.55) 48%, rgba(255,160,90,0.18) 64%, transparent 75%)",
          }}
        />

        {/* Horizon */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[28%] left-0 right-0"
          style={{ opacity: horizonOpacity }}
        >
          <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="mx-auto mt-1 h-px max-w-2xl bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </motion.div>

        {/* Ground mask: hides the sun below the horizon */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 z-[5] h-[28%] bg-gradient-to-t from-black via-black to-black/0"
        />
      </div>
    </div>
  );
}
