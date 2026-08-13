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
    x: 22,
    y: 33,
    travelTo: "floor1Lobby",
    text: "Ergänzungsbau zum Quadranten 67, nachträglich an die Nordwestflanke gesetzt. Wohnetagen, Kantine 3602, Leitstelle, Gemeinschaftsraum. Verwaltet als Bestand mit erhöhtem Instandhaltungsbedarf. Layards Wohnung 2611 liegt hier.",
  },
  {
    id: "q67",
    label: "Quadrant 67",
    kicker: "Blöcke 67-A bis 67-D",
    x: 19,
    y: 56,
    text: "Vier baugleiche Wohnblöcke um einen Innenhof mit Wäscheplatz und zwei Bänken. Die Blöcke A und B sind vollbelegt, C teilbelegt, D seit dem Rohrbruch 1993 nur im Erdgeschoss bewohnt. Zutritt für Nichtansässige nur mit Vorlage.",
  },
  {
    id: "e71",
    label: "Gebäude E71",
    kicker: "Ergänzungsbau, Quadrant 71",
    x: 79,
    y: 64,
    travelTo: "e71Lobby",
    text: "Der jüngere der beiden Ergänzungsbauten: Empfang mit Tafel, Bewohnerbibliothek auf Etage 1, Vorführraum auf Etage 5, Verwaltungszimmer auf Etage 15. Vom Empfang führt der Verbindungsgang nach E67.",
  },
  {
    id: "q71",
    label: "Quadrant 71",
    kicker: "Blöcke 71-A bis 71-D",
    x: 71,
    y: 44,
    text: "Wie Quadrant 67, nur zwei Jahre später gebaut und deshalb mit den schmaleren Fenstern. Zwischen C und D steht der Trafokasten, an dem im Herbst regelmäßig jemand mit einem Messgerät steht und nichts erklärt.",
  },
  {
    id: "zentralverwaltung",
    label: "Zentralverwaltungsstelle Sektor 28",
    kicker: "Abgabe · Vorlage · Vermerk",
    x: 57,
    y: 12,
    travelPending: true,
    text: "Der lange Bau am Nordrand des Angers, Kolonnade, drei Eingänge, von denen zwei geschlossen sind. Hier laufen alle Vermerke des Sektors zusammen. Abgabe von Hinweisen ausschließlich hier, in Schriftform, mit Paraphe.",
  },
  {
    id: "ringstrasse",
    label: "Ringstraße 28",
    x: 7,
    y: 38,
    text: "Die Ringstraße schließt den Sektor. Vier Fahrspuren, zwei davon dauerhaft mit Bauzaun. Wer sie zu Fuß verlässt, gilt verwaltungstechnisch als „außerhalb des Zuständigkeitsbereichs" und muss sich bei Rückkehr melden.",
  },
  {
    id: "anger",
    label: "Verwaltungsanger",
    kicker: "Grünstreifen",
    x: 49,
    y: 49,
    text: "Ein rechteckiger Grünstreifen mit kahlen Linden, geplant als Erholungsfläche, genutzt als Abkürzung. In der Mitte ein Betonsockel ohne Aufsatz. Der Aufsatz ist laut Bestandsliste vorhanden.",
  },
  {
    id: "versorgungshof",
    label: "Versorgungshof 28-West",
    kicker: "Rohrpost-Knoten",
    x: 43,
    y: 76,
    text: "Umschlagplatz für Nährstofflieferungen, Kohle und Rohrpost. Der Knoten hier sortiert die Kapseln aus beiden Quadranten. Bei Nässe riecht der ganze Hof nach heißem Gummi und Kantinenfett.",
  },
  {
    id: "umspannwerk",
    label: "Umspannwerk 28/3",
    x: 60,
    y: 85,
    text: "Versorgt beide Quadranten und die Ergänzungsbauten. Das Brummen ist bei Ostwind bis in die Korridore hörbar. Bewohnereingaben zum Thema Brummen werden zentral unter „Wahrnehmungsschwankung" geführt.",
  },
  {
    id: "messfeld",
    label: "Mess- und Wetterfeld",
    kicker: "Resonanzaufzeichnung",
    x: 88,
    y: 19,
    text: "Ein eingezäuntes Feld mit Mast, Windsack und zwei Schreibern. Offiziell Wetterbeobachtung. Die zweite Kurve auf dem Papier ist nicht das Wetter, und niemand am Zaun sagt, was sie ist.",
  },
  {
    id: "haltepunkt",
    label: "Haltepunkt Linie 4",
    kicker: "Richtung Sektor 29",
    x: 29,
    y: 90,
    text: "Ein Wartehäuschen mit Fahrplan von 1991 und einem handgeschriebenen Zettel darunter. Der Bus kommt. Nur nicht nach Fahrplan.",
  },
  {
    id: "sektorgrenze",
    label: "Sektorgrenze 28/29",
    x: 92,
    y: 90,
    text: "Eine Schranke, ein Häuschen, ein Mann mit Klemmbrett, der nachts durch einen anderen Mann mit demselben Klemmbrett ersetzt wird. Übertritt nur mit Zuweisung.",
  },
];
