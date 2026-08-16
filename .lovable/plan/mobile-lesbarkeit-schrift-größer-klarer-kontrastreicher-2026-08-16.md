# Mobile Lesbarkeit: Schrift größer, klarer, kontrastreicher

## Ausgangslage (geprüft)

- Auf Mobil skaliert `MobileStage` die komplette 1280×720-Bühne per `transform: scale(...)` herunter. Bei 390×710 liegt der Faktor bei rund **0,55** — jede Schriftgröße im Spiel erscheint also nur gut halb so groß wie am Desktop.
- Im Code stehen über 500 sehr kleine Schriftgrößen: 230× `text-xs`, 153× `text-[10px]`, 73× `text-[11px]`, 27× `text-[9px]`, dazu 8px und 7px. Nach der Bühnenskalierung sind das effektiv **4–7 px** — unlesbar.
- Viele Texte laufen zusätzlich mit gedämpften Farben (`text-muted-foreground`, `/40`–`/70`-Transparenzen, `phosphor-dim`, `sepia-dim`), was den Kontrast auf kleinen Displays weiter senkt.

## Was gebaut wird

### 1. Globale Mobil-Typografie-Schicht (Hauptmaßnahme)

`MobileStage` gibt den aktuellen Skalierungsfaktor als CSS-Variable an die Bühne weiter. In `src/styles.css` entsteht daraus eine Ausgleichsschicht, die auf Mobilgeräten **alle kleinen Schriftgrößen auf eine lesbare Mindestgröße anhebt** — abhängig davon, wie stark die Bühne gerade geschrumpft wird. Kein Text im Spiel erscheint danach kleiner als ca. 12 px echter Bildschirmgröße; Fließtext (Dialoge, Beschreibungen, Bücher) landet bei ca. 15–16 px.

Der Ausgleich greift nur unterhalb 768 px Breite. Desktop bleibt exakt wie heute.

### 2. Kontrast anheben

Auf Mobil werden die gedämpften Leseflächen aufgehellt:
- `--muted-foreground`, `--phosphor-dim`, `--sepia-dim` bekommen mobile Werte mit deutlich höherer Helligkeit.
- Sehr transparente Textklassen (Opazität unter ~60 %) werden auf Mobil auf mindestens 75 % angehoben.
- Leichte Textschatten hinter Text auf Szenenbildern (Untertitel, Chatter-Blasen, Hotspot-Labels), damit heller Hintergrund die Schrift nicht mehr schluckt.

### 3. Gezielte Nacharbeit in den wichtigsten Oberflächen

Nach der globalen Schicht werden die Bildschirme einzeln auf 390×710 geprüft und dort nachgezogen, wo mehr Schrift das Layout sprengt (Zeilenumbruch, Höhe, Abschneiden) — insbesondere:
Textbox/Untertitel, Dialog-Auswahl, Inventar, TopBar, Terminal und Konsolen, Fernseher, Radio, Karte, Bücher/Almanach/Handbuch, Hilfe- und Pause-Menü, Bus-Szene, Fokus-Sheet, Kneipe/Chat, DSA-Bildschirme.

## Technische Details

- `src/components/game/MobileStage.tsx`: setzt `--stage-scale` und ein `data-mobile-stage`-Attribut auf dem Bühnen-Div (nur Präsentation, keine Logikänderung).
- `src/styles.css`: neuer Block unter `@media (max-width: 767px)` mit `--text-boost: clamp(1, 0.8 / var(--stage-scale), 1.9)` und Regeln, die die kleinen Tailwind-Größenklassen (`text-[7px]` … `text-sm`) auf `max(<Original>, <Mindestgröße> * var(--text-boost))` heben, dazu mobile Overrides der Dim-Farbtokens.
- Klassenbasierte Overrides brauchen `!important`, weil Tailwind-Utilities dieselbe Spezifität haben; sie bleiben strikt auf die Mobil-Media-Query begrenzt.
- Verifikation mit Playwright-Screenshots bei 390×710 durch die genannten Oberflächen, plus Gegenprobe bei 1280×720, dass Desktop unverändert ist.
- Keine Änderungen an Spiellogik, Dialogtexten, Flags oder Daten.