import type { SceneId } from "./types";

/**
 * Kartendaten Sektor 28 (Vogelperspektive).
 *
 * Lore: Sektor 28 ist die Großeinheit. Darin liegen die Quadranten mit je vier
 * Wohnblöcken A–D. E67 und E71 sind direkt benachbarte Ergänzungsbauten
 * (Verbindungsgang, Luftlinie wenige Dutzend Meter) im südwestlichen
 * Wohngürtel. Die Zentralverwaltungsstelle liegt weit im Norden, jenseits von
 * Grünbrache und Magistrale (~2,4 km).
 *
 * Auf dem Kartenbild selbst steht keine Beschriftung — Namen erscheinen nur
 * beim Überfahren der Marker.
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
  /**
   * Weit entferntes Ziel: Der Weg dorthin führt über die Buslinie 28,
   * nicht zu Fuß. Nahe Ziele (E67 <-> E71) bleiben ohne Zwischenspiel.
   */
  farAway?: boolean;
  /** Bereisbar geplant, aber noch nicht begehbar. */
  travelPending?: boolean;
}

export const sector28Places: MapPlace[] = [
  {
    id: "e67",
    label: "Gebäude E67",
    kicker: "Ergänzungsbau, Quadrant 67",
    x: 7.5,
    y: 72,
    travelTo: "floor1Lobby",
    text: "Der ältere der beiden Ergänzungsbauten, unmittelbar an E71 angesetzt, nur der schmale Verbindungsgang dazwischen. Wohnetagen, Kantine 3602, Leitstelle, Keller. Verwaltet als Bestand mit erhöhtem Instandhaltungsbedarf. Layards Wohnung 2611 liegt hier.",
  },
  {
    id: "e71",
    label: "Gebäude E71",
    kicker: "Ergänzungsbau, Quadrant 71",
    x: 15.5,
    y: 79,
    travelTo: "e71Lobby",
    text: "Direkt neben E67, zwei Jahre jünger und eine Etage höher: Empfang mit Tafel, Bewohnerbibliothek auf Etage 1, Vorführraum, Verwaltungszimmer weiter oben. Vom Empfang führt der Verbindungsgang hinüber nach E67.",
  },
  {
    id: "q67",
    label: "Quadrant 67",
    kicker: "Blöcke 67-A bis 67-D",
    x: 4,
    y: 50,
    text: "Vier baugleiche Wohnblöcke um einen Innenhof mit Wäscheplatz und zwei Bänken. A und B vollbelegt, C teilbelegt, D seit dem Rohrbruch 1993 nur im Erdgeschoss bewohnt. Zutritt für Nichtansässige nur mit Vorlage.",
  },
  {
    id: "q71",
    label: "Quadrant 71",
    kicker: "Blöcke 71-A bis 71-D",
    x: 30,
    y: 88,
    text: "Derselbe Grundriss wie 67, nur zwei Jahre später gebaut und deshalb mit den schmaleren Fenstern. Zwischen C und D steht der Trafokasten, an dem im Herbst regelmäßig jemand mit einem Messgerät steht und nichts erklärt.",
  },
  {
    id: "zentralverwaltung",
    label: "Zentralverwaltungsstelle Sektor 28",
    kicker: "Abgabe · Vorlage · Vermerk · 2,4 km",
    x: 70,
    y: 7,
    travelPending: true,
    farAway: true,
    text: "Der lange Bau ganz im Norden, jenseits der Grünbrache und der Magistrale. Kolonnade, drei Eingänge, von denen zwei geschlossen sind. Rund zweieinhalb Kilometer von den Ergänzungsbauten — zu Fuß fünfunddreißig Minuten, mit der Buslinie 28 rund acht. Hier laufen alle Vermerke des Sektors zusammen. Abgabe von Hinweisen ausschließlich hier, in Schriftform, mit Paraphe.",
  },
  {
    id: "magistrale",
    label: "Magistrale Nord",
    kicker: "Verbindung zur Zentralverwaltung",
    x: 46,
    y: 20,
    text: "Die vierspurige Achse vom Wohngürtel hinauf zum Verwaltungsvorplatz. Beidseitig Linden, jede dritte ersetzt, jede zehnte fehlt. Der Weg zieht sich; wer ihn geht, hat Zeit, sich seine Formulierungen zurechtzulegen.",
  },
  {
    id: "brache",
    label: "Grünbrache 28-Nord",
    x: 62,
    y: 30,
    text: "Zwischen Wohngürtel und Verwaltung liegt ein halber Kilometer nichts: Schotter, Birkenschösslinge, ein Trampelpfad, der offiziell nicht existiert. Die meisten nehmen ihn trotzdem.",
  },
  {
    id: "tankstelle",
    label: "Tankstelle 28-Mitte",
    kicker: "Zwei Zapfsäulen, ein Kiosk",
    x: 25,
    y: 47,
    text: "Zwei Säulen unter einem Vordach, dahinter ein Kiosk mit Zeitungen von vorgestern. Benzin gibt es nach Zuteilung, Kaffee ohne. Wer hier steht, steht meistens, weil er woanders nicht stehen will.",
  },
  {
    id: "spielplatz",
    label: "Spielplatz Innenhof",
    x: 35,
    y: 43,
    text: "Sandkasten, ein Klettergerüst in Rakentenform, zwei Schaukeln, davon eine ohne Sitz. Die Bank daneben ist die inoffizielle Meldestelle für alles, was nie in einen Vermerk kommt.",
  },
  {
    id: "gaerten",
    label: "Kleingartenanlage",
    kicker: "Parzellen mit Zuweisung",
    x: 41,
    y: 60,
    text: "Vierundzwanzig Parzellen mit Lauben aus Restholz. Die Zuweisung läuft über eine Warteliste, die Warteliste über jemanden, der bei den Kleingärten selbst keine Parzelle hat.",
  },
  {
    id: "umspannwerk",
    label: "Umspannwerk",
    x: 59,
    y: 34,
    text: "Versorgt die Quadranten und die Ergänzungsbauten. Das Brummen ist bei Ostwind bis in die Korridore hörbar. Bewohnereingaben zum Thema Brummen werden zentral unter „Wahrnehmungsschwankung“ geführt.",
  },
  {
    id: "versorgungshof",
    label: "Versorgungshof West",
    kicker: "Rohrpost-Knoten",
    x: 73,
    y: 47,
    text: "Umschlagplatz für Nährstofflieferungen, Kohle und Rohrpost. Der Knoten hier sortiert die Kapseln aus beiden Quadranten. Bei Nässe riecht der ganze Hof nach heißem Gummi und Kantinenfett.",
  },
  {
    id: "sportplatz",
    label: "Sportfeld",
    x: 92,
    y: 55,
    text: "Ein Rasen mit Kalklinien, die zweimal im Jahr nachgezogen werden, und zwei Toren ohne Netz. Freigabe für Bewohner werktags bis achtzehn Uhr, danach ist das Feld laut Plan geschlossen und laut Nutzung nicht.",
  },
  {
    id: "schrottplatz",
    label: "Verwertungshof Ost",
    x: 87,
    y: 87,
    text: "Gestapelte Kisten, ausgeschlachtete Wankelblöcke, drei Kräne, von denen einer geht. Was hier landet, gilt als „dem Bestand entnommen“ und taucht in keiner Liste wieder auf.",
  },
  {
    id: "haltepunkt",
    label: "Haltepunkt Linie 28",
    kicker: "Wohngürtel ↔ Verwaltung",
    x: 30,
    y: 84.5,
    text: "Ein Wartehäuschen mit Fahrplan von 1991 und einem handgeschriebenen Zettel darunter. Der Bus kommt. Nur nicht nach Fahrplan.",
  },
  {
    id: "ringstrasse",
    label: "Ringstraße 28",
    x: 20,
    y: 12,
    text: "Die Ringstraße schließt den Sektor nach Norden ab. Vier Fahrspuren, zwei davon dauerhaft mit Bauzaun. Wer sie zu Fuß verlässt, gilt verwaltungstechnisch als „außerhalb des Zuständigkeitsbereichs“ und muss sich bei Rückkehr melden.",
  },
  {
    id: "q73",
    label: "Quadrant 73",
    x: 55,
    y: 63,
    text: "Belegung durch Zuweisung aus Sektor 29. Eigene Kantine, eigener Rohrpostast, eigene Wartezeiten. Man grüßt sich zwischen 73 und 71 nicht.",
  },
  {
    id: "q59",
    label: "Quadrant 59",
    kicker: "Blöcke 59-A bis 59-D",
    x: 13,
    y: 30,
    text: "Verwaltet als Mischbestand: unten Werkstätten, oben Wohnen. Der einzige Quadrant mit einem Laden, der auch nachmittags offen hat.",
  },
];
