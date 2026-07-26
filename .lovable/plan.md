## Ziel

Bürokratie-Duell näher an Monkey-Island-Schwertmeister rücken: mehr Rundenzahl, mehr Lernbedarf, und der End-Dialog schließt sauber.

## 1. Bug: End-Dialog lässt sich nicht schließen

Symptom im Screenshot: `r3HitResolve` zeigt „Sitzt. — Punkt Worag." mit `[ Trainingsfall abschließen ]`, aber Klick tut nichts.

Vermutliche Ursache: Der Choice ruft `resolveTraining` in `action` und wechselt danach per `nextDialog: "duelTrainingResult"`. In `duelTrainingResult` steht die erste sichtbare Line (`checkWon3` oder `checkWon`) mit gleichzeitig `next: ...` UND `end: true`. Der Resolver interpretiert das inkonsistent — Line wird angezeigt, hat aber weder Choices noch sauberes Ende, dadurch bleibt der Overlay-State hängen (analog zum früheren `end: true`-Bug im r3MissResolve).

Fix:
- `duelTrainingResultBranching`: `end: true` auf den Zwischenknoten (`checkWon3`, `checkWon`) entfernen und rein per `next` verketten. Nur die tatsächlichen End-Lines (`lost`, und ein neuer eigener End-Knoten nach `checkWon3` / `checkWon`) tragen `end: true` ohne `next`.
- Konkret: `checkWon3` → `next: "won3End"`, neue Line `won3End` mit `end: true`. `checkWon` → `next: "won1End"`, neue Line `won1End` (Text „Notiert. Weiter.") mit `end: true`. `lost` bleibt.
- Analog `duelEndgameResult` prüfen und säubern (dort ebenfalls `next` + `end: true` gemischt).

## 2. Drei Konter-Runden pro Trainingsfall (statt zwei)

Aktuell: R1 Brust-Angriff · R2 Layard-Angriff · R3 Brust-Angriff → nur zwei Runden, in denen der Spieler konternd punkten kann.

Neu: R1 Brust · R2 Brust · R3 Layard-Angriff · R4 Brust — vier Runden, drei davon Konter-Runden. Sieg ab ≥ 2 Konter-Treffern (Layard-Angriffs-Treffer zählen zusätzlich, sind aber nicht Pflicht).

Umsetzung:
- `buildTrainingFall` bekommt zusätzlich `r2PhraseId`, `r2CorrectId`, `r2WrongIds`.
- Neue Lines `r2Brust` / `r2Hit` / `r2Miss` analog zu R1, `next: "r3Intro"` (Layard-Angriff), von dort auf `r4Brust` (statt bisher `r3Brust`).
- Alle acht Trainings-Fälle (A–H) bekommen eine zusätzliche Phrase + Konter-Trio.
- End-Duell Vossbeck ebenfalls auf 3 Brust-Konter-Runden ausbauen (r1 + r2 + r4, r3 = Layards Eröffnung).
- Sieg-Schwelle bleibt „≥ 2 Treffer" — bei drei Konter-Runden angenehmer erreichbar, aber nicht automatisch.

## 3. Monkey-Island-Modus: Konter müssen erlernt werden

Aktuell zeigt jede Runde 4 Choices (1 korrekt + 3 hart verdrahtete falsche). Der Spieler hat immer die richtige Antwort dabei.

Neu:
- **Starter-Pool**: Layard startet mit einer kleinen Menge bekannter Konter (z. B. 4 von 14: `c-immer-so`, `c-nicht-zustaendig`, `c-termin`, `c-formsache`). Diese sind ab Spielstart in `learnedParagraphs` — Migration/Seed in `GameContext` (nur wenn Set leer und `duelTrainingWon1` etc. nicht gesetzt).
- **Choice-Aufbau pro Runde**:
  - Kandidaten = `learnedParagraphs ∩ COUNTERS`.
  - Ist der korrekte Konter gelernt → Choices = korrekter Konter + bis zu 3 zufällige andere gelernte falsche Konter (bei zu wenigen gelernten Konter auffüllen mit „Layard schweigt / stammelt eine leere Phrase" — dummy-Choice `next: rNMiss`).
  - Ist der korrekte Konter nicht gelernt → Choices = 3–4 zufällige gelernte (allesamt falsch) + optional Dummy „stammeln". Der Spieler verliert die Runde zwangsläufig, bekommt aber danach von Brust den korrekten Konter mit `[ ins Phrasenbuch übernehmen ]` präsentiert.
- **Neue Lernquellen** außerhalb des Duells (kleine Dialog-Ergänzungen bei bestehenden NPCs, keine neuen Räume):
  - Bodo lehrt 1–2 zusätzliche Konter im Aufenthaltsraum.
  - Helka lehrt 1–2 zusätzliche Konter (Türschild-Familie).
  - Kowalk gibt beim Aushändigen des Lappens einen „Grundlagenkonter" mit.
  - Mikael/Insa je 1 optionaler Konter (Flavor).
  - Rest (~4–5) bleibt exklusiv über „Fall verlieren → Übernehmen" lernbar — belohnt Wiederholung.
- Effekt: Erste Duelle sind knapp verlierbar, Streak-3 ist erst erreichbar, wenn der Spieler das Phrasenbuch bewusst aufbaut.

## 4. Sonstiges

- Phrasenbuch-Overlay (`ParagraphenNotizbuchOverlay`) kurz prüfen, ob Starter-Konter sauber angezeigt werden (kein Code-Change erwartet, nur Sichtprüfung nach Umsetzung).
- Kein Balancing-Change am End-Duell außer 3-Runden-Umbau.

## Betroffene Dateien

- `src/game/dialogs/bureaucracyDuel.ts` (Runden-Umbau, Choice-Builder mit `learnedParagraphs`, Result-Trees säubern)
- `src/game/GameContext.tsx` (Starter-Pool seeden bei leerem Set)
- `src/game/dialogs/bodo.ts`, `helka.ts`, `cafeteria.ts` (Kowalk), `mikael.ts`, `insa.ts` (optionale Lern-Einträge)
- `src/game/bureaucracyDuel.ts` (nur Ergänzung falls neue Konter/Phrasen fehlen — bestehender Korpus reicht wahrscheinlich)

## Technische Details

- `attackChoices()` bleibt für Layards R3-Eröffnung; wird nur umbenannt (r2 → r3).
- Neuer Helper `buildCounterChoices(api, correctId, missNext, hitNext)` liest `learnedParagraphs` zur Laufzeit (via `onEnter` oder besser: Choices dynamisch aus Dialog-Line-Callback bauen). Falls das aktuelle Dialog-System keine dynamischen Choices unterstützt, prüfen wir bei Umsetzung, ob `DialogLine` einen `choicesFn(api)`-Hook hat; sonst nachrüsten (kleiner Zusatz in `types.ts` + `DialogOverlay.tsx`).
- Alle Änderungen bleiben i18n-taugliche ganze Sätze (bestehende Konvention).
