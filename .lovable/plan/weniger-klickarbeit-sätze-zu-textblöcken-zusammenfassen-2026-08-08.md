# Weniger Klickarbeit: Sätze zu Textblöcken zusammenfassen

## Ausgangslage (geprüft)

- `showText([...])` zeigt pro Array-Eintrag **eine** Box; weiterklicken erhöht den Index (`src/components/game/TextOverlay.tsx`).
- Im Code: **117 showText-Blöcke mit zusammen 357 Zeilen** — im Schnitt 3 Klicks pro Beobachtung, oft für einen einzigen zusammenhängenden Absatz (z.B. Aushang „Resonanz-Hygiene“ im Gemeinschaftsraum: 6 Boxen).
- Dialogbäume (`DialogLine`) zeigen ebenfalls je eine Zeile pro Klick, inklusive Sprecher und Sprachausgabe.

## Was gebaut wird

### 1. Absatz-Gruppierung im TextOverlay (Hauptgewinn, kein Textverlust)

`showText` rendert künftig **alle Zeilen eines Blocks zusammen als Absatz** in einer Box statt Zeile für Zeile. Zeilenumbrüche bleiben als visuelle Umbrüche erhalten, es gibt aber nur noch einen Klick.

Für die wenigen dramaturgisch wichtigen Fälle gibt es einen expliziten Trenner: eine leere Zeile `""` im Array erzeugt weiterhin einen Seitenwechsel. So bleibt z.B. ein isoliertes „Tilla.“ als eigener Beat möglich.

Zusätzlich eine Obergrenze: sehr lange Blöcke (mehr als ~6 Zeilen bzw. ~450 Zeichen) werden automatisch auf mehrere Seiten verteilt, damit nichts aus der Box läuft — auf Mobile mit engerem Budget.

### 2. Bewusst gesetzte Beats

Durchgang durch alle 117 Blöcke; dort, wo eine Pointe wirklich wirkt (Fund von Tillas Transferbogen, Cutscene-nahe Momente, Item-Fund-Bestätigungen `[ ... eingesteckt. ]`), wird eine leere Trennzeile gesetzt. Alles andere bleibt ein Block.

### 3. Dialogbäume: aufeinanderfolgende Ein-Satz-Zeilen zusammenfassen

Zeilen desselben Sprechers, die ohne Auswahl, Aktion oder Bedingung direkt aufeinander folgen, werden in der Quelle zu einer Zeile mit Umbruch zusammengezogen. Nur solche Ketten, die eindeutig sicher sind (kein `onEnd`, keine `choices`, kein `requires`/`hiddenWhen` dazwischen, kein Sprecherwechsel) — der Rest bleibt unverändert. Ausgeführt Baum für Baum mit anschließender Prüfung von `scripts/quest-check.mjs` und Typecheck.

## Technische Details

- `src/components/game/TextOverlay.tsx`: Seiten-Berechnung aus dem Zeilen-Array (Split an leeren Strings + Längenbudget), Rendering als mehrzeiliger Absatz; Dev-Edit-Modus, Auto-Advance-Timer, Pause/Step und die Merge/Split-Werkzeuge werden auf Seiten statt Einzelzeilen umgestellt.
- Sprachausgabe im Dialog: bei zusammengeführten Zeilen wird der volle Text an `speak()` übergeben (eine Äußerung statt mehrerer).
- Keine Änderung an Spiellogik, Flags oder Items.
