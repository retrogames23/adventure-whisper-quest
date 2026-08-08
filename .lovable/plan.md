# Mira-Hub: Dialog wieder sinnvoll machen

## Problem
Im Hub in Miras Wohnung ("Du bist es. — Also, was ist?") stehen Antworten als Auswahl, obwohl Mira die zugehörige Frage nie gestellt hat. Beispiel: "Verstanden — ich schau mir die drei an." und "Klingt nach mehr Ärger, als ich heute brauche." sind Reaktionen auf Miras Beleg-Bitte aus `miraEvidenceAsk` — die im Hub übersprungen wird. Ergebnis: Layard antwortet ins Leere.

## Lösung
Der Hub zeigt nur **Gesprächseröffnungen von Layard**. Die eigentliche Szene (inkl. Miras Frage und der passenden Antwortoptionen) läuft danach im jeweiligen Normaldialog ab.

Konkret in `src/game/dialogs/mira.ts` im Hub `miraAtHomeHub`:

- Störungsmeldung bleibt wie sie ist (nur wenn `phoneBroken` und nicht `miraRepairDone`).
- Statt inline-Antworten pro Zustand je eine kurze Layard-Eröffnung, die per `nextDialog` in den Normaldialog führt:
  - `miraAtHomeIntro` → "Ich bleibe kurz." (setzt `miraAtHomeMet`)
  - `miraEvidenceAsk` → "Woran arbeitest du gerade?"
  - `miraEvidenceWait*` → "Wegen der Aushänge …"
  - `miraEvidenceDeliver` → "Ich habe die Aushänge."
  - `miraAfterEvidence` → "Alles ruhig?"
- Kein generisches "[ Weiter ]" mehr; Fallback bleibt eine neutrale Eröffnung.
- "[ Später ]" bleibt als Abbruch.

Die Flags (`miraAskedEvidence`, `miraEvidenceDelivered`, `miraTerminalUnlocked`) werden wieder dort gesetzt, wo sie inhaltlich hingehören — am Ende des jeweiligen Normaldialogs, nicht im Hub.

## Technisch
- Datei: `src/game/dialogs/mira.ts` (`miraAtHomeHub.choicesFn`, ggf. Abschlusszeilen von `miraEvidenceAsk` / `miraEvidenceDeliver`).
- Prüfen, dass `miraEvidenceAsk` und `miraEvidenceDeliver` ihre Flags selbst setzen; falls nicht, dort ergänzen.
- Kein Datenbank- oder UI-Umbau nötig; danach Typecheck.
