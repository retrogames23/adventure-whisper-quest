# Plan: Alle Bücher zu "richtigen Büchern" ausbauen

## Aktueller Stand

- **"Die kürzeste Geschichte der Menschheit"** ist bereits ein vollständiges Buch: Titel, Untertitel, Kapitel mit Kurz- und Langtiteln, Absätzen, optionalen Tafel-Bildern und Seitennavigation.
- **E67-Handbuch** und **Sektoren-Almanach** sind ebenfalls lesbar, aber technisch über separate Pfade im GameContext verdrahtet.
- Die **vier Bibliotheksbücher** in E71 (Raum 1101) sind nur Katalogeinträge in `libraryE71Books.ts`: Titel, Autor, Jahr, Blurb, Ausleihstatus. Herbert zeigt beim "Ansehen" lediglich Titel + Blurb an.
- Es gibt noch kein Spieler-Inventar für Bücher und keine einheitliche `openBook`-API.

## Ziel

Jedes Buch im Spiel wird zu einem "richtigen Buch": lesbare Kapitel, konsistente Buch-UI, klare Regeln für Ausleihe vs. Präsenzbestand.

## Phase 1: Einheitliches Buch-System (technische Grundlage)

1. Neuen Typ `ReadableBook` definieren, der `HandbookChapter` erweitert und Metadaten enthält: `id`, `title`, `subtitle`, `author`, `year`, `lendingStatus`, `locationHint`.
2. Zentrale Buch-Registry anlegen (z. B. `src/game/books/index.ts`), in der alle lesbaren Bücher registriert sind.
3. Einheitliche `openBook(bookId)`-API im `GameContext` ergänzen, die jedes Buch über das bestehende Buch-Overlay öffnet.
4. `E67-Handbuch`, `Sektoren-Almanach` und `Die kürzeste Geschichte` auf das neue System migrieren.
5. `BookSwitcher` im Dev-Modus auf das neue System umstellen, damit er jedes Buch direkt öffnen kann.

## Phase 2: Bibliotheksbücher mit Volltext erstellen

Für jedes der vier Bibliotheksbücher werden Kapitel und lesbarer Volltext geschrieben. Vorschlag für Umfang und Gliederung:

### 1. "Listen aus Uruk — Verwaltung vor der Literatur" (M. Ehrenhart, 1981)
- Ca. 4-5 Kapitel
- Vorgeschlagene Gliederung: Die Erfindung der Schrift, Uruk um 3300 v. u. Z., Tontafeln im Alltag (Gerste, Bier, Schafe, Schulden), Von der Liste zum Epos, Herbert-Anhang: Faksimile einer Tafel.

### 2. "Schmalspur — Nebenbahnen Mitteleuropas 1890–1946" (K. Obholz, 1974)
- Ca. 4-5 Kapitel
- Vorgeschlagene Gliederung: Entstehung der Nebenbahnen, Typische Strecken im Mandatsgebiet, Stilllegung nach 1945, Fahrpläne als Zeitzeugen, Anhang: Ausgewählte Streckenpläne.

### 3. "Resonanzhygiene — Ein Leitfaden für den Einzelnen" (Dr. med. H. C. Brennwald, 1956)
- Ca. 5-6 Kapitel
- Vorgeschlagene Gliederung: Was ist Resonanz?, Lüften und Dämmen, Abstandhalten, Ruhepausen, Zugelassene Schirme und Dichtungen, Anhang: Checkliste für den Haushalt.

### 4. "Der gespaltene Geist — Eine Geschichte der Datenfluss-Maschinen" (S. R. Vossen, 1997)
- Ca. 6-8 Kapitel
- Vorgeschlagene Gliederung: Das geheime EDVAC-Dokument, Aiken und Zuse: getrennte Speicher, Die Datenfluss-Revolution, Intels asynchroner Matrix-1, Cellular Arrays, MARV und eingeatzte KI, Programmierparadigmen der Gegenwart.

Optional: Pro Buch 1-3 Tafel-Illustrationen erzeugen (Aufwand pro Buch ca. +30-50%).

## Phase 3: Ausleihe und Inventar

1. Spieler-Inventar für Bücher einführen (`inventory.books: string[]`), persistent über den aktuellen Spielstand.
2. Ausleihbare Bücher (grüner Punkt) können bei Herbert mitgenommen werden.
3. Präsenzbestand kann nur am Lesetisch in der Bibliothek gelesen werden.
4. Ausgeliehene Bücher erscheinen im Apartment-Wandregal und sind dort erneut lesbar.
5. Rückgabe-Mechanik: entweder manuell bei Herbert oder automatisch am Akt-Ende.

## Phase 4: UI- und Szenen-Integration

1. Herbert-Dialog: "Buch ansehen" öffnet das Buch-Overlay statt `showText`.
2. Lesetisch-Hotspot: Zeigt Präsenzbestand als Liste; Auswahl öffnet das Buch.
3. Karteikasten-Hotspot: Zeigt den Katalog; Auswahl öffnet entweder Buch (Zugang) oder nur Blurb (kein Zugang).
4. Apartment-Wandregal: Zeigt ausgeliehene/gelesene Bücher als zusätzliche Hotspots.
5. `BookSwitcher` im Dev-Modus listet alle Bücher und öffnet sie direkt.

## Aufwandsschätzung

| Phase | Geschätzter Aufwand |
|-------|---------------------|
| Phase 1: Einheitliches System | 1-2 h |
| Phase 2: Vier Bibliotheksbücher (Text) | 4-6 h |
| Phase 2: Illustrationen (optional) | +3-5 h |
| Phase 3: Ausleihe & Inventar | 2-3 h |
| Phase 4: UI-Integration | 1-2 h |
| **Gesamt ohne Illustrationen** | **8-13 h** |
| **Gesamt mit Illustrationen** | **11-18 h** |

## Offene Fragen vor Start

1. Sollen alle vier Bibliotheksbücher weiterhin ausleihbar sein, oder sollen einige als Präsenzbestand bleiben?
2. Sollen die neuen Bücher eigene Tafel-Illustrationen bekommen?
3. Soll Layard ausgeliehene Bücher physisch im Inventar tragen und im Apartment lesen können?
4. Soll es eine Rückgabe-Pflicht geben, oder bleiben Bücher dauerhaft im Inventar?
5. Passt die vorgeschlagene Kapitelanzahl pro Buch, oder sollen einige kürzer/länger werden?
