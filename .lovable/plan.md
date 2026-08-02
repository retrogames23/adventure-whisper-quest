# Telefon-Rätsel: Leitung stirbt zuverlässig nach dem Stegmann-Anruf

## Was aktuell schief läuft

Das Telefon bricht heute nur "passiv": Der Defekt wird erst gesetzt, **wenn** der Spieler den Telefon-Hotspot in der Wohnung anklickt (`src/game/scenes/apartmentAct1.ts`, `phoneApt.onUse` setzt dann `phoneBroken`). Solange niemand freiwillig zum Apparat greift, existiert der Defekt nicht — und ohne `phoneBroken` ist Miras Tür 4601 im Korridor 46 unsichtbar (`src/game/scenes/corridorsE67.ts`, `door4601Enter.visible`). Es gibt also keinen Weg ins Mira-Rätsel.

Dazu kommt: Beide Terminal-Cheats (`vossbeckweak`, `endeakt1` in `src/game/cheats.ts`) setzen `phoneBroken`, `miraRepairDone` **und** `phoneRepaired` gleich mit. Nach einem Cheat-Start ist das Telefon damit dauerhaft repariert, das Rätsel übersprungen und Miras Tür wieder zu — genau das beobachtete Verhalten.

## Was gebaut wird

1. **Defekt aktiv auslösen, nicht erst beim Anfassen**
   Sobald der Stegmann-Anruf beendet ist (`calledStegmann` im Insa-Dialog) bzw. spätestens bei der Rückkehr in die Wohnung, wird `phoneBroken` gesetzt. Umsetzung an einer zentralen Stelle statt in jedem Hotspot: beim Betreten der Szene `apartment` prüfen, ob `calledStegmann` oder `mikaelRejectedProtocol` gesetzt und `phoneRepaired` nicht gesetzt ist → `phoneBroken` + `reportedPhoneFault` setzen.

2. **Sichtbares Signal beim Betreten**
   Beim ersten Betreten der Wohnung mit totem Apparat kurze Textmeldung: Layard hört das Sirren aus dem Hörer / sieht den Aufkleber der Etagenwartung ("Korridor 46, Schicht A — 4601"). So weiß der Spieler ohne Hotspot-Klick, dass etwas kaputt ist und wohin er muss.

3. **Telefon-Hotspot immer erreichbar, wenn er kaputt ist**
   Der Hotspot verlangt heute `sawEmptyOffice` + `protocolReceived` und verschwindet nach `calledInsaAfterE71`. Bei defektem, unrepariertem Apparat wird er unabhängig davon angezeigt, damit der Spieler das Sirren jederzeit nachhören kann.

4. **Cheats reparieren das Rätsel nicht mehr weg**
   `miraRepairDone` und `phoneRepaired` fliegen aus `VOSSBECK_WEAK_FLAGS`; `phoneBroken`/`reportedPhoneFault` bleiben. `endeakt1` erbt das. Ergebnis: Nach beiden Cheats ist das Telefon tot und das Mira-Rätsel offen — wie im echten Spielverlauf an dieser Stelle.

5. **Hinweissystem gegenprüfen**
   Der bestehende Hint in `src/game/hints.ts` (`phoneBroken`) und die Absage-Dialoge der Nachbarn (Bodo, Philippe, Ennis, Helka → verweisen auf 4601) greifen dann automatisch; wird nach dem Umbau einmal durchgespielt und bei Bedarf in der Reihenfolge angepasst.

## Betroffene Dateien

- `src/game/scenes/apartmentAct1.ts` — Defekt beim Szenenbetritt setzen, Einstiegstext, Hotspot-Sichtbarkeit
- `src/game/cheats.ts` — `phoneRepaired`/`miraRepairDone` aus den Cheat-Flags entfernen
- ggf. `src/game/hints.ts` — Hinweistext auf 4601 schärfen

## Test

Neues Spiel mit `endeakt1`: Wohnung betreten → Sirren-Meldung, Telefon tot, Korridor 46 → Tür 4601 sichtbar → Mira-Fehlermeldung startet → nach Reparatur (`phoneRepaired`) funktioniert der Apparat und der Insa-Rückruf nach E71 läuft normal weiter.
