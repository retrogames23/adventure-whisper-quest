# Das Mira-Rätsel lesbar machen

Ziel: Der Spieler soll an drei Stellen verstehen, (a) dass seine Post jetzt bei der Leitstelle liegt, (b) dass Miras Maschine der einzige Weg dorthin ist, (c) dass es zwei Wege zu dieser Maschine gibt — Vertrauen oder Heizung.

## Was aktuell wirklich passiert (geprüft im Code)

- Mira meldet beim Telefon-Reparieren Apparat + Datenport auf `leitstelle.e67` um und setzt `port2611Locked`.
- Der Tagescode liegt auf `leitstelle.e67` in der Datei `verteiler_tagescodes.txt` — **aber nur**, wenn das Flag `calledForCode` gesetzt ist (also nach dem gewonnenen Vossbeck-Endduell). Vorher zeigt `ls` dort nur `schichtplan.txt`.
- Deshalb war dort "keine Inbox": Über den Dev-Konsolen-Switcher vor dem Duell gibt es schlicht nichts zu lesen, und der Host sagt das nirgends.
- Der Heizungspfad existiert: Thermoskanne aus 5610 zu Bodo → Vierkantschlüssel → Wartungstür Lobby → Keller → Steigstrang 46 (vierter Regler) → Mira verlässt 4601. Bodo bietet das aber nur an, wenn man ihn nach `port2611Locked` erneut in 2612 anspricht — nichts in der Welt schickt einen dorthin.

## Änderungen

### 1. Der Knoten erklärt sich selbst
- `leitstelle.e67`: MOTD und `ls` bekommen eine sichtbare Postfach-Zeile. Immer vorhanden ist eine Datei `eingang_2611.txt` (statt gar nichts):
  - vor `calledForCode`: "Umgemeldeter Datenport 2611 — derzeit kein offener Vorgang. Eingehende Zustellungen für 2611 verbleiben hier."
  - nach `calledForCode`: Verweis auf `verteiler_tagescodes.txt`.
- Damit ist auch bei frühem Zugriff klar: *Hier* landet Layards Post, es fehlt nur noch der Vorgang.

### 2. Layards eigenes Terminal zeigt die Umleitung
- Im Postfach-Bereich von `worag.e67` erscheint bei `port2611Locked` eine feste Zeile: "POSTFACH 2611 — umgemeldet auf leitstelle.e67 (Wartung Korridor 46)." Wer nach dem Duell den Code sucht, liest den Zielhost direkt beim ersten Blick ins eigene Postfach.

### 3. Mira-Hinweise verdichten (statt neu erfinden)
- Miras Satz beim Reparieren bekommt eine Zeile mehr, die den entscheidenden Zusammenhang ausspricht: Ihr Kasten hängt am Wartungsstrang 10.67.56.x — genau dem Bereich, den die Leitstelle als zugelassen nennt. Zwei Fakten, die der Spieler bisher selbst verknüpfen musste, stehen dann in einem Atemzug.
- Nach dem Duell (`calledForCode` und `port2611Locked`) kommt beim Betreten von Korridor 46 ein kurzer Layard-Gedanke: seine Post liegt bei der Leitstelle, dort kommt nur ein Wartungsanschluss rein — und einer davon steht in 4601.

### 4. Heizungspfad auffindbar machen
- Wenn Mira den Terminal-Zugang verweigert (Distanz-Stufe zu hoch bzw. keine Belege abgegeben), sagt sie beim Abweisen einen Satz, der die Schwachstelle nennt: sie sitzt hier, solange es auszuhalten ist — im Sommer '95, als der Strang durchdrehte, stand sie zwei Stunden im Korridor.
- Bodo erwähnt in seinem Hub nach `port2611Locked` beiläufig, dass Betriebstechnik "nie in ihren Wohnungen sitzt, wenn der Strang hochläuft" — und dass der Keller einen Vierkant braucht. So führt der Weg zur Thermoskanne/Schlüssel-Kette organisch.
- Die Keller-Bedienung selbst bleibt unverändert (Bodo nennt bereits "vierter von links").

### 5. Hinweissystem angleichen
- `act1.pruefsperre2611` und `act1.kellerHeizung` in `hints.ts` an die neuen Dateinamen/Formulierungen anpassen, damit Tippstufen und Spieltext dasselbe sagen.

## Technische Details

Betroffene Dateien: `src/game/netHosts.ts` (Host `leitstelle.e67`: `motd`, `files`, `dynamicFiles`), `src/components/game/Terminal.tsx` (Postfach-Anzeige bei `port2611Locked`), `src/game/dialogs/mira.ts` (Reparatur-Abschluss, Verweigerungszeile), `src/game/dialogs/bodo.ts` (Hub-Zeile), `src/game/scenes/corridorsE67.ts` (einmaliger Gedanke beim Betreten), `src/game/hints.ts`. Keine neuen Flags, keine Änderung der Rätsel-Logik oder Reihenfolge — nur Sichtbarkeit der bestehenden Kette.
