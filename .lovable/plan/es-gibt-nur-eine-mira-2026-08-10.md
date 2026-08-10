# Es gibt nur eine Mira

## Was aktuell schiefgeht

Bestätigt in `src/game/dialogs/mira.ts` und den beiden Aufrufstellen:

- `startMiraEncounter(api, { atHome })` verzweigt nach Ort. Im Flur startet die Erstbegegnung den langen Baum `miraIntro` (Flugblatt, Z.K.S., Item), in 4601 dagegen `miraAtHomeIntro` — ein kurzer Baum, der nur ein Flag setzt. Wer Mira zuerst im Zimmer trifft, verpasst den kompletten Einstieg und landet danach in einem Hub, dessen Optionen Vorwissen voraussetzen.
- `miraAtHomeIntro` setzt `miraAtHomeMet` und `metMira`, `miraIntro` setzt nur `metMira` plus eigene Flags. Der gemerkte Zustand hängt also ebenfalls vom Ort ab; `miraNormalDialogId` fragt beide Flags ab.
- Die Reparatur-Option im Hub ist nur über `hiddenWhen: ["miraRepairDone"]` gesteuert — sie erscheint auch, wenn das Telefon gar nicht kaputt ist, und im Flur-Pfad (Erstbegegnung `miraIntro`) gar nicht.

## Zielbild

Eine Mira, ein Gesprächsbaum, ein Zustand. Der Ort bestimmt nur die Regieanweisung in der allerersten Zeile (Wand im Korridor vs. Bett in 4601). Einziger inhaltlicher Unterschied danach: Telefon kaputt → Reparatur-Option zusätzlich.

## Umsetzung (alles in `src/game/dialogs/mira.ts`, plus zwei Aufrufstellen)

1. **Erstbegegnung vereinheitlichen**: Ein Baum `miraFirstMeet` ersetzt `miraAtHomeIntro` als Einstieg im Zimmer. Er beginnt mit zwei alternativen SYSTEM-Zeilen (Korridor / Wohnung, per `requires`/`hiddenWhen` auf einem Ortsflag, das `startMiraEncounter` beim Aufruf setzt) und läuft danach exakt in den bestehenden `miraIntro`-Verlauf (Wort-These, Flugblatt, Z.K.S.) weiter — identisch an beiden Orten. Miras Anrede-Zeilen im Zimmer werden auf den Bestand von `miraIntro` gehoben, damit kein zweiter Textstrang entsteht.
2. **Zustand ortsunabhängig**: Die Erstbegegnung setzt in beiden Fällen dieselben Flags (`metMira`, plus `miraAtHomeMet` nur noch als Alt-Kompatibilität für Spielstände). `miraNormalDialogId` prüft künftig nur `metMira`.
3. **Ein Hub**: `miraAtHomeHub` wird zum allgemeinen `miraHub` und ist der Einstieg nach der Erstbegegnung — im Flur wie im Zimmer. Die Zeilen `mhubKnown` / `mhubFirst` schrumpfen auf eine Begrüßung.
4. **Telefon-Unterschied sauber**: Die Störungsmeldungs-Option erscheint nur, wenn `phoneBroken` gesetzt und `miraRepairDone` nicht gesetzt ist — dann aber an beiden Orten.
5. **Aufrufstellen**: `corridorsE67.ts` und `communalE67.ts` rufen beide `startMiraEncounter(api)` auf; statt `atHome` übergibt der Aufruf nur noch den Ort für die Regieanweisung.
6. **Sonderzustände bleiben zustandsbasiert, nicht ortsbasiert**: `miraTrespassConfront`, `miraSystemicGreeting` und `miraOutInHeat` (Hitze-Pfad) werden weiter vor dem Hub geprüft — `miraOutInHeat` künftig anhand von `miraFlatOpen` statt anhand von „nicht zu Hause".

## Prüfung danach

Typecheck, `scripts/quest-check.mjs` und `scripts/hints-check.mjs`; im Spiel beide Reihenfolgen durchspielen (erst Zimmer, erst Flur) und einmal mit kaputtem Telefon.
