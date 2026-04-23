

## Ziel

Das gesamte Spiel (TopBar + Szene + Inventar) passt **immer in den sichtbaren Viewport**, ohne Scrollen — egal ob Laptop, Desktop oder Tablet.

## Ursache des Scrollens

- `Game.tsx` nutzt `min-h-screen` (mindestens Bildschirmhöhe, kann größer werden).
- `SceneView` hat ein fixes Seitenverhältnis von **4:3** und `max-w-6xl` (1152px). Bei voller Breite wird die Szene also bis zu **864px hoch** — plus TopBar (~44px) plus Inventar (~60px) = deutlich mehr als ein typischer Laptop-Viewport (~700–800px).
- Es gibt keine **Höhenbegrenzung**, die die Szene zwingt, in den verbleibenden Platz zu passen.

## Lösung (einheitlich, einfach)

Layout auf eine **feste Viewport-Höhe** umstellen und die Szene so skalieren, dass sie in den verbleibenden vertikalen Platz passt — Breite folgt aus dem 4:3-Verhältnis automatisch.

### Änderungen

**1. `src/components/game/Game.tsx`**
- Wrapper von `min-h-screen flex-col` → `h-screen flex-col overflow-hidden`.
- `<main>` bekommt `flex-1 min-h-0 flex items-center justify-center` und etwas weniger Padding (`py-2`), damit die Szene den verbleibenden Platz bekommt und vertikal zentriert ist.
- Der innere `<div className="relative">` wird zu einem Höhen-Container: `className="relative h-full flex items-center justify-center"`.

**2. `src/components/game/SceneView.tsx`**
- Statt `aspect-[4/3] w-full max-w-6xl` →  
  `h-full max-h-full w-auto aspect-[4/3] max-w-full`.  
- So nimmt die Szene die volle verfügbare Höhe ein, die Breite folgt aus 4:3, und sie wird nie breiter als der Container. Auf hohen/schmalen Viewports greift `max-w-full` und begrenzt über die Breite.

**3. Kleine Begleitanpassungen**
- `TopBar` und `Inventory` behalten ihre Höhe (sind `flex-shrink-0` durch das normale Flex-Verhalten in einem `flex-col`-Container — ggf. explizit `shrink-0` ergänzen, damit sie nicht gestaucht werden).
- Inventar-Padding leicht reduzieren (`py-2` statt `py-3`), damit auf 13"-Laptops mehr Platz für die Szene bleibt.
- Auf sehr schmalen Mobilgeräten (Hochformat) bleibt das Layout funktional, da `max-w-full` greift; falls die Höhe extrem niedrig wird, gibt es kein Scrollen mehr — nur eine kleinere Szene.

### Effekt

- Laptop (1366×768): Szene ~640×480, TopBar+Inventar passen darüber/darunter, **kein Scrollen**.
- Desktop (1920×1080): Szene ~1280×960 wird durch verfügbare Höhe begrenzt → ca. 960×720, zentriert.
- Tablet/Mobile: Szene skaliert über `max-w-full`, weiterhin kein Scrollen.

### Was unverändert bleibt

- Alle Overlays (`TextOverlay`, `DialogOverlay`, `RadioPanel`, `Terminal`, `Ending`, `PauseMenu`) liegen bereits absolut im selben relativen Container und skalieren automatisch mit.
- Das 4:3-Seitenverhältnis der Szene und alle Hotspot-Koordinaten (in Prozent) bleiben exakt erhalten.
- Pause-Menü, Terminal usw. funktionieren weiter wie bisher.

