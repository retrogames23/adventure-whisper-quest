# Mira sauber neu aufsetzen

## Ziel

Mira weiß nichts vom Schmerz-Radio und nichts von 104,6. Ihre These ist
sprachlich, nicht technisch: Die Verwaltung benutzt den unscharfen Begriff
**„Resonanz-Hygiene"** als Instrument sozialer Kontrolle — was niemand genau
definiert, kann jederzeit gegen jeden angewendet werden. Der Auslöser bleibt
der unaufgeklärte Tod ihres Vaters Ilan (Schacht 56, 1992); Onkel Roald bleibt
ihre Bezugsperson und Z.K.S.-Kontakt.

Tonlage: **skeptisch und kritisch, nicht paranoid.** Smart, jung, reißt sich
selbst mit — und rudert hörbar zurück, sobald man ihr widerspricht oder etwas
belegt. Jede große These bekommt im selben Dialog eine Selbstkorrektur-Zeile.

## Was sich inhaltlich ändert

**Neue Kernthese (ersetzt „die Frequenz ist eine Leine"):**
„Resonanz-Hygiene" steht nirgends exakt definiert. Der Begriff taucht auf
Aushängen, Merkblättern und Formularen auf, jedes Mal etwas anders. Miras
Vermutung: Genau die Unschärfe ist der Zweck — sie erlaubt, jedes Verhalten
nachträglich als Verstoß zu deklarieren. Im Bericht zum Tod ihres Vaters stand
„menschliches Versagen": dasselbe Muster, anderes Wort.

**Z.K.S. bleibt „Zentrum.Käfig.Stille"** — Terminal und Passwort unverändert.
„Stille" wird umgedeutet und positiv besetzt: Miras Ziel ist ein **„Tag der
Stille"** = ein Tag ohne Verlautbarungen, Aushänge und Durchsagen der
Verwaltung. Nicht ein Tag ohne Radio.

**Vertrauensprobe** verlangt künftig einen **Beleg**: Layard bringt einen
Aushang bzw. ein Merkblatt mit dem Wort „Resonanz-Hygiene" (Leitstellen-Aushang
E67) plus gelesenes Manifest. Die „eine Minute Radio aus"-Bedingung entfällt.

**Verstärker-Quest wird ersetzt** durch eine **Beleg-Sammlung**: Mira braucht
drei Fundstellen des Begriffs aus verschiedenen Stellen des Sektors, um der
Bewohnervertretung eine Eingabe vorzulegen. Liefert Layard sie, endet Akt I mit
demselben End-State „friendly" wie bisher.

## Technische Umsetzung

**Texte umschreiben (kein Radio, kein 104,6, neue Tonlage):**
- `src/game/dialogs/mira.ts` — alle Trees: `miraIntro`, `miraReturn`,
  `miraAfter`, `miraTrustProbe`, `miraAtHomeIntro`. Jede These bekommt eine
  Widerspruchs-Option für den Spieler („Das ist einfach ein Verwaltungswort")
  und eine Mira-Antwort, die den Einwand ernst nimmt.
- Flyer-Item und Manifest-Text neu: Fokus auf Begriffs-Unschärfe.
- `src/game/npcPersonas.ts` (mira): `secrets`, `personality`, `storyAwareness`
  auf die neue These umstellen; Regel ergänzen, dass Mira das Schmerz-Radio
  nicht kennt und nie über Frequenzen spekuliert.
- `src/game/netHosts.ts`, Host `mira.zks`: `manifest.txt` neu (Punkte 1 und 4),
  `frequenzen.txt` entfernen, `logbuch.txt`/`verteiler.txt` bereinigen.
- `src/game/filesystemMira.ts`: Zeile „alle radios aus" ersetzen.
- `src/game/sectorChatter.ts`: Miras Zeile über 104,6 ersetzen.

**Verstärker-Kette ersetzen:**
- `miraAmplifierAsk` / `miraAmplifierWait` / `miraAfterAmplifier` inhaltlich zur
  Beleg-Quest umbauen (drei Fundstellen statt Draht und Bernstein).
- `tuningCrystal`, `antennaWire`, `amplifierAntenna` samt Kombination in
  `src/game/combine.ts`, Icons in `ItemIcon.tsx` und Typen in `types.ts`
  entfernen; Sonderfälle in `RadioPanel.tsx` und `corridorsE67.ts` abräumen.
- Flag `miraSentAnger` durch `miraEvidenceDelivered` ersetzen; Verwendungen in
  `miraState.ts`, `hints.ts`, `communalE67.ts`, `RadioPanel.tsx` nachziehen.
- `radioMutedAtLeast60s` aus Miras Bedingungen entfernen (Flag und Radio-Logik
  selbst bleiben unangetastet); neues Flag `broughtResonanzAushang`.

**Verdrahtung:**
- `src/game/scenes/corridorsE67.ts`: Bedingungen der Vertrauensprobe anpassen.
- `src/game/scenes/leitstelleE67.ts`: Aushang „Resonanz-Hygiene" als
  mitnehmbaren Beleg ausgeben.
- `src/game/hints.ts`: Mira-Hints auf die Beleg-Quest umschreiben.

## Nicht Teil dieses Schritts

Das Pflicht-Rätsel (kaputtes Telefon, Miras Werkzeug) bleibt dem bereits
besprochenen Folgeschritt vorbehalten — dieser Plan setzt nur den Charakter
sauber auf, damit das Rätsel darauf aufbauen kann.