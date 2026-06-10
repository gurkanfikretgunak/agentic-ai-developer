---
order: 2
title: "Domain 2: Implement Tool Use and Environment Interaction"
section: "Bölüm II: Sistem Mimarisi & Altyapı Temelleri"
weight: 20
infrastructure: "Claude tarafından üretilen JSON schema tabanlı tool çağrılarının Go mimarisi üzerinde yakalanması, doğrulanması ve güvenli çalıştırılması."
---

Ajanların dış dünya ile etkileşime girmesi. JSON Schema standartlarında fonksiyon tanımlama. Model Context Protocol (MCP) standartlarının uygulanması. VPS üzerinde otonom dosya sistemi yönetimi ve sandbox komut çalıştırma yetenekleri.

## Tool Çağrısı Yaşam Döngüsü

```mermaid
sequenceDiagram
    participant C as Claude Opus 4.8
    participant G as Go Gateway
    participant V as Şema Doğrulayıcı
    participant S as Sandbox (VPS)

    C->>G: tool_use (JSON Schema)
    G->>V: Parametre doğrulama
    V-->>G: Geçerli / Reddedildi
    G->>S: İzole komut yürütme
    S-->>G: stdout / stderr / exit code
    G-->>C: tool_result
```

## Öğrenme Çıktıları

- JSON Schema ile deterministik tool arayüzleri tasarlama
- MCP sunucusu yazma ve mevcut MCP araçlarını ajana bağlama
- Sandbox kaçışlarına karşı dosya sistemi ve ağ izolasyonu
