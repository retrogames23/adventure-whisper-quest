import vossbeckOfficeBg from "@/assets/scene-vossbeck-office.jpg";
import type { Scene } from "../types";

/**
 * Oberinspektor Vossbeck — eigenes Hinterzimmer.
 *
 * Erreichbar von der Kantine 3602 (E67) durch eine schmale Aktentür hinter
 * dem Hochregal. Die Tür wird sichtbar/zugänglich, sobald Layard drei
 * Trainingsfälle gegen Brust gewonnen hat (Flag `vossbeckSummoned`). Vorher
 * existiert die Tür offiziell nicht — Brust und Kowalk verweisen erst
 * darauf, wenn der Bewohner „satisfaktionsfähig" ist.
 */
export const vossbeckOfficeScenes: Record<string, Scene> = {
  vossbeckOffice: {
    id: "vossbeckOffice",
    background: vossbeckOfficeBg,
    title: "Aktenzimmer — Oberinspektor Vossbeck",
    intro:
      "Ein schmales Hinterzimmer, kaum größer als ein Aktenschrank breit. Eine Lampe, ein Bleistift, ein Mann, der nicht aufschaut. An der rechten Wand bis zur Decke Pappschachteln mit Vorgangsnummern. Es riecht nach altem Papier und Bohnerwachs.",
    hotspots: [
      {
        id: "vossbeckSpot",
        // Vossbeck mittig hinter dem Schreibtisch.
        x: 40,
        y: 35,
        w: 22,
        h: 55,
        label: "Oberinspektor Vossbeck",
        kind: "talk",
        onUse: (api) => {
          api.startDialog("cafeteriaVossbeck");
        },
      },
      {
        id: "vossbeckDesk",
        x: 28,
        y: 78,
        w: 50,
        h: 18,
        label: "Schreibtisch",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Ein Stahlschreibtisch, militärgrau. Auf der rechten Seite ein Stapel",
            "Vorgänge, alle mit der gleichen, sehr akkuraten Handschrift annotiert.",
            "Daneben ein einzelner Bleistift, vorne neu angespitzt, hinten unbenutzt.",
          ]),
      },
      {
        id: "vossbeckShelves",
        x: 80,
        y: 4,
        w: 19,
        h: 92,
        label: "Aktenregal bis zur Decke",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Pappschachteln, alphabetisch nach Paragraph sortiert. §1 ganz",
            "oben links, §99 unten rechts, mit einem zusätzlichen roten Punkt.",
            "Vossbeck hat den §99 offenbar oft in der Hand.",
          ]),
      },
      {
        id: "vossbeckWindow",
        x: 1,
        y: 0,
        w: 25,
        h: 70,
        label: "Fenster mit Jalousie",
        kind: "look",
        onUse: (api) =>
          api.showText([
            "Die Jalousie steht halb offen, aber dahinter ist nur Schacht. Kein Tag,",
            "keine Nacht. Vossbeck hat sie wahrscheinlich seit Jahren nicht angefasst.",
          ]),
      },
      {
        id: "vossbeckExit",
        // Linker Bildrand: zurück durch die Aktentür in die Kantine.
        x: 0,
        y: 70,
        w: 12,
        h: 30,
        label: "Zurück in die Kantine",
        kind: "exit",
        onUse: (api) => api.goTo("cafeteriaE67"),
      },
    ],
  },
};