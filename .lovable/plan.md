# Ralf: vom Lexikon zum Gesprächspartner

Ralfs Dialog wird von einem sofort offenen Themenmenü zu einer Bekanntschaft umgebaut, die sich über mehrere Besuche entwickelt. Layard muss sich das Wissen erreden, nicht abrufen.

## Struktur in drei Vertrauensstufen

**Stufe 1 — Erstkontakt (Smalltalk)**
Kein Themenmenü. Eine kurze, feste Szene: Hand, Rauch, „Sie stören nicht.“ Ralf stellt sich vor und stellt die erste Gegenfrage („Sie sind neu hier, oder? Vierte Etage?“). Layard hat zwei bis drei kleine Antwortoptionen, die charakterisieren statt Lore abzufragen (knapp, offen, ausweichend). Ralf reagiert darauf. Zum Schluss: „Kommen Sie wieder vorbei. Ich stehe hier ohnehin.“ Nur ein einziges leichtes Thema ist schon jetzt zugänglich (das Rollo, warum er hier steht).

**Stufe 2 — Man kennt sich (Ralf fragt zurück)**
Ab dem zweiten Gespräch ein kleines Menü mit den unverfänglichen Themen: warum E67/E71 getrennt sind, was das Mandatsgebiet ist, wer hier wohnt. Nach jeder ein bis zwei Antworten dreht Ralf das Gespräch um und stellt eine eigene Frage an Layard (Arbeit, Schlaf, warum er nachts durchs Haus läuft). Layards Antwort setzt eine kleine Haltung fest, auf die Ralf später zurückkommt. Erst wenn Ralf zwei solcher Gegenfragen beantwortet bekommen hat, öffnet sich Stufe 3.

**Stufe 3 — Vertrauen (die schweren Themen)**
Jetzt erst freigeschaltet: Resonanz-Hygiene, die eingestellte Zeitungsserie, Miras Theorien (weiterhin nur mit `metMira`) und Ralfs eigene Geschichte mit den Ordnern. Hier duzt er Layard, hier fällt der Satz über die fehlende Verschwörung. Zum Abschluss ein ruhiger Ausklang statt Menü.

## Damit er lebendig wirkt

- Kein starres „Noch was?“ nach jeder Antwort: Ralf leitet mit wechselnden Zeilen zurück (Zigarette anzünden, Husten, Pause, Blick auf die Uhrzeit).
- Ralf erinnert sich: Begrüßung variiert nach Besuchsanzahl und danach, was Layard über sich erzählt hat.
- Themen tragen kein „(schon gehört)“-Etikett mehr, sondern verschwinden bzw. werden durch Nachfrage-Varianten ersetzt.
- Ralf biegt auch mal ab („Später. Erst Sie.“), wenn Layard mehrere Lore-Fragen hintereinander stellt.
- Jede Stufe endet mit einem natürlichen Abschied statt nur „[ Weitergehen ]“.

## Technisches

- `src/game/dialogs/ralf.ts` wird neu aufgebaut: `ralfIntro` bleibt Einstiegspunkt, verzweigt am Start je nach Stufe in `stage1`/`stage2`/`stage3`.
- Neue Flags in `src/game/types.ts`: `ralfStage2`, `ralfStage3`, `ralfAskedWork`, `ralfAskedNight`, `ralfKnowsLayardWriter` sowie Marker für beantwortete Gegenfragen.
- Bestehende `ralfTold*`-Flags bleiben erhalten und steuern weiter, welche Themen schon erzählt wurden — Speicherstände bleiben kompatibel.
- Themenlisten werden in `buildTopicsStage2` / `buildTopicsStage3` aufgeteilt; Rückkehrzeilen kommen aus einer kleinen Varianten-Liste.
- `src/game/npcPersonas.ts` (Ralfs Freie-Rede-Persona) wird im Ton angeglichen: fragt zurück, doziert nicht.
- Keine Änderung an Szene, Hotspots oder Rätsellogik.