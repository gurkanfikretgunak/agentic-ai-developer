"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import {
  AcceptedPostcardDocument,
  type AcceptedPostcardData,
} from "@/components/brand-assets/AcceptedPostcardDocument";
import {
  WelcomeCohortDocument,
  type WelcomeCohortData,
} from "@/components/brand-assets/WelcomeCohortDocument";
import {
  BrandUsageGuide,
  type BrandUsageCopy,
} from "@/components/brand-assets/BrandUsageGuide";
import {
  GithubBadgeGuide,
  type GithubBadgeCopy,
} from "@/components/brand-assets/GithubBadgeGuide";
import {
  WallpaperGuide,
  type WallpaperCopy,
} from "@/components/brand-assets/WallpaperGuide";
import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface BrandAssetsCopy {
  kicker: string;
  title: string;
  subtitle: string;
  tabs: {
    logos: string;
    accepted: string;
    welcome: string;
    github: string;
    wallpapers: string;
  };
  logos: {
    title: string;
    hint: string;
    badgeTitle: string;
    badgeHint: string;
    markTitle: string;
    markHint: string;
    downloadPng: string;
    downloadSvg: string;
    usage: BrandUsageCopy;
  };
  github: GithubBadgeCopy;
  accepted: {
    title: string;
    hint: string;
    fields: {
      kicker: string;
      headline: string;
      name: string;
      body: string;
      program: string;
      cohortLabel: string;
      dateLabel: string;
      siteUrl: string;
    };
    downloadPng: string;
    generating: string;
  };
  welcome: {
    title: string;
    hint: string;
    fields: {
      kicker: string;
      cohortName: string;
      program: string;
      tagline: string;
      startsLabel: string;
      startsValue: string;
      capacityLine: string;
      siteUrl: string;
    };
    downloadPng: string;
    generating: string;
  };
  wallpapers: WallpaperCopy;
}

const EXPORT_WIDTH = 1080;

type TabId = "logos" | "accepted" | "welcome" | "github" | "wallpapers";

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function nodeToPng(node: HTMLElement): Promise<string> {
  await document.fonts.ready;
  return toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#000000",
  });
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="w-full resize-none border border-white/20 bg-white/[0.03] px-3 py-2 text-xs text-white outline-none transition focus:border-white/60"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-white/20 bg-white/[0.03] px-3 py-2 text-xs text-white outline-none transition focus:border-white/60"
        />
      )}
    </label>
  );
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "asset"
  );
}

export function BrandAssetStudio({
  copy,
  defaults,
}: {
  copy: BrandAssetsCopy;
  defaults: {
    accepted: AcceptedPostcardData;
    welcome: WelcomeCohortData;
  };
}) {
  const [tab, setTab] = useState<TabId>("logos");
  const [accepted, setAccepted] = useState(defaults.accepted);
  const [welcome, setWelcome] = useState(defaults.welcome);
  const [busy, setBusy] = useState(false);

  const acceptedExportRef = useRef<HTMLDivElement>(null);
  const welcomeExportRef = useRef<HTMLDivElement>(null);

  const tabs: { id: TabId; label: string }[] = [
    { id: "logos", label: copy.tabs.logos },
    { id: "accepted", label: copy.tabs.accepted },
    { id: "welcome", label: copy.tabs.welcome },
    { id: "github", label: copy.tabs.github },
    { id: "wallpapers", label: copy.tabs.wallpapers },
  ];

  async function exportAccepted() {
    const root = acceptedExportRef.current;
    if (!root || busy) return;
    setBusy(true);
    try {
      const dataUrl = await nodeToPng(root);
      triggerDownload(
        dataUrl,
        `masterfabric-academy-accepted-${slugify(accepted.name)}.png`,
      );
    } finally {
      setBusy(false);
    }
  }

  async function exportWelcome() {
    const root = welcomeExportRef.current;
    if (!root || busy) return;
    setBusy(true);
    try {
      const dataUrl = await nodeToPng(root);
      triggerDownload(
        dataUrl,
        `masterfabric-academy-welcome-${slugify(welcome.cohortName)}.png`,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-px border border-white/15 bg-white/15">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? "bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-black"
                : "bg-black px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-white/55 transition hover:text-white"
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "logos" && (
        <div className="mt-10">
          <h2
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {copy.logos.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/55">{copy.logos.hint}</p>

          <div className="mt-8 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
            <div className="bg-black p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {copy.logos.badgeTitle}
              </span>
              <p className="mt-1 text-xs text-white/45">{copy.logos.badgeHint}</p>
              <div className="mt-8 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/academy-badge.png"
                  alt="MasterFabric Academy"
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full border border-white/20"
                />
              </div>
              <a
                href="/academy-badge.png"
                download="masterfabric-academy-badge.png"
                className="mt-8 inline-flex border border-white bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
              >
                {copy.logos.downloadPng}
              </a>
            </div>

            <div className="bg-black p-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {copy.logos.markTitle}
              </span>
              <p className="mt-1 text-xs text-white/45">{copy.logos.markHint}</p>
              <div className="mt-8 flex justify-center py-6">
                <MasterFabricLogo className="h-28 w-36 text-white" />
              </div>
              <a
                href="/masterfabric-logo.svg"
                download="masterfabric-logo.svg"
                className="mt-8 inline-flex border border-white/40 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
              >
                {copy.logos.downloadSvg}
              </a>
            </div>
          </div>

          <BrandUsageGuide copy={copy.logos.usage} />
        </div>
      )}

      {tab === "github" && <GithubBadgeGuide copy={copy.github} />}

      {tab === "wallpapers" && <WallpaperGuide copy={copy.wallpapers} />}

      {tab === "accepted" && (
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {copy.accepted.title}
            </h2>
            <p className="mt-2 text-sm text-white/55">{copy.accepted.hint}</p>

            <div className="mt-6 grid gap-3">
              <Field
                label={copy.accepted.fields.kicker}
                value={accepted.kicker}
                onChange={(v) => setAccepted((d) => ({ ...d, kicker: v }))}
              />
              <Field
                label={copy.accepted.fields.headline}
                value={accepted.headline}
                onChange={(v) => setAccepted((d) => ({ ...d, headline: v }))}
              />
              <Field
                label={copy.accepted.fields.name}
                value={accepted.name}
                onChange={(v) => setAccepted((d) => ({ ...d, name: v }))}
              />
              <Field
                label={copy.accepted.fields.body}
                value={accepted.body}
                onChange={(v) => setAccepted((d) => ({ ...d, body: v }))}
                textarea
              />
              <Field
                label={copy.accepted.fields.program}
                value={accepted.program}
                onChange={(v) => setAccepted((d) => ({ ...d, program: v }))}
              />
              <Field
                label={copy.accepted.fields.cohortLabel}
                value={accepted.cohortLabel}
                onChange={(v) => setAccepted((d) => ({ ...d, cohortLabel: v }))}
              />
              <Field
                label={copy.accepted.fields.dateLabel}
                value={accepted.dateLabel}
                onChange={(v) => setAccepted((d) => ({ ...d, dateLabel: v }))}
              />
              <Field
                label={copy.accepted.fields.siteUrl}
                value={accepted.siteUrl}
                onChange={(v) => setAccepted((d) => ({ ...d, siteUrl: v }))}
              />
            </div>

            <button
              type="button"
              onClick={exportAccepted}
              disabled={busy}
              className="mt-6 border border-white bg-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-40"
            >
              {busy ? copy.accepted.generating : copy.accepted.downloadPng}
            </button>
          </div>

          <div>
            <AcceptedPostcardDocument data={accepted} />
          </div>
        </div>
      )}

      {tab === "welcome" && (
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {copy.welcome.title}
            </h2>
            <p className="mt-2 text-sm text-white/55">{copy.welcome.hint}</p>

            <div className="mt-6 grid gap-3">
              <Field
                label={copy.welcome.fields.kicker}
                value={welcome.kicker}
                onChange={(v) => setWelcome((d) => ({ ...d, kicker: v }))}
              />
              <Field
                label={copy.welcome.fields.cohortName}
                value={welcome.cohortName}
                onChange={(v) => setWelcome((d) => ({ ...d, cohortName: v }))}
              />
              <Field
                label={copy.welcome.fields.program}
                value={welcome.program}
                onChange={(v) => setWelcome((d) => ({ ...d, program: v }))}
              />
              <Field
                label={copy.welcome.fields.tagline}
                value={welcome.tagline}
                onChange={(v) => setWelcome((d) => ({ ...d, tagline: v }))}
                textarea
              />
              <Field
                label={copy.welcome.fields.startsLabel}
                value={welcome.startsLabel}
                onChange={(v) => setWelcome((d) => ({ ...d, startsLabel: v }))}
              />
              <Field
                label={copy.welcome.fields.startsValue}
                value={welcome.startsValue}
                onChange={(v) => setWelcome((d) => ({ ...d, startsValue: v }))}
              />
              <Field
                label={copy.welcome.fields.capacityLine}
                value={welcome.capacityLine}
                onChange={(v) => setWelcome((d) => ({ ...d, capacityLine: v }))}
              />
              <Field
                label={copy.welcome.fields.siteUrl}
                value={welcome.siteUrl}
                onChange={(v) => setWelcome((d) => ({ ...d, siteUrl: v }))}
              />
            </div>

            <button
              type="button"
              onClick={exportWelcome}
              disabled={busy}
              className="mt-6 border border-white bg-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-40"
            >
              {busy ? copy.welcome.generating : copy.welcome.downloadPng}
            </button>
          </div>

          <div>
            <WelcomeCohortDocument data={welcome} />
          </div>
        </div>
      )}

      {/* Offscreen fixed-width targets for deterministic PNG export */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0"
        style={{ width: EXPORT_WIDTH }}
      >
        <div ref={acceptedExportRef}>
          <AcceptedPostcardDocument data={accepted} />
        </div>
        <div ref={welcomeExportRef} className="mt-4">
          <WelcomeCohortDocument data={welcome} />
        </div>
      </div>
    </div>
  );
}
