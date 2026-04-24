

# Serverraum hinter Tür 5610 — Vorschlag

## Worum es geht

Auf Etage 5 (Korridor 56, Dachetage E67) bekommt eine bisher unauffällige Wandstelle eine Tür mit der Nummer **5610** und dem Schild „Technik / Kein Zutritt". Dahinter liegt ein kleiner Serverraum: warme Luft, drei Racks, blinkende Status-LEDs, ein Wartungsterminal. Genau hier laufen die lokalen Resonanz-Pakete von E67 zusammen, bevor sie an die Leitstelle gehen.

## Warum Layard rein will (Motivation)

Drei Spuren, die im Spiel bereits angelegt sind, laufen hier zusammen:

1. **Mira-Spur** — Mira deutet im Flyer-Gespräch an, dass die Frequenz 104,6 nicht „gehört", sondern *gerichtet* wird. Wer den Flyer genommen hat (`tookFlyer`), bekommt ein neues Mira-Dialog-Branch: „Auf 56 ist ein Knoten. 5610. Wenn du ihn findest, hörst du, woher das Schmerz-Radio wirklich sendet."
2. **Philippe-Sonden** — Philippes Notizen 1–5 (`philippeProbeNote*`) erwähnen wiederholt einen „lokalen Spiegel" auf der Dachetage. Wer alle fünf gelesen hat, bekommt im Korridor 56 eine Caption „Hier muss er sein."
3. **Schmerz-Radio im Korridor** — Steht der Radio aktiv (`radioActive` auf 104,6) und Layard nähert sich Tür 5610, lauter werdendes Brummen + Untertitel: „Das Signal kommt von hinter dieser Tür."

Mindestens **eine** dieser drei Spuren reicht, damit die Tür sichtbar wird und Layard einen Grund hat, sich daran zu versuchen. Das passt zur bestehenden Logik (mehrere Wege führen zum Ziel).

## Wie er die Tür öffnet (Game-Logik)

Die Tür hat ein **Keypad**, aber der vierstellige Code ist nicht über Insa zu bekommen — sie würde ihn nie herausgeben. Stattdessen drei alternative Wege, je nach Spielstil:

**Weg A — Bodos Hausmeister-Account (Technik-Spieler).**
Über Bodos Terminal (`bodoTerminal`, bereits im Spiel) gibt es einen neuen Befehl `maint list e67`. Der listet u. a. „Tech-5610 · Code: 7032 · Letzte Wartung: …". Code merken, am Keypad eingeben → Tür auf. *Voraussetzung:* `bodoLeftForB3` (Bodo ist außer Haus, Layard sitzt am Account).

**Weg B — Mira-Hint + Schmerz-Radio (Lore-Spieler).**
Wenn der Spieler beides hat (`miraSystemic` + `radioActive`), schaltet sich am Keypad ein vierter Slot frei: „Frequenz eingeben". Eingabe von **1046** entriegelt die Tür — der lokale Knoten reagiert auf seine eigene Sendefrequenz wie ein Schlüssel. Diegetisch passt das zur Resonanz-Logik des Spiels.

**Weg C — Philippes Sonden (Detektiv-Spieler).**
Nach 3 von 5 gelesenen Probe-Notizen (`philippeProbeNote1..5`) hat Layard im Inventar einen neuen Eintrag „Notiz: Wartungsmuster 5610 — 7-0-Pause-3-2". Auch das öffnet die Tür.

Alle drei Wege setzen denselben Flag `serverRoom5610Open` und lösen einmalig eine kurze Sequenz aus („Klacken. Warme Luft schlägt ihm entgegen.").

## Was Layard drinnen tut (Payoff)

Im Serverraum gibt es **ein Wartungsterminal** (eigene Terminal-Variante) mit drei sinnvollen Aktionen, die jeweils das Ende beeinflussen:

- **`tap`** — passives Mithören. Layard hört für 10 Sekunden den Roh-Stream: *seine eigene Stimme, gefiltert*. Setzt Knowledge `radioOrigin`. Verändert kein Ende, schaltet aber neue Dialog-Optionen mit Insa und Mira frei.
- **`reroute`** — den Knoten auf eine Schleife legen. E67 sendet ab jetzt nur noch Echo, keine neuen Schmerz-Daten. Friedliche Variante: führt zu einem zusätzlichen Ende „Stiller Sektor".
- **`burn`** — Hardware-Reset, der Knoten brennt durch. Lautes Ende: Alarm in der Lobby, Insa ruft an, Sektor-Tür schließt für immer. Führt zu einem alternativen „Sabotage"-Ende.

## Wo genau die Tür sitzt

In Korridor 56 ist rechts neben der Wartungsluke (`hatch56`, x:50) noch Platz. Vorschlag: neuer Hotspot `door5610` bei x:24, y:32, w:14, h:50 — auf einer aktuell leeren Wandfläche links neben Mira. Das Schild „5610 · Technik" wird als Caption angezeigt; sichtbar erst, wenn eine der drei Motivations-Spuren erfüllt ist.

## Technische Umsetzung (für später)

- 1 neue `SceneId`: `serverRoom5610` + Hintergrundbild (Image-Generierung).
- 3 neue `StoryFlag`: `serverRoom5610Open`, `tappedNode5610`, `reroutedNode5610`, `burnedNode5610`.
- Neuer Hotspot `door5610` in `corridor56` mit `visible`-Predikat (3 Spuren).
- Erweiterung von `Keypad.tsx` um optionalen 4-stelligen Modus + optionaler Frequenz-Slot (Weg B).
- Neuer Befehl `maint list` in `Terminal.tsx` (nur im Bodo-Modus).
- 1 neues Inventar-Item `wartungsnotiz5610` (Weg C).
- 2 neue Endings in `Ending.tsx` („Stiller Sektor", „Sabotage").
- Decal/Asset für die Tür im Korridor (CSS-only oder kleines PNG).

## Was ich von dir brauche

- Ist die Position (links neben Mira, x:24) okay, oder soll die Tür woanders sitzen?
- Sollen wirklich **alle drei** Wege rein, oder reicht dir einer (welcher)?
- Sollen `reroute` und `burn` echte zusätzliche Endings auslösen oder nur das bestehende Ende färben (Epilog-Text)?

