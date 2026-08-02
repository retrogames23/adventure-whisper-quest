# Mira wird Pflichtstation in Akt I

## Ziel

Mira ist derzeit komplett optional: Sie steht in Korridor 46, ihr Vertrauenspfad,
ihr Zimmer 4601 und die Verstärker-Antenne hängen an Flags, die man nie berühren
muss. Der Plan hängt sie mit ihrer kanonischen Rolle — **Bewohnervertretung E67,
Schicht A, Trockensiegel-Hüterin** (LORE.md §8) — als zwingende Station in die
bestehende Akt-I-Kette, ohne neue Geografie, ohne Umbau des Bürokratie-Duells und
ohne neue Sackgasse.

## Der Angelpunkt: das Trockensiegel

Formblatt 17/V ist ein Bewohner-Antrag. Vossbeck nimmt es nur an, wenn die
Bewohnervertretung mit ihrem **Trockensiegel** bestätigt, dass der Antragsteller
tatsächlich in E67 wohnt und in dieser Sache für sich selbst spricht. Das Siegel
liegt bei Schicht A — bei Mira. Damit steckt Mira genau zwischen Brust und
Vossbeck, an einer Stelle, die der Spieler ohnehin passieren muss.

```text
Insa (Telefon) -> Kowalk (3602) -> Brust: Formblatt 17/V
                                       |
                                       v
                    MIRA (Korridor 46) : Trockensiegel  <-- neu, zwingend
                                       |
                                       v
                    Vossbeck (3603): Endduell -> Tagescode -> Sektor-Tür
```

Der Fälschungs-Pfad über Kowalk bleibt erhalten: Auch das gefälschte Formblatt
braucht das Siegel — Kowalk kann Papier beschaffen, aber kein Bewohnersiegel.
So bleibt genau ein Nadelöhr.

## Ablauf der neuen Pflichtszene

1. **Hinweis:** Kowalk nennt beim Vossbeck-Briefing die dritte Bedingung —
   „ohne Trockensiegel der Vertretung ist das Blatt ein Blatt". Brust wiederholt
   es trocken bei der Übergabe. Insa nennt am Telefon Etage 4, Korridor 46.
2. **Begegnung:** Mira ist während dieses Abschnitts verlässlich auf Etage 4
   (sie wird für dieses Fenster dort fixiert, statt zufällig zu wandern).
3. **Miras Preis:** Sie siegelt nicht auf Zuruf. Sie verlangt eine Minute
   Funkstille — Radio *aus*, nicht leise, im Gang, vor ihren Augen. Das nutzt die
   bereits existierende Mechanik (`radioMutedAtLeast60s`) und ist immer lösbar.
4. **Drei Tonlagen, ein Ergebnis:**
   - *warm* — Stille ausgehalten **und** Manifest gelesen (optionaler Telnet-Pfad):
     sie siegelt, redet Klartext über Schacht 56 und lädt ihn in die 4601 ein.
   - *neutral* — nur Stille ausgehalten: sie siegelt, bleibt knapp, nennt die 4601.
   - *kalt* — verweigert oder abgebrochen: sie siegelt trotzdem, weil die
     Vertretung ein Siegel nicht verweigern darf, und schreibt ihn ab.
   In allen drei Fällen geht es weiter. Der Unterschied ist Ton, Zugang zu 4601
   und der Mira-Endstate für Akt II.
5. **Vossbeck** weist ein ungesiegeltes Formblatt ab, mit eigener Ablehnungszeile
   statt stiller Nichtreaktion.

## Was das nebenbei repariert

- **Sackgasse 4601:** Bisher öffnet sich Miras Tür nur bei gewonnener
  Vertrauensprobe; wer sie verliert, ist dauerhaft ausgesperrt. Künftig öffnet
  das Siegel-Gespräch die Tür (warm/neutral), und der kalte Ausgang sperrt nur
  optionale Inhalte.
- **Toter Verstärker-Strang:** Die Verstärker-Antenne bleibt optional, wird aber
  erstmals abschließbar — Bernstein-Resonator und Antennen-Draht bekommen je eine
  echte Fundstelle im Wartungsbereich (Serverraum 5610 bzw. über Bodo), passend
  zu Miras eigener Ansage im Dialog. Damit ist der „friendly"-Endstate erreichbar.
- **Mira-Endstate:** `neutral` heißt künftig „hat gesiegelt, nicht mehr" statt
  „nie getroffen" — Akt II bekommt eine verlässliche Basis.

## Lore-Konsistenz

- Trockensiegel und Bewohnervertretung Schicht A stehen bereits in LORE.md §8;
  der Plan macht daraus eine spielbare Amtshandlung und ergänzt in LORE.md einen
  kurzen Absatz, was das Siegel bedeutet und wer es führt.
- Miras Verdacht gegen die Verwaltung bleibt ausdrücklich **Vermutung**
  (LORE.md §7), motiviert durch den Tod ihres Vaters im Schacht 56 (1992).
  Keine Bestätigung, keine staatliche Resonanz-Infrastruktur.
- Kein Bruch der Tabu-Liste, Tonfall bleibt höflich-bürokratisch.

## Technische Umsetzung

- `src/game/types.ts`: Flag `formblatt17VSealed`, Flags `miraSealWarm` /
  `miraSealCold`, `kowalkMentionedSeal`.
- `src/game/dialogs/mira.ts`: neuer Dialog `miraSealRequest` mit den drei
  Ausgängen; `miraTrustProbe` wird zum optionalen Vertiefungs-Ast statt Türwächter.
- `src/game/scenes/corridorsE67.ts`: Hotspot-Routing auf den Siegel-Dialog,
  `door4601Enter` von `miraTrustEarned` auf „gesiegelt und nicht kalt" umstellen;
  Mira während des Siegel-Fensters fest auf Etage 4.
- `src/game/dialogs/cafeteria.ts` (Kowalk/Brust) und `insa.ts`: Siegel-Hinweis.
- `src/game/scenes/kantinenverwaltung3603.ts` / `bureaucracyDuel.ts`:
  Vossbeck prüft zusätzlich das Siegel und lehnt sonst begründet ab.
- `src/game/miraState.ts`: `computeMiraEndState` um die Siegel-Ausgänge erweitern.
- `src/game/hints.ts`: neue Pflicht-Quest „Trockensiegel der Bewohnervertretung"
  zwischen `act1.stamp4317` und `act1.callInsaForCode`; Mira-Vertrauens-Quest als
  optional umformulieren.
- Fundstellen für `tuningCrystal` und `antennaWire` im Wartungsbereich/5610.
- `LORE.md` und `mem/features/` um den Siegel-Abschnitt ergänzen; danach
  `quest-check` und `hints-check` laufen lassen.