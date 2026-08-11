import type { DialogTree } from "../types";
import { LIBRARY_BOOKS, openBooks } from "../libraryE71Books";

/**
 * Herbert — Bibliothekar der Bewohnerbibliothek 1101 (E71, Etage 1).
 * Ruhiger Gesprächspartner: E71, Politik im Mandatsgebiet, Kunst,
 * Literatur, Weltgeschichte. Steckenpferde: Sumerer und Eisenbahn.
 * Ausleihe nur aus der Freigabeliste — Layard wohnt in E67.
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
        choices: [
          { text: "Über dieses Gebäude. E71.", next: "e71" },
          { text: "Über Politik im Mandatsgebiet.", next: "politik" },
          { text: "Über Kunst und Literatur.", next: "kunst" },
          { text: "Über Geschichte.", next: "geschichte" },
          { text: "Ich würde gern ein Buch ausleihen.", next: "leihe1" },
          { text: "Später. Danke, Herbert." },
        ],
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
      leihe1: {
        id: "leihe1",
        speaker: "HERBERT",
        text: "Gern — mit einer Einschränkung, die nicht von mir stammt. Der Bestand hier ist für Bewohner von E71. Für auswärtige Bewohner ist nur die Freigabeliste ausleihbar. Der Rest bleibt im Raum; lesen dürfen Sie ihn hier am Tisch, so lange Sie wollen.",
        next: "leihe2",
      },
      leihe2: {
        id: "leihe2",
        speaker: "HERBERT",
        text: `Die Liste ist kurz. ${openBooks().length} von ${LIBRARY_BOOKS.length} Titeln im Katalog.`,
        choicesFn: (api) => [
          ...openBooks().map((b) => ({
            text: `„${b.title}“ ansehen`,
            action: () =>
              api.showText([
                `${b.title} — ${b.author}, ${b.year}.`,
                b.blurb,
                "Herbert schiebt es über den Tresen und notiert nichts. „Bringen Sie es zurück, wenn Sie es zurückbringen.“",
              ]),
          })),
          { text: "Zurück zum Gespräch.", next: "hh1" },
        ],
      },
    },
  },
};
