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
  type BusTopic,
} from "@/game/busPassengers";
import {
  BUS_COUPLE_TOPICS,
  BUS_COUPLE_LABEL,
  type BusCoupleSpeaker,
} from "@/game/busCoupleChatter";
import busCompositionA from "@/assets/bus/bus-passengers-a.jpg";
import busCompositionB from "@/assets/bus/bus-passengers-b.jpg";
import busCompositionC from "@/assets/bus/bus-passengers-c.jpg";
import busCompositionD from "@/assets/bus/bus-passengers-d.jpg";
import busCompositionE from "@/assets/bus/bus-passengers-e.jpg";
import busCompositionF from "@/assets/bus/bus-passengers-f.jpg";
import busCompositionG from "@/assets/bus/bus-passengers-g.jpg";
import busFrontA from "@/assets/bus/bus-front-a.png";
import busFrontB from "@/assets/bus/bus-front-b.png";
import busFrontC from "@/assets/bus/bus-front-c.png";
import busFrontD from "@/assets/bus/bus-front-d.png";
import busFrontE from "@/assets/bus/bus-front-e.png";
import busFrontF from "@/assets/bus/bus-front-f.png";
import busFrontG from "@/assets/bus/bus-front-g.png";
import windowLoop from "@/assets/bus-window-loop.jpg";

/** Fahrtdauer: acht echte Minuten. Jederzeit überspringbar. */
const RIDE_MS = 8 * 60 * 1000;

const BUS_COMPOSITIONS = {
  a: busCompositionA,
  b: busCompositionB,
  c: busCompositionC,
  d: busCompositionD,
  e: busCompositionE,
  f: busCompositionF,
  g: busCompositionG,
};

/**
 * Vordergrund-Freisteller: alles, was im Bild vor der Scheibe liegt
 * (Kopf, Schulter, Rahmen, Stangen). Liegt über der Landschaftsebene,
 * damit die Animation nicht vor den Fahrgästen klebt.
 */
const BUS_FOREGROUNDS = {
  a: busFrontA,
  b: busFrontB,
  c: busFrontC,
  d: busFrontD,
  e: busFrontE,
  f: busFrontF,
  g: busFrontG,
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
  /** Aktueller Pfad im Gesprächsbaum (Themen-IDs von oben nach unten). */
  const [path, setPath] = useState<string[]>([]);
  const arrivedRef = useRef(false);
  /** Aktuelle Streitzeile des Paares (Sprechblasen im Bild). */
  const [chatter, setChatter] = useState<{
    npc: BusCoupleSpeaker;
    text: string;
  } | null>(null);

  const passengers = useMemo(() => {
    if (!ride) return [];
    return ride.passengers
      .map(({ passengerId, hotspot, chatterAnchors }) => ({
        p: getBusPassenger(passengerId),
        hotspot,
        chatterAnchors,
      }))
      .filter(
        (entry): entry is {
          p: BusPassenger;
          hotspot: { x: number; y: number; w: number; h: number };
          chatterAnchors:
            | { sie: { x: number; y: number }; er: { x: number; y: number } }
            | undefined;
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
    setPath([]);
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

  const couple = passengers.find((entry) => !!entry.chatterAnchors);
  const coupleId = couple?.p.id ?? null;
  const chatterPaused = !!talking;

  // Fortlaufender Ehestreit, solange Layard zusieht und nicht spricht.
  useEffect(() => {
    if (!coupleId || chatterPaused) {
      setChatter(null);
      return;
    }
    let cancelled = false;
    let timer = 0;
    const order = [...BUS_COUPLE_TOPICS].sort(() => Math.random() - 0.5);
    let ti = 0;
    let li = 0;

    const step = () => {
      if (cancelled) return;
      const topic = order[ti % order.length];
      const line = topic.lines[li];
      setChatter(line);
      const hold = 2600 + line.text.length * 45;
      li += 1;
      const pause = li >= topic.lines.length ? 3200 : 700;
      if (li >= topic.lines.length) {
        li = 0;
        ti += 1;
      }
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setChatter(null);
        timer = window.setTimeout(step, pause);
      }, hold);
    };

    timer = window.setTimeout(step, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      setChatter(null);
    };
  }, [coupleId, chatterPaused]);

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
    setPath([]);
  };

  /** Themenliste an einem Pfad auflösen. */
  const topicsAt = (p: BusPassenger, at: string[]): BusTopic[] => {
    let list: BusTopic[] = p.topics;
    for (const id of at) {
      const node = list.find((t) => t.id === id);
      if (!node?.follow?.length) return [];
      list = node.follow;
    }
    return list;
  };

  const chooseTopic = (p: BusPassenger, topic: BusTopic) => {
    const next = [...path, topic.id];
    const key = next.join("/");
    setSpoken((s) => ({ ...s, [p.id]: [...(s[p.id] ?? []), key] }));
    setLines(topic.lines);
    // Ohne Nachfragen bleibt der Spieler auf der aktuellen Ebene.
    setPath(topic.follow?.length ? next : path);
  };

  const done = talking ? (spoken[talking.id] ?? []) : [];
  const openTopics = talking
    ? topicsAt(talking, path).filter(
        (t) => !done.includes([...path, t.id].join("/")),
      )
    : [];

  return (
    <div className="absolute inset-0 z-[60] bg-black">
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{ containerType: "size" }}
      >
        {/* Bühne behält immer das Seitenverhältnis des Bildes, egal wie hoch
            der verbleibende Platz ist (z. B. wenn das Gespräch aufgeht). */}
        <div
          className="bus-shake relative"
          style={{
            aspectRatio: "1376 / 768",
            width: "min(100%, calc(100cqh * 1376 / 768))",
          }}
        >
          {/* Businnenraum – bestimmt die Größe der Bühne, nie verzerrt */}
          <img
            src={BUS_COMPOSITIONS[ride.composition]}
            alt="Innenraum eines abgenutzten Linienbusses mit drei sitzenden Fahrgästen"
            width={1376}
            height={768}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          />

          {/* Fenster mit vorbeiziehender Landschaft */}
          {COMPOSITION_WINDOWS[ride.composition].map((w, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute overflow-hidden"
              style={{
                left: `${w.left}%`,
                top: `${w.top}%`,
                width: `${w.width}%`,
                height: `${w.height}%`,
                clipPath: w.clip,
                transform: "translateZ(0)",
              }}
            >
              <div
                className="bus-scroll flex h-full w-max"
                style={{
                  animationDuration: i === 0 ? "26s" : "31s",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={windowLoop}
                  alt=""
                  decoding="sync"
                  loading="eager"
                  className="h-full w-auto max-w-none shrink-0 select-none"
                />
                <img
                  src={windowLoop}
                  alt=""
                  decoding="sync"
                  loading="eager"
                  className="h-full w-auto max-w-none shrink-0 select-none"
                />
              </div>
              {/* Scheibenschimmer ohne Blend-Modus: mix-blend-screen zwang iOS
                  zu ständigem Neu-Rastern der geclippten Ebene — die Fenster
                  fielen dabei immer wieder auf eine graue Fläche zurück. */}
              <div className="pointer-events-none absolute inset-0 bg-[#c9cdd6]/12" />
            </div>
          ))}

          {/* Fahrgäste */}
          {/* Vordergrund: liegt über der Landschaft, damit Personen und
              Rahmen nicht von der Animation überdeckt werden. */}
          <img
            src={BUS_FOREGROUNDS[ride.composition]}
            alt=""
            aria-hidden
            width={1376}
            height={768}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          />

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

          {/* Fortlaufender Streit des Paares */}
          {couple?.chatterAnchors && chatter && (
            <div
              className="pointer-events-none absolute z-10 w-[38%] max-w-[280px] -translate-x-1/2 -translate-y-full"
              style={{
                left: `${couple.chatterAnchors[chatter.npc].x}%`,
                top: `${couple.chatterAnchors[chatter.npc].y}%`,
              }}
            >
              <div className="animate-fade-in rounded-md border border-amber-glow/35 bg-[#0d0e0c]/88 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
                <div className="font-mono-crt text-[9px] uppercase tracking-[0.18em] text-amber-glow/70">
                  {BUS_COUPLE_LABEL[chatter.npc]}
                </div>
                <p className="text-[12px] leading-snug text-foreground/90 sm:text-[13px]">
                  {chatter.text}
                </p>
              </div>
            </div>
          )}

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
        <div className="absolute inset-x-0 bottom-0 max-h-[60%] overflow-y-auto border-t border-amber-glow/25 bg-[#0d0e0c]/92 px-4 py-3 backdrop-blur-sm">
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
                  onClick={() => chooseTopic(talking, t)}
                  className="rounded-sm border border-amber-glow/30 bg-gradient-to-b from-amber-glow/10 to-transparent px-3 py-2 text-left text-sm text-amber-glow/90 transition-all hover:-translate-y-px hover:border-amber-glow/70 hover:text-amber-glow"
                >
                  {t.label}
                </button>
              ))}
              {path.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPath(path.slice(0, -1))}
                  className="rounded-sm border border-border/60 px-3 py-2 text-left text-sm text-muted-foreground transition-all hover:border-amber-glow/60 hover:text-amber-glow"
                >
                  Das Thema wechseln.
                </button>
              )}
              {openTopics.length === 0 && path.length === 0 && (
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
