# Begriffs-Harmonisierung: Sektor vs. Quadrant

## Ziel
Sektor ist die **große Verwaltungseinheit**, Quadrant die **kleine Bau-/Wohneinheit**. E67 und E71 bleiben Gebäude, das „E" erklärt sich als späterer **Ergänzungsbau** im jeweiligen Quadranten.

## Neue Ordnung

```text
Mandatsgebiet Mitteleuropa
  └── Sektor 28              (große Verwaltungseinheit, ~700 Quadranten)
        └── Quadrant 67      (ursprüngliche Baugruppe A67–D67)
        │     └── E67        (späterer Ergänzungsbau im Quadranten 67)
        └── Quadrant 71      (ursprüngliche Baugruppe A71–D71)
              └── E71        (späterer Ergänzungsbau im Quadranten 71)
                    └── Etage / Wohnung   (z. B. 2611)
```

Adressformat neu: **Sektor / Quadrant / Gebäude / Etage / Wohnung** → „Sektor 28, Quadrant 67, Gebäude E, Etage 26, Wohnung 11" → kurz „2611, E67".

Warum liegen E67 und E71 nebeneinander? Weil Quadrant 67 und Quadrant 71 benachbart im Sektor 28 liegen. E67 ist der Ergänzungsbau von Quadrant 67, E71 der von Quadrant 71. Das „E" bezeichnet also nicht einen gemeinsamen Komplex, sondern jeweils den fünften Bau eines einzelnen Quadranten.

## Umbenennungs-Regeln

Großeinheit bleibt Sektor:
- Sektor 28 → Sektor 28 (unverändert)
- Sektor-Reform 1996 → Sektor-Reform 1996 (unverändert)
- Sektorärztin → Sektorärztin (unverändert)
- Sektor-Zeitung, Sektor-Funk, Sektor-Leitstelle, Sektorverwaltung, Sektor-Selbstverwaltung, Sektorzentrale → bleiben (beziehen sich auf die Großeinheit)
- Quadrantenamt → Sektoramt (Amt der Großeinheit)

Gebäudeebene (bisher „Quadrant E67") wird zu Gebäude im Quadranten:
- „Quadrant E67 / E71" → „Gebäude E67 / E71" oder „Erweiterungsbau E67 / E71"
- „Ihr Quadrant E67 liegt in Sektor 28" → „Ihr Gebäude E67 liegt in Quadrant 67, Sektor 28"
- „Quadrantendach" → „Gebäudedach" / „Dach von E67"
- „Quadrantenetiketten" → „Gebäudeetiketten"
- „Bewohnervertretung auf Quadrantenebene" → „Bewohnervertretung auf Gebäudeebene"
- E67-Handbuch: „alle Innentüren des Quadranten 26" → „alle Innentüren des Gebäudes E67" (bzw. Etage 26 präzisieren)

Titel „Quadranten-Almanach" wird zu **„Sektoren-Almanach"** oder **„Sektor-Almanach"**, da die Großeinheit Sektor ist.

## Historie-Anpassung (Almanach + LORE)
- 1948–1953: Errichtung der ersten **Quadranten** (Baugruppen A–D) in den Trümmerfeldern nach einem gemeinsamen geometrischen Raster.
- 1971 Quadranten-Konvention: Adressen werden Koordinaten (Sektor / Quadrant / Gebäude / Etage / Wohnung). Die Konvention selbst behält den Namen, da sie das Quadranten-System einführte.
- 1996 Sektor-Reform: Quadranten werden zu Sektoren zusammengefasst, Notruf 002 abgeschafft.
- Erklärung des „E": In den 70er/80er Jahren wurden viele Quadranten um einen **Erweiterungsbau E** ergänzt, meist auf der Innenfläche des Rasters. E67 und E71 sind solche Ergänzungsbauten.
- Almanach-Kapitel „Wo Sie wohnen": „Ihr Gebäude **E67** liegt im **Quadranten 67**, **Sektor 28**. Sektor 28 zählt rund 700 Quadranten und gehört zu den älteren, dichter besiedelten Sektoren des Mandatsgebiets."

## Betroffene Dateien
`LORE.md`, `README.md`, `src/game/quadrantenAlmanach.ts`, `src/game/e67Handbook.ts`, `src/game/newsProgram.ts`, `src/game/auskunftPrompt.ts`, `src/game/npcPersonas.ts`, `src/game/tv/channels.ts`, `src/game/netHosts.ts`, `src/game/cutscenes.ts`, `src/game/cafeteriaChatter.ts`, `src/game/filesystem*.ts`, `src/game/fastWebChat/personas.ts`, `src/game/dialogs/*` (okwu, insa, mira, mikael, philippe, …), `src/game/scenes/*`, `src/components/game/*` (Terminal, AlmanachOverlay, IdCardOverlay, TitleScreen, RadioPanel, ItemIcon, CrtMatrixBackground), `mem/`-Lore-Dateien.

## Vorgehen
1. Kanonische Definition in `LORE.md` (Abschnitt 4) und im Almanach neu schreiben.
2. Gezielte, kontextgeprüfte Ersetzungen Datei für Datei — kein blindes Suchen-und-Ersetzen, da „Quadrant" und „Sektor" an vielen Stellen in unterschiedlichen Bedeutungen stehen.
3. Prompt-Dateien (`auskunftPrompt.ts`, LLM-Master-Prompts, `npcPersonas.ts`, World-Info-Layer) auf die neue Hierarchie ziehen, damit die LLM nicht wieder abdriftet.
4. Typecheck + Quest-Check; Stichprobe im Terminal (`auskunft.bin` nach Adresse fragen).

## Nicht Teil des Umbaus
Der Kino-Lehrfilm behält die eingebrannte Tafel „Sektor 28" — sie ist jetzt korrekt, da Sektor die Großeinheit bleibt.
