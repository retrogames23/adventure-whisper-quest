# Die drei TV-Kanäle neu schreiben

Aktuell klingen alle drei Sender gleich: hohle Tautologien ("Wartezeiten gelten als Wartezeiten"), reine Parodie. Neu: realistisch, mit trockenem Humor, und drei klar unterscheidbare Formate. Einzige Datei: `src/game/tv/channels.ts` (nur Texte, keine Logik).

## Kanal 1 — ZDS · Sektorbericht (Nachrichten)
Echte Nachrichtensendung des Mandatsgebiets: konkrete Ereignisse mit Ort, Zahl, Uhrzeit und Folge für den Alltag. Amtsdeutsch bleibt, aber nur als Ton, nicht als Witz.
- Beispielhaft: Bauarbeiten an der Ringtrasse, Kontingjent-Anpassung bei Heizöl, Personalwechsel im Mandatsrat, Winterfahrplan der Bahn, Meldefristen für die Wohnraum-Sprawka.
- Der Humor entsteht aus dem Kontrast: eine sehr ernste Meldung über sehr kleine Dinge — nicht aus Sätzen, die sich selbst im Kreis drehen.
- Ein bis zwei Meldungen streifen E71 und die Belegungslage, damit der Sender die Story stützt, ohne sie zu verraten.

## Kanal 2 — Bürgerfunk (statt "BV-Aktuell")
Echter Bürgerfunk, gesprochen von jemandem, der die Zettel vorliest, die abgegeben wurden. Warm, geschwätzig, gelegentlich unfreiwillig komisch. Kein Behördenton.
- Veranstaltungen: Chorprobe im Gemeinschaftsraum, Blockfall-Turnier, Filmabend im Kinosaal, Bewohnerbibliothek E71 mit neuen Titeln.
- Tauschbörse: Winterjacke gegen Kaffeekontingent, Ersatzröhre für Fernseher, Schallplatten.
- Fundsachen: Schlüsselbund im Aufzug, Handschuh, ein Wellensittich.
- Suchmeldungen, Glückwünsche, Nachbarschaftsstreit-Aufrufe ("bitte nach 22 Uhr keine Bohrmaschine").
- Mandatsdeutsch nur alltagsnah eingestreut: "in Regel", "Sprawka", "Naryad", "Casenummer" — so, wie Bewohner es beiläufig sagen.
- Name/Tag/Ticker des Kanals werden auf Bürgerfunk umgestellt (z. B. "Bürgerfunk E-Sektor · Programm 2").

## Kanal 3 — Wetter & Resonanz
Bleibt der Mess- und Wetterkanal, wird aber echter Wetterbericht: Temperaturen, Wind, Nebel, Regen, Prognose für morgen — plus der Resonanzindex als nüchterne Zahl je Gebäude mit kurzer Einordnung und Empfehlung.
- Weniger Selbstbezug, mehr Werte; der unheimliche Unterton kommt aus dem, was gemessen wird, nicht aus Wortspielen.

## Technisch
- Nur die `bulletins`-, `ticker`-, `name`- und `tag`-Felder in `src/game/tv/channels.ts` werden ersetzt; `id`, `hold`, `voiceId`, `videoUrl` und `accentClass` bleiben unverändert, damit Sprecher-Videos, TTS-Stimmen und UI-Farben weiterlaufen.
- Meldungslängen bleiben im bisherigen Rahmen (2–4 Sätze), damit das TTS-Timing und `hold` weiter passen; Bürgerfunk-Meldungen dürfen etwas kürzer sein.
- Namen, Gebäude und Begriffe werden gegen `LORE.md` und das Mandatsdeutsch-Verzeichnis geprüft; Sektor/Quadrant/Gebäude-Terminologie wird eingehalten.
