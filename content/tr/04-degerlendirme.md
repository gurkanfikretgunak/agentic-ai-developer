---
order: 4
title: "Domain 4: Perform Evaluation, Error Analysis, and Tuning"
section: "Bölüm III: Değerlendirme, Orkestrasyon & Güvenlik"
weight: 15
infrastructure: "Go middleware katmanı üzerinden tüm API çağrılarının loglanması, token kullanım analizi ve test senaryolarının kümülatif entegrasyonu."
---

Ajan çıktılarının kalitesini ölçme (LLM-as-a-judge). Beklenmedik terminal hatalarında ajanın kendi hata çıktısını okuyarak otonom bir şekilde kendini onarması (Self-Correction & Self-Healing döngüleri).

## Self-Healing Döngüsü

```mermaid
flowchart TD
    EXEC[Komut Yürütme] --> CHK{Exit Code = 0?}
    CHK -->|Evet| OK[Sonuç Raporla]
    CHK -->|Hayır| READ[stderr Analizi]
    READ --> HYP[Hata Hipotezi Üret]
    HYP --> FIX[Otonom Düzeltme Uygula]
    FIX --> EXEC
    READ -->|3. başarısız deneme| HITL[İnsana Eskale Et]
```

## Öğrenme Çıktıları

- LLM-as-a-judge rubrikleri ve otomatik değerlendirme pipeline'ları
- Token / maliyet / gecikme telemetrisinin Go middleware ile toplanması
- Regresyon yakalamak için ajan davranış test setleri (golden traces)
