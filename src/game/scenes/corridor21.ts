import corridor21Bg from "@/assets/scene-corridor-21.jpg";
import type { Scene } from "../types";

/**
 * Etage 2, Korridor 21 — Verwaltungsetage in Gebäude E71.
 * Nummernschema wie sonst: 2101–2140. Bewusst nur halb so viele Türen
 * wie Korridor 11: die Büros sind größer, die Gänge leerer.
 * Charakter: Büro 1992 — Teppichfliesen, Rauhfaser mit Dado-Streifen,
 * Rasterdecke, Kabelkanal, Terminal und Faxgerät auf dem Gang.
 */
export const corridor21Scenes: Record<string, Scene> = {
  corridor21: {
    id: "corridor21",
    background: corridor21Bg,
    title: "Korridor 21 — Etage 2, Gebäude E71",
    intro:
      "Teppichfliesen, graublau, an den Laufwegen heller getreten. Rasterdecke, eine Leuchte zuckt. Nur zwei Türen auf dem ganzen Gang — dazwischen ein Aushangkasten hinter Glas, ein Freischwinger aus Chrom und Kunstleder an einem Rauchglastisch, ein Gummibaum, der es überlebt hat. Am Ende Lamellenjalousien, dahinter grauer Regen.",
    hotspots: [
      {
        id: "door2101",
        x: 15,
        y: 2,
        w: 14,
        h: 94,
        label: "Tür 2101 — Objektverwaltung E71",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein Kunststoffschild im Rahmen: „2101 — Objektverwaltung E71 · Sprechzeit MI 9–11“.",
            "Darunter ein Briefschlitz, mit Klebeband zugeklebt. Handschriftlich daneben: „Vorgänge bitte in Fach 2103.“",
            "Die Klinke gibt keinen Millimeter nach.",
          ]),
      },
      {
        id: "door2103",
        x: 80,
        y: 2,
        w: 15,
        h: 94,
        label: "Tür 2103 — Sachbearbeitung",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "„2103 — Sachbearbeitung Resonanz-Hygiene“. Darunter ein Papierfach aus grauem Kunststoff, halb voll mit Durchschlägen.",
            "Layard hebt den obersten an: ein Formblatt, Feld für Feld ausgefüllt, unten der Vermerk „bearbeitet“ und kein Datum.",
            "Er legt ihn zurück. Genau so sieht sein eigener Arbeitstag aus, nur ein Gebäude weiter.",
          ]),
      },
      {
        id: "corridor21Seating",
        x: 31,
        y: 60,
        w: 18,
        h: 33,
        label: "Freischwinger und Rauchglastisch",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein Freischwinger aus Chrom und schwarzem Kunstleder, daneben ein runder Tisch mit Rauchglasplatte. 1992 hat das nach Zukunft ausgesehen.",
            "Auf dem Tisch eine Werkszeitschrift, aufgeschlagen bei einem Artikel über Ablaufoptimierung. Der Rand ist wellig, jemand hat Kaffee darauf abgestellt.",
          ]),
      },
      {
        id: "corridor21Ashtray",
        x: 9,
        y: 56,
        w: 7,
        h: 16,
        label: "Wandaschenbecher",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein grauer Wandaschenbecher aus Kunststoff, an der Klappe gelb angelaufen.",
            "Darüber, mit Filzstift auf ein Etikett: „Bitte nur bis 16 Uhr.“ Die Regel scheint älter zu sein als die Aufschrift.",
          ]),
      },
      {
        id: "corridor21Board",
        x: 33,
        y: 19,
        w: 9,
        h: 34,
        label: "Aushangkasten",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Hinter Glas, mit Reißzwecken befestigt: Sprechzeiten, ein Wartungsfenster, eine Hausordnung von 1989 mit handschriftlichen Ergänzungen.",
            "Ganz unten, kleiner gedruckt: „Korridor 21 — Verwaltung, Etage 2 · 2101–2140. Wohnnutzung nicht vorgesehen.“",
          ]),
      },
      {
        id: "corridor21Window",
        x: 55,
        y: 21,
        w: 18,
        h: 34,
        label: "Fenster mit Lamellenjalousie",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Vertikale Lamellen, halb verdreht. Dahinter Regen, ein Stück Dachkante, weiter hinten nichts, was sich lohnt.",
            "Unter dem Fenster ein Heizkörper, lauwarm. Auf der Fensterbank ein Aschenbecher, leer und trotzdem benutzt riechend.",
          ]),
      },
      {
        id: "backElevator21",
        x: 52,
        y: 84,
        w: 26,
        h: 17,
        label: "Zurück zum Aufzug",
        kind: "exit",
        exitDir: "down",
        onUse: (api) => api.goTo("elevatorE71"),
      },
    ],
  },
};
