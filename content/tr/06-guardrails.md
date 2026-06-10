---
order: 6
title: "Domain 6: Implement Guardrails and Accountability"
section: "Bölüm III: Değerlendirme, Orkestrasyon & Güvenlik"
weight: 10
infrastructure: "Kritik eylemlerde (örn. dosya silme) Go execution thread'inin Next.js paneline onay düşürerek güvenli bir şekilde blocklanması."
---

Giriş ve çıkış güvenlik duvarları (Prompt Injection ve PII sızıntı korumaları). Sonsuz döngü engelleme mekanizmaları. Kritik sunucu komutlarında insan onayı arayüzü entegrasyonu (Human-in-the-Loop).

## HITL Onay Akışı

```mermaid
sequenceDiagram
    participant A as Ajan
    participant G as Guardrail Katmanı
    participant P as Next.js Onay Paneli
    participant H as İnsan Operatör

    A->>G: rm -rf /var/data (kritik eylem)
    G->>G: Risk sınıflandırma: YÜKSEK
    G->>P: Onay talebi (thread blocked)
    P->>H: Bildirim + eylem önizlemesi
    H-->>P: Onayla / Reddet
    P-->>G: Karar
    G-->>A: Yürüt veya iptal et
```

## Öğrenme Çıktıları

- Prompt injection ve PII sızıntısına karşı giriş/çıkış filtreleri
- Döngü sayaçları, bütçe limitleri ve devre kesiciler (circuit breakers)
- Denetlenebilirlik için imzalı eylem logları (audit trail)
