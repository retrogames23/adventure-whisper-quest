/**
 * Fortlaufender Ehestreit des Paares Ritter auf Linie 28.
 *
 * Aufbau analog zu `cafeteriaChatter.ts`: Themen mit abwechselnden Zeilen,
 * die als Sprechblasen über den beiden Sitzplätzen erscheinen, solange
 * Layard nicht mit ihnen spricht.
 */

export type BusCoupleSpeaker = "sie" | "er";

export interface BusCoupleLine {
  npc: BusCoupleSpeaker;
  text: string;
}

export interface BusCoupleTopic {
  id: string;
  lines: BusCoupleLine[];
}

export const BUS_COUPLE_LABEL: Record<BusCoupleSpeaker, string> = {
  sie: "Frau Ritter",
  er: "Herr Ritter",
};

export const BUS_COUPLE_TOPICS: ReadonlyArray<BusCoupleTopic> = [
  {
    id: "eier",
    lines: [
      { npc: "er", text: "Braune Eier sind braun, weil die Hühner braun sind. Das ist bekannt." },
      { npc: "sie", text: "Dann wären schwarze Hühner ein Problem, Manfred." },
      { npc: "er", text: "Schwarze Hühner legen dunkelbraune Eier. Sehr dunkelbraun." },
      { npc: "sie", text: "Das hast du dir eben ausgedacht." },
      { npc: "er", text: "Ich habe es abgeleitet." },
      { npc: "sie", text: "Ableiten ist nicht wissen. Ableiten ist Raten mit ernstem Gesicht." },
    ],
  },
  {
    id: "fahrschein",
    lines: [
      { npc: "sie", text: "Hast du gelocht?" },
      { npc: "er", text: "Ich habe gelocht." },
      { npc: "sie", text: "Ich sehe kein Loch." },
      { npc: "er", text: "Das Loch ist auf der Rückseite." },
      { npc: "sie", text: "Ein Loch geht durch, Manfred. Ein Loch hat keine Rückseite." },
      { npc: "er", text: "Dann war es kein Loch, sondern ein Abdruck. In Regel ist das ausreichend." },
    ],
  },
  {
    id: "suppe",
    lines: [
      { npc: "er", text: "Du hast die Suppe nochmal gekocht." },
      { npc: "sie", text: "Ich habe sie aufgewärmt." },
      { npc: "er", text: "Sie hat gekocht. Ich habe es gehört." },
      { npc: "sie", text: "Du hast den Wasserkocher gehört." },
      { npc: "er", text: "Ich kenne den Unterschied zwischen unserem Wasserkocher und unserer Suppe." },
      { npc: "sie", text: "Das wäre das Erste." },
    ],
  },
  {
    id: "beleg",
    lines: [
      { npc: "sie", text: "Wo ist der Beleg von der Wohnungsbegehung?" },
      { npc: "er", text: "Bei dir. Du hast ihn genommen, weil du die Tasche hattest." },
      { npc: "sie", text: "Ich hatte die Tasche, weil du den Beleg hattest." },
      { npc: "er", text: "Das ergibt keinen Zusammenhang." },
      { npc: "sie", text: "Es ergibt genau denselben Zusammenhang wie deiner, nur andersherum." },
      { npc: "er", text: "Wir stellen eine Zweitausfertigung. Das ließe sich prüfen." },
    ],
  },
  {
    id: "bus",
    lines: [
      { npc: "er", text: "Früher war die 28 schneller." },
      { npc: "sie", text: "Früher warst du schneller." },
      { npc: "er", text: "Ich bin gleich schnell geblieben." },
      { npc: "sie", text: "Du bist gleich langsam geblieben, das stimmt." },
    ],
  },
  {
    id: "fenster",
    lines: [
      { npc: "sie", text: "Es zieht." },
      { npc: "er", text: "Das Fenster ist zu." },
      { npc: "sie", text: "Dann zieht es durch das geschlossene Fenster." },
      { npc: "er", text: "Das ist bautechnisch nicht vorgesehen." },
      { npc: "sie", text: "Sag das meinem Nacken." },
    ],
  },
  {
    id: "brot",
    lines: [
      { npc: "er", text: "Du schneidest das Brot immer schief." },
      { npc: "sie", text: "Das Brot ist schief." },
      { npc: "er", text: "Brot ist nie schief. Brot ist rund." },
      { npc: "sie", text: "Und rund geschnitten wäre dir lieber, ja?" },
      { npc: "er", text: "Gerade. Gerade wäre mir lieber." },
    ],
  },
  {
    id: "uhr",
    lines: [
      { npc: "sie", text: "Deine Uhr geht vier Minuten vor." },
      { npc: "er", text: "Absichtlich." },
      { npc: "sie", text: "Und du rechnest die vier Minuten jedes Mal wieder ab." },
      { npc: "er", text: "Natürlich. Sonst wäre ich ja zu früh." },
      { npc: "sie", text: "Manfred, das ist eine sehr aufwendige Art, die richtige Uhrzeit zu haben." },
    ],
  },
  {
    id: "kaffee",
    lines: [
      { npc: "er", text: "Der Kaffee heute Morgen war dünn." },
      { npc: "sie", text: "Der Kaffee heute Morgen war Ersatz." },
      { npc: "er", text: "Ersatz kann auch stark sein." },
      { npc: "sie", text: "Ersatz kann auch heiß sein. Mehr ist nicht vorgesehen." },
    ],
  },
  {
    id: "nachbarn",
    lines: [
      { npc: "sie", text: "Die Bienerts haben schon wieder eine Eingabe geschrieben." },
      { npc: "er", text: "Weil man Eingaben schreiben darf." },
      { npc: "sie", text: "Man darf auch schweigen." },
      { npc: "er", text: "Schweigen wird nicht bearbeitet." },
      { npc: "sie", text: "Eingaben auch nicht, Manfred." },
    ],
  },
  {
    id: "mantel",
    lines: [
      { npc: "er", text: "Der Mantel steht dir." },
      { npc: "sie", text: "Jetzt fängst du an." },
      { npc: "er", text: "Das war ein Kompliment." },
      { npc: "sie", text: "Nach zwölf Minuten Streit ist ein Kompliment eine Kapitulation." },
      { npc: "er", text: "Dann kapituliere ich eben. Aber die Eier sind trotzdem wegen der Hühner braun." },
    ],
  },
];
