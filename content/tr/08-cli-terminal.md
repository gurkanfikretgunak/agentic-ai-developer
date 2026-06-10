---
order: 8
title: "Domain 8: CLI, System Automation and Terminal Applications"
section: "Bölüm V: CLI/Terminal Otomasyonu & Mezuniyet"
weight: 10
badge: "YENİ MODÜL"
infrastructure: "Go tabanlı bir CLI aracı, terminalde çalışırken kullanıcının izni dahilinde Claude Opus 4.8'den aldığı otonom linux komutlarını yerel sunucuda / VPS üzerinde test eder ve çıktıları anlık olarak Next.js log sunucularına WebSocket ile raporlar."
---

Yazılım mühendislerinin en çok vakit geçirdiği terminal ortamını otonomlaştırmak, geliştirme hızını katlar. Bu modül; kabuk (shell) seviyesinde güvenli komut çalıştıran, SSH otomasyonları yapan ve terminal üzerinden yönetilebilen CLI ajanlarının tasarlanmasını kapsar.

## Terminal Ajan Geliştirme Detayları

- **Go Cobra-CLI Entegrasyonu:** Go ile modern komut satırı araçları yazarak ajanları terminalden parametrik çalıştırma
- **Interactive TUI (Terminal User Interface):** Terminal üzerinde Bubbletea / Charm libraries kullanarak ajanların görsel state'lerini arayüzsüz yönetebilme
- **VPS SSH & Cron Automation:** SSH protokolü üzerinden VPS sunucularında periyodik bakım yapan, logları analiz eden otonom ajan betikleri

## CLI Ajan Komut Akışı

```mermaid
flowchart TD
    CLI[Go Cobra CLI] --> ASK[Claude Opus 4.8<br/>Komut Önerisi]
    ASK --> PERM{Kullanıcı İzni?}
    PERM -->|Evet| RUN[VPS / Lokal Yürütme]
    PERM -->|Hayır| CANCEL[İptal]
    RUN --> WS[WebSocket Log Akışı]
    WS --> NEXT[Next.js Log Sunucusu]
    RUN -->|stderr| HEAL[Self-Healing Döngüsü]
    HEAL --> ASK
```
