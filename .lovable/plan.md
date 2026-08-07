# Rätselkette Akt I sauber aufsetzen: Telefon → Umschaltung → Leitstellen-Knoten

## Problem heute
Der Sektor-Code kann bei Vossbeck gewonnen werden, bevor das Telefon je kaputt war. Trotzdem wird beim Duell-Sieg `port2611Locked` gesetzt — für den Spieler kommt die gesperrte Inbox aus dem Nichts, und der ganze Telefon-/Mira-Strang wird übersprungen.

## Neue, lineare Kette
```text
1. Telefon in 2611 stirbt (Sirren)          -> phoneBroken
2. Aufkleber: Störung nur über Etagenwartung
3. Mira 4601: Störungsmeldung + Reparatur   -> miraRepairDone
   Mira meldet Apparat UND Datenport auf den
   Leitstellen-Knoten um                    -> port2611Locked
   ("Telefon geht wieder, Post läuft ab jetzt
     über leitstelle.e67, nicht mehr über dein Terminal")
4. Erst jetzt: Insa vermittelt zu Vossbeck  -> insaSentToKowalkForCode
5. Bürokratie-Duell gewonnen                -> vossbeckGaveCode + calledForCode
   Code liegt im Verteiler der Leitstelle, NICHT in 2611
6. Zugriff auf leitstelle.e67 nur über Miras Maschine
   (Vertrauens- oder Heizungspfad) -> Code -> Keypad
```

## Änderungen

**1. Telefon geht früher kaputt (`src/game/scenes/apartmentAct1.ts`)**
Auslöser vorziehen: Der Apparat stirbt beim ersten Anrufversuch nach `sawEmptyOffice` + `protocolReceived` — also *vor* dem Insa-Gespräch, das zu Vossbeck führt. Die Bedingung `calledStegmann || mikaelRejectedProtocol` entfällt als Voraussetzung für den Defekt.

**2. Umschaltung nur noch an einer Stelle setzen (`src/game/dialogs/mira.ts`)**
`port2611Locked` wird ausschließlich bei der Reparatur gesetzt, zusammen mit `miraRepairDone`. Miras Text erklärt Ursache und Wirkung in einem Satz: Apparat und Datenport hängen jetzt am Leitstellen-Knoten, Post landet dort.

**3. `port2611Locked` aus Duell und Insa entfernen**
- `src/game/dialogs/bureaucracyDuel.ts` (`resolveEndgame`): setzt nur noch `vossbeckGaveCode` + `calledForCode`.
- `src/game/dialogs/insa.ts` (`insaCallbackAfterBurn`): setzt `port2611Locked` nicht mehr.

**4. Vossbeck-Pfad hinter der Reparatur gaten (`src/game/dialogs/insa.ts`)**
Die Vermittlung zu Kowalk/Vossbeck (`insaSentToKowalkForCode`) ist erst wählbar, wenn `miraRepairDone` gesetzt ist. Solange nicht, sagt Insa, über einen toten Anschluss könne sie keinen Vorgang eröffnen. Damit ist die Reihenfolge Telefon → Mira → Code garantiert.

**5. Terminal-, Keypad- und Netz-Texte konsistent (`src/components/game/Terminal.tsx`, `src/game/scenes/sectorAct1.ts`, `src/game/netHosts.ts`)**
Überall dieselbe Begründung: „Datenport 2611 auf Leitstellen-Knoten umgemeldet (Wartung Korridor 46) — Zustellung erfolgt an leitstelle.e67.“ Statt „Prüfsperre“ ohne Erklärung.

**6. Hinweise nachziehen (`src/game/hints.ts`)**
- Neuer Hinweis nach `phoneBroken`: Etagenwartung 4601 aufsuchen.
- Der bestehende Hinweis zur gesperrten Inbox greift erst ab `calledForCode` + `port2611Locked`, mit klarem Ziel: leitstelle.e67 über Miras Maschine.

## Technisch
Keine neuen Flags nötig; `port2611Locked` bekommt eine einzige Schreibstelle. Laufende Spielstände, die den Code ohne Telefon-Strang haben, bleiben spielbar: dort fehlt `port2611Locked`, die Inbox funktioniert normal. Abschluss mit Typecheck.