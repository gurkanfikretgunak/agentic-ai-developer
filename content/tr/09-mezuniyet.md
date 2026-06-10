---
order: 9
title: "Sertifikasyon & Mezuniyet Projesi"
section: "Bölüm V: CLI/Terminal Otomasyonu & Mezuniyet"
---

Katılımcıların mezuniyet hakkı kazanabilmesi için; Go backend, Next.js izleme paneli, iOS/Android mobil bildirim tetikleyicisi ve terminal CLI aracı içeren, VPS üzerinde tamamen sandbox edilmiş otonom bir **"Multi-Agent Software Engineer Platform"** geliştirmeleri ve bunu canlı olarak jüriye sunmaları gerekmektedir.

## Mezuniyet Platformu Bileşenleri

```mermaid
flowchart TD
    PLATFORM[Multi-Agent Software<br/>Engineer Platform] --> GO[Go Backend<br/>Orkestrasyon Çekirdeği]
    PLATFORM --> NEXT[Next.js İzleme Paneli<br/>HITL + Canlı Loglar]
    PLATFORM --> MOB[iOS / Android<br/>Bildirim Tetikleyicisi]
    PLATFORM --> CLI[Terminal CLI Aracı<br/>Cobra + TUI]
    GO --> VPS[(VPS Sandbox)]
```

## Değerlendirme Kriterleri

| Kriter | Açıklama |
| --- | --- |
| Otonomi | Ajanların insan müdahalesi olmadan görev tamamlama oranı |
| Güvenlik | Guardrail kapsamı, HITL doğruluğu, sandbox bütünlüğü |
| Gözlemlenebilirlik | Canlı log, metrik ve maliyet telemetrisinin kalitesi |
| Mimari | Katmanlar arası sözleşmelerin netliği ve ölçeklenebilirlik |
