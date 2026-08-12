import type { HandbookChapter } from "@/game/e67Handbook";
import imgSumerUruk from "@/assets/books/sumer-uruk.jpg";
import imgSumerTafeln from "@/assets/books/sumer-tafeln.jpg";
import imgSumerVerwaltung from "@/assets/books/sumer-verwaltung.jpg";
import imgBahnEntstehung from "@/assets/books/bahn-entstehung.jpg";
import imgBahnMandat from "@/assets/books/bahn-mandat.jpg";
import imgBahnFahrplaene from "@/assets/books/bahn-fahrplaene.jpg";
import imgResPhysik from "@/assets/books/res-physik.jpg";
import imgResDaemmung from "@/assets/books/res-daemmung.jpg";
import imgResLueften from "@/assets/books/res-lueften.jpg";
import imgDfFruehe from "@/assets/books/df-fruehe.jpg";
import imgDfHarvard from "@/assets/books/df-harvard.jpg";
import imgDfRevolution from "@/assets/books/df-revolution.jpg";
import imgDfMatrix from "@/assets/books/df-matrix.jpg";
import imgDfCellular from "@/assets/books/df-cellular.jpg";
import imgDfMarv from "@/assets/books/df-marv.jpg";
import imgDfProgrammieren from "@/assets/books/df-programmieren.jpg";
import imgWirtUsa from "@/assets/books/wirt-usa.jpg";
import imgWirtUdssr from "@/assets/books/wirt-udssr.jpg";
import imgWirtMandat from "@/assets/books/wirt-mandat.jpg";
import imgAutoWankel from "@/assets/books/auto-wankel.jpg";
import imgAutoSerie72 from "@/assets/books/auto-serie72.jpg";
import imgAutoDesign90 from "@/assets/books/auto-design90.jpg";
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
    image: imgSumerUruk,
    imageCaption: "Tafel I — Uruk, Eanna-Bezirk, Rekonstruktion",
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
    image: imgSumerTafeln,
    imageCaption: "Tafel II — Frühe Tontafeln mit Schilfrohrgriffel",
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
    image: imgSumerVerwaltung,
    imageCaption: "Tafel III — Abrechnung im Tempelspeicher",
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
    image: imgBahnEntstehung,
    imageCaption: "Abb. 1 — Nebenbahnzug auf freier Strecke, um 1908",
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
    image: imgBahnMandat,
    imageCaption: "Abb. 2 — Haltestelle im Mandatsgebiet, um 1949",
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
    image: imgBahnFahrplaene,
    imageCaption: "Abb. 3 — Bahnsteiguhr, letzter Zug des Tages",
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
      "Ich schreibe dies im Dezember 1956. Der Begriff *Resonanz* ist mir in den letzten Jahren immer häufiger begegnet, und zwar in einem Zusammenhang, den die meisten Menschen nicht erwarten: als Gefährdung des Einzelnen in seiner eigenen Wohnung.",
      "Was ich darunter verstehe, ist zunächst eine physikalische Wirkung — Schwingungen, die sich verstärken, wenn sie auf das richtige Material treffen. Resonanz ist ein Problem des Bauwesens, der Akustik, der Maschinentechnik. Meine Aufgabe ist es, zu zeigen, wie der Einzelne sie in seinem Alltag erkennt und ihr begegnet.",
      "Ich bin Sektorarzt und berate mehrere Verwaltungen bei der Bewertung von Wohnraum. In diesem Buch versuche ich nüchtern und ohne Umschweife zu beschreiben, was jeder für sich selbst tun kann, um seine Umgebung zu kontrollieren.",
      "Berlin, Dezember 1956",
    ],
  },
  {
    id: "res-physik",
    image: imgResPhysik,
    imageCaption: "Abb. 1 — Übertragung von Schwingungen zwischen zwei Räumen",
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
    image: imgResDaemmung,
    imageCaption: "Abb. 2 — Wandaufbau mit Dämmschicht und Falzdichtung",
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
    image: imgResLueften,
    imageCaption: "Abb. 3 — Lüftung, Abstand und Ruhepause im Wohnraum",
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
    image: imgDfFruehe,
    imageCaption: "Abb. 1 — Rechenanlage mit getrennten Speicherwerken, 1940er Jahre",
    shortTitle: "Frühe Entwürfe",
    title: "Frühe Entwürfe: Aiken, Zuse und die getrennte Speicherung",
    body: [
      "In den 1940er Jahren entstanden die ersten programmgesteuerten Rechenmaschinen. Sie waren groß, laut, störanfällig und jede für sich eine Ingenieursleistung. Doch schon früh teilten sich die Schulen.",
      "Howard Aiken an der Harvard University baute das Mark-I-System. Sein Grundsatz: Programm und Daten liegen in getrennten Speichern. Ein Programm wird eingelesen, ausgeführt, und erst danach verarbeitet die Maschine die Ergebnisse. Der Programmspeicher bleibt während der Rechnung unverändert.",
      "Konrad Zuse in Europa verfolgte einen ähnlichen Weg. Seine Z-Maschinen trennten Befehls- und Datenspeicher ebenfalls strikt. Für Zuse war diese Trennung keine akademische Vorliebe, sondern eine Frage der Übersichtlichkeit: Wer die Befehle nicht von den Daten trennt, verliert schnell den Überblick über das, was die Maschine tut.",
      "Aus diesen Arbeiten entstand der verbindliche Grundsatz der Speichertrennung. Hochschulen, Rechenämter und Hersteller übernahmen ihn, weil sich getrennte Befehls- und Datenwege prüfen, warten und eindeutig dokumentieren ließen. Die Harvard-Bauweise wurde damit zur gemeinsamen Grundlage der weiteren Entwicklung.",
    ],
  },
  {
    id: "df-harvard",
    image: imgDfHarvard,
    imageCaption: "Abb. 2 — Getrennte Befehls- und Datenträger am Prüfstand",
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
    image: imgDfRevolution,
    imageCaption: "Abb. 3 — Knotenhalle einer frühen Datenfluss-Anlage",
    shortTitle: "Datenfluss",
    title: "Die Datenfluss-Revolution",
    body: [
      "In den 1970er Jahren setzte sich eine neue Art der Programmierung durch: datengesteuerte Verarbeitung. Ein Rechenknoten feuert genau dann, wenn alle benötigten Eingangsdaten bereitstehen.",
      "Es gibt keinen zentralen Programmzähler, der Befehl für Befehl abarbeitet. Stattdessen gibt es ein Netz aus Knoten. Jeder Knoten wartet, bis er genug hat, dann rechnet er und gibt sein Ergebnis weiter.",
      "Diese Architektur eignet sich besonders für Aufgaben, die parallel ablaufen können: Bildverarbeitung, Simulation, neuronale Netze. Sie war nicht schneller im Einzelnen, aber skalierbarer im Ganzen.",
    ],
  },
  {
    id: "df-matrix",
    image: imgDfMatrix,
    imageCaption: "Abb. 4 — Matrix-1: Gitter identischer Rechenzellen",
    shortTitle: "Matrix-1",
    title: "Intels asynchroner Matrix-1",
    body: [
      "Als in den 1970ern die Mikrochips boomen, baute Intel den **Matrix-1**: einen Chip aus einem Gitter von 64 winzigen, asynchronen Rechenkernen.",
      "Es gab kein globales Taktsignal. Jeder Kern verbrauchte nur dann Strom, wenn Daten bei ihm ankamen. Das sparte Energie und reduzierte Wärmeentwicklung drastisch.",
      "Der Matrix-1 war nicht darauf ausgelegt, einzelne Berechnungen so schnell wie möglich zu erledigen. Er war anders: weniger eine Rechenmaschine, mehr ein Schaltwerk aus tausenden kleinen Entscheidungen.",
    ],
  },
  {
    id: "df-cellular",
    image: imgDfCellular,
    imageCaption: "Abb. 5 — Cellular Array, schematische Darstellung",
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
    image: imgDfMarv,
    imageCaption: "Abb. 6 — Eingeätztes MARV-Modul in einem Arbeitsplatzgerät",
    shortTitle: "MARV",
    title: "MARV und eingeatzte Künstliche Intelligenz",
    body: [
      "Neuronale Netze lassen sich auf Datenfluss-Architekturen nativ abbilden. Das hat die Künstliche Intelligenz früh und kompakter werden lassen.",
      "Systeme wie MARV, die intelligente Türsteuerung, sind keine Simulationen auf einer fremden Bauweise. Sie sind eingeatzt — direkt in das Cellular Array hineinverdrahtet.",
      "Das macht sie vernünftiger, stabiler und weniger fehleranfällig. Sie denken, sofern man das Wort erlaubt, in Datenflüssen.",
    ],
  },
  {
    id: "df-programmieren",
    image: imgDfProgrammieren,
    imageCaption: "Abb. 7 — Arbeitsplatz mit Knotenliste und Ausdruck",
    shortTitle: "Programmieren",
    title: "Wie man heute programmiert",
    body: [
      "In der Ausbildung haben sich zwei Arbeitsweisen durchgesetzt: visuelle Datenflusspläne und mathematisch-funktionale Sprachen.",
      "Programmierer beschreiben darin Knoten, Verbindungen und die Bedingungen, unter denen Daten weitergegeben werden. Vor der Ausführung lassen sich diese Wege formal prüfen und mit bekannten Eingabemengen erproben.",
      "Befehlsfolgen werden in den geschützten Programmspeicher übertragen; Messwerte, Akten und Zwischenergebnisse verbleiben auf den getrennten Datenwegen. Jede Änderung erhält eine Prüfsumme und einen Eintrag im Laufprotokoll.",
      "Die Arbeit verlangt Sorgfalt und ein gutes Verständnis für Abläufe. Dafür sind Fehler meist bis zu jener Verbindung zurückzuverfolgen, an der ein Wert unerwartet weitergegeben oder zurückgehalten wurde.",
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

const wirtschaftsChapters: HandbookChapter[] = [
  {
    id: "wirt-vorwort",
    shortTitle: "Vorwort",
    title: "Vorwort: Warum drei?",
    body: [
      "Dieses Buch ist aus Gesprächen entstanden. Der eine von uns lehrt vergleichende Politikwissenschaft an einer Universität, die nicht im Mandatsgebiet liegt; der andere berät den Mandatsrat in Wirtschaftsfragen. Wir haben uns oft gestritten, selten überzeugt, aber immer darin geübt, die Systeme zu beschreiben, wie sie tatsächlich funktionieren, nicht wie sie beschrieben werden sollen.",
      "Wir vergleichen drei Wirtschaftsordnungen, die auf dieselbe Frage unterschiedliche Antworten geben: Wie soll eine Gesellschaft produzieren, verteilen und verbrauchen? Die Vereinigten Staaten setzen auf Eigentum, Vertrag und Preisbildung. Die Sowjetunion setzt auf staatlichen Besitz, Plan und kollektive Verteilung. Das Mandatsgebiet setzt auf eine Mischform: Eigentum erlaubt, Märkte geduldet, aber die Verwaltung hat das letzte Wort.",
      "Wir schreiben im Jahr 1995. Das Mandatsgebiet existiert seit fast fünfzig Jahren als Übergangslösung. Wer es verstehen will, muss verstehen, wovon es sich abhebt.",
    ],
  },
  {
    id: "wirt-frage",
    shortTitle: "Die Frage",
    title: "Kapitel I: Drei Antworten auf dieselbe Frage",
    body: [
      "Jede Gesellschaft muss entscheiden, wer wofür arbeitet, wer was erhält und wer überhaupt mitredet. Diese Entscheidungen lassen sich nicht vermeiden; sie lassen sich nur verschleiern.",
      "Die erste Antwort lautet: Der Einzelne entscheidet selbst, solange er Vertragspartner findet. Eigentum ist das Fundament, der Markt ist das Verfahren, der Staat hält den Rahmen.",
      "Die zweite Antwort lautet: Die Gesellschaft entscheidet kollektiv, vertreten durch den Staat. Große Güter gehören allen, der Plan legt die Richtung fest, der Markt spielt eine untergeordnete Rolle.",
      "Die dritte Antwort ist komplizierter. Sie sagt: Eigentum bleibt erlaubt, aber es wird verwaltet. Private Betriebe dürfen existieren, aber sie brauchen Genehmigungen, Quoten und Zuteilungen. Der Staat greift nicht ein, weil er alles besitzen will, sondern weil er alles koordinieren will. Das ist die Antwort des Mandatsgebiets.",
    ],
  },
  {
    id: "wirt-usa",
    image: imgWirtUsa,
    imageCaption: "Börse in den Vereinigten Staaten, 1992",
    shortTitle: "Vereinigte Staaten",
    title: "Kapitel II: Die Vereinigten Staaten — Markt, Vertrag und Anteil",
    body: [
      "In den Vereinigten Staaten wird Wirtschaft als Folge von Verträgen verstanden. Wer etwas besitzt, darf damit handeln, vermieten, verkaufen oder vererben. Wer etwas herstellen will, gründet eine Firma, sucht Investoren und bietet Produkte auf einem Markt an, auf dem die Preise durch Angebot und Nachfrage entstehen.",
      "Der Staat ist hier nicht der Hauptakteur. Er schützt Eigentum, erzwingt Verträge, baut Straßen und Schienenwege und greift in Krisen ein, wenn Banken, Landwirtschaft oder ganze Branchen zusammenbrechen. Zwischen diesen Eingriffen lässt er die Wirtschaft weitgehend sich selbst über.",
      "Das Ergebnis ist eine hohe Dynamik. Neue Güter entstehen schnell, alte verschwinden ebenso schnell. Reichtum und Armut liegen nah beieinander; Arbeitslosigkeit ist ein normales Risiko, nicht ein Ausnahmezustand. Der einzelne Bürger hat große Freiheit in der Wahl von Beruf, Wohnort und Verbrauch. Er hat aber auch weniger Sicherheit als in anderen Systemen.",
      "Kritiker innerhalb der Vereinigten Staaten nennen das System ungerecht, weil Startbedingungen ungleich sind. Befürworter nennen es frei, weil niemand gezwungen wird, etwas Bestimmtes zu tun. Beides trifft zu; darum ist der Vergleich so schwierig.",
    ],
  },
  {
    id: "wirt-udssr",
    image: imgWirtUdssr,
    imageCaption: "Planungsbüro einer sowjetischen Fabrik, 1988",
    shortTitle: "Sowjetunion",
    title: "Kapitel III: Die Sowjetunion — Plan, Verteilung und Kollektiv",
    body: [
      "Die Sowjetunion antwortet auf dieselbe Frage anders. Große Betriebe, Minen, Bahnen und Banken gehören dem Staat. Fünfjahrespläne legen fest, was produziert wird, in welcher Menge und zu welchem Preis. Der Staat ist gleichzeitig Eigentümer, Auftraggeber und Verteiler.",
      "Kleine private Betriebe existieren, besonders im Handwerk und in der Landwirtschaft. Genossenschaften dürfen Waren herstellen und verkaufen. In manchen Republiken hat der lokale Handel mehr Bedeutung als der zentrale Plan vorsieht. Die Partei kontrolliert die großen Linien, nicht jeden einzelnen Tausch.",
      "Das System bietet Sicherheit. Es gibt praktisch keine Arbeitslosigkeit; Wohnraum, Gesundheitsversorgung und Grundbildung sind staatliche Aufgaben. Preise schwanken weniger als in Marktwirtschaften. Aber das System leidet unter Engpässen: Waren, die der Plan nicht vorsieht, fehlen oft; Waren, die niemand braucht, werden trotzdem produziert. Innovationen kommen langsamer voran, weil der einzelne Betrieb wenig Anreiz hat, Risiken einzugehen.",
      "Die Sowjetunion ist kein Modell, das man einfach übernehmen kann. Sie ist ein eigenständiger Versuch, Wirtschaft als staatliche Planungsaufgabe zu begreifen.",
    ],
  },
  {
    id: "wirt-mandat",
    image: imgWirtMandat,
    imageCaption: "Verwaltungsarchiv im Mandatsgebiet, 1991",
    shortTitle: "Mandatsgebiet",
    title: "Kapitel IV: Das Mandatsgebiet — Eigentum unter Verwaltung",
    body: [
      "Das Mandatsgebiet entstand 1946 als vorübergehende Verwaltung. Vier Schutzmächte übergaben die Aufgabe einem Mandatsrat, der bis zur endgültigen Regelung wirtschaften sollte. Die endgültige Regelung ist bis heute nicht erfolgt.",
      "In dieser Zwischenzeit ist eine eigene Wirtschaftsordnung gewachsen. Private Betriebe existieren; es gibt Eigentum an Häusern, Maschinen und Läden. Doch kaum eine Entscheidung läuft ohne Verwaltung. Wer eine Fabrik eröffnen will, braucht Genehmigungen. Wer Waren importieren will, braucht Zuteilungen. Wer arbeiten will, meldet sich bei einer Stelle, die wiederum einem Sektor zugeordnet ist. Der Markt ist erlaubt, aber er ist eingefasst.",
      "Das Ergebnis ist eine Wirtschaft, die weder planmäßig noch marktwirtschaftlich funktioniert. Sie ist bürokratisch. Jeder Vorgang braucht ein Formular, jede Änderung ein Aktenzeichen, jede Lieferung eine Quittung. Der Staat besitzt nicht alles, aber er weiß über alles Bescheid und kann über alles entscheiden.",
      "Die Befürworter dieser Ordnung nennen sie stabil. Es gibt keine großen Zusammenbrüche, keine plötzlichen Enteignungen, keine Spekulationskrisen. Die Kritiker nennen sie erstarrt. Unternehmerische Ideen verlaufen in Warteschleifen; wer erfolgreich wird, wird schnell zum Verwaltungspartner und damit zum halben Staatsbetrieb.",
      "Das Mandatsgebiet ist keine Kopie der Vereinigten Staaten und keine Kopie der Sowjetunion. Es ist ein eigenes Experiment: Eigentum ohne freien Markt, Verwaltung ohne totale Planung.",
    ],
  },
  {
    id: "wirt-vergleich",
    shortTitle: "Vergleich",
    title: "Kapitel V: Was bleibt?",
    body: [
      "Keine der drei Ordnungen ist rein. In den Vereinigten Staaten gibt es staatliche Subventionen, Zölle und Eingriffe in Krisen. In der Sowjetunion gibt es private Tauschbeziehungen, lokale Märkte und Genossenschaften. Im Mandatsgebiet gibt es Unternehmer, die innerhalb der Verwaltung handeln, als wäre es ein Markt.",
      "Dennoch unterscheiden sich die Systeme in einer entscheidenden Frage: Wer trägt das Risiko? In den Vereinigten Staaten trägt es der Einzelne. In der Sowjetunion trägt es der Staat. Im Mandatsgebiet trägt es derjenige, der gerade das Formular in der Hand hat.",
      "Das Mandatsgebiet wird oft als Übergangslösung beschrieben. Aber Übergänge können lange dauern. Nach fast fünfzig Jahren ist es nicht mehr vorübergehend; es ist gewachsen. Wer es verstehen will, muss es ernst nehmen — auch wenn es absurd wirkt.",
      "Wir schließen ohne Empfehlung. Ein Vergleich sollte zuerst beschreiben. Urteile überlassen wir dem Leser, der in einem dieser Systeme lebt und es jeden Tag erfährt.",
    ],
  },
];

registerBook({
  id: "ordnung-und-eigentum",
  title: "Ordnung und Eigentum — Wirtschaftssysteme im Vergleich",
  subtitle: "Prof. Dr. E. Kallweit · Dr. R. Semmler · 1995 · Bewohnerbibliothek E71",
  author: "Prof. Dr. E. Kallweit · Dr. R. Semmler",
  year: "1995",
  blurb:
    "Ein Fachbuch über drei Wirtschaftsordnungen: die Vereinigten Staaten, die Sowjetunion und das Mandatsgebiet. Kallweit und Semmler beschreiben, wie Eigentum, Plan und Verwaltung in jedem System verteilt sind — ohne zu predigen, aber mit scharfem Blick für Bürokratie.",
  chapters: wirtschaftsChapters,
  uiText: LIBRARY_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
});

const autoChapters: HandbookChapter[] = [
  {
    id: "auto-vorwort",
    shortTitle: "Vorwort",
    title: "Vorwort: Ein Dreieck dreht sich",
    body: [
      "Wer heute die Motorhaube eines Wagens öffnet, sieht viel Luft. In der Mitte, meist tief unten und weit vorn, sitzt ein Block von der Größe eines Reisekoffers. Er hat keine Ventile, keine Nockenwelle, keine Kipphebel. Er hat zwei Scheiben, die sich drehen, und er läuft so ruhig, dass man am Straßenrand nicht hört, ob ein Wagen steht oder wartet.",
      "Dieses Buch erzählt, wie es dazu kam. Es ist keine Heldengeschichte. Der Rotationskolbenmotor war lange eine Randerscheinung, belächelt von Ingenieuren, die ihn für eine hübsche Idee mit schmutzigen Details hielten. Zwei dieser Details — die Dichtleisten und der Verbrauch — entschieden alles.",
      "Ich schreibe für Leser, die Autos benutzen, nicht bauen. Formeln stehen im Anhang. Im Text steht, was passiert ist und warum es sich gelohnt hat.",
    ],
  },
  {
    id: "auto-anfang",
    image: imgAutoWankel,
    imageCaption: "Abb. 1 — Zweischeiben-Rotationsmotor im Schnitt, Werkzeichnung",
    shortTitle: "Anfang",
    title: "Kapitel I: Die Dichtleiste, an der alles hing",
    body: [
      "Das Prinzip ist alt und einfach: Ein dreieckiger Läufer dreht sich in einem geschwungenen Gehäuse. Bei jeder Umdrehung entstehen an seinen drei Flanken nacheinander Ansaugen, Verdichten, Verbrennen und Ausstoßen. Kein Kolben muss abgebremst und zurückgeworfen werden. Deshalb läuft die Maschine ohne die Erschütterungen, die ein Hubkolbenmotor mit Ausgleichswellen mühsam glätten muss.",
      "Das Problem saß in den Ecken. Die Dichtleisten an den drei Spitzen des Läufers streifen bei jeder Umdrehung über die Gehäusewand. Frühe Leisten aus Kohle oder Metall rieben Rillen in die Bahn, verloren Druck, fraßen Öl. Fahrzeuge liefen fünfzigtausend Kilometer, dann kam die Werkstattrechnung.",
      "1968 löste ein Konsortium aus NSU, Mazda und General Motors das Problem mit einem Werkstoff: Dichtleisten aus Siliziumnitrid-Keramik. Sie sind hart, hitzefest und dehnen sich kaum. Riffelbildung und Dichtungsverluste verschwanden binnen einer Motorengeneration aus den Prüfprotokollen. Was vorher ein Verschleißteil war, hielt nun länger als die Karosserie.",
    ],
  },
  {
    id: "auto-einspritzung",
    shortTitle: "Einspritzung",
    title: "Kapitel II: 1971 — Der Verbrauch fällt",
    body: [
      "Die zweite Schwäche war der Durst. Die langgezogene Brennkammer verbrannte das Gemisch unvollständig; ein Teil des Kraftstoffs verließ den Motor, ohne Arbeit geleistet zu haben.",
      "Mazda beantwortete das 1971 mit einer elektronisch gesteuerten Schichteinspritzung: Der Kraftstoff wird nicht mehr vorgemischt angesaugt, sondern unter hohem Druck direkt in die wandernde Kammer gegeben, dosiert nach Last und Drehzahl. Damit lag der Verbrauch erstmals auf dem Niveau vergleichbarer Hubkolbenmotoren — bei geringerem Gewicht und deutlich kleinerem Bauraum.",
      "Zwei Jahre lang blieb das eine Fachmeldung. Dann wurde es die wichtigste Zahl der Branche.",
    ],
  },
  {
    id: "auto-serie",
    image: imgAutoSerie72,
    imageCaption: "Abb. 2 — Endmontage in einem amerikanischen Werk, 1972",
    shortTitle: "Serie",
    title: "Kapitel III: 1972 — Das Signal aus Detroit",
    body: [
      "Entschieden wurde die Sache nicht in einem Labor, sondern in einer Verkaufsstatistik. General Motors brachte 1972 den Chevrolet Vega mit Rotationsmotor. Der Wagen war leise, drehfreudig und billig zu bauen; er verkaufte sich besser als jede Prognose.",
      "Ford und Chrysler nahmen innerhalb eines Jahres Lizenzen. Wer in Detroit als Zulieferer überleben wollte, stellte auf Gehäuse, Läufer und Keramikleisten um. Die Kostenrechnung war schlicht: Ein Rotationsmotor hat keine Ventile, keine Nockenwellen, keine Kipphebel. Weniger Teile bedeuten weniger Fertigungsschritte, weniger Prüfstationen, weniger Ausschuss.",
    ],
  },
  {
    id: "auto-oelkrise",
    shortTitle: "Ölkrise",
    title: "Kapitel IV: 1973–1985 — Die Krise als Beschleuniger",
    body: [
      "Als 1973 der Ölpreis sprang, hatte die Branche zufällig genau die Maschine im Programm, die sie brauchte. Ein Zweischeiben-Rotationsmotor beansprucht rund ein Drittel des Bauraums und die Hälfte des Gewichts eines Reihenvierzylinders. Wagen wurden dadurch nicht um Gramm, sondern um hundertfünfzig bis zweihundert Kilogramm leichter — und leichte Wagen verbrauchen weniger, unabhängig davon, was unter der Haube arbeitet.",
      "In Europa übernahm die NSU-Audi-AG 1976 die technische Führung im Volkswagen-Konzern. Der Golf II erschien 1983 serienmäßig mit einem Einliter-Zweischeiben-Rotationsmotor; die Nachfrage überstieg die Fertigung um Monate.",
      "In Asien ging es schneller. Toyota und Honda stellten ihre Fertigungsstraßen bis 1980 vollständig um und senkten ihre Produktionskosten um etwa ein Viertel. Wer damals noch Zylinderköpfe goss, lieferte fünf Jahre später Traktoren zu.",
    ],
  },
  {
    id: "auto-design",
    image: imgAutoDesign90,
    imageCaption: "Abb. 3 — Karosseriestudie im Windkanal, 1995",
    shortTitle: "Design",
    title: "Kapitel V: 1986–1997 — Was kleine Motoren mit Karosserien machen",
    body: [
      "Ein Motor, der klein und flach baut, verändert nicht nur die Werkstatt, sondern das Aussehen der Straße. Weil vorn kein hoher Block mehr Platz braucht, fallen die Frontpartien seit Ende der Achtzigerjahre steil ab. Die Luftwiderstandsbeiwerte sanken auf Werte, die man zwei Jahrzehnte zuvor nur von Rekordfahrzeugen kannte.",
      "Der gewonnene Raum landete im Innenraum. Ein Mittelklassewagen von 1995 ist außen kürzer als sein Vorgänger von 1975 und innen deutlich größer. Familien fahren kompakte Wagen mit dem Platzangebot alter Limousinen.",
      "Nebenbei änderte sich der Klang der Städte. Rotationsmotoren laufen ohne den harten Rhythmus der Hubkolben; wer an einer Kreuzung steht, hört Reifen, nicht Zylinder.",
    ],
  },
  {
    id: "auto-1997",
    shortTitle: "1997",
    title: "Kapitel VI: Der Stand der Dinge",
    body: [
      "Über drei Viertel aller weltweit neu zugelassenen Personenwagen fahren mit Rotationsmotoren. Hubkolben findet man noch dort, wo Drehmoment bei niedriger Drehzahl über alles geht: in Lastwagen mit Dieselmotor, in Traktoren, in stationären Aggregaten.",
      "Im Rennsport schreibt die Formel 1 seit 1992 Vierscheiben-Motoren vor, die bis achtzehntausend Umdrehungen drehen. In der Sportfliegerei hat der vibrationsfreie Lauf den Kolbenmotor vollständig verdrängt; Zellen halten länger, wenn nichts sie durchschüttelt.",
      "Am interessantesten ist die Kraftstofffrage. Weil Ansaug- und Verbrennungsbereich beim Rotationsmotor räumlich getrennt liegen, entzündet sich Wasserstoff nicht vorzeitig am heißen Bauteil — das Hindernis, an dem Hubkolbenversuche seit Jahrzehnten scheitern. Mazda und BMW fahren seit diesem Jahr erste seriennahe Flotten mit Wasserstoff.",
      "Ob daraus eine Umstellung wird, entscheidet nicht die Technik, sondern die Versorgung. Motoren gibt es. Tankstellen noch nicht.",
    ],
  },
];

registerBook({
  id: "drehende-dreieck",
  title: "Das drehende Dreieck — Eine Geschichte des Automobils",
  subtitle: "Dipl.-Ing. G. Rothstein · 1997 · Bewohnerbibliothek E71",
  author: "Dipl.-Ing. G. Rothstein",
  year: "1997",
  blurb:
    "Wie der Rotationskolbenmotor vom Sorgenkind zum Weltstandard wurde: Keramik-Dichtleisten, Schichteinspritzung, die Ölkrise als Rückenwind — und was kleine Motoren mit Karosserien anstellen.",
  chapters: autoChapters,
  uiText: LIBRARY_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
});
