# Pflicht-Rätsel: Das kaputte Telefon

Nach der Rückkehr aus E71 hat Layard das abgelehnte Einsatzprotokoll in der Tasche und muss Insa anrufen. Genau dann fällt die Leitung aus. Reparieren kann sie nur Mira — als Lehrling der Sektor-Wartung E67 ist sie dienstlich zuständig. Damit wird Mira in Akt I zwingend, ohne dass ihr Vertrauens-Strang zur Sackgasse werden kann.

## Ablauf

1. **Hinweis vorher.** Bei einer früheren Begegnung erwähnt Mira beiläufig, dass sie in der Wartung lernt und den Prüfstecker für die Hausleitungen mit sich herumträgt — „die einzige Zange auf der Etage, die noch was taugt".
2. **Ausfall.** Layard kommt aus E71 zurück, greift zum Telefon: kein Freizeichen, nur ein sirrendes Rauschen. Weitere Versuche bringen nur Varianten derselben Beschreibung.
3. **Meldeweg.** Am Terminal bzw. bei Bodo erfährt Layard: Störungen an Wohnungsapparaten laufen nicht über die Leitstelle, sondern über die Wartung der eigenen Etage. Zuständig für Korridor 46, Schicht A: die Anwärterin in 4601.
4. **Tür 4601.** Layard klopft. Mira öffnet — genervt, aber sie muss. Der Zugang hängt jetzt am Störungs-Flag, nicht mehr am Vertrauen.
5. **Reparatur.** Mira kommt mit, öffnet die Dose, findet einen durchgescheuerten Draht, repariert ihn — und macht dabei ihre Sache: sie kommentiert die Sprache der Verwaltung und prüft, ob Layard zuhört.
6. **Danach.** Das Telefon funktioniert, der Anruf bei Insa läuft wie bisher, Akt I geht weiter. Wer Miras Vertrauen schon hat, bekommt die Szene wärmer und mit einer Andeutung zu Ilan und Roald; wer nicht, kurz und trocken.

## Kein Dead End

- Die Reparatur ist ein Dienstvorgang und immer lösbar — auch nach einer verpatzten Vertrauensprobe.
- Tür 4601 öffnet zusätzlich über das Störungs-Flag; die bisherige Vertrauens-Route bleibt unverändert daneben bestehen.
- Der optionale Beleg-/Manifest-Strang bleibt wie er ist, er ist nur nicht mehr die einzige Art, Mira zu begegnen.

## Technische Umsetzung

- **`src/game/types.ts`**: neue Flags `phoneBroken`, `phoneRepaired`, `knowsMiraIsWartung`, `reportedPhoneFault`, `miraRepairDone`.
- **`src/game/scenes/apartmentAct1.ts`** (`phoneApt`): vor der bestehenden Anruf-Logik ein Zweig — bei `mikaelRejectedProtocol && !phoneRepaired` wird `phoneBroken` gesetzt und nur die Ausfall-Beschreibung gezeigt. Erst mit `phoneRepaired` läuft der bisherige `insaAct2Return`-Pfad.
- **`src/game/scenes/corridorsE67.ts`**: `door4601Enter` bekommt statt `requires: ["miraTrustEarned"]` eine `visible`-Funktion (`miraTrustEarned || phoneBroken`); bei `phoneBroken && !miraRepairDone` startet der Hotspot den Reparatur-Dialog statt `goTo`. `door4601Look` entsprechend ausblenden.
- **`src/game/dialogs/mira.ts`**: neue Trees `miraFaultReport` (Tür, Dienstweg-Ton) und `miraRepairScene` (in der Wohnung, setzt `phoneRepaired` + `miraRepairDone`), je zwei Tonvarianten abhängig von `miraTrustEarned`. Bestehende Trees bekommen den beiläufigen Wartungs-Hinweis, der `knowsMiraIsWartung` setzt.
- **Meldeweg-Text**: kurzer Hinweiszweig im Terminal bzw. bei Bodo, setzt `reportedPhoneFault`.
- **`src/game/hints.ts`**: Hint-Kette „Telefon tot → Störung melden → 4601 → Reparatur".
- Abschluss: Typecheck sowie die vorhandenen Quest-/Hint-Checks.