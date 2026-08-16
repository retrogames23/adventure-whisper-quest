# Akt-I-Plot: Aufräumen von Sackgassen und losen Enden

Ergebnis der Durchsicht von Szenen, Dialogen, Items und Flags in Akt I. Die Lore-Konsistenz ist insgesamt gut: Schmerz-Radio wird überall als obskures Bastlergerät geführt, der Autor/Verwaltungsangestellten-Retcon ist durchgezogen, Datum (November 1997) und Mandatsdeutsch stimmen. Die Probleme liegen bei ungenutzten Spielelementen und einer fragilen Kopplung.

## 1. Elemente, die nirgendwo hinführen

**Das Schmerz-Radio als Item** — man steckt es ein, aber es wird in keinem Rätsel, keiner Kombination und keiner Dialogbedingung abgefragt. Es ist reine Trophäe, obwohl es das titelgebende Objekt ist.
Vorschlag: mindestens eine harte Verwendung geben. Am naheliegendsten in Bodos Resonanz-Hygiene-Strang: Layard kann das Radio bei Bodo/im Korridor benutzen, um den Körperschall der Wartungsfrequenz hörbar zu machen — das setzt ein Wissens-Flag, das später bei SASSE in der Zentralverwaltung als eigene Aussageoption zählt. Kein neuer Pflichtweg, aber eine echte Belohnung.

**Miras Türnotiz** — wird bei Miras Enthüllung vergeben, danach nie geprüft, während alle anderen Aushang-Belege in die Beweislogik einfließen.
Vorschlag: die Notiz in dieselbe Belegprüfung aufnehmen (zählt als weiterer Beleg bei der Übergabe), oder ersatzlos streichen und den Text als Dialogzeile belassen.

**Die fünf Philippe-Sonden** setzen jeweils ein Notiz-Flag, das seit dem Entfernen der Wartungskarten-Route nirgends mehr ausgewertet wird.
Vorschlag: die Notiz-Flags als Wissensquelle bei SASSE bzw. in Layards Terminal-Notizen sichtbar machen, damit die Gespräche eine Spur hinterlassen.

**Ungenutztes Gerüst** — die Item×Item-Kombinationstabelle ist leer (alles läuft über Sonderfälle) und ein Code-Kommentar behauptet, das Ölkännchen werde nach dem Ölen von MARV-9 verbraucht, was nicht passiert.
Vorschlag: Kommentar korrigieren; leere Tabelle entweder entfernen oder als bewusst leer kennzeichnen.

## 2. Lore- und Story-Konsistenz

Keine inhaltlichen Verstöße gefunden. Einziger offener Punkt: die Leitplanken gegen alte Retcons (kein Radio-Meldezwang, Mira spekuliert nicht über Frequenzen) existieren nur als Persona-Anweisungen für die frei sprechenden NPCs, nicht als harte Regel.
Vorschlag: die zentralen Verbote zusätzlich als kurze, immer mitgesendete Weltregel-Zeile in allen NPC-Personas verankern, damit sie nicht nur in Miras und Walters Text stehen.

## 3. Dead Ends

**Kein bestätigter Softlock.** Zwei Stellen sind aber strukturell fragil:

- **Aufzug-Wartungsmodus**: Bodo ist der einzige Weg, die Sperre zu lösen. Fällt er künftig aus, ist Akt I blockiert.
  Vorschlag: eine Notfall-Weiche einbauen — wenn Bodo bereits weggeschickt/erledigt ist und die Sperre noch steht, löst die Leitstelle sie nach einer kurzen Meldung. Reine Absicherung, im Normalspiel unsichtbar.
- **Kondomautomat**: Layard hat exakt drei Münzen für exakt drei Reihen, eine davon ist die Maske, die man für den Zutritt zu E71 braucht. Aktuell geht es genau auf — jede spätere Ausgabe (Bier, vierte Reihe) würde einen echten Softlock erzeugen.
  Vorschlag: Zutritt zusätzlich absichern — ohne Maske und ohne Geld bietet die Empfangsdame einmalig eine Ersatzmaske aus der Schublade an (mit passend spitzem Kommentar).

**Bürokratie-Duell**: Nach drei verlorenen Versuchen verweist Vossbeck auf die Fälschungsroute bei Kowalk — dieser Ausweg existiert und ist erreichbar, hier ist kein Dead End.

## Umfang

Reine Spiel-Logik: Dialoge, Szenen-Hotspots, Flags, Wissens-Einträge. Keine Änderungen an Assets, Backend oder UI-Struktur.
