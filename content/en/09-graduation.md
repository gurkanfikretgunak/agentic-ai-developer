---
order: 9
title: "Certification & Graduation Project"
section: "Section V: CLI/Terminal Automation & Graduation"
---

To earn graduation, participants must build a fully sandboxed, autonomous **"Multi-Agent Software Engineer Platform"** on a VPS — including a Go backend, a Next.js monitoring panel, an iOS/Android mobile notification trigger, and a terminal CLI tool — and present it live to a jury.

## Graduation Platform Components

```mermaid
flowchart TD
    PLATFORM[Multi-Agent Software<br/>Engineer Platform] --> GO[Go Backend<br/>Orchestration Core]
    PLATFORM --> NEXT[Next.js Monitoring Panel<br/>HITL + Live Logs]
    PLATFORM --> MOB[iOS / Android<br/>Notification Trigger]
    PLATFORM --> CLI[Terminal CLI Tool<br/>Cobra + TUI]
    GO --> VPS[(VPS Sandbox)]
```

## Evaluation Criteria

| Criterion | Description |
| --- | --- |
| Autonomy | Rate at which agents complete tasks without human intervention |
| Safety | Guardrail coverage, HITL accuracy, sandbox integrity |
| Observability | Quality of live logs, metrics, and cost telemetry |
| Architecture | Clarity of cross-layer contracts and scalability |
