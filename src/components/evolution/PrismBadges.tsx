"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SPECTRUM } from "@/components/evolution/spectrum";

export interface PrismBadge {
  label: string;
  domain: string;
  description: string;
}

/** One abstract glyph kind per agentic-SDLC stage, in band order. */
const GLYPHS = ["triangle", "nodes", "layers", "loop", "orbit", "shield"] as const;

const spin = { transformBox: "fill-box", transformOrigin: "center" } as const;

function Glyph({ kind, color }: { kind: string; color: string }) {
  switch (kind) {
    case "triangle":
      // Architecture: rotating wireframe triangle
      return (
        <svg viewBox="0 0 80 80" className="h-16 w-16">
          <motion.g
            style={spin}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <path d="M40 14 L66 62 L14 62 Z" fill="none" stroke={color} strokeWidth="1.5" />
            <path
              d="M40 14 L66 62 L14 62 Z"
              fill="none"
              stroke={color}
              strokeWidth="0.6"
              opacity="0.4"
              transform="translate(5 -5)"
            />
          </motion.g>
        </svg>
      );
    case "nodes":
      // Tool use: pulsing connected nodes
      return (
        <svg viewBox="0 0 80 80" className="h-16 w-16">
          <path d="M20 56 L40 22 L62 50 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
          {[
            { cx: 20, cy: 56, d: 0 },
            { cx: 40, cy: 22, d: 0.5 },
            { cx: 62, cy: 50, d: 1 },
          ].map((n) => (
            <motion.circle
              key={`${n.cx}-${n.cy}`}
              cx={n.cx}
              cy={n.cy}
              r="4.5"
              fill={color}
              style={spin}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: n.d }}
            />
          ))}
        </svg>
      );
    case "layers":
      // Memory: stacked layers shifting
      return (
        <svg viewBox="0 0 80 80" className="h-16 w-16">
          {[22, 36, 50].map((y, i) => (
            <motion.rect
              key={y}
              x="18"
              y={y}
              width="44"
              height="9"
              fill="none"
              stroke={color}
              strokeWidth="1.3"
              opacity={1 - i * 0.28}
              animate={{ x: [0, i % 2 === 0 ? 6 : -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
            />
          ))}
        </svg>
      );
    case "loop":
      // Self-healing: rotating open loop arc
      return (
        <svg viewBox="0 0 80 80" className="h-16 w-16">
          <motion.g
            style={spin}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="40"
              cy="40"
              r="20"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="95 31"
            />
            <path d="M60 34 L60 44 L51 39 Z" fill={color} />
          </motion.g>
        </svg>
      );
    case "orbit":
      // Multi-agent: dots orbiting a core
      return (
        <svg viewBox="0 0 80 80" className="h-16 w-16">
          <circle cx="40" cy="40" r="3.5" fill={color} />
          <circle cx="40" cy="40" r="14" fill="none" stroke={color} strokeWidth="0.6" opacity="0.35" />
          <circle cx="40" cy="40" r="24" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
          <motion.g
            style={spin}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="54" cy="40" r="3" fill={color} opacity="0.9" />
          </motion.g>
          <motion.g
            style={spin}
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="40" cy="16" r="2.4" fill={color} opacity="0.6" />
          </motion.g>
        </svg>
      );
    default:
      // Guardrails: shield with expanding gate pulse
      return (
        <svg viewBox="0 0 80 80" className="h-16 w-16">
          <motion.circle
            cx="40"
            cy="40"
            r="16"
            fill="none"
            stroke={color}
            strokeWidth="1"
            animate={{ r: [16, 30], opacity: [0.5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.path
            d="M40 18 L58 26 V42 C58 54 50 60 40 64 C30 60 22 54 22 42 V26 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.6"
            style={spin}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M33 40 L38 45 L48 33" fill="none" stroke={color} strokeWidth="1.6" opacity="0.8" />
        </svg>
      );
  }
}

/**
 * Color-coded SDLC badges under the prism. Clicking a badge opens an info
 * card tinted with that band's color, holding an animated abstract glyph,
 * a short explanation and the matching curriculum domain reference.
 */
export function PrismBadges({ badges }: { badges: PrismBadge[] }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? badges[active] : null;
  const color = active !== null ? (SPECTRUM[active]?.color ?? "#ffffff") : "#ffffff";

  return (
    <div>
      {/* Badge row, in band order (top red → bottom violet) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {badges.map((badge, i) => {
          const band = SPECTRUM[i] ?? SPECTRUM[SPECTRUM.length - 1];
          const isActive = active === i;
          const fromBottom = SPECTRUM.length - 1 - i;
          return (
            <motion.button
              key={badge.label}
              type="button"
              onClick={() => setActive(isActive ? null : i)}
              aria-expanded={isActive}
              className="flex cursor-pointer items-center gap-1.5 border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest transition-colors"
              style={{
                borderColor: isActive ? band.color : `${band.color}59`,
                background: isActive ? `${band.color}1f` : "#000000",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.25 + fromBottom * 0.12 }}
              whileHover={{ y: -2 }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: band.color }}
              />
              {badge.label}
            </motion.button>
          );
        })}
      </div>

      {/* Info card */}
      <AnimatePresence mode="wait">
        {current !== null && active !== null && (
          <motion.div
            key={active}
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mx-auto mt-4 max-w-xl border bg-black p-5"
              style={{
                borderColor: `${color}66`,
                boxShadow: `0 0 28px ${color}1f, inset 0 0 40px ${color}08`,
              }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="shrink-0 border p-1.5"
                  style={{ borderColor: `${color}33` }}
                >
                  <Glyph kind={GLYPHS[active] ?? "shield"} color={color} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-[0.25em]"
                      style={{ color }}
                    >
                      {current.domain}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      aria-label="Close"
                      className="cursor-pointer font-mono text-xs text-white/40 transition hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <h4
                    className="mt-1 text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
                  >
                    {current.label}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    {current.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
