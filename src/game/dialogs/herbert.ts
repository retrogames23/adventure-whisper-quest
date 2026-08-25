import type { DialogTree, DialogLine, StoryFlag } from "../types";
import { getBook } from "../books";
import { LIBRARY_BOOKS } from "../libraryE71Books";
import { HERBERT_FAKTEN } from "../herbertFakten";

const faktFlag = (id: string) => `hbFakt_${id}` as StoryFlag;

/** Eine Dialogzeile pro kuriosem Fakt — führt zurück in den Hub. */
const faktLines: Record<string, DialogLine> = Object.fromEntries(
  HERBERT_FAKTEN.map((f) => [
    `fakt_${f.id}`,
    {
      id: `fakt_${f.id}`,
      speaker: "HERBERT" as const,
      text: f.text,
      ...(f.subtext ? { subtext: f.subtext } : {}),
      next: "hh1",
    },
  ]),
);

/**
 * Herbert — Bibliothekar der Bewohnerbibliothek 1101 (E71, Etage 1).
 * Ruhiger Gesprächspartner: E71, Politik im Mandatsgebiet, Kunst,
 * Literatur, Weltgeschichte. Steckenpferde: Sumerer und Eisenbahn.
 * Ausleihe: alle Titel, auch für Bewohner anderer Gebäude.
 */
export const herbertDialogs: Record<string, DialogTree> = {
  herbertTalk: {
    id: "herbertTalk",
    start: "hb1",
    npcId: "herbert",
    onStart: (api) => api.setFlag("metHerbert"),
    lines: {
      hb1: {
        id: "hb1",
        speaker: "HERBERT",
        hiddenWhen: ["metHerbert"],
        text: "Guten Tag. Sie sind nicht von hier, oder? — Nicht schlimm. Lesen darf jeder, das steht so in der Leseordnung. Ganz oben sogar.",
        subtext: "Er sagt es freundlich, ohne Prüfblick. Der erste Mensch heute, der Layard nicht abgleicht.",
        next: "hb2",
      },
      hb2: {
        id: "hb2",
        speaker: "HERBERT",
        hiddenWhen: ["metHerbert"],
        text: "Herbert. Ich mache das hier seit neunzehn Jahren, dienstags, donnerstags, sonntags. Setzen Sie sich, wenn Sie mögen.",
        next: "hh1",
      },
      hh1: {
        id: "hh1",
        speaker: "HERBERT",
        text: "Worüber wollen wir reden?",
        choicesFn: (api) => {
          const offen = HERBERT_FAKTEN.filter((f) => !api.hasFlag(faktFlag(f.id)));
          const neueRunde = offen.length === 0;
          const pool = neueRunde ? HERBERT_FAKTEN : offen;
          const naechster = pool[Math.floor(Math.random() * pool.length)];
          return [
            { text: "Über dieses Gebäude. E71.", next: "e71" },
            { text: "Über Politik im Mandatsgebiet.", next: "politik" },
            { text: "Über Kunst und Literatur.", next: "kunst" },
            { text: "Über Geschichte.", next: "geschichte" },
            ...(api.hasFlag("herbertFaktenBekannt")
              ? [
                  {
                    text: "Erzählen Sie mir einen kuriosen Fakt.",
                    next: `fakt_${naechster.id}`,
                    action: () => {
                      if (neueRunde) {
                        HERBERT_FAKTEN.forEach((f) => api.clearFlag(faktFlag(f.id)));
                      }
                      api.setFlag(faktFlag(naechster.id));
                    },
                  },
                ]
              : [{ text: "Woher wissen Sie eigentlich so viel?", next: "wissen1" }]),
            { text: "Ich würde gern ein Buch ausleihen.", next: "leihe2" },
            ...(LIBRARY_BOOKS.some((b) => api.hasItem(b.itemId))
              ? [{ text: "Ich möchte ein Buch zurückbringen.", next: "rueck1" }]
              : []),
            { text: "Später. Danke, Herbert." },
          ];
        },
      },
      wissen1: {
        id: "wissen1",
        speaker: "HERBERT",
        text: "Neunzehn Jahre Katalog. Man schlägt jedes Buch einmal auf, um es einzutragen, und liest dann versehentlich eine Seite. Über die Jahre kommt da einiges zusammen.",
        subtext: "Er sagt es entschuldigend, als wäre Wissen eine kleine Unordnung.",
        next: "wissen2",
      },
      wissen2: {
        id: "wissen2",
        speaker: "HERBERT",
        text: "Das Ärgerliche ist: Hängen bleibt vor allem das Nutzlose. Perlen, Hyänen, tote Päpste. Nichts davon steht in einem Formular. Fragen Sie mich ruhig mal, wenn Ihnen der Tag zu lang wird.",
        next: "wissen3",
      },
      wissen3: {
        id: "wissen3",
        speaker: "HERBERT",
        text: "Ein wandelndes Lexikon, hat meine Schwester gesagt. Sie meinte es nicht als Kompliment.",
        next: "hh1",
      },

      e71: {
        id: "e71",
        speaker: "HERBERT",
        text: "E71 ist ein freundliches Haus, und das ist keine Selbstverständlichkeit, sondern eine Zuteilung. Teppich, Wandlampen, zweimal Reinigung die Woche. Die Leute hier verwechseln das gern mit Charakter.",
        subtext: "Er sagt „Zuteilung“ so vorsichtig, als wäre das Wort schwerer als die Sache.",
        next: "e712",
      },
      e712: {
        id: "e712",
        speaker: "HERBERT",
        text: "Die Bibliothek gibt es, weil ein Verwalter 1978 eine Zeile in einem Formular übrig hatte. Seitdem steht sie im Plan. Niemand hat sie je bestellt, niemand streicht sie. So überlebt man hier.",
        next: "hh1",
      },
      politik: {
        id: "politik",
        speaker: "HERBERT",
        text: "Der Mandatsrat verwaltet seit 1946. Vier Schutzmächte, ein Auftrag, der ursprünglich „Wiederaufbau“ hieß. Das Wort steht heute noch auf den Briefköpfen, obwohl längst nichts mehr aufgebaut wird.",
        next: "politik2",
      },
      politik2: {
        id: "politik2",
        speaker: "HERBERT",
        text: "Ich halte nichts von Empörung, sie verbraucht sich zu schnell. Aber ich habe ein gutes Gedächtnis für Formulierungen. Und die ändern sich, Herr … Worag? Die ändern sich langsam, in eine bestimmte Richtung.",
        subtext: "Er lächelt entschuldigend, als hätte er zu viel gesagt. Hat er vielleicht auch.",
        next: "hh1",
      },
      kunst: {
        id: "kunst",
        speaker: "HERBERT",
        text: "Was mich wundert: Es gibt in diesem Sektor keine schlechte Literatur mehr. Nur zugelassene und nicht vorhandene. Das ist etwas anderes als Qualität.",
        next: "kunst2",
      },
      kunst2: {
        id: "kunst2",
        speaker: "HERBERT",
        text: "Ich mag Bücher, die kein Ergebnis haben. Reisebeschreibungen, Briefwechsel, Kataloge. Man liest zwei Stunden und hat nichts erledigt. Das ist heute fast schon eine Haltung.",
        next: "hh1",
      },
      geschichte: {
        id: "geschichte",
        speaker: "HERBERT",
        text: "Geschichte, gern. Ich habe zwei Marotten, ich sage es lieber vorher: die Sumerer und die Eisenbahn.",
        choices: [
          { text: "Sumerer?", next: "sumer" },
          { text: "Eisenbahn?", next: "bahn" },
          { text: "Zurück.", next: "hh1" },
        ],
      },
      sumer: {
        id: "sumer",
        speaker: "HERBERT",
        text: "Die ältesten Schriftstücke der Menschheit sind Abrechnungen. Uruk, um 3300 vor unserer Zeitrechnung: Gerste, Bier, Schafe, Arbeitstage. Keine Gedichte. Keine Gebete. Listen.",
        subtext: "Er wird lebendig. Die Hände bewegen sich zum ersten Mal.",
        next: "sumer2",
      },
      sumer2: {
        id: "sumer2",
        speaker: "HERBERT",
        text: "Die Schrift wurde erfunden, um Menschen zu erfassen, nicht um sie zu erzählen. Das Erzählen kam Jahrhunderte später dazu, als Nebenprodukt. Ich denke oft daran, wenn ich hier Karteikarten schreibe.",
        next: "hh1",
      },
      bahn: {
        id: "bahn",
        speaker: "HERBERT",
        text: "Jedes Land hat seine Eisenbahn nach seinem Charakter gebaut. Die Franzosen sternförmig auf die Hauptstadt zu, die Deutschen als Netz zwischen Industrierevieren, die Schweizer in Kehrtunneln durch Gestein, das sie eigentlich nicht durchlässt.",
        next: "bahn2",
      },
      bahn2: {
        id: "bahn2",
        speaker: "HERBERT",
        text: "Nach dem Krieg wurden die Nebenbahnen zuerst stillgelegt. Erst die Züge, dann die Fahrpläne, dann die Ortsnamen auf den Schildern. Ich habe hier Fahrpläne von Strecken, die es nicht mehr gibt. Sie sind bis auf die Minute genau.",
        subtext: "Er sagt das ohne Bitterkeit. Eher wie jemand, der etwas aufhebt, weil sonst niemand es tut.",
        next: "hh1",
      },
      leihe2: {
        id: "leihe2",
        speaker: "HERBERT",
        text: "Gern. Alles, was hier steht, darf mit. Sagen Sie einfach, welchen Titel.",
        choicesFn: (api) => [
          ...LIBRARY_BOOKS.map((b) => {
            const owned = api.hasItem(b.itemId);
            return {
              text: owned
                ? `„${b.title}“ — haben Sie schon`
                : `„${b.title}“ ausleihen`,
              action: () => {
                if (owned) {
                  api.showText([
                    "Herbert schmunzelt. „Das liegt schon bei Ihnen. Lesen Sie erst.“",
                  ]);
                  return;
                }
                api.addItem({
                  id: b.itemId,
                  name: b.itemName,
                  description: `${b.title} — ${b.author}, ${b.year}. Leihgabe der Bewohnerbibliothek 1101. ${b.blurb}`,
                });
                api.showText([
                  `${b.title} — ${b.author}, ${b.year}.`,
                  "Herbert schiebt es über den Tresen, zieht eine Karteikarte heraus und notiert ein Datum. „Bringen Sie es zurück, wenn Sie es gelesen haben. Oder wenn nicht.“",
                ]);
              },
            };
          }),
          { text: "Zurück zum Gespräch.", next: "hh1" },
        ],
      },
      rueck1: {
        id: "rueck1",
        speaker: "HERBERT",
        text: "Legen Sie es einfach hin. Welches ist es?",
        choicesFn: (api) => [
          ...LIBRARY_BOOKS.filter((b) => api.hasItem(b.itemId)).map((b) => ({
            text: `„${b.title}“ zurückgeben`,
            action: () => {
              api.removeItem(b.itemId);
              api.showText([
                "Herbert nimmt das Buch, streicht kurz über den Rücken und stellt es an seinen Platz.",
                "„Danke. Es steht wieder da, wo es hingehört.“",
              ]);
            },
          })),
          { text: "Doch nicht.", next: "hh1" },
        ],
      },
    },
  },
  libraryReadingTable: {
    id: "libraryReadingTable",
    start: "lrt1",
    npcId: "herbert",
    lines: {
      lrt1: {
        id: "lrt1",
        speaker: "HERBERT",
        text: "Nehmen Sie Platz. Hier dürfen Sie alles lesen, was im Regal steht. Was darf ich Ihnen hinlegen?",
        choicesFn: (api) => {
          const readable = LIBRARY_BOOKS.filter((b) => getBook(b.id));
          return [
            ...readable.map((b) => ({
              text: `„${b.title}“`,
              action: () => api.openBook(b.id),
            })),
            { text: "Doch nicht. Danke.", next: "lrtEnd" },
          ];
        },
      },
      lrtEnd: {
        id: "lrtEnd",
        speaker: "HERBERT",
        text: "Gern. Und wenn Sie es mitnehmen wollen: sagen Sie Bescheid, ich trage es ein.",
      },
    },
  },
};
