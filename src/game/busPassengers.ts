import p1 from "@/assets/bus/passenger-1.png";
import p2 from "@/assets/bus/passenger-2.png";
import p3 from "@/assets/bus/passenger-3.png";
import p4 from "@/assets/bus/passenger-4.png";

/**
 * Fahrgäste der Linie 28.
 *
 * Pro Fahrt werden zufällig 1–5 Personen aus diesem Pool gezogen und
 * zufällig auf die Sitzplätze verteilt. Kein Free-Chat: jede Person hat
 * 2–3 feste Themen (Smalltalk / Gerücht / Sektor 28 bzw. Mandatsgebiet).
 *
 * Lore-Regeln: Sektor 28 ist die Großeinheit, Quadranten sind Baugruppen,
 * E67/E71 sind Gebäude. Mandatsdeutsch sparsam einstreuen. Keine
 * Anspielungen auf das Schmerz-Radio.
 */

export type BusSpriteId = "elder" | "woman" | "youth" | "worker";

export const BUS_SPRITES: Record<BusSpriteId, string> = {
  elder: p1,
  woman: p2,
  youth: p3,
  worker: p4,
};

export interface BusTopic {
  id: string;
  /** Layards Gesprächsangebot (Menüzeile). */
  label: string;
  /** Antwort der Person, absatzweise. */
  lines: string[];
}

export interface BusPassenger {
  id: string;
  name: string;
  /** Kurzbeschreibung für die Kopfzeile des Gesprächsfensters. */
  kicker: string;
  sprite: BusSpriteId;
  /** Erste Zeile beim Ansprechen. */
  greeting: string;
  /** Abschluss, wenn alle Themen abgefragt sind. */
  farewell: string;
  topics: BusTopic[];
}

export const BUS_PASSENGERS: BusPassenger[] = [
  {
    id: "gerda",
    name: "Gerda Pahlke",
    kicker: "Rentnerin, Quadrant 67, Block B",
    sprite: "elder",
    greeting: "„Setzen Sie sich ruhig. Der Bus wird nicht schneller, wenn man steht.“",
    farewell: "„Mehr weiß ich auch nicht. Und was ich weiß, hab ich schon gesagt.“",
    topics: [
      {
        id: "wetter",
        label: "Über das Wetter reden.",
        lines: [
          "„Feucht. Immer feucht. Bei uns im Block B haben sie die Fenster verordnungsgemäß dichtgemacht, jetzt schwitzt die Wand.“",
          "„Ich hab eine Eingabe geschrieben. Antwort kam: Wahrnehmungsschwankung. Also gut, dann schwitze ich eben falsch.“",
        ],
      },
      {
        id: "geruecht",
        label: "Ob es Neuigkeiten gibt.",
        lines: [
          "„Die Zählung. Alle reden von der Zählung. Angeblich kommt eine Bestandsaufnahme durch Sektor 28, Haus für Haus.“",
          "„Meine Nachbarin sagt, die schauen nicht in die Wohnungen, sondern in die Akten. Das ist schlimmer. In den Akten kann man sich nicht aufräumen.“",
        ],
      },
      {
        id: "frueher",
        label: "Nach früher fragen.",
        lines: [
          "„Früher fuhr die 28 alle zehn Minuten. Heute alle vierzig, dafür heißt sie jetzt Grundtaktleistung.“",
        ],
      },
    ],
  },
  {
    id: "hanno",
    name: "Hanno Brück",
    kicker: "Instandhaltung, Bestandspflege Nord",
    sprite: "worker",
    greeting: "„Vorsicht, der Kasten steht im Gang. Ist schwerer als er aussieht.“",
    farewell: "„Ich muss gleich raus. Zwei Steigleitungen und ein Aufzug, der nur abwärts will.“",
    topics: [
      {
        id: "arbeit",
        label: "Fragen, wohin es geht.",
        lines: [
          "„Nordkette. Drei Häuser, alle mit derselben Meldung: Es tropft, aber vorschriftsmäßig.“",
          "„Wir dürfen nichts austauschen, nur instand halten. Der Unterschied ist ein Formular breit.“",
        ],
      },
      {
        id: "e67",
        label: "Über E67 sprechen.",
        lines: [
          "„E67? Erhöhter Instandhaltungsbedarf, steht so im Bestand. Heißt: Wir kommen, wenn was raucht.“",
          "„Die Leitstelle dort telefoniert übrigens über den eigenen Knoten. Praktisch, solange keiner umschaltet.“",
        ],
      },
    ],
  },
  {
    id: "ilva",
    name: "Ilva Kertesz",
    kicker: "Sachbearbeiterin, Vorlagenprüfung",
    sprite: "woman",
    greeting: "„Einen Moment, ich sortiere nur. Sonst liegt die 7 vor der 4, und dann geht das von vorne los.“",
    farewell: "„Ich muss die Mappe vor der Haltestelle fertig haben. Sonst prüfe ich morgen dasselbe zweimal.“",
    topics: [
      {
        id: "vorlagen",
        label: "Fragen, was sie prüft.",
        lines: [
          "„Vorlagen. Wer wo hindarf, mit welchem Blatt. Neunzig Prozent sind richtig ausgefüllt und trotzdem unzulässig.“",
          "„Das liegt am Vorgang, nicht an den Leuten. Der Vorgang mag es, wenn er dreimal läuft.“",
        ],
      },
      {
        id: "zentrale",
        label: "Nach der Zentralverwaltungsstelle fragen.",
        lines: [
          "„Weit im Norden, hinter der Grünbrache. Von hier zwei Kilometer und ein bisschen Geduld.“",
          "„Gehen Sie nicht vor elf. Vor elf nehmen die nur Eigenes an.“",
        ],
      },
      {
        id: "sprache",
        label: "Auf ihr Amtsdeutsch ansprechen.",
        lines: [
          "„Mandatsdeutsch, bitte. Es klingt kalt, aber es ist eindeutig. Eindeutig ist freundlich, nur merkt das keiner.“",
        ],
      },
    ],
  },
  {
    id: "tibor",
    name: "Tibor Lang",
    kicker: "Lehrling, Versorgungswerk",
    sprite: "youth",
    greeting: "„Ist der Platz frei? Ist eh alles frei um diese Zeit.“",
    farewell: "„Ich hör wieder Musik. Nichts für ungut.“",
    topics: [
      {
        id: "job",
        label: "Fragen, was er lernt.",
        lines: [
          "„Versorgung. Rohre, Druck, Protokolle. Vor allem Protokolle.“",
          "„Mein Meister sagt, wer den Druck versteht, versteht den Sektor. Ich glaub, er meint das nicht technisch.“",
        ],
      },
      {
        id: "geruecht",
        label: "Nach Gerüchten fragen.",
        lines: [
          "„Im Süden soll ein Haus komplett auf Sammelanschluss gelegt worden sein. Ein Apparat für vierzig Wohnungen.“",
          "„Angeblich freiwillig. Freiwillig heißt hier: Es stand im Aushang.“",
        ],
      },
    ],
  },
  {
    id: "roswitha",
    name: "Roswitha Dehn",
    kicker: "Hauswartin, Quadrant 71",
    sprite: "woman",
    greeting: "„Sie sind aus einem der Ergänzungsbauten, oder? Man sieht das am Schuhwerk.“",
    farewell: "„So. Jetzt kommt meine Haltestelle, und Sie wissen mehr als vorher.“",
    topics: [
      {
        id: "haus",
        label: "Über ihre Arbeit reden.",
        lines: [
          "„Vier Blöcke, ein Innenhof, zwei Bänke. Auf den Bänken sitzt niemand, weil sie im Zug stehen.“",
          "„Block D ist seit dem Rohrbruch nur unten bewohnt. Oben steht das Wasser in den Akten, nicht mehr im Haus.“",
        ],
      },
      {
        id: "hygiene",
        label: "Über Resonanz-Hygiene sprechen.",
        lines: [
          "„Ich hänge die Merkblätter auf, wie es verlangt ist. Lüften, Abstand von den Steigleitungen, nichts stapeln.“",
          "„Ob es hilft? Es beruhigt. Das ist auch etwas.“",
        ],
      },
    ],
  },
  {
    id: "matthes",
    name: "Matthes Ovid",
    kicker: "Registerhilfe, Zentralbestand",
    sprite: "elder",
    greeting: "„Ich fahre diese Strecke seit neunzehn Jahren. Ich könnte die Schlaglöcher benennen.“",
    farewell: "„Genug. Ich zähle sonst wieder mit.“",
    topics: [
      {
        id: "register",
        label: "Nach seiner Arbeit fragen.",
        lines: [
          "„Ich führe Bestand. Nicht Menschen — Bestand. Menschen tauchen darin auf, als Merkmal.“",
          "„Das klingt hart. Aber der Bestand ist ehrlicher als die Aushänge.“",
        ],
      },
      {
        id: "sektor",
        label: "Über Sektor 28 sprechen.",
        lines: [
          "„28 ist ein Randsektor. Wir bekommen die Vorschriften spät und die Reparaturen später.“",
          "„Dafür bemerkt uns auch niemand. Es hat beides.“",
        ],
      },
      {
        id: "geruecht",
        label: "Nach Gerüchten fragen.",
        lines: [
          "„Es heißt, im Bestand tauchen Wohnungen doppelt auf. Einmal belegt, einmal geräumt. Dieselbe Nummer.“",
          "„Wahrscheinlich ein Übertragungsfehler. Wahrscheinlich.“",
        ],
      },
    ],
  },
  {
    id: "juna",
    name: "Juna Petrak",
    kicker: "Küchenkraft, Kantine 3602",
    sprite: "woman",
    greeting: "„Riechen Sie das? Das bin ich. Kohl hält sich drei Buslinien lang.“",
    farewell: "„Ich muss noch Töpfe wiegen. Wiegen, nicht kochen. Fragen Sie nicht.“",
    topics: [
      {
        id: "kantine",
        label: "Über die Kantine reden.",
        lines: [
          "„Zwei Ausgaben, eine Verordnung, dreiundvierzig Absätze. Der längste Absatz regelt den Löffel.“",
          "„Wer nach halb eins kommt, bekommt Restbestandsverwertung. Schmeckt wie es heißt.“",
        ],
      },
      {
        id: "leute",
        label: "Nach den Leuten fragen.",
        lines: [
          "„Die aus E67 essen leise, die aus E71 reden dazwischen. Verwaltung isst allein und schnell.“",
        ],
      },
    ],
  },
  {
    id: "eberhardt",
    name: "Eberhardt Simm",
    kicker: "Rentner, ehemals Fernmeldedienst",
    sprite: "elder",
    greeting: "„Sie halten sich an der Stange fest wie einer, der selten fährt.“",
    farewell: "„Reden macht müde. Zuhören auch. Gute Fahrt.“",
    topics: [
      {
        id: "fernmelde",
        label: "Nach seinem Beruf fragen.",
        lines: [
          "„Vierzig Jahre Leitungen. Kupfer, Klemmen, Handvermittlung. Ich weiß, wie ein Sektor klingt, wenn er still ist.“",
          "„Heute ist er nicht still. Er ist leise. Das ist ein Unterschied.“",
        ],
      },
      {
        id: "umschaltung",
        label: "Über Anschlüsse sprechen.",
        lines: [
          "„Wenn ein Apparat tot ist, ist selten der Apparat schuld. Meistens hat jemand einen Knoten umgeklemmt.“",
          "„Und wer umklemmt, trägt es ein. Irgendwo steht das immer.“",
        ],
      },
    ],
  },
  {
    id: "carlo",
    name: "Carlo Winnig",
    kicker: "Aushilfsfahrer, Lieferdienst",
    sprite: "worker",
    greeting: "„Ich fahre sonst selbst. Als Fahrgast bin ich schlecht.“",
    farewell: "„So, Feierabendrichtung. Machen Sie's gut.“",
    topics: [
      {
        id: "strecke",
        label: "Nach der Strecke fragen.",
        lines: [
          "„Die 28 nimmt den Umweg über die Magistrale, weil die Abkürzung offiziell nicht befahrbar ist.“",
          "„Sie ist befahrbar. Sie ist nur nicht eingetragen.“",
        ],
      },
      {
        id: "ware",
        label: "Fragen, was er ausfährt.",
        lines: [
          "„Bewirtschaftetes Gut. Klingt gut, ist Mehl, Seife, Klebeband.“",
          "„Und Formulare. Formulare fahre ich am meisten.“",
        ],
      },
    ],
  },
  {
    id: "sanne",
    name: "Sanne Ruhl",
    kicker: "Schülerin, Bildungsstelle Süd",
    sprite: "woman",
    greeting: "„Wenn Sie fragen, ob ich schwänze: Der Unterricht ist ausgefallen. Verordnungsgemäß.“",
    farewell: "„Ich muss lernen. Angeblich.“",
    topics: [
      {
        id: "schule",
        label: "Über die Schule reden.",
        lines: [
          "„Wir haben ein neues Fach: Ordnungskunde. Man lernt, welches Blatt zu welchem Schalter gehört.“",
          "„Geschichte fällt dafür aus. Passt ja: Geschichte ist auch nur ein Blatt, das keiner mehr annimmt.“",
        ],
      },
      {
        id: "geruecht",
        label: "Nach Gerüchten fragen.",
        lines: [
          "„In E71 soll es eine Bibliothek geben, die Bücher rausgibt, die gar nicht geführt werden.“",
          "„Ich glaub das nicht. Aber ich würde gern hin.“",
        ],
      },
    ],
  },
  {
    id: "orwin",
    name: "Orwin Talbach",
    kicker: "Aufsicht, Grünbrache Nord",
    sprite: "elder",
    greeting: "„Sitzen Sie ruhig gegenüber. Ich schaue sowieso raus.“",
    farewell: "„Da vorne fängt mein Abschnitt an. Ich zähle jetzt Zäune.“",
    topics: [
      {
        id: "brache",
        label: "Über die Grünbrache fragen.",
        lines: [
          "„Zwischen den Wohngürteln liegt sie, breit wie zwei Quadranten. Offiziell Erholungsfläche.“",
          "„Es erholt sich dort nur das Gras. Und im Winter nicht mal das.“",
        ],
      },
      {
        id: "wege",
        label: "Nach Abkürzungen fragen.",
        lines: [
          "„Trampelpfade gibt es, quer durch. Wer sie nimmt, spart zwanzig Minuten und riskiert eine Vorlage.“",
        ],
      },
    ],
  },
  {
    id: "lisbeth",
    name: "Lisbeth Vahl",
    kicker: "Näherin, Heimarbeit",
    sprite: "woman",
    greeting: "„Nicht wundern, ich zähle Stiche. Man verlernt es sonst.“",
    farewell: "„Jetzt hab ich mich verzählt. Sehen Sie? Reden kostet.“",
    topics: [
      {
        id: "arbeit",
        label: "Nach ihrer Arbeit fragen.",
        lines: [
          "„Heimarbeit. Sie liefern Stoff, ich liefere Stück. Der Weg dazwischen ist meine Miete.“",
        ],
      },
      {
        id: "sektor",
        label: "Über Sektor 28 sprechen.",
        lines: [
          "„Früher hieß das hier alles anders. Dann kam die Neuordnung und alles bekam Zahlen.“",
          "„Zahlen streiten nicht. Das ist der ganze Trick.“",
        ],
      },
      {
        id: "geruecht",
        label: "Nach Gerüchten fragen.",
        lines: [
          "„Man hört, in einem der Ergänzungsbauten prüfen sie neue Meldewege. Ohne Ankündigung.“",
        ],
      },
    ],
  },
  {
    id: "bruno",
    name: "Bruno Kessler",
    kicker: "Heizer, Fernwärmewerk",
    sprite: "worker",
    greeting: "„Fassen Sie die Stange oben an. Unten ist sie kalt, das ist unangenehm.“",
    farewell: "„Schicht. Man merkt es an den Händen, bevor man es an der Uhr sieht.“",
    topics: [
      {
        id: "waerme",
        label: "Über die Fernwärme reden.",
        lines: [
          "„Wir versorgen die Quadranten und die Ergänzungsbauten. Ein Kreis, viele Häuser, ein Druck.“",
          "„Wenn irgendwo einer am Regler dreht, merken wir das drei Kilometer weiter. Und wir schreiben es auf.“",
        ],
      },
      {
        id: "brummen",
        label: "Nach dem Brummen fragen.",
        lines: [
          "„Das Brummen? Bei Ostwind bis in die Korridore. Eingaben dazu laufen unter Wahrnehmungsschwankung.“",
          "„Ich hör es auch. Ich schreib nur keine Eingabe mehr.“",
        ],
      },
    ],
  },
  {
    id: "annel",
    name: "Annel Sprott",
    kicker: "Postverteilung, Sektorzustellung",
    sprite: "woman",
    greeting: "„Wenn Sie auf ein Schreiben warten: Ich hab es nicht dabei.“",
    farewell: "„Meine Tasche wartet nicht. Bis dann.“",
    topics: [
      {
        id: "post",
        label: "Über die Zustellung reden.",
        lines: [
          "„Rohrpost innerhalb der Häuser, Bote zwischen den Quadranten. Dazwischen liegt die Wartezeit.“",
          "„Amtliches geht zuerst. Amtliches geht immer zuerst.“",
        ],
      },
      {
        id: "faecher",
        label: "Nach Postfächern fragen.",
        lines: [
          "„Wer kein eigenes Fach hat, bekommt es an den Knoten seines Hauses zugestellt. Steht so in der Zustellordnung.“",
        ],
      },
    ],
  },
  {
    id: "veit",
    name: "Veit Ohlwein",
    kicker: "Antragsteller, ohne festen Vorgang",
    sprite: "elder",
    greeting: "„Sie sehen aus wie jemand, der weiß, welcher Schalter offen hat.“",
    farewell: "„Egal. Ich fahre einfach mit bis zur Endstelle und wieder zurück.“",
    topics: [
      {
        id: "antrag",
        label: "Fragen, worum es geht.",
        lines: [
          "„Wohnungswechsel. Seit vierzehn Monaten. Der Vorgang ist vollständig, nur nicht zuständig.“",
          "„Sie schicken mich von Norden nach Süden und zurück. Ich kenne die Linie 28 auswendig.“",
        ],
      },
      {
        id: "rat",
        label: "Um einen Rat bitten.",
        lines: [
          "„Nehmen Sie nie das letzte Blatt aus der Hand. Solange Sie es halten, sind Sie im Vorgang.“",
        ],
      },
    ],
  },
  {
    id: "mirko",
    name: "Mirko Zant",
    kicker: "Wachdienst, Objektschutz",
    sprite: "worker",
    greeting: "„Ausweis brauch ich nicht. Ich hab Feierabend.“",
    farewell: "„Und jetzt schlafe ich im Sitzen. Kann ich gut.“",
    topics: [
      {
        id: "dienst",
        label: "Über seinen Dienst reden.",
        lines: [
          "„Nachts an einem Tor, an dem nichts passiert. Das Schwierige ist, wach zu bleiben, nicht mutig.“",
        ],
      },
      {
        id: "zentrale",
        label: "Über die Zentralverwaltungsstelle sprechen.",
        lines: [
          "„Da kommen Sie ohne Vorlage nicht mal in den Vorraum. Der Vorraum hat einen eigenen Vorraum.“",
          "„Und lächeln Sie nicht am Tresen. Das kommt merkwürdig.“",
        ],
      },
    ],
  },
  {
    id: "hedda",
    name: "Hedda Nolt",
    kicker: "Bibliothekshilfe, Bestand Süd",
    sprite: "woman",
    greeting: "„Vorsicht, die Mappe ist offen. Wenn das fliegt, sortiere ich bis morgen.“",
    farewell: "„Ich muss die Karten noch ordnen. Nach Nummer, nicht nach Sinn.“",
    topics: [
      {
        id: "buecher",
        label: "Über Bücher reden.",
        lines: [
          "„Wir führen nur geprüfte Titel. Was nicht geführt ist, ist nicht verboten — es ist nicht vorhanden.“",
          "„Der Unterschied ist bequem. Für uns.“",
        ],
      },
      {
        id: "geruecht",
        label: "Nach Gerüchten fragen.",
        lines: [
          "„Es gibt Häuser mit eigenen Regalen im Flur. Bewohnerbestand nennen sie das. Geduldet, solange keiner fragt.“",
        ],
      },
    ],
  },
  {
    id: "pawel",
    name: "Pawel Strunk",
    kicker: "Monteur, Aufzugsdienst",
    sprite: "worker",
    greeting: "„Nicht wundern, ich rieche nach Fett. Das ist Aufzugsfett, das riecht anders als Küchenfett.“",
    farewell: "„Nächster Halt, nächster Schacht.“",
    topics: [
      {
        id: "aufzug",
        label: "Über Aufzüge reden.",
        lines: [
          "„In den Ergänzungsbauten hängen alte Anlagen. Sie fahren, aber sie erzählen dabei.“",
          "„Wenn einer im Schacht summt, ist es meistens die Bremse. Meistens.“",
        ],
      },
      {
        id: "etagen",
        label: "Nach gesperrten Etagen fragen.",
        lines: [
          "„Manche Etagen sind aus dem Tableau genommen. Nicht abgeklemmt — nur unbeschriftet.“",
          "„Wer die Zahl kennt, kommt trotzdem hin. Ich sag das nicht gern laut.“",
        ],
      },
    ],
  },
  {
    id: "traudel",
    name: "Traudel Barsch",
    kicker: "Kassiererin, Verkaufsstelle 12",
    sprite: "woman",
    greeting: "„Wenn Sie Wechselgeld brauchen: Ich hab keins. Berufskrankheit.“",
    farewell: "„So, ich sortiere jetzt Marken. Bis zur Haltestelle schaff ich das.“",
    topics: [
      {
        id: "laden",
        label: "Über den Laden reden.",
        lines: [
          "„Wir bekommen zugeteilt, nicht bestellt. Diese Woche viel Essig, wenig Mehl.“",
          "„Die Leute fragen mich, warum. Ich sag: Zuteilungsschwankung. Dann nicken sie.“",
        ],
      },
      {
        id: "sektor",
        label: "Über Sektor 28 sprechen.",
        lines: [
          "„Der Sektor ist groß und lahm. Aber er verschwindet nicht. Das schätzen die Leute mehr, als sie zugeben.“",
        ],
      },
    ],
  },
  {
    id: "rufus",
    name: "Rufus Denk",
    kicker: "Setzer, Druckerei Sektorblatt",
    sprite: "youth",
    greeting: "„Achtung, Finger. Frisch gedruckt färbt ab.“",
    farewell: "„Ich muss die Fahne noch lesen. Zweimal, sonst steht morgen Unsinn drin.“",
    topics: [
      {
        id: "blatt",
        label: "Über das Sektorblatt reden.",
        lines: [
          "„Vier Seiten. Eine Seite Bekanntmachungen, zwei Seiten Zahlen, eine Seite Wetter und Resonanz.“",
          "„Die Zahlen sind ehrlich. Nur die Überschriften nicht.“",
        ],
      },
      {
        id: "geruecht",
        label: "Nach Gerüchten fragen.",
        lines: [
          "„Diese Woche mussten wir eine Meldung dreimal umsetzen. Am Ende stand da nur noch: Vorgang läuft.“",
          "„Wenn eine Meldung schrumpft, ist etwas dran. So merkt man das.“",
        ],
      },
    ],
  },
];

export function pickBusPassengers(count: number): BusPassenger[] {
  const pool = [...BUS_PASSENGERS];
  const out: BusPassenger[] = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

export function getBusPassenger(id: string): BusPassenger | undefined {
  return BUS_PASSENGERS.find((p) => p.id === id);
}

/** Sitzplätze im Bus-Innenraum (Prozent des Hintergrundbildes). */
export const BUS_SEATS: { id: number; x: number; y: number; w: number; h: number; flip?: boolean }[] = [
  { id: 0, x: -2, y: 30, w: 29, h: 60 },
  { id: 1, x: 15, y: 32, w: 24, h: 54, flip: true },
  { id: 2, x: 41.5, y: 36, w: 17, h: 43 },
  { id: 3, x: 61, y: 32, w: 24, h: 54 },
  { id: 4, x: 73, y: 30, w: 29, h: 60, flip: true },
];
