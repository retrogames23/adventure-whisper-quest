import libraryBg from "@/assets/scene-library-1101.jpg";
import type { Scene } from "../types";
import { LIBRARY_BOOKS, openBooks } from "../libraryE71Books";

/**
 * Raum 1101 — Bewohnerbibliothek in Gebäude E71, Etage 1.
 * Erste Tür links im Korridor 11. Bibliothekar: Herbert, um die 60.
 */
export const libraryE71Scenes: Record<string, Scene> = {
  libraryE71: {
    id: "libraryE71",
    background: libraryBg,
    title: "Bewohnerbibliothek 1101 — Gebäude E71",
    intro:
      "Warmes Licht aus einer grünen Schreibtischlampe, Regale bis unter die Decke, Teppich, der jedes Geräusch schluckt. Hinter dem Tresen steht ein älterer Mann und sortiert Karteikarten, ohne aufzusehen. Es riecht nach Papier und Staub — nicht nach Reiniger.",
    hotspots: [
      {
        id: "herbert",
        x: 8,
        y: 30,
        w: 20,
        h: 50,
        label: "Herbert (Bibliothekar)",
        kind: "talk",
        onUse: (api) => api.startDialog("herbertTalk"),
      },
      {
        id: "cardCatalogue",
        x: 3,
        y: 44,
        w: 16,
        h: 20,
        label: "Karteikasten",
        kind: "look",
        onUse: (api) =>
          api.showText([
            `Handbeschriftete Karten, alphabetisch. Der Katalog zählt ${LIBRARY_BOOKS.length} Titel.`,
            "Auf manchen Karten klebt oben rechts ein kleiner grüner Punkt. Eine gedruckte Notiz erklärt: „Grün = auch für Bewohner anderer Gebäude ausleihbar.“",
            `Grüne Punkte sind selten. Layard zählt ${openBooks().length}.`,
          ]),
      },
      {
        id: "shelvesLeft",
        x: 0,
        y: 2,
        w: 22,
        h: 40,
        label: "Regale",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Leinenrücken, verblasste Prägungen, dazwischen Bände ohne Titel — nur Registriernummern.",
            "Kein Siegelband, kein Sperrvermerk. Nur eine Ordnung, die jemand von Hand hält.",
          ]),
      },
      {
        id: "readingTable",
        x: 62,
        y: 55,
        w: 30,
        h: 30,
        label: "Lesetisch",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Zwei Stühle, ein aufgeschlagener Band, ein Stapel Zeitschriften. Jemand hat eine Karte als Lesezeichen liegen lassen.",
            "Präsenzbestand: hier lesen, hier lassen.",
          ]),
      },
      {
        id: "leseordnung",
        x: 76,
        y: 32,
        w: 12,
        h: 18,
        label: "Leseordnung",
        kind: "look",
        onUse: (api) =>
          api.showText([
            ">> LESEORDNUNG",
            ">> 1. Bücher pflegen.",
            ">> 2. Rechtzeitig zurückgeben.",
            ">> 3. Anderen Freude gönnen.",
            "Kein Formblatt. Kein Paragraph. Layard liest es zweimal.",
          ]),
      },
      {
        id: "openingHours",
        x: 33,
        y: 26,
        w: 8,
        h: 14,
        label: "Öffnungszeiten",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "DI 17–19 · DO 17–19 · SO 10–12.",
            "Darunter, kleiner: „Bei Abwesenheit bitte klopfen. Ich bin meistens da.“",
          ]),
      },
      {
        id: "backCorridor11",
        x: 62,
        y: 18,
        w: 12,
        h: 62,
        label: "Zurück in den Korridor",
        kind: "exit",
        exitDir: "right",
        onUse: (api) => api.goTo("corridor11"),
      },
    ],
  },
};
