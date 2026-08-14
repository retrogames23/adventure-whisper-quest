# Busfenster wieder passend machen

## Problem
Die animierten Fensterflächen liegen noch auf den Koordinaten des alten Businnenraums. Die beiden neuen Gesamtbilder (Variante A und B) haben die Fenster an anderen Stellen und in anderer Form, deshalb überlappen die Landschafts-Loops jetzt Wand, Sitze und Fahrgäste.

## Umsetzung
1. **Fensterflächen pro Bildvariante definieren**
   - Statt einer globalen Fensterliste bekommt jede Buskomposition (A und B) eigene, prozentuale Fensterrechtecke.
   - Die Werte werden an den tatsächlichen Fensterausschnitten der jeweiligen Bilddatei ausgemessen, nicht geschätzt.

2. **Ränder sauber abdecken**
   - Die Landschaftsanimation wird so eingepasst, dass sie exakt innerhalb der Scheiben endet und Rahmen, Gummidichtung und Sitzlehnen sichtbar bleiben.
   - Wo eine Scheibe nicht rechteckig ist, wird die Fläche leicht verkleinert bzw. mit abgerundeten Ecken maskiert, damit kein Bild über den Rahmen läuft.

3. **Sichtprüfung**
   - Beide Varianten werden im laufenden Spiel per Screenshot geprüft: Landschaft nur in den Scheiben, keine Überlappung mit Fahrgästen, Hotspots unverändert.
   - Kontrolle im Hochformat auf iPhone-Größe und auf Desktop.

## Technische Details
- `WINDOWS` in `src/components/game/BusRide.tsx` entfällt als globale Konstante; die Fenstergeometrie wandert als `windows`-Feld neben die Hotspots pro Komposition in `src/game/busPassengers.ts`.
- `BusRide` rendert die Fenster-Loops aus der aktuell gewählten Komposition; Animationstempo und Scroll-Logik bleiben unverändert.
