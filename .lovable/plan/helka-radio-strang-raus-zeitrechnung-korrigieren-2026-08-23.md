# Helka: Radio-Strang raus, Zeitrechnung korrigieren

Zwei Korrekturen an Helka Vint — sonst bleibt alles (Heidegger-Hub, Flyer, Smalltalk, Phrasen-Duell-Zweig) unverändert.

## 1. Kein Frequenz-Wissen bei Helka

Helka kennt weder das Schmerz-Radio noch Bänder wie „Trauer-Band" oder 104,6. Der Smalltalk-2-Strang wird entschärft:

- `hs22` („Er hat die Frequenz manipuliert…") wird umgeschrieben: Sie hat 1989 einen Bewohner gemeldet — wegen **eines selbstgebauten Geräts in der Wohnung, Kabel durchs Fenster**, ohne dass sie je verstanden hat, wozu. Pointe bleibt exakt dieselbe: es ist nichts passiert, weder ihm noch ihr, und genau das gibt ihr zu denken.
- Die Spielerfrage „Welche Frequenz hat er manipuliert? Nicht 104,6 — eine andere?" entfällt ersatzlos.
- Die Zeilen `helkaHiddenFreq1` / `helkaHiddenFreq2` (Trauer-Band 103,4, sieben Zehntel nach unten) werden gelöscht, ebenso das Flag `helkaHintHiddenFreqStep`.
- `hs24` („Er wohnt noch hier. Drei Türen weiter.") bleibt und behält den Phrasen-Duell-Zweig sowie „[ Beenden ]".

**Folge für die Hinweiskette zu 102,7:** Bisher war Helka Hinweis 2/3. Künftig läuft die Kette über Bodo (Wartungskanal „zwischen den Bändern", Flag `bodoHintHiddenFreqBand`) und Mikael als Bestätigung. Mikaels Trigger in der Sektor-Szene prüft dann nur noch Bodos Flag; der Hinweistext in `hints.ts` wird entsprechend gekürzt (Helka wird nicht mehr genannt). Damit bleibt das Rätsel lösbar, ohne dass Helka je vom Radio spricht.

## 2. Jahreszahlen ins Jahr 1997 zurückholen

Im Dialog `td4` stirbt Karsten „2014" — unmöglich. Neu:

- **Karsten stirbt 1991** an einer Lungensache, die in keiner Akte steht. Passt zu „dreißig Jahre verlobt" (ab Anfang der 60er) und dazu, dass sie seither ihre Tür nicht mehr öffnet — sechs Jahre Rückzug.
- Gleiche Korrektur in Helkas Persona-Biografie.
- Ebenfalls in der Persona: **Mutter Edda stirbt 1994** statt 2002 (bisher ebenfalls in der Zukunft). Vater Ottmar 1989 bleibt.

## Technische Umsetzung

- `src/game/dialogs/helka.ts`: `hs22` neu getextet, Choice entfernt, Zeilen `helkaHiddenFreq1`/`helkaHiddenFreq2` gelöscht, `td4` auf 1991.
- `src/game/types.ts`: Flag `helkaHintHiddenFreqStep` entfernen.
- `src/game/scenes/sectorAct1.ts`: Mikael-Trigger nur noch über `bodoHintHiddenFreqBand`.
- `src/game/hints.ts`: Hinweistext zu 102,7 ohne Helka.
- `src/game/npcPersonas.ts`: Karsten 1991, Edda 1994.
- Keine Änderungen an Radio-Logik, Rätselmechanik oder Backend; anschließend `lore-check` laufen lassen.
