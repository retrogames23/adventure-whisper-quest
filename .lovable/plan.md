
# Vorschläge: Neue Rätsel & Hindernisse für Akt I

Akt I lebt von Telefon, Tür, Terminal, Korridor — und vom Spannungsfeld zwischen B2-Konformität und einem ersten Schritt zur Eigeninitiative. Die folgenden Vorschläge bauen auf bereits etablierten Elementen auf (Bodo, Lotti, Helka, Ennis, Mira, der Flyer, Insa, Stegmann, das leere Büro, die Sektor-Tür) und fügen sich in die bestehende Flag- und Inventar-Logik. Keine fremden Mechaniken — nur tiefere Nutzung der vorhandenen.

Geordnet nach Themenblöcken. Du kannst beliebig auswählen, was wir umsetzen.

---

## A — Rätsel rund um Bodos Terminal

Bodos Terminal ist bereits etabliert (Bodo geht für 15 Min B3 holen, sobald Layard Lotti kennt und ihn überredet hat). Aktuell wird das Terminal nur einmal genutzt (CentralOS sysupdate). Wir können es mehrfach gewinnbringender einsetzen.

1. **Quersuche im Quadranten-Verzeichnis**
   - Layard braucht Bodos Terminal, um in CentralOS auf eine Datei zuzugreifen, die in seinem eigenen Account gesperrt ist — z. B. `/sektor/E67/bewohner/2615.txt`. Bodos Account hat eine ältere Berechtigungsstufe ("Hausmeister-Restzugriff"), die dort noch greift.
   - Belohnung: der Name des Mannes an der Wand (z. B. "Otmar Reiss"), ein Geburtsdatum, vielleicht ein Hinweis auf eine frühere Quarantäne. Macht den Patienten zum Menschen statt zur Anekdote.
   - Hindernis davor: ohne sysupdate (CentralOS v2.3.1) wird die Datei nicht angezeigt — also kommt das eigentliche Rätsel (Update + Suche) zusammen in einem Schwung.

2. **Mira im System finden**
   - Nach der Begegnung mit Mira (mira_open) kann Layard auf Bodos Terminal nach ihrem Namen suchen — und findet sie nicht. Stattdessen einen Eintrag mit "ZUGRIFF VERWEIGERT — Schicht 2". Bestätigt Miras Andeutung, dass sie offiziell gar nicht hier wohnt.
   - Gibt einen neuen Knowledge-Flag `miraNotInRegistry`, der später den Endlos-Tür-Dialog mit Insa beeinflusst.

3. **Flyer-Quelle nachvollziehen**
   - Layard prüft am Terminal, wann der Flyer im Treppenhaus auftauchte. Logfile `/var/log/cleaning.log` zeigt: er wurde zwischen zwei Reinigungsrunden eingeworfen — also von jemandem aus dem Quadranten. Bodo kommt zurück, bevor Layard den Eintrag löschen kann → neuer Bodo-Dialog ("Sie haben in den Reinigungslogs gewühlt, Worag.")

---

## B — Hindernisse, die Layard mit Bodos Terminal lösen muss

Hier konkrete Blockaden, deren Auflösung zwingend Bodos Maschine braucht:

1. **Defekter Aufzug**
   - Beim ersten Versuch, in den Aufzug zu steigen (nach `protocolReceived`), zeigt das Display "AUFZUG GESPERRT — WARTUNGSANFRAGE 4711". Das eigene Terminal in 2611 darf Wartungsanfragen nur lesen, nicht löschen. Bodos Account darf.
   - Layard muss also: Lotti kennenlernen → Bodo überreden → an Bodos Terminal die Wartungsanfrage stornieren (`maint cancel 4711`) → Aufzug fährt wieder.
   - Schöne Kollision: das hängt direkt mit dem Auftrag zusammen, das Protokoll nach E71 zu bringen — und macht den Block-Hausmeister zum unfreiwilligen Komplizen.

2. **Phantom-Quarantäne auf 2611**
   - Nach dem Telefonat mit Stegmann (oder als Folge des "skippedExitReport"-Pfades) wird Layards eigene Wohnung als "kontaminiert" markiert. Ergebnis: das Schloss von 2611 schließt sich beim Verlassen automatisch, Layard kann nicht mehr zurück, bis der Marker entfernt ist.
   - Auflösung: Bodos Terminal hat Zugriff auf den Sektor-Türserver (`door unflag 2611`). Schöner Twist: Bodo darf das eigentlich auch nicht — aber sein Account weiß das nicht.

3. **Frequenzsperre auf der Etage**
   - Nach dem Resonanz-Trigger (104,6 max.) erkennt das Sektor-System eine "lokale Übersteuerung" und drosselt 104,6 für Korridor 26. Effekt: Schmerz-Radio funktioniert in 2611 nicht mehr, Layard wird unruhig (neuer Subtext-Layer in allen Dialogen, leichtes UI-Flackern).
   - Auflösung: Bodos Terminal kann den Drosselungseintrag im Block-Router zurücksetzen. Macht klar, dass die "Frequenz" administrativ verwaltet wird — Vorbereitung auf Mikaels Wahrheit in Akt II.

---

## C — Rätsel ohne Bodos Terminal (andere Stellen)

1. **Insas Rückruf-Code**
   - Insa ruft in 2611 zurück (Telefon klingelt nach einer bestimmten Aktion). Layard muss innerhalb weniger Klicks rangehen — sonst geht der Anruf an die Voicemail von CentralOS, und er hört eine *andere* Stimme antworten (vielleicht Stegmann), die "im Namen von I. Bauerfeind" eine Standardformel abspult.
   - Mechanik: kleines Zeitfenster (z. B. 10s sichtbarer Pulsanimation am Hotspot). Verpasst → neuer Knowledge-Flag `insaScreened`, der spätere Insa-Dialoge anders färbt.

2. **Die Wartung in 2615**
   - Bevor die Sanitäter eintreffen, klopft der Mann nach Rhythmus 104,6. Layard kann mit Philippe an der Wand mitklopfen — wenn er den Rhythmus genau trifft (kleines Reaktions-Mini-Spiel: 4 Beats, Tempo passt zu echtem 104,6-Audio), antwortet der Mann *einmal* anders: drei kurze Schläge. Nur Layard hört es. Setzt `heardAnswer`-Flag, der in Mikaels Dialog später aufgegriffen wird.

3. **Ennis' Tür**
   - Aktuell: Ennis bricht erst auf, wenn er den Flyer sieht. Zwischenstufe: Layard muss erst etwas *teilen*, damit Ennis ihm überhaupt zuhört. Z. B.: nachdem Layard mit Helka und Bodo gesprochen hat, kann er Ennis *zitieren* ("Helka sagt, sie hört es seit zwei Jahren nicht mehr"). Erst dann öffnet Ennis (auch ohne Flyer) einen Spalt.
   - Mechanik: Dialogchoice bei Ennis nur sichtbar, wenn `talkedHelka2` UND `metBodo` UND `knowsLotti` gesetzt sind. Belohnt das Erkunden des Korridors.

4. **Helkas verschlossene Box**
   - Helka erwähnt in einem späteren Smalltalk eine "Kiste meines Mannes" hinter der Tür. Sie würde sie öffnen, wenn jemand ihr eine alte Quittungsnummer von 1988 vorlesen würde — die nur auf einem alten Zeitungsausschnitt im CentralOS-Archiv (`/sektor/presse/1988_morgenblatt.txt`) zu finden ist. Layard liest, merkt sich (Knowledge-Flag), trägt vor.
   - Belohnung: der Brief eines früheren E67-Bewohners, der nach E71 versetzt wurde — Vorbote des Mikael-Plots.

5. **Das leere Büro auf Etage 3**
   - Aktuell wird das leere Büro nur "gesehen". Vorschlag: dort liegt eine handschriftliche Notiz auf dem Schreibtisch, halb unter einem Aktenstapel. Aufheben funktioniert nur, wenn Layard zuvor Mira getroffen hat (sie warnt vor der Kamera über der Tür) — sonst wird er 30 Sekunden später aus dem Apartment-Telefon angerufen und Stegmann mahnt ihn ab (`troubleReported`-Flag wird gesetzt, beeinflusst späteren Insa-Tonfall).

6. **Philippes Stille**
   - Wenn Layard zu schnell zurück nach 2611 geht (z. B. ohne mit Helka oder Bodo gesprochen zu haben), klingelt Philippe später nochmal — aber sagt nur ein einziges Wort. Erst wenn Layard mit mindestens einem anderen Bewohner gesprochen hat, hat er die "soziale Sprache" wieder freigeschaltet, um Philippe richtig zuzuhören.
   - Mechanik: Dialogvariante in `philippeAfter` über `requires: ["talkedHelka2 OR metBodo OR talkedEnnis2"]`-Logik. Macht das Nachbarschafts-Erkunden zur weichen Pflicht.

---

## D — Optionale "Atmosphäre"-Rätsel (kurz, charmant)

- **Lottis Trick**: Lotti will erst geknuddelt werden, wenn Layard im Inventar nichts metallisches mehr trägt (sie hört das Klimpern). Setzt `lottiTrust`-Flag → Bodo wird offener.
- **Solaranlage am Fenster**: Layard kann das Fenster prüfen und feststellen, dass die Solaranlage nur 6 Stunden lädt, nicht 48. Wenn er das auf seinem Terminal an Insa meldet, kommt am nächsten Etappenpunkt ein Techniker — der heimlich einen Brief von Mikael dabei hat.
- **Adventure.bin als Hinweisträger**: Das Mini-Adventure enthält einen Raum mit einer Notiz, die einen Code ergibt (z. B. "madebyhumans" → Passworthinweis für eine Datei in Bodos `/var/log`). Belohnt Spieler, die das Easter Egg ernst nehmen.

---

## Empfohlene Kombination (kompakt)

Wenn du nur 2–3 Sachen einbauen willst, schlage ich vor:

1. **Defekter Aufzug** (B1) — bindet Bodo zwingend an die Hauptachse und belohnt das Lotti/Bodo-Erkundungsspiel.
2. **Ennis öffnet auf Zitat** (C3) — nutzt alle Korridor-NPCs, ohne neue Assets.
3. **Insas Rückruf-Code** (C1) — eine zeitkritische Spielmechanik, die thematisch perfekt passt (Überwachung, Frequenz, Druck).

Diese drei zusammen verlängern Akt I um geschätzt 15–25 Minuten echter Spielzeit, ohne die Erzählung zu zerdehnen.

---

Sag mir, welche der Vorschläge ich konkret umsetzen soll — dann mache ich daraus einen Implementierungsplan mit Flags, Dialogen, Hotspots und Terminal-Befehlen.
