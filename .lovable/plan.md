# Masken-Rätsel: E71-Empfang ↔ Kondomautomat in der Kneipe

## Zielbild
Layard kommt in der E71-Lobby an. Die Empfangsdame lässt ihn ohne medizinische Maske nicht weiter Richtung Korridor 15. Sie gibt den Tipp: der Kondomautomat in „Zum stillen Funk" bestückt seit der letzten Lieferknappheit auch OP-Masken. Layard muss in die Kneipe, am Automaten eine Maske ziehen, sie aufsetzen und damit zurück zum Empfang.

Damit ergibt sich erstmals ein zwingender narrativer Grund, die Kneipe zu betreten — bisher ist sie reiner Sozial-Knoten.

## Schritte

### 1. Neues Item `medMask`
- In `src/game/types.ts` `InventoryItemId` um `"medMask"` ergänzen.
- In `src/components/game/ItemIcon.tsx` ein simples Pixel-Art-SVG (rechteckige OP-Maske mit zwei Bändern) als `MedMaskIcon` ergänzen und im Switch verdrahten.
- Lokalisierter Name: „Medizinische Maske" — Beschreibung: „OP-Maske aus dem Automaten im 'stillen Funk'. Riecht leicht nach Plastik und Bier."

### 2. Neue Story-Flags
In `src/game/types.ts` zu `StoryFlag` hinzufügen:
- `receptionRefusedNoMask` — Empfangsdame hat einmalig auf Maskenpflicht hingewiesen.
- `wearingMedMask` — Maske aufgesetzt (wird beim „Verwenden" des Items am Empfang oder über Inventar gesetzt).
- `tookMedMaskFromAutomat` — Automat hat bereits eine Maske ausgegeben (Re-Use blockieren / Folgeklicks erzählen Variantentext).

### 3. Empfangs-Logik (`src/game/scenes/sectorAct1.ts`, `e71Lobby`)
- Hotspot `receptionist`:
  - Wenn `wearingMedMask` → bestehender Pfad `reception` / `receptionUnannounced` (setzt `metReceptionist`) bleibt.
  - Sonst → neuer Dialog `receptionNoMask` (siehe unten). Setzt `receptionRefusedNoMask`, **nicht** `metReceptionist`.
  - `hiddenWhen: ["metReceptionist"]` bleibt — ohne Maske bleibt der Hotspot also klickbar.
- Hotspot `toCorridor15`:
  - `requires: ["metReceptionist"]` bleibt (greift indirekt, weil `metReceptionist` jetzt nur mit Maske gesetzt wird).

### 4. Neuer Dialog `receptionNoMask` in `src/game/dialogs/okwu.ts`
Kurzer Tree (4–6 Lines): Empfangsdame stoppt Layard freundlich-bestimmt, verweist auf Hygienevorschrift Medizin-Track, erklärt Lieferengpass bei OP-Masken in E67, nennt den Kondomautomat in „Zum stillen Funk" als pragmatische Notlösung („… der Wirt füllt da seit zwei Wochen auch Masken nach. Fragen Sie nicht, woher."). Setzt `receptionRefusedNoMask`. Variante mit Anspielung „Sie waren schon mal hier" wenn `receptionRefusedNoMask` bereits gesetzt.

### 5. Kondomautomat in der Kneipe (`src/game/scenes/pub.ts`, Szene `pub`)
- Neuer Hotspot `condomAutomat`:
  - Position: an der Wand neben/zwischen Toilettentür und Ausgang (genaue Koordinaten beim Implementieren am Hintergrundbild abgreifen, Größenordnung ~6×14).
  - `kind: "use"`, Label „Kondomautomat".
  - Verhalten:
    - Erstes `use`: kurze Beschreibung („Automat, mintgrün, drei Reihen. Reihe 1: Kondome. Reihe 2: Pfefferminz. Reihe 3: handgeschriebener Aufkleber 'OP-MASKE — 1 RM'."). Wirft eine `medMask` ins Inventar, setzt `tookMedMaskFromAutomat`.
    - Folgeklick (Flag gesetzt): Variantentext, kein zweites Item.
  - Sichtbar nur wenn `metReceptionist` noch nicht gesetzt **oder** Layard noch keine Maske hat → sonst nur Look-Text, damit der Knoten optisch erhalten bleibt.

### 6. Maske aufsetzen
Zwei UX-Pfade, wir bauen den einfachen:
- Hotspot `receptionist` zusätzlich als Drop-Target für `medMask` (über `acceptItems`-Mechanik der bestehenden Hotspots — falls vorhanden, sonst Inventar-Item bekommt eine `onUse`-Handler, der in `e71Lobby` und überall ab dort `wearingMedMask` setzt und Item entfernt).
- Konkrete Wahl beim Implementieren nach Sichtung der Combine/Use-API in `src/game/combine.ts`. Default: Inventar-Item „Verwenden" aus `e71Lobby` heraus → setzt Flag, entfernt Item, kurzer Text „Layard knotet die Bänder hinterm Ohr. Plastikgeruch.".

### 7. Bestehende Spielstände
- Spieler, die `metReceptionist` schon gesetzt haben (alte Saves, vor diesem Patch in E71 angekommen), bleiben unangetastet — das Rätsel wirkt nur für neue Durchgänge bzw. wer noch nicht durch war. Kein Migrationscode nötig.

## Technische Notizen
- Combine-/Item-Use-Mechanik: vor Implementierung kurz `src/game/combine.ts` und Inventory-Use-Pfad prüfen, um den minimalinvasiven Hook zu wählen.
- Hotspot-Koordinaten für den Automaten werden beim Implementieren am Hintergrundbild `scene-pub.jpg` justiert (analog zu vorhandenen Hocker-Hotspots).
- Dialog-IDs `rnm1…rnmN` analog zu bestehender Konvention im File.
- Keine Datenbank-/Backend-Änderungen, kein neues Asset zwingend nötig (Maske als reiner Inventar-Pixel-Icon, der Automat nutzt das vorhandene Hintergrundbild).
