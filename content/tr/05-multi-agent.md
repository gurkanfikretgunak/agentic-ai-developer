---
order: 5
title: "Domain 5: Orchestrate Multi-Agent Coordination"
section: "Bölüm III: Değerlendirme, Orkestrasyon & Güvenlik"
weight: 15
infrastructure: "Ajanlar arası trafik ve mesajların Next.js arayüzüne WebSockets / Server-Sent Events (SSE) ile aktarılarak canlı görselleştirilmesi."
---

Orchestrator-Workers ve Event-Driven (P2P) çoklu ajan koordinasyon kalıpları. Go kanalları ve kuyruk sistemleri (Redis, NATS) kullanılarak bağımsız çalışan ajanların senkronize edilmesi.

## Orchestrator-Workers Kalıbı

```mermaid
flowchart TD
    O[Orchestrator Ajanı] -->|alt görev| W1[Worker: Kod Yazımı]
    O -->|alt görev| W2[Worker: Test Üretimi]
    O -->|alt görev| W3[Worker: Dokümantasyon]
    W1 --> Q[(Redis / NATS Kuyruğu)]
    W2 --> Q
    W3 --> Q
    Q --> O
    O -->|canlı durum| UI[Next.js Paneli<br/>SSE / WebSocket]
```

## Öğrenme Çıktıları

- Görev ayrıştırma (decomposition) ve sonuç birleştirme (reduction) stratejileri
- Go goroutine + channel desenleri ile ajan eşzamanlılığı
- Kuyruk tabanlı backpressure ve ajan ölçeklendirme
