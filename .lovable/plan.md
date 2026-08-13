# Karte von Sektor 28

## Ziel
Vossbeck nennt Layard die Zentralverwaltungsstelle Sektor 28 als Abgabeort für alle Hinweise. Ab diesem Moment erscheint in der Kopfzeile zwischen Musik-Player und Menü ein neuer Button **Karte**. Die Karte zeigt Sektor 28 aus der Vogelperspektive; einige Orte sind bereisbar, alle anderen anklickbar mit kurzem Text.

## Geografie Sektor 28
Sektor 28 ist ein Rasterstück Verwaltungsstadt: Quadrante als Blocknummern, dazwischen Ringstraße und Versorgungsachsen.

```text
              N
   [ Quadrant 67 ]            [ Zentralverwaltungsstelle 28 ]
    A B                            (Verwaltungsanger)
    C D   ▲E67
        \
         \  ~380 m  (NW-Peilung Walters)
          \
           ▼E71   [ Quadrant 71 ]
                    A B / C D
   [ Umspannwerk 28/3 ]   [ Versorgungshof ]   [ Sektorgrenze 28/29 ]
```

Fixpunkte, die zur bestehenden Lore passen:
- Quadrant 67: Wohnblöcke 67-A bis 67-D, daneben der Ergänzungsbau **E67** (bereisbar).
- Quadrant 71: Wohnblöcke 71-A bis 71-D, daneben der Ergänzungsbau **E71** (bereisbar).
- E67 liegt nordwestlich von E71, Luftlinie rund 380 m — deckt Walters Kreuzpeilung (NW, 300–500 m) exakt.
- **Zentralverwaltungsstelle Sektor 28** (bereisbar, Szene folgt später): nördlich am Verwaltungsanger, an der Ringstraße.
- Nur anklickbar (Kurztext, keine Reise): Ringstraße 28, Versorgungshof mit Rohrpost-Knoten, Umspannwerk 28/3, Kantinenzentrale, Wetter- und Resonanzmessfeld, Sektorgrenze 28/29, Grünstreifen/Anger, Bushaltepunkt der Linie zum Sektor 29.

## Verhalten
- Freischaltung über ein neues Flag, gesetzt in Vossbecks Dialog, sobald er den Abgabeort nennt.
- Button erscheint nur mit Flag, sitzt zwischen Track-Switcher und Menü, gleiche Optik wie die übrigen Kopfzeilen-Buttons.
- Overlay: Vogelperspektive als Bild im Unavowed-Stil mit prozentualen Hotspots darüber (gleiche Technik wie Szenen-Hotspots), damit die Karte responsiv bleibt.
- Bereisbare Orte: Klick schließt die Karte und springt zur Eingangsszene (E67-Schleuse bzw. E71-Lobby). Zentralverwaltungsstelle zeigt vorerst „Zutritt derzeit nur nach Vorlage — Termin wird zugewiesen.“
- Nicht bereisbare Orte: kurzer Beschreibungstext im Kartenrahmen, 2–3 Sätze, Ton wie die Almanach-Einträge, Mandatsdeutsch dosiert.
- Reisen wird während Cutscenes, Dialogen und in Aufzügen unterdrückt.

## Technisch
- Neues Flag in `src/game/types.ts`, gesetzt in `src/game/dialogs/vossbeckAct2.ts` (bzw. dem Dialog, der den Abgabeort nennt).
- Neue Datenquelle `src/game/mapSector28.ts`: Liste der Kartenorte mit id, Label, Position, Kurztext, optionalem Reiseziel und Sichtbarkeitsbedingung.
- Neue Komponente `src/components/game/MapOverlay.tsx`, eingebunden in `Game.tsx` analog zu den bestehenden Overlays; Zustand über GameContext (`mapOpen`, `openMap`/`closeMap`), Taste `M` und Escape zum Schließen.
- Button in `src/components/game/TopBar.tsx` zwischen Musik-Switcher und Menü.
- Kartengrafik `src/assets/map-sector-28.jpg` generieren: Vogelperspektive, regnerisches Spätherbstlicht, gemalter Unavowed-Stil, keine Beschriftung im Bild (Labels kommen aus dem Code).
