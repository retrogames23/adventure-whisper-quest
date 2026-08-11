import type { HandbookChapter } from "@/game/e67Handbook";
import { registerBook, type BookUiText } from "./index";

const LIBRARY_UI_TEXT: BookUiText = {
  ariaLabel: "Buch lesen",
  closeLabel: "Buch schließen",
  contents: "Inhalt",
  chaptersUnit: (n: number) => `${n} Kapitel`,
  edition: "Bibliotheksbestand",
  pagerStart: "— Anfang —",
  pagerEnd: "— Ende —",
  pagerOf: (idx: number, total: number) => `Seite ${idx} / ${total}`,
  chapterSelectLabel: "Kapitel",
};

const sumerChapters: HandbookChapter[] = [
  {
    id: "sumer-vorwort",
    shortTitle: "Vorwort",
    title: "Vorwort: Warum Listen zuerst kamen",
    body: [
      "Dieses Buch handelt von der ältesten bekannten Schrift der Menschheit. Nicht von Dichtung, nicht von Gesetzen, nicht von Gebeten — von Listen.",
      "Die ersten Tontafeln aus Uruk verzeichnen Gerste, Bier, Schafe, Arbeitstage und Schulden. Wer sie heute liest, liest Bürokratie in ihrer Urform. Das ist weniger romantisch, aber ehrlicher als die meisten Geschichten über die Geburt der Schrift.",
      "Ich habe versucht, die Tafeln so zu übersetzen, wie sie gemeint waren: als Vermögensaufstellung, als Quittung, als Warnung.",
    ],
  },
  {
    id: "sumer-uruk",
    shortTitle: "Uruk",
    title: "Uruk, um 3300 vor unserer Zeitrechnung",
    body: [
      "Uruk war eine der ersten Städte, die man ohne Übertreibung als Stadt bezeichnen kann. Nicht wegen ihrer Mauern — die gab es auch —, sondern wegen ihrer Organisation.",
      "Rund um den Eanna-Bezirk, dem Tempelkomplex der Göttin Inanna, sammelten sich Arbeiter, Verwalter, Töpfer, Schreiber und Händler. Die Stadt hatte vielleicht zehntausend Einwohner. Sie mussten irgendwie ernährt, eingeteilt und kontrolliert werden.",
      "Die Schrift entstand dort nicht aus einem plötzlichen kulturellen Bedürfnis. Sie entstand, weil der Tempel wissen musste, was ihm zustand.",
    ],
  },
  {
    id: "sumer-tafeln",
    shortTitle: "Tafeln",
    title: "Was auf den Tafeln steht",
    body: [
      "Die frühesten Tafeln sind klein, handlich und oft nur auf einer Seite beschrieben. Sie wurden im feuchten Ton mit einem Schilfrohr eingeritzt, dann an der Sonne oder im Ofen getrocknet.",
      "Typische Einträge lauten: »3 Scheffel Gerste«, »2 Krüge Bier«, »1 Schaf«, »5 Arbeitstage«. Manche Tafeln nennen Namen, manche nicht. Manche sind Quittungen, manche Forderungen.",
      "Was sie gemeinsam haben: Sie alle dokumentieren einen **Übergang**. Etwas wurde gegeben, geleistet, geschuldet oder abgeliefert. Die Schrift war ein Werkzeug der Verwaltung, bevor sie ein Werkzeug der Erzählung wurde.",
    ],
  },
  {
    id: "sumer-verwaltung",
    shortTitle: "Verwaltung",
    title: "Verwaltung vor der Literatur",
    body: [
      "Es dauerte Jahrhunderte, bis aus Listen Geschichten wurden. Die ersten literarischen Texte — das Gilgamesch-Epos, Hymnen, Weisheitslehren — entstanden erst, als Schreiben selbstverständlich geworden war.",
      "Die Verwaltung kam zuerst. Sie musste nicht erfunden werden; sie war schon da, in Köpfen und mündlichen Abmachungen. Die Schrift machte sie durchsetzbar, speicherbar, prüfbar.",
      "Wer heute ein Formular ausfüllt, setzt eine Tradition fort, die in Uruk begann. Das ist keine Beleidigung. Es ist eine Verwandtschaft.",
    ],
  },
  {
    id: "sumer-anhang",
    shortTitle: "Anhang",
    title: "Anhang: Eine Tafel im Original",
    body: [
      "> Übersetzung einer Tafel aus Uruk IVa (ca. 3200 v. u. Z.):",
      "> »4 Scheffel Gerste — Lugal-uru",
      "> »2 Krüge Bier — Gemeinschaftsraum",
      "> »1 Schaf — für den Priester",
      "> »Rest: 0«",
      "Die Tafel endet mit einer Null. Schon damals gab es jemanden, der wissen wollte, ob etwas übrig geblieben war.",
    ],
  },
];

const railwayChapters: HandbookChapter[] = [
  {
    id: "bahn-vorwort",
    shortTitle: "Vorwort",
    title: "Vorwort: Von Linien, die verschwinden",
    body: [
      "Dieses Buch sammelt Strecken, die es nicht mehr gibt. Nicht aus Nostalgie, sondern aus Respekt vor der Genauigkeit, mit der sie einmal geplant wurden.",
      "Nebenbahnen waren keine Hauptstrecken mit schwächerem Verkehr. Sie waren ein eigenes Netz, mit eigenen Bahnhöfen, eigenen Fahrplänen, eigenen Dampfloks. Wer sie benutzte, kannte die Schaffner oft beim Vornamen.",
      "Viele der hier abgedruckten Fahrpläne stammen aus dem Mandatsgebiet und den angrenzenden Konventionsstaaten. Einige Strecken existieren heute nur noch als Radwege oder Feldwege.",
    ],
  },
  {
    id: "bahn-entstehung",
    shortTitle: "Entstehung",
    title: "Entstehung der Nebenbahnen",
    body: [
      "Zwischen 1890 und 1910 entstanden in Mitteleuropa Tausende von Nebenstrecken. Sie verbanden Dörfer mit Märkten, Fabriken mit Bahnhöfen, Minen mit Häfen.",
      "Die meisten wurden von privaten Gesellschaften gebaut, oft mit knappem Kapital und optimistischen Prognosen. Manche wurden nie rentabel. Sie wurden trotzdem weiterbetrieben, weil sie eine Region zusammenhielten.",
      "Die Lokomotiven waren kleiner und langsamer als auf Hauptstrecken. Dafür hielten sie an Haltestellen, die auf keiner großen Karte verzeichnet waren.",
    ],
  },
  {
    id: "bahn-mandat",
    shortTitle: "Im Mandatsgebiet",
    title: "Nebenbahnen im Mandatsgebiet",
    body: [
      "Nach 1946 wurden viele Strecken zunächst weiterbetrieben, weil das Straßennetz zerstört war und Lkw-Motoren knapp. Die Nebenbahn war oft der einzige zuverlässige Transport.",
      "In den 50er Jahren begann die Stilllegung. Zuerst die unrentabelsten Strecken, dann die, die parallel zur Straße verliefen, schließlich die, deren Brücken zu teuer zu reparieren waren.",
      "Heute, 1974, gibt es im Mandatsgebiet noch etwa ein Drittel der Strecken von 1946. Der Rest ist abgebaut, zugewachsen oder zu Wanderwegen umgewidmet.",
    ],
  },
  {
    id: "bahn-fahrplaene",
    shortTitle: "Fahrpläne",
    title: "Fahrpläne als Zeitzeugen",
    body: [
      "Ein Fahrplan ist mehr als eine Abfahrtsliste. Er ist ein Dokument darüber, wie eine Gesellschaft ihre Zeit organisiert hat.",
      "Die hier abgedruckten Fahrpläne zeigen Verbindungen, die bis auf die Minute genau waren — auch wenn die Züge oft Verspätung hatten. Sie nennen Bahnhöfe, die heute leer stehen, und Anschlüsse, die heute nicht mehr existieren.",
      "Wer einen alten Fahrplan liest, liest eine Karte der Vergangenheit. Nicht jede Strecke führt noch irgendwohin. Aber sie führte einmal.",
    ],
  },
  {
    id: "bahn-anhang",
    shortTitle: "Anhang",
    title: "Anhang: Ausgewählte Strecken",
    body: [
      "| Streckennummer | Verlauf | Stillgelegt",
      "| NB-12 | Waldhof — Kleinkirchheim — Brünning | 1962",
      "| NB-33 | Emsbüren — Südhamm | 1958",
      "| NB-47 | Löbau — Herrnhut | 1967",
      "| NB-89 | Passau — Hauzenberg | 1954",
      "| NB-105 | Sektor 12 — Sektor 14 (Grenzstrecke) | 1971",
      "Die Liste ist unvollständig. Vollständigkeit wäre ein weiteres Buch.",
    ],
  },
];

const resonanzChapters: HandbookChapter[] = [
  {
    id: "res-vorwort",
    shortTitle: "Vorwort",
    title: "Vorwort: Resonanz als Gefährdung",
    body: [
      "Dieses Buch wurde im Dezember 1956 geschrieben. Der Begriff *Resonanz* war damals noch eng gefasst: Er beschrieb eine physikalische Wirkung — Schwingungen, die sich verstärken, wenn sie auf das richtige Material treffen.",
      "Resonanz galt als Problem des Bauwesens, der Akustik, der Maschinentechnik. Nicht als soziales Phänomen. Wer das Buch liest, sollte das im Kopf behalten.",
      "Der Autor war Sektorarzt und Berater mehrerer Verwaltungen. Er schreibt nüchtern, manchmal trocken, aber immer mit dem Ziel, dem Einzelnen zu helfen, seine Umgebung zu kontrollieren.",
      "Berlin, Dezember 1956",
    ],
  },
  {
    id: "res-physik",
    shortTitle: "Physik",
    title: "Was Resonanz physisch ist",
    body: [
      "Resonanz entsteht, wenn ein schwingendes System auf eine äußere Frequenz trifft, die seiner eigenen Eigenfrequenz entspricht. Das System schwingt dann stärker mit, als es eigentlich müsste.",
      "Im Alltag begegnet uns das als Vibration, als Drohnen, als Klappern in der Wand, wenn ein bestimmter Zug vorbeifährt. Nicht jeder Lärm ist Resonanz. Aber jede Resonanz ist zunächst Lärm, bevor sie Schaden wird.",
      "Der Körper reagiert auf Dauerschwingungen. Schlafstörungen, Konzentrationsschwäche, nervöse Reizbarkeit können Folgen sein — nicht aus Schwäche, sondern aus dauerhafter Anpassungsleistung.",
    ],
  },
  {
    id: "res-daemmung",
    shortTitle: "Dämmen",
    title: "Dämmen und Abschirmen",
    body: [
      "Die wichtigste Maßnahme gegen Resonanz ist die Unterbrechung der Schwingungsübertragung. Das geschieht durch Masse, Elastizität oder beides.",
      "- **Wände:** Doppelte Beplankung mit Zwischenraum verringert die Übertragung niedriger Frequenzen.",
      "- **Böden:** Schwimmende Estriche oder elastische Unterlagen bremsen Trittschall.",
      "- **Fenster:** Dichte Fensterfalzabdichtungen sind oft wirksamer als dickes Glas.",
      "Nicht jede Maßnahme muss teuer sein. Ein schwerer Vorhang vor einer Wand, ein Teppich auf einem Holzboden, ein Schrank in der Ecke — alles verändert die Schwingungseigenschaften eines Raums.",
    ],
  },
  {
    id: "res-lueften",
    shortTitle: "Lüften",
    title: "Lüften, Abstandhalten, Ruhepausen",
    body: [
      "Resonanz braucht Kontakt. Je mehr Schichten zwischen dem Schwingungsursprung und dem Empfänger liegen, desto geringer die Wirkung.",
      "**Lüften** ist in diesem Buch nicht nur Frischluftzufuhr. Es bedeutet, Räume zu entlasten: übermäßige Wärme, Feuchtigkeit und elektromagnetische Felder gleichermaßen zu reduzieren.",
      "**Abstandhalten** bedeutet, Geräte und Möbel so zu platzieren, dass keine direkte Schwingungsbrücke entsteht. Ein Bett sollte nicht mit dem Kopfende an eine Heizungsleitung grenzen.",
      "**Ruhepausen** sind die einfachste und wirksamste Maßnahme. Wer regelmäßig aus einem resonanzbelasteten Raum herausgeht, gibt seinem Körper Zeit zur Erholung.",
    ],
  },
  {
    id: "res-anhang",
    shortTitle: "Anhang",
    title: "Anhang: Zugelassene Schirme und Dichtungen",
    body: [
      "Der folgende Anhang listet Produkte auf, die 1956 von der Zentralstelle für Wohnhygiene geprüft wurden. Die Liste ist nicht vollständig.",
      "- **Schwingungsdämpfer Typ A:** Gummi-Metall-Element für Möbel und Maschinenfüße.",
      "- **Fensterdichtung FD-3:** Selbstklebend, für Holzfenster mit Falz.",
      "- **Türabschlussleiste D-12:** Für den Spalt zwischen Türblatt und Boden.",
      "- **Wandbehang WS-7:** Schwerer Stoff mit Bitumeneinlage, reduziert Hochfrequenzanteile.",
      "> Hinweis: Produkte, die nicht aufgeführt sind, sind nicht automatisch ungeeignet. Sie wurden nur nicht geprüft.",
    ],
  },
];

const dataflowChapters: HandbookChapter[] = [
  {
    id: "df-vorwort",
    shortTitle: "Vorwort",
    title: "Vorwort: Die Trennung als Prinzip",
    body: [
      "Dieses Buch erzählt eine Geschichte der Computer, wie sie sich in diesem Jahrhundert entwickelt haben. Es geht um Maschinen, die aus Netzwerken kleiner, spezialisierter Rechenknoten bestehen.",
      "Der Ausgangspunkt liegt in den Arbeiten der 1940er Jahre. Howard Aiken in Harvard und Konrad Zuse in Europa bauten Systeme, in denen Programm und Daten physisch getrennt blieben. Ihr Grundsatz war einfach: Befehle sind Befehle, Daten sind Daten. Wer sie vermischt, macht eine Maschine schwerer zu verstehen und schwerer zu schützen. Diese Strenge erwies sich als verlässlicher, prüfbarer und leichter zu beherrschen. Aus ihr erwuchs die Datenfluss-Maschine.",
    ],
  },
  {
    id: "df-geheim",
    shortTitle: "Frühe Entwürfe",
    title: "Frühe Entwürfe: Aiken, Zuse und die getrennte Speicherung",
    body: [
      "In den 1940er Jahren entstanden die ersten programmgesteuerten Rechenmaschinen. Sie waren groß, laut, störanfällig und jede für sich eine Ingenieursleistung. Doch schon früh teilten sich die Schulen.",
      "Howard Aiken an der Harvard University baute das Mark-I-System. Sein Grundsatz: Programm und Daten liegen in getrennten Speichern. Ein Programm wird eingelesen, ausgeführt, und erst danach verarbeitet die Maschine die Ergebnisse. Der Programmspeicher bleibt während der Rechnung unverändert.",
      "Konrad Zuse in Europa verfolgte einen ähnlichen Weg. Seine Z-Maschinen trennten Befehls- und Datenspeicher ebenfalls strikt. Für Zuse war diese Trennung keine akademische Vorliebe, sondern eine Frage der Übersichtlichkeit: Wer die Befehle nicht von den Daten trennt, verliert schnell den Überblick über das, was die Maschine tut.",
      "Andere Entwürfe — darunter der EDVAC-Entwurf von John von Neumann — schlugen vor, Befehle und Daten im selben Speicher unterzubringen. Dieser Gedanke war theoretisch elegant, weil er eine Maschine ermöglichte, die ihr eigenes Programm verändern konnte. Die Ingenieurspraxis fand ihn jedoch zu undurchsichtig. Ein selbstmodifizierendes Programm ist schwer zu testen, schwer zu debuggen und fast unmöglich formal zu verifizieren. Die Entwicklung entschied sich für die Trennung.",
    ],
  },
  {
    id: "df-harvard",
    shortTitle: "Harvard",
    title: "Aiken, Zuse und die Reine Harvard-Architektur",
    body: [
      "Howard Aikens Harvard-Mark-Systeme und Konrad Zuses Z-Maschinen teilten einen Grundsatz: Programmspeicher und Datenspeicher sind getrennte Räume. Man schreibt nicht in den Programmspeicher hinein, während man ihn liest.",
      "Das machte Computer weniger flexibel, aber vorhersehbarer. Ein Programm war eine feste Schaltung, ein Datenstrom war ein Datenstrom. Die beiden durften sich nicht vermischen.",
      "Diese Trennung verhinderte eine ganze Klasse von Fehlerquellen: Speicherüberläufe, Pufferfehler, das Einschleusen von Code als Daten. Die Sicherheit lag in der Struktur, nicht in der Kontrolle.",
    ],
  },
  {
    id: "df-revolution",
    shortTitle: "Datenfluss",
    title: "Die Datenfluss-Revolution",
    body: [
      "In den 1970er Jahren setzte sich eine neue Art der Programmierung durch: nicht sequenziell, sondern datengesteuert. Ein Rechenknoten feuert genau dann, wenn alle benötigten Eingangsdaten bereitstehen.",
      "Es gibt keinen zentralen Programmzähler, der Befehl für Befehl abarbeitet. Stattdessen gibt es ein Netz aus Knoten. Jeder Knoten wartet, bis er genug hat, dann rechnet er und gibt sein Ergebnis weiter.",
      "Diese Architektur eignet sich besonders für Aufgaben, die parallel ablaufen können: Bildverarbeitung, Simulation, neuronale Netze. Sie war nicht schneller im Einzelnen, aber skalierbarer im Ganzen.",
    ],
  },
  {
    id: "df-matrix",
    shortTitle: "Matrix-1",
    title: "Intels asynchroner Matrix-1",
    body: [
      "Als in den 1970ern die Mikrochips boomen, baute Intel den **Matrix-1**: einen Chip aus einem Gitter von 64 winzigen, asynchronen Rechenkernen.",
      "Es gab kein globales Taktsignal. Jeder Kern verbrauchte nur dann Strom, wenn Daten bei ihm ankamen. Das sparte Energie und reduzierte Wärmeentwicklung drastisch.",
      "Der Matrix-1 war nicht schneller als die Rechenmaschinen, die in anderen Ländern und anderen Projekten zur gleichen Zeit entwickelt wurden. Er war anders: weniger eine Rechenmaschine, mehr ein Schaltwerk aus tausenden kleinen Entscheidungen.",
    ],
  },
  {
    id: "df-cellular",
    shortTitle: "Cellular Arrays",
    title: "Cellular Arrays: Das Gitter der Gegenwart",
    body: [
      "Heute, 1997, bestehen Computer aus **Cellular Arrays** — Milliarden mikroskopischer Knoten, die wie biologische Synapsen funktionieren. Ein Laptop unterscheidet sich von einem Supercomputer nur durch die physische Größe des Gitters.",
      "Programmspeicher und Datenspeicher sind nach wie vor getrennt. Ein Virus kann sich nicht als Datenstrom tarnen und dann als Code ausführen. Das ist physikalisch unmöglich.",
      "Die Akkus halten monatelang, weil kein globaler Takt die Zellen ständig umschaltet. Wer seinen Laptop vergisst, findet ihn oft noch an — nicht weil die Batterie besser ist, sondern weil das Gerät im Leerlauf fast nichts verbraucht.",
    ],
  },
  {
    id: "df-marvs",
    shortTitle: "MARV",
    title: "MARV und eingeatzte Künstliche Intelligenz",
    body: [
      "Neuronale Netze lassen sich auf Datenfluss-Architekturen nativ abbilden. Das hat die Künstliche Intelligenz früher und kompakter werden lassen als in sequenziellen Systemen.",
      "Systeme wie MARV, die intelligente Türsteuerung, sind keine Simulationen auf einer sequenziellen Maschine. Sie sind eingeatzt — direkt in das Cellular Array hineinverdrahtet.",
      "Das macht sie vernünftiger, stabiler und weniger fehleranfällig. Sie müssen nicht erst lernen, sequenzielle Befehle zu simulieren. Sie denken, sofern man das Wort erlaubt, in Datenflüssen.",
    ],
  },
  {
    id: "df-programmieren",
    shortTitle: "Programmieren",
    title: "Wie man heute programmiert",
    body: [
      "Niemand lernt hier C, C++ oder Python. Stattdessen gibt es zwei dominierende Paradigmen: visuelle Datenflussdiagramme und rein mathematisch-funktionale Sprachen.",
      "Der Programmierer zeichnet nicht, was ein einzelner Rechenknoten tun soll, sondern wie die Daten fließen. Das Ergebnis ist mathematisch beweisbar korrekt — zumindest in der Theorie.",
      "Software hat keine Speicherlecks, keine Pufferüberläufe, keine wilden Pointer. Die physische Trennung von Code und Daten macht diese Fehlerklassen von vornherein unmöglich.",
      "Nicht jeder findet diese Art zu programmieren intuitiv. Aber sie ist, gemessen an Ausfallzeiten und Sicherheitsvorfällen, erstaunlich robust.",
    ],
  },
];

registerBook({
  id: "sumer-listen",
  title: "Listen aus Uruk — Verwaltung vor der Literatur",
  subtitle: "M. Ehrenhart · 1981 · Bewohnerbibliothek E71",
  author: "M. Ehrenhart",
  year: "1981",
  blurb:
    "Über die ältesten Tontafeln: Gerste, Bier, Schafe, Schulden. Herbert legt hier gern den Finger auf eine Zeile und schweigt dann.",
  chapters: sumerChapters,
  uiText: LIBRARY_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
});

registerBook({
  id: "schmalspur",
  title: "Schmalspur — Nebenbahnen Mitteleuropas 1890–1946",
  subtitle: "K. Obholz · 1974 · Bewohnerbibliothek E71",
  author: "K. Obholz",
  year: "1974",
  blurb:
    "Streckenpläne, Fahrpläne, Betriebsstellen. Viele der Strecken gibt es nicht mehr; die Fahrpläne schon.",
  chapters: railwayChapters,
  uiText: LIBRARY_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
});

registerBook({
  id: "resonanzhygiene-1956",
  title: "Resonanzhygiene — Ein Leitfaden für den Einzelnen",
  subtitle: "Dr. med. H. C. Brennwald · 1956 · Bewohnerbibliothek E71",
  author: "Dr. med. H. C. Brennwald",
  year: "1956",
  blurb:
    "Noch aus der Zeit, bevor der Begriff seine soziale Seite bekam: Lüften, Dämmen, Abstandhalten, Ruhepausen. Brennwald schreibt über Resonanz wie über Staub oder Lärm.",
  chapters: resonanzChapters,
  uiText: LIBRARY_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
});

registerBook({
  id: "gespaltener-geist",
  title: "Der gespaltene Geist — Eine Geschichte der Datenfluss-Maschinen",
  subtitle: "S. R. Vossen · 1997 · Bewohnerbibliothek E71",
  author: "S. R. Vossen",
  year: "1997",
  blurb:
    "Vossen erzählt, wie die Datenfluss-Architektur zur dominierenden Form des Rechnens wurde — ausgehend von der strengen Trennung von Programm und Daten, die Aiken, Zuse und die frühen Harvard-Systeme prägten.",
  chapters: dataflowChapters,
  uiText: LIBRARY_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
});
