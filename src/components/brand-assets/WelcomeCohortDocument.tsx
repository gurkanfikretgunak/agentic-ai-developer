import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface WelcomeCohortData {
  kicker: string;
  cohortName: string;
  program: string;
  startsLabel: string;
  startsValue: string;
  capacityLine: string;
  siteUrl: string;
  tagline: string;
}

/**
 * Capture-friendly welcome cohort card.
 * Landscape 3:2 — announcement / social share ready. No animations.
 */
export function WelcomeCohortDocument({ data }: { data: WelcomeCohortData }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden border border-white/40 bg-black">
      <div className="absolute inset-2 border border-white/20">
        <MasterFabricLogo className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-64 text-white opacity-[0.04]" />

        <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-0 px-10 py-8 text-center sm:px-12 sm:py-9">
          {/* Header — badge + kicker as one unit */}
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/academy-badge.png"
              alt="MasterFabric Academy"
              width={64}
              height={64}
              className="h-14 w-14 rounded-full border border-white/20 sm:h-16 sm:w-16"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/50">
              {data.kicker}
            </span>
          </div>

          {/* Center block — vertically centered in remaining space */}
          <div className="flex flex-col items-center justify-center">
            <h3
              className="text-3xl font-bold text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {data.cohortName}
            </h3>
            <div className="mt-3 h-px w-16 bg-white/40" />
            <p
              className="mt-3 text-base text-white/80 sm:text-lg"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {data.program}
            </p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/50">
              {data.tagline}
            </p>
          </div>

          {/* Footer — equal inset, labels share a baseline */}
          <div className="w-full border-t border-white/15 pt-5">
            <div className="flex items-start justify-between gap-6 text-left">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                  {data.startsLabel}
                </span>
                <span className="mt-1.5 block text-xs text-white/80">
                  {data.startsValue}
                </span>
              </div>
              <div className="text-right">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                  {data.capacityLine}
                </span>
                <span className="mt-1.5 block font-mono text-[10px] tracking-wide text-white/45">
                  {data.siteUrl}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
