import apt1103Bg from "@/assets/scene-apt-1103.jpg";
import type { Scene } from "../types";

/**
 * Wohnung 1103 — Gebäude E71, Etage 1, Korridor 11.
 * Bewohner: Walter Grewe, Mitte 50, Alt-68er mit Garagentüftler-Seele.
 * Seine Wohnung ist eine Messwerkstatt rund um Funk und Resonanz,
 * technischer Stand von den 1930ern bis in die 90er.
 * Hier bekommt Layard die Peilung auf den verstärkten Träger 104,6:
 * Nordwest, 300–500 Meter — also E67.
 */
export const apt1103Scenes: Record<string, Scene> = {
  apt1103: {
    id: "apt1103",
    background: apt1103Bg,
    title: "Wohnung 1103 — Gebäude E71",
    intro:
      "Keine Wohnung, eine Werkstatt. Regale voller Messgeräte, Zeigerinstrumente in drei Generationen Grau, ein Röhrenempfänger, der leise brummt. In der Mitte ein hölzerner Peilrahmen auf einem Stativ. Es riecht nach Kolophonium, kaltem Kaffee und Zigaretten.",
    hotspots: [
      {
        id: "walter",
        x: 59,
        y: 18,
        w: 19,
        h: 80,
        label: "Walter Grewe",
        kind: "talk",
        onUse: (api) => {
          if (api.hasFlag("metWalter")) {
            api.startDialog("walterHub");
          } else {
            api.startDialog("walterIntro");
          }
        },
      },
      {
        id: "loopAntenna",
        x: 20,
        y: 1,
        w: 20,
        h: 72,
        label: "Peilrahmen",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein hölzerner Rahmen, mannshoch, drehbar auf einem Stativ, die Wicklung sauber mit Zwirn abgebunden. Auf dem Fuß ein Messingschild mit einer Jahreszahl: 1938.",
            "Am Drehteller klebt eine handgemalte Gradskala. Zwei Winkel sind mit Bleistift nachgezogen und mehrfach überschrieben, als hätte jemand dieselbe Messung sehr oft wiederholt.",
          ]),
      },
      {
        id: "sectorMap",
        x: 37,
        y: 4,
        w: 21,
        h: 42,
        label: "Wandplan mit Peillinien",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein großer Rasterplan von Sektor 28, an den Ecken vergilbt. Quer darüber zwei Bleistiftlinien, mit dem Lineal gezogen, aus zwei verschiedenen Punkten in E71.",
            "Wo sie sich kreuzen, liegt ein Kreis, mit dem Zirkel eingeschlagen, und daneben in kleiner Schrift: „300–500 m, NW“.",
          ]),
      },
      {
        id: "chartRecorder",
        x: 38,
        y: 57,
        w: 15,
        h: 22,
        label: "Schreiber mit Papierrolle",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein Bandschreiber zieht Millimeterpapier über eine Walze. Die Feder kratzt eine Linie, die kaum wackelt.",
            "Auf dem abgerissenen Stück daneben steht in Blockschrift: „104,6 — Pegel 11 Tage konstant. Kein Bastler.“",
          ]),
      },
      {
        id: "tubeShelf",
        x: 0,
        y: 12,
        w: 19,
        h: 40,
        label: "Regal mit Röhren und Messgeräten",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Glaskolben in Reih und Glied, manche noch in Pappschachteln mit alten Aufdrucken. Darunter Feldstärkemesser, ein Oszilloskop mit grünem Schirm, ein Empfänger, dessen Skala von Hand nachbeschriftet ist.",
            "Alles ist beschriftet, nichts ist aufgeräumt. Layard vermutet, dass das ein System ist, nur nicht seines.",
          ]),
      },
      {
        id: "workbench",
        x: 17,
        y: 76,
        w: 24,
        h: 22,
        label: "Werkbank",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Kaffeekanne, halbvolle Tasse, ein Aschenbecher, der seit Tagen niemanden gesehen hat. Dazwischen selbstgewickelte Spulen, ein Lötkolben, ein aufgeschlagenes Rechenheft.",
            "In dem Heft: Spalten mit Metern und Zeigerwerten, daneben eine Kurve, freihändig durch die Punkte gelegt.",
          ]),
      },
      {
        id: "posters1103",
        x: 68,
        y: 3,
        w: 12,
        h: 22,
        label: "Alte Plakate",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Verblasste Plakate, dreißig Jahre alt, Ränder wellig. Fäuste, Megafone, ein Satz über Versammlungsrecht, den man heute so nicht mehr druckt.",
            "Jemand hat sie nicht aus Nostalgie hängen lassen, sondern weil das Abhängen eine Entscheidung wäre.",
          ]),
      },
      {
        id: "back1103",
        x: 84,
        y: 6,
        w: 14,
        h: 88,
        label: "Zurück in den Korridor",
        kind: "exit",
        exitDir: "right",
        onUse: (api) => api.goTo("corridor11"),
      },
    ],
  },
};
