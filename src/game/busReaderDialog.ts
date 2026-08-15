/**
 * Ilka Verhoeven — die Leserin auf Linie 28 (Buskomposition „h“).
 *
 * Sie liest „Nicht vorgesehen“ von Christa Wolf. Das gesamte Gespräch dreht
 * sich um diesen Roman; welche Themen Layard anbieten kann, hängt davon ab,
 * wie lange er das Buch im Spiel selbst offen hatte
 * (`bookReadingTime.ts`: none / peek / read).
 */

import type { BusPassenger, BusTopic } from "./busPassengerDialogs";
import type { BookReadState } from "./bookReadingTime";

const ABSCHIED = "„Sie steigen aus? Gut. Ich habe noch neun Seiten.“";

/** Zweige, die es in jedem Zustand gibt — Ilka über sich und das Lesen. */
const GEMEINSAM: BusTopic[] = [
  {
    id: "woher",
    label: "Fragen, woher sie das Buch hat.",
    lines: [
      "„Bewohnerbibliothek in E71. Erster Stock, hinter der Tür, die aussieht, als wäre dahinter nichts.“",
      "„Der Herr dort führt einen Karteikasten, als wäre es ein Vorgang. Man muss zweimal fragen. Beim ersten Mal sagt er, was vorhanden ist. Beim zweiten Mal sagt er, was da ist.“",
    ],
    follow: [
      {
        id: "ausleihe",
        label: "Fragen, ob so eine Ausleihe Ärger macht.",
        lines: [
          "„Es ist in Regel. Es steht auf keiner Liste, aber es steht auch auf keiner anderen Liste, verstehen Sie?“",
          "„Ich trage es trotzdem mit dem Rücken nach innen. Nicht aus Furcht. Aus Gewohnheit. Das ist fast schlimmer.“",
        ],
      },
      {
        id: "nochmal",
        label: "Fragen, ob sie es zum ersten Mal liest.",
        lines: [
          "„Zum zweiten. Beim ersten Mal habe ich gewartet, dass etwas passiert. Es passiert nichts, und das ist, was passiert.“",
        ],
      },
    ],
  },
  {
    id: "hefte",
    label: "Fragen, ob sie selbst ein Heft führt.",
    lines: [
      "„Nein. Ich habe nie eines geführt. Bei uns hat das niemand gemacht, jedenfalls hat es niemand gesagt.“",
      "„Und jetzt lese ich vierhundert Seiten über einen Mann, der vierzig Jahre lang jeden Sonntag ‚ich‘ geschrieben hat, und weiß nicht, ob mir etwas fehlt oder ob das einfach altmodisch ist.“",
    ],
    follow: [
      {
        id: "aufgewachsen",
        label: "Fragen, wie sie hier aufgewachsen ist.",
        lines: [
          "„Sektor 28, Quadrant 12, immer dieselbe Bushaltestelle. Man wächst nicht in einer Verwaltung auf, man wächst in Fluren auf.“",
          "„Ich fand das nie bedrückend. Es war einfach das Wetter. Man beschwert sich nicht über Wetter, man zieht sich an.“",
        ],
        follow: [
          {
            id: "seitdem",
            label: "Fragen, ob sich das durch das Buch geändert hat.",
            lines: [
              "„Ein bisschen. Ich merke jetzt, wie ich rede. ‚Es wird zur Kenntnis genommen.‘ Das sage ich sogar zu meiner Mutter.“",
              "„Das Buch nennt so etwas nicht Kritik. Es schreibt es nur hin. Ich bin mir bis heute nicht sicher, ob es überhaupt Kritik sein soll. Es steht ja nichts Verbotenes drin — es steht nur alles da.“",
            ],
          },
        ],
      },
      {
        id: "beruf",
        label: "Fragen, was sie arbeitet.",
        lines: [
          "„Zuteilungsstelle. Wohnraum, Brennstoff, Ersatzteile. Ich sitze auf der anderen Seite des Formblatts.“",
          "„Deshalb lese ich es wie eine Dienstanweisung. Ich erkenne jedes Blatt wieder. Das 12b haben wir immer noch, nur heißt es jetzt anders.“",
        ],
      },
    ],
  },
];

/** Zustand 1: Layard hat den Roman nie geöffnet. */
const TOPICS_NONE: BusTopic[] = [
  {
    id: "was-liest-sie",
    label: "Fragen, was sie da liest.",
    lines: [
      "„‚Nicht vorgesehen‘. Christa Wolf.“ Sie hält es kurz hoch, ohne die Seite zu verlieren.",
      "„Es ist kein dickes Buch. Es fühlt sich nur dick an, wenn man in einer Behörde arbeitet.“",
    ],
    follow: [
      {
        id: "worum",
        label: "Fragen, worum es geht.",
        lines: [
          "„Eine Frau soll einen Nachlass einstufen. Ein Toter, keine Angehörigen, eine Kiste mit vierzig Tagebuchheften.“",
          "„Das Formblatt hat drei Felder: verwertbar, zuzustellen, zu vernichten. Ein viertes ist nicht vorgesehen. Daher der Titel.“",
        ],
        follow: [
          {
            id: "und-dann",
            label: "Fragen, was sie dann tut.",
            lines: [
              "„Das sage ich Ihnen nicht. Es wäre unhöflich, Ihnen das Ende zu erzählen, bevor Sie den Anfang haben.“",
              "„Nur so viel: Sie liest. Das ist im ganzen Buch die einzige Handlung, die niemand angeordnet hat.“",
            ],
          },
          {
            id: "lohnt",
            label: "Fragen, ob es sich lohnt.",
            lines: [
              "„Kommt darauf an, ob Sie es aushalten, dass ein Buch Ihnen recht gibt, ohne Sie zu trösten.“",
              "„E71, erster Stock. Es ist ausleihbar. Sagen Sie, Sie hätten es aus dem Bestand — nicht von mir.“",
            ],
          },
        ],
      },
      {
        id: "ruth-wer",
        label: "Fragen, wer Ruth ist.",
        lines: [
          "„Die Frau, die einstuft. Zwanzig Dienstjahre, ordentlich, unauffällig. Sie sagt einmal, es beruhige sie, dass jedes Leben in eines der drei Felder passt.“",
          "„Und dann bekommt sie eine Kiste, die nicht passt.“",
        ],
      },
    ],
  },
  ...GEMEINSAM,
];

/** Zustand 2: kurz reingelesen (unter 20 Sekunden). */
const TOPICS_PEEK: BusTopic[] = [
  {
    id: "kurz-reingelesen",
    label: "„Ich habe mal kurz reingelesen, aber es hat mich nicht so gepackt.“",
    lines: [
      "Sie legt den Finger zwischen die Seiten und sieht auf. „Ja. Das höre ich öfter.“",
      "„Es packt einen auch nicht. Es wartet. Die ersten Seiten sind absichtlich so langweilig wie ein Dienstvermerk — weil Ruths Tage so sind. Wenn man da aussteigt, hat das Buch gewonnen und man selbst nichts.“",
    ],
    follow: [
      {
        id: "ab-wann",
        label: "Fragen, ab wann es besser wird.",
        lines: [
          "„Beim dritten Kapitel. Da erinnert sie sich, dass sie selbst einmal ein Heft geführt hat. Sieben Monate lang. Sie weiß nicht mehr, warum sie aufgehört hat.“",
          "„Das ist der Satz, an dem man entweder weiterliest oder für immer aufhört.“",
        ],
        follow: [
          {
            id: "warum-aufgehoert",
            label: "Fragen, warum sie aufgehört hat.",
            lines: [
              "„Es steht nicht da. Das ist die Zumutung. Man muss es sich selbst beantworten, und man antwortet dann über sich.“",
            ],
          },
        ],
      },
      {
        id: "langweilig",
        label: "Zugeben, dass es langweilig wirkte.",
        lines: [
          "„Es ist langweilig. So wie ein Flur langweilig ist, durch den man zwanzig Jahre geht.“",
          "„Ich bin nicht beleidigt. Ich bin nur ungeduldig mit Leuten, die Bücher wie Bescheide behandeln: eine Seite, Kenntnisnahme, weglegen.“",
        ],
        follow: [
          {
            id: "geduld",
            label: "Fragen, ob sie immer so geduldig liest.",
            lines: [
              "„Ich fahre vierzig Minuten hin und vierzig zurück. Geduld ist bei mir keine Tugend, sondern Fahrplan.“",
            ],
          },
        ],
      },
      {
        id: "nochmal-versuchen",
        label: "Fragen, wo er wieder einsteigen soll.",
        lines: [
          "„Nicht am Anfang. Fangen Sie beim Sonntagskapitel an und lesen Sie von dort. Wenn es Sie dann nicht hält, lassen Sie es. Es ergeht Ihnen deshalb nichts.“",
        ],
      },
    ],
  },
  ...GEMEINSAM,
];

/** Zustand 3: wirklich gelesen (20 Sekunden oder länger). */
const TOPICS_READ: BusTopic[] = [
  {
    id: "kenne-ich",
    label: "„Ja, ich kenne den Roman. Es geht um Ruth …“",
    lines: [
      "Sie klappt das Buch auf den Daumen und sieht ihn zum ersten Mal richtig an. „Sie kennen Ruth.“",
      "„Entschuldigen Sie. Ich rede sonst mit niemandem darüber. Bei uns in der Stelle würde man sagen: interessantes Buch — und dann vom Brennstoff reden.“",
    ],
    follow: [
      {
        id: "viertes-feld",
        label: "Über das vierte Feld reden.",
        lines: [
          "„Es gibt keins. Und trotzdem ist das ganze Buch der Versuch, eines zu finden, ohne es zu beantragen.“",
          "„Ich habe das bei uns nachgesehen. Unser Blatt hat vier Felder. Das vierte heißt ‚Sonstiges‘ und ist seit Jahren gesperrt. Ich weiß nicht, ob das lustig oder traurig ist.“",
        ],
        follow: [
          {
            id: "gesperrt",
            label: "Fragen, warum es gesperrt ist.",
            lines: [
              "„Es ergeht dazu keine Auskunft. Wörtlich. Ich habe gefragt, es kam ein Vermerk zurück: keine Auskunft, kein Vorgang.“",
              "„Seitdem denke ich bei jedem Blatt: Wo ist hier die Kiste, die nicht passt?“",
            ],
          },
        ],
      },
      {
        id: "weyer-ich",
        label: "Über Weyers vierzig Hefte reden.",
        lines: [
          "„Was mich erschreckt hat, war nicht die Behörde. Behörden kenne ich. Es war, dass er vierzig Jahre lang ‚ich‘ geschrieben hat.“",
          "„Ich habe das nachgezählt, ehrlich, auf zwei Seiten: elfmal ‚ich‘. Ich schaffe in einem ganzen Arbeitstag keines.“",
        ],
        follow: [
          {
            id: "gewoehnung",
            label: "Den Satz über die Gewöhnung ansprechen.",
            lines: [
              "„‚Ich fürchte, dass ich mich daran gewöhnen werde. Nicht an die Verwaltung. An das Schweigen darüber, dass ich mich daran gewöhne.‘“",
              "„Der steht auf Seite neun und danach nie wieder. Vierzig Jahre lang nie wieder. Das ist die eigentliche Handlung des Buches.“",
            ],
            follow: [
              {
                id: "selbst",
                label: "Fragen, ob sie sich darin wiedererkennt.",
                lines: [
                  "„Ich sage ‚es ist ein trauriger Tag‘ statt ‚ich bin traurig‘. Ruth sagt das auch, im dritten Kapitel.",
                  "Als ich das gelesen habe, bin ich eine Haltestelle zu weit gefahren.“",
                ],
              },
            ],
          },
          {
            id: "brendel",
            label: "Über Brendels „sauberen Fall“ reden.",
            lines: [
              "„‚Der hat nie Ärger gemacht.‘ Als Kompliment für einen Toten. Bei uns sagt man das über Wohnungen.“",
            ],
          },
        ],
      },
      {
        id: "ende",
        label: "Über den Schluss reden.",
        lines: [
          "„Das leere Heft auf dem Tisch. Sie schreibt nichts. Sie lässt nur die Seite offen.“",
          "„Beim ersten Lesen fand ich das feige. Jetzt finde ich, es ist das Einzige, was in diesem Leben nicht angeordnet war.“",
        ],
        follow: [
          {
            id: "was-danach",
            label: "Fragen, was Ruth am nächsten Tag tut.",
            lines: [
              "„Sie geht arbeiten. Natürlich geht sie arbeiten. Aber das Heft liegt offen, und das Haus atmet wieder ein bisschen, wie der Alte sagen würde.“",
            ],
          },
          {
            id: "warum-zweimal",
            label: "Fragen, warum sie es zweimal liest.",
            lines: [
              "„Weil ich achtundzwanzig bin und Ruth zweiundvierzig war, als sie aufgehört hat, ‚ich‘ zu sagen.“",
              "„Ich habe also noch vierzehn Jahre. Ich lese das Buch, damit ich mich später erinnere, dass ich gewarnt war.“",
            ],
          },
        ],
      },
      ...GEMEINSAM,
    ],
  },
];

export const BUS_READER_TOPICS: Record<BookReadState, BusTopic[]> = {
  none: TOPICS_NONE,
  peek: TOPICS_PEEK,
  read: TOPICS_READ,
};

export const BUS_READER_GREETING: Record<BookReadState, string> = {
  none: "Sie blickt kurz hoch. „Der Bus ist heute leer. Sie dürfen sich gern hinsetzen, ich lese nur.“",
  peek: "Sie blickt kurz hoch. „Setzen Sie sich. Ich bin bei den Sonntagen, das dauert.“",
  read: "Sie blickt kurz hoch — und dann noch einmal, als sie sieht, dass er auf das Buch schaut. „Sie kennen das?“",
};

export const BUS_READER: BusPassenger = {
  id: "ilka",
  name: "Ilka Verhoeven",
  kicker: "Zuteilungsstelle, Quadrant 12 · liest",
  sprite: "reader",
  greeting: BUS_READER_GREETING.none,
  farewell: ABSCHIED,
  topics: TOPICS_NONE,
};
