import type { Metadata } from "next";
import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export const metadata: Metadata = {
  title: "MasterFabric Academy Badge",
  robots: { index: false, follow: false },
};

const ALLOWED_SIZES = new Set([60, 80, 100, 120]);
const ALLOWED_STYLES = new Set(["patch", "mark", "pill"]);

/**
 * Compact embeddable badge frame for iframes / docs embeds.
 * ?style=patch|mark|pill  ?size=60|80|100|120  ?credit=0|1
 */
export default async function EmbedBadgePage({
  searchParams,
}: {
  searchParams: Promise<{ credit?: string; size?: string; style?: string }>;
}) {
  const { credit, size: sizeRaw, style: styleRaw } = await searchParams;
  const showCredit = credit !== "0";
  const parsed = Number(sizeRaw);
  const style = ALLOWED_STYLES.has(styleRaw ?? "") ? (styleRaw as string) : "patch";
  const size =
    style === "pill"
      ? 60
      : ALLOWED_SIZES.has(parsed)
        ? parsed
        : 120;

  const pillH = Math.round(size * 0.42);
  const pillFont = Math.max(10, Math.round(size * 0.11));
  const pillPad = Math.round(size * 0.12);

  return (
    <div className="embed-badge-root relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-black px-3 text-center text-white">
      <MasterFabricLogo className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-28 text-white opacity-[0.05]" />

      {style === "patch" && (
        <a
          href="https://academy.masterfabric.co"
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/academy-badge.png"
            alt="MasterFabric Academy"
            width={size}
            height={size}
            className="rounded-full border border-white/20"
            style={{ width: size, height: size }}
          />
        </a>
      )}

      {style === "mark" && (
        <a
          href="https://academy.masterfabric.co"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex shrink-0 text-white"
          style={{ width: size, height: size * 0.79 }}
        >
          <MasterFabricLogo className="h-full w-full text-white" />
        </a>
      )}

      {style === "pill" && (
        <a
          href="https://academy.masterfabric.co"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center overflow-hidden rounded-full border border-white/35 no-underline"
          style={{ height: pillH }}
        >
          <span
            className="flex h-full items-center gap-2 bg-white font-mono font-bold uppercase tracking-wider text-black"
            style={{
              paddingLeft: pillPad,
              paddingRight: pillPad,
              fontSize: pillFont,
            }}
          >
            <MasterFabricLogo className="h-[0.85em] w-[1.05em] shrink-0 text-black" />
            MasterFabric
          </span>
          <span
            className="flex h-full items-center bg-black font-mono uppercase tracking-wider text-white"
            style={{
              paddingLeft: pillPad + 2,
              paddingRight: pillPad + 2,
              fontSize: pillFont,
            }}
          >
            Academy
          </span>
        </a>
      )}

      {showCredit && (
        <p className="relative mt-3 max-w-[12rem] font-mono text-[8px] leading-snug tracking-wide text-white/45">
          academy.masterfabric.co is a{" "}
          <a
            href="https://masterfabric.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 underline decoration-white/30 underline-offset-2"
          >
            MasterFabric
          </a>{" "}
          subsidiary.
        </p>
      )}
    </div>
  );
}
