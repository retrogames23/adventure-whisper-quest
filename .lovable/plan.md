## Ziel

Ein "Stuck?"-Tipp-System nach Vorbild von *Return to Monkey Island*: Der Spieler bekommt auf Wunsch Hinweise zum **aktuellen offenen Ziel**, in drei Stufen abgestuft:

1. **Stufe 1 — Andeutung**: Erinnert nur an das Thema ("Da war doch was mit dem Tresen in der Kantine…")
2. **Stufe 2 — Richtung**: Nennt Ort/Person/Item konkret ("Brust akzeptiert die Vollmacht nicht — du brauchst einen Hebel.")
3. **Stufe 3 — Lösung**: Sagt exakt, was als Nächstes zu tun ist ("Geh zum Tresen, fordere Brust heraus → Bürokratie-Duell starten.")

## Architektur

### 1. Daten-Modul `src/game/hints.ts` (neu)

Zentrale i18n-freundliche Hint-Definitionen. Pro **Quest/Ziel** ein Eintrag mit:
- `id` (stabil, z. B. `"act1.b3Authorization"`)
- `title` — kurzer Quest-Name für die UI ("Vollmacht B3 besorgen")
- `isActive(api)` — Prädikat: ist diese Quest gerade offen? (Story-Flag-basiert)
- `isResolved(api)` — Prädikat: erledigt? (Quest verschwindet aus der Liste)
- `priority` — Sortier-/Default-Auswahl (kritischer Pfad zuerst)
- `hints: [string, string, string]` — die 3 Stufen, ganze Sätze, mit `{platzhalter}` wo nötig

Dazu Helfer:
- `getActiveHints(api): HintQuest[]` — liefert alle aktuell offenen Quests, sortiert nach Priorität
- `HINTS_UI_TEXT` — alle UI-Labels (Tab-Titel, Buttons "Nächster Tipp", "Tipps verbergen", "Alles erledigt — keine offenen Aufgaben.")

### 2. Quest-Inventar (initial; lebt mit dem Spiel)

Pro Akt-I-Strang ein Eintrag, z. B.:
- `act1.callLeitstelle` — Türklopfen 2615 → Insa anrufen
- `act1.paramedicsReport` — Sanitäter-Report aus 2615 holen
- `act1.b3Authorization` — Vollmacht B3 in der Kantine
- `act1.bureaucracyDuel` — alternativer Pfad: Brust herausfordern
- `act1.quittung4317` — Tilla-Transfer / Siegel / gefälschte Quittung
- `act1.elevatorMaint` — Wartungssperre 4711 lösen (Bodos Account)
- `act1.serverRoom5610` — Knoten 5610 anzapfen / brennen
- `act1.miraTrust` — Mira-Vertrauenspfad
- `act1.sectorDoor` — 8-stelliger Code → E67 verlassen

Jede Quest schließt sich automatisch, sobald der entsprechende Erledigt-Flag (z. B. `gotB3Authorization`, `sectorDoorOpen`, `duelWon`) gesetzt ist.

### 3. UI: Tipps-Tab im bestehenden `HelpOverlay`

Statt eines neuen Overlays bekommt das Help-Overlay **zwei Tabs**:
- "Spickzettel" (das bisherige durchsuchbare Mechanik-Help)
- "Tipps" (neu) — mit großem Spoiler-Hinweis am Kopf

Im Tipps-Tab:
- **Quest-Wahl**: Wenn mehrere Quests offen sind, Liste mit der höchsten Priorität vorausgewählt. Spieler kann eine andere wählen.
- **Hint-Stufen**: Stufe 1 sofort sichtbar. Button "Nächster Tipp" enthüllt Stufe 2, dann Stufe 3. Jede neue Stufe ersetzt nicht die vorherige, sondern ergänzt darunter — Spieler sieht den ganzen "Pfad zur Lösung".
- **State**: Pro Quest wird die enthüllte Stufe in `sessionStorage` gemerkt (`hint:<questId>` → 1/2/3), damit beim erneuten Öffnen der Stand erhalten bleibt. Kein Eintrag im persistenten Save — Hint-Nutzung soll konsequenzlos sein.
- **Empty State**: "Du hast gerade keine offene Aufgabe — schau dich um, sprich mit Leuten, lies das Handbuch."

### 4. Auslöser

- Bestehender Hilfe-Button in der TopBar bleibt — Tab "Tipps" als Default für Spieler, die "stuck" sind, wird über `?stuck`-Hash oder einen separaten Button "Stuck?" in der TopBar gesetzt. **Variante A (empfohlen)**: Zweiter kleiner Knopf "Stuck?" mit Glühbirnen-Icon (`Lightbulb` aus lucide-react) direkt neben dem `?`-Button, öffnet `HelpOverlay` mit aktivem Tipps-Tab.
- ESC schließt wie bisher.

### 5. i18n-Konformität

- Alle Hint-Texte stehen in `src/game/hints.ts` als ganze Sätze.
- UI-Labels in `HINTS_UI_TEXT`-Konstante (Vorbild: `ENDING_UI_TEXT`).
- Quest-Titel mit Platzhaltern, wo Werte einfließen (selten — meiste Quests sind statisch).
- Keine String-Konkatenation; Stufe-1/2/3 jeweils eigene Sätze.

## Technische Details

**Neue Dateien:**
- `src/game/hints.ts` — Quest-Definitionen, Helfer, UI-Texte

**Geänderte Dateien:**
- `src/components/game/HelpOverlay.tsx` — Tab-Switcher, neuer Tipps-Pane, Prop `initialTab?: "cheatsheet" | "hints"`
- `src/components/game/TopBar.tsx` — neuer "Stuck?"-Button mit Lightbulb-Icon, ruft `onOpenHelp("hints")`
- `src/components/game/Game.tsx` — `helpOpen`-State erweitern um initialTab (z. B. `helpOpen: false | "cheatsheet" | "hints"`)

**Keine Änderungen an:**
- `src/game/types.ts` — keine neuen StoryFlags nötig, Hints lesen die existierenden
- `GameContext` — `api` reicht aus, kein neuer State

## Erweiterbarkeit

Wenn später Akt II / III dazukommen, einfach weitere Einträge in `hints.ts` ergänzen — die UI bleibt unverändert. Wenn ein Rätsel mehrere Lösungspfade hat (wie B3 vs. Bürokratie-Duell), bekommt jeder Pfad einen eigenen Quest-Eintrag mit eigenem Aktiv-Prädikat; der Spieler sieht beide nebeneinander, falls beide offen sind.

## Out-of-Scope (für später)

- Kein "Achievement"-System à la "ohne Tipps gespielt".
- Keine adaptiven Tipps basierend auf Verweildauer ("Du bist seit 10 Min in derselben Szene…").
- Kein Voice-over für Hints.
