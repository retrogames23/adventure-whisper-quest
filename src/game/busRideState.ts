/**
 * Zustand der Busfahrt (Linie 28).
 *
 * Bewusst außerhalb des GameContext gehalten: Die Fahrt ist ein reines
 * Zwischenspiel zwischen zwei Szenen und muss nicht gespeichert werden.
 * MapOverlay startet sie, <BusRide /> spielt sie ab und übergibt am Ende
 * an api.goTo(target).
 */
import { useEffect, useState } from "react";
import type { SceneId } from "./types";

export interface BusRide {
  target: SceneId;
  /** Zieltext für die Fahrtzielanzeige. */
  targetLabel: string;
  startedAt: number;
  /** IDs der Fahrgäste dieser Fahrt (Reihenfolge = Sitzplatz-Slot). */
  passengers: string[];
  /** Sitzplatz-Slots, auf die die Fahrgäste gesetzt wurden. */
  seats: number[];
}

const EVT = "e67:bus-ride-change";

let ride: BusRide | null = null;

export function getBusRide(): BusRide | null {
  return ride;
}

function emit() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent(EVT));
}

export function startBusRide(r: BusRide) {
  ride = r;
  emit();
}

// QA-Hilfe: Fahrt aus der Konsole starten (nur Entwicklung/Testläufe).
if (typeof window !== "undefined") {
  (window as unknown as { __startBusRide?: typeof startBusRide }).__startBusRide =
    startBusRide;
}

export function endBusRide() {
  ride = null;
  emit();
}

export function useBusRide(): BusRide | null {
  const [v, setV] = useState<BusRide | null>(() => ride);
  useEffect(() => {
    const on = () => setV(ride);
    window.addEventListener(EVT, on);
    on();
    return () => window.removeEventListener(EVT, on);
  }, []);
  return v;
}
