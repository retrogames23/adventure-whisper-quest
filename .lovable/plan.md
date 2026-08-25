# Herbert, das wandelnde Lexikon

Herbert bekommt einen neuen Gesprächsstrang: Layard merkt irgendwann, dass der Bibliothekar ein Kopf voller kurioser Fakten ist. Danach steht auf der obersten Ebene des Gesprächs dauerhaft die Option „Erzählen Sie mir einen kuriosen Fakt.“ zur Verfügung.

## Ablauf im Spiel

1. **Entdeckung**: Neue Option auf der obersten Ebene, z. B. „Woher wissen Sie eigentlich so viel?“ — Herbert erzählt in zwei, drei Sätzen (in seinem trockenen, unaufgeregten Ton), dass er beim Katalogisieren jahrzehntelang alles Mögliche mitgelesen hat und sich vor allem das Nutzlose merkt. Er bietet an: „Fragen Sie mich einfach mal, wenn Ihnen langweilig ist.“ Damit wird ein Flag gesetzt.
2. **Danach**: Auf der obersten Ebene erscheint „Erzählen Sie mir einen kuriosen Fakt.“ Herbert erzählt einen Fakt in kurzer Form (2–4 Sätze, keine Sternchen-Sprache, keine modernen Fachbegriffe, die im Mandatsgebiet 1997 fehl am Platz wären), danach zurück zum Hub. Wiederholt aufrufbar.
3. **Reihenfolge**: Die Fakten werden ohne Wiederholung durchgereicht — jeder Fakt kommt einmal, erst wenn alle durch sind, fängt Herbert von vorn an („Dann eben noch mal von vorn, ich habe nur ein Leben gelesen.“).

## Inhalt der Fakten

Die Fakten stammen aus der hochgeladenen Sammlung („Stimmt das wirklich – Nur die Fakten“). Jeder Fakt wird auf eine kurze, mündlich erzählbare Fassung eingedampft und in Herberts Stimme umgeschrieben, oft mit einer kleinen trockenen Schlussbemerkung. Beispiele:

- Perlen sind keine Romantik, sondern Notwehr: Die Muschel mauert einen Parasiten lebendig ein.
- Hyänen sehen aus wie Hunde, gehören aber zu den Katzenartigen.
- Mops und Walross sitzen zoologisch in derselben Unterordnung.
- Der amerikanische „Buffalo“ ist ein Bison — ein Irrtum von Pelzhändlern, der nie korrigiert wurde.
- Bakterien und Archaeen sind untereinander so verschieden wie Mensch und Pilz.
- Der Mensch ist nicht mit Menschenaffen verwandt, er ist einer.
- Hunde erkennen bekannte Rivalen am Geruch und bleiben dann gelassen („Dear-Enemy-Effekt“ — Herbert übersetzt das).
- Haustiere sind auf Passagierschiffen in Rettungsbooten nicht vorgesehen.
- Zink hilft nur gelutscht, früh und hoch dosiert.
- Lawinenverschüttung im Auto: Motor aus, angeschnallt bleiben, nicht flüchten, ruhig atmen.
- … sowie die übrigen Fakten des Dokuments in derselben Kurzform.

Bei Fakten, deren Begriffe (z. B. „konvergente Evolution“) für die Spielwelt zu akademisch klingen, erklärt Herbert sie in einem Nebensatz, wie er es auch bei den Sumerern tut.

## Technische Umsetzung

- Neue Datei `src/game/herbertFakten.ts`: Array aus `{ id, text, subtext? }` mit den gekürzten Fakten.
- `src/game/dialogs/herbert.ts`:
  - Neue Zeilen `wissen1`/`wissen2` (Entdeckung) mit `api.setFlag("herbertFaktenBekannt")`.
  - Neue Zeile `fakt` mit `textFn`/`action`, die den nächsten ungenutzten Fakt auswählt.
  - `hh1.choicesFn` erweitert: Entdeckungs-Option nur ohne Flag sichtbar, Fakt-Option nur mit Flag.
- Fortschritt (welche Fakten schon erzählt wurden) wird über bestehende Flags gespeichert (ein Flag pro erzähltem Fakt, z. B. `hbFakt_perle`), damit es speicherbar bleibt und keine neue Persistenzschicht nötig ist.
- Kein Eingriff in Bücher-/Ausleihlogik, keine neuen Items, keine Datenbank.
