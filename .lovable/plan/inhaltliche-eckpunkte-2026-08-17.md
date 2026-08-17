Ralfs Boxbude-Vergangenheit in Biografie und Dialog einbauen

Ralf bekommt eine neue Lebensstation: von Ende der 1960er bis in die 1980er Jahre betreibt er eine erfolgreiche Kirmes-Boxbude im Mandatsgebiet. Die Auflagen und Genehmigungen werden irgendwann zu kompliziert. Ab dem Erstkontakt (Stufe 2) kann Layard ihn gezielt danach fragen; Ralf plaudert ausführlich über die Geheimnisse des Geschäfts. Das neue Wissen fließt sowohl in die statische Dialogstruktur als auch in die LLM-Persona für den Frei-Chat ein.

## Inhaltliche Eckpunkte

Ralf erzählt in Kürze, was er über Jahrzehnte beobachtet hat:

- Echte K.o.s sind selten. Die Buden-Boxer führen die Herausforderer, blocken wild, teilen dosiert aus. In 90 % der Fälle endet ein Kampf mit Unentschieden oder einer gezielten, sanften Aufgabe — das Preisgeld bleibt in der Bude.
- Das Preisgeld kommt aus der eigenen Gage des Boxers; verliert er, arbeitet er umsonst. Die Hausregeln begünstigen die Bude: zwei kurze Runden, Unentschieden durch das Kampfgericht. Ausgezahlt wird nur bei einem echten, unumstrittenen K.o. durch einen „Undercover-Profi“ oder außergewöhnlichen Herausforderer — Ehrensache vor Publikum.
- Bekannte Profis und lizenzierte Vereinsboxer werden abgelehnt, weil sie das Personal verletzen und ihre Lizenz verlieren könnten. Auf der Rampe oder hinter dem Vorhang wird selektiert; im Ring selbst erkennt man Lügner an Beinarbeit und Deckung.
- Alkohol ist offiziell verboten, inoffiziell das Geschäftsmodell („Mutantrinken“). Die rote Linie: „Zielwasser“ erlaubt, „Filmriss“ raus.
- Unter den Nazis waren Boxbuden verboten: Wehrsport statt kommerzieller Jahrmarkt, Gleichschaltung des Sports, rassistische Verfolgung jüdischer und Sinti/Roma-Boxer, Ablehnung von „Amerikanismen“.

## Technische Umsetzung

### 1. Neue Story-Flag
- `src/game/types.ts`: StoryFlag um `ralfToldBoxbude` erweitern.

### 2. Persona / Biografie
- `src/game/npcPersonas.ts`:
  - Biografie: Eintrag ergänzen, dass Ralf von Ende der 1960er bis in die 1980er Jahre eine Kirmes-Boxbude im Mandatsgebiet betrieb und aufhörte, weil Genehmigungen und Auflagen zu kompliziert wurden.
  - Persönlichkeit / secrets: Hinweis, dass er, wenn Layard ihn kennt, sehr gerne und ausführlich über die Geheimnisse des Boxbudenbetriebs plaudert.
  - `contextFlags`: `ralfToldBoxbude` hinzufügen.

### 3. Statischer Dialog
- `src/game/dialogs/ralf.ts`:
  - In `lightTopics()` (also in Stufe 2 und 3 verfügbar) ein neues Thema anbieten, falls `!ralfToldBoxbude`: z. B. "Was haben Sie eigentlich vor dem Archiv gemacht?"
  - In `lightTopicLines()` eine neue Zeile `tBoxbude` einfügen, die Ralf die Eckpunkte in einem oder zwei zusammenhängenden Textblöcken erzählen lässt.
  - Bei Auswahl `ralfToldBoxbude` setzen.

### 4. Frei-Chat (LLM)
- Durch die Biografie-Änderung in `npcPersonas.ts` übernimmt `promptBuilder` die neuen Fakten automatisch für die Frei-Chat-Antworten. Kein separater Eingriff in den Prompt-Builder nötig.

## Nicht im Scope
- Kein neues Bild, kein neuer Raum, kein neues Inventar-Item, keine Quest-Änderung.
- Kein Hinweis im Spielwelt, der vorab erforderlich wäre — das Thema ist ab Stufe 2 direkt ansprechbar.
