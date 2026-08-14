/**
 * Buskompositionen der Linie 28: fertige Gesamtbilder, Fensterflächen und
 * Zuordnung der sichtbaren Figuren zu Personas.
 *
 * Die Personas und ihre verzweigten Gesprächsbäume liegen in
 * `busPassengerDialogs.ts`.
 */

import { BUS_PASSENGERS, type BusSpriteId } from "./busPassengerDialogs";

export {
  BUS_PASSENGERS,
  pickBusPassengers,
  getBusPassenger,
} from "./busPassengerDialogs";
export type { BusPassenger, BusTopic, BusSpriteId } from "./busPassengerDialogs";

export type BusCompositionId = "a" | "b";

/** Sichtbare Scheibe im Gesamtbild (Prozent) inklusive Scheibenform. */
export interface BusWindowArea {
  left: number;
  top: number;
  width: number;
  height: number;
  /** CSS-clip-path: exakte Scheibenkontur innerhalb des Rechtecks. */
  clip: string;
}

/**
 * Fensterflächen je Buskomposition — direkt an den Scheiben der jeweiligen
 * Bilddatei ausgemessen und minimal nach innen versetzt, damit Rahmen und
 * Dichtung sichtbar bleiben.
 */
export const COMPOSITION_WINDOWS: Record<BusCompositionId, BusWindowArea[]> = {
  a: [
    {
      left: 2.76,
      top: 9.24,
      width: 19.33,
      height: 39.58,
      clip:
        "polygon(6% 1%, 2% 13%, 2% 25%, 2.5% 37.5%, 2.5% 50%, 2% 62.5%, 2.5% 75%, 3.5% 87.5%, 18% 99%, 86% 99%, 94% 87.5%, 93% 75%, 98% 62.5%, 98% 50%, 89% 37.5%, 63% 25%, 34% 13%, 7.5% 1%)",
    },
    {
      left: 78.78,
      top: 9.77,
      width: 18.82,
      height: 39.06,
      clip:
        "polygon(94% 1%, 65.5% 13%, 37% 25%, 8% 37.5%, 2.5% 50%, 2.5% 62.5%, 3% 75%, 3% 87.5%, 6% 99%, 66% 99%, 97.5% 87.5%, 97.5% 75%, 97% 62.5%, 97.5% 50%, 97.5% 37.5%, 97% 25%, 97% 13%, 95% 1%)",
    },
  ],
  b: [
    {
      left: 2.76,
      top: 9.11,
      width: 19.33,
      height: 39.84,
      clip:
        "polygon(6% 1%, 2% 13%, 2% 25%, 2.5% 37.5%, 2.5% 50%, 2.5% 62.5%, 2.5% 75%, 3% 87.5%, 66% 99%, 93.5% 99%, 97.5% 87.5%, 97.5% 75%, 97.5% 62.5%, 97.5% 50%, 90% 37.5%, 62% 25%, 34% 13%, 7% 1%)",
    },
    {
      left: 78.78,
      top: 9.77,
      width: 18.82,
      height: 39.19,
      clip:
        "polygon(94% 1%, 65.5% 13%, 36% 25%, 8% 37.5%, 2.5% 50%, 2.5% 62.5%, 3% 75%, 3% 88%, 97.5% 88%, 97.5% 75%, 97% 62.5%, 97% 50%, 97.5% 37.5%, 97% 25%, 97% 13%, 95.5% 1%)",
    },
  ],
};

export interface BusCompositionPassenger {
  passengerId: string;
  /** Unsichtbare Gesprächsfläche in Prozent des Gesamtbildes. */
  hotspot: { x: number; y: number; w: number; h: number };
}

export interface BusCompositionSelection {
  id: BusCompositionId;
  passengers: BusCompositionPassenger[];
}

const COMPOSITION_SLOTS: Record<
  BusCompositionId,
  { sprite: BusSpriteId; hotspot: BusCompositionPassenger["hotspot"] }[]
> = {
  a: [
    { sprite: "woman", hotspot: { x: 16, y: 31, w: 24, h: 65 } },
    { sprite: "youth", hotspot: { x: 46, y: 42, w: 12, h: 28 } },
    { sprite: "worker", hotspot: { x: 61, y: 31, w: 24, h: 67 } },
  ],
  b: [
    { sprite: "worker", hotspot: { x: 25, y: 34, w: 20, h: 61 } },
    { sprite: "woman", hotspot: { x: 47, y: 43, w: 11, h: 26 } },
    { sprite: "elder", hotspot: { x: 60, y: 34, w: 21, h: 62 } },
  ],
};

/** Wählt eine vollständige Bildkomposition und genau eine passende Persona je Figur. */
export function pickBusComposition(): BusCompositionSelection {
  const id: BusCompositionId = Math.random() < 0.5 ? "a" : "b";
  const used = new Set<string>();
  const passengers = COMPOSITION_SLOTS[id].map(({ sprite, hotspot }) => {
    const candidates = BUS_PASSENGERS.filter(
      (passenger) => passenger.sprite === sprite && !used.has(passenger.id),
    );
    const passenger = candidates[Math.floor(Math.random() * candidates.length)];
    if (!passenger) {
      throw new Error(`Keine Bus-Persona für Figurentyp ${sprite}`);
    }
    used.add(passenger.id);
    return { passengerId: passenger.id, hotspot };
  });
  return { id, passengers };
}
