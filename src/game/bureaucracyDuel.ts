/**
 * Daten für das „Bürokratie-Duell" (Akt I, Kantine 3602).
 *
 * Adaption des Monkey-Island-Schwertkampfs in Verwaltungs-Floskeln:
 * Brust eröffnet jede Runde mit einer paragraphengestützten Behauptung,
 * Layard wählt aus vier Floskeln die passende Konter-Antwort. Drei
 * Treffer hintereinander → Brust kapituliert → Layard bekommt die B3-Ration
 * direkt aus Brusts Hand (alternativer Lösungsweg, gleichberechtigt zur
 * Trockensiegel-/Quittungs-Fälschung und zum Kowalk-Pfad).
 *
 * Alle Strings hier sind ganze Sätze in einem Daten-Modul — i18n-konform,
 * keine String-Konkatenation, keine JSX-Schnipsel.
 */

export interface DuelCounter {
  text: string;
  correct: boolean;
  source?: "handbook" | "helka" | "brustSmalltalk" | "logic";
}

export interface DuelRound {
  id: string;
  brustOpening: string;
  counters: DuelCounter[];
  brustOnHit: string;
  brustOnMiss: string;
  kowalkAside?: string;
}

export const DUEL_ROUNDS: DuelRound[] = [
  {
    id: "uebersagt",
    brustOpening:
      "Aushang sieben Punkt eins ist von 1991. Aushang vier Punkt zwei ist von 1996. Der jüngere übersagt. Das ist Hausordnung.",
    counters: [
      {
        text:
          "Übersagt ist nicht widerrufen, Herr Brust. Ohne ausdrücklichen Widerruf gilt der ältere Aushang fort, soweit er nicht im Wortlaut aufgehoben wurde.",
        correct: true,
      },
      { text: "Dann ist sieben Punkt eins eben Geschichte. Akzeptiert.", correct: false },
      { text: "Ich verlange eine schriftliche Stellungnahme der Leitstelle.", correct: false },
      { text: "Aushänge gelten überhaupt nicht. Das hat mir jemand gesagt.", correct: false },
    ],
    brustOnHit:
      "Das … Punkt sieben Eins ist tatsächlich nie ausdrücklich widerrufen worden. Das ist korrekt.",
    brustOnMiss:
      "Bewohner Worag, Sie verkennen die Lage. Bitte bleiben Sie sachlich.",
    kowalkAside: "Übersagt ist nicht widerrufen. Hat sie schön gesagt.",
  },
];

export const DUEL_UI_TEXT = {
  overlayTitle: "Bürokratie-Duell · Tresen Schicht B",
  overlaySubtitle:
    "Drei Treffer in Folge — und Brust gibt nach. Drei Fehlversuche — und der Tresen ist heute geschlossen.",
  hitsLabel: "Treffer",
  missesLabel: "Fehler",
  roundLabel: "Runde",
  prompt: "Ihre Erwiderung:",
  brustMood: {
    composed: "Brust steht sehr gerade. Hände auf dem Tresen.",
    sweating: "Brust hat begonnen zu schwitzen. Sein linker Mundwinkel zuckt.",
    crumbling:
      "Brust schaut nicht mehr auf. Er wischt mit dem Handrücken über die Stirn.",
    triumphant:
      "Brust hat sich aufgerichtet. Er hat heute schon einmal gewonnen — er weiß, wie das geht.",
  },
  victoryLines: [
    "Brust legt die Vollmacht sehr sorgfältig auf den Tresen. Glättet sie.",
    "„Bewohner Worag. Ihre Argumentation ist … in sich schlüssig. Ich gebe die Ration aus.“",
    "Er bückt sich, holt eine grau-amber lackierte Dose hervor und schiebt sie über den Tresen.",
    "Im Hintergrund Kowalk, halblaut: „Den habe ich heute zum ersten Mal überzeugt sehen, Worag. Glückwunsch.“",
    "[ B3-Ration eingesteckt. ]",
  ],
  victoryHeadline: "Brust kapituliert.",
  victoryAccept: "[ Ration annehmen ]",
  defeatLines: [
    "Brust hebt langsam den Kopf. Seine Mimik wird wieder steif.",
    "„Bewohner Worag. Ich verstehe Ihr Anliegen, aber Ihre Argumentation trägt nicht.“",
    "„Bitte verlassen Sie die Ausgabezone. Sie können es zu einem späteren Zeitpunkt erneut versuchen.“",
    "Kowalk schaut zur Seite. Sie sagt nichts. Heute nicht.",
  ],
  defeatHeadline: "Brust schließt die Ausgabezone.",
  defeatAccept: "[ Tresen verlassen ]",
  abortLabel: "[ Zurücktreten ]",
  abortLines: [
    "Layard tritt einen halben Schritt vom Tresen zurück.",
    "Brust nickt knapp. „Wenn Sie wieder bereit sind, Bewohner Worag.“",
  ],
};

export function pickDuelRounds(): DuelRound[] {
  const pool = [...DUEL_ROUNDS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const picked = pool.slice(0, Math.min(3, pool.length));
  return picked.map((round) => ({ ...round, counters: shuffle(round.counters) }));
}

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}