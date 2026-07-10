"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface BrandUsageCopy {
  dontTitle: string;
  dontHint: string;
  dontLabel: string;
  warningBand: string;
  dontItems: { label: string; detail: string }[];
  usageTitle: string;
  usageHint: string;
  linkedinLabel: string;
  linkedinHint: string;
  squareLabel: string;
  squareHint: string;
  squareKicker: string;
  squareHeadline: string;
  squareSub: string;
  coverDownload: string;
  coverGenerating: string;
  coverFormats: {
    linkedin: string;
    x: string;
    default: string;
  };
  squareDownload: string;
  squareSizeLabel: string;
}

type CoverFormat = "linkedin" | "x" | "default";

const COVER_SPECS: Record<
  CoverFormat,
  { width: number; aspect: string; file: string }
> = {
  linkedin: {
    width: 1584,
    aspect: "4 / 1",
    file: "masterfabric-academy-cover-linkedin.png",
  },
  x: {
    width: 1500,
    aspect: "3 / 1",
    file: "masterfabric-academy-cover-x.png",
  },
  default: {
    width: 1600,
    aspect: "16 / 9",
    file: "masterfabric-academy-cover-default.png",
  },
};

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const BADGE_STOPS = [60, 80, 100, 120] as const;
type BadgeStop = (typeof BADGE_STOPS)[number];

function scaleFromBadge(badge: number) {
  // 60 → compact, 120 → fills the frame
  const t = (badge - 60) / 60;
  return {
    badge,
    kickerPx: 9 + t * 4,
    headlinePx: 18 + t * 18,
    subPx: 10 + t * 4,
    gap: 12 + t * 12,
    ruleW: 40 + t * 40,
    tracking: 0.4 + t * 0.12,
  };
}

function CoverBanner({ aspect }: { aspect: string }) {
  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ aspectRatio: aspect }}
    >
      <MasterFabricLogo className="pointer-events-none absolute -right-6 -top-8 h-32 w-36 text-white opacity-[0.06]" />
      <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-10">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/45">
            MasterFabric Academy
          </span>
          <p
            className="mt-1 text-base font-bold text-white sm:text-lg"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Agentic AI Developer
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/academy-badge.png"
          alt=""
          width={80}
          height={80}
          className="h-14 w-14 rounded-full border border-white/25 sm:h-16 sm:w-16"
        />
      </div>
    </div>
  );
}

function SquarePost({
  kicker,
  headline,
  sub,
  badgeSize = 120,
}: {
  kicker: string;
  headline: string;
  sub: string;
  badgeSize?: number;
}) {
  const s = scaleFromBadge(badgeSize);
  return (
    <div className="relative aspect-square w-full bg-black">
      <MasterFabricLogo className="pointer-events-none absolute -bottom-10 -left-8 h-44 w-48 text-white opacity-[0.05]" />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ gap: s.gap }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/academy-badge.png"
          alt=""
          width={s.badge}
          height={s.badge}
          className="rounded-full border border-white/25"
          style={{ width: s.badge, height: s.badge }}
        />
        <div className="flex flex-col items-center">
          <span
            className="font-mono uppercase text-white/50"
            style={{
              fontSize: s.kickerPx,
              letterSpacing: `${s.tracking}em`,
            }}
          >
            {kicker}
          </span>
          <p
            className="mt-2 font-bold text-white"
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: s.headlinePx,
            }}
          >
            {headline}
          </p>
          <div
            className="mt-3 h-px bg-white/35"
            style={{ width: s.ruleW }}
          />
          <p
            className="mt-3 text-white/45"
            style={{ fontSize: s.subPx }}
          >
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Visual don'ts + LinkedIn cover / 1:1 post mockups for Academy badge. */
export function BrandUsageGuide({ copy }: { copy: BrandUsageCopy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [squareBusy, setSquareBusy] = useState(false);
  const [badgeSize, setBadgeSize] = useState<BadgeStop>(120);
  const [activeFormat, setActiveFormat] = useState<CoverFormat>("linkedin");
  const exportRef = useRef<HTMLDivElement>(null);
  const squareExportRef = useRef<HTMLDivElement>(null);

  async function downloadCover(format: CoverFormat) {
    setActiveFormat(format);
    setMenuOpen(false);
    setBusy(true);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    try {
      const node = exportRef.current;
      if (!node) return;
      await document.fonts.ready;
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#000000",
      });
      triggerDownload(dataUrl, COVER_SPECS[format].file);
    } finally {
      setBusy(false);
    }
  }

  async function downloadSquare() {
    if (squareBusy) return;
    setSquareBusy(true);
    try {
      const node = squareExportRef.current;
      if (!node) return;
      await document.fonts.ready;
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#000000",
      });
      triggerDownload(dataUrl, "masterfabric-academy-post-1x1.png");
    } finally {
      setSquareBusy(false);
    }
  }

  const formats: { id: CoverFormat; label: string }[] = [
    { id: "linkedin", label: copy.coverFormats.linkedin },
    { id: "x", label: copy.coverFormats.x },
    { id: "default", label: copy.coverFormats.default },
  ];

  return (
    <div className="mt-12 space-y-12">
      <section>
        <div className="flex items-center gap-3 border border-[#ff2d2d]/50 bg-[#ff2d2d]/10 px-4 py-2.5">
          <span
            aria-hidden
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#ff2d2d]"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff6b6b]">
            {copy.warningBand}
          </p>
        </div>

        <h3
          className="mt-5 text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {copy.dontTitle}
        </h3>
        <p className="mt-2 max-w-xl text-sm text-white/55">{copy.dontHint}</p>

        <div className="mt-6 grid gap-px border border-[#ff2d2d]/25 bg-[#ff2d2d]/25 sm:grid-cols-2 lg:grid-cols-4">
          {copy.dontItems.map((item, i) => (
            <DontCard
              key={item.label}
              index={i}
              label={item.label}
              detail={item.detail}
              dont={copy.dontLabel}
            />
          ))}
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {copy.usageTitle}
        </h3>
        <p className="mt-2 max-w-xl text-sm text-white/55">{copy.usageHint}</p>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="flex min-h-[4.25rem] items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {copy.linkedinLabel}
                </span>
                <p className="mt-1 text-xs leading-snug text-white/45">
                  {copy.linkedinHint}
                </p>
              </div>

              <div className="relative shrink-0">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setMenuOpen((o) => !o)}
                  className="border border-white bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-40"
                >
                  {busy ? copy.coverGenerating : copy.coverDownload}
                </button>
                {menuOpen && !busy && (
                  <>
                    <button
                      type="button"
                      aria-label="Close"
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-1 min-w-[11rem] border border-white/25 bg-black py-1">
                      {formats.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => downloadCover(f.id)}
                          className="block w-full px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-white/70 transition hover:bg-white hover:text-black"
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 overflow-hidden border border-white/25">
              <CoverBanner aspect="4 / 1" />
              <div className="relative border-t border-white/10 bg-white/[0.03] px-5 pb-4 pt-0 sm:px-8">
                <div className="flex items-end justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="-mt-7 h-12 w-12 shrink-0 overflow-hidden rounded-full border-[3px] border-black bg-gradient-to-b from-white/25 to-white/10 sm:-mt-9 sm:h-16 sm:w-16">
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-white/20 sm:h-5 sm:w-5" />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col justify-center gap-2 pb-0.5 pt-3">
                      <div className="h-2.5 w-28 rounded-sm bg-white/30 sm:w-36" />
                      <div className="h-1.5 w-40 max-w-full rounded-sm bg-white/15 sm:w-52" />
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-14 rounded-sm bg-white/10" />
                        <div className="h-1 w-1 rounded-full bg-white/15" />
                        <div className="h-1 w-20 rounded-sm bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-1 hidden shrink-0 items-center gap-2 self-center sm:flex">
                    <div className="h-6 w-16 rounded-full border border-white/20 bg-white/10" />
                    <div className="h-6 w-6 rounded-full border border-white/15" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex min-h-[4.25rem] items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {copy.squareLabel}
                </span>
                <p className="mt-1 text-xs leading-snug text-white/45">
                  {copy.squareHint}
                </p>
              </div>
              <button
                type="button"
                disabled={squareBusy}
                onClick={downloadSquare}
                className="shrink-0 border border-white bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-40"
              >
                {squareBusy ? copy.coverGenerating : copy.squareDownload}
              </button>
            </div>
            <div className="mt-4 overflow-hidden border border-white/25">
              <SquarePost
                kicker={copy.squareKicker}
                headline={copy.squareHeadline}
                sub={copy.squareSub}
                badgeSize={badgeSize}
              />
              <div className="border-t border-white/15 bg-black px-4 py-3">
                <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
                  <span>{copy.squareSizeLabel}</span>
                  <span className="text-white/70">{badgeSize}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={BADGE_STOPS.length - 1}
                  step={1}
                  value={BADGE_STOPS.indexOf(badgeSize)}
                  onChange={(e) =>
                    setBadgeSize(BADGE_STOPS[Number(e.target.value)]!)
                  }
                  className="brand-size-slider w-full"
                  aria-label={copy.squareSizeLabel}
                />
                <div className="mt-1.5 flex justify-between font-mono text-[8px] text-white/30">
                  {BADGE_STOPS.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0"
        style={{ width: COVER_SPECS[activeFormat].width }}
      >
        <div ref={exportRef}>
          <CoverBanner aspect={COVER_SPECS[activeFormat].aspect} />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0"
        style={{ width: 1080 }}
      >
        <div ref={squareExportRef}>
          <SquarePost
            kicker={copy.squareKicker}
            headline={copy.squareHeadline}
            sub={copy.squareSub}
            badgeSize={badgeSize}
          />
        </div>
      </div>
    </div>
  );
}

function DontCard({
  index,
  label,
  detail,
  dont,
}: {
  index: number;
  label: string;
  detail: string;
  dont: string;
}) {
  return (
    <div className="bg-black p-5">
      <span className="font-mono text-[9px] uppercase tracking-widest text-[#ff6b6b]/80">
        {dont}
      </span>
      <div className="relative mt-4 flex h-24 items-center justify-center overflow-hidden border border-dashed border-[#ff2d2d]/35">
        <DontPreview index={index} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-px w-[85%] rotate-[-18deg] bg-[#ff2d2d]/80" />
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-white/80">{label}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-white/40">{detail}</p>
    </div>
  );
}

function DontPreview({ index }: { index: number }) {
  if (index === 0) {
    return (
      <MasterFabricLogo className="h-14 w-28 scale-x-[1.85] text-white opacity-80" />
    );
  }
  if (index === 1) {
    return (
      <div
        className="h-14 w-16"
        style={{
          background:
            "linear-gradient(135deg, #ff4d6d, #ff9e44, #5ef58f, #54c8ff, #b07cff)",
          WebkitMask:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 152'%3E%3Cpath fill='black' d='M96.7 0L82.6 14.1l94.5 94.5 14.1-14.1L96.7 0zM14.1 110.6L0 96.5l94.5-94.4 14.1 14.1L14.1 110.6zM55 151.5L40.9 137.4l94.5-94.5 14.1 14.1L55 151.5zM59.8 41.5L45.7 55.6l94.5 94.5 14.1-14.1L59.8 41.5z'/%3E%3C/svg%3E\")",
          mask: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 152'%3E%3Cpath fill='black' d='M96.7 0L82.6 14.1l94.5 94.5 14.1-14.1L96.7 0zM14.1 110.6L0 96.5l94.5-94.4 14.1 14.1L14.1 110.6zM55 151.5L40.9 137.4l94.5-94.5 14.1 14.1L55 151.5zM59.8 41.5L45.7 55.6l94.5 94.5 14.1-14.1L59.8 41.5z'/%3E%3C/svg%3E\")",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }
  if (index === 2) {
    return (
      <div style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.85))" }}>
        <MasterFabricLogo className="h-14 w-16 rotate-[28deg] text-white" />
      </div>
    );
  }
  return (
    <div className="h-16 w-16 overflow-hidden rounded-full border border-white/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/academy-badge.png"
        alt=""
        width={96}
        height={96}
        className="h-24 w-24 max-w-none -translate-x-3 -translate-y-2 scale-150"
      />
    </div>
  );
}
