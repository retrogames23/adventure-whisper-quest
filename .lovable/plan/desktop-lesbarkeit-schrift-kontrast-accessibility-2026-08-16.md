# Desktop-Lesbarkeit: Schrift, Kontrast, Accessibility

## Ausgangslage (geprüft)

- Auf Desktop greift `MobileStage` nicht (Pass-Through ab 768 px). Alle Schriftgrößen im Code wirken also 1:1 — und der Code enthält sehr viele Mini-Größen: 234× `text-xs` (12 px), 153× `text-[10px]`, 73× `text-[11px]`, 27× `text-[9px]`, dazu 8 px und 7 px.
- Die im Screenshot bemängelten Stellen liegen genau dort: Almanach-Kopfzeile (`text-[10px]`, `tracking-[0.3em]`), Untertitel (`text-[10px]` kursiv), „10 Kapitel“ (`text-[10px] uppercase tracking-widest`), Kapitelliste (`text-xs`), Fußzeile „18. rev. Auflage“ (`text-[9px]`).
- Zusätzlich Kontrastproblem: Die Buch-Overlays nutzen fest kodierte Sepia-Töne. `#8a6a2a` auf `#ead8a8` liegt bei ca. 2,8:1, `#7a5a20` auf `#ead8a8` bei ca. 3,6:1 — beide unter WCAG AA (4,5:1) für Kleintext.
- Dieselben Muster wiederholen sich in `HandbookOverlay`, `BookOverlay`, `AlmanachOverlay`, TopBar, Inventar, Terminal/Konsolen, Karte, Hilfe-/Pause-Menü, DSA-Bildschirme.

## Was gebaut wird

### 1. Globale Desktop-Typografie-Untergrenze

Analog zur bestehenden Mobil-Schicht kommt in `src/styles.css` eine Desktop-Schicht (ab 768 px) hinzu, die alle Mini-Größenklassen auf eine lesbare Untergrenze hebt:

| bisher | neu (Desktop) |
| --- | --- |
| 7/8/9 px, `text-[0.55rem]` | 11 px |
| 10/11 px, `text-[0.6rem]`, `text-[0.65rem]` | 12 px |
| `text-xs` (12) | 13 px |
| `text-sm`, 13 px | 14,5 px |
| `text-base`, 15 px | 16 px |

Dazu leicht erhöhte Zeilenhöhen und eine reduzierte Laufweite für die extremen `tracking-[0.3em]`/`tracking-widest`-Versalzeilen (auf ca. 0,16em), damit Kleinversalien nicht mehr auseinanderfallen.

Die Layoutwirkung bleibt klein (1–2 px pro Stufe), aber die Wirkung auf Lesbarkeit ist deutlich.

### 2. Kontrast auf WCAG-AA-Niveau

- Buch-Optik: die gedämpften Sepia-Töne werden abgedunkelt — `#8a6a2a` → `#6b4a16`, `#7a5a20` → `#5a4015`, `#5a4015` bleibt. Damit erreichen Kopfzeile, Untertitel, „10 Kapitel“, Kapitelliste und Fußzeile ≥ 4,5:1 auf `#ead8a8`/`#f4e8c8`.
- CRT-/Terminal-Flächen: `--phosphor-dim`, `--sepia-dim`, `--muted-foreground`, `--amber-deep` bekommen etwas hellere Desktop-Werte (weniger stark als auf Mobil, Stimmung bleibt erhalten).
- Textklassen mit sehr niedriger Deckkraft (unter ~60 %) werden auf Desktop auf mindestens 75 % angehoben.

### 3. Gezielte Nacharbeit in den Buch-Overlays

In `AlmanachOverlay`, `BookOverlay` und `HandbookOverlay` werden Kopf und Navigation direkt hochgezogen, statt nur über die globale Schicht:
- Buchtitel-Zeile und Untertitel im Header: 13 px, ruhigere Laufweite, dunklere Farbe.
- „Inhalt“ / „10 Kapitel“: 12–13 px.
- Kapitel-Buttons: 14 px, größere Zeilenhöhe und Innenabstand (Trefferfläche ≥ 36 px hoch).
- Pager und Fußzeile: 12–13 px.

### 4. Accessibility-Durchgang

- Sichtbarer Fokusring (`:focus-visible`) auf allen Buttons/Selects der Overlays, damit Tastaturbedienung erkennbar ist.
- Kapitel-Navigation als `nav` mit `aria-current` für das aktive Kapitel.
- Icon-only-Buttons (Schließen, TopBar) auf vorhandene `aria-label` prüfen und ergänzen, wo sie fehlen.
- Sicherstellen, dass genau ein `<main>`-Landmark existiert und Überschriftenebenen in den Büchern nicht springen.

## Technische Details

- Neuer Block in `src/styles.css` unter `@media (min-width: 768px)` mit denselben Escaped-Klassenselektoren wie die Mobil-Schicht; `!important` ist nötig, weil Tailwind-Utilities dieselbe Spezifität haben. Strikt auf Desktop begrenzt, die Mobil-Schicht bleibt unverändert.
- Farbanpassungen in den Buch-Overlays direkt an den Hex-Literalen; CRT-Tokens über `:root`-Overrides in der Desktop-Media-Query.
- Verifikation per Playwright-Screenshots bei 1280×720 und 1440×900 durch: Almanach, Handbuch, Bibliotheksbücher, TopBar, Inventar, Terminal, Karte, Fernseher, Radio, Hilfe-/Pause-Menü, Zentralverwaltung, DSA-Bildschirme. Gegenprobe bei 390×710, dass Mobil unverändert bleibt.
- Keine Änderungen an Spiellogik, Dialogtexten, Flags oder Daten.
