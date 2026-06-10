---
order: 1
title: "Domain 1: Prepare Agent Architecture and SDLC Processes"
section: "Bölüm II: Sistem Mimarisi & Altyapı Temelleri"
weight: 15
infrastructure: "Go üzerinde asenkron backend iskeletinin ayağa kaldırılması ve Next.js temel durum arayüzünün kurulumu."
---

Cursor IDE üzerinde `.cursorrules` optimizasyonları ve Claude Opus 4.8 ile "Agentic Geliştirme" kurallarının inşası. Ajan topolojilerinin (Router, ReAct, Plan-and-Execute) planlanması.

## Ajan Topolojileri

```mermaid
flowchart TD
    Q[Görev Girdisi] --> R{Router Ajanı}
    R -->|Basit sorgu| direct[Doğrudan Yanıt]
    R -->|Araç gerekli| react[ReAct Döngüsü<br/>Düşün → Eylem → Gözlem]
    R -->|Karmaşık proje| plan[Plan-and-Execute<br/>Planla → Alt görevler → Birleştir]
    react --> out[Sonuç]
    plan --> out
    direct --> out
```

## Öğrenme Çıktıları

- Agentic SDLC fazlarının (intent, plan, execute, verify) klasik SDLC ile eşlenmesi
- `.cursorrules` ile proje bazlı ajan davranış sözleşmeleri tanımlama
- Topoloji seçim kriterleri: gecikme, maliyet, hata toleransı, denetlenebilirlik
