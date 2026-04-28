/**
 * Hintergrund-Wortwechsel der beiden Kantinenangestellten in der
 * Kantine 3602 (cafeteriaE67), wenn Layard sich dort aufhält und gerade
 * NICHT in einem Dialog ist. Aufbau identisch zu src/game/dsa/chatter.ts.
 */

export type CafeteriaNpcId = "kowalk" | "brust";

export interface CafeteriaChatterLine {
  npc: CafeteriaNpcId;
  text: string;
}

export interface CafeteriaChatterTopic {
  id: string;
  lines: CafeteriaChatterLine[];
}

export const CAFETERIA_CHATTER_TOPICS: ReadonlyArray<CafeteriaChatterTopic> = [
  {
    id: "schichtplan",
    lines: [
      { npc: "brust", text: "Schicht C tauscht wieder mit Schicht B. Drittes Mal diese Woche." },
      { npc: "kowalk", text: "Weil Schicht C niemand mag. Auch nicht Schicht C selbst." },
      { npc: "brust", text: "Es steht im Plan, also gilt es." },
      { npc: "kowalk", text: "Es steht im Plan, weil ich es reingeschrieben habe, Brust." },
    ],
  },
  {
    id: "b2zuteilung",
    lines: [
      { npc: "kowalk", text: "Achtundachtzig B2 für E67 heute. Letzte Woche sechsundneunzig." },
      { npc: "brust", text: "Resonanz-bedingt. Sagt Logistik." },
      { npc: "kowalk", text: "Sagt Logistik immer." },
    ],
  },
  {
    id: "b3knapp",
    lines: [
      { npc: "brust", text: "B3 ist offiziell nur für medizinisch indizierte Fälle." },
      { npc: "kowalk", text: "Frau Doktor Tessmer hat seit dem Frühjahr keinen Antrag mehr gestellt." },
      { npc: "brust", text: "Trotzdem ist B3 weg." },
      { npc: "kowalk", text: "Frag den Hausmeister auf 56." },
    ],
  },
  {
    id: "hygienestreit",
    lines: [
      { npc: "brust", text: "Aushang vier Punkt zwei: Handschuhe bei Ausgabe, jederzeit." },
      { npc: "kowalk", text: "Aushang sieben Punkt eins, von 91, Brust: Handschuhe nur bei flüssigen Rationen." },
      { npc: "brust", text: "Der ist überschrieben." },
      { npc: "kowalk", text: "Wo steht das?" },
      { npc: "brust", text: "Im neuen Aushang." },
      { npc: "kowalk", text: "Der den alten überschreibt, weil im neuen steht, dass er ihn überschreibt. Sehr sauber gedacht." },
    ],
  },
  {
    id: "rohrpost",
    lines: [
      { npc: "kowalk", text: "(klong) — wieder Quadrant E70. Wieder leer." },
      { npc: "brust", text: "Steht trotzdem in der Eingangsliste." },
      { npc: "kowalk", text: "Genau." },
    ],
  },
  {
    id: "vollmacht4419",
    lines: [
      { npc: "brust", text: "Vollmacht 4419 hat heute drei B3 abgeholt." },
      { npc: "kowalk", text: "4419 ist Frau Tessmer. Lass es." },
      { npc: "brust", text: "Aber drei." },
      { npc: "kowalk", text: "Lass es." },
    ],
  },
  {
    id: "geschmack",
    lines: [
      { npc: "brust", text: "B2 ist inzwischen wirklich verträglicher geworden." },
      { npc: "kowalk", text: "Weil weniger drin ist." },
      { npc: "brust", text: "Frau Kowalk." },
      { npc: "kowalk", text: "Lesen Sie die neue Rezeptur, Brust. Steht alles im Aushang. Im neuen." },
    ],
  },
];