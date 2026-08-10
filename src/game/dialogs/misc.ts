import type { DialogTree } from "../types";

export const miscDialogs: Record<string, DialogTree> = {
  emptyOfficeSign: {
    id: "emptyOfficeSign",
    start: "eo1",
    lines: {
      eo1: {
        id: "eo1",
        speaker: "SYSTEM",
        text: "[ An der Tür 3601 hängt ein DIN-A5-Zettel. Maschinenschrift, krumm geklebt. ] „HEUTE NICHT BESETZT — Dienstplan-Engpass. Vertretung für E67: Gebäude E71, Zimmer 1534.“",
        next: "eo3",
      },
      eo3: {
        id: "eo3",
        speaker: "LAYARD",
        text: "Was soll ich jetzt tun? Ich rufe die Leitstelle wieder an.",
        // Nur sinnvoll, wenn Layard schon das Einsatzprotokoll hat —
        // sonst hat er gar keinen Anlass, die Leitstelle anzurufen.
        // Ohne Protokoll endet der Dialog nach eo2 (Schild lesen reicht).
        requires: ["protocolReceived"],
        end: true,
      },
    },
  },
  emptyOfficeBell: {
    id: "emptyOfficeBell",
    start: "eb1",
    lines: {
      eb1: {
        id: "eb1",
        speaker: "SYSTEM",
        text: "[ Layard drückt den Klingelknopf. Ein dünnes, fernes Klingeln hinter der Tür. ] [ Sieben Sekunden Stille. Ein mechanisches Klacken. Dann nichts mehr. ]",
        next: "eb3",
      },
      eb3: {
        id: "eb3",
        speaker: "LAYARD",
        text: "Niemand. Wirklich niemand.",
        subtext: "Eine Mischung aus Erleichterung und Wut. Beides gleichzeitig, beides leise.",
        end: true,
      },
    },
  },
  bookshelfPick: {
    id: "bookshelfPick",
    start: "bp1",
    lines: {
      bp1: {
        id: "bp1",
        speaker: "SYSTEM",
        text: "[ Zwei Bücher stehen nebeneinander im Regal. ]",
        choices: [
          {
            text: "Sektoren-Almanach 1997",
            action: (api) => api.openAlmanach(),
          },
          {
            text: "Die kürzeste Geschichte der Menschheit",
            action: (api) => {
              api.openHistoryBook();
            },
          },
          { text: "Regal in Ruhe lassen." },
        ],
        end: true,
      },
    },
  },
};
