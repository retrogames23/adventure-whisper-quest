

## Ziel

Stegmanns bürokratische Anweisung („CentralOS aktualisieren → Technisches Problem melden") wird zu **zwei einzelnen Terminal-Befehlen** mit ordentlich Ton & Bildschirm-Spektakel — kein verschachteltes Fake-Menü. Danach ist `CentralOS v2.3.1` aktiv, einzige Funktionsänderung: `report exit` funktioniert tatsächlich.

## Spielablauf (UX)

Nach dem Stegmann-Telefonat (`calledStegmann` gesetzt) leuchten im Terminal **zwei neue Zeilen** im `help`-Output auf, mit dezentem ✶NEU-Hinweis:

```text
  sysupdate     — CentralOS-Aktualisierung (E67-Netz)        ✶ERFORDERLICH
  trouble net   — Netzwerkproblem an Leitstelle E67 melden
```

Zusätzlich erscheint **eine neue Inbox-Mail [005]** von Stegmann mit derselben Anleitung — falls der Spieler die Telefonnotiz vergisst.

### Schritt 1: `sysupdate`

Spieler tippt `sysupdate`. Ein scriptgesteuerter "Boot-Sturm" läuft ab — **keine echten Eingaben mehr nötig**, aber visuell intensiv (~6–8 Sekunden gesamt). Zeilen werden mit gestaffelten `setTimeout`s ausgegeben, dazu Beep-SFX:

```text
>> sysupdate: Verbinde mit update.e67 …
>> Authentifizierung … OK
>> Lade Manifest centralos-2.3.1.pkg …
   [████░░░░░░] 12%
   [██████░░░░] 47%
   [██████████] 100%
>> Verifiziere SHA … OK
>> Stoppe Dienste:
   carrier-daemon …………… OK
   inbox-relay …………………… OK
   gateway-watch ……………… OK
>> Patch /usr/bin/centralos … OK
>> Patch /usr/bin/report …… OK   ← (subtiler Hinweis)
>> Migriere /etc/motd ……… OK
>> Starte Dienste neu:
   carrier-daemon …………… OK
   inbox-relay …………………… OK
   gateway-watch ……………… OK
>> CentralOS v2.3 → v2.3.1   [OK]
>> Bitte führen Sie nun `trouble net` aus.
```

Während der Sequenz ist die Eingabe **deaktiviert** (Input ausgegraut, Cursor blinkt nicht), damit der Spieler nicht ungewollt unterbricht. Bricht sich der Spieler raus (Esc → schließt Terminal), läuft beim Wiederöffnen nichts weiter — er muss `sysupdate` erneut starten (idempotent). Setzt Flag `centralOsUpdated`.

### Schritt 2: `trouble net`

Kürzer, ~3 Sekunden, keine Fortschrittsbalken, dafür sehr offiziell:

```text
>> trouble: Automatische Problemermittlung gestartet …
>> Scanne lokales Segment E67 …………………… OK
>> Scanne Gateway E67/E71 ……………………………… STÖRUNG
>> Klassifizierung: ROUTING (Code 4567)
>> Erzeuge Ticket #E67-19971106-0042 …… OK
>> Übermittle an LEITSTELLE25@ZENTRAL.NETZ
>> Ticket angenommen. Bearbeitungszeit: unbestimmt.
>> Vielen Dank für Ihre Mitarbeit.
```

Setzt Flag `troubleReported`. Gibt einen Inbox-Eintrag **[006] Ticket-Bestätigung** dazu (rein kosmetisch, lesbar).

### Was sich danach ändert

- `sysupdate` allein bewirkt **noch nichts** für die Tür — beide Schritte sind nötig.
- Sobald **beide** Flags (`centralOsUpdated` + `troubleReported`) gesetzt sind, funktioniert `report exit` zum ersten Mal: bestehende Sequenz, aber **statt** "ERROR 4567 / Meldung NICHT zugestellt" → erfolgreiche Übertragung, `reportedExit` wird gesetzt, kurze Erfolgsmeldung mit Bestätigungs-Token.
- `status` zeigt nach Update `CentralOS v2.3.1` und `ZENTRAL.NETZ [WARTUNG]` statt `STÖRUNG`.
- `help` blendet die ✶NEU-Markierungen aus, sobald die jeweiligen Schritte erledigt sind. Bereits erledigte Befehle geben beim erneuten Aufruf eine kurze Stub-Antwort („Bereits aktuell." / „Ticket bereits offen.") und keine zweite Spektakelsequenz.

### Anti-Nerv-Entscheidungen

1. **Nur zwei Befehle**, beide einsilbig zu tippen, beide tab-vervollständigbar.
2. **Klare Hinweis-Kette**: Anruf → Mail [005] mit exaktem Wortlaut → `help` zeigt die Befehle.
3. **Kein modales Menü**, kein „Y/N"-Bestätigungs-Pingpong.
4. **Skip-Möglichkeit**: Wer es schon mal gesehen hat, kann mit `sysupdate --fast` (versteckt, in der Mail erwähnt) die Sequenz auf 1 Sekunde komprimieren — für Re-Tester.
5. **Idempotent & Reihenfolge erzwungen**: `trouble net` vor dem Update meldet „Update erforderlich. Bitte zuerst `sysupdate`."

## Technische Umsetzung

**Geänderte Dateien:**

- `src/game/types.ts` — neue StoryFlags `centralOsUpdated`, `troubleReported`.
- `src/components/game/Terminal.tsx`
  - Neuer Helper `runScriptedSequence(steps: { text, delayMs, kind, beep? }[])` der per `setTimeout` Zeilen anhängt und während der Laufzeit `setLines` updated. Eingabe wird per neuem State `scriptedRunning` deaktiviert.
  - Neuer Branch `cmd === "sysupdate"` (mit optionalem `--fast`-Flag) → Sequenz oben, am Ende `api.setFlag("centralOsUpdated")`.
  - Neuer Branch `cmd === "trouble net"` (Aliases `trouble`, `trouble net`) → Sequenz, prüft `centralOsUpdated`, setzt `troubleReported`.
  - `report exit`-Branch: Erfolgs-Pfad ergänzen, wenn beide Flags gesetzt sind (vorhandene Fehler-Sequenz bleibt für den Fall ohne Update).
  - `help`-Block: zeigt die zwei neuen Zeilen, sobald `calledStegmann` && nicht beide Flags.
  - `inbox`/`read 005`/`read 006`: zwei neue Mails (sichtbar an passenden Punkten).
  - `status`-Branch: Versionsanzeige & Netz-Status abhängig von `centralOsUpdated`.
  - `COMMANDS`-Array um `sysupdate`, `trouble`, `trouble net` erweitern (Tab-Completion).
- `src/game/dialogs.ts` — Stegmanns Zeilen `st8` / `st9` auf die neuen Befehlsnamen anpassen (kurz und konkret: „Tippen Sie im Terminal: **sysupdate**. Danach: **trouble net**.").
- `src/game/filesystem.ts` — `centralos`-Changelog-Eintrag um `v2.3.1 11/1997 Outbound report endpoint repariert.` erweitern; `motd` nach Update aktualisiert (über bestehende `dynamicFiles`-Logik bzw. einfachen Flag-Check beim Anzeigen — minimal halten, sonst nur Changelog).

**Nicht geändert:** Hauptpfad-Logik, Türcode, Insa-Dialoge, Hotspots, andere Charaktere.

## Erwartete Spielzeit für die Sequenz

Erstdurchlauf: **~12 Sekunden** reines „Zuschauen" plus 2× tippen. Das ist kurz genug, um nicht zu nerven, lang genug, um die Bürokratie spürbar zu machen — und mit `--fast` für Wiederholungen praktisch null.

