# Busszene: Fahrgäste glaubwürdig integrieren

## Ziel
Die bisherige Sprite-Montage wird aufgegeben. Fahrgäste sollen perspektivisch korrekt auf den vorhandenen Bänken sitzen, mit sichtbarem Kontakt von Gesäß, Füßen und Boden und ohne schwebende oder unpassend gedrehte Körper.

## Umsetzung
1. **Komplette Bus-Kompositionen statt Einzel-Sprites**
   - Mehrere Varianten des bestehenden Businnenraums erstellen, in denen jeweils unterschiedliche Fahrgäste direkt und perspektivisch passend in die Szene integriert sind.
   - Pro Person auf korrekte Sitzhöhe, Blickrichtung, Körpergröße, verdeckte Körperpartien und Bodenkontakt achten.
   - Den Mittelgang frei und die beiden Fensterflächen für die bestehende Landschaftsanimation nutzbar halten.

2. **Feste visuelle Plätze mit klickbaren Hotspots**
   - Die Personen nicht mehr als frei skalierte PNG-Elemente rendern.
   - Über jeder im Gesamtbild eingebauten Person nur noch einen unsichtbaren, responsiven Gesprächs-Hotspot platzieren.
   - Namen und Dialoge an die tatsächlich sichtbare Person koppeln, sodass Bild und Gesprächspartner übereinstimmen.

3. **Variation ohne Dopplungen**
   - Beim Start einer Fahrt eine der vollständigen Busvarianten auswählen.
   - Jede Variante enthält ausschließlich unterschiedliche Personen; die Auswahl der Dialogfiguren folgt exakt der gewählten Bildvariante.
   - Die derzeitige zufällige Kombination aus vier wiederverwendeten Sprites entfernen.

4. **Mobile und Desktop prüfen**
   - Die Szene im horizontalen Spielformat auf iPhone-Größe sowie Desktop testen.
   - Prüfen, dass alle Personen tatsächlich auf den Sitzflächen ruhen, die Füße plausibel stehen, Hotspots passen und keine Bedienelemente verdeckt werden.

## Technische Details
- `BusRide` verwendet künftig eine Variantenbeschreibung aus Hintergrundbild, sichtbaren Personen und prozentualen Hotspot-Flächen.
- Die bestehenden Fenster-Loops und die Gesprächslogik bleiben erhalten.
- Die bisherigen `BUS_SPRITES` und geometrischen `BUS_SEATS` entfallen aus dem Rendering; Dialoginhalte bleiben erhalten und werden den festen Figuren der Varianten zugeordnet.
- Die visuelle Abnahme erfolgt anhand echter Screenshots aus der laufenden Szene, nicht anhand isolierter Assets.