# Kürzeste Geschichte: Schlusskapitel neu

Die beiden letzten Kapitel des Buches werden ersetzt. Grund: Das Buch ist ein Schulbuch aus dem Mandatsgebiet von 1994. Es kann nicht wissen, dass die Weltgeschichte ab 1920 von unserer abweicht — also darf es weder ein Kapitel "Ab 1920" geben noch Formulierungen, die eine Bruchstelle markieren ("Was danach kommt, kennen Sie aus Band 4", "die Ordnung, in der wir leben" als Sonderfall). Die Erzählung läuft durch, als sei sie selbstverständlich.

## Was ersetzt wird

Bisher:
- Kapitel "Das Jahrhundert" — *1914 bis 1920: Der Bruch*
- Kapitel "Ab 1920" — *Ab 1920: Die Ordnung, in der wir leben*

Neu, in derselben Reihe wie alle vorherigen Kapitel (Epochenname, keine Sonderstellung):

1. **Der Große Krieg** — *1914–1923: Das Ende des langen Jahrhunderts*
   Weltkrieg, Untergang der vier Reiche, russische Revolution und Bürgerkrieg, Influenza-Pandemie, Friedensordnung und Reparationsstreit, Inflation. Endet offen, nicht als "Bruch".

2. **Zwischenkriegszeit** — *Krise und Konsolidierung*
   Weltwirtschaftskrise, autoritäre Bewegungen in Mitteleuropa, die Sowjetunion unter der fortgesetzten Neuen Ökonomischen Politik (Bucharin) als Sonderweg des langsamen Wachstums, Erschöpfung der Nationalstaaten.

3. **Das Mandat** — *1946–1997: Verwaltung als Epoche*
   Einsetzung des Mandatsrats durch die vier Schutzmächte, Aufbau der Quadranten ab 1948, Zuteilungswirtschaft, Normierung, Sektor-Reform 1996 — beschrieben wie jede andere historische Ordnung davor: mit Ursachen, Kosten und Mythenkorrektur, ohne Augenzwinkern.

Der Condorcet-Rückbezug bleibt als Schlusssatz des letzten Kapitels erhalten.

## Ton- und Konsistenzregeln

- Keine Sätze, die auf eine andere, "eigentliche" Geschichte anspielen.
- Keine direkte Leseransprache über die Gegenwart des Spielers ("für Ihren Alltag im Mandatsgebiet").
- Mythenkorrekturen (`**Mythos:**`-Zeilen) auch in den neuen Kapiteln, wie in den früheren.
- Terminologie nach `LORE.md`: Sektor = Großeinheit, Quadrant = Gebäudegruppe.
- Band-5-Fußnote bleibt als trockener Verwaltungswitz möglich, aber ohne Meta-Bezug auf einen Bruch.

## Technisch

- Nur `src/game/kuerzesteGeschichte.ts` wird geändert: die letzten beiden Einträge in `HISTORY_CHAPTERS` werden durch drei neue ersetzt.
- Bilder: `imgJahrhundert` (Westfront 1916) bleibt bei Kapitel 1, `imgModerne` (Aufbau der Quadranten) wandert zu Kapitel 3. Für das neue Zwischenkriegs-Kapitel wird eine zusätzliche Tafel im gleichen Sepia-Lithografie-Stil erzeugt (`src/assets/history/zwischenkrieg.jpg`) und importiert.
- Bildunterschriften-Nummerierung (Tafel X, XI, XII) wird angepasst.
