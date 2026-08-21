# Helka: Heidegger-Gespräche als neuer Dialogzweig

Helka Vint bekommt einen deutlich ausgebauten Gesprächsteil. Alle bestehenden Dialoge (`helkaAtDoor`, `helkaSmalltalk`, `helkaSmalltalk2`, `helkaFlyer`, `helkaPhoneRefusal`, `helkaPhoneRefusalShort`) bleiben unverändert erhalten — das Neue wird angehängt, nichts ersetzt.

## Neu: Helka als Heidegger-Kennerin

Als ehemalige Bibliothekarin hat sie „Sein und Zeit" aufbewahrt, statt es auszusortieren. Sie nennt Heidegger beim Namen, aber nur im Türspalt und mit gesenkter Stimme — in einer Welt, in der Wörter wie „Sehnsucht" aus Mitteilungen verschwinden, ist ein Buch über Eigentlichkeit ein privater Besitz, kein Gesprächsthema.

Der Zweig ist ein Gesprächs-Hub, der nach dem dritten Gespräch (`talkedHelka3`) dauerhaft anwählbar bleibt. Vier Themen, jedes mehrstufig, mit Rückkehr in den Hub:

1. **„Dasein"** — der Mensch ist kein Stein und kein Stuhl. Er muss sich zu seiner Existenz verhalten, während er sie lebt. Helka überträgt das auf den Korridor: eine Wohnungsnummer ist vorhanden, ein Mensch ist es nicht.
2. **„Geworfenheit"** — niemand sucht sich Zeitpunkt, Ort und Familie aus. Die Welt ist fertig, bevor man gefragt wird: Sprache, Sektor, Zuständigkeit. Helka verbindet das mit ihrer eigenen Biografie (Alter Stadtkern, Verwaltungslehre mit 16).
3. **Das „Man"** — die bequeme Fluchtbewegung: man tut, was man tut; man fragt nicht, was man nicht fragt. Heideggers „uneigentliches" Leben. Hier liegt die schärfste Pointe: das Mandatsdeutsch der Verwaltung ist grammatisch das „Man" — Passiv ohne Subjekt, „es wird veranlasst", „ist nicht vorgesehen". Layard kann widersprechen oder zustimmen.
4. **„Sein zum Tode"** — der einzige Termin, den man nicht delegieren kann. Was das anonyme „Man" nicht abnehmen kann, weckt. Helka spricht hier zum ersten Mal offen über Karsten (2014) — leise, ohne Pathos. Diese Stufe wird erst freigeschaltet, wenn die anderen drei gelaufen sind.

Zusätzlich zwei kleine Verzweigungen:
- Layard darf skeptisch bleiben („Das ist Gerede über Gerede") — Helka pariert trocken, statt zu belehren.
- Nach allen vier Themen ein kurzer Abschluss-Austausch, danach eine wiederholbare Kurzfassung („Wir haben das besprochen, Herr Worag."), damit Wiederholungen nicht nerven.

Sprache: Präsens, förmliches Sie, kurze Sätze, keine Vorlesung — sie erklärt in Beispielen aus dem Haus, nicht in Zitaten.

## Technische Umsetzung

- Neue Dialogbäume in `src/game/dialogs/helka.ts`: `helkaHeidegger` (Hub mit Choices je Thema), `helkaHeideggerDasein`, `helkaHeideggerGeworfenheit`, `helkaHeideggerMan`, `helkaHeideggerTod`, `helkaHeideggerAbschluss`, `helkaHeideggerShort`.
- Neue Flags in `src/game/types.ts`: `helkaHeideggerStarted`, `helkaToldDasein`, `helkaToldGeworfenheit`, `helkaToldMan`, `helkaToldTod`, `helkaHeideggerDone`.
- Einstieg in `src/game/scenes/apartmentAct1.ts`, Hotspot `door2610Helka`: der bestehende Else-Zweig („kein Geräusch") wird ersetzt durch den Heidegger-Hub bzw. nach Abschluss durch die Kurzfassung. Reihenfolge davor (Telefon-Bitte, Erstkontakt, Flyer, Smalltalk 1/2) bleibt unangetastet.
- `src/game/npcPersonas.ts`: Helkas Persona bekommt Heidegger-Wissen (`biography`/`secrets` plus `storyAwareness`-Einträge für die neuen Flags), damit der Frei-Reden-Modus konsistent bleibt.
- Kleine Konsistenzkorrektur: die Persona nennt Helka „ehemalige Verwaltungsangestellte", die Dialoge „Bibliothekarin". Wird zu „41 Jahre Verwaltung, zuletzt Bibliothek/Archiv der Sektorverwaltung" harmonisiert, damit beides stimmt.
- Keine Änderungen an Rätsellogik, Hinweisketten, Speicherstruktur oder Backend.
