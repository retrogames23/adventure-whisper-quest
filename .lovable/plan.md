# Mira-Reparaturübergang in 4601 zuverlässig auslösen

## Bestätigte Ursache

Die Tür 4601 startet bei `phoneBroken` korrekt `miraFaultReport`. Die Auswahl „Mira mitnehmen“ ruft derzeit in ihrer `action` erst `goTo("apartment")` und `startDialog("miraRepairScene")` auf. Danach führt der allgemeine Choice-Handler mangels `next`/`nextDialog` zusätzlich `advanceDialog()` für den alten Dialog aus und schließt ihn. Dadurch wird der gerade gestartete Reparaturdialog im selben Klick wieder überschrieben.

## Umsetzung

1. In beiden Varianten von „Mira mitnehmen“ den Szenenwechsel in der Action belassen, den Dialogwechsel aber über das bereits unterstützte Feld `nextDialog: "miraRepairScene"` ausführen.
2. Den doppelten imperativen `startDialog`-Aufruf entfernen, damit der Choice-Handler den alten Baum nicht mehr anschließend beendet.
3. Den vollständigen Pfad im laufenden Spiel prüfen:
   - `phoneBroken` in Layards Wohnung auslösen,
   - Tür 4601 betreten,
   - „Mira mitnehmen“ wählen,
   - Szenenwechsel nach Wohnung 2611 und sichtbaren Reparaturdialog bestätigen,
   - Dialog abschließen und `phoneRepaired`, `miraRepairDone` sowie `port2611Locked` anhand des anschließenden Telefon-/Terminalverhaltens verifizieren.
4. Abschließend Typecheck sowie Quest- und Hint-Prüfung ausführen.

## Betroffene Datei

- `src/game/dialogs/mira.ts`