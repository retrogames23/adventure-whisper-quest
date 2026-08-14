import { useEffect, useState } from "react";
import { useGame } from "@/game/GameContext";
import { sector28Places, type MapPlace } from "@/game/mapSector28";
import { CloseButton } from "./CloseButton";
import { startBusRide } from "@/game/busRideState";
import { pickBusPassengers, BUS_SEATS } from "@/game/busPassengers";
import { useDevMode } from "@/dev/devMode";
import mapBg from "@/assets/map-sector-28.jpg";

/**
 * Karte von Sektor 28 (Vogelperspektive).
 * Freigeschaltet, sobald Vossbeck die Zentralverwaltungsstelle nennt.
 */
export function MapOverlay() {
  const { mapOpen, closeMap, api, scene } = useGame();
  const [selected, setSelected] = useState<MapPlace | null>(null);
  const dev = useDevMode();

  useEffect(() => {
    if (!mapOpen) return;
    setSelected(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mapOpen, closeMap]);

  if (!mapOpen) return null;

  /** Startet die Busfahrt (Linie 28) mit 1–5 zufälligen Fahrgästen. */
  const beginRide = (target: MapPlace["travelTo"], label: string) => {
    if (!target) return;
    const count = 1 + Math.floor(Math.random() * 5);
    const chosen = pickBusPassengers(count);
    const seats = BUS_SEATS.map((s) => s.id);
    for (let i = seats.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [seats[i], seats[j]] = [seats[j], seats[i]];
    }
    startBusRide({
      target,
      targetLabel: label,
      startedAt: Date.now(),
      passengers: chosen.map((p) => p.id),
      seats: seats.slice(0, chosen.length),
    });
  };

  const travel = (place: MapPlace) => {
    if (!place.travelTo || place.travelTo === scene) return;
    closeMap();
    if (place.farAway) {
      beginRide(place.travelTo, place.label);
      return;
    }
    api.goTo(place.travelTo);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 px-3 py-4"
      onClick={closeMap}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-amber-glow/30 bg-[#0d0e0c]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-amber-glow/20 px-4 py-2">
          <div className="font-display text-xs uppercase tracking-[0.28em] text-amber-glow/85">
            Sektor 28 — Lageplan
          </div>
          <div className="font-mono-crt hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            Bestandsübersicht · Stand lfd. Jahr
          </div>
          <CloseButton onClick={closeMap} tone="amber" label="Karte schließen" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row">
          {/* Karte */}
          <div className="relative shrink-0 md:flex-1">
            <img
              src={mapBg}
              alt="Lageplan von Sektor 28 aus der Vogelperspektive"
              width={1920}
              height={1080}
              loading="lazy"
              className="block w-full select-none"
            />
            {/* Nordpfeil */}
            <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-center text-amber-glow/70">
              <span className="text-lg leading-none">↑</span>
              <span className="font-mono-crt text-[10px] tracking-[0.2em]">N</span>
            </div>
            {sector28Places.map((p) => {
              const isHere = p.travelTo === scene;
              const active = selected?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p)}
                  onDoubleClick={() => travel(p)}
                  title={p.label}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span
                    aria-hidden
                    className={`block rounded-full border transition-all duration-150 ${
                      p.travelTo ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-2 w-2 sm:h-2.5 sm:w-2.5"
                    } ${
                      active
                        ? "border-amber-glow bg-amber-glow shadow-[0_0_12px_rgba(255,170,60,0.6)]"
                        : p.travelTo
                          ? "border-amber-glow bg-amber-glow/50 shadow-[0_0_8px_rgba(255,170,60,0.35)] group-hover:bg-amber-glow"
                          : "border-white/70 bg-black/60 group-hover:border-amber-glow group-hover:bg-amber-glow/60"
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-sm border border-amber-glow/50 bg-black/85 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-amber-glow transition-opacity duration-150 sm:text-[10px] ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  >
                    {p.label}
                    {isHere && <span className="ml-1 opacity-70">(hier)</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailspalte */}
          <div className="flex shrink-0 flex-col gap-3 border-t border-amber-glow/20 p-4 md:w-80 md:border-l md:border-t-0">
            {selected ? (
              <>
                <div>
                  <div className="font-display text-sm uppercase tracking-[0.2em] text-amber-glow">
                    {selected.label}
                  </div>
                  {selected.kicker && (
                    <div className="font-mono-crt mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {selected.kicker}
                    </div>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">
                  {selected.text}
                </p>
                {selected.travelTo && selected.travelTo !== scene && (
                  <button
                    type="button"
                    onClick={() => travel(selected)}
                    className="mt-auto inline-flex items-center justify-center rounded-sm border border-amber-glow/60 bg-gradient-to-b from-amber-glow/15 to-transparent px-3 py-2 text-xs uppercase tracking-[0.2em] text-amber-glow transition-all hover:-translate-y-px hover:border-amber-glow"
                  >
                    {selected.farAway ? "Mit der Linie 28 fahren" : "Dorthin gehen"}
                  </button>
                )}
                {selected.travelTo && selected.travelTo === scene && (
                  <div className="mt-auto text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Sie befinden sich hier.
                  </div>
                )}
                {selected.travelPending && (
                  <div className="mt-auto rounded-sm border border-white/15 bg-black/40 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                    Zutritt derzeit nur nach Vorlage — Termin wird zugewiesen.
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Punkt auf dem Plan überfahren, um den Ort zu benennen, und
                anklicken für Einzelheiten. Größere, hell gefüllte Punkte sind
                begehbar.
              </p>
            )}
            {dev && (
              <button
                type="button"
                onClick={() => {
                  closeMap();
                  beginRide("e71Lobby", "Zentralverwaltungsstelle (Test)");
                }}
                className="mt-2 rounded-sm border border-border/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-amber-glow/60 hover:text-amber-glow"
              >
                Dev · Testfahrt Linie 28
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
