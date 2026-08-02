# Nachbarn: „Darf ich mal Ihr Telefon benutzen?"

Sobald Layards Apparat tot ist (`phoneBroken` gesetzt, `phoneRepaired` noch nicht), bekommt jeder erreichbare Nachbar eine zusätzliche Gesprächsoption: Layard fragt nach dem Telefon. Alle lehnen ab — jeder mit einer Ausrede, die zu seiner Figur passt. Mehrere schicken ihn am Ende zu Mira (4601, Sektor-Wartung, Korridor 46), sodass das Pflichträtsel nicht umgangen, sondern verstärkt wird.

## Wer wird angesprochen

| Nachbar | Ort | Haltung / Ausrede |
| --- | --- | --- |
| Bodo Marschke | Wohnung 2612 | Sein Telefonat wäre Teil eines Verwaltungsakts. „Tut mir leid, ich habe einfach keine Lust auf den Papierkram." Als Ex-Fernmeldetechniker weiß er, dass nur die Korridor-Wartung ran darf → Verweis auf Mira. |
| Philippe | Wohnung 2613 | Höflich, ausweichend: sein Apparat ist ein Wandapparat mit „Zweckbindung", er hat schon einmal Ärger bekommt. Verweist ebenfalls auf die Wartung. |
| Ennis Kalb | Tür 2614 (Türgespräch) | Misstrauisch-dienstbeflissen: fremde Gespräche über seinen Anschluss sind ein Verstoß, außerdem Schichtruhe. Kein Mira-Verweis, dafür ein Spruch über Zuständigkeiten. |
| Helka Vint | Tür 2610 (Türgespräch) | Trocken-abweisend: sie hat seit Jahren kein Freizeichen und will es auch nicht. „Wenn Sie reden wollen, reden Sie hier." |
| Mira | Tür 4601 | Kein neuer Ablehnungsdialog — hier greift der bestehende Reparaturpfad. Falls Layard vorher nach ihrem Telefon fragt, verweist sie auf den Dienstweg (die Reparatur). |

Nicht-Bewohner (Dr. Okwu in der Praxis 1532, Mikael im Sektor) bekommen keine Wohnungs-Variante — sie wohnen nicht in E67. Sag Bescheid, falls du auch dort eine Absage möchtest.

## Verhalten im Spiel

- Die Option erscheint nur zwischen kaputtem und repariertem Telefon.
- Jede Absage kann einmal ausführlich und danach kurz laufen (ein „schon gefragt"-Kurztext), damit Wiederholungen nicht nerven.
- Nach der ersten Absage mit Mira-Verweis wird die bestehende Hinweiskette (`act1.phoneRepair`) inhaltlich gestützt; der Hinweistext bleibt unverändert.
- Kein Nachbar gibt jemals Zugang — es entsteht kein Bypass des Pflichträtsels und kein Dead End.

## Technische Umsetzung

- Neue Dialogbäume in `src/game/dialogs/bodo.ts`, `philippe.ts`, `ennis.ts`, `helka.ts` (je ein `…PhoneRefusal`-Baum, Rückkehr in den jeweiligen Smalltalk-Hub bzw. Ende).
- Einstiegspunkte: die vorhandenen `onUse`-Verzweigungen in `src/game/scenes/apartmentAct1.ts` (2612, 2613, Tür 2614, Tür 2610) erhalten eine vorgelagerte Bedingung `api.hasFlag("phoneBroken") && !api.hasFlag("phoneRepaired")`; wo ein Choice-Hub existiert, wird die Frage stattdessen als zusätzliche Auswahl im Hub eingehängt.
- Neue Flags in `src/game/types.ts`: `askedBodoPhone`, `askedPhilippePhone`, `askedEnnisPhone`, `askedHelkaPhone` (nur für „schon gefragt"-Kurzfassung).
- Keine Änderungen an Speicherstruktur, Backend oder Hinweislogik nötig.
