# Mandatsdeutsch-Begriffe sparsam in bestehende Dialoge einweben

Aus dem Anhang „Kleines Verzeichnis“ (Buch *Mandatsdeutsch*, 1993): Sprawka, Naryad, Kontingjent, Case/Casenummer, in Regel, Dossier, es ergeht, nicht vorgesehen, vorbehaltlich.

Regel für alle Vorschläge: höchstens ein Begriff pro Szene, immer so gesetzt, dass der Sinn aus dem Satz selbst hervorgeht — auch ohne Kenntnis des Buchs.

## Vorschlag 1 — Vossbeck, Duell gewonnen (`bureaucracyDuel.ts`, `checkWon`)

Alt:
"Bewohner Worag. Sie sind im Behörden-Ton zu Hause. — Antrag auf Tagescode für Sektor-Tür E67/E71: bewilligt. Ich lege den Code in Ihr Terminal-Postfach. Datum, ohne Punkte. Acht Ziffern."

Neu (*es ergeht*, *vorbehaltlich*):
"Bewohner Worag. Sie sind im Behörden-Ton zu Hause. — Es ergeht: Antrag auf Tagescode für Sektor-Tür E67/E71 bewilligt, vorbehaltlich. Ich lege den Code in Ihr Terminal-Postfach. Datum, ohne Punkte. Acht Ziffern."

## Vorschlag 2 — Insa, Vorgangsblock (`insa.ts`, `x4pflicht1`)

Alt:
"Worag — Ihr Vorgang Vier-Drei-Eins-Sieben hängt noch. Solange der Block auf Ihrem Datensatz steht, kann ich den Code nicht herausgeben."

Neu (*Casenummer*):
"Worag — Ihr Vorgang hängt noch. Casenummer Vier-Drei-Eins-Sieben. Solange der Block auf Ihrem Datensatz steht, kann ich den Code nicht herausgeben."

## Vorschlag 3 — Kowalk, Bedingung (`cafeteria.ts`, `kInsa5`)

Alt:
"Aber — und das ist die Bedingung, Worag — E70-K nimmt eine 4317-K nur an, wenn der Stamm-Vorgang 4317 frisch gegengezeichnet vorliegt. Ohne den landet Ihre Quittung im Aushang."

Neu (*Sprawka*):
"Aber — und das ist die Bedingung, Worag — E70-K nimmt eine 4317-K nur an, wenn der Stamm-Vorgang 4317 frisch gegengezeichnet vorliegt. Eine Sprawka für die nächste Sprawka, wie immer. Ohne den landet Ihre Quittung im Aushang."

## Vorschlag 4 — Philippe, Telefonreparatur (`philippe.ts`, `pp7`)

Alt:
"Lassen Sie ihn reparieren. Wohnungsapparate laufen über die Korridor-Wartung, nicht über die Leitstelle. Für 46 ist die Anwärterin zuständig, Tür 4601."

Neu (*Naryad*):
"Lassen Sie ihn reparieren. Wohnungsapparate laufen über die Korridor-Wartung, nicht über die Leitstelle. Sie brauchen keinen Naryad dafür, keinen Zuteilungsschein — nur die Anwärterin für Korridor 46, Tür 4601."

## Vorschlag 5 — Mira, Heizung (`mira.ts`, `moh2`)

Alt:
"Ich warte, bis es abkühlt. Melden bringt nichts, für Betriebstechnik ist niemand zuständig, den man erreichen kann. Kennst du ja."

Neu (*nicht vorgesehen*):
"Ich warte, bis es abkühlt. Melden bringt nichts — für Betriebstechnik ist Kontakt mit Bewohnern nicht vorgesehen. Nicht abgelehnt. Nicht vorgesehen. Kennst du ja."

## Optional (nur auf Wunsch)

Helka (`helkaTeachAttack1`): „in Regel“ als beiläufige Bemerkung über Brusts Türschild — würde die Pointe aber leicht verwässern, deshalb nicht in den fünf Hauptvorschlägen.

## Umsetzung

Fünf reine Textänderungen in `bureaucracyDuel.ts`, `insa.ts`, `cafeteria.ts`, `philippe.ts`, `mira.ts`. Keine Logik-, Flag- oder ID-Änderungen.
