## Ziel

Zwei Erzähl-Inkonsistenzen im Übergang Akt I → Akt II beheben:

1. **Ein Objekt, ein Wort:** „Datenkapsel/Kapsel" komplett streichen, überall nur noch „Protokoll" (bzw. „versiegeltes Protokoll", wo Siegel/Physis wichtig sind). Icon bleibt visuell unverändert.
2. **Empfänger korrigieren:** Insa nimmt das Protokoll persönlich entgegen (nicht Okwu). Okwu tritt im Ending gar nicht mehr in Person auf — die Resonanz-Pause wird schriftlich verhängt (Vermerk/Aushang), unabhängig davon, ob Layard ihre Praxis besucht hat oder nicht.

## A. Begriffsvereinheitlichung „Kapsel" → „Protokoll"

Reine Text-/Kommentar-Änderungen an folgenden Stellen:

- `src/game/cutscenes.ts` — Item-Beschreibung (Z. 105), Ending-Frames (Z. 141, 157, 162), Flyer-Frames (Z. 180, 186)
- `src/game/combine.ts` — Z. 24, 144, 319, 337
- `src/game/dialogs/insa.ts` — Z. 500, 520
- `src/game/dialogs/mikael.ts` — Z. 56, 81, 107, 127
- `src/game/scenes/leitstelleE67.ts` — Kommentar Z. 6
- `src/components/game/ItemIcon.tsx` — Code-Kommentare Z. 55, 59 (SVG bleibt unverändert)

Keine Änderungen an Item-IDs, Flags oder Persistenz. `PARAMEDICS_PROTOCOL_ITEM.name` bleibt „Einsatzprotokoll (verschlüsselt)".

## B. Ending-Cutscene: Übergabe an Insa

Aktueller Bruch: Insa sagt am Telefon „Bringen Sie es mir vorbei. Persönlich. Leitstelle E67, Tür 4602." — die Ending-Cutscene springt aber stattdessen in Okwus Praxis. Empfängerin muss Insa sein.

Umbau in `buildEndingBaseFrames` (`src/game/cutscenes.ts`, Frames ab Z. 138):

1. **Bleibt** (Z. 138–159): Hörer / Protokoll auf dem Tisch / Insas Satz im Kopf / Blick aus dem Fenster / Radio still / „Layard nimmt das Protokoll in die Hand."
2. **Neu ersetzt Z. 160–173** (bisher Okwu-Praxis):
   - Frame: *„Später. Sektor-Leitstelle E67, Korridor 46, Tür 4602."* Insa nimmt das Protokoll persönlich entgegen, dreht es einmal in der Hand, legt es auf ihren Stapel — nicht darunter, darauf.
   - Kurzer Beat: Insa bestätigt, dass sie es „richtig zuweisen" wird. Sie sieht Layard an: er habe heute zu viel auf einer Frequenz gehört, die niemand offiziell hört. Sie werde einen Vermerk an die Sanitätsstation schicken.

Insa tritt hier als Sprecherin auf, aber ohne dass sie selbst die medizinische Anordnung ausspricht — sie leitet nur weiter.

## C. Resonanz-Pause: Okwu per Vermerk, ohne Begegnung

Kein persönlicher Auftritt von Okwu im Ending. Stattdessen ein knapper Schluss-Frame, der unabhängig von `metOkwu` funktioniert:

- Frame: *„Am nächsten Morgen. Layards Apartment."* Auf seinem Tisch liegt ein Vermerk der Sanitätsstation E71 — Kopfzeile mit Okwus Namen und Praxisnummer 1532.
- Text auf dem Vermerk (im Frame in Auszügen zitiert):
  - „Auf Vermerk der Leitstelle E67 (Bauerfeind, I.): sieben Tage Resonanz-Pause. Kein 104,6. Kein Mithören. Keine Notizen ans Radio."
  - „Ärztliche Anordnung — vermerkt in Ihrer Akte. — Dr. A. Okwu, Sanitätsstation E71."
- Abschluss-Beat: Layard faltet den Vermerk einmal. Er weiß nicht, ob er sich daran halten wird.

Dadurch:
- Erzählerisch motiviert für alle Spieler — auch die, die Okwu nie in Person begegnet sind.
- Wer sie kannte, erkennt Namen und Praxis wieder; wer nicht, liest schlicht eine dienstliche Kopfzeile.
- Die Resonanz-Pause bleibt eine **ärztliche Anordnung** — konsistent mit dem, was Insa in Akt II wieder aufgreift, und mit dem `RadioPauseGate`.

## D. Flyer-Frames

`ENDING_FLYER_FRAMES` (Z. 178–188) verortet sich weiterhin am Tisch vor dem Aufbruch. Nur Wortwahl „Kapsel" → „Protokoll" anpassen; Reihenfolge unverändert.

## E. Nicht betroffen

- Sanitäter-Cutscene (Beat 5), Okwus interaktive Dialoge (`okwu1`…) und die Praxis-Szene in `sectorAct1.ts` bleiben unverändert.
- Keine neuen Flags, keine Migrations, keine API-Änderungen. Build-Check nach den Edits reicht als Verifikation.