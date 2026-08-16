# Serverraum 5610 — neues Narrativ für das Terminal

## Problem (geprüft im Code)

- Die Szene beschreibt 5610 als Ort, an dem „die Resonanz-Pakete von E67 zusammenlaufen, bevor sie an die Leitstelle gehen" (`corridorsE67.ts`:487), das Terminal nennt sich „Lokaler Resonanz-Konzentrator" und gibt Affekt-Telemetrie auf 104,6 MHz aus (`NodeTerminal.tsx`).
- Das widerspricht der gesetzten Lore (`LORE.md` §6c/§7): Es gibt **keine staatliche Resonanz-Infrastruktur** und keine behördliche Radio-Regulierung. Das Schmerz-Radio ist private Bastelei.
- Plot-Wirkung: `tap` setzt nur `radioOrigin` (das Layard ohnehin über sein eigenes Gerät hat), `burn` setzt nur Kosmetik (Rauch im Korridor, totes Radio-Panel, stiller Abspann). Kein Bezug zum Akt-I-Ziel: verwertbares Material für Zimmer 5011.

## Neues Narrativ

**NODE-MAINT 5610 ist kein Resonanz-Knoten, sondern der Vorgangs-Knoten der Hausverwaltung E67** — eine Datenfluss-Maschine, die jeden Vorgang im Haus mitschreibt: Störmeldungen, Türsiegel, Ruhezeit-Beschwerden, Aufzug-Wartungsmodus, weitergeleitete Krankmeldungen. Langweilige Verwaltungstechnik, genau das Ethos aus §6d: „Der Vorgang ist die Form."

Interessant wird er, weil in diesem Papierweg sichtbar wird, was Menschen nicht sagen: über Monate wurden Meldungen aus E67 mit demselben Kürzel geschlossen — „nicht vorgesehen" —, und der Befund zu 2615 wurde im selben Vorgang wieder zurückgenommen. Kein Komplott, sondern ein Apparat, der Belastung wegverwaltet.

## Terminal-Befehle (neu)

- `vorgang` (ersetzt `tap`) — Vorgangsliste E67 der letzten Monate: Häufung von Meldungen, Serie identischer Abschlussvermerke, der zurückgenommene Befund zu 2615. Setzt Wissen `vorgangsspur5610`.
- `mitschnitt` (bisher `listen`) — bleibt als Atmosphäre, aber als laufender **Vorgangsverkehr** E67↔Leitstelle (`SECTOR_CHATTER`), nicht als Affektstrom.
- `drucken` — nur nach `vorgang`: gibt einen **Vorgangsstreifen 5610** als Inventar-Gegenstand aus. Das ist das Schriftstück, das SASSE in 5011 überhaupt annehmen kann.
- `loeschlauf` (bisher `burn`) — bleibt dramatisch, bekommt aber Folgen (unten).
- `exit` — unverändert.

Das Wartungs-Funkgerät (102,7 MHz, Krummbein-Diktat) und das Schmerz-Radio bleiben davon **unberührt** — private Nische, getrennt vom Verwaltungsknoten. Thermoskanne und Ölkännchen bleiben exakt wie sie sind.

## Der Löschlauf — echte Entscheidung

Im Speicher stehen auch Namen: Bodos eigenmächtige Wartungsfahrten, Miras Beschwerdeserie, Layards eigene Besuche und Nachfragen.

- **Löschlauf ausführen:** Der lokale Vorgangsspeicher ist weg. Bodo und Mira tauchen in keiner Auswertung mehr auf — aber es gibt kein Schriftstück mehr, und ein bereits gedruckter Streifen lässt sich nicht mehr gegenprüfen. In 5011 bleibt Layards Aussage unbelegt. Alarm, Rauch, Anruf an der Lobby — bleibt wie gehabt.
- **Nicht ausführen:** Layard hat Belege, aber die Namen bleiben im Apparat.

Beides wird als Flag geführt und wirkt in 5011 und im Abspann.

## Änderungen

1. `corridorsE67.ts`: Szenen-Intro und Racks-Text lore-konform (Vorgangsknoten der Hausversorgung statt Resonanz-Pakete/104,6).
2. `NodeTerminal.tsx`: Befehle, Ausgaben und Kopfzeile neu; `tap`-Telemetrie durch Vorgangsliste ersetzt; `drucken` ergänzt; `burn` → `loeschlauf` (alte Eingaben bleiben als Alias verstanden).
3. `types.ts`: Flags `readVorgangsliste5610`, `printedVorgangsstreifen`, `wipedNode5610` (bestehende 5610-Flags bleiben als Alias erhalten, damit Spielstände nicht brechen); Wissen `vorgangsspur5610`.
4. `knowledge.ts`: Eintrag `vorgangsspur5610` mit Frage/Offenlegen/Ausweichen/Vermerk für Zimmer 5011.
5. `combine.ts`/Inventar: Gegenstand „Vorgangsstreifen 5610".
6. `hints.ts`: Hinweise auf die neuen Befehle umstellen.
7. `LORE.md`: kurzer Absatz zum Vorgangsknoten unter §6a/§5.

## Offen

Nichts blockiert — falls der Löschlauf zusätzlich Bodos oder Miras spätere Reaktion auslösen soll, ergänze ich das als zweiten Schritt.
