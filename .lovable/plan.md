## Problem

Die Hotspot-Koordinaten in `src/game/scenes.ts` werden in Prozent eines **4:3-Layers** angegeben, der mittig in der 16:9-Bühne liegt (`SceneView.tsx` Zeile 147). Das Hintergrundbild wird dagegen mit `object-contain` über die **gesamte 16:9-Breite** gerendert. Bei nativen 16:9- oder breiten Assets (wie Aufzug, Hallway, Korridore) wandert das eigentliche Motiv dadurch in einen Bereich, den die 4:3-Hotspot-Koordinaten nicht direkt abbilden — Hotspots sitzen sichtbar links vom realen Knopf-Panel.

Zusätzlich wirkt das Aufzug-Bild zu kleinteilig, weil der Käfig die volle 16:9-Breite einnimmt und die Bedienleiste nur ~15% breit ist.

## Lösung — 3 Teile

### 1. Aufzug-Overlays + Zoom kombiniert lösen

Statt nur die Koordinaten zu verschieben, **zoomen wir den Aufzug per CSS-Transform am Bedienpanel** (rechts) und passen die Hotspots in einem Rutsch an. Das löst Punkt 1+2 gleichzeitig.

Umsetzung in `SceneView.tsx`:
- Neues optionales Feld `bgFocus?: { scale: number; originX: number; originY: number }` in der Scene-Definition.
- Wenn gesetzt, wird das `<img>` mit `transform: scale(s)` und `transformOrigin: x% y%` gerendert. Der 4:3-Hotspot-Layer bekommt **dieselbe** Transform — so bleiben Bild und Hotspots deckungsgleich.

Aufzug bekommt: `bgFocus: { scale: 1.4, originX: 75, originY: 50 }` — das vergrößert den Käfig um 40% und zentriert auf das rechte Bedienpanel.

Hotspots werden anschließend mit dem Dev-Editor (`?dev=1` + Space) am gezoomten Bild final justiert und in `scenes.ts` eingetragen.

### 2. Aufzug-Sound

- `public/audio/elevator-ding.mp3` ablegen (kurzer "Ding"-Ton + leichtes Motoren-Whirr, ~1.5s). Quelle: lizenzfreier Sample (z. B. von freesound.org als CC0).
- In `SceneView.tsx` oder besser in einem zentralen `playSound(name)`-Helper den Ton beim `goTo("corridorXX")` aus dem Aufzug abspielen.
- Auslöser: Beim `onUse` der Knöpfe `btn1`–`btn5` zuerst Sound abspielen, dann mit kleinem Delay (~400 ms) den Szenenwechsel auslösen — so hört man den Ding noch im Aufzug.

### 3. Gesamt-Workflow für alle Szenen mit verschobenen Overlays

Reihenfolge zum Abarbeiten:
1. **Apartment** — bereits korrigiert
2. **Aufzug** — dieser Plan
3. **Hallway (Korridor 26)** — letzte Iteration sitzt grob, Feinschliff offen
4. **Korridor 15, 36, 46, 56**
5. **Lobby (floor1Lobby)**
6. **Sektor-Tür, Passage**
7. **Apartment 2613, Hallway-sealed-Varianten**
8. **Raum 1532, Serverraum 5610**

Pro Szene:
- Screenshot vom User (oder via Browser-Tool) mit aktuellen Overlays
- Bei stark abweichenden Assets `bgFocus` setzen statt jede Koordinate einzeln zu schieben
- Koordinaten in `scenes.ts` patchen
- Visuelle Verifikation per Screenshot

## Technische Details

**Geänderte Dateien:**
- `src/game/types.ts` — `bgFocus`-Feld an `Scene`-Typ
- `src/components/game/SceneView.tsx` — Transform auf `<img>` und Hotspot-Layer; Sound-Hook
- `src/game/scenes.ts` — `bgFocus` für Aufzug, neue Hotspot-Koordinaten für `btn1`–`btn5` und Indikator
- `public/audio/elevator-ding.mp3` — neues Asset (per Skript heruntergeladen)
- ggf. `src/lib/sound.ts` — kleiner Wrapper für Sound-Playback (Singleton-AudioContext, Mute-State)

**Sound-Snippet:**
```ts
// src/lib/sound.ts
const cache = new Map<string, HTMLAudioElement>();
export function playSound(src: string, volume = 0.6) {
  let a = cache.get(src);
  if (!a) { a = new Audio(src); cache.set(src, a); }
  a.volume = volume; a.currentTime = 0; a.play().catch(() => {});
}
```

**Aufzug onUse:**
```ts
onUse: (api) => {
  playSound("/audio/elevator-ding.mp3");
  setTimeout(() => api.goTo("corridor46"), 400);
}
```

## Nach Approval

Ich setze 1+2+3 in einem Rutsch um (Aufzug zuerst inkl. Sound), dann frage ich dich für jede weitere Szene aus der Liste oben einzeln nach einem Screenshot, bevor ich weiter justiere.
