# Setsuko und Osho — „Gefährlich leben, aber nicht rücksichtslos“

Setsuko bekommt einen zweiten großen Gesprächszweig, analog zum Heidegger-Zweig bei Helka: sie ist Osho-Anhängerin und erklärt seine Unterscheidung zwischen *rücksichtslos* und *gefährlich leben* ausführlich. Alle bestehenden Dialoge (Kunst, Körper, Zero is Infinity) bleiben unverändert.

## Erzählerische Einbettung

- Setsuko hat ein abgegriffenes, mehrfach kopiertes Vortragsheft (Übersetzung, ohne Impressum) — im Mandatsgebiet nicht vorgesehen, aber auch nicht verboten genug, um jemanden zu interessieren. Es steht neben ihren Farbgläsern.
- Für sie ist Osho kein Guru-Kult, sondern die Begründung ihrer Arbeit: Punkte malen, bis das Ich verschwindet, ist ihre Form von „gefährlich leben“.
- Der Zweig hängt thematisch an ihrem „Nackt machen“-Gedanken: Osho liefert ihr die Unterscheidung, die ihre Nachbarn ihr nicht abnehmen.

## Neuer Dialog-Hub: „Wovon Sie das haben“

Erreichbar aus `sHub` (Erstgespräch) und aus `setsukoHub` (Wiederansprache), freigeschaltet nachdem sie einmal über Kunst *oder* Körper gesprochen hat.

Themen (einzeln anwählbar, in beliebiger Reihenfolge, je 2–4 Zeilen, dann zurück in den Hub):

1. **Die Unterscheidung** — Rücksichtslosigkeit gehört dem Körper und dem Unbewussten: 200 fahren aus Taubheit, handeln ohne Kontakt zu den Folgen. Gefährlich leben gehört der Seele: das eigene Ego bewusst herausfordern. Setsuko-Beispiel: der Nachbar, der betrunken das Treppengeländer runterrutscht, ist nicht mutig, sondern abwesend.
2. **Erste Gefahr: die Rüstung ablegen** — tief Empfundenes tatsächlich sagen, mit dem realen Risiko der Zurückweisung. Emotionale Offenheit als bewusstes Risiko. Verbindung zu ihrem „nackt machen“.
3. **Zweite Gefahr: die Komfortzone verlassen** — Routine ist bequem und schläfert den Geist ein; wer sich dem Unbekannten aussetzt, bleibt wach. Setsuko-Beispiel: der Sektor ist eine einzige Komfortzone mit Formblatt.
4. **Dritte Gefahr: authentisch bleiben** — die sozialen Rollenspiele beenden, auch wenn Ablehnung oder Isolation folgt; nicht anpassen, was man denkt und fühlt. Für sie die schwerste — und der Grund, warum sie allein wohnt.
5. **Zusammenfassung / Widerspruch** — Layard-Optionen: skeptisch („Klingt nach einer Ausrede für Rücksichtslosigkeit“) und zustimmend. Sie besteht darauf: das ist fast das Gegenteil von Draufgängertum, es verlangt mehr Mut als jede Raserei.

Layard-Optionen sind in seiner Rolle als Verwaltungsangestellter formuliert (höflich, leicht abwehrend, gelegentlich unfreiwillig ehrlich). Wenn alle vier Themen durch sind, gibt es eine kurze Schlusszeile, in der sie den Satz noch einmal ganz sagt — und danach im Wiederansprech-Hub nur noch eine Kurzfassung.

## Verbindung zu bestehenden Inhalten

- Wer den Osho-Zweig vollständig gehört hat, bekommt bei der „andere“-Frage (Weg zu *Zero is Infinity*) eine zusätzliche, wärmere Einstiegsoption — der bestehende Weg bleibt unverändert bestehen.
- Kein neuer Ort, kein neuer Gegenstand, kein Rätsel; reiner Gesprächsinhalt.

## Technische Umsetzung

- `src/game/dialogs/setsuko.ts`: neue Zweige in `setsukoIntro` (Hub `sOsho…`) sowie Kurzfassung in `setsukoHub`; bestehende Zeilen unangetastet.
- `src/game/types.ts`: neue StoryFlags `setsukoOshoStarted`, `setsukoToldGefahrUnterschied`, `setsukoToldRuestung`, `setsukoToldKomfort`, `setsukoToldAuthentisch`, `setsukoOshoDone`.
- `src/game/npcPersonas.ts`: Setsukos `hardFacts`, `biography` und `layardKnowledge` um Osho ergänzen (Vortragsheft, die Unterscheidung), damit Free-Talk konsistent bleibt.
- Sprache: Präsens, kein Verwaltungsdeutsch bei Setsuko; „So befreiend!“ sparsam weiterverwenden.
- Danach `lore:check` / Typecheck laufen lassen.
