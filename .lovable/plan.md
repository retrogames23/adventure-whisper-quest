
## Ziel

Zwei narrative/UX-Probleme beheben:

1. **Insas Auftrag glaubwürdiger machen.** Aktuell sagt sie nur diffus „Ich brauche eine Probe vom Knoten". Künftig: Sie hat seit langem den Verdacht einer **illegalen Installation** im Knoten 5610 und wartet seit Wochen auf die Genehmigung des Sektorbeauftragten E67, das nachzuprüfen — der aber, wie Layard heute selbst gesehen hat, gar nicht im Dienst ist. Sie nutzt Layards Anwesenheit, um die Probe „inoffiziell" zu bekommen.
2. **Zugang zum Serverraum 5610 entkoppeln vom Keypad-Code.** Sonst gibt es zwei Code-Türen direkt hintereinander (5610 und Sektor-Tür E67/E71). Stattdessen: Tür 5610 öffnet sich per **Wartungs-Override** — Insa schickt fernausgelöst die Magnetriegel auf, oder Layard nutzt eine **Wartungskarte** (von Bodo / aus Mira-Spur) am Kartenleser. Kein Zifferncode mehr.

---

## 1. Insas Motivation — Dialog-Überarbeitung

**Datei:** `src/game/dialogs.ts`

### 1.1 `insaDispatch` — Pflicht-Pfad (`idPflicht1`–`idPflicht4`) neu schreiben

Bisher: vage „Ich brauche eine Probe". Neu: ehrliche Begründung, die an die laufende Geschichte andockt (leeres Büro 1534 in E71 → kein Sektorbeauftragter heute im Dienst).

Vorgeschlagener neuer Text (vier Beats, gleiche Knoten-IDs, gleiche `hiddenWhen`-Logik bleibt, nur Text + leichte Struktur ändern):

- **`idPflicht1` (INSA):**
  „Herr Worag — bevor ich Ihnen den Code gebe, brauche ich etwas von Ihnen. Es ist nicht ganz Standardprotokoll. Aber Sie waren heute selbst in 1534. Sie wissen, dass der Abschnittsverantwortliche E67 nicht da ist."
  *subtext:* „Sie sagt das nicht als Vorwurf. Eher: als geteilte Beobachtung."

- **`idPflicht2` (INSA):**
  „Seit Wochen läuft im Knoten 5610 — Korridor 56, Wartungstür hinter der „Technik"-Plakette — etwas, das in keinem Wartungsplan steht. Mehr Datenverkehr, als E67 erzeugen kann. Falsche Quell-Routen. Ich vermute eine Installation, die nicht genehmigt ist."
  *subtext:* „Sie hat das schon oft formuliert. Nur nie laut."

- **`idPflicht3` (INSA):**
  „Ich habe einen Antrag auf Inspektion gestellt. Er liegt seit elf Tagen beim Sektorbeauftragten E67. Heute hätte er ihn unterschreiben sollen. Er ist nicht da. Und morgen ist er auch nicht da."
  *subtext:* „Sie hat bis 18:00 gewartet, bevor sie das eingestanden hat."

- **`idPflicht4` (INSA):**
  „Sie sind ohnehin in E67 unterwegs. Gehen Sie zur Wartungstür 5610. Am Wartungsterminal tippen Sie »tap« — das ist ein Read-only-Mitschnitt, nichts, was auffällt. Danach rufen Sie mich an. Erst dann kann ich Ihnen den Code geben — als Gegenleistung sozusagen."
  *subtext:* „Sie sagt »Gegenleistung«, als würde sie das Wort selbst zum ersten Mal verwenden."

  Choice „Verstanden. Auf Wiederhören." behält Funktion: setzt `insaSentTo5610`, `skippedExitReport`, und legt **keine** Wartungsnotiz mehr ans Inventar (siehe 2.3) — stattdessen die neue **Wartungs-Override-Token-Mail** bzw. **Karten-Hinweis**.

### 1.2 `insa2` — Pflicht-Beats `x4pflicht1` und `x4pflicht2` analog kürzen

- **`x4pflicht1` (INSA):** kurz aber mit derselben Begründung — „Bevor ich den Code gebe: Ich brauche die Probe aus 5610. Sie wissen, warum: der Abschnittsverantwortliche, der mein Inspektionsformular unterschreiben müsste, ist heute nicht im Dienst. Korridor 56, Wartungstür. »tap« am Terminal, danach Anruf."
- **`x4pflicht2` (INSA):** wird zu einem **Override-Hinweis** statt Code:
  „Die Tür kennt Sie schon — und falls nicht, gebe ich von hier aus den Wartungs-Override frei. Geben Sie mir zwanzig Sekunden, dann sind die Riegel offen. Aber das wissen Sie nicht von mir."
  Choice „Verstanden. Auf Wiederhören." setzt `insaSentTo5610` **und** `serverRoom5610OverrideArmed` (neuer Flag, siehe 2.1) — keine Wartungsnotiz mehr ins Inventar.

### 1.3 `idPflicht4`-Choice ebenfalls auf Override umstellen

Im `insaDispatch`-Pflicht-Pfad ebenfalls `serverRoom5610OverrideArmed` setzen statt der bisherigen Notiz mit dem Wartungsmuster.

---

## 2. Zugang Tür 5610 — Code raus, Override/Karte rein

### 2.1 Neue StoryFlags

**Datei:** `src/game/types.ts`

Im `StoryFlag`-Union ergänzen (in der bestehenden 5610-Gruppe):
- `serverRoom5610OverrideArmed` — Insa hat den Wartungs-Override scharfgeschaltet (Pflicht-Pfad).
- `hasMaintCard5610` — Layard besitzt eine physische Wartungskarte für die Tür 5610 (Bodo- oder Mira-Spur).

`serverRoom5610Open` bleibt wie gehabt; das ist der „Tür ist offen"-Endzustand.

### 2.2 Tür 5610 in `corridor56`: kein Keypad mehr, sondern szenische Auflösung

**Datei:** `src/game/scenes.ts`, Hotspot `door5610` (~Zeilen 1743–1786)

Neue `onUse`-Logik (kein `openKeypad("door5610")` mehr):

```ts
onUse: (api) => {
  if (api.hasFlag("serverRoom5610Open")) {
    api.goTo("serverRoom5610");
    return;
  }

  // (a) Insa hat ferngesteuert die Riegel freigegeben (Pflicht-Pfad)
  if (api.hasFlag("serverRoom5610OverrideArmed")) {
    api.setFlag("serverRoom5610Open");
    api.showText([
      "Ein leises Klacken in der Wand — die Magnetriegel geben nach.",
      "Insa hat Wort gehalten.",
      "Hinter der Tür: kein Korridor. Ein Raum.",
    ], () => api.goTo("serverRoom5610"));
    return;
  }

  // (b) Layard hat eine Wartungskarte (Bodo / Mira)
  if (api.hasFlag("hasMaintCard5610") || api.hasItem("maintCard5610")) {
    api.setFlag("serverRoom5610Open");
    api.showText([
      "Layard hält die Wartungskarte an den Leser.",
      "Ein dumpfes Surren, ein Klacken im Schloss.",
      "Hinter der Tür: kein Korridor. Ein Raum.",
    ], () => api.goTo("serverRoom5610"));
    return;
  }

  // (c) Erstkontakt / noch keine Berechtigung
  if (!api.hasFlag("saw5610Door")) {
    api.setFlag("saw5610Door");
    api.showText([
      "Eine Stahltür, schmal, in die Wand eingelassen.",
      "Schild: »5610 · Technik · Kein Zutritt«.",
      "Kein Keypad — nur ein flacher Kartenleser und ein blaues",
      "Wartungs-LED, das ruhig blinkt. Ohne Berechtigung kein Zutritt.",
    ]);
  } else {
    api.showText([
      "Die Tür gibt nicht nach. Der Kartenleser blinkt blau.",
      "Ohne Wartungskarte oder Freigabe der Leitstelle bleibt sie zu.",
    ]);
  }
},
```

`visible`-Logik bleibt — die Tür wird also weiterhin nur sichtbar, wenn eine der Spuren erfüllt ist.

### 2.3 Inventar-Item `wartungsnotiz5610` → Wartungskarte

**Dateien:** `src/game/dialogs.ts` (Funktion `maybeGiveWartungsnotiz5610` und alle Stellen, die die Notiz vergeben)

Statt Notiz „7-0-Pause-3-2" eine **Wartungskarte** (Item) vergeben — diese steht für Bodos & Philippes Spur (er hat ihm „seine alte" Karte zugesteckt / Layard rekonstruiert die Existenz aus Philippes Andeutungen → er holt sie aus Bodos Werkbank ab; Detail beim Implementieren).

```ts
// Umbenennen + Bedeutung ändern
api.addItem({
  id: "maintCard5610",
  name: "Wartungskarte (E67 · 56er-Korridor)",
  description:
    "Eine abgegriffene blaue Plastikkarte. Auf der Rückseite mit Bleistift: „5610 · nur Bodo“.",
});
api.setFlag("hasMaintCard5610");
```

Alle 3 bisherigen Stellen in `dialogs.ts`, die das `wartungsnotiz5610`-Item vergeben (Zeilen ~15–22, ~602–609, ~724–731) anpassen → Karte statt Notiz, **außer** im Pflicht-Pfad: dort wird stattdessen `serverRoom5610OverrideArmed` gesetzt (Insa öffnet remote, kein Karten-Hand-out).

Tatsächliche Quelle der Karte:
- **Bodo-Spur:** Bei einem der Bodo-Dialoge (zu prüfen welcher; vermutlich der mit dem alten Wartungscode 7032) wird stattdessen die Karte überreicht.
- **Mira-Spur:** Frequenz-Schnelltaste fällt weg (siehe 2.4); stattdessen erhält Layard die Karte, wenn `miraSystemic` + Radio-Bedingung erfüllt sind, an passender Stelle in Miras Dialog.
- **Philippe-Sonden ≥3:** Funktion `maybeGiveMaintCard5610` (Umbenennung) gibt die Karte.

### 2.4 `Keypad.tsx` — `door5610`-Branch entfernen

**Datei:** `src/components/game/Keypad.tsx`

- `LockConfig`-Branch für `keypadTarget === "door5610"` löschen.
- `showFreqSlot` + Frequenz-Schnelltaste komplett entfernen (nur für 5610 relevant gewesen).
- `Keypad` bedient damit nur noch die Sektor-Tür E67/E71 (8-stellig, `06111997`).

**Datei:** `src/game/types.ts`
- `KeypadTarget` auf `"sectorDoor"` reduzieren (Type-Union zu Single-Literal); ggf. `keypadTarget`-State in `GameContext.tsx` vereinfachen oder den Parameter optional/ignored lassen.

**Datei:** `src/game/GameContext.tsx`
- `keypadTarget`-State und Setter entfernen oder als const fixieren.
- `openKeypad(target?)` darf bleiben, ignoriert aber jetzt das Argument.

### 2.5 Keine Spielraum-Verluste prüfen

- Im Wartungsterminal-Flow (`nodeOpen`/`tap`) wird **nichts** geändert — `tap` setzt weiter `tappedNode5610`, der Insa-Anruf-Pfad in `scenes.ts` (Zeilen 71–79) bleibt funktional.
- Der `cheat 0001` und alle anderen Skip-Pfade berühren `serverRoom5610Open` direkt nicht; falls Tests aufzeigen, dass jemand ohne `OverrideArmed`/`hasMaintCard5610` die Tür danach nicht mehr öffnen kann: in `cheat 0001` zusätzlich `hasMaintCard5610` setzen.

---

## 3. Akzeptanzkriterien

- Insas Pflicht-Dialog erklärt nachvollziehbar, **warum** sie die Probe braucht (illegale Installation, hängender Inspektionsantrag, Sektorbeauftragter heute nicht da) und referenziert Layards eigene Erfahrung in 1534.
- Tür 5610 öffnet sich **ohne** Keypad. Drei narrative Wege:
  1. Insa-Pflicht-Pfad: Remote-Override.
  2. Bodo: Wartungskarte als Item.
  3. Philippe-Sonden ≥3: rekonstruierte Karte.
  4. Mira-Spur: ebenfalls Karte (statt Frequenz-Schnelltaste).
- Keypad-UI hat keinen 5610-Branch und keinen Frequenz-Slot mehr; `KeypadTarget`-Type ist auf Sektor-Tür reduziert.
- `cheat 0001` führt weiterhin nicht in einen toten Zustand bzgl. Tür 5610.
- Keine Dead-Ends: jede vorher mögliche Spur zur Tür endet in einem Öffnen-Mechanismus, der ohne Code-Eingabe auskommt.

