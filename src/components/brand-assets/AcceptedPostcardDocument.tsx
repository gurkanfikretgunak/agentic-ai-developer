import { MasterFabricLogo } from "@/components/brand/MasterFabricLogo";

export interface AcceptedPostcardData {
  kicker: string;
  headline: string;
  name: string;
  body: string;
  program: string;
  cohortLabel: string;
  dateLabel: string;
  siteUrl: string;
}

/**
 * Capture-friendly accepted announcement postcard.
 * Landscape 3:2 — LinkedIn / social share ready. No animations.
 */
export function AcceptedPostcardDocument({ data }: { data: AcceptedPostcardData }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden border border-white/40 bg-black">
      <div className="absolute inset-2 border border-white/20">
        <MasterFabricLogo className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-64 text-white opacity-[0.04]" />

        <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/academy-badge.png"
              alt="MasterFabric Academy"
              width={64}
              height={64}
              className="h-14 w-14 rounded-full border border-white/20 sm:h-16 sm:w-16"
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
              MasterFabric Academy
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/50">
              {data.kicker}
            </span>
            <h3
              className="mt-2 text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {data.headline}
            </h3>
            <div className="mt-3 h-px w-16 bg-white/40" />

            <p
              className="mt-5 text-2xl italic text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {data.name || "—"}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-white/55 sm:text-sm">
              {data.body}
            </p>
            <p
              className="mt-3 text-sm font-semibold text-white sm:text-base"
              style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
            >
              {data.program}
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/15 pt-4">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                {data.cohortLabel}
              </span>
              <span className="mt-1 block text-xs text-white/80">{data.dateLabel}</span>
            </div>
            <span className="font-mono text-[10px] tracking-wide text-white/45">
              {data.siteUrl}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
