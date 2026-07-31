## Ziel

Alles aus dem Code entfernen, was im Spiel nie vergeben oder nie gesetzt wird — also toter Ballast, der beim Lesen des Codes den Eindruck erweckt, es gäbe Inhalte, die real unerreichbar sind.

## Befund (im Code geprüft)

### 1. Items ohne jede Quelle

Kein einziges `addItem` im gesamten Projekt:

| Item | Referenzen, die dadurch tot sind |
| --- | --- |
| `exitCode` | Kombi-Kommentare in `combine.ts`, Sonderfall `keypadCall`, `Keypad.tsx:39`, Icon |
| `b3sample` | Kombi-Kommentare, Paar `b3sample+tuningCrystal`, Icon |
| `mikaelLetter` | Kombi-Kommentare, Paar `mikaelLetter+flyer`, Icon |
| `tuningCrystal` | Icon, `RadioPanel.tsx:112`, Wartungs-Funk 5610, Paare mit `flyer`, `b3sample`, `antennaWire` |

### 2. Flags, die nie gesetzt werden

- Nur in `types.ts` deklariert, sonst nirgends: `serverRoom5610OverrideArmed`, `insaSentTo5610`, `duelWon`, `duelLost`, `duelTrainingNextB`, `duelTrainingNextC`.
- Gesetzt: nie — aber sie **sperren erreichbare Inhalte**: `kowalkHintedBodoHelka` (blockiert je eine Dialogoption bei Bodo und Helka), `heardMikaelTruth` (blockiert zwei Einträge in Worags Dateisystem).

## Wichtige Konsequenz — eine Entscheidung nötig

`tuningCrystal` ist die Wurzel einer ganzen Inhaltskette. Weil es ihn nicht gibt, ist auch alles Nachgelagerte unerreichbar, obwohl es sauber implementiert ist:

```text
tuningCrystal (fehlt)
   └─ Feintuning 102,7 am Wartungsfunk 5610
        └─ hiddenFrequencyFound → antennaWire + wartungsDiktat
             └─ + tuningCrystal → amplifierAntenna
                  └─ Resonanz-Duell im RadioPanel → miraSentAnger
                       └─ miraTerminalUnlocked → Miras Terminal, Manifest,
                          miraAfterAmplifier, miraState "friendly",
                          Hint act1.hiddenFrequency
```

Ein reines „Löschen aller toten Enden" würde diesen kompletten Strang mitreißen — inklusive Miras Terminal-Zugang und ihres freundlichen Endzustands.

Deshalb zwei getrennte Schritte im Plan:

## A. Ersatzlos löschen (unstrittig tot)

- `types.ts`: `exitCode`, `b3sample`, `mikaelLetter` aus `InventoryItemId`; `serverRoom5610OverrideArmed`, `insaSentTo5610`, `duelWon`, `duelLost`, `duelTrainingNextB`, `duelTrainingNextC` aus `StoryFlag`.
- `combine.ts`: alle Kommentar-/Reaktionszeilen zu diesen drei Items, die Paare `mikaelLetter+flyer`, `protocol+exitCode`, `b3sample+tuningCrystal` sowie der `keypadCall`-Sonderfall für `exitCode`.
- `Keypad.tsx`: `exitCode`-Zweig entfernen (das Keypad funktioniert weiterhin über die Code-Eingabe).
- `ItemIcon.tsx`: Icon-Einträge und die zugehörigen, dann ungenutzten SVG-Komponenten.

## B. Gesperrte, aber gute Inhalte entsperren statt löschen

- `kowalkHintedBodoHelka`: Flag in Kowalks Cafeteria-Dialog setzen, wo sie ohnehin auf Bodo und Helka verweist — die beiden vorhandenen Dialogoptionen werden damit erreichbar.
- `heardMikaelTruth`: Flag im Mikael-bezogenen Dialogpunkt setzen, an dem Layard die Wahrheit erfährt — die zwei Worag-Dateien werden lesbar.
- `tuningCrystal`: eine Quelle im Spiel ergänzen (Vorschlag: Bernstein-Resonator im Tech-Knoten 5610 bzw. in Bodos Werkzeugbestand, trust-unabhängig auffindbar). Damit wird der gesamte Radio-/Antennen-/Mira-Strang erstmals spielbar.

Alternative, falls die Kette nicht gewünscht ist: Strang komplett entfernen (`tuningCrystal`, `antennaWire`, `amplifierAntenna`, `wartungsDiktat`, Flags `hiddenFrequencyFound`, `sawWartungsFunk5610`, `miraSentAnger`, das Resonanz-Duell im `RadioPanel`, Hint `act1.hiddenFrequency`) — inklusive Ersatzweg für `miraTerminalUnlocked`, sonst entsteht ein Dead End bei Miras Terminal.

## Technische Punkte

- Keine Persistenz-Migration nötig: entfernte Flags/Items in alten Spielständen werden beim Laden schlicht ignoriert; ich prüfe die Lade-Logik in `GameContext.tsx` darauf, dass unbekannte IDs nicht zum Absturz führen.
- Keine Backend-Änderungen.
- Verifikation: Typecheck (`tsgo`) plus `scripts/quest-check.mjs` und `scripts/hints-check.mjs`, danach ein kurzer Playwright-Durchlauf über Inventar und Keypad.
