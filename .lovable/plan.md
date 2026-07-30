## Ziel

Ein neues Pflichträtsel in Akt I: Über eine Kellerebene (Aufzug-Knopf „K“) steuert Layard die Heizung einer Wohneinheit hoch, bis die Bewohnerin — Mira — ihre Wohnung verlässt. Erst dann kommt er an den Antennen-Draht, den er für die Verstärker-Antenne braucht.

## Warum es zwingend ist

Die Verstärker-Antenne entsteht aus `tuningCrystal` + `antennaWire`. Der Kristall ist im Spiel erhältlich, der **Antennen-Draht bisher nirgends** — die Kombination ist damit aktuell tote Mechanik. Der Draht wird zur Belohnung des Heizungsrätsels: Er liegt in Miras Kabelkiste unter dem Schreibtisch. Solange sie im Raum sitzt, lässt sie Layard nicht an ihre Sachen.

## Ablauf

```text
Mira-Dialog: "Manchmal spinnt die Heizung, dann
gehe ich eine Runde Luft schnappen."
        │
Aufzug → Knopf K (Keller, immer sichtbar)
        │
Heizungskonsole: Ventil-Hebel je Steigstrang
+ Wahlrad Etage/Einheit → 4601 auf Stufe max
        │
Korridor 46: Miras Tür steht offen, sie ist weg
        │
Wohnung 4601: Kabelkiste → Antennen-Draht
        │
+ Bernstein-Resonator → Verstärker-Antenne (bestehend)
```

## Keller-Szene

Neue Szene `basementE67` (`SceneId` erweitern), eingehängt in `src/game/scenes/`:

- Aufzug `elevator`: neuer Knopf `btnK` unter Etage 1, Label „Keller — Versorgung / Heizzentrale“, `rideElevator(api, "basementE67")`. Etagen-Indikator-Text um „K“ ergänzen.
- Raum: Rohrleitungen, Kondenswasser, Handbuch an der Wand. Hotspots: Heizkonsole (Rätsel), Wartungsaushang (Hinweistext zur Bedienlogik), Rohre (Flavour), Aufzug zurück.
- Bild: neues Asset im Stil der bestehenden Szenen (Amber/Beton, 16:9), generiert.

## Die Konsole (Overlay)

Neues Overlay `HeatingConsoleOverlay.tsx` analog zu `Keypad`/`PneumaticTubeOverlay`, geöffnet über eine neue `GameApi`-Aktion:

- Drei Kippschalter = Steigstränge **A / B / C** (Strang B versorgt Korridor 46).
- Wahlrad **Einheit** (4601 / 4602 / 4603) und Hebel **Vorlauf** (Stufe 0–5).
- Auslöseregel: Strang B + Einheit 4601 + Stufe 5 → Flag `mira4601Overheated`, Bestätigungstext („Irgendwo über Layard beginnt ein Rohr zu ticken.“).
- Falsche Kombination gibt sprechendes Feedback (falscher Strang: „In 46 bleibt es kalt.“; zu niedrige Stufe: „Lauwarm. Niemand steht dafür auf.“) — kein Fail-State, beliebig oft bedienbar.
- Zurückdrehen setzt das Flag nicht zurück; einmal draußen bleibt Mira eine Weile draußen (kein Timer, damit kein Zeitdruck-Fail).

## Hinweis-Kette

- **Mira-Dialog** (`src/game/dialogs/mira.ts`): neue Zeile in ihrem Zimmer-Smalltalk — „Manchmal spinnt die Heizung, dann gehe ich eine Runde Luft schnappen.“ Setzt `knowsMiraHeating`.
- **Bodo** (Hausmeister): auf Nachfrage die Bedienlogik — Strang B = Korridor 46 —, falls der Spieler an der Konsole hängen bleibt.
- **Aushang im Keller**: Strangplan als Fallback, damit das Rätsel auch ohne Bodo lösbar ist.
- `src/game/hints.ts`: Hint-Stufen für „Draht fehlt“ → „Mira sitzt im Weg“ → „Keller, Strang B, 4601“.

## Folgen in bestehenden Szenen

- `communalE67.ts` / `aptMira4601`: bei `mira4601Overheated` ist der `miraInRoom`-Hotspot ausgeblendet, Intro-Text beschreibt den leeren, überheizten Raum; neuer Hotspot **Kabelkiste** gibt `antennaWire` (einmalig).
- `corridorsE67.ts`, Korridor 46: Mira-Sprite ausgeblendet, `door4601Enter` ohne Anwesenheits-Sperre, kurzer Look-Text zur offenen Tür.
- Mira taucht währenddessen sichtbar als Sprite auf der Passage / im Gemeinschaftsraum auf, damit klar ist, wo sie ist; dort kurzer Kommentar-Dialog („Da drin kocht es. Ich warte, bis es sich abregt.“).

## Technische Punkte

- Neue Flags: `knowsMiraHeating`, `mira4601Overheated`, `tookAntennaWire`; Overlay-State (`heatingConsoleOpen`) in `GameContext` inkl. `PersistedState`, damit Spielstände korrekt laden.
- `antennaWire` existiert bereits als `InventoryItemId` und hat eine Kombination — keine Änderung an `combine.ts` nötig; ggf. Icon in `ItemIcon.tsx` ergänzen.
- Keine Backend-/Datenbank-Änderungen.
- Verifikation: Build-Check plus ein Playwright-Durchlauf Aufzug → Keller → Konsole → 4601.
