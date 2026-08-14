# Bus-Szene: Fahrt durch Sektor 28

Sobald Layard eine lange Strecke auf der Karte zurücklegt (E67/E71 <-> weit entferntes Ziel wie die Zentralverwaltungsstelle), schiebt sich eine Busfahrt dazwischen: 80er-Jahre-Linienbus, leicht heruntergekommen, vorbeiziehende Sektor-Landschaft, Fahrgeräusche statt Musik.

## Ablauf

1. Spieler wählt auf der Karte ein weit entferntes Ziel und bestätigt "Dorthin gehen".
2. Kurze Einblendung: "Linie 28 · Fahrtzeit 8 Minuten".
3. Bus-Szene: Innenraum, Fenster mit Fahr-Animation, Fahrgäste auf zufälligen Sitzen.
4. Der Spieler kann jederzeit "Fahrt überspringen" wählen; sonst endet die Fahrt nach 8 echten Minuten automatisch.
5. Danach landet Layard in der Zielszene.

## Optik und Ton

- Hintergrundbild eines Bus-Innenraums im Stil der übrigen Szenen (Unavowed-Look, gemalte Öloptik): Riffelboden, abgewetzte Stoffsitze in Braun/Orange, Haltestangen, Kunststoffverkleidung, Aushang mit Beförderungsbedingungen, Fahrtzielanzeige.
- Fenster: durchziehende Landschaft in Schleifen-Animation (langsam scrollende Bildebene mit Wohnblöcken, Masten, Grünbrache) plus leichtes Rütteln des ganzen Bildes.
- Ton: gleichmäßiges Motorbrummen mit Reifenrollen, gelegentlich Bremszischen und Blinkerticken; erzeugt aus einer kurzen Loop-Datei mit eigener Lautstärke, gekoppelt an die bestehende Ton-Einstellung.
- Der Musik-Player in der Kopfleiste wird für die Dauer der Fahrt ausgeblendet, laufende Musik pausiert und danach wieder aufgenommen.
- Timer-Anzeige im Bild ("Ankunft in 7:12") plus Schaltfläche "Fahrt überspringen".

## Fahrgäste

- Pool von 20 Personen mit Name, Kurzbeschreibung, Sitzplatz-Typ und Gesprächsthemen.
- Pro Fahrt werden zufällig 1 bis 5 gezogen und zufällig auf die verfügbaren Sitzplätze verteilt.
- Jede Person hat 2 bis 3 Themen zur Auswahl (Smalltalk, Gerücht, Sektor 28 / Mandatsgebiet). Kein Free-Chat, alles fest geschriebene Dialoge im bestehenden Dialogsystem.
- Themen verschwinden nach dem Abfragen; ist alles gesagt, gibt es eine knappe Abschlusszeile.
- Inhalte bleiben lore-konform: Sektor 28, Quadranten, Mandatsdeutsch, Resonanz-Hygiene, keine Schmerz-Radio-Bezüge.

## Technische Umsetzung

- Neue Szene `src/game/scenes/busSector28.ts` mit Sitzplatz-Hotspots (feste Positionen) und Ausstiegs-Hotspot.
- Neue Komponente `src/components/game/BusRide.tsx` (Fahr-Animation, Timer, Skip-Button, Fahrgeräusch), eingebunden in `GameShell.tsx`.
- Neue Datei `src/game/busPassengers.ts` mit den 20 Personen und ihren Themen; Dialoge über den bestehenden Dialog-Mechanismus (`src/game/dialogs/`), dynamisch aus den Themen aufgebaut.
- `MapOverlay.tsx` / `mapSector28.ts`: pro Ort eine Kennzeichnung "weit entfernt". Reisen zu solchen Zielen laufen künftig über die Bus-Szene; nahe Ziele (E67 <-> E71) bleiben direkt.
- Fahrt-Zustand (Ziel, Startzeit, gezogene Fahrgäste) im `GameContext`, damit ein Neuladen die Fahrt nicht verdoppelt.
- `TopBar.tsx`: Musik-Umschalter während der Fahrt ausblenden (gleiche Logik wie bei Aufzug/Cutscenes).
- Assets: ein Bus-Innenraum-Bild, ein nahtloses Landschaftsband für die Fensteranimation, eine Loop-Audiodatei Fahrgeräusch.

## Hinweis

Die Zentralverwaltungsstelle bleibt vorerst nicht begehbar. Die Bus-Szene wird so gebaut, dass sie automatisch greift, sobald ein weit entferntes Ziel als begehbar freigeschaltet wird; zum Testen wird ein Entwickler-Einstieg ergänzt.
