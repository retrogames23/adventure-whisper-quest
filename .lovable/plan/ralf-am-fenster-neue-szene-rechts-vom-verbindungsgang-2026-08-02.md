# Ralf am Fenster — neue Szene rechts vom Verbindungsgang

Ein neuer, rein narrativer Ort zwischen E67 und E71: ein Fenster mit fast geschlossener Rollade, aus dem Schlitz eine Hand mit Zigarette. Dahinter Ralf, E71-Bewohner, belesen, lakonisch, weiß viel — ohne jede Rätselfunktion.

## Zugang

- In `passage` kommt rechts ein neuer Ausgang hinzu ("Weiter nach rechts →"), der in die neue Szene `windowNiche` führt. Zurück geht es in den Verbindungsgang.
- Der Ausgang ist von Anfang an offen, sobald Layard die Passage erreicht.

## Die Szene

- Neues Hintergrundbild im Stil der bestehenden Außenszenen: Betonwand, Fenster mit fast ganz heruntergefahrener Rollade, schmaler Schlitz, darin eine Hand mit Zigarette.
- Hotspots:
  - "Hand am Fenster mit Zigarette" (talk) — Label bleibt so, bis Layard den Namen kennt; danach "Ralf".
  - Fenster/Rollade (look), Zigarettenstummel am Boden (look), Blick zurück Richtung Passage (exit).

## Ralf als Gesprächspartner

- Neuer Sprecher `RALF`, neue Dialogdatei mit einem Hub-Dialog: Layard fragt, Ralf antwortet, danach zurück ins Menü. Kein Ende nach einer Antwort — Layard kann viele Themen abarbeiten.
- Themenblöcke (jeweils ein bis drei Zeilen, ruhig, trocken, ohne Pathos):
  - Die Sektoren: warum E67 und E71 getrennt wurden, was die Sektor-Reform wirklich verändert hat.
  - Geschichte des Mandatsgebiets: Mandatsrat, wie die Zuständigkeiten entstanden sind, was vorher da war.
  - Resonanz und Resonanz-Hygiene: wie der Begriff historisch gewachsen ist und was er praktisch bedeutet.
  - Bewohner: Mira, Bodo, Insa, Vossbeck, Dr. Okwu, Mikael Stegmann — kurze, treffende Einordnungen.
  - Zeitungsartikel über E67: was damals gedruckt wurde und was daraus wurde.
  - Ralf selbst: früher sehr interessiert, heute eingerichtet — spricht trotzdem offen.
- Mira-Einordnung als eigener Themenpunkt (freigeschaltet, sobald Layard Mira kennt) mit der vorgegebenen Kernzeile: keine absoluten Wahrheiten, Miras Blick noch ungetrübt, und das eigentlich Erschreckende sei, dass gar keine Verschwörung dahintersteckt — nur sehr viele Menschen, die für sich die Verantwortung scheuen.
- Erstkontakt: Layard spricht die Hand an, Ralf antwortet aus dem Dunkel, nennt irgendwann beiläufig seinen Namen. Danach direkt in den Hub.

## Technisch

- Neue Szene in einer eigenen Datei unter `src/game/scenes/`, registriert in `src/game/scenes/index.ts`; Hintergrundbild per Bildgenerierung nach `src/assets/`.
- `RALF` in die Speaker-Union in `src/game/types.ts`; neue Flags `metRalf` und Themen-Merker für bereits gehörte Antworten (gehörte Themen werden im Menü als solche markiert, bleiben aber wählbar).
- Neue Datei `src/game/dialogs/ralf.ts`, eingebunden in `src/game/dialogs/index.ts`.
- Optional konsistent mit den übrigen NPCs: ein `npcPersonas`-Eintrag für Ralf, damit der freie Chat am Dialogende verfügbar ist (empfohlen, da Ralf gerade als Welt-Erklärer davon profitiert).
- Lore-Antworten werden aus `LORE.md`, `mem/features/resonanz.md` und dem Quadranten-Almanach abgeleitet, damit nichts Neues erfunden wird.
