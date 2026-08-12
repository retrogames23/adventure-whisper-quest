import apt1102Bg from "@/assets/scene-apt-1102.jpg";
import type { Scene } from "../types";

/**
 * Wohnung 1102 — Gebäude E71, Etage 1, gegenüber der Bewohnerbibliothek.
 * Bewohnerin: Setsuko Arai, Künstlerin. Eine normale Bewohnerwohnung, in
 * der ihre Arbeit sichtbar ist — Punktbilder, genähte Auswüchse, ein
 * Spiegelparavent —, aber kein begehbares Gesamtkunstwerk.
 * Hier fällt — nur bei hartnäckigem Interesse — zum ersten Mal der
 * Name „Zero is Infinity“.
 */
export const apt1102Scenes: Record<string, Scene> = {
  apt1102: {
    id: "apt1102",
    background: apt1102Bg,
    title: "Wohnung 1102 — Gebäude E71",
    intro:
      "Eine gewöhnliche Bewohnerwohnung: Parkett, Sofa, Couchtisch, ein Regal voller Farbgläser. Und dazwischen die Arbeit — Leinwände voller roter Punkte an der Wand und an die Wand gelehnt, in der Ecke genähte, gepunktete Auswüchse, daneben ein Spiegelparavent. Es riecht nach Farbe, nicht nach Essen.",
    hotspots: [
      {
        id: "setsuko",
        x: 53,
        y: 17,
        w: 16,
        h: 78,
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
        x: 0,
        y: 14,
        w: 21,
        h: 82,
        label: "Punktbilder an der Wand",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein paar große Leinwände, gerahmt oder an die Wand gelehnt, jede voller Punkte. Aus zwei Schritten Entfernung ein Netz, aus fünf Schritten eine Fläche.",
            "Auf keinem Bild ist ein Rand frei geblieben. Wer das gemalt hat, hat nicht aufgehört, weil es fertig war.",
          ]),
      },
      {
        id: "softSculptures",
        x: 13,
        y: 57,
        w: 25,
        h: 35,
        label: "Genähte Auswüchse",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "In der Ecke liegen weiche, gepolsterte Formen, mit der Hand genäht, rot gepunktet, wie liegengelassene Arme.",
            "Sie sehen aus wie etwas, das man nicht laut benennt. Genau das ist offenbar der Punkt.",
          ]),
      },
      {
        id: "mirrorCorner",
        x: 22,
        y: 27,
        w: 12,
        h: 37,
        label: "Spiegelparavent",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein dreiteiliger Spiegelparavent, leicht eingewinkelt. Layard tritt davor und ist plötzlich drei Layards, dann zwanzig.",
            "Nach ein paar Sekunden weiß er nicht mehr sicher, welcher davon er ist. Er tritt zurück.",
          ]),
      },
      {
        id: "riceBowl",
        x: 43,
        y: 63,
        w: 8,
        h: 8,
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
        x: 79,
        y: 76,
        w: 19,
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
        x: 79,
        y: 9,
        w: 13,
        h: 65,
        label: "Zurück in den Korridor",
        kind: "exit",
        exitDir: "right",
        onUse: (api) => api.goTo("corridor11"),
      },
    ],
  },
};
