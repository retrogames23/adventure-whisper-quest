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
      "Teppichfliesen, graublau, an den Laufwegen heller getreten. Rasterdecke, eine Leuchte zuckt. Nur zwei Türen auf dem ganzen Gang — dazwischen ein Terminal auf einem Beistelltisch, ein Faxgerät mit hängender Papierschlaufe und ein Gummibaum, der es überlebt hat. Am Ende Lamellenjalousien, dahinter grauer Regen.",
    hotspots: [
      {
        id: "door2101",
        x: 3,
        y: 4,
        w: 16,
        h: 92,
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
        x: 78,
        y: 4,
        w: 18,
        h: 92,
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
        id: "corridor21Terminal",
        x: 26,
        y: 50,
        w: 12,
        h: 22,
        label: "Terminal auf dem Beistelltisch",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein beiger Bildschirm mit Tastatur, auf einem Beistelltisch, der dafür zu niedrig ist. Ein Aufkleber am Rahmen: „Nur für Sachbearbeitung. Keine Privatvorgänge.“",
            "Der Cursor blinkt in einer Anmeldemaske. Layard tippt nichts ein. Zwei Fehlversuche stehen laut Aushang im Protokoll.",
          ]),
      },
      {
        id: "corridor21Fax",
        x: 40,
        y: 48,
        w: 9,
        h: 18,
        label: "Faxgerät",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein Faxgerät, aus dem sich Thermopapier in einer langen Schlaufe auf den Boden rollt.",
            "Dieselbe Sendung, siebenmal wiederholt: „Übertragung unvollständig — bitte erneut anfordern.“",
            "Angefordert hat sie offenbar niemand mehr.",
          ]),
      },
      {
        id: "corridor21Board",
        x: 35.5,
        y: 23,
        w: 6,
        h: 22,
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
        x: 51,
        y: 25,
        w: 13,
        h: 30,
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
        x: 24,
        y: 82,
        w: 52,
        h: 17,
        label: "Zurück zum Aufzug",
        kind: "exit",
        exitDir: "down",
        onUse: (api) => api.goTo("elevatorE71"),
      },
    ],
  },
};
