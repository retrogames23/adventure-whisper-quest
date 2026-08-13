# Wohnung 1103 — Walter, der Resonanz-Tüftler

Hinter Tür 1103 (Korridor 11, E71) wohnt ab jetzt Walter: Mitte 50, Alt-68er mit Garagentüftler-Seele. Seine Wohnung ist ein Kabinett aus Messgeräten von den 1930ern bis in die 90er — und er ist der Erste, der die Resonanz-Überlastungen nicht sozial, sondern messtechnisch erklärt.

## Was neu ist

**Die Wohnung 1103** — kein Wohnzimmer mehr, sondern Werkstatt: Röhren-Empfänger, ein Wehrmachts-Peilrahmen von 1938, Feldstärkemesser, ein Schreiber mit Millimeterpapier-Rolle, Oszilloskop, selbstgewickelte Spulen, ein Wandplan von Sektor 28 mit eingezeichneten Peillinien. Dazwischen: Kaffeekanne, Aschenbecher, alte Plakate. Neues Szenenbild im Stil der bestehenden Räume.

**Walter selbst** — spricht schnell, springt zwischen den zwei Bedeutungen von „Resonanz" hin und her: eben noch Belegungsdichte und Ruhezeiten und was der Mandatsrat damit eigentlich meint, im nächsten Satz Bandbreite und Feldstärke. Für ihn ist das kein Widerspruch: „Der Rat hat den Begriff geklaut. Ich hab ihn nur zurückgemessen."

**Der Hinweis (Kern der Szene)** — spricht Layard ihn auf die Häufung der Resonanz-Überlastungen an, wird Walter präzise:

- Der Träger auf 104,6 ist zu stark für ein Bastelgerät. Da hängt ein Verstärker dran, dazu eine ordentliche Antenne, wahrscheinlich hoch montiert.
- Er hat gepeilt: **Nordwest**, und die Quelle liegt **mindestens 300, höchstens 500 Meter** entfernt.
- Er nennt sein Ergebnis selbst — mit Vorbehalt: In der Richtung, in der Entfernung, mit einem Dach, auf dem sowas stehen kann, kommt praktisch nur **E67** in Frage. Layards eigenes Gebäude.

**Wie er das herausgefunden hat** — technisch korrekt und nachvollziehbar erklärt:
- *Kreuzpeilung:* Rahmenantenne hat eine Acht-Charakteristik mit scharfem Minimum. Er dreht auf das Minimum statt auf das Maximum, weil das viel genauer abzulesen ist. Zwei Standorte (sein Fenster und das Treppenhausfenster zwei Etagen höher), zwei Linien, Schnittpunkt auf dem Wandplan. Die 180°-Mehrdeutigkeit der Acht löst er mit einer kleinen Hilfsantenne auf — die Seite, auf der sich das Signal verstärkt statt auslöscht, ist die richtige.
- *Entfernung:* über die Feldstärke. Er misst sie an mehreren Punkten im Gebäude, trägt sie gegen den Weg auf, und aus dem Abfall (Freiraumdämpfung, quadratisch mit der Entfernung) fällt eine Spanne heraus — keine Zahl, eine Spanne. Deshalb sagt er 300 bis 500 und nicht 400.
- *Warum verstärkt:* Ein normales Schmerz-Radio reicht ein paar hundert Meter und rauscht dabei. Was er misst, ist ein sauberer, durchgehender Träger mit stabiler Mittenfrequenz — das kriegt kein Selbstbau-Oszillator ohne Quarz und Endstufe hin. Sein Schreiber zeigt außerdem, dass der Pegel tagelang konstant bleibt: Dauerbetrieb, kein Bastler, der abends mal einschaltet.
- Sein eigener Vorbehalt: Beton und Stahl werfen Reflexionen, an zwei Stellen im Korridor hat er ein Geisterminimum. Er glaubt seiner Messung, aber er verkauft sie nicht als Beweis.

**Anschluss:** Der Hinweis ist Material für Layards Rechercheauftrag 28/1194, kein Auftrag von Walter. Walter will nichts, außer dass jemand seine Messungen ernst nimmt.

## Grenzen (Lore)

Keine Behörden-Verschwörung ums Radio, keine erfundene Radio-Regulierung, keine Radio-Meldepflicht. Walter ist Privatmann mit Messgeräten. Resonanz-Überlastung bleibt die allgemeine medizinische Diagnose; Walter behauptet nur, dass ein verstärkter Träger als *eine* mögliche Mitursache in Frage kommt. Alles im Präsens.

## Technische Umsetzung

- `src/game/scenes/apt1103.ts` — neue Szene mit Hotspots: Walter (talk), Peilrahmen, Feldstärkemesser/Schreiber, Wandplan mit Peillinien, Röhrenregal, Werkbank, Ausgang zurück nach `corridor11`. Registrierung in `src/game/scenes/index.ts`.
- `src/game/dialogs/walter.ts` — `walterIntro` (Flag `metWalter`) und `walterHub` mit Zweigen: Apparate / Resonanz sozial vs. technisch / Überlastungen → Peilung → Technik-Erklärung → Gebäude-Nennung (Flag `walterBearing`). Registrierung in `src/game/dialogs/index.ts`.
- `src/game/scenes/corridor11.ts` — Hotspot `door1103` von `look` auf `use` umstellen, führt nach `apt1103` (beim ersten Mal mit Klopf-Text).
- `src/game/npcPersonas.ts` — Persona „Walter" für den Frei-Chat, inkl. harter Fakten (Peilwerte, Methode) und Verbot, das Radio zur Verschwörung aufzublasen.
- `src/assets/scene-apt-1103.jpg` — neues Hintergrundbild, Bildstil und Perspektive passend zu Korridor 11 / Wohnung 1102.
- `LORE.md` und Speicher: Walter als Bewohner 1103 ergänzen, Peilbefund (NW, 300–500 m, E67) als Kanon festhalten.
