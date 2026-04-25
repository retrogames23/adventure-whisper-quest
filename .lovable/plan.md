
# Konsistenz-Audit: Story, Rätsel & Dialoge

Read-only Durchsicht von `dialogs.ts`, `scenes.ts`, `Terminal.tsx`, `NodeTerminal.tsx`, `RadioPanel.tsx`, `newsProgram.ts`, `filesystemWorag.ts`. Unten die Funde — sortiert nach Schwere — mit konkretem Lösungsvorschlag. Keine Code-Änderungen ohne Freigabe.

---

## A. Echte Widersprüche / Plot-Holes

### A1. Zwei "Stegmann" — niemand bemerkt es
Schwere: **hoch** (verwirrt jeden aufmerksamen Spieler).

- `dialogs.ts:477` — Telefon-Pfad A: *"Hier ist die technische Unterstützung des Zentralen Netzes, **Stegmann** am Apparat."*
- `dialogs.ts:1335ff` — Büro 1534 in E71: *"**Mikael Stegmann**"* (Abschnittsverantwortlicher).
- Insa schickt Layard zu "Herrn Stegmann, Zimmer 1534" (`reception.r2`, `receptionUnannounced.ru2`), als wäre das selbstverständlich derselbe.
- Nirgends im Spiel wird die Doppelung adressiert. Es sind im Code aber zwei verschiedene Personen mit zwei verschiedenen Funktionen (Zentral-IT vs. Verwaltung).

**Lösung A1 — drei Optionen, eine empfohlen:**
- **(empfohlen)** Den IT-Stegmann umbenennen, z.B. `MERWING` oder `THEILEN`. Dann ist „Stegmann“ eindeutig der müde Mann hinter dem Schreibtisch in 1534. Mini-Edit, keine Logik-Änderung.
- Alternativ: explizit als Zwillingsmotiv nutzen — Insa kommentiert beim 2. Anruf trocken („Nein, der andere Stegmann. E71. Mein Beileid.“). Sehr stimmig zur Welt, aber mehr Schreibarbeit.
- Schlechteste Option: ignorieren und hoffen, dass es niemand merkt.

---

### A2. „Stegmann hat heute viel auf dem Tisch“ vs. Insas tatsächliches Wissen
Schwere: **mittel**.

`reception.r4` und `receptionUnannounced.ru7`: *"Herr Stegmann hat heute viel auf dem Tisch. Halten Sie es bitte kurz."* — die Empfangsdame sagt das routiniert. Aber `insaAct2Return.ar5` macht klar: Insa ist *nicht* überrascht, dass Mikael nichts annimmt. Die Empfangsdame redet wie jemand, der nicht weiß, dass Mikael strukturell zusammenbricht — Insa weiß es seit elf Monaten. Beides für sich plausibel, aber die Empfangsdame hört sich naiver an als das Setting es zulässt.

**Lösung A2:** Einen Halbsatz in `r4`/`ru7` einfügen, der die müde Komplizenschaft zeigt: *"Herr Stegmann hat heute viel auf dem Tisch. Wie jeden Tag. Halten Sie es bitte kurz."* — kostet nichts, schließt die Ton-Lücke.

---

### A3. „Den Code extra für Sie geändert“ — auch im Skip-Pfad
Schwere: **mittel**.

`insa2.x4`: *"Ich habe den Code extra für Sie geändert."* Diese Zeile läuft auch dann, wenn Layard den Insa-Pflicht-Pfad genommen hat (also keinen `troubleReported`-Standardweg) und Insa ihn ohnehin schon halb-illegal unterstützt. Kein Widerspruch — aber das „extra“ verliert Gewicht, weil sie es mehrfach einsetzt.

**Lösung A3:** Im Skip-Pfad (`x2alt → x3 → x4`) eine alternative Variante von `x4`, z.B. *"Den Code lege ich Ihnen ins Terminal — denselben, den ich heute Morgen schon umgestellt habe. Sie wissen schon: das Datum."* So bleibt das „extra für Sie“ ein Standardweg-Detail.

---

### A4. „Aufzug-Log“ erwähnt, ohne dass es einen Aufzug-Log gibt
Schwere: **niedrig** (nur subtext).

`insaAct2Return.ar2` subtext: *"Sie hat den Aufzug-Log auf dem Schirm."* — schöne Geste, aber: Layard fährt von E71 nicht per Aufzug zurück, sondern durch die Sektor-Tür → Passage → Lobby → Aufzug. Was Insa wirklich auf dem Schirm haben kann, ist die Passage-Türöffnung oder das Empfangs-Log E71.

**Lösung A4:** Subtext minimal anpassen: *"Sie hat das Übertritts-Log E71 auf dem Schirm."* Bleibt dieselbe Pointe.

---

### A5. Insa „weiß“ Dinge, die sie nicht wissen kann
Schwere: **mittel**, nur in einer Stelle problematisch.

`insaReminder5610.r2` subtext: *"Worag. Sie haben noch nichts für mich. **Ich höre es an Ihrer Stimme.**"* Nett, aber inkonsistent mit Insas sonstiger Logik (`insaAct2Return`: sie kennt den Übertritt aus dem Log, sie kennt Mikaels Stapel aus elf Monaten Erfahrung). Hier wird sie plötzlich zur Wahrsagerin.

**Lösung A5:** Ersetzen durch Material-Logik: *"Worag. Der Knoten 5610 zeigt im Wartungs-Log noch keinen tap. Ich kann Ihnen den Code nicht geben."* Macht Insa konsistent als jemand, die mit Logs und Listen arbeitet.

---

## B. Rätsel-Logik / Softlocks & Doppelpfade

### B1. Wartungskarte vom Bodo-Pfad UND vom Philippe-Pfad
Schwere: **niedrig** (kein Bug, aber Doppelung).

`wartungsnotiz5610` wird vergeben:
- über Philippe-Sondierungen (≥ 3 Probes → `dialogs.ts:18`)
- über Bodo-Terminal-Pfad (`Terminal.tsx:2403` — wenn Layard an Bodos Rechner sitzt und etwas tut).

Dazu gibt es Pfad (1) Insas Wartungs-Override und Pfad (3) saw5610Door ohne Eintritt. Das sind effektiv **drei** Wege rein. Solid für Anti-Softlock — aber narrativ ist die Karte zweimal „Bodos zweite Wartungskarte aus der Schublade“ und einmal „Philippe drückt sie ihm in die Hand“ — was die Beschreibung nicht hergibt (`"Eine abgegriffene blaue Plastikkarte aus Bodos zweiter Schublade. Auf der Rückseite mit Bleistift: »5610 · nur Bodo«."`).

**Lösung B1:** Bei Vergabe über die Philippe-Spur Item-Beschreibung leicht anders formulieren: Layard *erinnert sich*, dass Philippe ihn ausgefragt hat *"als hätte er die Karte schon halb in der Hand"* — und findet sie schließlich beim eigenen Wäschestapel/Postfach mit handschriftlichem Hinweis. Oder schlanker: Vergabe-Quelle vereinheitlichen — die Karte kommt **immer** aus Bodos Schublade, nur auf dem Philippe-Pfad lässt Layard sie sich vom Hausmeister mitgeben.

---

### B2. Pfad-A („Standardweg“) ist obligatorisch lang, Pfad-B („direkt nach Code fragen“) verlangt 5610-tap — beides okay, aber undokumentiert
Schwere: **niedrig** (nur UX).

- Pfad A: `calledStegmann ∧ centralOsUpdated ∧ troubleReported ∧ reportedExit` → `insa2` ohne tap-Pflicht.
- Pfad B: direkt `idCode1` → tap-Pflicht.

Wer Pfad A geht, **muss nie zum Knoten 5610**. Wer Pfad B nimmt, muss. Das ist absichtlich — aber: Der Pfad-A-Spieler bekommt nie die Erkenntnis `radioOrigin`. Damit fehlen ihm die `burnedAndOwned/Dodged`-Folgesequenzen weitgehend, weil er den Knoten gar nicht finden muss.

**Lösung B2:** Akzeptabel, aber dokumentieren — z.B. eine Mira-Zeile, die Pfad-A-Spielern beim zweiten Treffen nahelegt, „auch mal eine Etage höher“ zu schauen (sie tut das schon mit `ma2..ma4`, aber nur bei `tookFlyer`). Alternative: am Ende von Pfad A eine Insa-Bemerkung („Sie waren gar nicht oben, Herr Worag. Schade.“), die das Nicht-Finden honoriert.

---

### B3. „burnedAndOwned/Dodged“-Verzweigung wird beim Spieler kaum erklärt
Schwere: **niedrig-mittel**.

Beide Flags entstehen in `NodeTerminal` nach `burn confirm` (Zeilen 3410/3417 dialogs.ts), je nachdem ob Layard im Folgedialog dazu steht oder ausweicht. Mikael (`mr4burnA/B`) und Insa (`ar10burnA/B`) reagieren spezifisch — sehr schön. Aber: für Spieler, die **nicht** burnen, gibt es bei beiden Stellen keinen Beat, der das Nicht-Burnen würdigt. Mikaels „Sie haben den Knoten weggeschossen“ ist grandios; was sagt er, wenn Layard nur getappt hat? → er springt direkt zu `mr5`, was technisch korrekt, aber dramaturgisch flach ist.

**Lösung B3:** Optional einen `mr4tappedOnly`-Beat einfügen: *„Sie waren oben. Sie haben gehört, was läuft. Und sind trotzdem hier, mit der Kapsel. Das ist seltener, als Sie denken.“* — würde die `tap`-Entscheidung als eigene moralische Position markieren.

---

### B4. Telefon-Hotspot-Resolution-Reihenfolge in `apartment` ist fragil
Schwere: **mittel** (potenzielle UX-Falle, kein harter Softlock).

`scenes.ts:60-102` priorisiert `mikaelRejectedProtocol → calledInsa2 → tappedNode5610+!calledForCode → standardpath → insaSentTo5610-reminder → insaDispatch`. Edge-case: Wenn Layard auf Pfad B den `idPflicht4`-Skip hat (`tappedNode5610` ist gesetzt, weil er den Knoten **vor** dem Anruf besuchte) und gleichzeitig nie `calledInsa2` aufgerufen hat (weil sein erster Anruf `insaDispatch` war, nicht `insa2a`) — dann landet er bei `insaDispatch`, was richtig ist; aber sobald er einmal `insa2`/`x7` durchhat (`calledForCode`), wird der Hotspot per `hiddenWhen: ["calledInsaAfterE71"]` … **nicht** versteckt, sondern fällt in den `insaDispatch`-Fallback. Das heißt: Layard kann Insa beliebig oft anrufen → ist okay (Reminder-Dialog existiert), aber er hat keinen Anlass mehr.

**Lösung B4:** Niedriger Aufwand — letzten Else-Zweig differenzieren: wenn `calledForCode` gesetzt ist und `mikaelRejectedProtocol` noch nicht, freundliche Ablehnung („Insa ist beschäftigt“) statt vollem Vermittlungs-Dialog.

---

## C. Erklärungslücken / „besser erklärt“

### C1. Was ist eine „Resonanz-Überlastung“ eigentlich?
Bisher implizit: 104,6 zu lange + zu laut → Katatonie (Mann in 2615). Verstärkt durch das Klopfen-im-Rhythmus-der-Frequenz-Detail. Das ist gut, aber: Das Spiel benutzt den Ausdruck oft, ohne ihn je medizinisch oder bürokratisch zu definieren. Helka, Mira, Bodo haben jeder eine eigene Theorie — keiner sagt, was offiziell drinsteht.

**Lösung C1:** Im `news`-Programm (das wir gerade gebaut haben) einen längeren Pseudoofiziellen Artikel ergänzen: *„Resonanz-Hygiene: Empfehlungen der Quadrantenverwaltung E67 für Hörer der Frequenz 104,6“* — verklausuliertes Beamtendeutsch, das genau die Definition vermeidet, die der Spieler sucht. Passt perfekt zu Layards Welt.

---

### C2. Warum unterstützt Insa Layard, trotz Risiko?
`insa2a..insaAct2Return` baut Insas Wandlung über mehrere Anrufe auf — schön. Aber ihre **erste** Hilfsbereitschaft (sie nimmt die Notmeldung sofort ernst, schickt Sanitäter, gibt später Code) wird nicht motiviert. Erst spät hört man (`ar8`), dass sie seit elf Monaten Protokolle vermittelt, die niemand annimmt. Davor wirkt sie nur „erschöpft, aber pflichtbewusst“.

**Lösung C2:** Einen einzelnen Mikro-Beat in `i2` oder `i6` einfügen — Insa erkennt Layards Stimme/Wohnungsnummer aus früheren Notrufen *(„Worag … 2611. Ja. Sie haben uns vor zwei Jahren angerufen wegen … gut, dass Sie wieder rufen.“)*. Das macht ihr späteres „Sie sind heute der erste, der eine Kapsel zurückbringt“ glaubwürdiger — sie hat ihn schon länger als Ausnahme im Blick.

---

### C3. Philippe als Wander-NPC und als 2613-Bewohner
Philippe taucht **vor** dem Klingeln in Lobby/Korridor 36/46/56 auf (`getPhilippeFloor()`), redet beiläufig mit Layard, geht **danach** „nach Hause“ und steht wieder vor seiner Tür. Charmant — aber der Spieler kapiert nicht zwingend, dass *derselbe* Philippe ist, weil:
- Vor dem Klingeln: höflicher Smalltalk ohne Last.
- Beim Klingeln: blass, panisch, „Wand klopft seit Stunden“.
Der Übergang ist im Code mit `metPhilippeBefore` und Reunion-Lines (`pR1..pR3`) sauber gelöst — aber die **Wartezeit** bleibt unklar. Das Klopfen läuft „seit heute Morgen“, Philippe traf Layard gerade „vorhin“ in der Lobby. War er also panisch im Korridor unterwegs, hat aber Smalltalk gemacht?

**Lösung C3:** In den Wander-NPC-Dialogen (`philippeInLobby`, `philippeInCorridor36/46/56`) eine subtile Unruhe einbauen: kurze Pause, „Ich sollte eigentlich runter“, Blick auf die Uhr. So begreift der Spieler beim Wiedersehen rückwirkend, dass Philippe schon das ganze Gespräch lang das Klopfen mit sich herumgetragen hat.

---

### C4. Mira: Identität, Motiv, Z.K.S.
Mira erscheint auf zufälligen Etagen (`getMiraFloors()`), gibt ein Flugblatt, sagt „Z.K.S.“, verschwindet. Der Spieler erfährt **nie**, was Z.K.S. heißt. Helka erwähnt 1989 (jemand mit Lötkolben & Theorie, „wortgleich“). Bodo erwähnt ein Stadtwerke-Logbuch von 1991. Das ist vermutlich Absicht (Geheimnis), aber es gibt keinen einzigen In-game-Hinweis darauf, dass das Akronym irgendwo aufschlüsselbar ist.

**Lösung C4:** Im `news`-Archiv (oder als versteckte Mail in `filesystemWorag`) einen alten Artikel von 1989/1991 ablegen, in dem das Kürzel **einmal** ausgeschrieben vorkommt — z.B. „Zentralrat Kritischer Sender“ oder „Zelle: Kein Schweigen“. Spielerische Belohnung für Akten-Wühler, ohne dass Mira es sagen muss.

---

### C5. Lottis Rolle bei Bodo
Lotti wird über `bodoLotti`-Dialog eingeführt, schaltet `knowsLotti`, was Voraussetzung ist, um Bodo überhaupt loszuschicken. Spielerisch sauber. Aber: Layards Argument („Wenn Lotti laut wird, ruft Insa“) wird vom Spiel sonst nirgends gestützt — keine andere Erwähnung, dass Insa wegen einer Katze anrufen würde. Das wirkt aus dem Hut gezaubert.

**Lösung C5:** Helkas `helkaSmalltalk` nutzen, um beiläufig zu sagen, dass „die Marschke-Katze schon zweimal die Leitstelle alarmiert hat, als sie Hunger hatte. Das wissen alle hier.“ — Setup für Layards spätere Argumentation.

---

## D. Kleinere Inkonsistenzen / Polishing

- **D1.** `dialogs.ts:1486` — Layard zitiert Mikael an Insa: *„Er hat … es ist alles voll bei ihm.“* Die Wortwahl „alles voll“ kommt aus Mikaels Geste mit den Stapeln, nicht aus seinem Wortlaut. Layard interpretiert. Nicht falsch, aber wirkt wie Erinnerungs-Glättung — könnte mit einem subtext markiert werden.
- **D2.** Im `news`-Programm wird inzwischen die These „die Bewohner haben die Code-Sperre selbst gefordert“ etabliert. Konsequenz: Helkas Satz *„nichts ist passiert, mit der Meldung nicht“* (1989, `hs22`) wird **stärker**, wenn man im News-Archiv einen Artikel findet, dass es eben **doch** Konsequenzen gab — nur nicht für den Gemeldeten, sondern systemisch (Verschärfung). Lose Verknüpfung — erhöht die Lore-Tiefe.
- **D3.** `Ennis Korr` reagiert auf Insas Namen mit einem Schalter-Klick (`e6`). Implikation: Ennis hatte mit Insa zu tun. Wird nirgends aufgelöst. Entweder einen Mini-Beat in `ennisAfterFlyer` ergänzen (ein Halbsatz reicht) oder bewusst offen lassen — derzeit fühlt es sich aber wie ein vergessener Faden an.
- **D4.** `serverRoom5610Bg` → der Raum wird als „lokaler Resonanz-Konzentrator E67“ beschrieben. Insa sagt jedoch (`idPflicht2b`): *„Die Antenne auf dem Dach E67 streut es bis nach E71 hinüber.“* — die NodeTerminal-Tap-Ausgabe bestätigt das (`Antennenarray Dach-E67 → Streuung E67/E71`). Konsistent. ABER: Das Spiel nennt 5610 mal „Knoten“, mal „Konzentrator“, mal „Wartungsterminal“. Eine konsistente Bezeichnung pro Funktion (Knoten = Hardware, Wartungsterminal = das Interface daran) würde helfen.

---

## E. Was bewusst bleiben sollte

Damit klar ist: vieles, was wie eine Lücke aussieht, ist **gewollte Mehrdeutigkeit**:
- Layards Vorgeschichte (warum „Schreiber“, warum allein in 2611, warum 1991 zitierbar) — bleibt offen, ist gut so.
- Was wirklich „dahinter“ liegt (Hörspiel? Berlin 2026 wie im Adventure? Anderer Quadrant?) — bleibt offen, gut so.
- Wer „Z.K.S.“ heute betreibt — bleibt offen, gut so. Vorschlag C4 würde nur das Akronym entschlüsseln, nicht die Bewegung.

---

## Empfehlung der Bearbeitungsreihenfolge

Wenn du etwas davon umsetzen willst, würde ich vorschlagen:

1. **A1 (Stegmann-Doppelung)** — billig, hohe Wirkung. Vorschlag: IT-Stegmann zu „Theilen“ umbenennen.
2. **A5 (Insa-Reminder)** — eine Zeile.
3. **C1 (News-Artikel Resonanz-Hygiene)** — ergänzt das gerade gebaute News-Programm und macht Lore greifbarer.
4. **C4 (Z.K.S. im Archiv)** — versteckte Belohnung.
5. **C5 + C3 + D3** — kleine Setup-Sätze in bestehenden Dialogen.
6. **B3 (mr4tappedOnly)** — würdigt eine bislang leere Spieler-Entscheidung.

Sag mir, welche Punkte du angehen willst — pro Punkt mache ich danach einen sauberen, kleinen Edit.
