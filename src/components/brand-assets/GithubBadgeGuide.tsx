"use client";

import { useMemo, useState } from "react";
import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface GithubBadgeCopy {
  title: string;
  hint: string;
  previewTitle: string;
  previewHint: string;
  snippetsTitle: string;
  markdownLabel: string;
  htmlLabel: string;
  iframeLabel: string;
  iframeNote: string;
  copy: string;
  copied: string;
  creditLabel: string;
  creditLine: string;
  creditBrand: string;
  creditSuffix: string;
  sizeLabel: string;
  styleLabel: string;
  styles: {
    patch: string;
    mark: string;
    pill: string;
  };
  pillLeft: string;
  pillRight: string;
  positionTitle: string;
  positionSteps: string[];
}

const SITE = "https://academy.masterfabric.co";
const BADGE = `${SITE}/academy-badge.png`;
const MARK = `${SITE}/masterfabric-logo.svg`;
const BRAND = "https://masterfabric.co";
const EMBED = `${SITE}/embed/badge`;

const BADGE_STOPS = [60, 80, 100, 120] as const;
type BadgeStop = (typeof BADGE_STOPS)[number];
type BadgeStyle = "patch" | "mark" | "pill";

/** Pill is fixed — no size slider. */
const PILL_SIZE = 60;

function buildSnippets(
  includeCredit: boolean,
  size: number,
  style: BadgeStyle,
  pillLeft: string,
  pillRight: string,
) {
  const creditMd = includeCredit
    ? `
<p>
  <sub>
    academy.masterfabric.co is a
    <a href="${BRAND}">MasterFabric</a>
    subsidiary.
  </sub>
</p>
`
    : "";

  const creditHtml = includeCredit
    ? `
  <p style="margin-top:12px;font-family:ui-monospace,monospace;font-size:10px;color:#737373;line-height:1.5">
    academy.masterfabric.co is a
    <a href="${BRAND}" style="color:#a3a3a3">MasterFabric</a>
    subsidiary.
  </p>`
    : "";

  const embedSrc = `${EMBED}?credit=${includeCredit ? "1" : "0"}&size=${size}&style=${style}`;
  const iframeW =
    style === "pill" ? Math.max(280, size * 2.4) : Math.max(220, size + 80);
  const iframeH =
    style === "pill"
      ? includeCredit
        ? Math.round(size * 0.55) + 72
        : Math.round(size * 0.55) + 40
      : includeCredit
        ? size + 80
        : size + 40;

  let visualMd: string;
  let visualHtml: string;

  if (style === "pill") {
    visualMd = `<!-- GitHub README: paste the HTML pill (HTML tab) — Markdown images can't render the split pill. -->
<a href="${SITE}">
  <img src="${BADGE}" width="${Math.round(size * 0.35)}" alt="MasterFabric Academy">
  <code>${pillLeft} · ${pillRight}</code>
</a>`;
    visualHtml = `<a href="${SITE}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;height:${Math.round(size * 0.42)}px;border:1px solid rgba(255,255,255,0.35);border-radius:9999px;overflow:hidden;text-decoration:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:${Math.max(10, Math.round(size * 0.11))}px;letter-spacing:0.08em;text-transform:uppercase">
  <span style="display:flex;align-items:center;gap:8px;padding:0 14px;height:100%;background:#fff;color:#000;font-weight:700">${pillLeft}</span>
  <span style="display:flex;align-items:center;padding:0 16px;height:100%;background:#000;color:#fff">${pillRight}</span>
</a>${creditHtml}`;
  } else if (style === "mark") {
    visualMd = `<a href="${SITE}">
  <img src="${MARK}" width="${size}" alt="MasterFabric">
</a>`;
    visualHtml = `<a href="${SITE}" target="_blank" rel="noopener noreferrer">
  <img src="${MARK}" width="${size}" height="${Math.round(size * 0.79)}" alt="MasterFabric" style="filter:invert(1)" />
</a>${creditHtml}`;
  } else {
    visualMd = `<a href="${SITE}">
  <img src="${BADGE}" width="${size}" alt="MasterFabric Academy">
</a>`;
    visualHtml = `<a href="${SITE}" target="_blank" rel="noopener noreferrer">
  <img src="${BADGE}" width="${size}" height="${size}" alt="MasterFabric Academy" />
</a>${creditHtml}`;
  }

  return {
    markdown: `<div align="center">

${visualMd}
${creditMd}
</div>`,
    html: `<div style="text-align:center">
  ${visualHtml}
</div>`,
    iframe: `<!-- Works on docs / sites. GitHub README strips iframes — use Markdown instead. -->
<iframe
  src="${embedSrc}"
  title="MasterFabric Academy badge"
  width="${Math.round(iframeW)}"
  height="${Math.round(iframeH)}"
  style="border:0;overflow:hidden;background:#000"
  loading="lazy"
></iframe>`,
  };
}

function PillBadge({
  size,
  left,
  right,
}: {
  size: number;
  left: string;
  right: string;
}) {
  const h = Math.round(size * 0.42);
  const font = Math.max(10, Math.round(size * 0.11));
  const padX = Math.round(size * 0.12);

  return (
    <a
      href={SITE}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center overflow-hidden rounded-full border border-white/35 no-underline transition hover:border-white"
      style={{ height: h }}
    >
      <span
        className="flex h-full items-center gap-2 bg-white font-mono font-bold uppercase tracking-wider text-black"
        style={{ paddingLeft: padX, paddingRight: padX, fontSize: font }}
      >
        <MasterFabricLogo className="h-[0.85em] w-[1.05em] shrink-0 text-black" />
        {left}
      </span>
      <span
        className="flex h-full items-center bg-black font-mono uppercase tracking-wider text-white"
        style={{ paddingLeft: padX + 2, paddingRight: padX + 2, fontSize: font }}
      >
        {right}
      </span>
    </a>
  );
}

type SnippetId = "markdown" | "html" | "iframe";

export function GithubBadgeGuide({ copy }: { copy: GithubBadgeCopy }) {
  const [copied, setCopied] = useState<SnippetId | null>(null);
  const [includeCredit, setIncludeCredit] = useState(true);
  const [badgeSize, setBadgeSize] = useState<BadgeStop>(120);
  const [style, setStyle] = useState<BadgeStyle>("patch");

  const activeSize = style === "pill" ? PILL_SIZE : badgeSize;

  const snippets = useMemo(
    () =>
      buildSnippets(
        includeCredit,
        activeSize,
        style,
        copy.pillLeft,
        copy.pillRight,
      ),
    [includeCredit, activeSize, style, copy.pillLeft, copy.pillRight],
  );

  async function copySnippet(id: SnippetId) {
    try {
      await navigator.clipboard.writeText(snippets[id]);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* ignore */
    }
  }

  const blocks: { id: SnippetId; label: string; note?: string }[] = [
    { id: "markdown", label: copy.markdownLabel },
    { id: "html", label: copy.htmlLabel },
    { id: "iframe", label: copy.iframeLabel, note: copy.iframeNote },
  ];

  const styles: { id: BadgeStyle; label: string }[] = [
    { id: "patch", label: copy.styles.patch },
    { id: "mark", label: copy.styles.mark },
    { id: "pill", label: copy.styles.pill },
  ];

  const iframeW =
    style === "pill" ? Math.max(280, activeSize * 2.4) : Math.max(220, activeSize + 80);
  const iframeH =
    style === "pill"
      ? includeCredit
        ? Math.round(activeSize * 0.55) + 72
        : Math.round(activeSize * 0.55) + 40
      : includeCredit
        ? activeSize + 80
        : activeSize + 40;

  return (
    <div className="mt-10">
      <h2
        className="text-xl font-bold text-white"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {copy.title}
      </h2>
      <p className="mt-2 max-w-xl text-sm text-white/55">{copy.hint}</p>

      {/* Style picker — Patch / Mark / Pill */}
      <div className="mt-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          {copy.styleLabel}
        </span>
        <div className="mt-2 flex flex-wrap gap-px border border-white/15 bg-white/15">
          {styles.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyle(s.id)}
              className={
                style === s.id
                  ? "bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-black"
                  : "bg-black px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white/55 transition hover:text-white"
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 border border-white/20 bg-white/[0.03] px-4 py-3">
        <input
          type="checkbox"
          checked={includeCredit}
          onChange={(e) => setIncludeCredit(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-white"
        />
        <span className="text-xs leading-relaxed text-white/65">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
            {copy.creditLabel}
          </span>
          <span className="mt-1 block text-white/55">
            {copy.creditLine}
            <a
              href={BRAND}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 underline decoration-white/30 underline-offset-2"
            >
              {copy.creditBrand}
            </a>
            {copy.creditSuffix}
          </span>
        </span>
      </label>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {copy.previewTitle}
          </span>
          <p className="mt-1 text-xs text-white/45">{copy.previewHint}</p>

          <div className="mt-4 overflow-hidden border border-white/25 bg-[#0d1117]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[9px] text-white/35">
                README.md
              </span>
            </div>
            <div className="flex flex-col items-center px-6 py-10 text-center">
              {style === "patch" && (
                <a
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition opacity-90 hover:opacity-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/academy-badge.png"
                    alt="MasterFabric Academy"
                    width={activeSize}
                    height={activeSize}
                    className="rounded-full"
                    style={{ width: activeSize, height: activeSize }}
                  />
                </a>
              )}
              {style === "mark" && (
                <a
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-white transition opacity-90 hover:opacity-100"
                  style={{ width: activeSize, height: activeSize * 0.79 }}
                >
                  <MasterFabricLogo className="h-full w-full text-white" />
                  <span className="sr-only">MasterFabric</span>
                </a>
              )}
              {style === "pill" && (
                <PillBadge
                  size={PILL_SIZE}
                  left={copy.pillLeft}
                  right={copy.pillRight}
                />
              )}

              {includeCredit && (
                <p className="mt-4 max-w-[16rem] font-mono text-[9px] leading-relaxed tracking-wide text-white/40">
                  {copy.creditLine}
                  <a
                    href={BRAND}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 underline decoration-white/25 underline-offset-2"
                  >
                    {copy.creditBrand}
                  </a>
                  {copy.creditSuffix}
                </p>
              )}
              <p
                className="mt-5 text-base font-bold text-white"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Your Repo Title
              </p>
              <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-white/40">
                Badge sits centered above the H1 — same pattern as the Academy
                README.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                <span className="border border-white/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/50">
                  Next.js
                </span>
                <span className="border border-white/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/50">
                  TypeScript
                </span>
                <span className="border border-white/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/50">
                  MasterFabric
                </span>
              </div>
            </div>

            {style !== "pill" && (
              <div className="border-t border-white/15 bg-black px-4 py-3">
                <div className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
                  <span>{copy.sizeLabel}</span>
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
                  aria-label={copy.sizeLabel}
                />
                <div className="mt-1.5 flex justify-between font-mono text-[8px] text-white/30">
                  {BADGE_STOPS.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {copy.iframeLabel}
              </span>
              <span className="font-mono text-[9px] text-white/30">
                {style} · {activeSize}px · {includeCredit ? "credit on" : "credit off"}
              </span>
            </div>
            <div className="overflow-hidden border border-white/25 bg-[#0d1117]">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="ml-1 truncate font-mono text-[9px] text-white/35">
                  {`/embed/badge?style=${style}&size=${activeSize}&credit=${includeCredit ? "1" : "0"}`}
                </span>
              </div>
              <div className="flex items-center justify-center bg-black p-5">
                <div
                  className="overflow-hidden border border-white/15 bg-black"
                  style={{ width: iframeW, height: iframeH }}
                >
                  <iframe
                    key={`${style}-${activeSize}-${includeCredit ? "1" : "0"}`}
                    src={`/embed/badge?credit=${includeCredit ? "1" : "0"}&size=${activeSize}&style=${style}`}
                    title="MasterFabric Academy badge"
                    width={iframeW}
                    height={iframeH}
                    className="block border-0 bg-black"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {copy.snippetsTitle}
          </span>

          <div className="mt-4 space-y-4">
            {blocks.map((block) => (
              <div key={block.id} className="border border-white/15">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">
                    {block.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => copySnippet(block.id)}
                    className="border border-white/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-white/70 transition hover:border-white hover:text-white"
                  >
                    {copied === block.id ? copy.copied : copy.copy}
                  </button>
                </div>
                {block.note && (
                  <p className="border-b border-white/10 px-3 py-2 text-[11px] leading-relaxed text-white/40">
                    {block.note}
                  </p>
                )}
                <pre className="overflow-x-auto bg-white/[0.03] p-3 font-mono text-[10px] leading-relaxed text-white/65 whitespace-pre-wrap">
                  {snippets[block.id]}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/15 pt-8">
        <h3
          className="text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {copy.positionTitle}
        </h3>
        <ol className="mt-4 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {copy.positionSteps.map((step, i) => (
            <li key={step} className="bg-black p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-xs leading-relaxed text-white/70">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
