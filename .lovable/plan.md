# Tech-Stack-Review: Aufräumen ohne Umbau

Der Stack selbst ist gesund: TanStack Start 1.16x auf React 19, Vite 7, Tailwind 4, Lovable Cloud, Deployment auf Cloudflare Workers. Kein Framework-Wechsel nötig. Was sich lohnt, sind vier Aufräumarbeiten — von "sofort sinnvoll" bis "optional".

## 1. Ungenutzte Abhängigkeiten entfernen (risikoarm)

Diese Pakete werden nirgends importiert:

- `class-variance-authority` — nur noch in der Lizenzliste des Open-Source-Overlays genannt, kein `cva(`-Aufruf im Code (es gibt kein `src/components/ui`)
- `@cloudflare/vite-plugin` und `@tanstack/router-plugin` — beide bringt `@lovable.dev/vite-tanstack-config` selbst mit; sie stehen nicht in dessen Peer-Liste
- `react-email` (das CLI-Paket) — genutzt wird nur `@react-email/components`

Bleiben müssen dagegen `nitro`, `vite-tsconfig-paths`, `@tailwindcss/vite`, `@vitejs/plugin-react`: das sind echte Peer-Dependencies der Lovable-Vite-Config. `tw-animate-css` bleibt ebenfalls (wird in `src/styles.css` importiert).

Danach: Lizenzliste im Open-Source-Overlay an den neuen Stand angleichen.

## 2. Medien-Assets aus dem Repo/Bundle holen (größter Effekt)

`src/assets` ist aktuell **201 MB**, davon allein **89 MB Musik**. Bisher sind nur 8 Dateien externalisiert (die `.asset.json`-Platzhalter), aber es liegen 33 Audio-/Video-Dateien im Ordner. Das bläht Repo, Checkout und Build spürbar auf.

Vorschlag: alle verbleibenden `.mp3`/`.mp4` über den Asset-Mechanismus externalisieren, so wie `elevator-music.mp3` es schon ist. Der Code ändert sich dabei nicht — der Import bleibt gleich, nur die Datei wandert in den Asset-Speicher.

## 3. Bilder verkleinern

63 JPEGs im Root von `src/assets` ergeben zusammen **50 MB**, einzelne Szenenbilder liegen bei 1,6–2 MB. Kein einziges WebP im Projekt. Für 16:9-Szenen bei maximal ~1920 px Breite reichen typischerweise 200–400 KB pro Bild.

Vorschlag: Szenenbilder auf sinnvolle Zielbreite skalieren und als WebP ausliefern (JPEG als Fallback nur, wo nötig). Erwartung: 50 MB → grob 8–12 MB, deutlich schnellere Ladezeit auf Mobilgeräten.

## 4. Sehr große Quelldateien aufteilen (optional, mittelfristig)

Einige Dateien sind für Bearbeitung und Review unhandlich geworden:

- `Terminal.tsx` (98 KB) — hier stecken Dateisystem, IRC, auskunft.bin, Blockfall-Anbindung und Prozessliste in einer Komponente
- `AmigaWorkbench.tsx` (64 KB)
- `dsa/adventure.ts` (75 KB), `dsa/combat.ts` (59 KB)
- `routes/api/public/dsa-master.ts` (53 KB)

Das ist kein Fehler, aber jede künftige Änderung an diesen Dateien wird teurer und fehleranfälliger. Aufteilen würde ich schrittweise und nur dann, wenn ohnehin an der jeweiligen Stelle gearbeitet wird — nicht als eigene Großaktion.

## Was ich *nicht* ändern würde

- **Vite 8 / Rolldown**: wie zuletzt besprochen noch zu früh, kein konkreter Gewinn für dieses Projekt.
- **Framer Motion** (4 Nutzungsstellen): könnte man durch CSS ersetzen, der Aufwand lohnt den Bundle-Gewinn aber nicht.
- **`@mlc-ai/web-llm`**: wirkt in einer Textsuche ungenutzt, wird aber korrekt per dynamischem Import geladen — bleibt.
- **Routing, Cloud-Anbindung, Tailwind-Setup**: unverändert lassen.

## Umsetzungsreihenfolge

1. Punkt 1 (Pakete entfernen + Lizenzliste) — klein, sofort
2. Punkt 3 (Bilder) — größter spürbarer Effekt für Spieler
3. Punkt 2 (Medien externalisieren) — größter Effekt fürs Repo
4. Punkt 4 nur bei Bedarf

Sag mir, welche Punkte ich angehen soll — ich kann auch nur 1 und 3 machen.
