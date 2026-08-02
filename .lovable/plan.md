# Mira wird Pflichtstation in Akt I — eigenständiges Telefon-Rätsel

## Kurs-Korrektur

Der vorherige Plan hing Mira als Siegel-Gate in die Formblatt-/Vossbeck-Kette.
Das überfrachtet ein Rätsel, das schon aus Kowalk, Brust, Duell und Vossbeck
besteht. Stattdessen bekommt Mira ein **eigenständiges Rätsel** an einer
anderen, ohnehin zwingenden Stelle der Akt-I-Kette: dem Telefon in der Wohnung.

## Der Angelpunkt: das tote Telefon

Der Anruf bei Insa (Wohnung, `phoneApt` → `insa2a`) ist Pflicht: ohne ihn gibt
es kein Briefing, keinen Vossbeck-Pfad, keinen Tagescode. Genau dieser Anruf
schlägt künftig beim ersten Versuch fehl.

```text
Rückkehr aus Etage 3 (leeres Büro) + Protokoll
        |
        v
Telefon abheben -> tot. Ein Knacken, dann Stille.        <-- neu
        |
        v
Hausmeister/Bodo/Aushang: Wandapparate sind Hausinstallation,
Werkzeug liegt bei der Bewohnervertretung, Schicht A.
        |
        v
MIRA (Korridor 46): Prüfhörer + Vierkant der Vertretung   <-- neu, zwingend
        |
        v
Telefon repariert -> Anruf bei Insa -> bestehende Kette unverändert
```

Vossbeck, Brust, Kowalk und das Bürokratie-Duell bleiben **unangetastet**.

## Das auslösende Ereignis

Beim Ausstieg aus dem Aufzug auf Etage 4 (Rückweg von Etage 3) gibt es einen
kurzen Spannungseinbruch: Licht flackert, die Notklingel im Schacht schlägt an.
Lore-konform als **Resonanzspitze** eingeordnet — der Hausanschluss der
Etage 46 ist danach auf einer Ader tot. Das Ereignis ist nicht optional, es
läuft beim Betreten der Wohnung als kurzer Textbeat.

## Miras Preis

Mira ist Bewohnervertretung Schicht A und führt den Werkzeugsatz der
Hausinstallation (Prüfhörer, Vierkantschlüssel, Klemmleiste). Sie gibt ihn
nicht heraus — sie kommt mit, und sie stellt eine Bedingung:

- **Bedingung:** eine Minute Funkstille im Gang, Radio *aus*, vor ihren Augen.
  Nutzt die vorhandene Mechanik (`radioMutedAtLeast60s`), ist immer erfüllbar.
- **warm** — Stille ausgehalten und nachgefragt: sie repariert, redet über
  Schacht 56 und lädt Layard in die 4601 ein.
- **neutral** — nur Stille ausgehalten: sie repariert, bleibt knapp, nennt 4601.
- **kalt** — Radio bleibt an oder Layard drängelt: sie repariert trotzdem
  (Hausinstallation ist Pflicht der Vertretung), notiert ihn aber als Vorgang
  und schreibt ihn ab.

In allen drei Fällen funktioniert das Telefon danach. Kein Dead End, nur Ton,
Zugang zu 4601 und Mira-Endstate für Akt II unterscheiden sich.

## Was das nebenbei repariert

- **Sackgasse 4601:** Tür hängt bisher allein an der gewonnenen
  Vertrauensprobe. Künftig öffnet der Reparatur-Ausgang (warm/neutral) die Tür;
  nur der kalte Ausgang sperrt optionale Inhalte.
- **Mira-Endstate:** `neutral` heißt künftig „hat geholfen, nicht mehr" statt
  „nie getroffen".
- **Toter Verstärker-Strang:** Bernstein-Resonator und Antennen-Draht bekommen
  je eine echte Fundstelle (Wartungsschrank / über Bodo), passend zu Miras
  Ansage. Damit ist der `friendly`-Endstate erstmals erreichbar. Optional.

## Lore-Konsistenz

- Bewohnervertretung Schicht A steht bereits in LORE.md §8; der Plan macht
  daraus eine spielbare Zuständigkeit (Hausinstallation) statt einer neuen Rolle.
- Die Störung wird als Resonanzspitze *vermutet*, nicht bestätigt — Miras
  Verdacht gegen die Verwaltung bleibt Vermutung (LORE.md §7).
- Tonfall bleibt höflich-bürokratisch, keine Verletzung der Tabu-Liste.

## Technische Umsetzung

- `src/game/types.ts`: Flags `phoneDead`, `phoneFixed`, `knowsMiraHasTool`,
  `miraHelpWarm`, `miraHelpCold`.
- `src/game/scenes/apartmentAct1.ts`: `phoneApt` prüft `phoneDead` vor allen
  bestehenden Zweigen und zeigt den Defekt-Text; Textbeat beim Betreten setzt
  `phoneDead` (einmalig, an `protocolReceived` + `sawEmptyOffice` gekoppelt).
- `src/game/dialogs/mira.ts`: neuer Dialog `miraPhoneRepair` mit den drei
  Ausgängen; `miraTrustProbe` wird optionaler Vertiefungs-Ast statt Türwächter.
- `src/game/scenes/corridorsE67.ts`: Hotspot-Routing auf den Reparatur-Dialog,
  Mira während dieses Fensters fest auf Etage 4; `door4601Enter` von
  `miraTrustEarned` auf „repariert und nicht kalt" umstellen.
- Hinweisquellen: Aushang im Korridor 46 und ein Satz bei Bodo, dass die
  Vertretung Schicht A das Werkzeug führt (setzt `knowsMiraHasTool`).
- `src/game/miraState.ts`: `computeMiraEndState` um die Reparatur-Ausgänge.
- `src/game/hints.ts`: neue Pflicht-Quest „Das Telefon ist tot" vor
  `act1.callInsaForCode`; Mira-Vertrauens-Quest als optional umformulieren.
- `LORE.md` / `mem/features/` um den Abschnitt Hausinstallation ergänzen,
  danach `quest-check` und `hints-check` laufen lassen.
