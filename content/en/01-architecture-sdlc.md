---
order: 1
title: "Domain 1: Prepare Agent Architecture and SDLC Processes"
section: "Section II: System Architecture & Infrastructure Foundations"
weight: 15
infrastructure: "Standing up the asynchronous backend skeleton in Go and installing the foundational Next.js status interface."
---

Optimizing `.cursorrules` in Cursor IDE and building "Agentic Development" conventions with Claude Opus 4.8. Planning agent topologies (Router, ReAct, Plan-and-Execute).

## Agent Topologies

```mermaid
flowchart TD
    Q[Task Input] --> R{Router Agent}
    R -->|Simple query| direct[Direct Response]
    R -->|Tools required| react[ReAct Loop<br/>Think → Act → Observe]
    R -->|Complex project| plan[Plan-and-Execute<br/>Plan → Subtasks → Merge]
    react --> out[Result]
    plan --> out
    direct --> out
```

## Learning Outcomes

- Mapping Agentic SDLC phases (intent, plan, execute, verify) onto the classic SDLC
- Defining per-project agent behavior contracts with `.cursorrules`
- Topology selection criteria: latency, cost, fault tolerance, auditability
