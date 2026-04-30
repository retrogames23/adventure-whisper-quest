
# Spenden-basierter Cloud-Zugang via Stripe (BYOK)

## Ziel

- Cloud-TTS (ElevenLabs) ist **nur noch gegen Spende** verfügbar.
- Bezahlung über deinen eigenen Stripe-Account (`stephan.doerner@posteo.de`) per Restricted Live Key.
- Nach Spende: lebenslang gültiger Einlöse-Code, der den Cloud-Modus freischaltet.
- Code wird per E-Mail **und** auf der Success-Page gezeigt.
- **Kein Auto-Fallback mehr**: Auf schwachen Geräten gibt es nur noch zwei Zustände — Spende eingelöst → Cloud, oder kein Cloud-Zugang (Free Mode deaktiviert).

## Architektur

```text
Nutzer klickt "Cloud freischalten"
        │
        ▼
Stripe Checkout (hosted, BYOK)
        │  Spende erfolgreich
        ▼
Stripe Webhook  ──► /api/public/stripe-webhook
                         │
                         ├─ verify signature
                         ├─ generate redemption code
                         ├─ insert in donation_codes
                         └─ send email (Resend / Lovable Email)
        │
        ▼
Success-Page zeigt Code  +  E-Mail mit Code
        │
        ▼
Nutzer trägt Code im Settings-Dialog ein
        │
        ▼
/api/public/redeem-code (validiert, markiert eingelöst, gibt Token zurück)
        │
        ▼
LocalStorage flag "cloud_unlocked" + bound device id
        │
        ▼
TTS-Engine nutzt ElevenLabs statt Web Speech
```

## Datenmodell

Neue Tabelle `donation_codes`:

| Spalte | Typ | Zweck |
|---|---|---|
| `id` | uuid PK | |
| `code` | text unique | 16-stellig, Format `XXXX-XXXX-XXXX-XXXX` |
| `stripe_session_id` | text unique | Idempotenz für Webhook |
| `stripe_payment_intent` | text | Audit |
| `amount_cents` | int | gespendeter Betrag |
| `currency` | text | |
| `email` | text | für E-Mail-Versand und Support |
| `redeemed_at` | timestamptz nullable | wann eingelöst |
| `redeemed_device_id` | text nullable | optional: weiches Device-Binding |
| `created_at` | timestamptz | |

RLS: kein Client-Zugriff. Nur Server (admin client) liest/schreibt. Codes sind anonym — kein `user_id` nötig, da App ohne Login funktioniert.

## Implementierung

### 1. Stripe BYOK aktivieren
- `stripe--enable_stripe` Tool ausführen
- Sicheren Dialog für Restricted Live Key öffnen (`add_secret` → `STRIPE_SECRET_KEY`)
- Webhook-Secret später nachreichen (`STRIPE_WEBHOOK_SECRET`)

### 2. Migration
- Tabelle `donation_codes` mit Index auf `code` und `stripe_session_id`

### 3. Server Functions / Routes
- `src/server/donations.functions.ts`:
  - `createCheckoutSession({ amountCents })` — erzeugt Stripe Checkout Session, success/cancel URL, gibt Stripe-URL zurück
  - `redeemCode({ code })` — prüft Code, markiert `redeemed_at`, gibt Cloud-Token zurück
  - `verifyCloudAccess({ token })` — clientseitiger Boot-Check
- `src/routes/api/public/stripe-webhook.ts`:
  - Verifiziert `stripe-signature`
  - Auf `checkout.session.completed`: Code generieren, in DB speichern, E-Mail senden
- `src/routes/api/public/redeem-code.ts`: dünner Wrapper, falls externer Aufruf nötig — sonst nur Server-Function

### 4. E-Mail-Versand
- Lovable Cloud Email-Infrastruktur einrichten (`setup_email_infra`)
- Custom Domain `schmerz-radio.com` ist bereits vorhanden — als Absender nutzen
- Transactional-Template: "Danke für deine Spende — dein Code: `XXXX-XXXX-XXXX-XXXX`"

### 5. UI-Änderungen
- **Spenden-Button** (z. B. in Settings + auf Cloud-Aufforderung): öffnet Checkout
- **Success-Page** `/donation/success?session_id=...`: ruft Code aus DB, zeigt ihn groß, "In Zwischenablage kopieren"
- **Code-Einlöse-Dialog** in Settings: Eingabefeld + Validierung
- **Cloud-Status-Anzeige**: "Cloud aktiv" / "Cloud gesperrt — freischalten"

### 6. Auto-Fallback entfernen
- Bestehende Logik suchen, die bei schwachen Geräten automatisch Cloud-TTS aktiviert
- Ersetzen durch: device-capability check → wenn schwach UND kein Code eingelöst → Hinweis "Dieses Gerät unterstützt den Free Mode nicht. Bitte Cloud-Modus freischalten." + Spenden-CTA. Free Mode ist auf solchen Geräten **nicht startbar**.
- Auf leistungsfähigen Geräten: Free Mode bleibt Default, Cloud bleibt optional gegen Spende.

### 7. Konfiguration
- Spendenbeträge: 3 Voreinstellungen (z. B. 3 €, 5 €, 10 €) + Custom-Betrag (Min. z. B. 1 €)
- Currency: EUR
- Stripe-Produkt: "Schmerz-Radio Cloud-Zugang (Spende)"

## Secrets, die wir später anfordern

1. `STRIPE_SECRET_KEY` (Restricted Live Key, den du gerade erstellt hast)
2. `STRIPE_WEBHOOK_SECRET` (bekommst du, sobald Webhook-Endpoint im Stripe-Dashboard eingerichtet ist — ich gebe dir die exakte URL nach der Implementierung)

## Was nach Approval passiert

1. `stripe--enable_stripe` ausführen
2. `add_secret` für `STRIPE_SECRET_KEY` öffnen → du fügst den Key sicher ein
3. Migration `donation_codes` anlegen
4. Server-Functions, Webhook-Route, Email-Setup bauen
5. UI: Spenden-Dialog, Success-Page, Einlöse-Dialog, Auto-Fallback-Entfernung
6. Ich gebe dir die Webhook-URL → du legst Webhook in Stripe an → kopierst Webhook-Secret → ich öffne `add_secret` für `STRIPE_WEBHOOK_SECRET`
7. End-to-End-Test mit kleinem Spendenbetrag

## Offene Fragen vor Start

- **Spendenbeträge**: 3 € / 5 € / 10 € + frei? Oder andere Staffelung?
- **Mindestbetrag** für Custom-Betrag: 1 €? 3 €?
- **Free Mode auf schwachen Geräten**: Komplett blockieren mit Hinweis + Spenden-CTA — oder soll die App dort gar nicht erst starten? (Empfehlung: starten, aber statt Spielszene direkt der Spenden-Screen.)

Wenn du diese drei Punkte beantwortest und den Plan freigibst, lege ich los.
