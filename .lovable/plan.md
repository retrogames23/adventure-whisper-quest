# LORE.md aktualisieren — neue Welt-Fakten aus Büchern & Spielinhalten nachziehen

Seit der letzten Fassung (2026-08-10) ist über die Bewohnerbibliothek E71, die
TV-Sender und neue Räume viel Lore fest geworden, die in LORE.md noch fehlt.
Ziel: die Wahrheitsquelle wieder vollständig — ohne bestehende Aussagen
umzuschreiben, nur ergänzen und zwei Stellen präzisieren.

## Was ergänzt wird

### 1. Neuer Abschnitt „Technikgeschichte dieser Welt"
- **Rechnen:** Die Von-Neumann-Architektur hat sich nie durchgesetzt. Aiken
  (Harvard Mark) und Zuse setzten die strikte Trennung von Programm- und
  Datenspeicher durch → „Reine Harvard-Bauweise". Ab den 1970ern
  Datenfluss-Maschinen (Knoten feuern, wenn Eingangsdaten vollständig sind),
  Intels asynchroner **Matrix-1** (64 Kerne, kein globaler Takt), heute (1997)
  **Cellular Arrays** aus Milliarden Knoten. Folge: eingeätzte KI ist seit den
  80ern Alltag, Schadcode als getarnter Datenstrom ist physikalisch unmöglich,
  ZENTRAL.NETZ/CENTRALOS laufen auf dieser Basis. Quelle: „Der gespaltene
  Geist" (Vossen, 1997).
- **Automobil:** Der Rotationskolbenmotor (Wankel) ist Weltstandard.
  Keramik-Dichtleisten 1968, Schichteinspritzung 1971, Chevrolet Vega 1972 als
  Durchbruch, Ölkrise 1973 als Beschleuniger, Golf II ab 1983 mit
  Zweischeiben-Rotationsmotor. 1997: über drei Viertel aller Neuwagen,
  Hubkolben nur noch bei Lkw/Traktor; erste Wasserstoff-Flotten von Mazda und
  BMW. Straßenklang: Reifen statt Zylinder. Quelle: „Das drehende Dreieck"
  (Rothstein, 1997).

### 2. Neuer Abschnitt „Mandatsdeutsch"
Sprache entstand am Schalter, nicht auf der Straße. Lehnwörter aus vier
Amtssprachen (*Sprawka, Naryad, Kontingent, Ressort, Dossier, in Regel, Case,
Track, gecleart*), Grammatik der Unzuständigkeit („es ergeht Ablehnung"),
dreistufige Höflichkeit („Das wäre möglich" / „Das ließe sich prüfen" / „Das
ist nicht vorgesehen"), Jugendsprache („Alles in Regel?", „anquatschen",
„angeben"). Mit Anwendungsregel: sparsam einstreuen, immer aus dem Kontext
verständlich. Quelle: „Mandatsdeutsch" (Ternes, 1993).

### 3. Abschnitt „Resonanz" korrigieren
Der bisherige Text bindet Resonanz zu eng ans Schmerz-Radio. Neu als eigener
Abschnitt mit der Begriffsgeschichte:
- **1956er Lesart (Brennwald):** rein bau-akustisch/medizinisch — Dämmen,
  Lüften, Abstandhalten, Ruhepausen.
- **Wandel bis 1997:** absichtlich schillernder Doppelbegriff (bau-akustisch +
  soziales Klima), mit dem der Mandatsrat Ruhezeiten, Belegungsdichte und
  Türsiegel regelt, ohne zuzugeben, Menschen zu regulieren.
- Feste Begriffe: Resonanzindex (TV-Bericht), Resonanz-Hygiene,
  Resonanz-Überlastung (medizinischer Vorgang).
- Schmerz-Radio bleibt eine Randnische *innerhalb* dieses Begriffs, nicht seine
  Quelle. (Deckungsgleich mit `mem/features/resonanz.md`.)

### 4. Wirtschaft & Alltag ergänzen
Drei-Systeme-Bild aus „Ordnung und Eigentum" (1995): USA = Markt/Vertrag,
UdSSR = Plan/Verteilung, Mandatsgebiet = Eigentum unter Verwaltung („Risiko
trägt, wer gerade das Formular in der Hand hat"). Dazu Bürokratie-Ethos aus
„Lob des Vorgangs".

### 5. Kleinere Nachträge
- **Bewohnerbibliothek 1101 in E71** und Bibliothekar **Herbert** (Ausleihe)
  ins Ortsverzeichnis bzw. Personenverzeichnis.
- **Setsuko Arai**, Künstlerin in E71/1102, erster Hinweis auf das Kollektiv
  **„Zero is Infinity"** (existiert, Layard kennt es nicht) ins
  Personenverzeichnis.
- **TV-Programme:** ZDS · Sektorbericht, Bürgerfunk, Wetter & Resonanz.
- **Blockfall** als verbreitetes Terminal-Spiel (Bürgerfunk-Turniere).
- Zeitstrahl-Präzisierung: Pazifikkrieg endet 1946 durch Verhandlungen (bereits
  im Buch „Die kürzeste Geschichte der Menschheit" gesetzt) — Formulierung mit
  dem Buch abgleichen.
- **Änderungs-Historie** um einen Eintrag mit heutigem Datum erweitern.

## Technisches

Nur `LORE.md` wird geändert (Ergänzungen + Umbau des Resonanz-Teils in §7).
Keine Spiel-Logik, keine Dialoge. Anschließend `scripts/lore-check.mjs`
laufen lassen, falls es auf LORE.md prüft.
