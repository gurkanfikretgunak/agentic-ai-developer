"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Self-running AI SDLC fleet simulation for the 2026 "Orchestrator" era.
 * A scripted loop: intent → plan → parallel agents → judge reject/retry →
 * security scan → human-in-the-loop gate → canary deploy → monitoring.
 */

type AgentStatus = "idle" | "run" | "done" | "wait" | "fail";

interface LogEntry {
  who: string;
  text: string;
  /** Highlighted human-gate line (blinks while it is the latest entry). */
  gate?: boolean;
}

interface Step {
  phase: number;
  logs: LogEntry[];
  agents?: Record<string, AgentStatus>;
}

interface AgentDef {
  id: string;
  name: string;
  role: { en: string; tr: string };
}

const AGENTS: AgentDef[] = [
  { id: "orch", name: "ORCH-CORE", role: { en: "orchestrator", tr: "orkestratör" } },
  { id: "a1", name: "AGENT-01", role: { en: "backend / go", tr: "backend / go" } },
  { id: "a2", name: "AGENT-02", role: { en: "tests / traces", tr: "test / traces" } },
  { id: "a3", name: "AGENT-03", role: { en: "mobile / swift", tr: "mobil / swift" } },
  { id: "judge", name: "JUDGE", role: { en: "diff evaluator", tr: "diff değerlendirici" } },
  { id: "sec", name: "SEC-SCAN", role: { en: "security", tr: "güvenlik" } },
];

const PHASES = {
  en: ["PLAN", "IMPLEMENT", "TEST", "SECURE", "REVIEW", "DEPLOY", "MONITOR"],
  tr: ["PLANLA", "UYGULA", "TEST", "GÜVENLİK", "ONAY", "DEPLOY", "İZLE"],
};

const SCRIPT: { en: Step[]; tr: Step[] } = {
  en: [
    {
      phase: 0,
      logs: [
        { who: "HUMAN", text: "intent: ship the invoice OCR feature to staging" },
        { who: "ORCH", text: "decomposing intent → 4 work items, 2 gates" },
      ],
      agents: { orch: "run" },
    },
    {
      phase: 0,
      logs: [
        { who: "ORCH", text: "spawning fleet: backend, tests, mobile · budget 1.2M tok" },
      ],
      agents: { a1: "run", a2: "run", a3: "run" },
    },
    {
      phase: 1,
      logs: [
        { who: "AGENT-01", text: "scaffolding go gateway · POST /v1/ocr/invoice" },
        { who: "AGENT-03", text: "generating swift edge client + offline queue" },
      ],
    },
    {
      phase: 1,
      logs: [
        { who: "AGENT-01", text: "migration 0042_invoices.sql ready · 14 files +812 −96" },
        { who: "AGENT-02", text: "writing golden traces · 12 invoice fixtures" },
      ],
    },
    {
      phase: 2,
      logs: [
        { who: "AGENT-02", text: "suite run: 47/49 passed · 2 failures in date parsing" },
        { who: "JUDGE", text: "reviewing diff against constraints…" },
      ],
      agents: { judge: "run", a1: "done", a3: "done" },
    },
    {
      phase: 2,
      logs: [
        { who: "JUDGE", text: "✗ REJECT — ocr_parser.go drops TR locale dates (dd.MM.yyyy)" },
        { who: "ORCH", text: "routing fix back to AGENT-01 · retry 1/2" },
      ],
      agents: { judge: "wait", a1: "fail" },
    },
    {
      phase: 2,
      logs: [
        { who: "AGENT-01", text: "patch: locale-aware parser · table-driven tests added" },
        { who: "AGENT-02", text: "re-run: 49/49 passed ✓" },
      ],
      agents: { a1: "run" },
    },
    {
      phase: 2,
      logs: [{ who: "JUDGE", text: "✓ APPROVE — constraints satisfied, coverage 94%" }],
      agents: { judge: "done", a1: "done", a2: "done" },
    },
    {
      phase: 3,
      logs: [
        { who: "SEC-SCAN", text: "deps + secrets + SAST sweep running…" },
        { who: "SEC-SCAN", text: "0 critical · 1 low (pinned) · no leaked keys" },
      ],
      agents: { sec: "done" },
    },
    {
      phase: 4,
      logs: [
        { who: "GUARD", text: "staging deploy is irreversible → HITL gate engaged" },
        { who: "GATE", text: "AWAITING HUMAN APPROVAL [Y/N]", gate: true },
      ],
      agents: { orch: "wait" },
    },
    {
      phase: 4,
      logs: [{ who: "HUMAN", text: "✓ approved — gurkan@masterfabric (2FA verified)" }],
      agents: { orch: "run" },
    },
    {
      phase: 5,
      logs: [
        { who: "ORCH", text: "canary rollout 5% → 50% → 100% · no regression" },
      ],
    },
    {
      phase: 6,
      logs: [
        { who: "ORCH", text: "p95 214ms · error rate 0.02% · traces stable" },
        { who: "ORCH", text: "loop complete — awaiting next intent ▮" },
      ],
      agents: { orch: "done" },
    },
  ],
  tr: [
    {
      phase: 0,
      logs: [
        { who: "İNSAN", text: "niyet: fatura OCR özelliğini staging'e çıkar" },
        { who: "ORCH", text: "niyet ayrıştırılıyor → 4 iş kalemi, 2 kapı" },
      ],
      agents: { orch: "run" },
    },
    {
      phase: 0,
      logs: [
        { who: "ORCH", text: "filo başlatılıyor: backend, test, mobil · bütçe 1.2M tok" },
      ],
      agents: { a1: "run", a2: "run", a3: "run" },
    },
    {
      phase: 1,
      logs: [
        { who: "AGENT-01", text: "go gateway iskeleti · POST /v1/ocr/invoice" },
        { who: "AGENT-03", text: "swift edge istemcisi + çevrimdışı kuyruk üretiliyor" },
      ],
    },
    {
      phase: 1,
      logs: [
        { who: "AGENT-01", text: "migration 0042_invoices.sql hazır · 14 dosya +812 −96" },
        { who: "AGENT-02", text: "golden trace'ler yazılıyor · 12 fatura fixture'ı" },
      ],
    },
    {
      phase: 2,
      logs: [
        { who: "AGENT-02", text: "koşum: 47/49 geçti · tarih ayrıştırmada 2 hata" },
        { who: "JUDGE", text: "diff kısıtlara göre inceleniyor…" },
      ],
      agents: { judge: "run", a1: "done", a3: "done" },
    },
    {
      phase: 2,
      logs: [
        { who: "JUDGE", text: "✗ RED — ocr_parser.go TR tarihlerini düşürüyor (dd.MM.yyyy)" },
        { who: "ORCH", text: "düzeltme AGENT-01'e yönlendirildi · deneme 1/2" },
      ],
      agents: { judge: "wait", a1: "fail" },
    },
    {
      phase: 2,
      logs: [
        { who: "AGENT-01", text: "yama: locale duyarlı parser · tablo tabanlı testler eklendi" },
        { who: "AGENT-02", text: "tekrar koşum: 49/49 geçti ✓" },
      ],
      agents: { a1: "run" },
    },
    {
      phase: 2,
      logs: [{ who: "JUDGE", text: "✓ ONAY — kısıtlar sağlandı, kapsam %94" }],
      agents: { judge: "done", a1: "done", a2: "done" },
    },
    {
      phase: 3,
      logs: [
        { who: "SEC-SCAN", text: "bağımlılık + secret + SAST taraması sürüyor…" },
        { who: "SEC-SCAN", text: "0 kritik · 1 düşük (sabitlendi) · sızan anahtar yok" },
      ],
      agents: { sec: "done" },
    },
    {
      phase: 4,
      logs: [
        { who: "GUARD", text: "staging deploy geri döndürülemez → HITL kapısı devrede" },
        { who: "KAPI", text: "İNSAN ONAYI BEKLENİYOR [E/H]", gate: true },
      ],
      agents: { orch: "wait" },
    },
    {
      phase: 4,
      logs: [{ who: "İNSAN", text: "✓ onaylandı — gurkan@masterfabric (2FA doğrulandı)" }],
      agents: { orch: "run" },
    },
    {
      phase: 5,
      logs: [
        { who: "ORCH", text: "canary dağıtım %5 → %50 → %100 · regresyon yok" },
      ],
    },
    {
      phase: 6,
      logs: [
        { who: "ORCH", text: "p95 214ms · hata oranı %0.02 · trace'ler stabil" },
        { who: "ORCH", text: "döngü tamam — yeni niyet bekleniyor ▮" },
      ],
      agents: { orch: "done" },
    },
  ],
};

const STEP_MS = 1600;
const REPORT_DELAY_MS = 1800;
const REPORT_HOLD_MS = 12000;

/** Final run report: deployment target, models, toolchain and quality. */
interface ReportSection {
  title: string;
  rows: [string, string][];
}

const REPORT: { en: ReportSection[]; tr: ReportSection[] } = {
  en: [
    {
      title: "Deployment",
      rows: [
        ["target", "staging.masterfabric.co"],
        ["server", "VPS-FRA-01 · Falkenstein, DE"],
        ["spec", "4 vCPU · 8 GB · NVMe"],
        ["rollout", "canary 5→50→100% ✓"],
      ],
    },
    {
      title: "Models",
      rows: [
        ["orchestrator", "Composer 2.5 · 412k tok"],
        ["workers ×3", "Claude Opus 4.8 · 681k tok"],
        ["judge", "Fable 5 · 154k tok"],
        ["local", "open-weight (ollama) · 38k tok"],
      ],
    },
    {
      title: "Toolchain",
      rows: [
        ["ide", "Cursor IDE · agent mode"],
        ["cli", "OpenCode · headless runs"],
        ["review", "GitHub Copilot · PR pass"],
        ["stack", "Next.js 15 · Go · Swift"],
      ],
    },
    {
      title: "Quality",
      rows: [
        ["tests", "49/49 passed · cov 94%"],
        ["judge loop", "1 reject → 1 retry ✓"],
        ["security", "0 critical · secrets clean"],
        ["hitl", "1 human gate · approved"],
      ],
    },
  ],
  tr: [
    {
      title: "Dağıtım",
      rows: [
        ["hedef", "staging.masterfabric.co"],
        ["sunucu", "VPS-FRA-01 · Falkenstein, DE"],
        ["donanım", "4 vCPU · 8 GB · NVMe"],
        ["rollout", "canary %5→50→100 ✓"],
      ],
    },
    {
      title: "Modeller",
      rows: [
        ["orkestratör", "Composer 2.5 · 412k tok"],
        ["worker ×3", "Claude Opus 4.8 · 681k tok"],
        ["judge", "Fable 5 · 154k tok"],
        ["lokal", "açık ağırlıklı (ollama) · 38k tok"],
      ],
    },
    {
      title: "Araç Zinciri",
      rows: [
        ["ide", "Cursor IDE · ajan modu"],
        ["cli", "OpenCode · headless koşum"],
        ["inceleme", "GitHub Copilot · PR taraması"],
        ["stack", "Next.js 15 · Go · Swift"],
      ],
    },
    {
      title: "Kalite",
      rows: [
        ["testler", "49/49 geçti · kapsam %94"],
        ["judge döngüsü", "1 red → 1 deneme ✓"],
        ["güvenlik", "0 kritik · secret temiz"],
        ["hitl", "1 insan kapısı · onaylandı"],
      ],
    },
  ],
};

function StatusGlyph({ status }: { status: AgentStatus }) {
  switch (status) {
    case "run":
      return (
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-white"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      );
    case "done":
      return <span className="text-white">✓</span>;
    case "wait":
      return <span className="text-white/70">⏸</span>;
    case "fail":
      return <span className="text-white">✗</span>;
    default:
      return (
        <span className="inline-block h-2 w-2 rounded-full border border-white/30" />
      );
  }
}

function statusLabel(status: AgentStatus, locale: "en" | "tr") {
  const map = {
    en: { idle: "idle", run: "running", done: "done", wait: "paused", fail: "retry" },
    tr: { idle: "boşta", run: "çalışıyor", done: "bitti", wait: "duraklatıldı", fail: "tekrar" },
  } as const;
  return map[locale][status];
}

export function FleetSdlcSimulation({
  title,
  footnote,
  locale,
}: {
  title: string;
  footnote: string;
  locale: "en" | "tr";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-60px" });

  const steps = SCRIPT[locale];
  const phases = PHASES[locale];
  const [step, setStep] = useState(-1);
  const [showReport, setShowReport] = useState(false);

  // Advance the script while visible; show the run report at the end,
  // hold it, then restart the loop.
  useEffect(() => {
    if (!inView) return;
    if (showReport) {
      const t = setTimeout(() => {
        setShowReport(false);
        setStep(-1);
      }, REPORT_HOLD_MS);
      return () => clearTimeout(t);
    }
    if (step >= steps.length - 1) {
      const t = setTimeout(() => setShowReport(true), REPORT_DELAY_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === -1 ? 400 : STEP_MS);
    return () => clearTimeout(t);
  }, [inView, step, steps.length, showReport]);

  // Keep the log pinned to the latest entry.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step]);

  const visibleSteps = steps.slice(0, step + 1);
  const logs = visibleSteps.flatMap((s) => s.logs);
  const currentPhase = step < 0 ? -1 : steps[Math.min(step, steps.length - 1)].phase;

  const agentStatus: Record<string, AgentStatus> = {};
  for (const agent of AGENTS) agentStatus[agent.id] = "idle";
  for (const s of visibleSteps) {
    if (s.agents) Object.assign(agentStatus, s.agents);
  }

  const runningCount = Object.values(agentStatus).filter((s) => s === "run").length;
  const tokens = step < 0 ? 0 : 38_000 + step * 91_257;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div ref={rootRef}>
      <div className="overflow-hidden border border-white/20 bg-black">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/15 bg-white/[0.04] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full border border-white/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-white/25" />
          <span className="h-2.5 w-2.5 rounded-full border border-white/15" />
          <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-widest text-white/45">
            {title}
          </span>
          <span className="ml-auto hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/35 sm:flex">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-white"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            live
          </span>
        </div>

        {/* SDLC phase tracker */}
        <div className="flex flex-wrap items-center gap-y-1 border-b border-white/10 px-3 py-2">
          {phases.map((phase, i) => {
            const isDone = currentPhase > i;
            const isActive = currentPhase === i;
            return (
              <div key={phase} className="flex items-center">
                <span
                  className={
                    isActive
                      ? "bg-white px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-black"
                      : isDone
                        ? "px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/70"
                        : "px-2 py-0.5 font-mono text-[9px] tracking-widest text-white/25"
                  }
                >
                  {isDone ? "✓ " : ""}
                  {phase}
                </span>
                {i < phases.length - 1 && (
                  <span className="px-0.5 text-[9px] text-white/20">→</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Final run report overlays the main area when the loop completes */}
        <AnimatePresence mode="wait">
        {showReport ? (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="h-[296px] overflow-y-auto px-4 py-3 [scrollbar-width:none] md:h-[304px]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                {locale === "tr" ? "Çalışma Raporu" : "Run Report"} · #1024
              </span>
              <motion.span
                className="border border-white bg-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-black"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓ {locale === "tr" ? "başarılı" : "success"}
              </motion.span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-white/35">
                {locale === "tr" ? "süre" : "duration"}: 21s · 6{" "}
                {locale === "tr" ? "ajan" : "agents"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
              {REPORT[locale].map((section, sIdx) => (
                <motion.div
                  key={section.title}
                  className="bg-black p-3.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + sIdx * 0.12 }}
                >
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                    {section.title}
                  </div>
                  <div className="mt-2 space-y-1">
                    {section.rows.map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-3 font-mono text-[10px]"
                      >
                        <span className="shrink-0 text-white/40">{key}</span>
                        <span className="truncate text-right text-white/85">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
        <motion.div
          key="run"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="grid md:grid-cols-[1fr_240px]"
        >
          {/* Log stream */}
          <div
            ref={logRef}
            className="h-56 space-y-1.5 overflow-y-auto px-4 py-3 font-mono text-[11px] leading-relaxed [scrollbar-width:none] md:h-64"
          >
            {logs.map((log, i) => {
              const isLast = i === logs.length - 1;
              const isHuman = /^(HUMAN|İNSAN)$/.test(log.who);
              return (
                <motion.div
                  key={i}
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className={
                      isHuman
                        ? "w-20 shrink-0 text-right font-bold text-white"
                        : "w-20 shrink-0 text-right text-white/40"
                    }
                  >
                    {log.who}
                  </span>
                  <span className="text-white/25">│</span>
                  {log.gate && isLast ? (
                    <motion.span
                      className="font-bold text-white"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    >
                      {log.text}
                    </motion.span>
                  ) : (
                    <span
                      className={
                        log.gate
                          ? "font-bold text-white/80"
                          : isHuman
                            ? "text-white/90"
                            : "text-white/60"
                      }
                    >
                      {log.text}
                    </span>
                  )}
                  {isLast && !log.gate && (
                    <motion.span
                      className="text-white"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▍
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
            {step < 0 && (
              <div className="flex gap-2 text-white/30">
                <span className="w-20 shrink-0 text-right">SYS</span>
                <span className="text-white/25">│</span>
                <span>
                  {locale === "tr" ? "filo hazır — bekleniyor" : "fleet ready — standing by"}
                  <motion.span
                    className="ml-1 inline-block text-white/60"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ▍
                  </motion.span>
                </span>
              </div>
            )}
          </div>

          {/* Agent fleet panel */}
          <div className="border-t border-white/10 md:border-l md:border-t-0">
            <div className="border-b border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
              {locale === "tr" ? "Filo" : "Fleet"} · {runningCount}{" "}
              {locale === "tr" ? "aktif" : "active"}
            </div>
            <div className="divide-y divide-white/[0.07]">
              {AGENTS.map((agent) => {
                const status = agentStatus[agent.id];
                return (
                  <div
                    key={agent.id}
                    className={`flex items-center gap-2.5 px-3 py-2 transition-colors duration-500 ${
                      status === "run" ? "bg-white/[0.05]" : ""
                    }`}
                  >
                    <span className="flex w-4 justify-center font-mono text-[10px]">
                      <StatusGlyph status={status} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] font-bold tracking-wider text-white/80">
                        {agent.name}
                      </div>
                      <div className="truncate font-mono text-[9px] text-white/35">
                        {agent.role[locale]}
                      </div>
                    </div>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wider ${
                        status === "run"
                          ? "text-white"
                          : status === "done"
                            ? "text-white/60"
                            : "text-white/30"
                      }`}
                    >
                      {statusLabel(status, locale)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
        )}
        </AnimatePresence>

        {/* Status bar */}
        <div className="flex items-center gap-4 border-t border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white/40">
          <span>
            {locale === "tr" ? "faz" : "phase"}:{" "}
            <span className="text-white/75">
              {showReport
                ? locale === "tr"
                  ? "RAPOR"
                  : "REPORT"
                : currentPhase >= 0
                  ? phases[currentPhase]
                  : "—"}
            </span>
          </span>
          <span className="hidden sm:inline">
            tok: <span className="text-white/75">{tokens.toLocaleString(locale)}</span>
          </span>
          <div className="ml-auto flex h-1 w-24 border border-white/20 bg-white/5 sm:w-36">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <p className="mt-2 font-mono text-[10px] italic tracking-wide text-white/35">
        {footnote}
      </p>
    </div>
  );
}
