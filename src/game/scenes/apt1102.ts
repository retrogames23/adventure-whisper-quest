import apt1102Bg from "@/assets/scene-apt-1102.jpg";
import type { Scene } from "../types";

/**
 * Wohnung 1102 — Gebäude E71, Etage 1, gegenüber der Bewohnerbibliothek.
 * Bewohnerin: Setsuko Arai, Künstlerin. Die Wohnung ist selbst das Werk:
 * Punkte auf allen Flächen, genähte Auswüchse, ein Spiegelwinkel.
 * Hier fällt — nur bei hartnäckigem Interesse — zum ersten Mal der
 * Name „Zero is Infinity“.
 */
export const apt1102Scenes: Record<string, Scene> = {
  apt1102: {
    id: "apt1102",
    background: apt1102Bg,
    title: "Wohnung 1102 — Gebäude E71",
    intro:
      "Kein Zimmer, ein Muster. Wände, Boden, Sofa, Tisch: überall dieselben roten Punkte, mit der Hand gesetzt, tausendfach. Über die Möbel wachsen genähte Auswüchse aus demselben gepunkteten Stoff. In einer Ecke stehen kleine Spiegel im Winkel und vervielfachen alles ins Endlose. Es riecht nach Farbe, nicht nach Essen.",
    hotspots: [
      {
        id: "setsuko",
        x: 30,
        y: 22,
        w: 20,
        h: 60,
        label: "Setsuko Arai",
        kind: "talk",
        onUse: (api) => {
          if (api.hasFlag("metSetsuko")) {
            api.startDialog("setsukoHub");
          } else {
            api.startDialog("setsukoIntro");
          }
        },
      },
      {
        id: "dotPaintings",
        x: 2,
        y: 8,
        w: 14,
        h: 30,
        label: "Punktbilder an der Wand",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Leinwände, dicht an dicht, jede voller Punkte. Aus zwei Schritten Entfernung ein Netz, aus fünf Schritten eine Fläche.",
            "Auf keinem Bild ist ein Rand frei geblieben. Wer das gemalt hat, hat nicht aufgehört, weil es fertig war.",
          ]),
      },
      {
        id: "softSculptures",
        x: 47,
        y: 60,
        w: 26,
        h: 30,
        label: "Genähte Auswüchse",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Aus dem Sofa und über die Tischkante wachsen weiche, gepolsterte Formen, mit der Hand genäht, gepunktet wie alles hier.",
            "Sie sehen aus wie etwas, das man nicht laut benennt. Genau das ist offenbar der Punkt.",
          ]),
      },
      {
        id: "mirrorCorner",
        x: 22,
        y: 8,
        w: 20,
        h: 50,
        label: "Spiegelwinkel",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Zwei Spiegel im rechten Winkel, dazwischen runde kleine Scheiben. Layard tritt hinein und ist plötzlich zwanzig Layards, dann zweihundert.",
            "Nach ein paar Sekunden weiß er nicht mehr sicher, welcher davon er ist. Er tritt zurück.",
          ]),
      },
      {
        id: "riceBowl",
        x: 58,
        y: 55,
        w: 8,
        h: 10,
        label: "Reisschale",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Eine Schale Reis auf dem Tisch, unberührt, längst kalt. Daneben ein Löffel, gerade so hingelegt, dass er die Schale nicht berührt.",
            "Sie steht da wie ein Modell, nicht wie eine Mahlzeit.",
          ]),
      },
      {
        id: "leaflets",
        x: 82,
        y: 74,
        w: 14,
        h: 22,
        label: "Stapel selbstgedruckter Blätter",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Handabgezogene Blätter, Punkte in Rot, darunter eine Zeile in unsauberem Satz: „Bedecke dich nicht. Werde Muster.“",
            "Kein Datum, kein Ort, keine Registriernummer. Nichts daran ist vorgesehen.",
          ]),
      },
      {
        id: "back1102",
        x: 88,
        y: 8,
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
