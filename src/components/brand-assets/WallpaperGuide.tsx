"use client";

import { useState, type ReactNode } from "react";
import {
  WallpaperDocument,
  WALLPAPER_ASSETS,
  type WallpaperPlatform,
} from "@/components/brand-assets/WallpaperDocument";

export interface WallpaperCopy {
  title: string;
  hint: string;
  platforms: {
    ios: string;
    android: string;
  };
  specs: {
    ios: string;
    android: string;
  };
  downloadPng: string;
  howTitle: string;
  howSteps: string[];
  previewLabel: string;
  analysisTitle: string;
  analysis: string[];
}

/** Realistic device chrome around the wallpaper preview. */
function DeviceMock({
  platform,
  children,
}: {
  platform: WallpaperPlatform;
  children: ReactNode;
}) {
  if (platform === "ios") {
    return (
      <div className="mx-auto w-full max-w-[280px] sm:max-w-[300px]">
        <div
          className="relative rounded-[2.65rem] p-[3px]"
          style={{
            background:
              "linear-gradient(160deg, #8a8a8a 0%, #2a2a2a 35%, #6e6e6e 55%, #1a1a1a 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.12), 0 28px 60px rgba(0,0,0,0.55)",
          }}
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-black">
            <div className="absolute -left-[5px] top-[18%] h-8 w-[3px] rounded-l-sm bg-[#5a5a5a]" />
            <div className="absolute -left-[5px] top-[28%] h-14 w-[3px] rounded-l-sm bg-[#5a5a5a]" />
            <div className="absolute -left-[5px] top-[42%] h-14 w-[3px] rounded-l-sm bg-[#5a5a5a]" />
            <div className="absolute -right-[5px] top-[32%] h-20 w-[3px] rounded-r-sm bg-[#5a5a5a]" />

            <div className="relative m-[6px] overflow-hidden rounded-[2.15rem]">
              <div className="pointer-events-none absolute left-1/2 top-[11px] z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-11 items-end justify-between px-7 pb-1">
                <span className="font-mono text-[9px] font-semibold text-white/70">
                  9:41
                </span>
                <span className="block h-[7px] w-[14px] rounded-[2px] border border-white/80 opacity-70">
                  <span className="ml-[1px] mt-[1px] block h-[3px] w-[9px] rounded-[1px] bg-white/80" />
                </span>
              </div>

              {children}

              <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center">
                <div className="h-[4px] w-[108px] rounded-full bg-white/35" />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
          iPhone
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[280px] sm:max-w-[300px]">
      <div
        className="relative rounded-[2.1rem] p-[3px]"
        style={{
          background:
            "linear-gradient(145deg, #a0a0a0 0%, #3a3a3a 40%, #7a7a7a 60%, #222 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.1), 0 28px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div className="relative overflow-hidden rounded-[1.95rem] bg-black">
          <div className="absolute -right-[5px] top-[22%] h-10 w-[3px] rounded-r-sm bg-[#5a5a5a]" />
          <div className="absolute -left-[5px] top-[26%] h-16 w-[3px] rounded-l-sm bg-[#5a5a5a]" />
          <div className="absolute -left-[5px] top-[40%] h-10 w-[3px] rounded-l-sm bg-[#5a5a5a]" />

          <div className="relative m-[5px] overflow-hidden rounded-[1.7rem]">
            <div className="pointer-events-none absolute left-1/2 top-[10px] z-20 h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_2px_#0a0a0a,inset_0_0_0_1.5px_#1a1a1a]">
              <div className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1e2a3a]" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-9 items-end justify-between px-5 pb-0.5">
              <span className="font-mono text-[9px] text-white/65">12:00</span>
              <div className="flex items-center gap-1.5 opacity-65">
                <span className="font-mono text-[8px] text-white">5G</span>
                <span className="block h-[8px] w-[16px] rounded-sm border border-white/75">
                  <span className="m-[1px] block h-[4px] w-[10px] rounded-[1px] bg-white/75" />
                </span>
              </div>
            </div>

            {children}

            <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex justify-center">
              <div className="h-[3px] w-[96px] rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
        Android
      </p>
    </div>
  );
}

export function WallpaperGuide({ copy }: { copy: WallpaperCopy }) {
  const [platform, setPlatform] = useState<WallpaperPlatform>("ios");

  const platforms: { id: WallpaperPlatform; label: string }[] = [
    { id: "ios", label: copy.platforms.ios },
    { id: "android", label: copy.platforms.android },
  ];

  const asset = WALLPAPER_ASSETS[platform];

  return (
    <div className="mt-10">
      <h2
        className="text-xl font-bold text-white"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {copy.title}
      </h2>
      <p className="mt-2 max-w-xl text-sm text-white/55">{copy.hint}</p>

      <div className="mt-6 flex flex-wrap gap-px border border-white/15 bg-white/15">
        {platforms.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlatform(p.id)}
            className={
              platform === p.id
                ? "bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-black"
                : "bg-black px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white/55 transition hover:bg-white/5 hover:text-white"
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {copy.specs[platform]}
          </span>
          <p className="mt-2 font-mono text-[11px] text-white/30">{asset.label}</p>

          <a
            href={asset.src}
            download={asset.file}
            className="mt-6 inline-flex border border-white bg-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
          >
            {copy.downloadPng}
          </a>

          <div className="mt-12">
            <h3
              className="text-sm font-bold text-white"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {copy.analysisTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {copy.analysis.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-xs leading-relaxed text-white/55"
                >
                  <span className="font-mono text-[10px] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3
              className="text-sm font-bold text-white"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {copy.howTitle}
            </h3>
            <ol className="mt-4 space-y-3">
              {copy.howSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-xs leading-relaxed text-white/55"
                >
                  <span className="font-mono text-[10px] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <span className="mb-4 block text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
            {copy.previewLabel}
          </span>
          <DeviceMock platform={platform}>
            <WallpaperDocument platform={platform} />
          </DeviceMock>
        </div>
      </div>
    </div>
  );
}
