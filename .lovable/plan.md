## Ausgangslage Akt I

Die meisten Akt-I-Aufgaben sind „hol mir das"-Quests (Protokoll, Sektor-Code, B3-Vollmacht, Tilla-Quittung). Echte Knobel-Momente gibt es bisher nur einen:

- `pencilStub + b3Authorization + quittungBlankoB → siegelAbdruck` (Trockensiegel-Abrieb)

Was fehlt: ein zweites Item-Kombi-Rätsel mit „Aha"-Effekt **und** ein eigenständiges Mini-Rätsel mit erkennbarer Mechanik (Monkey-Island-Schwertkampf-Vibe), das in die Welt passt.

## Vorschlag: zwei neue Akt-I-Rätsel

### Rätsel 1 — „Das Bürokratie-Duell" (Mini-Game in der Kantine)

**Setting:** Kantine 3602. Brust (Schicht A, Paragraphenreiter) blockt Layards B3-Vollmacht ab („Vollmacht 4317. Schicht A. Heute Schicht B. Ich kann das nicht."). Kowalk steht im Hintergrund und hört amüsiert zu — sie greift nur ein, wenn Layard sich behauptet.

**Mechanik (Monkey-Island-Schwertkampf-Adaption):**
Ein verbales Duell, ausgetragen in **Verwaltungs-Floskeln**. Brust eröffnet mit einer Paragraphen-Behauptung („Diese Charge ist seit 6:00 nicht mehr im Sortiment."), Layard muss aus 4 Antwortoptionen die *konternde Floskel* wählen, die formal die Behauptung entkräftet. Trifft er drei Runden hintereinander, gibt Brust auf — und Kowalk trägt B3 über ihren Kanal aus.

- **Pool:** 8–10 Brust-Eröffnungen × jeweils eine korrekte Konter-Floskel + drei plausible Falschantworten.
- **Lerneffekt:** Konter werden während des Duells eingesammelt — entweder durch (a) Lesen des E67-Handbuchs (neuer Abschnitt „Beschwerdewege & Schicht-Übergaben"), (b) Insas Telefonate, (c) Helkas Tür-Tipps. Wer alle Quellen abklappert, kennt die Konter; wer ohne Vorbereitung antritt, bluffed sich höchstens zu einem oder zwei Treffern.
- **Fail-State ist nicht tödlich:** Bei 3 Fehlern bricht Brust das Gespräch mit „Bitte verlassen Sie die Ausgabezone." ab. Layard kann es nach kurzer Cooldown-Zeit (oder nach dem Lesen einer weiteren Quelle) erneut versuchen. **Kein Hard-Lock.**
- **Belohnung:** Bisheriger Pfad (Trockensiegel-Abrieb → Quittung 4317 fälschen) bleibt als *zweite Lösung* bestehen — wer das Duell gewinnt, kann das Fälschen überspringen. Wer fälscht, kann das Duell überspringen. **Zwei Wege zum Ziel** (klassisches Adventure-Design).
- **Witz:** Die Konter sind absurd-bürokratisch („Ich verweise auf §3 Abs. 4 der Schichtübergabeordnung, Variante kulant.") und werden von Kowalk mit kleinen, halblauten Kommentaren begleitet („Den hatte ich noch nie gehört, Brust."). Brusts Mimik-Beschreibungen eskalieren von steif → schwitzend → resigniert.

### Rätsel 2 — „Die falsche Frequenz" (Kombi-Rätsel mit Aha)

**Setting:** Layard hat den `tuningCrystal` (Bernstein) und das `flyer` (Z.K.S.-Flugblatt). Aktuell beide nur Reaktions-Items. Neues Rätsel: Eine bisher unzugängliche, kurze Audio-Botschaft auf einer **Phantom-Frequenz** (knapp jenseits 104,6) freischalten.

**Mechanik:**
- Layard muss `tuningCrystal` mit `radio` kombinieren (existiert bereits als reine Flavor-Reaktion) — neu: dabei wird die Skala um eine versteckte Position erweitert (z. B. 104,7 wird klickbar).
- Auf 104,7 hört man nur Rauschen — bis Layard zusätzlich `flyer` mit `radio` kombiniert (Z.K.S.-Code als „Schlüsselwort" auf der Rückseite). Dann wird aus dem Rauschen ein 20-Sekunden-Snippet einer Z.K.S.-Botschaft, die einen **Hinweis auf den Sektor-Code** gibt — als alternative Quelle zu Insas Mail.
- **Nicht zwingend:** wer den Code sowieso über Insa+Knoten 5610 holt, verpasst nur eine optionale Vertiefung. Wer das Rätsel löst, bekommt früher Zugang **und** erfährt narrativ etwas über Z.K.S. (Belohnung in Lore, nicht in Progress).

**Warum das passt:** Tuning-Kristall + Flugblatt sind beide schon im Spiel, beide haben thematische Nähe zur Frequenz/Resonanz, beide wirken bisher unterausgenutzt. Das Rätsel macht aus zwei Flavor-Items eine echte Kombination.

## Was ich nicht vorschlage

- **Keine** neuen NPCs oder Räume — beide Rätsel nutzen vorhandene Schauplätze (Kantine, Apartment).
- **Keine** Akt-Verlängerung — beide Rätsel sind optional/parallel zum bestehenden Pfad.
- **Kein** Game-Over-Risiko — Akt I bleibt auch für Spieler:innen lösbar, die ein Rätsel verfehlen.

## Technische Umsetzung (Stichpunkte für die Build-Phase)

**Rätsel 1 — Bürokratie-Duell:**
- Neuer Overlay-Component `src/components/game/BureaucracyDuelOverlay.tsx` (analog `DialogOverlay`, mit 4 Antwort-Buttons).
- Neue Datendatei `src/game/bureaucracyDuel.ts`: Array von Runden `{ brustOpening, counters: [{text, isCorrect, learnedFrom}] }`. **i18n-konform** — alle Strings als ganze Sätze in dieser Datei, keine JSX-Strings im Overlay.
- Neue Flags: `duelStarted`, `duelWon`, `duelLost`, `learnedCounter1..N`.
- Trigger: Im Brust-Dialog (`cafeteriaBrust` in `dialogs.ts`) bei Vollmacht-Übergabe neuer Zweig „Sie wollen das nicht akzeptieren? — [Duell starten]".
- Sieg-Pfad: setzt `gotB3Ration` direkt (überspringt Trockensiegel-Pfad).

**Rätsel 2 — Falsche Frequenz:**
- `RadioPanel.tsx`: zusätzliche Frequenz-Position 104,7, sichtbar/klickbar nur wenn `flag: tuningCrystalAppliedToRadio`.
- `combine.ts`: `tuningCrystal × radio` setzt diese Flag (statt nur Flavortext); `flyer × radio` setzt zweite Flag `flyerKeywordKnown`.
- Bei `freq === 104.7 && tuningCrystalAppliedToRadio && flyerKeywordKnown`: 20-Sekunden-Audio (oder Text-Sequenz, falls kein Audio-Asset gewünscht) mit Z.K.S.-Botschaft, anschließend `setKnowledge("frequencyControl")` und neuer Inventar-Eintrag „Frequenz-Notiz" mit Sektor-Code-Hinweis.
- Texte in `cutscenes.ts` als `ZKS_BROADCAST_LINES` ablegen.

**Handbuch & Hinweis-Streuung:**
- `src/game/e67Handbook.ts` um Abschnitt „Beschwerdewege & Schicht-Übergaben" ergänzen (liefert 2 von ~6 Konter-Floskeln).
- Helka-Dialog (2610) und Insa-Telefonat um je 1–2 Konter-Hinweise erweitern.

## Frage vor der Umsetzung

Soll ich **beide** Rätsel in einem Schritt einbauen, oder erst Rätsel 1 (Bürokratie-Duell — größerer Umfang, mehr Wow-Effekt) und Rätsel 2 in einer separaten Runde danach? Mein Vorschlag: erst Rätsel 1 vollständig, weil das Duell mehr Tuning braucht (Schwierigkeitskurve, Hinweis-Verteilung); Rätsel 2 ist mechanisch kleiner und passt gut als zweite Iteration.