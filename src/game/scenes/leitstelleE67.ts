import leitstelleBg from "@/assets/scene-leitstelle-e67.jpg";
import type { Scene } from "../types";

/**
 * Leitstelle E67 — kleines Disposition-Büro hinter Tür 4602 in Korridor 46.
 * Zweiter Besuch bei Insa Bauerfeind. Den ersten (Kapsel-Übergabe, Tee,
 * Einladung „kommen Sie morgen vorbei") hat die Akt-II-Bridge-Cutscene
 * bereits abgehandelt. Hier kommt Layard freiwillig zurück — mit den
 * Namen, die Mikael und Okwu beiläufig fallen gelassen haben.
 *
 * Die Szene enthält bewusst keinen Schicht-Botengang. Layard verlässt sie
 * mit einer Frage und einem Item: der „Akte 1978 · N. Sertl · Gutachten
 * C. Marteau". Das ist sein eigenes Ziel für Akt II — nicht ein Auftrag
 * von Insa, sondern eine Genehmigung, etwas zu suchen.
 */
export const leitstelleE67Scenes: Record<string, Scene> = {
  leitstelleE67: {
    id: "leitstelleE67",
    background: leitstelleBg,
    title: "Leitstelle E67 — Disposition",
    intro:
      "Hinter der Tür 4602 ein einzelnes Büro. Linoleum, Resopal, drei beige Tischapparate. Auf der Schrankwand hängende Registratur. Aus einer halb offenen Schublade rieseln vergilbte Karteireiter. Auf dem Tee-Tablett eine Kanne, die wirklich Tee enthält. Insa sitzt am Schreibtisch — kleiner als am Hörer.",
    hotspots: [
      {
        id: "insaInPerson",
        x: 39.9,
        y: 30.1,
        w: 19.9,
        h: 42.5,
        label: "Insa Bauerfeind",
        kind: "talk",
        onUse: (api) => {
          if (!api.hasFlag("insaAct2BriefingDone")) {
            api.startDialog("insaAct2InPerson");
          } else {
            api.startDialog("insaAct2InPersonAfter");
          }
        },
      },
      {
        id: "registratur",
        x: 17.7,
        y: 15.5,
        w: 34,
        h: 45,
        label: "Schrankwand · Hängeregistratur",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Drei Schränke voll Hängeregistratur. Farbige Reiter in einem System,",
            "das Layard nicht versteht.",
            "Eine Schublade ist halb offen — vergilbte Akten, manche älter als er.",
            "Hier liegt mehr ungelesene Welt als in der ganzen Sektor-Bibliothek.",
          ]),
      },
      {
        id: "phones",
        x: 25.4,
        y: 66.9,
        w: 40.2,
        h: 18,
        label: "Drei Tischtelefone",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Drei beige Bakelit-Apparate. Einer davon ist abgehoben und liegt auf",
            "dem Tisch — Insas Trick, die Vermittlung kurz still zu stellen.",
            "Die anderen beiden sind eingehängt. Insa sagt, der rechte klingelt nie.",
            "Er ist die direkte Leitung in einen Raum, in dem niemand mehr sitzt.",
          ]),
      },
      {
        id: "aushangResonanz",
        x: 79.7,
        y: 5.9,
        w: 11.9,
        h: 30,
        label: "Aushang „Resonanz-Hygiene“",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Vergilbtes Blatt, mit zwei Reißnägeln befestigt.",
            "„Resonanz-Hygiene · Pausen sind Teil der Behandlung.“",
            "Darunter, klein: „Ruhezeiten · Lüftung · Belegungsdichte · Türsiegel-Praxis.“",
            "Und ganz unten: „Resonanzindex Stufe 3 — Sieben-Tage-Regel empfohlen.“",
            "Jemand hat mit Bleistift dazugeschrieben: „empfohlen, nicht erzwungen. Stufe 3 ist, was der Mandatsrat draus macht.“",
          ]),
      },
      {
        id: "back4602",
        x: 54.8,
        y: 13.4,
        w: 14,
        h: 56,
        label: "Zurück in den Korridor",
        kind: "exit",
        exitDir: "right",
        onUse: (api) => api.goTo("corridor46"),
      },
    ],
  },
};
