## Ziel

Du sollst alle Dialoge des Spiels (`src/game/dialogs.ts`, ca. 3640 Zeilen, ~70 Dialogbäume) als gut lesbare Textdatei zum Bearbeiten bekommen — und die bearbeitete Version später wieder in den Spielcode einspielen können.

## Lösungsweg

Die Dialoge stecken aktuell in einer TypeScript-Datei mit Code (Callbacks, Bedingungen, Items). Reiner Klartext-Export ist deshalb nicht 1:1 reversibel — wir trennen daher **Text** (von dir bearbeitbar) und **Logik** (bleibt im Code).

### Format: YAML

Ich exportiere die Dialoge als **YAML-Datei**, weil:
- gut lesbar für Menschen, mehrzeilige Texte ohne Escaping
- jede Dialogzeile als Block mit `id`, `speaker`, `text`, optional `subtext` und Auswahlmöglichkeiten
- Logik-Felder (`requires`, `hiddenWhen`, `next`, `action`, `onEnd`) werden als Kommentare bzw. Read-only-Felder mitgeführt, damit du sie siehst, aber nicht versehentlich kaputt machst

Beispiel-Auszug:
```yaml
- tree: philippeAtDoor
  lines:
    - id: p2
      speaker: PHILIPPE
      text: |
        Hallo. Ich bin Philippe. Ich … habe ein Problem.
        Ich weiß nicht, was ich tun soll.
      subtext: "Echte Angst. Er hat das nicht im Schauspielkurs gelernt."
      # next: p3   (Logik – nicht ändern)
```

### Schritt 1 — Export (jetzt sofort, einmalig)

Ich schreibe ein kleines Node-Skript, das `src/game/dialogs.ts` lädt und alle `DialogTree`-Objekte in eine YAML-Datei schreibt:

- `dialogs.yaml` — alle ~70 Dialogbäume mit Speaker, Text, Subtext und Auswahltexten
- Logik-Felder werden als Kommentare angezeigt, damit du den Kontext siehst
- Ablage in `/mnt/documents/dialogs.yaml` zum Download

Du erhältst direkt einen `presentation-artifact`-Link zum Herunterladen.

### Schritt 2 — Re-Import (wenn du die bearbeitete Datei zurückgibst)

Sobald du die bearbeitete `dialogs.yaml` hochlädst, läuft ein Import-Skript:

1. Lädt aktuelle `src/game/dialogs.ts` und parst die Struktur (mit TypeScript-AST, `ts-morph`).
2. Liest deine YAML-Datei.
3. Ersetzt für jede Zeile die Felder `text`, `subtext` sowie Choice-`text`-Felder durch deine neuen Werte.
4. Lässt alle Code-Felder (`action`, `onEnd`, `next`, `requires`, …) **unangetastet**.
5. Schreibt die Datei zurück und führt den Build aus, um sicherzustellen, dass alles sauber kompiliert.

So bleiben Spiellogik, Items und Flags garantiert konsistent — du veränderst ausschließlich Wortlaut.

### Was du bearbeiten darfst / nicht darfst

| Feld | Bearbeitbar? |
|---|---|
| `text` | Ja |
| `subtext` (Schmerz-Radio-Einblendung) | Ja |
| Choice-Texte (Antwortoptionen) | Ja |
| `speaker` | Ja, aber nur aus der bekannten Liste (LAYARD, PHILIPPE, INSA, …) |
| `id`, `next`, `requires`, `hiddenWhen`, `action`, `onEnd` | Nein — werden ignoriert beim Re-Import |

Wenn eine `id` in deiner YAML fehlt oder nicht im Code existiert, melde ich das beim Import als Warnung, statt stillschweigend Texte zu verlieren.

### Optional (später)

Falls dir YAML zu technisch ist, kann ich alternativ ein **Markdown-Format** mit Überschriften pro Dialog und reinen Textblöcken pro Zeile generieren. YAML ist robuster für den Re-Import; Markdown ist bequemer zum Lesen. Sag mir gerne, wenn du das lieber magst.

## Umsetzungsschritte

1. Export-Skript schreiben (`scripts/export-dialogs.mjs`), `dialogs.yaml` nach `/mnt/documents/` schreiben und dir als Artefakt anbieten.
2. Import-Skript anlegen (`scripts/import-dialogs.mjs`) inkl. ts-morph als Dev-Dependency, damit der spätere Re-Import per Knopfdruck funktioniert. Anleitung dafür gebe ich dir mit.
3. Kurze README im Projekt (`scripts/DIALOGS.md`) mit den Regeln aus der Tabelle oben.

Nach Freigabe lege ich los und liefere dir die `dialogs.yaml` direkt zum Download.
