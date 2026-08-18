# Organische Hinweise: „Der Code liegt bei der Leitstelle — und Miras Maschine kommt dran“

Der Spieler erfährt nach dem Duell zuverlässig, **wo** der Code liegt (Verteiler
`leitstelle.e67`), aber nirgends im Spiel — außer im Hinweis-System — **wie** man
dort hinkommt. Die Lücke wird an vier Stellen diegetisch geschlossen, in
steigender Deutlichkeit.

## 1. Das eigene Terminal sagt, was fehlt

Heute endet `telnet leitstelle.e67` bei Layard mit „Authentifizierung
erforderlich" und einer stummen Fehlanmeldung. Neu:

- Nach einem Fehlversuch nennt der Host die zweite zugelassene Zugangsart:
  Dienstpasswort **oder** ein Anschluss im Wartungs-IP-Bereich (10.67.56.x).
  Layards eigener Anschluss (10.67.26.11) steht ausdrücklich als „nicht
  freigegeben" daneben.
- Die Sperrmeldung von `inbox` bekommt eine Zeile in derselben Amtsschrift:
  Abruf nur über einen Anschluss im Wartungsnetz.

Damit hat der Spieler ein präzises Suchkriterium: eine Maschine im Wartungsnetz.

## 2. Mira legt den Hinweis vorher selbst

In der Reparaturszene erklärt Mira ohnehin die Ummeldung. Sie hängt einen
beiläufig-stolzen Halbsatz an: ihr Kasten hängt am Wartungsstrang und fragt bei
niemandem nach einem Passwort. Kein Rätselwink, sondern Angeberei — der Spieler
erinnert sich später daran.

## 3. Bodo erklärt es als Techniker

Neuer Gesprächszweig bei Bodo (2612), verfügbar sobald der Code verschickt und
der Anschluss gesperrt ist: Er sagt, dass es das Dienstpasswort dienstlich nicht
gibt, dass das Wartungsnetz die Ausnahme ist — und dass sich „das Kind aus dem
46er" an den Etagendrucker geklemmt hat. Er billigt es nicht, er stellt es fest.

## 4. Philippe als zweite, schwächere Spur

Philippe erwähnt auf Nachfrage das Kabel, das im vierten Stock hinter der Wand
zum Drucker läuft. Redundanz für Spieler, die Bodo nicht ansprechen.

## 5. Layards eigene Schlussfolgerung

Sobald mindestens eine dieser Quellen gesehen wurde (neues Flag
`knowsMiraNetAccess`), benennt Layard das Ziel selbst — am roten Keypad der
Sektor-Tür und in der Terminal-Sperrmeldung heißt es dann nicht mehr vage „eine
andere Maschine", sondern die Maschine im 46er. Vorher bleibt der Text vage, wie
bisher.

## Technische Umsetzung

- `src/game/types.ts`: Flag `knowsMiraNetAccess`.
- `src/game/netHosts.ts`: `leitstelle.e67` bekommt einen Fehlanmelde-Hinweis
  (Wartungs-IP-Bereich) — als optionales Feld `authHint` am Host.
- `src/components/game/Terminal.tsx`: `authHint` bei Fehlversuch ausgeben,
  Flag setzen; `inbox`-Sperrmeldung um die Wartungsnetz-Zeile ergänzen.
- `src/game/dialogs/mira.ts`: Halbsatz in der Reparatur-Abschlusszeile.
- `src/game/dialogs/bodo.ts`: Zweig unter `calledForCode` + `port2611Locked`,
  setzt `knowsMiraNetAccess`.
- `src/game/dialogs/philippe.ts`: kurze Kabel-Zeile, setzt dasselbe Flag.
- `src/game/scenes/sectorAct1.ts` und Terminal-Sperrtext: zweite Variante bei
  gesetztem Flag.
- `src/game/hints.ts`: Hinweis 14b so umformulieren, dass er die Ingame-Quellen
  nennt (Bodo/Mira) statt die Lösung vorwegzunehmen.
- Abschluss: Typecheck, `scripts/quest-check.mjs`, `scripts/hints-check.mjs`.
