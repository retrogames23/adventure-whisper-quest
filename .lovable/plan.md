# Zentralverwaltungsstelle Sektor 28 — Schauplatz, Empfang, Sachbearbeiterin 5011

## Was entsteht

**1. Vorplatz (Außenansicht)**
Neuer Schauplatz, optisch analog zum Kartenbild: langer Verwaltungsbau im Norden, Kolonnade, drei Eingänge (zwei geschlossen), Vorplatz mit Betonplatten und Fahnenmast ohne Fahne. Erreichbar über die Karte (Zentralverwaltungsstelle ist bisher „geplant, nicht begehbar“ — wird freigeschaltet, Anreise über die Buslinie 28 wie bisher). Hotspots: Hauptportal (rein), geschlossene Seitentüren, Aushangkasten, Blick zurück auf die Magistrale.

**2. Forum mit Empfang**
Große Halle im Duktus eines deutschen Gerichtsgebäudes: Steinboden, hohe Fenster, Empfangstresen mit Glasscheibe und Sprechmuschel, Wartebänke, Wegweisertafel mit Zimmernummern. Der Empfang begrüßt mit „Ihr Anliegen?“, prüft Layards Recherche-Schreiben und verweist ihn an **Sachbearbeiterin, Zimmer 5011**. Ausgänge: Portal zurück nach draußen, Treppe/Gang zu 5011.

**3. Zimmer 5011**
Sachbearbeiterin, ca. 55, sehr korrekt, freundlich, keine Bedrohung — genau das macht sie gefährlich. Sie nimmt zu Protokoll und fragt Layard systematisch alles ab, was er über die Resonanzüberlastung weiß.

## Wissens-Flag-System (neue Grundlage)

Bisher existieren nur drei `KnowledgeFlag`-Werte. Daraus wird ein eigenes, ausbaufähiges System:

- Ein zentrales Register mit einem Eintrag pro Wissensstück: ID, Kurzformulierung („Was Layard sagen würde“), Herkunft, Brisanz.
- Wissen wird an bestehenden Stellen gesetzt, an denen Layard es tatsächlich erfährt (Protokoll, Walters Peilung, Mira, Bodo, Philippe, Sanitäter-Vorfall, Vossbecks Auftrag).
- Zusätzlich wird pro Eintrag mitgeführt, ob Layard ihn **geteilt** oder **verschwiegen** hat, und gegenüber wem.

**Gesprächsmechanik in 5011:** Für jedes Wissensstück, das Layard besitzt, erscheint die Frage der Sachbearbeiterin und darunter zwei Optionen — offenlegen oder ausweichen/verschweigen. Beide Wege sind spielbar, keiner wird bestraft; die Entscheidung wird nur vermerkt. Wissen, das Layard nicht hat, taucht gar nicht auf. Am Ende fasst sie zusammen, was „zu Protokoll genommen“ wurde, und stellt eine Bescheinigung aus.

„Zero is Infinity“ bleibt bewusst außen vor — der Eintrag existiert im Register, wird in 5011 aber noch nicht abgefragt. Die spätere Verratsentscheidung baut auf demselben System auf.

## Technische Umsetzung

- Drei Bilder generieren: `scene-zvs-exterior.jpg`, `scene-zvs-forum.jpg`, `scene-zvs-5011.jpg` — Stil und Bauform passend zum Kartenrender bzw. zu den bestehenden Innenraum-Assets.
- Neue Szenendatei `src/game/scenes/zentralverwaltung.ts`, eingehängt in `src/game/scenes/index.ts`; drei neue `SceneId`-Werte in `src/game/types.ts`.
- `src/game/mapSector28.ts`: `travelPending` beim Eintrag `zentralverwaltung` entfernen, `travelTo` auf den Vorplatz setzen (`farAway` bleibt → Bus-Szene).
- Neues Modul `src/game/knowledge.ts`: Register aller Wissenseinträge plus Hilfsfunktionen (welche Einträge hat Layard, wurde geteilt/verschwiegen).
- `KnowledgeFlag` in `types.ts` auf die neuen IDs erweitern (bestehende drei bleiben gültig); `GameContext` bekommt zusätzlich einen Disclosure-Zustand, der wie `knowledge` gespeichert und geladen wird.
- Dialoge in `src/game/dialogs/zentralverwaltung.ts`: Empfang und Sachbearbeiterin 5011, Registrierung über `src/game/dialogs/index.ts`.
- Sprache durchgehend Präteritum-freies Spielpräsens wie im Rest, mit dosiertem Mandatsdeutsch beim Empfang und in 5011.
