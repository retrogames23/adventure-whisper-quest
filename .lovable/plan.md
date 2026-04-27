# Episches Abenteuer: Tiefe, Verzweigungen, Konsequenzen

Aktuell: 3 kurze Akte, 7 Beats insgesamt, lineare Abfolge — fast alle Wege münden in denselben nächsten Beat. Ziel: echte Pfade, Flags mit Auswirkungen, optionale Inhalte, mehrere Enden.

## Neue Aktstruktur (5 Akte, ~18 Beats)

```text
Akt 1 — Anreise (3 Beats, bestehend, leicht erweitert)
  s1b1 Gabelung → s1b2 Wegelagerer → s1b3 Schenke
        ↓ Flag: bandit_leader_alive / bandit_killed / bandit_friendly

Akt 2 — Wirtshaus (3 Beats, bestehend) → Lagerszene
  s2b1 Wendelmir → s2b2 Schlägerei → s2b3 Auftrag
        Annehmen → camp                  Ablehnen → ending_decline (neu, nicht mehr "end")

Akt 2.5 — Lager (NEU, 2 Beats)
  camp1 Gefährten-Gespräch (Wahl: Yelva ODER Brem ODER allein)
        → setzt Flag yelva_bond / brem_bond / lone
  camp2 Nachtwache — moralisches Dilemma (NEU)
        Verwundeter Wegelagerer kriecht ins Lager (nur falls bandit_leader_alive)
        ODER: Bote mit Brief vom Magister, der widersprüchlich klingt
        → Flag mercy_shown / suspicion_high

Akt 3 — Anreise zur Ruine (NEU, 2 Beats)
  road1 Wahl der Route:
        - Sumpfweg (schnell, Probe IN, sonst LE-Verlust)
        - Bergpfad (sicher, kostet Zeit → Falle in Ruine bereits aktiv)
        - Flusslauf (Klassenoption Druide/Elf, gratis)
  road2 Optionaler Nebenpfad: verlassene Köhlerhütte (NEU)
        → Item "Hesinde-Amulett" (Bonus auf Endkampf-Probe)
        ODER: ausruhen → LE auffüllen

Akt 4 — Ruine (4 Beats, erweitert von 2)
  ruin1 Vorhalle/Falle (bestehend s3b1)
  ruin2 Bibliothek (NEU) — Wissensprobe, Hinweis auf Hüter
  ruin3 Krypta (NEU) — moralisches Dilemma: Skelett bittet um Ruhe
        → Flag krypt_freed / krypt_pillaged
  ruin4 Altarraum/Hüter (bestehend s3b2)
        Hüter-Verhalten je nach krypt_freed milder/härter
        Endkampf-Werte modifiziert durch Flags

Akt 5 — Epilog (NEU, multiple Enden)
  ending je nach Pfad:
    - hero_return       Buch geliefert, Wendelmir zahlt
    - hero_betray       Buch behalten / verkaufen (Streuner-Option)
    - pact_with_warden  Hüter überzeugt → Buch bleibt, eigene Belohnung
    - decline_path      Auftrag abgelehnt (vom alten "end")
    - tragic            Sieg, aber Gefährte gefallen (siehe Combat)
```

## Flag-System (neu)

In `src/game/dsa/adventure.ts` neuer Typ:

```ts
export type AdventureFlag =
  | "bandit_leader_alive" | "bandit_killed"   | "bandit_friendly"
  | "tavern_brawl_won"   | "tavern_brawl_lost"
  | "haggled_high"       | "warrior_word"
  | "yelva_bond"         | "brem_bond"        | "lone_wolf"
  | "mercy_shown"        | "suspicion_high"
  | "amulet_found"       | "rested_well"
  | "krypt_freed"        | "krypt_pillaged"
  | "warden_pacted";

export interface AdventureState {
  flags: Set<AdventureFlag>;
  goldExtra: number;       // Verhandlungserfolg
  leBonus: number;         // Rastbonus für nächsten Kampf
  hesindeAmuletAktiv: boolean;
}
```

`DsaOption.outcome` bekommt optional:
- `setFlags?: AdventureFlag[]` — beim Wählen gesetzt
- `requiresFlag?: AdventureFlag` — Option nur sichtbar mit Flag
- `forbiddenFlag?: AdventureFlag` — Option versteckt mit Flag

`combat.enemyIds` bleibt, aber neuer Helfer baut Gegner aus Flags auf (z.B. Endkampf -1 LE-Bonus pro `krypt_freed`, +RS bei `amulet_found`).

## Anpassungen in `DsaAdventureScene.tsx`

- `useState<AdventureState>` mit `flags: new Set()` neben `phase`.
- Beim Wählen einer Option: `setFlags` einsammeln vor `setPhase`.
- `meetsRequirement()` wird erweitert um Flag-Check.
- `handleAdvance()`: bei `next === "end"` nicht direkt Outro, sondern Routing in Epilog-Beat passend zu Flags (`pickEnding(state)`).
- `OutroView` zeigt verschiedene Schlussbilder/Texte je nach Endung.
- Combat-Loader liest `state.leBonus` und `state.hesindeAmuletAktiv` und passt Helden-Werte an.

## Inhaltliche Tiefe (was wirklich neu geschrieben wird)

Pro neuem Beat ~5–7 Optionen, davon mindestens 3 Klassen-/Magie-/Flag-spezifisch, jeweils mit eigenem Erfolgs-/Misserfolgstext und Tisch-Kommentar von Brem/Yelva/Tjark. Geschätzt ~600–800 Zeilen neuer Erzähltext. Der vorhandene Stil (Tjarks Lesetext, Brem-Sarkasmus, Yelva trocken) wird konsequent beibehalten.

Beispiele für moralische Dilemmata:
- **Lager-Nachtwache**: Verletzter Wegelagerer um Gnade — heilen (Flag `mercy_shown`, später dankbar im Epilog) / töten (Brem grummelt) / fortjagen.
- **Krypta**: Skelett mit ehrenvollem Sigill bittet wortlos um Ruhe — Knochen ordnen (Hüter milder), Goldring nehmen (Hüter wütender), unberührt lassen (neutral).
- **Magister-Brief im Lager**: Hinweis, dass Wendelmir das Buch verkaufen wird, statt es zu hüten — beeinflusst spätere Verrat-Option im Endakt.

## Bilder

Bestehende 6 Bilder reichen für die meisten neuen Beats (Wald → Lager/Straße/Hütte; Tavern interior → Lagerfeuer-Notlösung; Ruin entrance → Bibliothek/Krypta). Neu zu generierende Bilder: keine zwingend (Text-First-Ansatz). Falls gewünscht, kann später nachgelegt werden — vermerkbar.

## Reihenfolge der Implementierung

1. `adventure.ts`: Flag-Typen, `AdventureState`, erweiterte Option-Felder, `pickEnding()`.
2. `DsaAdventureScene.tsx`: State um Flags erweitern, Routing-Logik, Combat-Modifikatoren.
3. Neue Beats schreiben: `camp1`, `camp2`, `road1`, `road2`, `ruin2`, `ruin3` plus 4 Epilog-Beats.
4. Bestehende Beats anpassen (s1b2/s1b3/s2b3/s3b1/s3b2: `setFlags` einbauen, Endkampf liest Flags).
5. UI-Hinweise: kleines Icon/Tooltip wenn Option durch Flag freigeschaltet (z.B. "(weil ihr ihn verschont habt)").
6. Schnelltest aller Pfade (mehrere Klassen).

## Was sich für den Spieler ändert

Statt ~10 Min linearem Klick-Through bekommt der Spieler eine ~25–35 Min Sitzung mit:
- 5 echten Hauptpfaden zum Ende
- Klassenwahl beeinflusst nicht nur Probetexte sondern auch Routenwahl
- Companion-Bindung verändert Epilog-Text
- Frühe Entscheidungen tauchen spät wieder auf (Wegelagerer, Krypta, Magister-Misstrauen)
- Items/Boni machen Endkampf mechanisch beeinflussbar
