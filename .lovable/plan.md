# Tür 1102 — Die Künstlerin gegenüber der Bibliothek

Gegenüber der Bewohnerbibliothek (Tür 1101) zieht eine Bewohnerin ein: **Setsuko Arai**, Künstlerin, japanischer Herkunft, leicht exzentrisch. Ihre Wohnung ist zugleich Atelier und Installation — Punkte, Netze, weiche Auswüchse auf Möbeln, Spiegelflächen. Bei ihr fällt zum ersten Mal der Name **„Zero is Infinity“**.

## Was neu entsteht

**Neue begehbare Szene: Wohnung/Atelier 1102**
- Erreichbar über die bestehende Tür 1102 in Korridor 11 (bisher nur ein Betrachten-Text).
- Neues Hintergrundbild: kleine Wohnung, komplett überzogen mit handgemalten Punktmustern, Stoffauswüchse auf Sofa und Tisch, ein Spiegelkabinett-Winkel, Farbtöpfe, Reisschale unberührt.
- Hotspots: Setsuko (Gespräch), Punktbilder, Weichskulpturen („Esszimmer“-Installation), Spiegelwinkel, ein Stapel selbstgedruckter Einladungen/Flugblätter, Rückweg in den Korridor.

**Setsukos Figur**
- Freundlich, überschwänglich, ohne Pause redend; wechselt zwischen Kunsttheorie und sehr direkten Sätzen über Körper, Essen, Sex.
- Ekel vor Sex und Essen ist offen benannt und genau deshalb ihr Material: sie malt und näht das, wovor sie sich fürchtet, bis es harmlos wird.
- Ihr Weltbild: Befreiung entsteht, wenn alle sich „nackt machen“ — das Verletzlichste und Schambehafteste zeigen. Wiederkehrende Formel: „So befreiend!“
- Sie ist bewusst *keine* Aktivistin. Sie kennt die Leute, sie mag sie, sie geht nicht mit.

**Dialogaufbau (mehrstufig, wie bei Herbert/Mira)**
1. Erstkontakt: Layard wird hereingewinkt, bekommt Tee angeboten, den sie selbst nicht trinkt.
2. Kunstebene: Punkte, Wiederholung, Auslöschung des Einzelnen im Muster.
3. Körperebene: warum Essen und Sex ihr Thema sind.
4. Politische Ebene — nur bei hartnäckigem Nachfragen und echtem Interesse (mehrere Nachfrage-Optionen statt Abschied wählen): sie erwähnt Freunde, die „mit Null arbeiten“, dann fällt der Name **„Zero is Infinity“**. Kein Ort, keine Namen, keine Kontaktadresse — nur, dass es sie gibt und dass sie nicht dazugehört.
5. Danach: Wiederansprech-Dialog mit kürzeren Varianten, kein Wiederholen der Enthüllung.

**Hinweis-Kette**
- Erst Interesse zeigen schaltet Ebene 4 frei; wer schnell abbricht, hört den Namen nicht und kann später wiederkommen.
- Der Hinweis wird als Wissens-/Story-Flag gespeichert, damit spätere Akt-II-Inhalte darauf aufbauen können.

## Technische Umsetzung

- Neues Szenenmodul `src/game/scenes/apt1102.ts`, registriert in `src/game/scenes/index.ts`; `SceneId` um `apt1102` erweitert (`src/game/types.ts`).
- Tür 1102 in `src/game/scenes/corridor11.ts` von `kind: "look"` auf Eingang umstellen (Klingeln/Eintreten).
- Neues Dialogmodul `src/game/dialogs/setsuko.ts`, exportiert über `src/game/dialogs/index.ts`.
- Neue Story-Flags in `src/game/types.ts`: `metSetsuko`, `setsukoArtTalk`, `setsukoBodyTalk`, `heardZeroIsInfinity`.
- Neues Hintergrundbild `src/assets/scene-apt-1102.jpg` (generiert, Stil passend zu den übrigen Szenen).
- Sprachlich Mandatsdeutsch nur sparsam; Setsuko spricht bewusst *nicht* im Verwaltungston.
