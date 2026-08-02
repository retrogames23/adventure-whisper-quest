/**
 * Debug-Cheats. Werden ausschließlich über Layards Terminal ausgelöst
 * (siehe `Terminal.tsx`) und sind nirgends dokumentiert.
 */

import type { GameApi, StoryFlag } from "./types";

/**
 * »vossbeckweak« — katapultiert den Spielstand exakt an die Stelle, an der
 * das Bürokratie-Endduell gegen Vossbeck gewonnen wurde: alle dafür
 * zwingend nötigen Flags sind gesetzt, alle optionalen (Mira-Vertrauen,
 * Ralf, MARV, DSA-Runde, Fälschungs-Route, Burn-Route, E71-Nebenstränge)
 * bleiben offen. Layard steht danach an der Sektor-Tür.
 */
const VOSSBECK_WEAK_FLAGS: StoryFlag[] = [
  // Auftakt: Protokoll-Kette 2613 / 2615
  "readHandbook",
  "examinedResidentId",
  "doorbellRang",
  "metPhilippe",
  "metPhilippeBefore",
  "knockingHeard",
  "talkedPhilippe2613",
  "calledLeitstelle",
  "paramedicsArrived",
  "paramedicsCutsceneSeen",
  "doorBrokenOpen",
  "protocolReceived",
  // Aufzug + Wartungssperre 4711
  "metBodo",
  "elevatorMaintBlocked",
  "elevatorMaintSeen",
  "elevatorMaintCleared",
  "elevatorTaken",
  // Leeres Büro, Insa, Lobby-Schleuse
  "sawEmptyOffice",
  "rangEmptyOfficeBell",
  "calledInsa2",
  "lobbyClearedDay",
  "insaSentToKowalkForCode",
  // Pflicht-Rätsel „kaputtes Telefon" (Mira / Etagenwartung)
  "metMira",
  "miraAtHomeMet",
  "knowsMiraIsWartung",
  "phoneBroken",
  "reportedPhoneFault",
  "miraRepairDone",
  "phoneRepaired",
  // Knoten 5610
  "saw5610Door",
  "serverRoom5610Open",
  "tappedNode5610",
  // Kantine: Kowalk, Brust, Weg zu Vossbeck
  "metKowalk",
  "metBrust",
  "knowsVossbeckPath",
  // Bürokratie-Duell: Training + Formblatt 17/V
  "duelOffered",
  "duelStarted",
  "duelTrainingWon1",
  "duelTrainingWon2",
  "duelTrainingWon3",
  "vossbeckSummoned",
  "gotFormblatt17V",
  // Endduell gegen Vossbeck gewonnen → Sektor-Code liegt im Terminal
  "metVossbeck",
  "duelEndgameWon",
  "vossbeckGaveCode",
  "calledForCode",
];

export function applyVossbeckWeakCheat(api: GameApi): void {
  VOSSBECK_WEAK_FLAGS.forEach((f) => api.setFlag(f));
  // Transiente Duell-Zustände sauber zurücksetzen.
  api.clearFlag("duelJustWon");
  api.resetDuelHits();
  api.goTo("sectorDoor");
}
