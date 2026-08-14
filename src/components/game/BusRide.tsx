import { useEffect, useMemo, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import { useMusic } from "@/audio/MusicPlayer";
import { useSettings } from "@/audio/SettingsContext";
import { startBusAmbience } from "@/audio/sfx";
import { useBusRide, endBusRide } from "@/game/busRideState";
import {
  getBusPassenger,
  COMPOSITION_WINDOWS,
  type BusPassenger,
} from "@/game/busPassengers";
import busCompositionA from "@/assets/bus/bus-passengers-a.jpg";
import busCompositionB from "@/assets/bus/bus-passengers-b.jpg";
import windowLoop from "@/assets/bus-window-loop.jpg";

/** Fahrtdauer: acht echte Minuten. Jederzeit überspringbar. */
const RIDE_MS = 8 * 60 * 1000;

const BUS_COMPOSITIONS = {
  a: busCompositionA,
  b: busCompositionB,
};

function formatRemaining(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Zwischenspiel „Linie 28“: Busfahrt zwischen weit auseinanderliegenden
 * Orten in Sektor 28. Fahr-Animation im Fenster, Fahrgeräusch statt Musik,
 * 1–5 Fahrgäste mit festen Gesprächsthemen.
 */
export function BusRide() {
  const ride = useBusRide();
  const { api } = useGame();
  const music = useMusic();
  const { sfxVolume } = useSettings();
  const [remaining, setRemaining] = useState(RIDE_MS);
  const [talking, setTalking] = useState<BusPassenger | null>(null);
  const [spoken, setSpoken] = useState<Record<string, string[]>>({});
  const [lines, setLines] = useState<string[] | null>(null);
  const arrivedRef = useRef(false);

  const passengers = useMemo(() => {
    if (!ride) return [];
    return ride.passengers
      .map(({ passengerId, hotspot }) => ({
        p: getBusPassenger(passengerId),
        hotspot,
      }))
      .filter(
        (entry): entry is {
          p: BusPassenger;
          hotspot: { x: number; y: number; w: number; h: number };
        } => !!entry.p,
      );
  }, [ride]);

  // Musik anhalten, Fahrgeräusch starten.
  useEffect(() => {
    if (!ride) return;
    music.pause();
    const stop = startBusAmbience(Math.max(0.12, sfxVolume * 0.5));
    return () => {
      stop();
      music.resume();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ride?.startedAt]);

  // Ankunfts-Timer.
  useEffect(() => {
    if (!ride) return;
    arrivedRef.current = false;
    setRemaining(RIDE_MS);
    setTalking(null);
    setLines(null);
    setSpoken({});
    const tick = () => {
      const left = ride.startedAt + RIDE_MS - Date.now();
      setRemaining(left);
      if (left <= 0 && !arrivedRef.current) {
        arrivedRef.current = true;
        arrive();
      }
    };
    const t = window.setInterval(tick, 500);
    tick();
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ride?.startedAt]);

  function arrive() {
    if (!ride) return;
    const target = ride.target;
    endBusRide();
    api.goTo(target);
  }

  if (!ride) return null;

  const openTalk = (p: BusPassenger) => {
    setTalking(p);
    setLines([p.greeting]);
  };

  const chooseTopic = (p: BusPassenger, topicId: string) => {
    const topic = p.topics.find((t) => t.id === topicId);
    if (!topic) return;
    setSpoken((s) => ({ ...s, [p.id]: [...(s[p.id] ?? []), topicId] }));
    setLines(topic.lines);
  };

  const done = talking ? (spoken[talking.id] ?? []) : [];
  const openTopics = talking
    ? talking.topics.filter((t) => !done.includes(t.id))
    : [];

  return (
    <div className="absolute inset-0 z-[60] flex flex-col bg-black">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div className="bus-shake relative aspect-[1920/1080] max-h-full w-full max-w-[calc(100vh*1920/1080)]">
          {/* Businnenraum */}
          <img
            src={BUS_COMPOSITIONS[ride.composition]}
            alt="Innenraum eines abgenutzten Linienbusses mit drei sitzenden Fahrgästen"
            width={1920}
            height={1080}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
          />

          {/* Fenster mit vorbeiziehender Landschaft */}
          {WINDOWS.map((w, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute overflow-hidden"
              style={{
                left: `${w.left}%`,
                top: `${w.top}%`,
                width: `${w.width}%`,
                height: `${w.height}%`,
              }}
            >
              <div
                className="bus-scroll flex h-full w-max"
                style={{ animationDuration: i === 0 ? "26s" : "31s" }}
              >
                <img
                  src={windowLoop}
                  alt=""
                  className="h-full w-auto max-w-none shrink-0 select-none"
                />
                <img
                  src={windowLoop}
                  alt=""
                  className="h-full w-auto max-w-none shrink-0 select-none"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[#c9cdd6]/25 mix-blend-screen" />
            </div>
          ))}

          {/* Fahrgäste */}
          {passengers.map(({ p, hotspot }) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openTalk(p)}
              aria-label={`Mit ${p.name} sprechen`}
              title={p.name}
              className="cursor-talk group absolute rounded-sm outline-none ring-inset hover:ring-2 hover:ring-amber-glow/45 focus-visible:ring-2 focus-visible:ring-amber-glow"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.w}%`,
                height: `${hotspot.h}%`,
              }}
            >
              <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-amber-glow/50 bg-black/80 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-amber-glow opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.name}
              </span>
            </button>
          ))}

          {/* Fahrtanzeige */}
          <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 rounded-sm border border-amber-glow/40 bg-black/70 px-3 py-1 text-center">
            <div className="font-mono-crt text-[10px] uppercase tracking-[0.28em] text-amber-glow/85 sm:text-xs">
              Linie 28 · {ride.targetLabel}
            </div>
            <div className="font-mono-crt text-[10px] text-muted-foreground sm:text-[11px]">
              Ankunft in {formatRemaining(remaining)}
            </div>
          </div>

          <button
            type="button"
            onClick={arrive}
            className="absolute right-2 top-2 rounded-sm border border-amber-glow/50 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-amber-glow transition-all hover:-translate-y-px hover:border-amber-glow sm:text-xs"
          >
            Fahrt überspringen
          </button>
        </div>
      </div>

      {/* Gesprächsfenster */}
      {talking && (
        <div className="shrink-0 border-t border-amber-glow/25 bg-[#0d0e0c]/95 px-4 py-3">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="font-display text-sm uppercase tracking-[0.2em] text-amber-glow">
                  {talking.name}
                </div>
                <div className="font-mono-crt text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {talking.kicker}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTalking(null);
                  setLines(null);
                }}
                className="rounded-sm border border-border/60 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-amber-glow/60 hover:text-amber-glow"
              >
                Gespräch beenden
              </button>
            </div>

            {lines && (
              <div className="mt-2 space-y-1.5">
                {lines.map((l, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed text-foreground/90"
                  >
                    {l}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-col gap-1.5">
              {openTopics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => chooseTopic(talking, t.id)}
                  className="rounded-sm border border-amber-glow/30 bg-gradient-to-b from-amber-glow/10 to-transparent px-3 py-2 text-left text-sm text-amber-glow/90 transition-all hover:-translate-y-px hover:border-amber-glow/70 hover:text-amber-glow"
                >
                  {t.label}
                </button>
              ))}
              {openTopics.length === 0 && (
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  {talking.farewell}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
