# Mira: verzeihender machen, kein Dead End

## Problem

Eine einzige Antwort ("Ich bin Verwaltungsangestellter. So etwas höre ich lieber nicht.", oder "Lass mich in Ruhe damit.") setzt sofort das Flag `miraSystemic`. Danach ist Mira dauerhaft abgeschaltet: jede weitere Begegnung endet in `miraSystemicGreeting` ("Guten Tag, Bürger.") ohne jede Auswahl — auch die Störungsmeldung zum defekten Wohnungsapparat ist dann nicht mehr erreichbar. Das ist ein Dead End für den Telefon-/Wartungsstrang.

## Lösung

### 1. Abkühlung statt Abschaltung (Zähler)

Statt eines Sofort-Schalters bekommt Mira eine Distanz-Stufe, die sich über mehrere systemkonforme Aussagen aufbaut:

- Stufe 1 (erste systemkonforme Antwort): Mira zieht sich thematisch zurück ("Schon gut. Vergiss, dass ich was gesagt habe."), bleibt aber ansprechbar. Der Z.K.S.-/Resonanz-Hygiene-Strang ist beim nächsten Mal wieder anwählbar.
- Stufe 2: Kühler Ton, kurze Antworten, politische Themen nur noch, wenn Layard aktiv nachfragt.
- Stufe 3 (erst hier): `miraSystemic` — sie redet nicht mehr über ihre Sache.

Die Stufe steigt nur bei klar systemkonformen Antworten, nicht bei "Keine Zeit" / "Später" / skeptischen Einwänden. Sachliche Einwände ("Das ist einfach Verwaltungssprache") bleiben wie bisher folgenlos — Mira korrigiert sich dort selbst.

Zusätzlich: die Distanz lässt sich wieder senken. Wer nach einer kühlen Antwort ernsthaft nachfragt oder ihr etwas Nützliches bringt (Beleg/Aushang), holt eine Stufe zurück.

### 2. Kein Dead End — Wartung immer erreichbar

Auch bei `miraSystemic` startet Mira nicht mehr in einer Sackgassen-Zeile. Die kalte Begrüßung bekommt Auswahlmöglichkeiten:

- Störungsmeldung Wohnungsapparat (solange Telefon defekt und nicht repariert) — führt unverändert in `miraFaultReport`.
- eine neutrale Verwaltungsfrage
- "[ Später ]"

Mira bleibt dabei im Ton unfreundlich-korrekt (Mandatsdeutsch, Dienst nach Vorschrift): Sie macht den Job, weil er ihre Schicht ist, nicht weil sie Layard mag. Die Reparatur-Cutscene und alle daran hängenden Flags bleiben unverändert erreichbar.

### 3. Akt-II-State bleibt konsistent

`computeMiraEndState` wertet weiterhin `miraSystemic` als "skeptical" — nur wird dieses Flag jetzt erst nach mehrfacher Systemkonformität gesetzt. Ein Rückweg (Distanz gesenkt, danach Belege geliefert) führt weiterhin zu "neutral"/"friendly".

## Technische Details

- `src/game/types.ts`: neue Flags `miraDistance1`, `miraDistance2` (Stufenzähler; `miraSystemic` bleibt Stufe 3).
- `src/game/dialogs/mira.ts`:
  - Helfer `bumpMiraDistance(api)` / `easeMiraDistance(api)` statt direkter `setFlag("miraSystemic")`-Aufrufe an den vier Stellen (Zeilen ~180, ~233, ~255, ~470).
  - Neue Antwortzeilen für Stufe 1 und 2 (Mira bleibt gesprächsbereit).
  - `miraSystemicGreeting` bekommt `npcId: "mira"` und Choices inkl. Störungsmeldung → `miraFaultReport`.
  - `miraHubChoices` / `startMiraEncounter` respektieren die Stufe: bei Stufe 1–2 normaler Hub mit gedämpften Zeilen.
- `src/game/miraState.ts`: unverändert; nur der Kommentar wird an die neue Stufenlogik angepasst.
- Abschließend `bun run lore:check`.
