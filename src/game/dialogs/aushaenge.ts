import type { DialogTree, GameApi } from "../types";

/**
 * Kleine Entscheidungs-Dialoge für die drei „Resonanz-Hygiene“-Aushänge.
 * Sie erscheinen erst, wenn Mira Layard um die Beleg-Sammlung gebeten hat
 * (Flag `miraAskedEvidence`). Vorher liest Layard nur.
 */

function takeAushang(
  api: GameApi,
  opts: {
    flag: "belegAushangAufzug" | "belegAushangKorridor46" | "belegAushangGemeinschaftsraum";
    name: string;
    description: string;
    lines: string[];
  },
) {
  api.setFlag(opts.flag);
  api.addItem({
    id: opts.flag,
    name: opts.name,
    description: opts.description,
  });
  api.showText(opts.lines);
}

function tree(
  id: string,
  readLines: string[],
  question: string,
  onTake: (api: GameApi) => void,
  leaveLines: string[],
): DialogTree {
  const lines: DialogTree["lines"] = {};
  readLines.forEach((text, i) => {
    lines[`r${i}`] = {
      id: `r${i}`,
      speaker: "SYSTEM",
      text,
      next: i === readLines.length - 1 ? "q" : `r${i + 1}`,
    };
  });
  lines.q = {
    id: "q",
    speaker: "SYSTEM",
    text: question,
    choices: [
      {
        text: "Aushang mitnehmen",
        action: onTake,
      },
      {
        text: "Aushang hängenlassen",
        action: (api) => api.showText(leaveLines),
      },
    ],
  };
  return {
    id,
    start: readLines.length ? "r0" : "q",
    onStart: (api) => api.setFlag("sawResonanzAushang"),
    lines,

  };
}

export const aushangDialogs: Record<string, DialogTree> = {
  aushangLobbyTake: tree(
    "aushangLobbyTake",
    "Mira braucht drei Fundstellen. Das Blatt hängt nur an vier Reißnägeln.",
    (api) =>
      takeAushang(api, {
        flag: "belegAushangAufzug",
        name: "Aushang „Resonanz-Hygiene“ (Lobby)",
        description:
          "Vom Schwarzen Brett der Lobby gelöst. Pflichtinformation zu Belegungsdichte, Lüftung und Türsiegel-Praxis. Unten: „Verstöße werden erfasst.“",
        lines: [
          "Kein Mensch am Tresen. Layard löst die Nadeln und faltet das Blatt ein.",
          "[ Aushang „Resonanz-Hygiene“ (Lobby) eingesteckt. ]",
        ],
      }),
    ["Layard lässt das Blatt hängen. Es hängt hier schließlich für alle."],
  ),
  aushangKorridor46Take: tree(
    "aushangKorridor46Take",
    "Mira braucht drei Fundstellen. Das Plakat hängt lose an vier Reißnägeln.",
    (api) =>
      takeAushang(api, {
        flag: "belegAushangKorridor46",
        name: "Plakat „Resonanz-Hygiene“ (Korridor 46)",
        description:
          "„RUHE IST TEIL DER STATIK.“ Belegungsdichte, Ruhezeiten 22–06. Am Fuß der Verweis auf die Sektorärztin. Handschriftlich dazu: „und ihr Käfig.“",
        lines: [
          "Niemand im Korridor. Layard löst die Reißnägel und faltet das Blatt ein.",
          "[ Plakat „Resonanz-Hygiene“ (Korridor 46) eingesteckt. ]",
        ],
      }),
    ["Layard lässt das Plakat hängen und geht weiter."],
  ),
  aushangGemeinschaftTake: tree(
    "aushangGemeinschaftTake",
    "Mira braucht drei Fundstellen. Am Tisch würfeln sie weiter, niemand schaut her.",
    (api) =>
      takeAushang(api, {
        flag: "belegAushangGemeinschaftsraum",
        name: "Aushang „Resonanz-Hygiene“ (Gemeinschaftsraum)",
        description:
          "Durchgestrichenes Piktogramm: jemand hämmert gegen eine Wand. „Pausen sind Teil der Behandlung.“ Unten: „Resonanzindex Stufe 3 — Sieben-Tage-Regel empfohlen.“",
        lines: [
          "Layard löst die Nadeln und faltet das Blatt ein.",
          "[ Aushang „Resonanz-Hygiene“ (Gemeinschaftsraum) eingesteckt. ]",
        ],
      }),
    ["Layard streicht das Blatt glatt und lässt es hängen."],
  ),
};
