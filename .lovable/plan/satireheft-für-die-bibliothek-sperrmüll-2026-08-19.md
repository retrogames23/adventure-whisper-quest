# Satireheft für die Bibliothek: „SPERRMÜLL"

Ein ausleihbares Comic-/Satireheft im Geist von Titanic und MAD, aber vollständig aus unserer Welt heraus gedacht: illegal-geduldetes Heft aus dem Mandatsgebiet, das die Sprache der Verwaltung und das Fernsehprogramm parodiert.

## Das Heft

- Titel: **SPERRMÜLL — Das Heft, das nicht vorgesehen ist**
- Herausgeber: „Redaktionskollektiv Hinterhof C" · „Nr. 43 · Herbst 1996"
- Impressum-Gag: „Zur Kenntnis genommen. Eine Genehmigung liegt nicht vor. Eine Ablehnung ebenfalls nicht."
- Maskottchen (MAD-Rolle): **Kalle Nichtzuständig**, ein grinsender Sachbearbeiter mit abstehenden Ohren; Wahlspruch: „Wieso ich?"
- Ton: albern, aber nie zynisch gegen die Bewohner — die Verwaltung ist das Ziel, nicht die Leute in der Schlange.

## Inhalt (Kapitel = Heftseiten)

1. **Titelseite / Impressum** — Kalle Nichtzuständig, Heftmotto, Preis („1 Marke oder ein gleichwertiges Nicken").
2. **„Sektorbericht" (Parodie ZDS)** — Comic-Strip: Sprecher verliest Meldungen, bis der Teleprompter nur noch „es wird zur Kenntnis genommen" zeigt. Übernimmt Tonfall und Meldungsbau des echten ZDS-Programms, inklusive einer Verkehrsmeldung, die sich selbst widerspricht.
3. **„Bürgerfunk, aber ehrlich"** — Hörerzuschriften-Parodie: drei Zuschriften, die alle dasselbe Anliegen in immer korrekterem Mandatsdeutsch formulieren, bis niemand mehr versteht, worum es geht.
4. **„Wetter & Resonanz"** — Wetterkarte-Strip: Resonanzwarnstufen für Gefühle („Örtlich Sehnsucht, gegen Abend nachlassend"). Doppeldeutigkeit des Resonanz-Begriffs als Motor.
5. **„Spion gegen Spion" ↔ „Sachbearbeiter gegen Sachbearbeiter"** — Wortlose Panelfolge: zwei Beamte reichen einander einen Vorgang, bis beide im Papier verschwinden.
6. **Fold-in-Seite** — Textseite mit Falzanleitung: gefaltet ergibt der lange Satz einen kurzen. Wird als Vorher/Nachher gedruckt.
7. **Kleinanzeigen & Leserbriefe** — „Tausche Sprawka gegen Naryad", Leserbrief einer Behörde, die sich über die Darstellung von Behörden beschwert und dabei alles bestätigt.
8. **Rückseite** — Kalle im Wartebereich, letzter Gag.

Die TV-Parodien orientieren sich an den tatsächlich im Spiel laufenden Programmtexten (ZDS · Sektorbericht, Bürgerfunk Sektor 28, Wetter & Resonanz), damit Spieler die Vorlage wiedererkennen; ältere Fassungen aus der Versionsgeschichte dienen als zusätzliches Material.

## Technische Umsetzung

- Neuer Eintrag in `src/game/libraryE71Books.ts` (id `sperrmuell`, Item `buchSperrmuell`, Katalogtext) — damit erscheint es automatisch bei Herbert (Ausleihe/Rückgabe), im Karteikasten und am Lesetisch.
- Neues Item-Id `buchSperrmuell` in `src/game/types.ts` (`InventoryItemId`).
- Inhalt als neues Kapitel-Set in `src/game/books/libraryBooks.ts` (gleiche `registerLibraryBook`-Mechanik wie die anderen Titel), eigener `BookUiText` mit Heft-Vokabular: „Seite", „Heftinhalt", „Ausgabe 43".
- Panels werden mit den vorhandenen Markup-Mitteln gesetzt (Zitatzeilen `>`, Listen, kursiv/fett) — Sprechblasen als `SPRECHER: „…"`-Zeilen, Bildbeschreibungen kursiv in eckigen Klammern, wie ein gedrucktes Comic-Skript.
- 3–4 Illustrationen im Stil vergilbter Untergrund-Heftdrucke (Titelseite mit Kalle, TV-Studio-Strip, Wetterkarte, Rückseite) unter `src/assets/books/` und als Kapitelbilder eingebunden.
- Kein Eingriff in Dialoge oder Szenen nötig; `lore:check` läuft nach der Ergänzung mit.
