---
order: 3
title: "Domain 3: Manage Memory, State, and Execution"
section: "Section II: System Architecture & Infrastructure Foundations"
weight: 10
infrastructure: "Protecting asynchronous task states with a DB persistence layer on the Go backend and integrating semantic search."
---

Integrating short-term memory (Session State) and long-term persistent memory (vector databases — pgvector). Designing a State Machine so an agent's interrupted decisions can autonomously **resume** from where they left off.

## Agent State Machine

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Planning : task received
    Planning --> Executing : plan approved
    Executing --> AwaitingApproval : critical action (HITL)
    AwaitingApproval --> Executing : approval granted
    Executing --> Suspended : interruption / failure
    Suspended --> Executing : resume (checkpoint)
    Executing --> Completed : all steps finished
    Completed --> [*]
```

## Learning Outcomes

- Designing checkpoint-based durable execution
- Semantic memory with pgvector: embedding, indexing, recall
- Managing the context budget between session memory and persistent memory
