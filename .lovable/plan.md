# Begriffs-Harmonisierung: Quadrant vs. Sektor

## Ziel
E67 und E71 sind Gebäude und heißen künftig **Sektoren**. Die Großeinheit darüber heißt **Quadrant 28** (Nummer bleibt). Damit dreht sich die bisherige Hierarchie um.

## Neue Ordnung

```text
Mandatsgebiet Mitteleuropa
  └── Quadrant 28            (Großeinheit, ~700 Sektoren, Verwaltung/Leitstelle/Amt)
        └── Sektor E67       (Gebäude, in dem Layard wohnt)
        └── Sektor E71       (Gebäude mit Amt, Kino, Aufzug)
              └── Etage / Wohnung   (z. B. 2611)
```

Adressformat neu: **Quadrant / Sektor / Etage / Wohnung** → „Quadrant 28, Sektor E67, Etage 26, Wohnung 11" → kurz „2611, E67".

## Umbenennungs-Regeln

Großeinheit (bisher „Sektor 28" und Ableitungen) wird zu Quadrant:
- Sektor 28 → Quadrant 28
- Sektor-Reform 1996 → Quadranten-Reform 1996
- Sektorärztin → Quadrantenärztin (Dr. Okwu)
- Sektor-Zeitung → Quadranten-Zeitung; Sektor-Funk → Quadranten-Funk
- Sektor-Leitstelle / Leitstelle eines Sektors → Leitstelle des Quadranten
- Sektorverwaltung, Sektorzentrale, Sektor-Selbstverwaltung → Quadranten-…
- Quadrantenamt bleibt (ist jetzt korrekt die Behörde des Quadranten)

Gebäudeebene (bisher „Quadrant E67") wird zu Sektor:
- Quadrant E67 / E71 → Sektor E67 / E71
- Quadrantendach, Quadrantenetiketten, Bewohnervertretung auf Quadrantenebene → Sektor-…
- E67-Handbuch: „alle Innentüren des Quadranten 26" → „alle Innentüren des Sektors" (bzw. Etage 26 präzisieren)

Bereits korrekt und unverändert (beziehen sich schon aufs Gebäude): Sektor-Tür, Sektor-Schleuse, Sektor-Wartung, Sektornetz, Sektorenwart, Sektor-Code, Sektor-Elektriker, interne IDs wie `sectorAct1`, `sektor-schwelle-cutscene`, `sectorId`.

Titel „Quadranten-Almanach" und „Quadranten-Konvention 1971" bleiben — sie beziehen sich jetzt korrekt auf die Großeinheit.

## Historie-Anpassung (Almanach + LORE)
- 1948–1953: Errichtung der ersten **Sektoren** im geometrischen Raster; Zusammenfassung zu Quadranten.
- 1971 Quadranten-Konvention: Adressen werden Koordinaten (Quadrant / Sektor / Etage / Wohnung).
- 1996 **Quadranten-Reform**: Sektoren werden zu Quadranten zusammengefasst, Notruf 002 abgeschafft.
- Almanach-Kapitel „Ihr Quadrant E67 liegt in Sektor 28" → „Ihr Sektor **E67** liegt in **Quadrant 28**. Quadrant 28 zählt rund 700 Sektoren."

## Betroffene Dateien
`LORE.md`, `README.md`, `src/game/quadrantenAlmanach.ts`, `src/game/e67Handbook.ts`, `src/game/newsProgram.ts`, `src/game/auskunftPrompt.ts`, `src/game/npcPersonas.ts`, `src/game/tv/channels.ts`, `src/game/netHosts.ts`, `src/game/cutscenes.ts`, `src/game/cafeteriaChatter.ts`, `src/game/filesystem*.ts`, `src/game/fastWebChat/personas.ts`, `src/game/dialogs/*` (okwu, insa, mira, mikael, philippe, …), `src/game/scenes/*`, `src/components/game/*` (Terminal, AlmanachOverlay, IdCardOverlay, TitleScreen, RadioPanel, ItemIcon, CrtMatrixBackground), `mem/`-Lore-Dateien.

## Vorgehen
1. Kanonische Definition in `LORE.md` (Abschnitt 4) und im Almanach neu schreiben.
2. Gezielte, kontextgeprüfte Ersetzungen Datei für Datei — kein blindes Suchen-und-Ersetzen, da „Sektor" in zwei Bedeutungen vorkommt.
3. Prompt-Dateien (`auskunftPrompt.ts`, LLM-Master-Prompts, `npcPersonas.ts`, World-Info-Layer) auf die neue Hierarchie ziehen, damit die LLM nicht wieder abdriftet.
4. Typecheck + Quest-Check; Stichprobe im Terminal (`auskunft.bin` nach Adresse fragen).

## Nicht Teil des Umbaus
Der Kino-Lehrfilm behält die eingebrannte Tafel „Sektor 28" — er gilt als Archivmaterial aus der Zeit vor der Umbenennung. Optional ergänzen wir dazu einen Halbsatz im Almanach („bis zur Reform als Sektor 28 geführt"), damit es nicht als Fehler wirkt.
