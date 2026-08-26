# Rätselkette bis Akt II prüfbar machen

Ziel: eine wiederholbare Prüf-Logik, die die fünf Fragen beantwortet — statt sie
jedes Mal von Hand durchzuspielen. Vier Ebenen, von billig und exakt bis teuer
und urteilend.

## Ebene 1 — Kritischer Pfad als Datei (`src/game/questGraph.ts`)

Eine einzige deklarative Wahrheit darüber, wie Akt I gedacht ist: eine Liste von
Schritten, jeder mit `id`, `gibt` (Flags/Items, die er produziert), `braucht`
(Vorbedingungen), `ort`, `wer` und `optional: true/false`.

Beispiel-Kette: Telefon kaputt → Mira-Reparatur → Insa → Vossbeck-Duell → Code
im Leitstellen-Verteiler → Miras Maschine → Keypad → Protokollübergabe → Akt II.

Diese Datei ist Referenz für alle folgenden Prüfungen und macht Punkt 1
(logisch/stimmig) überhaupt erst maschinell prüfbar: Jeder Schritt muss seine
Vorbedingungen aus vorherigen Schritten beziehen, sonst Fehler.

## Ebene 2 — Solvability-Simulator (`scripts/solve-check.mjs`)

Ein Headless-Durchspieler statt reiner Textanalyse:

- Startzustand: leerer Spielstand.
- Fixpunkt-Iteration: Alle Szenen-Hotspots und Dialogoptionen werden geladen und
  gegen den aktuellen Zustand geprüft; alles Erreichbare wird ausgeführt, Flags
  und Items sammeln sich an, bis nichts Neues mehr dazukommt.
- Ergebnis: erreichte Flags/Items vs. Zielzustand `act2Started`.

Daraus fallen direkt heraus:
- **Dead Ends (Punkt 2):** Zielzustand nicht erreichbar → harter Fehler, mit
  Angabe des ersten Schritts aus Ebene 1, dessen `braucht` nie erfüllbar wird.
- **Reihenfolge-Fallen:** zusätzlicher Lauf mit „gierigem Spieler“, der jede
  verfügbare Aktion in zufälliger Reihenfolge nimmt (mehrere Seeds). Wenn eine
  Reihenfolge das Ziel verfehlt, obwohl die Fixpunkt-Iteration es erreicht, gibt
  es einen zustandsabhängigen Dead End (z. B. Item verbraucht, Dialog verpasst,
  Mira verärgert).
- **Sackgassen-Flags:** Flags, die gesetzt werden und danach jede weitere Aktion
  blockieren, ohne dass ein Ausweg existiert.

## Ebene 3 — Ballast-Report (Punkt 4)

Der bestehende `quest:check` findet tote Flags und Items. Ergänzt wird eine
Auswertung gegen Ebene 1:

- Alles, was der Simulator erreicht, aber nicht auf dem kritischen Pfad liegt und
  auch nichts freischaltet, was auf dem Pfad liegt → Kategorie **Ballast**.
- Ballast wird nicht automatisch als Fehler gewertet; die Liste unterscheidet
  „Atmosphäre / bewusst optional“ (Whitelist in `questGraph.ts`) von
  „angefangener Strang ohne Auflösung“.
- Zusätzlich: Belohnungs-Check — optionale Stränge, die weder Item, noch
  Wissens-Flag, noch Dialogoption liefern, landen als angefangene Stränge im
  Report.

## Ebene 4 — LLM-Review für Lore und Spielspaß (Punkte 3 und 5)

Aufsetzend auf den vorhandenen `lore-check`-Judge, aber auf den Rätsellauf statt
auf Biografien angewandt: Der Simulator schreibt ein Transkript des kritischen
Pfads (Ort, Handlung, gezeigter Text). Zwei Prüfmodelle bewerten:

- **Lore-Judge:** Transkript gegen `LORE.md` und die Constraint-Memories
  (Retcon, Schmerz-Radio) — jede Verletzung mit Zitat und Fundstelle.
- **Design-Judge:** pro Schritt drei Fragen — Ist das Ziel dem Spieler bekannt?
  Gibt es im Spiel eine auffindbare Spur zur Lösung? Ist die Lösung logisch
  ableitbar oder nur durch Ausprobieren zu finden? Antwort als Ampel plus einem
  Satz Begründung. Das ist die Näherung an „macht Spaß“, die ein Skript leisten
  kann; der Rest bleibt Bauchentscheidung beim Lesen des Reports.

## Ausgabe und Bedienung

Ein neues Skript `bun run quest:solve` (plus `--llm`), Report nach
`/mnt/documents/quest-solve-report.md` mit vier Abschnitten:
Kritischer Pfad (bestanden/gescheitert), Dead-End-Funde, Ballast-Liste,
Lore- und Design-Urteile. Exit-Code ungleich null bei nicht erreichbarem Akt II
oder Lore-Verletzung.

## Technisch

Der Simulator importiert `scenes`, `dialogs` und `hints` direkt per Bun-TS-Import
und stellt eine Attrappe der `api` bereit (`setFlag`, `hasFlag`, `addItem`,
`hasItem`, `goTo`, `startDialog`, `showText`), die statt zu rendern nur
protokolliert. Damit werden echte `onUse`-Funktionen ausgeführt — inklusive der
Verzweigungen, die eine reine Regex-Analyse (heutiger `quest-check`) nicht sieht.
Grenzen: Cutscenes, Timer und Minispiele (Duell, Blockfall) werden über
konfigurierbare Ergebnisse in `questGraph.ts` gestubbt, einmal mit Sieg und
einmal mit Niederlage, damit auch der Verlierer-Pfad auf Dead Ends geprüft wird.

## Nicht Teil dieses Schritts

Das Beheben der gefundenen Probleme. Erster Lauf liefert nur den Report; welche
Funde wir reparieren, entscheidest du danach.
