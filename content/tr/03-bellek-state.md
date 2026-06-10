---
order: 3
title: "Domain 3: Manage Memory, State, and Execution"
section: "Bölüm II: Sistem Mimarisi & Altyapı Temelleri"
weight: 10
infrastructure: "Go backend üzerinde asenkron görev durumlarının DB kalıcılık (persistence) katmanı ile korunması ve anlamsal (semantic) arama entegrasyonu."
---

Kısa süreli bellek (Session State) ve uzun süreli kalıcı bellek (Vektör Veritabanları — pgvector) entegrasyonu. Ajan kararlarının yarıda kalması durumunda kaldığı yerden otonom olarak **Resume** edilmesi için State Machine tasarımı.

## Ajan Durum Makinesi

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Planning : görev alındı
    Planning --> Executing : plan onaylandı
    Executing --> AwaitingApproval : kritik eylem (HITL)
    AwaitingApproval --> Executing : onay verildi
    Executing --> Suspended : kesinti / hata
    Suspended --> Executing : resume (checkpoint)
    Executing --> Completed : tüm adımlar bitti
    Completed --> [*]
```

## Öğrenme Çıktıları

- Checkpoint tabanlı kalıcı yürütme (durable execution) tasarımı
- pgvector ile anlamsal bellek: embedding, indeksleme, geri çağırma
- Oturum belleği ile kalıcı bellek arasında bağlam bütçesi yönetimi
