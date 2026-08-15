# Terminologie: Provisorium / Mandatsfrieden / Mandatsgebiet

## Ziel

Die Begriffe für die drei historischen Phasen des Mandatsgebiets werden klarer geschieden:

- **1946** → Das Ereignis heißt **„Mandatsfrieden“** (Friedensschluss und Einrichtung der Vier-Mächte-Verwaltung).
- **1946–1986** → Die Ära heißt **„Provisorium“** (oder **„Ära des Provisoriums“**). Das Gebiet wird in dieser Zeit als **„provisorisches Mandatsgebiet“** bezeichnet.
- **1986–1997** → Umwandlung in den förmlichen **„Mandatsbund“**. Ab jetzt spricht man einfach vom **„Mandatsgebiet Mitteleuropa“**.

Das Motiv „Nichts ist so dauerhaft wie ein Provisorium mit Briefkopf“ bleibt erhalten und wird noch bewusster eingesetzt.

## Begründung

Bisher gibt es nur den Begriff „Mandatsgebiet“ für beide Phasen (1946 und 1986). Das verwischt die historische Bruchstelle von 1986 und die Tatsache, dass die vier Mächte das eigentlich nur als Übergang gedacht hatten. Die neue Terminologie passt besser zum bürokratischen Ton der Spielwelt und zum bereits existierenden Almanach-Zitat: „Was als Provisorium gedacht war, wurde durch Praxis institutionalisiert.“

## Umsetzung

### 1. `LORE.md` anpassen

- Zeitstrahl-Kapitel umbenennen:
  - `1946–1965` → Titel sollte das „Provisorium“ nennen, z. B. „Provisorium: Die lange Tauwetter-Periode“.
  - `1965–1980` → „Provisorium: Die Konvergenz“.
  - `1980–1990` → „Vom Provisorium zum Mandatsbund“.
- 1946-Text erweitern: aus der „gemeinsamen Vier-Mächte-Verwaltung“ wird das **„provisorische Mandatsgebiet“**, der Friedensschluss selbst heißt **„Mandatsfrieden“**.
- 1986-Text klarstellen: nicht nur „Mandatsgebiet in Staatenbund umgewandelt“, sondern **„das Provisorium wurde in den Mandatsbund überführt; seither spricht man vom Mandatsgebiet Mitteleuropa“**.
- Globale Geographie 1997: Block A bleibt „Mandatsraum & Quadranten-Konvention“, mit Hinweis, dass der Name „Mandatsgebiet“ erst seit 1986 formell verwendet wird.
- Abschnitt 4 (Mandatsgebiet und Sektor-System): Historische Einleitung anpassen. 1946 = Provisorium, 1986 = formelles Mandatsgebiet/Mandatsbund.
- Zusammenfassung am Ende: neue Begriffe aufnehmen.

### 2. `src/game/quadrantenAlmanach.ts` anpassen

- Kapitel „Wie das Mandatsgebiet entstanden ist“ klarer schieden:
  - 1946–1986 = Provisorium / provisorisches Mandatsgebiet.
  - 1986 = Umwandlung in Mandatsbund / förmliches Mandatsgebiet.
- Formulierung „Aus dem Provisorium entsteht das Mandatsgebiet“ präzisieren: es entsteht 1946 die Provisorium, 1986 wird daraus der Mandatsbund.
- 1986-Absatz: „Der Mandatsrat zog sich zurück …“ mit Hinweis ergänzen, dass damit die Phase des Provisoriums endete.

### 3. `src/game/kuerzesteGeschichte.ts` anpassen

- Kapitel XII (Tafel XII — Provisorische Verwaltung in den Ruinen, 1946):
  - Text präzisieren: 1946 = Mandatsfrieden, Einrichtung des **provisorischen Mandatsgebiets**.
  - „Aus dem Provisorium entsteht das Mandatsgebiet“ umformulieren: Es entsteht das Provisorium, das später zum Mandatsgebiet wird.
  - Zweiter Absatz (1946, Mandatsrat) ergänzen: der Auftrag „Wiederaufbau“ als Provisorium beginnt, das sich zur Gewohnheit verfestigt.

### 4. Dialoge anpassen

- `src/game/dialogs/ralf.ts`: Ralfs Erklärung „Das Mandatsgebiet ist eine Übergangslösung, die geblieben ist“ kann die neue Terminologie nutzen: „Man nannte es zuerst das Provisorium. Heute nennt man es Mandatsgebiet, aber es ist immer noch das Provisorium.“
- `src/game/npcPersonas.ts`: Wissens-Einträge zu „Mandatsrat“ und „dreijährige Übergangslösung“ auf neue Begriffe abstimmen.

### 5. Optional: FastWeb / TV / Wetter

- `src/game/fastWebChat/personas.ts` und `gfaPersonas.ts`: Prüfen, ob die Begriffe „Mandatsgebiet“ passiv konsistent bleiben (wahrscheinlich ja, da keine Zeitstrahl-Erklärung nötig).
- `src/game/tv/channels.ts`: Falls der Sektorbericht oder Bürgerfunk historische Begriffe nutzt, anpassen.

### 6. `README.md` prüfen

- Falls dort historische Begriffe verwendet werden, auf neue Terminologie abstimmen.

### 7. Konsistenzprüfung

- `scripts/lore-check.mjs` oder Textsuche nach „Mandatsfrieden“, „Provisorium“ und „Mandatsgebiet“ laufen lassen, um verwaiste Formulierungen zu finden.
- Sicherstellen, dass der Spieler (1997) den Begriff „Mandatsgebiet“ für die Gegenwart weiterhin verwendet; nur historische Texte (Almanach, Geschichtsbuch, Ralf) verwenden „Provisorium“.

## Nicht im Scope

- Keine Code-Änderungen an Spielmechaniken.
- Keine neue Kunst oder Audio.
- Keine Änderung der politischen Substanz, nur die Bezeichnungen.

## Ergebnis

Der historische Bogen wird klarer: ein 1946 provisorisch gedachtes Friedens-Konstrukt wird durch vier Jahrzehnte Gewohnheit zum förmlichen Mandatsgebiet 1986. Das Motiv „Provisorium“ wird bewusst und durchgängig genutzt, ohne die Spielwelt zu überladen.
