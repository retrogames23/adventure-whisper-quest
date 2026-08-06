import kellerBg from "@/assets/scene-keller-e67.jpg";
import type { Scene } from "../types";

/**
 * Keller E67 — Heizungszentrale unter der Lobby.
 *
 * Zweiter Weg an Miras Terminal: Wer Strang 46 hochdreht, treibt Mira
 * aus ihrer Wohnung. Die Tür oben ist nur mit Bodos Vierkantschlüssel
 * zu öffnen (und den gibt es erst nach der Thermoskanne).
 */
export const kellerE67Scenes: Record<string, Scene> = {
  kellerE67: {
    id: "kellerE67",
    background: kellerBg,
    title: "Keller E67 — Heizungszentrale",
    intro:
      "Betonboden, Holzpaletten, eine Leuchte im Drahtkorb. Quer durch den Raum ein Blechkasten in verwaschenem Giftgrün über altem Orange, an den Kanten Rost, oben ein gepanzerter Schlauch. Darunter sechs Steigstränge mit geriffelten Alu-Drehknöpfen. Es riecht nach heißem Staub.",
    hotspots: [
      {
        id: "heatingControl",
        x: 34,
        y: 30,
        w: 46,
        h: 42,
        label: "Heizungssteuerung — Steigstränge",
        kind: "use",
        onUse: (api) => {
          if (api.hasFlag("heatingStrang46Raised")) {
            api.showText([
              "Strang 46 steht am Anschlag. Der Blechkasten knackt in unregelmäßigen",
              "Abständen, als würde jemand von innen dagegenklopfen.",
              "Oben in Korridor 46 dürfte es inzwischen unerträglich sein.",
            ]);
            return;
          }
          if (!api.hasFlag("knowsStrang46")) {
            api.showText([
              "Sechs Drehknöpfe, sechs Steigstränge. Die Beschriftung ist",
              "handgeschriebenes Klebeband, dreimal überklebt.",
              "Welcher Strang welchen Korridor versorgt, steht hier nirgends —",
              "Layard dreht nicht auf Verdacht an fremder Betriebstechnik.",
            ]);
            return;
          }
          api.setFlag("heatingStrang46Raised");
          api.setFlag("miraFlatOpen");
          api.showText([
            "Vierter Knopf von links, darunter ein Streifen Klebeband: „46 A—D“.",
            "Layard dreht ihn bis zum Anschlag. Der Schlauch über dem Kasten",
            "beginnt zu zittern; irgendwo weit oben füllt sich ein Rohr.",
            "[ Steigstrang 46 steht auf Maximum. In Korridor 46 wird es warm. ]",
          ]);
        },
      },
      {
        id: "wartungsbuch",
        x: 8,
        y: 33,
        w: 8,
        h: 14,
        label: "Wartungsbuch",
        kind: "look",
        onUse: (api) => {
          const known = api.hasFlag("knowsStrang46");
          if (!known) api.setFlag("knowsStrang46");
          api.showText([
            "Ein Ringbuch an einer Schnur, das Papier wellig von der Feuchtigkeit.",
            "Spalten: Datum, Strang, Handzeichen. Die letzten Einträge sind Jahre alt.",
            "„Strang 46 — Korridor 46, Steigleitung A bis D. Regler vier.“",
            ...(known
              ? []
              : ["[ Layard weiß jetzt, welcher Regler zu Korridor 46 gehört. ]"]),
            "Weiter hinten, 1991: dasselbe Handzeichen immer wieder — I. K., Sektor-",
            "Elektriker E67-3804. Danach hört die Spalte einfach auf.",
          ]);
        },
      },
      {
        id: "rohrpostKeller",
        x: 20,
        y: 34,
        w: 12,
        h: 16,
        label: "Rohrpost-Verteiler",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein Verteilerblock aus Messing, sechzehn Klappen, jede mit einem",
            "Nummernschild. Vier davon sind mit Blech zugeschraubt.",
            "Auf einer Klappe klebt ein Zettel: „geht nicht mehr hoch. seit 94.“",
          ]),
      },
      {
        id: "kellerAushang",
        x: 8,
        y: 33,
        w: 6,
        h: 12,
        label: "Abgeklebter Aushang",
        kind: "look",
        hiddenWhen: ["knowsStrang46"],
        onUse: (api) =>
          api.showText([
            "Ein Aushang „Resonanz-Hygiene“, quer mit Paketband überklebt.",
            "Darunter lesbar nur noch: „… Keller gilt als Aufenthalt nicht vorgesehen.“",
          ]),
      },
      {
        id: "kellerLaundry",
        x: 10,
        y: 18,
        w: 24,
        h: 12,
        label: "Wäscheleinen",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Zwei Leinen, drei Kleidungsstücke, alle steif vor Staub.",
            "Sie hängen hier so lange, dass niemand mehr behaupten würde,",
            "sie gehörten ihm.",
          ]),
      },
      {
        id: "kellerExit",
        x: 0,
        y: 55,
        w: 9,
        h: 45,
        label: "Treppe hoch → Lobby",
        kind: "exit",
        onUse: (api) => api.goTo("floor1Lobby"),
      },
    ],
  },
};
