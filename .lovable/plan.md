## Schmerz-Radio: Zwei neue lore-konforme Mechaniken

Ziel: Aus dem Schmerz-Radio von einem narrativen Möbelstück echte Spielmechaniken machen — ohne die Lore zu brechen ("über das Radio werden nur Gefühle übertragen", "man muss das Radio aktiv einsetzen, um zu senden").

Zwei kompakte Rätsel, die zusammen einen kleinen "Frequenz-Vertikalschnitt" durch Akt I bauen:

### Rätsel 1 — Hidden Frequency (kombinatorisches Frequenz-Rätsel)

Ein verschlossenes Wartungs-Funkgerät (Diegese: alter Kassetten-Funk im Serverraum 5610 oder am Pneumatik-Knoten der Kantine — siehe Diskussion unten) reagiert nur auf eine bestimmte Frequenz, die **nicht** unter den Snap-Presets liegt. Layard muss sie aus mehreren NPC-Aussagen kombinieren.

**Diegetische Klammer:** Das Schmerz-Radio überträgt zwar nur Gefühle — aber jeder dieser Gefühlsbänder hat einen "Träger" (eine Trägerwelle, auf der das Gefühl reitet). Layards Gerät kann zwischen den Bändern feintunen, weil er den `tuningCrystal` besitzt. Die gesuchte Frequenz liegt **zwischen** zwei bekannten Bändern (z. B. 102.7 — irgendwo zwischen Einsamkeit und Trauer) und ist gerade **kein** Preset.

**Hinweis-Quellen (3 Aussagen → 1 Zahl):**
- Eine NPC nennt das Band ("zwischen Einsamkeit und Trauer", → Bereich 102.0–103.4)
- Eine zweite nennt eine Stellenzahl ("die siebte Stufe nach unten" / "knapp unter halb", → die Nachkommastelle)
- Eine dritte bestätigt indirekt ("klingt wie eine Stimme, die nicht weint, aber kurz davor ist", → Verifikation des korrekten Bands)

Wer die NPCs sind, ergibt sich aus der bestehenden Cast: Helka (Tür 2610), Bodo (Hausmeister, kennt das alte Wartungsfunknetz), Mikael (E71) oder Okwu — wir wählen 3 NPCs, die thematisch passen, und legen die Sätze in `dialogs.ts` ab. Ein neuer Hotspot am verschlossenen Gerät prüft dann `Math.abs(freq - TARGET) < 0.05` und löst das Rätsel.

**Belohnung:** Hängt vom gewählten Gerät ab — Vorschlag: ein altes Wartungs-Diktiergerät, auf dem ein Vorgänger-Hausmeister eine **Kombi-Notiz** hinterlassen hat (kleiner narrativer Reward + ggf. Item für das nächste Rätsel).

### Rätsel 2 — Verstärker-Antenne für Mira (Resonanz-Duell, lore-treu)

Mira sitzt auf ihrer Etage und versucht, **Wut** auf einer Frequenz zu senden, die das System bisher als **Trauer**-Band etabliert hat. Sie kommt nicht durch — der Trauer-Träger ist zu stark belegt. Sie braucht eine improvisierte Verstärker-Antenne, damit ihr Wut-Signal das Trauer-Signal überlagert.

**Lore-Konform:** Es werden weiterhin nur **Gefühle** übertragen. Die Mechanik ist nicht "Codes durch Audio", sondern **Frequenz-Politik** — wer das Band besetzt, prägt das Gefühl der Etage. Mira will das Band kippen.

**Spielablauf:**
1. **Trigger:** Nach `miraTrustEarned`, beim Besuch von `aptMira4601`, bietet Mira im Dialog eine neue Option an: "Hilf mir, das Band zu drehen." Neuer Dialog-Branch in `dialogs.ts`, neuer Story-Flag `miraAskedAmplifier`.
2. **Bauteile sammeln** (einfaches Combine-Rätsel mit bestehenden / leicht hinzugefügten Items):
   - `tuningCrystal` (hat Layard) — Resonator
   - Ein **Stück Draht** vom Wartungsknoten 5610 oder von der Pneumatik (neuer Mini-Hotspot, neues Item `antennaWire`)
   - Das **alte Handbuch E67** als Unterlage / Schaltplan-Quelle (Layard hat es bereits)
   - Combine in `combine.ts`: `tuningCrystal` + `antennaWire` → `amplifierAntenna` (neues Item)
3. **Übergabe:** Antenne an Mira geben (NPC-Drag in `combine.ts` → `MIRA_REACTIONS["amplifierAntenna"]`). Setzt `miraHasAmplifier`.
4. **Live-Aktion am Radio:** In Miras Wohnung (oder im Korridor 46) öffnet Layard das Schmerz-Radio. Wenn `miraHasAmplifier` gesetzt ist UND die Frequenz in das **Trauer-Band** (103.5–104.5) fällt UND die Lautstärke hoch genug ist, wird ein **Resonanz-Duell** ausgelöst:
   - Neues Mini-Overlay `ResonanceDuelOverlay.tsx` (oder leichte Erweiterung von `RadioPanel.tsx` mit einer Sequenz)
   - Visuell: Trauer-Welle und Wut-Welle auf demselben Band, Layard muss die Frequenz für ~5 Sekunden in einem schmalen Fenster halten ("Mira drückt von unten, du hältst von oben")
   - Bei Erfolg: Cutscene-Text, Flag `miraSentAnger` und `miraTerminalUnlocked`. Mira gewährt ihm dauerhaft Zugriff auf ihr Terminal (`miraTerminal`-Hotspot wird ohne sie nutzbar / liefert neue Inhalte).

**Belohnung:** Erweiterter Zugriff auf Miras Terminal, das aktuell schon existiert (`onUse: api.openTerminal({ mira: true })`), aber narrativ aufgewertet wird. Optional: Mira gibt Layard zusätzlich eine konkrete Info, die im weiteren Akt I (oder Akt II, falls anliegend) Türen öffnet.

### Geräte-Auswahl für Rätsel 1

Drei plausible Kandidaten — bitte gerne Variante wählen:

- **(α) Wartungs-Diktiergerät am Knoten 5610** — passt zur Hausmeister-Sphäre, liegt bereits im Spiel-Pfad nach `tappedNode5610`.
- **(β) Alter Kassetten-Funk in der Kantine** (hinter Brusts Tresen / nahe Pneumatik) — erweitert die Kantine als Bühne, in der wir gerade auch das Bürokratie-Duell haben.
- **(γ) Stilles Funkgerät bei Mikael in Raum 1534** — schöner narrativer Bogen, aber E71 ist Frequenzsperre, was die Sache verkompliziert.

Empfehlung: **(α)** — kürzester Weg zur Implementierung, lore-konsistent, koppelt sauber an `serverRoom5610Open`.

### Technische Übersicht

Neue / geänderte Dateien:

```text
src/game/types.ts                 +Flags: miraAskedAmplifier, miraHasAmplifier,
                                          miraSentAnger, miraTerminalUnlocked,
                                          hiddenFrequencyFound
                                  +Items: antennaWire, amplifierAntenna
src/game/dialogs.ts               +3 NPC-Hinweis-Zeilen (Hidden Frequency)
                                  +miraAmplifierBranch (Mira fragt nach Hilfe,
                                   Reaktion auf Übergabe der Antenne)
src/game/scenes.ts                +Hotspot "wartungsFunk5610" in serverRoom5610
                                  +Hotspot "drahtSpule" (für antennaWire)
                                  +ggf. Frequenz-Check-Logik im Hotspot
src/game/combine.ts               +ITEM_PAIRS: tuningCrystal+antennaWire
                                              → amplifierAntenna (creates item)
                                  +MIRA_REACTIONS["amplifierAntenna"]
src/components/game/RadioPanel.tsx
                                  +Hidden-Frequency-Detektion (freq ≈ TARGET
                                   außerhalb der Presets, nur wenn am
                                   Wartungsfunk-Hotspot getriggert)
                                  +Resonance-Duel-Branch wenn
                                   miraHasAmplifier & freq im Trauer-Band
                                   & Layard ist auf Etage 4 / in 4601
src/components/game/ResonanceDuelOverlay.tsx (neu, optional)
                                  Mini-Sequenz "Frequenz halten"
src/game/hints.ts                 +2 Quest-Einträge (Hidden Frequency,
                                   Mira-Verstärker) — 3 Tipps-Stufen
src/game/helpTopics.ts            +ggf. Topic "Schmerz-Radio: Feintuning"
```

Alle neuen Strings landen — gemäß i18n-Memory — in den Daten-Modulen unter `src/game/`, NICHT in JSX. Für UI-Labels des neuen Overlays: `RESONANCE_DUEL_UI_TEXT`-Konstante am Dateianfang (Vorbild: `ENDING_UI_TEXT`).

### Was ausdrücklich NICHT umgesetzt wird

- Kein "Frequenz-als-Code" für rein technische Schlösser — nur diegetische Geräte, die selbst auf Funk reagieren (Lore-konform).
- Keine "Audio-Masking"-Mechanik (Variante D), die im vorherigen Vorschlag stand.
- Keine Sender, die irgendetwas anderes als Gefühle übertragen.

### Pilot-Reihenfolge

1. Erst Rätsel 1 (Hidden Frequency) implementieren — kleinerer Scope, schnell testbar.
2. Dann Rätsel 2 (Mira-Verstärker) — größerer Scope mit neuem Overlay.

Wenn der Pilot funktioniert (= Spieler verstehen die Mechanik), können wir 1–2 weitere "Frequenz-Verben" in Akt II ergänzen (z. B. ein NPC, der nur antwortet, wenn das Radio leise auf seinem Band läuft → Mood-Detector, abgeleitet aus Variante A, aber mit aktivem Sende-Charakter, nicht nur Empfang).
