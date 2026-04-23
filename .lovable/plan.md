

## Ziel

Drei neue Bewohner im Korridor 26 — Zimmer **2610**, **2612**, **2614** — mit Backstory, eigenem Charakter, Computer-Account im Sektornetz und individueller Reaktion auf Mira's Flugblatt. Eine Wohnung wird begehbar, zwei bleiben Türgespräche. Verfügbar ab Akt 2 (nach `doorBrokenOpen`).

## Die drei Charaktere

### 2610 — Helka Vint (Türgespräch)
- **Alter / Beruf:** Mitte 50, ehemalige Bibliothekarin der Sektor-Bibliothek (vor 12 Jahren geschlossen). Heute „Datenpflegerin" im Schichtdienst — sortiert ungelesene Mails der Leitstelle.
- **Charakter:** Höflich, aber spitz. Spricht in vollständigen Sätzen. Lehnt das Schmerz-Radio innerlich ab, hält die Pflicht aber penibel ein. Misstrauisch gegenüber Hausbesuchen.
- **Hintergrund:** Hat einmal versucht, einen Bewohner zu melden, der die Frequenz manipulierte. Es ist nichts passiert. Seitdem schweigt sie. Sammelt heimlich Wörter, die in offiziellen Mitteilungen nicht mehr vorkommen.
- **Türgespräch:** Öffnet nur einen Spalt. Erkennt Layard als „den Schreiber aus 2611". Zitiert eine Zeile aus seinem letzten veröffentlichten Text — er weiß nicht mehr, dass er den geschrieben hat.
- **Computer (`helka.e67`, 10.67.26.10):** Passwort `bibliothek` (im Dialog erfahrbar, wenn man nach ihrem alten Beruf fragt). Files: `wortliste.txt` (verbotene Wörter), `gemeldet.log` (ihr alter Meldeversuch), `tagebuch_kurz.txt`.
- **Reaktion auf Flugblatt:** Liest es zweimal, gibt es zurück. „Das hat schon mal jemand versucht. 1989. Nehmen Sie es wieder mit, Herr Worag. Und werfen Sie es nicht in meinen Briefschlitz." Setzt intern Flag `helkaWarned`, der eine zusätzliche Datei `gemeldet.log` ergänzt.

### 2612 — Bodo Marschke + Lotti (Begehbar)
- **Alter / Beruf:** Anfang 60, ehemaliger Fernmeldetechniker bei den Stadtwerken. Vorruhestand seit der Sektor-Reform. Heute: nichts.
- **Charakter:** Wortkarg, warm. Spricht über Lotti wie über eine Person. Hat den B3-Nährbrei wegen Lotti durchgesetzt — sie frisst nichts anderes mehr. Trinkt einen synthetischen Aufguss, den er „Tee" nennt.
- **Hintergrund:** Lotti — eine graugetigerte Hauskatze — ist seit 14 Jahren bei ihm. Im Sektor sind Tiere nicht offiziell erlaubt; Bodo hat sie über Insa angemeldet (was Insa nie protokolliert hat). Lotti ist sein einziger Grund, das Radio leise zu lassen — sie zuckt bei voller Lautstärke.
- **Begehbare Wohnung (neue Szene `apt2612`):** Ein zusätzliches AI-generiertes Hintergrundbild im Stil der bestehenden 4:3 Wohnungsbilder. Hotspots: Bodo, Lotti (sichtbar als NPC-Sprite, optional — sonst rein textuell auf Decke/Sessel), Wandtelefon, Bodos Terminal, Wohnungstür.
- **Lotti-Mechanik:** Im Dialog gibt es mehrere Pfade. Beim Hotspot „Decke / Sessel" oder beim Smalltalk fragt Bodo, ob Layard Tiere mag. Wer nachfragt („Sie haben ein Tier?"), erfährt den Namen **Lotti**. Setzt `knowsLotti`. Der Name wird auch in seinem Tagebuch erwähnt (Datei nur sichtbar, wenn man telnet erfolgreich war — also Henne/Ei vermeiden: `tagebuch.txt` ist immer auf seinem Rechner einsehbar nach Login).
- **Computer (`bodo.e67`, 10.67.26.12):** Passwort `Lotti` (case-insensitiv). Telnet-Versuche ohne Wissen → Fehlversuche; Bodos Terminal in der Wohnung lässt sich nur entsperren mit demselben Passwort. Files: `tagebuch.txt`, `lotti_futter.txt` (Bestellliste B3), `funkprotokoll_alt.txt` (technisches Wissen über das Trägersignal — narrativ wertvoll), `notiz_an_mich.txt` („wenn ich es vergesse: Lotti").
- **Reaktion auf Flugblatt:** Lange Stille. „Z.K.S. Den Namen kenne ich. Aus dem Funkprotokoll." Erklärt knapp, dass das Trägersignal seit 1991 manuell nachgeregelt wird — von Hand. Setzt Flag `bodoToldCarrierTruth` und hängt einen Eintrag in seine `funkprotokoll_alt.txt` (via `dynamicFiles`).

### 2614 — Ennis Korr (Türgespräch)
- **Alter / Beruf:** Anfang 30, jüngster im Korridor. Schichtarbeiter Sektor-Logistik, Nacht.
- **Charakter:** Aggressiv-defensiv. Linientreu auf eine ostentative Art. Spricht in Slogans („Hören heißt Gehören"). Wirkt wie jemand, der sich selbst überzeugen muss.
- **Hintergrund:** Vater wurde vor sechs Jahren wegen „revolutionärer Umtriebe" nach E81 versetzt — ein Sektor, aus dem niemand zurückkommt. Ennis hat sich seitdem überangepasst. Sein Terminal-Verlauf erzählt etwas anderes: er liest nachts heimlich alte Pressetexte über E67.
- **Türgespräch:** Öffnet komplett, blockiert mit Körper. Will wissen, warum Layard nicht arbeitet. Bricht ab, sobald jemand Insa erwähnt — sie hat die Versetzung seines Vaters mitprotokolliert.
- **Computer (`ennis.e67`, 10.67.26.14):** Passwort nicht erratbar (kein Hinweis im Dialog) — Telnet schlägt fehl. Erst nach dem Flugblatt-Gespräch (s. u.) lässt sich der Login mit `vater` (in seinem Wortspiel offenbart) öffnen. Files: `dienstplan.txt`, `meldungen_offen.log`, `.versteckt_presse.txt` (Sammlung alter Artikel über E81), `.brief_an_vater.txt` (nie abgeschickt — wird erst sichtbar nach Flag `ennisCracked`).
- **Reaktion auf Flugblatt:** Eskaliert kurz („Das ist Hochverrat"), dann bricht es ab. Sagt leise: „Mein Vater hatte so ein Blatt." Setzt Flag `ennisCracked`. Telnet-Passwort wird ab da als „in Ennis' Stimme mitgehört: *vater*" im Inbox-Log notiert.

## Computernetzwerk

In `Terminal.tsx` werden drei neue Einträge zu `NET_HOSTS` hinzugefügt — analog zur bestehenden `philippe.e67`-Struktur. `net` listet sie automatisch mit auf. `/etc/hosts` wird um die drei IPs ergänzt.

| Host | IP | Passwort | Hinweis im Spiel |
|---|---|---|---|
| `helka.e67` | 10.67.26.10 | `bibliothek` | Dialog: alter Beruf |
| `bodo.e67` | 10.67.26.12 | `Lotti` (case-insensitiv) | Dialog: Tier-Name |
| `ennis.e67` | 10.67.26.14 | `vater` | Erst nach `ennisCracked` |

Tab-Vervollständigung funktioniert dort automatisch (bereits in der vorigen Iteration für Telnet-Hosts implementiert).

## Begehbare Wohnung 2612

- **Neues Asset:** `src/assets/scene-apt-2612.jpg` — 4:3, im selben Stil wie `scene-apartment.jpg` und `scene-apt-2613.jpg` (warmes Licht, gemütlicher als Layards Wohnung, Sessel mit Decke, Terminal auf Beistelltisch). Wird per AI-Bildgenerierung erzeugt.
- **Optionales Sprite:** `src/assets/npc-lotti.png` (kleine getigerte Katze auf Sessel, transparenter Hintergrund) — als `NpcSprite`. Falls Bildgenerierung der Katze nicht überzeugt, fällt sie weg und bleibt rein textuell.
- **Neue Szene `apt2612`** in `scenes.ts` mit Hotspots: Bodo-NPC, Lotti / Sessel, Wandtelefon (rein dekorativ — gibt nur Text), Terminal (öffnet das normale Terminal mit eingeloggtem `bodo.e67`-Sub-Modus, identisch zur Telnet-Sitzung), Tür zurück in den Korridor.
- **Korridor-Hotspot** `door2612` führt nach `apt2612` (sichtbar ab `doorBrokenOpen`).

## Korridor-Türen 2610 und 2614

Zwei neue Hotspots in der `hallway`-Szene, beide aktiv ab `doorBrokenOpen`. Klick öffnet jeweils direkt einen Türgespräch-Dialog (`helkaAtDoor` / `ennisAtDoor`), keine Szene­änderung. Wiederholtes Klicken zeigt Folge-Dialoge (analog Philippes `Probe`-System) — pro Tür ein Intro + 2–3 Folgegespräche, abhängig davon, ob Layard das Flugblatt hat.

Da das Hallway-Hintergrundbild aktuell visuell vermutlich nur 2611/2613 zeigt, werden die neuen Hotspots **transparent** an plausiblen Stellen am Bildrand platziert (links/rechts vom sichtbaren Bereich, mit Label „Tür 2610" / „Tür 2614"). Falls du später ein neues Hallway-Bild willst, das alle Türen zeigt, lässt sich das nachschieben.

## Flugblatt-Mechanik

Sobald Layard das Flugblatt im Inventar hat (`tookFlyer`), bekommt jeder der drei eine zusätzliche Dialogoption „Darf ich Sie etwas zeigen? *(Flugblatt)*". Reaktionen wie oben pro Charakter beschrieben. Jeder reagiert genau einmal — danach ist die Option ersetzt durch Smalltalk.

## Geänderte / neue Dateien

**Neu:**
- `src/assets/scene-apt-2612.jpg` (AI-generiert, 4:3)
- `src/assets/npc-lotti.png` (AI-generiert, optional)
- Drei neue Dialog-Trees in `dialogs.ts`: `helkaAtDoor`, `helkaSmalltalk`, `helkaFlyer`, `bodoIntro`, `bodoLotti`, `bodoSmalltalk`, `bodoFlyer`, `ennisAtDoor`, `ennisSmalltalk`, `ennisFlyer`, `ennisAfterFlyer`

**Erweitert:**
- `src/game/scenes.ts`: neue Szene `apt2612`; neue Hotspots `door2610`, `door2612`, `door2614` in `hallway`
- `src/game/types.ts`: `SceneId` += `"apt2612"`; neue `StoryFlag`-Werte (`metHelka`, `talkedHelka2`, `helkaWarned`, `metBodo`, `knowsLotti`, `bodoToldCarrierTruth`, `metEnnis`, `talkedEnnis2`, `ennisCracked`, plus Flyer-Reaktions-Flags pro Person)
- `src/components/game/Terminal.tsx`: drei neue Einträge in `NET_HOSTS` mit `files` und `dynamicFiles` (letztere reagieren auf `knowsLotti`, `helkaWarned`, `ennisCracked`)
- `src/game/filesystem.ts`: `/etc/hosts` um drei Einträge ergänzt

**Unverändert:**
- Hauptpfad (Sanitäter → Stegmann → Code → Tür → E71) bleibt identisch. Die drei Charaktere sind komplett optional — sie bereichern, blockieren aber nichts.

## Story-Verzahnung (kompakt)

- **Helkas** verbotene Wortliste enthält das Wort, das in Layards Gedanken-Notizen am häufigsten fehlt — eine stille Spiegelung.
- **Bodos** Funkprotokoll bestätigt unabhängig, was Mikael (1534) später erklärt — wer beide Quellen gelesen hat, bekommt im Endgame eine zusätzliche Subtext-Zeile.
- **Ennis'** Vater-Spur ist eine Sackgasse mit Atmosphäre: kein Gameplay-Effekt, aber die emotionale Dichte des Sektors wächst.

