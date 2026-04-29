
# Akt-I-Pflichträtsel „Quittung 4317"

## Was sich gegenüber dem ersten Vorschlag ändert

Pflichtpfad statt optional. **Und**: Brusts Schluss-Reaktion wird
komisch statt bitter — siehe „Brusts Selbstüberführung" weiter unten.

Der Übergang nach Akt II — heute getriggert über das Telefonat in
2611, das den Sektor-Code freigibt — wird hinter das Rätsel gehängt.
Insa rückt den Sektor-Code erst raus, wenn Layard ihr Tillas
Transfer-Code nennen kann.

## Fluss im Überblick

```text
B3-Rätsel (existiert)
        │
        ▼
gaveB3ToPhilippe + gotParamedicsReport + kowalkToldHerDaughter
        │
        ▼
Bericht erneut anschauen ─► noticedTransferCode
        │
        ▼
Zug 1: 4 Items sammeln
   ├─ quittungBlankoB     (Tresen, Kantine)
   ├─ pencilStub          (Bodos Wohnung)
   ├─ siegelAbdruck       (b3Authorization + pencilStub)
   └─ aushang71Original   (Handbuch · "Seite herausnehmen")
        │
        ▼
Zug 2: Bodo-Terminal · `forge`-Befehl  ─► forgedQuittung4317
        │
        ▼
Zug 3: Pneumatik-Rohrpost (Overlay)    ─► sentForgedQuittung
        │
        ▼
Nächster Kantinenbesuch: Rohr-LED grün ─► tillaTransfer (Item)
        │
        ▼
Telefonat Insa: verlangt jetzt zuerst Tillas Transfer-Code
        │
        ▼
Sektor-Code freigegeben ─► Akt II
```

## Brusts Selbstüberführung (Zug 3, neuer Tonfall)

Brust steht am Rohr und liest die Quittung mit. Statt Drama:

- Brust runzelt die Stirn. „Schicht-A-Gegenzeichnung Marschke …
  1996-11-06 … Aushang 7 Punkt 1 …"
- Er greift nach **Aushang 4.2** an der Wand. Liest. Greift nach
  Aushang **7.1**. Liest. Greift nach **4.2**. Liest.
- Frau Kowalk, ohne hochzusehen: „Brust."
- Brust, sehr leise: „Es ist … formal … in Ordnung."
- Brust, noch leiser: „Es ist sogar **vorbildlich** in Ordnung."
- Er drückt selbst den Hebel. Die Hülse rauscht weg.
- Er notiert in sein Klemmbrett: „Quittung 4317-K · einwandfrei ·
  ggf. zur Schulung verwenden." Setzt einen kleinen Haken.
- Frau Kowalk schaut Layard kurz an. Layard schaut zurück. Niemand
  sagt etwas. Lottis abwesende Würde, bei zwei Erwachsenen.

→ Brust hat **nicht** gemerkt, dass er getäuscht wurde. Er hat
gemerkt, dass sein eigenes Regelwerk ihn dazu **zwingt**, die
Fälschung freizugeben — und er ist darauf stolz. Das ist die
Kantinen-Variante des Mikael-Witzes („das System ist makellos, bis
es jemanden umbringt"), zwei Akte früher und in Pantoffelgröße.

Konsequenz: keine `brustOutruled`-/`kowalkSidedWithLayard`-
Bedingung mehr für den Pneumatik-Pfad. Brust nimmt **immer** an,
über sein eigenes Regelwerk. Die früheren B3-Pfade beeinflussen nur
noch eine Pointe in der letzten Zeile (Brust-Klemmbrett-Eintrag
variiert um ein Adjektiv: „einwandfrei" / „mustergültig" /
„exemplarisch"). Macht das Rätsel narrensicher und schiebt den Witz
in die Beobachtung statt in die Verzweigung.

## Wo der Pflicht-Gate sitzt

Im Telefon-Dialogbaum **`insa2`** (Code-Freigabe) wird die Freigabe
an `receivedTillaTransfer` gekettet. Drei Verzweigungen:

- **Code im Inventar** → Insa erkennt 70-2244 („Das ist eine
  E70-K-Nummer. Wo haben Sie die her?"), liefert dann den
  Sektor-Code. → bisheriges Akt-II-Übergangsverhalten.
- **Item nicht da, `noticedTransferCode` aktiv** → Insa: „Bringen
  Sie mir etwas, das ich dem Apparat zeigen kann. Etwas mit
  Stempel von E70." Kein Code.
- **Item nicht da, Trigger nicht ausgelöst** → Insa bleibt beim
  alten „Erst Wartungsarbeiten melden"-Pfad. Beim nächsten
  Bericht-Anschauen wird der Transfer-Code-Absatz enthüllt.

## Anti-Sackgassen-Garantien

| Schritt | Wenn der Spieler hängt | Auffang |
|---|---|---|
| Bericht erneut lesen | Schaut ihn nicht nochmal an | Philippe-Smalltalk: „Lesen Sie das Papier, das ich Ihnen gegeben habe, nochmal. Den Rand." |
| Bleistift finden | Übersieht Pickup in Bodos Wohnung | Lotti, sobald `noticedTransferCode`: „Lotti hat etwas zwischen den Pfoten — einen Bleistiftstummel." |
| Aushang aus Handbuch | Probiert Combine nicht | Look-Text aufs Handbuch: „Seite 7.1 ist nur lose eingelegt." |
| Schicht-A-Unterschrift | Geht nicht zu Bodo | Insa: „Schicht-A-Gegenzeichnung. Marschke war Schicht A, fragen Sie ihn." |
| `forge`-Befehl | Findet ihn nicht | `help` listet `forge` erst, sobald die 4 Items zusammen sind |
| Rohrpost-Versuch zu früh | Items fehlen | Overlay zeigt explizit, was im Rohr fehlt, bevor der Hebel scharf wird |

## Was an Code/Assets neu gebraucht wird

**Items**: `pencilStub`, `siegelAbdruck`, `aushang71Original`,
`quittungBlankoB`, `quittungForged4317`, `tillaTransfer`.

**Flags**: `noticedTransferCode`, `bodoSignedForTilla`,
`forgedQuittung4317`, `sentForgedQuittung`, `receivedTillaTransfer`.
(`brustNoticedForge` entfällt — Brust merkt's prinzipiell nicht.)

**Dialoge**: `bodoSignsForTilla`, `kowalkAfterForge`,
`brustOnTube` (eine Linie, drei Adjektiv-Varianten am Ende),
Erweiterung `insa2`/`insa2a` um den Tilla-Gate, je 1 Zeile bei
Philippe und Insa als Hint.

**Hotspots**: `cafeteriaQuittungsblock`, `bodoPencil`,
`cafeteriaPneumaticTube` von `look` auf `use`.

**UI**: `PneumaticTubeOverlay.tsx` (kleines Overlay analog
`LobbyGate`).

**Terminal**: `forge`-Befehl in `filesystemBodo.ts` mit
Inventar-Validierung.

**Combine**: `b3Authorization + pencilStub → siegelAbdruck`,
„Seite 7.1 herausnehmen" als Self-Action am Handbuch.

**Bericht-Update**: zweiter Absatz erscheint dynamisch, sobald die
Trigger erfüllt sind.

## Was bewusst NICHT gemacht wird

- Keine neue Szene, kein neuer NPC.
- Keine neue Tür. Pflicht-Gate hängt am bestehenden `insa2`.
- Akt-II-Inhalte bleiben unverändert, das Rätsel ändert nur den
  Übergang.
