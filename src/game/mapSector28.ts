import type { SceneId } from "./types";

/**
 * Kartendaten Sektor 28 (Vogelperspektive).
 *
 * Lore: Sektor 28 ist die Großeinheit. Darin liegen die Quadranten 67 und 71
 * mit je vier Wohnblöcken A–D; E67 und E71 sind die jeweils benachbarten
 * Ergänzungsbauten. E67 liegt nordwestlich von E71 (Luftlinie ~380 m) —
 * das deckt Walter Grewes Kreuzpeilung (NW, 300–500 m).
 *
 * x/y sind Prozentwerte auf dem Kartenbild (16:9).
 */
export interface MapPlace {
  id: string;
  label: string;
  /** Zeile unter dem Label in der Ortsliste. */
  kicker?: string;
  x: number;
  y: number;
  /** Kurztext im Kartenrahmen. */
  text: string;
  /** Wenn gesetzt: bereisbar, Klick springt in diese Szene. */
  travelTo?: SceneId;
  /** Bereisbar geplant, aber noch nicht begehbar. */
  travelPending?: boolean;
}

export const sector28Places: MapPlace[] = [
  {
    id: "e67",
    label: "Gebäude E67",
    kicker: "Ergänzungsbau, Quadrant 67",
    x: 17,
    y: 47,
    travelTo: "floor1Lobby",
    text: "Ergänzungsbau zum Quadranten 67, nachträglich an die Nordwestflanke gesetzt. Wohnetagen, Kantine 3602, Leitstelle, Gemeinschaftsraum. Verwaltet als Bestand mit erhöhtem Instandhaltungsbedarf. Layards Wohnung 2611 liegt hier.",
  },
  {
    id: "q67",
    label: "Quadrant 67",
    kicker: "Blöcke 67-A bis 67-D",
    x: 25,
    y: 60,
    text: "Vier baugleiche Wohnblöcke um einen Innenhof mit Wäscheplatz und zwei Bänken. Die Blöcke A und B sind vollbelegt, C teilbelegt, D seit dem Rohrbruch 1993 nur im Erdgeschoss bewohnt. Zutritt für Nichtansässige nur mit Vorlage.",
  },
  {
    id: "e71",
    label: "Gebäude E71",
    kicker: "Ergänzungsbau, Quadrant 71",
    x: 34,
    y: 62,
    travelTo: "e71Lobby",
    text: "Der jüngere der beiden Ergänzungsbauten: Empfang mit Tafel, Bewohnerbibliothek auf Etage 1, Vorführraum auf Etage 5, Verwaltungszimmer auf Etage 15. Vom Empfang führt der Verbindungsgang nach E67.",
  },
  {
    id: "q71",
    label: "Quadrant 71",
    kicker: "Blöcke 71-A bis 71-D",
    x: 43,
    y: 73,
    text: "Wie Quadrant 67, nur zwei Jahre später gebaut und deshalb mit den schmaleren Fenstern. Zwischen C und D steht der Trafokasten, an dem im Herbst regelmäßig jemand mit einem Messgerät steht und nichts erklärt.",
  },
  {
    id: "zentralverwaltung",
    label: "Zentralverwaltungsstelle Sektor 28",
    kicker: "Abgabe · Vorlage · Vermerk · 2,4 km",
    x: 54,
    y: 8,
    travelPending: true,
    text: "Der lange Bau ganz im Norden, jenseits des Angers und der Grünbrache, Kolonnade, drei Eingänge, von denen zwei geschlossen sind. Rund zweieinhalb Kilometer vom Quadranten 67 — zu Fuß fünfunddreißig Minuten, mit der Linie 4 angeblich zwölf. Hier laufen alle Vermerke des Sektors zusammen. Abgabe von Hinweisen ausschließlich hier, in Schriftform, mit Paraphe.",
  },
  {
    id: "ringstrasse",
    label: "Ringstraße 28",
    x: 6,
    y: 27,
    text: "Die Ringstraße schließt den Sektor. Vier Fahrspuren, zwei davon dauerhaft mit Bauzaun. Wer sie zu Fuß verlässt, gilt verwaltungstechnisch als „außerhalb des Zuständigkeitsbereichs“ und muss sich bei Rückkehr melden.",
  },
  {
    id: "magistrale",
    label: "Magistrale Nord",
    kicker: "Verbindung zur Zentralverwaltung",
    x: 50,
    y: 24,
    text: "Die vierspurige Achse vom Wohngürtel hinauf zum Verwaltungsanger. Beidseitig Linden, jede dritte ersetzt, jede zehnte fehlt. Der Weg zieht sich; wer ihn geht, hat Zeit, sich seine Formulierungen zurechtzulegen.",
  },
  {
    id: "anger",
    label: "Verwaltungsanger",
    kicker: "Grünstreifen",
    x: 62,
    y: 17,
    text: "Ein rechteckiger Grünstreifen mit kahlen Linden, geplant als Erholungsfläche, genutzt als Abkürzung. In der Mitte ein Betonsockel ohne Aufsatz. Der Aufsatz ist laut Bestandsliste vorhanden.",
  },
  {
    id: "versorgungshof",
    label: "Versorgungshof 28-West",
    kicker: "Rohrpost-Knoten",
    x: 47,
    y: 88,
    text: "Umschlagplatz für Nährstofflieferungen, Kohle und Rohrpost. Der Knoten hier sortiert die Kapseln aus beiden Quadranten. Bei Nässe riecht der ganze Hof nach heißem Gummi und Kantinenfett.",
  },
  {
    id: "umspannwerk",
    label: "Umspannwerk 28/3",
    x: 66,
    y: 62,
    text: "Versorgt beide Quadranten und die Ergänzungsbauten. Das Brummen ist bei Ostwind bis in die Korridore hörbar. Bewohnereingaben zum Thema Brummen werden zentral unter „Wahrnehmungsschwankung“ geführt.",
  },
  {
    id: "messfeld",
    label: "Mess- und Wetterfeld",
    kicker: "Resonanzaufzeichnung",
    x: 80,
    y: 26,
    text: "Ein eingezäuntes Feld mit Mast, Windsack und zwei Schreibern. Offiziell Wetterbeobachtung. Die zweite Kurve auf dem Papier ist nicht das Wetter, und niemand am Zaun sagt, was sie ist.",
  },
  {
    id: "q64",
    label: "Quadrant 64",
    kicker: "Blöcke 64-A bis 64-D",
    x: 13,
    y: 72,
    text: "Der älteste Wohnquadrant im Westen, noch mit den breiten Fenstern und den Kohleschächten. Zwei Blöcke sind seit der Sanierungsankündigung 1994 leergezogen. Die Ankündigung gilt weiter.",
  },
  {
    id: "q73",
    label: "Quadrant 73",
    x: 62,
    y: 82,
    text: "Südöstlicher Wohnquadrant, Belegung durch Zuweisung aus Sektor 29. Eigene Kantine, eigener Rohrpostast, eigene Wartezeiten. Man grüßt sich zwischen 73 und 71 nicht.",
  },
  {
    id: "q76",
    label: "Quadrant 76",
    x: 84,
    y: 71,
    text: "Am östlichen Rand, halb fertig. Zwei Blöcke stehen, zwei sind Fundamente mit Wasser drin. Auf dem Bauschild steht ein Fertigstellungsjahr, das schon zweimal überstrichen wurde.",
  },
  {
    id: "q59",
    label: "Quadrant 59",
    x: 27,
    y: 33,
    text: "Nördlich der Wohngruppe, verwaltet als Mischbestand: unten Werkstätten, oben Wohnen. Der einzige Quadrant mit einem Laden, der auch nachmittags offen hat.",
  },
  {
    id: "brache",
    label: "Grünbrache 28-Nord",
    x: 36,
    y: 20,
    text: "Zwischen Wohngürtel und Verwaltungsanger liegt ein halber Kilometer nichts: Schotter, Birkenschösslinge, ein Trampelpfad, der offiziell nicht existiert. Die meisten nehmen ihn trotzdem.",
  },
  {
    id: "haltepunkt",
    label: "Haltepunkt Linie 4",
    kicker: "Verwaltung ↔ Sektor 29",
    x: 22,
    y: 88,
    text: "Ein Wartehäuschen mit Fahrplan von 1991 und einem handgeschriebenen Zettel darunter. Der Bus kommt. Nur nicht nach Fahrplan.",
  },
  {
    id: "sektorgrenze",
    label: "Sektorgrenze 28/29",
    x: 93,
    y: 90,
    text: "Eine Schranke, ein Häuschen, ein Mann mit Klemmbrett, der nachts durch einen anderen Mann mit demselben Klemmbrett ersetzt wird. Übertritt nur mit Zuweisung.",
  },
];
