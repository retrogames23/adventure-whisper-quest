# Plot-Umbau: Akt I bereinigen, Akt II neu anfangen

## Was sich erzählerisch ändert

1. **Resonanz-Pause fällt weg.** Keine ärztliche Anordnung, keine sieben Tage, keine Sperre im Radio-Panel, keine Anspielung in Dialogen oder Hinweisen.
2. **Marteau-Plot fällt weg.** Kein Erfinder-Name mehr in Lore, Almanach, Handbuch, Terminal-Dateien. Die Herkunft des Schmerz-Radios ist künftig unbekannt — ein Bastler-Gerät ohne Urheber. Nachbar Philippe behält seinen Nachnamen; jede Verbindung zwischen ihm und dem Radio-Erfinder verschwindet.
3. **Akten-Strang 1978 (N. Sertl, Gutachten, Archiv 5710) fällt weg.**
4. **Insa in der Leitstelle: komplett neue Dialoge.** Sie nimmt endlich das Protokoll persönlich entgegen. Ruhig, korrekt, ein Moment Wärme — kein Auftrag, keine Mappe, kein Archivhinweis. Dazu ein kurzer Wiederhol-Dialog für spätere Besuche.
5. **Layards Beruf wird retconnt und überall vereinheitlicht:** Verwaltungsangestellter, **Abteilung Informationsbeschaffung**. Sein Alltag: alte Akten, Zeitungsarchive und Register durchforsten, damit die Verwaltung über Anträge entscheiden kann. Früher Autor (zwei Bände in den späten 80ern) — das bleibt.
6. **Neue Arbeits-Mails beim Spielstart.** Fünf bis sechs bereits gelesene Rechercheaufträge in Layards Postfach, im trockensten Verwaltungston, bewusst langweilig (Bauakten, Namensregister, Zeitungsjahrgänge, Belegungslisten). Sie etablieren beiläufig seinen Job — und dass er dabei nie das Gebäude verlässt.
7. **Neue Cutscene als Akt-II-Auftakt.** Am Morgen nach der Protokoll-Übergabe: eine neue Mail. Layard soll die auffällige Häufung von „Resonanz-Überlastungen" in Sektor 28 untersuchen — und dafür erstmals **vor Ort** recherchieren: in E71, im Gespräch mit Nachbarn, mit Dr. Okwu, mit allen, die etwas wissen könnten. Das offizielle Schreiben liegt zur Abholung bei Vossbeck bereit.
8. **Erster Akt-II-Schritt:** Vossbeck händigt das Schreiben aus (Kantinenverwaltung 3603). Damit endet der jetzt umzusetzende Teil.

## Akt-I-Ende

Das Ending endet mit der persönlichen Übergabe an Insa. Die Tafel mit dem ärztlichen Vermerk entfällt ersatzlos. Label bleibt „AKT I — ENDE", Button „Akt II beginnen". Der Klick führt wie bisher zurück in die Wohnung — dort startet die neue Auftragsmail-Cutscene.

## Technische Umsetzung

**Resonanz-Pause entfernen**
- `src/game/cutscenes.ts`: letzte Ending-Tafel (Vermerk Dr. Okwu) streichen; `RADIO_PAUSE_UI_TEXT` entfernen.
- `src/components/game/Ending.tsx`: `radioOnPause` nicht mehr setzen.
- `src/components/game/RadioPanel.tsx` + `radio/RadioPauseGate.tsx`: Pause-Gate ausbauen.
- `src/game/types.ts`: Flag `radioOnPause` entfernen.

**Marteau / Akte 1978 entfernen**
- `LORE.md`: Erfinder-Absatz und Personenverzeichnis-Eintrag ersetzen durch „Herkunft unbekannt"; Änderungs-Historie ergänzen.
- `src/game/quadrantenAlmanach.ts`, `src/game/e67Handbook.ts`, `src/game/filesystemWorag.ts`: Namensnennungen neutralisieren (Bastler-Bauart statt Marteau-Bauart, §-Verweis ohne Erfinder).
- `src/game/dialogs/insa.ts`: `insaAct2InPerson` / `insaAct2InPersonAfter` komplett neu schreiben (Protokoll-Annahme statt Mappe); Item `akte1978Sertl` und Flag `marteauTrailOpened` entfallen.
- `src/game/dialogs/mikael.ts`, `dialogs/cafeteria.ts`, `dialogs/philippe.ts`, `src/game/combine.ts`, `src/game/npcPersonas.ts`: Marteau-Erwähnungen tilgen. Die Vollmacht 4317 bleibt als reine Bürokratie erhalten, aber ohne „Marteau-Vermerk" — Formular und Dialoge sprechen von der Schicht-A-Stammakte bzw. schlicht von Philippe.
- `src/game/hints.ts`: Hinweis „Akte 1978" entfernen; Akt-II-Hinweis auf Mail/Vossbeck umstellen.
- `src/game/types.ts`: Flags `needsMarteauAuthForTilla`, `learnedMarteauPhilippeLink` neutral umbenennen.
- `src/game/scenes/leitstelleE67.ts`: Kommentar und Beschreibungen anpassen.
- `src/components/game/ItemIcon.tsx`: Icon-Eintrag für die entfallene Akte entfernen.

**Beruf vereinheitlichen**
- `LORE.md`, `src/game/npcPersonas.ts` (Layard-Persona und NPC-Wissen über ihn), `promptBuilder.ts` / `auskunftPrompt.ts` sofern Layards Beruf dort auftaucht, sowie einschlägige Dialogzeilen: durchgehend „Verwaltungsangestellter, Abteilung Informationsbeschaffung".
- Ergänzung in `LORE.md`, dass Vor-Ort-Recherche für diese Abteilung unüblich ist — das macht den neuen Auftrag zur Ausnahme.

**Arbeits-Mails**
- `src/game/filesystemWorag.ts`: Mail-Verzeichnis um mehrere gelesene Rechercheaufträge ergänzen (Aktenzeichen, Fristen, Formblatt-Verweise, sachliche Betreffzeilen).

**Neue Cutscene + Vossbeck-Schreiben**
- Neue Textdaten in `src/game/cutscenes.ts` (Mail-Wortlaut + Tafeln), neue Komponente analog `SectorThresholdCutscene.tsx`.
- Trigger beim Betreten der Wohnung nach `act2Started` (in `src/game/scenes/apartmentAct1.ts`, wo bisher der Insa-Rückruf hing), neue Flags `act2MailReceived`, `act2LetterPickedUp`.
- `src/game/dialogs/vossbeckAct2.ts`: die drei Personas behalten, je Persona einen Übergabe-Zweig für das offizielle Schreiben ergänzen; Item „Offizielles Schreiben · Vor-Ort-Recherche" ins Inventar.
- `src/game/hints.ts`: Hinweiskette Mail → Vossbeck → E71.

## Konsistenz-Anmerkungen

- Die spätere Auflösung (künstlich erzeugte „Engel-Trauer" durch ZERO IS INFINITY) verträgt sich gut mit „Herkunft des Radios unbekannt": das Gerät ist alt und namenlos, der Verstärker ist neu. „Engel-Trauer" bleibt Layards privater Ausdruck.
- Insa hat Layard 1986 selbst den Empfänger gegeben (Tagebuch-Eintrag im Terminal). Das bleibt unverändert und ist mit dem kargeren Leitstellen-Dialog vereinbar — sie sagt dazu vorerst nichts.
- Miras Verdacht, die Verwaltung kapere die Frequenz, bleibt unbestätigte Lesart und ist die Vorstufe von Gerücht 3.