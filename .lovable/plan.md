# Busfenster: Ebenen definieren (Fahrgäste vor der Scheibe)

## Problem
Die Landschaftsanimation wird als eigene Ebene über das Gesamtbild gelegt. Alles, was im Bild vor der Scheibe liegt — Kopf und Schulter der Frau, Sitzlehnen, Haltestangen, Fensterrahmenkanten — verschwindet dadurch hinter der Animation.

## Lösung: drei Ebenen statt zwei
```text
Ebene 3  Vordergrund-Freisteller (Personen/Objekte vor der Scheibe)
Ebene 2  Landschafts-Loop (bewegt, in Scheibenform geclippt)
Ebene 1  Buskomposition (komplettes Standbild)
```

## Umsetzung
1. **Vordergrund-Maske je Bildvariante**
   - Aus jeder Buskomposition (a–g) wird ein transparentes PNG erzeugt, das nur die Bildteile enthält, die innerhalb der Fensterflächen vor der Scheibe liegen (Fahrgast-Silhouetten, Rahmen, Stangen).
   - Die Freistellung erfolgt an den tatsächlichen Pixeln der jeweiligen Datei, nicht geschätzt — Kanten weich, damit keine harte Schnittlinie entsteht.
   - Da d/f aus a und e/g aus b entstanden sind, ist die Freistellung nur dort nötig, wo die Personen tatsächlich abweichen.

2. **Rendering in der Busszene**
   - Über die Fensterebene wird der jeweilige Vordergrund-Freisteller deckungsgleich gelegt, gleiche Größe und Position wie das Grundbild, ohne Klickfläche.
   - Fenstergeometrie, Scrolltempo, Hotspots und Gesprächslogik bleiben unverändert.

3. **Sichtprüfung**
   - Alle sieben Varianten per Screenshot prüfen: Landschaft nur in der Scheibe, Personen vollständig sichtbar, keine Halos an den Silhouetten.
   - Kontrolle im Hochformat (iPhone) und auf Desktop, mit geöffnetem und geschlossenem Dialog.

## Technische Details
- Neue Assets unter `src/assets/bus/bus-passengers-<id>-front.png` (transparente Freisteller).
- `BusWindowArea` bleibt; die Komposition bekommt in `src/game/busPassengers.ts` ein optionales `foreground`-Feld.
- `src/components/game/BusRide.tsx` rendert nach den Fenster-Loops ein zusätzliches `<img>` mit `pointer-events-none` und höherem Stapelindex.
- Fallback: fehlt ein Freisteller, verhält sich die Szene exakt wie heute.
