## Ziel

Das Spiel ist als 16:9-Bühne mit fixen prozentualen Hotspot-Koordinaten gebaut. Auf Mobil (390×621) ist die Bühne winzig, die Top-Bar bricht um, das Inventar verdeckt Hotspots, und Hotspots sind zu klein zum Treffen. Eine vollständige Mobile-Variante wäre teuer — aber es gibt einen pragmatischen Fix, der die Desktop-Experience NICHT verändert.

## Ansatz: „Forced Landscape Stage" auf Mobil

Statt das Layout responsiv umzubauen, rendern wir auf Mobil dieselbe Desktop-Bühne in einer fixen virtuellen Auflösung (z. B. 1024×640) und skalieren sie per CSS `transform: scale()` so, dass sie ins Mobil-Viewport passt — bei Hochformat wird die Bühne um 90° rotiert. Alle prozentbasierten Hotspots, Overlays, Terminals etc. funktionieren dadurch unverändert. Der Spieler dreht das Handy quer (oder spielt im Hochformat mit rotierter Ansicht).

Das ist genau der Trick, den viele klassische Point-&-Click-Ports auf Mobil benutzen.

### Was sich ändert (nur Mobil-Pfad)

1. **Viewport-Wrapper in `Game.tsx`**: Wenn `window.innerWidth < 768`, die ganze App in einen Container mit fester Größe (1024×640) packen und per CSS-Transform passend ins Viewport skalieren. Bei Portrait zusätzlich rotieren mit Hinweis „Bitte Gerät drehen für beste Erfahrung" + Auto-Rotate-Option.
2. **Touch-Treffergröße**: In `Hotspot.tsx` auf Touch-Geräten einen unsichtbaren Padding-Bereich (`min-h-[44px] min-w-[44px]`) einfügen, damit Hotspots fingerfreundlich sind. Visuell unverändert auf Desktop.
3. **TopBar kompakt auf Mobil**: Track-Wechsler ist bereits `hidden sm:inline-flex`. Zusätzlich „SCHMERZ-RADIO"-Label und Szenenname auf sehr kleinen Breiten verstecken, damit Buttons in einer Zeile bleiben.
4. **Inventar-Button-Position**: Auf Mobil von `bottom-4 right-4` auf `bottom-2 right-2` mit etwas kleinerem Button (h-12 w-12 statt h-14 w-14), damit es nicht über Hotspots am unteren Bildrand liegt. Desktop bleibt unverändert via `sm:`-Breakpoint.

### Variante: Nur Skalieren ohne Rotation

Falls Rotation zu invasiv wirkt: nur die feste virtuelle Bühne (1024×640) per `scale()` ins Mobil-Viewport einpassen — auf Portrait wird die Bühne dann sehr klein, aber alles ist sichtbar und antippbar (mit Pinch-to-Zoom-Geste browserseitig deaktiviert). Querformat-Spiel funktioniert dann optimal.

**Empfehlung**: Variante mit Rotation + Hinweis-Banner „Für beste Erfahrung Gerät querhalten" beim ersten Mobil-Aufruf. Wenn der Spieler das Handy dreht (orientation change), entfällt die Rotation automatisch.

## Technische Details

- **Wrapper-Struktur** in `Game.tsx`:
  ```tsx
  <div className="mobile-stage-wrapper"> {/* nur < 768px aktiv */}
    <div className="mobile-stage" style={{ width: 1024, height: 640, transform: `scale(${scale}) rotate(${rotate}deg)` }}>
      {/* bestehender App-Inhalt unverändert */}
    </div>
  </div>
  ```
  `scale` und `rotate` werden via `useEffect` + `resize`/`orientationchange`-Listener berechnet:
  - Landscape Mobil: `scale = min(vw/1024, vh/640)`, `rotate = 0`
  - Portrait Mobil: `scale = min(vh/1024, vw/640)`, `rotate = 90`
  - Desktop (≥ 768px): Wrapper wird nicht aktiviert, Layout unverändert

- **CSS in `styles.css`**: 
  - `.mobile-stage-wrapper { @media (min-width: 768px) { display: contents; } }` — auf Desktop transparent
  - `touch-action: manipulation` global für schnelleres Tap-Response
  - `body { overscroll-behavior: none; }` gegen Pull-to-Refresh

- **Hotspot.tsx**: Min-Größe per Media Query (`@media (pointer: coarse)`) — wirkt nur auf Touch-Geräten, Desktop unberührt.

- **Viewport-Meta**: Bereits `width=device-width, initial-scale=1` in `__root.tsx`. Ergänzen um `maximum-scale=1, user-scalable=no` damit das Browser-Pinch-Zoom nicht mit unserem Stage-Scale konkurriert.

- **Drag-Cursor**: `DragCursorLayer` nutzt `fixed` mit Cursor-Koordinaten — bei skalierter/rotierter Bühne passt das nicht. Lösung: Inverse Transform berücksichtigen oder den Layer in den Stage-Container verlegen, damit er mitskaliert/rotiert.

## Was NICHT geändert wird

- Keine Änderung an Szenen, Hotspot-Koordinaten, Dialogen, Audio, Terminal, Radio.
- Keine Änderung am Desktop-Layout (≥ 768px Breakpoint).
- Keine neue Steuerung, keine separaten Mobil-Komponenten.

## Aufwand

Klein bis mittel — ein neuer Wrapper-Komponent, ein bisschen CSS, kleine Anpassungen an `Hotspot.tsx`, `TopBar.tsx`, `Inventory.tsx`, `DragCursorLayer`. Insgesamt 4–5 Dateien.

## Dateien

- `src/components/game/Game.tsx` — Mobile-Stage-Wrapper hinzufügen
- `src/components/game/MobileStage.tsx` — neue Komponente mit Scale/Rotate-Logik
- `src/styles.css` — Wrapper-CSS + touch-action
- `src/routes/__root.tsx` — Viewport-Meta erweitern
- `src/components/game/Hotspot.tsx` — Touch-Min-Größe
- `src/components/game/TopBar.tsx` — Mobile-kompaktere Variante
- `src/components/game/Inventory.tsx` — Button-Position/Größe auf Mobil + DragLayer-Fix