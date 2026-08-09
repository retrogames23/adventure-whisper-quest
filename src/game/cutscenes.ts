/**
 * Zentrale Sammelstelle aller narrativen Klartext-Texte für Cutscenes
 * und das Ending. Hier liegen die Untertitel/Tafel-Texte als reine Daten,
 * damit sie später leicht in eine andere Sprache übersetzt werden können
 * (z. B. `cutscenes.de.ts` / `cutscenes.en.ts`), ohne die UI-Komponenten
 * anfassen zu müssen.
 *
 * IDs / Flags / Item-Schlüssel bleiben sprach-agnostisch und liegen
 * weiterhin in `types.ts` bzw. den Spielmodulen.
 */

// ─── Paramedics-Cutscene ────────────────────────────────────────────

export type ParamedicsSpeaker = "SANITÄTER" | "LAYARD" | "SYSTEM";

export interface ParamedicsLine {
  speaker: ParamedicsSpeaker;
  /** Untertitel-Text (so wird er angezeigt). */
  text: string;
  /** Optionaler abweichender TTS-Text (für Sprach-Synthese-Aussprache). */
  speech?: string;
}

/**
 * Dialog-/System-Zeilen pro Beat. Reihenfolge entspricht den Beats in
 * `ParamedicsCutscene.tsx`. Stille Beats (z. B. die Eröffnung in 2613)
 * stehen hier als leere Liste.
 */
export const PARAMEDICS_LINES: ParamedicsLine[][] = [
  // Beat 0 — stille Vorgeschichte in Philippes Wohnung 2613.
  [],
  // Beat 1 — Sanitäter & Techniker vor 2615.
  [
    {
      speaker: "SANITÄTER",
      text: "Gehen Sie zurück. Wir brechen die Tür auf.",
    },
  ],
  // Beat 2 — Tür birst auf.
  [
    {
      speaker: "SYSTEM",
      text: "Beim dritten Schlag gibt die Tür nach. Sie schwingt auf.",
    },
  ],
  // Beat 3 — Innen: ausgemergelter Mann klopft.
  [
    {
      speaker: "SYSTEM",
      text: "Ein ausgemergelter Mann. Fahle Haut. Schlägt rhythmisch gegen die Wand.",
    },
    {
      speaker: "SYSTEM",
      text: "Layard nimmt seinen Mut zusammen und schaut ihm in die Augen.",
    },
  ],
  // Beat 4 — Close-up der grünen Augen.
  [
    {
      speaker: "SYSTEM",
      text: "Er erwartet tote, glasige Augen. Er findet eine seltsame Klarheit.",
    },
    {
      speaker: "SYSTEM",
      text: "Wie ein Portal in ein mystisches Universum. Layard wird das Bild nicht mehr los.",
    },
  ],
  // Beat 5 — Bergung & Protokoll-Übergabe.
  [
    {
      speaker: "SANITÄTER",
      text: "Kein A-, B- oder C-Problem. Transport mit Trage.",
    },
    {
      speaker: "LAYARD",
      text: "Brauchen Sie mich noch?",
    },
    {
      speaker: "SANITÄTER",
      text: "Ja. Ich drucke Ihnen das Protokoll. Verschlüsselt — für E67.",
    },
    {
      speaker: "SANITÄTER",
      text: "Wir schicken es per Rohrpost. Aber bitte werfen Sie es heute noch ein.",
    },
    {
      speaker: "LAYARD",
      text: "In Ordnung.",
    },
    {
      speaker: "SYSTEM",
      text: "Warum hat er ja gesagt? Er hätte nein sagen können.",
      speech: "Warum hat er, JA, gesagt? Er hätte auch NEIN sagen können.",
    },
  ],
];

/**
 * Beschreibung des Einsatzprotokoll-Items, das Layard am Ende der
 * Sanitäter-Cutscene ausgehändigt bekommt.
 */
export const PARAMEDICS_PROTOCOL_ITEM = {
  name: "Einsatzprotokoll (verschlüsselt)",
  description:
    "Ein versiegeltes Protokoll. Ziel: Gebäude E71, Zimmer 1534. Etikett: „Fall-ID 5245@E67@2613“.",
} as const;

// ─── Ending ────────────────────────────────────────────────────────

/** Ausgeschriebene deutsche Zahlwörter für die kleine Zahlenangabe im Ending. */
const NUM_WORDS = [
  "null",
  "einem",
  "zwei",
  "drei",
  "vier",
  "fünf",
  "sechs",
  "sieben",
  "acht",
  "neun",
  "zehn",
] as const;

function spell(n: number): string {
  return NUM_WORDS[n] ?? String(n);
}

/**
 * Erzeugt die Basis-Tafeln des Endings. `npcCount` ist die Anzahl der
 * Personen, mit denen Layard im Spielverlauf tatsächlich gesprochen hat.
 */
export function buildEndingBaseFrames(npcCount: number): string[][] {
  const peopleLine =
    npcCount === 1
      ? "Er hat heute mit einem Menschen geredet, den er gestern nicht kannte."
      : `Er hat heute mit ${spell(npcCount)} Menschen geredet, die er gestern nicht kannte.`;
  return [
    [
      "Layard legt den Hörer zurück.",
      "Auf dem Tisch: das Protokoll. Unverändert. Unzustellbar.",
      "Daneben: das Telefon. Schwarzer Bakelit. Warm vom Hörer.",
    ],
    [
      "In seinem Kopf, langsam: Insas Stimme.",
      "„Bringen Sie es mir vorbei. Persönlich.“",
      "Und davor, leiser: „Das überrascht mich nicht.“",
    ],
    [
      "Layard tritt ans Fenster. Innenhof. Solaranlage. 48 Stunden Notstrom.",
      peopleLine,
      "Über manche von ihnen werden andere reden, sobald er das Zimmer verlässt.",
    ],
    [
      "Auf 104,6 — heute zum ersten Mal — kein Klopfen.",
      "Nur ein Rauschen. Vielleicht trägt es etwas. Vielleicht nicht.",
      "Layard nimmt das Protokoll in die Hand.",
      "Sie ist leichter, als sie heute Morgen war.",
    ],
    [
      "Später. Sektor-Leitstelle E67, Korridor 46, Tür 4602.",
      "Insa Bauerfeind nimmt das Protokoll persönlich entgegen.",
      "Sie dreht es einmal in der Hand, legt es auf ihren Stapel — nicht darunter, darauf.",
    ],
    [
      "„Ich werde das richtig zuweisen, Herr Worag. Das haben Sie nicht selbst zu tragen.“",
      "Sie sieht ihn an, länger als nötig. „Sie haben heute zu viel gehört. Zu viel auf einer Frequenz, die niemand offiziell hört.“",
      "„Ich schicke einen Vermerk an die Sanitätsstation. Gehen Sie nach Hause. Schlafen Sie.“",
    ],
    [
      "Am nächsten Morgen. Layards Apartment. Auf dem Tisch ein Vermerk der Sanitätsstation E71.",
      "Kopfzeile: Dr. A. Okwu, Praxis 1532.",
      "„Auf Vermerk der Leitstelle E67 (Bauerfeind, I.): sieben Tage Resonanz-Pause. Kein 104,6. Kein Mithören. Keine Notizen ans Radio.“",
      "„Ärztliche Anordnung — vermerkt in Ihrer Akte.“",
    ],
    [
      "Layard faltet den Vermerk einmal. Er weiß nicht, ob er sich daran halten wird.",
    ],
  ];
}

/** Zusatz-Tafeln, falls Layard den Flyer („Wer hält das andere Ende?“) hat. */
export const ENDING_FLYER_FRAMES: string[][] = [
  [
    "Neben dem Protokoll liegt ein gefaltetes Blatt.",
    "Ein Mädchen auf einer Etage, deren Nummer er sich nicht gemerkt hat.",
    "„Wer hält das andere Ende?“ — Z.K.S.",
  ],
  [
    "Er zerreißt das Blatt nicht. Er faltet es kleiner.",
    "Es passt jetzt unter das Protokoll.",
  ],
];

/** Statische Texte rund um den Abspann-Bildschirm. */
export const ENDING_UI_TEXT = {
  actLabel: "AKT I — ENDE",
  subtitle: "Schmerz-Radio auf 104,6 — Fortsetzung folgt",
  restart: "▸ Neu beginnen",
  continueButton: "▸ Akt II beginnen",
  coffee: "☕ Buy me a coffee",
  /** Atmosphäre-Chatter, falls eine Nachricht im Abspann „zerhackt" sein soll. */
  garbledChatter: "» … «",
} as const;

// ─── Gemeinsame Cutscene-Beat-Typen ────────────────────────────────

export type Act2BridgeBeatStyle =
  /** Schwarzer Bildschirm mit zentriertem Text (wie Ending-Tafeln). */
  | "black"
  /** Schwarzer Bildschirm mit gedämpftem Phosphor-Glow. */
  | "amber"
  /** Schwarzer Bildschirm mit dünner weißer Linie. */
  | "clinical";

export interface Act2BridgeBeat {
  /** Optionaler kleiner Header oben (Ort/Zeit), in CRT-Phosphor-Stil. */
  header?: string;
  /** Untertitel-/Erzähl-Zeilen für diesen Beat. */
  lines: string[];
  /** Visuelle Anmutung des Beats. */
  style: Act2BridgeBeatStyle;
}

// ─── Resonanz-Pause-UI (ehemals Akt-II-Bridge-Cutscene) ─────────────
//
// Die Bridge-Cutscene wurde entfernt; die Resonanz-Pause-Texte leben
// weiter im Radio-Panel, wenn Layard während der Pause 104,6 einschalten
// möchte.

/** Statische UI-Texte für die Resonanz-Pause im Radio-Panel. */
export const RADIO_PAUSE_UI_TEXT = {
  /** Warnhinweis im Radio-Panel, wenn Layard während der Pause einschaltet. */
  radioPauseWarning: [
    ">> RESONANZ-PAUSE — DR. OKWU",
    "Sieben Tage. Kein 104,6, kein Trauer-Band.",
    "Sie hat es nicht aufgeschrieben. Sie hat darum gebeten.",
    "Wenn Layard jetzt drehen will — niemand hält ihn ab.",
  ],
  radioPauseContinue: "Trotzdem einschalten",
  radioPauseAbort: "Lieber lassen",
} as const;

// ─── Sektor-Schwelle-Cutscene (Klick auf entriegelte Schleuse) ───────

/**
 * Vier Tafeln in der Anmutung der Bridge-Cutscene: Layard steht vor der
 * offenen Schleusentür, ringt sich innerlich durch und tritt am Ende
 * tatsächlich hindurch. Ersetzt den früheren `feetWontMove`-Inline-Text.
 */
export const SECTOR_THRESHOLD_BEATS: Act2BridgeBeat[] = [
  {
    header: "Sektor 28 · Schleuse · E67",
    style: "black",
    lines: [
      "Und obwohl er intensiv daran denkt, durch die schwere Eisentüre zu gehen,",
      "raus aus E67 … seine Füße bewegen sich nicht.",
    ],
  },
  {
    style: "amber",
    lines: [
      "Wer bin ich, fragt sich Layard. Warum gehorcht mein Körper meinen Gedanken nicht?",
      "Vielleicht stimmt etwas nicht mit mir selbst. Die Beziehung zu ihm. Dieses Universum.",
      "Er hat es sich lange nicht mehr angesehen. Dabei ist er doch so neugierig.",
      "Vielleicht, denkt er, lassen sich die Schichten des inneren Klumpens, der sich um seine Gefühle gelegt hat, abtragen.",
      "Dafür sollte er sie sich anschauen. Gründlich und furchtlos. Wie ein Krieger in Babylon.",
      "Woher kommt jetzt dieses Bild?",
    ],
  },
  {
    style: "amber",
    lines: [
      "Was, so überlegt sich Layard, wenn ich dieses Protokoll nicht abliefere? Was ändert sich?",
      "Würde er bestraft werden?",
      "Die Idee, Freiheit zu besitzen, Handlungsfreiheit, hat fast etwas Verbotenes.",
      "Andererseits: E71. Eine andere Welt. Ein Abenteuer? Ein Grund, das Gebäude zu verlassen. Eine Aufgabe.",
    ],
  },
  {
    header: "Sektor 28 · Schleuse · jenseits",
    style: "black",
    lines: [
      "Seine Füße setzen sich in Bewegung. Layards Körper gehorcht ihm.",
      "Das Öffnen der Tür, die milde Abendkälte auf der Haut —",
      "— das fühlt sich fast nach Freiheit an.",
    ],
  },
];

/** Statische UI-Texte für die Sektor-Schwelle-Cutscene. */
export const SECTOR_THRESHOLD_UI_TEXT = {
  skipHint: "Esc / Enter überspringt · Klick · weiter",
} as const;