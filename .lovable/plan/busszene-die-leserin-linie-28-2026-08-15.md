# Busszene: Die Leserin (Linie 28)

Eine neue, achte Buskomposition: Layard steigt ein und der Bus ist bis auf eine einzige Fahrgästin leer — eine Frau Ende 20, die „Nicht vorgesehen" von Christa Wolf liest. Das gesamte Gespräch dreht sich um diesen Roman.

## Die Figur

Ilka Verhoeven, 28, aufgewachsen in Sektor 28, arbeitet in einer Zuteilungsstelle. Sie kennt die Welt der Hefte, Formblätter und Bescheide nur als Normalzustand — deshalb liest sie den Roman nicht als Anklage, sondern zunächst als etwas seltsam Vertrautes. Ihr Blick, in dieser Reihenfolge über die Gesprächsäste hinweg:

- Ruths Alltag liest sich für sie wie eine Dienstanweisung, nicht wie Literatur — sie erkennt jedes Formblatt wieder.
- Was sie irritiert, ist nicht die Verwaltung, sondern dass Weyer vierzig Jahre lang „Ich" geschrieben hat. Das kommt ihr fremder vor als jede Behörde.
- Sie hat selbst nie ein Heft geführt und weiß nicht, ob ihr etwas fehlt oder ob das eine altmodische Angewohnheit ist.
- Sie ist unsicher, ob das Buch überhaupt Kritik sein soll — „es steht ja nichts Verbotenes drin, es steht nur alles da" — und genau diese Unsicherheit macht ihr das Buch wichtig.
- Sie hat es aus der Bibliothek in E71, mit dem üblichen Umweg über Herbert, und liest es zum zweiten Mal.

Ton: nüchtern, freundlich, mit vorsichtigem Mandatsdeutsch („in Regel", „nicht vorgesehen", „es ergeht"), aber ohne Zynismus. Kein Bezug auf das Schmerz-Radio.

## Die drei Antwort-States von Layard

Gemessen wird, wie lange der Roman im Spiel tatsächlich offen war (kumuliert über alle Öffnungen):

1. **Nie geöffnet** — Layard kann nur nachfragen: worum es geht, wer Ruth ist, ob es sich lohnt. Ilka erzählt, ohne das Ende zu verraten; am Ende der Hinweis, dass der Titel in E71 ausleihbar ist.
2. **Unter 20 Sekunden offen** — „Ich habe mal kurz reingelesen, aber es hat mich nicht so gepackt." Ilka reagiert leicht gekränkt-höflich und verteidigt das Buch; danach öffnen sich Zwischenfragen, die im State 1 nicht vorkommen.
3. **20 Sekunden oder mehr** — „Ja, ich kenne den Roman. Es geht um Ruth …" Das eigentliche Gespräch: Kiste 14/2204, das vierte Feld, das fehlende Formblatt, Weyers „Ich", Ruths eigenes verlorenes Heft. Hier gibt es die tiefsten Verschachtelungen und Ilkas persönliche Antwort auf die Frage, warum sie es zweimal liest.

Der State wird beim Betreten der Busszene einmal ausgewertet, damit er sich während des Gesprächs nicht ändert.

## Umsetzung (technisch)

- **Lesezeit erfassen**: In `src/game/GameContext.tsx` wird beim Öffnen eines Buches die Startzeit gemerkt und beim Schließen die Dauer je Buch-ID aufaddiert (persistiert im Spielstand wie andere Fortschrittsdaten). Nur die Anzeigedauer zählt, nicht die Zeit im Inventar.
- **Neues Bild**: `src/assets/bus/bus-passengers-h.jpg` (leerer Bus, eine junge Frau mit Buch am Fenster), dazu passender Vordergrund-Freisteller `bus-front-h.png` nach dem bestehenden Verfahren, damit die Fensteranimation hinter Kopf und Rahmen bleibt.
- **Komposition „h"**: Eintrag in `COMPOSITION_WINDOWS` und `COMPOSITION_SLOTS` in `src/game/busPassengers.ts` mit genau einem Slot. Der Slot wird fest an Ilka gebunden (neuer Sprite-Typ `reader`), damit in dieser Komposition keine andere Persona einziehen kann.
- **Dialogbaum**: Ilka kommt in `src/game/busPassengerDialogs.ts` dazu. Da die Themen vom Lese-State abhängen, bekommt die Persona optionale Varianten pro State; `BusRide.tsx` wählt beim Öffnen des Gesprächs den passenden Satz Themen aus.
- **Import in `BusRide.tsx`**: Bild und Freisteller ergänzen, sonst keine Änderung an der Fahrtlogik, den Fenstermasken oder der Dialog-Darstellung.

## Nicht Teil dieses Plans

Keine Änderung an den bestehenden Kompositionen a–g, am Buchtext selbst oder an der Bibliotheks-Ausleihe.
