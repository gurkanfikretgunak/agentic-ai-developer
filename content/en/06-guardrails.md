---
order: 6
title: "Domain 6: Implement Guardrails and Accountability"
section: "Section III: Evaluation, Orchestration & Safety"
weight: 10
infrastructure: "On critical actions (e.g. file deletion), safely blocking the Go execution thread by pushing an approval to the Next.js panel."
---

Input and output firewalls (Prompt Injection and PII leakage protections). Infinite-loop prevention mechanisms. Human approval interface integration for critical server commands (Human-in-the-Loop).

## HITL Approval Flow

```mermaid
sequenceDiagram
    participant A as Agent
    participant G as Guardrail Layer
    participant P as Next.js Approval Panel
    participant H as Human Operator

    A->>G: rm -rf /var/data (critical action)
    G->>G: Risk classification: HIGH
    G->>P: Approval request (thread blocked)
    P->>H: Notification + action preview
    H-->>P: Approve / Reject
    P-->>G: Decision
    G-->>A: Execute or cancel
```

## Learning Outcomes

- Input/output filters against prompt injection and PII leakage
- Loop counters, budget limits, and circuit breakers
- Signed action logs (audit trail) for accountability
