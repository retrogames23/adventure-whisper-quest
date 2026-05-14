/**
 * Hintergrund-Wortwechsel der drei Home-Computer-Nerds im
 * Gemeinschaftsraum 1530 (commonRoomE71). Aktiv, solange Layard sich
 * dort aufhält und gerade NICHT in einem Dialog ist. Aufbau identisch
 * zu src/game/cafeteriaChatter.ts und src/game/dsa/chatter.ts.
 *
 * Stilprinzip: gleiche Stimmen wie in src/game/dialogs/e71Nerds.ts —
 * 90er-Computernerd-Smalltalk (Marken, Specs, Demos, kleine
 * Eitelkeiten). Die Quiz-Fakten klingen hier nur am Rand mit; sie
 * sollen sich wie eingestreut anfühlen, nicht wie Lehrstoff.
 */

export type E71NerdNpcId = "detlef" | "sigi" | "ruven";

export interface E71NerdChatterLine {
  npc: E71NerdNpcId;
  text: string;
}

export interface E71NerdChatterTopic {
  id: string;
  lines: E71NerdChatterLine[];
}

export const E71_NERDS_CHATTER_TOPICS: ReadonlyArray<E71NerdChatterTopic> = [
  {
    id: "ocsVsEcs",
    lines: [
      { npc: "sigi", text: "Wenn die nächste Lieferung kommt, tausch ich auf ECS. Ehrlich." },
      { npc: "detlef", text: "Du tauschst gar nichts. OCS reicht. Original-Chipsatz, mehr braucht keiner." },
      { npc: "ruven", text: "Sagt der Mann, der seit zwei Jahren auf dieselbe Workbench starrt." },
      { npc: "detlef", text: "Sagt der Mann, der weiß, was funktioniert." },
    ],
  },
  {
    id: "diskKapazitaet",
    lines: [
      { npc: "sigi", text: "Ich krieg die neue Demo nicht draufkopiert. Achthundertachtzig KB sind achthundertachtzig KB." },
      { npc: "ruven", text: "Pack sie in zwei Teile. Loader auf Disk eins, Daten auf Disk zwei." },
      { npc: "sigi", text: "Hab ich. Disk zwei ist auch voll." },
      { npc: "detlef", text: "Dann hast du zu viele Module drin. Wirf den Sample-Player raus, der frisst alles." },
    ],
  },
  {
    id: "modemBaud",
    lines: [
      { npc: "ruven", text: "Heute Nacht ging das Modem auf zweitausendvierhundert stabil. Ohne Disconnect." },
      { npc: "detlef", text: "Zweitausendvierhundert Baud ist sowieso die Schmerzgrenze hier. Mehr lässt der Verteiler nicht durch." },
      { npc: "sigi", text: "In den Staaten fahren die längst auf neuntausendsechshundert. Ich hab's gelesen." },
      { npc: "ruven", text: "In den Staaten haben sie auch keinen Verteiler." },
    ],
  },
  {
    id: "paulaTon",
    lines: [
      { npc: "ruven", text: "Hast du den neuen Track von der Norweger-Crew gehört? Vier Kanäle, klingt wie acht." },
      { npc: "detlef", text: "Paula macht halt vier. Und dann teilt man sie eben." },
      { npc: "sigi", text: "Zwei Kanäle pro Stereoseite. Trick ist alt." },
      { npc: "ruven", text: "Trick ist alt, Ergebnis ist neu. Hör's dir an." },
    ],
  },
  {
    id: "demoSzeneNorwegen",
    lines: [
      { npc: "sigi", text: "Die Norweger ziehen die ganze Szene gerade auseinander. Drei Releases diesen Monat." },
      { npc: "ruven", text: "Norwegen halt. Lange Winter, schnelle Modems." },
      { npc: "detlef", text: "Lange Winter, geduldige Coder." },
      { npc: "sigi", text: "Lange Winter, ehrlich gesagt." },
    ],
  },
  {
    id: "usImport",
    lines: [
      { npc: "detlef", text: "Das »COMPUTE!«-Heft auf dem Sofa — kommt das schon offen ins Mandatsgebiet rein?" },
      { npc: "ruven", text: "Über E71 schon. Frag mich nicht wie." },
      { npc: "sigi", text: "Frag ihn lieber nicht. Er weiß es nämlich." },
      { npc: "ruven", text: "Ich weiß gar nichts. Steht auf dem Tisch, fertig." },
    ],
  },
  {
    id: "e67Vergleich",
    lines: [
      { npc: "sigi", text: "Mein Cousin in E67 hat seit dem Frühjahr nur noch CentralOS. Schwarzweiß." },
      { npc: "detlef", text: "Ist drüben einfach Standard. Terminal an, Terminal aus." },
      { npc: "ruven", text: "Tja, unser E71 ist etwas fortschrittlicher, wohlhabender und offener." },
      { npc: "detlef", text: "Sag das nicht so laut. Bringt nur Ärger." },
    ],
  },
  {
    id: "fastWeb",
    lines: [
      { npc: "ruven", text: "FastWeb war heute Vormittag wieder kurz weg. Drei Minuten." },
      { npc: "detlef", text: "Drei Minuten sind nichts. Letzte Woche waren's vierzig." },
      { npc: "sigi", text: "Ich hab die Disk neu gezogen. Der Bootsektor war angekratzt." },
      { npc: "ruven", text: "Deshalb kommen wir nicht auf den Norweger-Server. Mach sie heil, Sigi." },
    ],
  },
];