# Miras Terminal wird Pflicht — plus Keller E67 mit Heizungssteuerung

## 1. Wofür Layard das Terminal zwingend braucht

Der Tagescode für die Sektor-Schleuse. Bisher legt Vossbeck ihn nach dem Endduell
direkt in Layards CentralOS-Postfach in 2611. Neu: Genau dieser Weg ist zu — aus
einem Grund, den die Story schon gelegt hat.

Beim Reparieren des Wohnungstelefons (Korridor 46, Schicht A) muss Mira den
Hausanschluss von 2611 auf die Wartung ummelden. Telefon und Terminal hängen an
derselben Hausleitung: Der Apparat geht wieder, der **Datenport bleibt bis zur
Abnahme gesperrt** („Prüfsperre, Anschluss 2611"). Layards Terminal zeigt danach
nur noch lokale Dienste, kein Postfach.

Vossbecks Code wird also korrekt versandt — und liegt unzustellbar im Verteiler
der Leitstelle (`leitstelle.e67`). Der Host ist passwortgeschützt, Layard hat das
Passwort nicht und bekommt es dienstlich nicht.

Miras Rechner ist der einzige Ausweg: `mira.zks` hängt über den freien Port am
Etagendrucker im Wartungs-IP-Bereich, und ihr `telnet` akzeptiert jede Verbindung
ohne Authentifizierung (Root-Tunnel, im Code bereits so angelegt). Layard
verbindet sich auf `leitstelle.e67`, liest den Verteiler und hat den
8-stelligen Tagescode. Ohne Miras Maschine kein Code, kein Sektorausgang, kein
Akt II.

Thematisch stimmig: Der Beamte muss zum ersten Mal etwas tun, das die
Hausordnung nicht vorsieht.

## 2. Zwei Wege ans Terminal

**a) Vertrauenspfad (bestehend, unverändert).** Aushang-Belege sammeln, Mira
überzeugen → `miraTerminalUnlocked`. Sie setzt sich dazu, kommentiert mit, und
Layard erfährt nebenbei etwas über Ilan und Roald. Der „warme" Weg.

**b) Heizungspfad (neu).** Layard steigt in den Keller E67, findet die Steuerung
der Steigstränge und dreht Strang 46 hoch. Miras Wohnung wird unerträglich warm;
sie geht raus (Korridor 46) und lässt die Tür angelehnt. Layard geht rein und
benutzt die Maschine ohne Erlaubnis.

Der Weg ist immer verfügbar, auch nach verpatzter Vertrauensprobe — damit gibt
es keine Sackgasse. Folgenlos ist er nicht: Miras Logbuch protokolliert jede
Verbindung. Sie merkt es.

## 3. Der Keller E67

Neue Szene, erreichbar über eine Wartungstür/Treppe in der Lobby E67 (kein
sechster Aufzugknopf — das Bedienfeld-Asset hat fünf). Die Tür ist verschlossen;
den Vierkantschlüssel gibt es bei Bodo (2612), der als ehemaliger Funktechniker
einen hat. Er rückt ihn aber **erst heraus, wenn Layard ihm seine grüne
Thermoskanne aus dem Tech-Knoten 5610 zurückgebracht hat** (`gaveBodoThermos`).
Vorher weicht er aus („Erst mal das, was Sie mir schon versprochen haben.").
Damit hängt der Heizungspfad an einer Nebenquest, die es bereits gibt und die
jederzeit nachholbar ist — kein neuer Blocker, keine Sackgasse.

**Optik:** Der Keller orientiert sich an der Bildvorlage — verwaschenes
Giftgrün über altem Orange, abgeplatzter Lack, Rost an den Kanten, ein
gepanzerter Schlauch quer über einen Blechkasten, geriffelte Alu-Drehknöpfe,
Betonboden, Holzpaletten. Kein Retro-Charme, sondern übermalte
Betriebstechnik.

Inhalt, damit der Ort nicht nur Rätsel-Hebel ist:
- **Heizungssteuerung**: sechs Steigstränge, Drehregler, handbeschriftetes
  Klebeband. Welcher Strang zu Korridor 46 gehört, steht im Wartungsbuch bzw.
  sagt Bodo — niemand muss raten.
- **Wartungsbuch** mit alten Einträgen, darunter das Kürzel von Ilan
  (Sektor-Elektriker E67-3804) aus der Zeit vor 1992 — stiller Lore-Anker zu
  Miras Vater, ohne neuen Plot aufzumachen.
- Rohrpost-Verteiler, Wäscheleinen, ein abgeklebter Aushang „Resonanz-Hygiene"
  (Deko, kein vierter Beleg — die Drei-Beleg-Quest bleibt unangetastet).

## 4. Folgen und Mira-Endstate

- Terminalnutzung ohne Erlaubnis setzt ein Trespass-Flag. Beim nächsten Gespräch
  spricht Mira es an. Wer es zugibt, landet bei „neutral"; wer leugnet oder gar
  nicht mehr mit ihr redet, bei „skeptical".
- Wer schon `miraTerminalUnlocked` hat, für den ist der Keller optionaler
  Weltinhalt — die Heizung funktioniert trotzdem.
- Wer Vertrauen hat und die Belege liefert, bleibt „friendly".

## Technische Umsetzung

- `src/game/types.ts`: neue Flags `port2611Locked`, `gotKellerKey`,
  `knowsStrang46`, `heatingStrang46Raised`, `miraFlatOpen`,
  `miraTerminalTrespass`, `readTagescodeViaMira`, `miraConfrontedTrespass`;
  Item `vierkantschluessel`; Scene-ID `kellerE67`.
- `src/game/dialogs/mira.ts` (`miraRepairScene`): setzt zusätzlich
  `port2611Locked` und erklärt die Prüfsperre in einer Zeile.
- `src/game/scenes/apartmentAct1.ts`: Terminal in 2611 zeigt bei
  `port2611Locked` eine Sperr-Meldung statt Postfach; die Code-Mail wird dort
  nicht mehr ausgeliefert.
- `src/game/dialogs/bureaucracyDuel.ts` / `cafeteria.ts`: Sieg setzt weiterhin
  `calledForCode`; Vossbecks Zeile verweist bei gesperrtem Port auf den
  Verteiler der Leitstelle statt aufs eigene Postfach.
- `src/game/netHosts.ts`: `leitstelle.e67` bekommt `verteiler_tagescodes.txt`
  mit dem 8-stelligen Code (Inhalt erst bei `calledForCode`); Miras
  `logbuch.txt` bekommt eine Zeile über eine fremde Verbindung.
- `src/components/game/Terminal.tsx` / `src/game/terminal/terminalHelpers.ts`:
  im Mira-Modus setzt ein erfolgreiches `telnet leitstelle.e67` das Flag
  `readTagescodeViaMira`.
- `src/game/scenes/kellerE67.ts` (neu) + Registrierung in `scenes/index.ts`:
  Hintergrundbild im Stil der bestehenden Szenen, Hotspots Heizungssteuerung,
  Wartungsbuch, Rohrpost, Ausgang.
- `src/game/scenes/elevatorE67.ts` (`floor1Lobby`): Wartungstür zum Keller,
  gesperrt ohne `vierkantschluessel`.
- `src/game/dialogs/bodo.ts`: Zweig, der den Schlüssel aushändigt und Strang 46
  benennt (`knowsStrang46`).
- `src/game/scenes/corridorsE67.ts`: `door4601Enter` zusätzlich sichtbar bei
  `miraFlatOpen`; Mira steht bei `heatingStrang46Raised` im Korridor (über
  `getMiraFloors`).
- `src/game/scenes/communalE67.ts` (`aptMira4601`): Terminal öffnet auch bei
  `miraFlatOpen` — dann mit Trespass-Flag und eigener Beschreibung.
- `src/game/miraState.ts`: Trespass in die Endstate-Berechnung aufnehmen
  (uneingestanden → skeptical, eingestanden → neutral, Belege schlagen alles).
- `src/game/hints.ts`: neue Kette „Tagescode ist nicht angekommen" → „Anschluss
  gesperrt" → „andere Maschine finden" → beide Wege; bestehende Hints zu
  Postfach und Sektortür anpassen.
- Abschluss: Typecheck, `scripts/quest-check.mjs`, `scripts/hints-check.mjs`.
## Was aktuell schief läuft

Das Telefon bricht heute nur "passiv": Der Defekt wird erst gesetzt, **wenn** der Spieler den Telefon-Hotspot in der Wohnung anklickt (`src/game/scenes/apartmentAct1.ts`, `phoneApt.onUse` setzt dann `phoneBroken`). Solange niemand freiwillig zum Apparat greift, existiert der Defekt nicht — und ohne `phoneBroken` ist Miras Tür 4601 im Korridor 46 unsichtbar (`src/game/scenes/corridorsE67.ts`, `door4601Enter.visible`). Es gibt also keinen Weg ins Mira-Rätsel.

Dazu kommt: Beide Terminal-Cheats (`vossbeckweak`, `endeakt1` in `src/game/cheats.ts`) setzen `phoneBroken`, `miraRepairDone` **und** `phoneRepaired` gleich mit. Nach einem Cheat-Start ist das Telefon damit dauerhaft repariert, das Rätsel übersprungen und Miras Tür wieder zu — genau das beobachtete Verhalten.

## Was gebaut wird

1. **Defekt aktiv auslösen, nicht erst beim Anfassen**
   Sobald der Stegmann-Anruf beendet ist (`calledStegmann` im Insa-Dialog) bzw. spätestens bei der Rückkehr in die Wohnung, wird `phoneBroken` gesetzt. Umsetzung an einer zentralen Stelle statt in jedem Hotspot: beim Betreten der Szene `apartment` prüfen, ob `calledStegmann` oder `mikaelRejectedProtocol` gesetzt und `phoneRepaired` nicht gesetzt ist → `phoneBroken` + `reportedPhoneFault` setzen.

2. **Sichtbares Signal beim Betreten**
   Beim ersten Betreten der Wohnung mit totem Apparat kurze Textmeldung: Layard hört das Sirren aus dem Hörer / sieht den Aufkleber der Etagenwartung ("Korridor 46, Schicht A — 4601"). So weiß der Spieler ohne Hotspot-Klick, dass etwas kaputt ist und wohin er muss.

3. **Telefon-Hotspot immer erreichbar, wenn er kaputt ist**
   Der Hotspot verlangt heute `sawEmptyOffice` + `protocolReceived` und verschwindet nach `calledInsaAfterE71`. Bei defektem, unrepariertem Apparat wird er unabhängig davon angezeigt, damit der Spieler das Sirren jederzeit nachhören kann.

4. **Cheats reparieren das Rätsel nicht mehr weg**
   `miraRepairDone` und `phoneRepaired` fliegen aus `VOSSBECK_WEAK_FLAGS`; `phoneBroken`/`reportedPhoneFault` bleiben. `endeakt1` erbt das. Ergebnis: Nach beiden Cheats ist das Telefon tot und das Mira-Rätsel offen — wie im echten Spielverlauf an dieser Stelle.

5. **Hinweissystem gegenprüfen**
   Der bestehende Hint in `src/game/hints.ts` (`phoneBroken`) und die Absage-Dialoge der Nachbarn (Bodo, Philippe, Ennis, Helka → verweisen auf 4601) greifen dann automatisch; wird nach dem Umbau einmal durchgespielt und bei Bedarf in der Reihenfolge angepasst.

## Betroffene Dateien

- `src/game/scenes/apartmentAct1.ts` — Defekt beim Szenenbetritt setzen, Einstiegstext, Hotspot-Sichtbarkeit
- `src/game/cheats.ts` — `phoneRepaired`/`miraRepairDone` aus den Cheat-Flags entfernen
- ggf. `src/game/hints.ts` — Hinweistext auf 4601 schärfen

## Test

Neues Spiel mit `endeakt1`: Wohnung betreten → Sirren-Meldung, Telefon tot, Korridor 46 → Tür 4601 sichtbar → Mira-Fehlermeldung startet → nach Reparatur (`phoneRepaired`) funktioniert der Apparat und der Insa-Rückruf nach E71 läuft normal weiter.
