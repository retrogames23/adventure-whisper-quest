# Streitendes Paar im Bus (Linie 28)

Ein Ehepaar um die 40 sitzt manchmal im Bus und streitet ununterbrochen über Alltagskleinigkeiten (Loriot-Ton: „Warum sind braune Eier braun?“). Der Streit läuft als Sprechblasen-Wortwechsel weiter, solange Layard zusieht — genau wie das Kantinenpersonal. Klickt er das Paar an, unterbricht er den Streit und kann mit beiden reden; danach geht der Streit weiter.

## Wann es auftaucht

Die Fahrgäste stammen aus fertigen Buskompositionsbildern. Es kommt eine dritte Komposition dazu, in der das Paar nebeneinander sitzt plus eine weitere Person. Bei jeder Fahrt wird zufällig zwischen den drei Kompositionen gewählt — das Paar erscheint also genauso zufällig wie alle anderen.

## Der Streit

Rund 10 Streitthemen mit je 4–8 Wechseln, z. B.:
- braune vs. weiße Eier
- ob die Fahrkarte gelocht werden muss oder gelocht wurde
- die Frage, ob man Suppe „aufwärmt“ oder „nochmal kocht“
- wer den Beleg für die Wohnungsbegehung eingesteckt hat
- ob der Bus früher schneller war oder man selbst langsamer geworden ist

Ton: höflich-verbissen, wörtliche Wiederholungen, sparsam Mandatsdeutsch („in Regel“, „das ließe sich prüfen“). Themen laufen zyklisch in zufälliger Reihenfolge, Sprechblasen erscheinen abwechselnd über den beiden Sitzplätzen.

## Gespräch mit dem Paar

Beim Anklicken pausiert der Streit und ein Gesprächsbaum öffnet sich (gleiche Bedienung wie bei den anderen Fahrgästen), u. a.:
- „Sich einmischen.“ — beide erklären den Streit, natürlich unterschiedlich
- „Nach dem Ziel fragen.“ — Ehealltag, Behördentermin
- Nachfragen zu Sektor 28, Zählung, Wohnungsbegehung
- „Weiterstreiten lassen.“ — schließt das Gespräch, Streit läuft sofort weiter

Beide Personen antworten im selben Fenster, kenntlich am Namen vor der Zeile.

## Technisches

- `src/assets/bus/bus-passengers-c.jpg`: neue Buskomposition im Stil von a/b, mit einem Paar (Mitte 40) nebeneinander und einer dritten Person; Fensterflächen werden wie bei a/b pixelgenau vermessen und als `clip-path` in `COMPOSITION_WINDOWS` eingetragen.
- `src/game/busPassengers.ts`: Komposition `c` mit Fensterflächen, Slots und Hotspots; `pickBusComposition()` wählt aus drei Varianten. Das Paar bekommt einen gemeinsamen Hotspot über beiden Sitzen.
- `src/game/busCoupleChatter.ts`: neue Datei mit Streitthemen (Struktur analog `cafeteriaChatter.ts`).
- `src/game/busPassengerDialogs.ts`: neuer Paar-Eintrag (neuer Sprite-Typ `couple`) mit Gesprächsbaum; Zeilen mit vorangestelltem Sprechernamen.
- `src/components/game/BusRide.tsx`: Sprechblasen-Loop für das Paar (eigene, leichtgewichtige Variante der Chatter-Logik, an die Bushotspots angeankert), Pause während eines Gesprächs, Fortsetzung danach.
