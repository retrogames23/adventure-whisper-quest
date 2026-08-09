import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/game/GameContext";
import { MIRA_REPAIR_BEATS } from "@/game/cutscenes";
import { usePaused, useDevStep } from "@/dev/devPlaybackState";
import { useDevMode } from "@/dev/devMode";
import beat1 from "@/assets/cutscene-mira-repair-1.jpg";
import beat2 from "@/assets/cutscene-mira-repair-2.jpg";
import beat3 from "@/assets/cutscene-mira-repair-3.jpg";
import beat4 from "@/assets/cutscene-mira-repair-4.jpg";

/**
 * Akt I · Pflicht-Rätsel: Mira repariert das Telefon in 2611.
 * Bebilderte Cutscene mit Ken-Burns-Kamerafahrt, Crossfades und
 * Untertitelband — Anmutung wie die Sektor-Schwelle-Cutscene.
 * Danach wechselt das Spiel in die Wohnung und der Dialog
 * `miraRepairScene` läuft weiter.
 */
const BEAT_IMAGES = [beat1, beat2, beat3, beat4];

const BEAT_CAMERA: Array<{
  scale: [number, number];
  pan: [number, number, number, number];
}> = [
  { scale: [1.04, 1.14], pan: [0, 1, 0, -2] }, // Gang
  { scale: [1.03, 1.11], pan: [3, 0, -3, 0] }, // Dose aufschrauben
  { scale: [1.14, 1.03], pan: [-2, 1, 1, 0] }, // Closeup Draht
  { scale: [1.05, 1.15], pan: [-2, 0, 2, 0] }, // Freizeichen
];

const CROSSFADE_MS = 600;

function holdFor(text: string): number {
  return Math.max(3600, Math.min(10000, Math.round(text.length * 82 + 1400)));
}

export function MiraRepairCutscene() {
  const { cutscene, endCutscene, api } = useGame();
  const active = cutscene === "miraRepair";
  const dev = useDevMode();
  const paused = dev && usePaused();

  const beats = MIRA_REPAIR_BEATS;
  const [beatIdx, setBeatIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(-1);
  const [visible, setVisible] = useState(true);
  const finishedRef = useRef(false);
  const transitioningRef = useRef(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) return;
    setBeatIdx(0);
    setLineIdx(-1);
    setVisible(true);
    finishedRef.current = false;
    transitioningRef.current = false;
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, [active]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    },
    [],
  );

  const startBeatTransition = () => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setVisible(false);
    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      setBeatIdx((b) => Math.min(b + 1, beats.length - 1));
      setLineIdx(-1);
      setVisible(true);
      transitioningRef.current = false;
    }, CROSSFADE_MS / 2);
  };

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    endCutscene();
    api.goTo("apartment");
    api.startDialog("miraRepairScene");
  };

  const advance = () => {
    if (finishedRef.current || transitioningRef.current) return;
    const beat = beats[beatIdx];
    if (!beat) return;
    if (lineIdx < beat.lines.length - 1) {
      setLineIdx((i) => Math.min(i + 1, beat.lines.length - 1));
      return;
    }
    if (beatIdx >= beats.length - 1) {
      finish();
      return;
    }
    startBeatTransition();
  };

  useEffect(() => {
    if (!active) return;
    if (paused) return;
    if (transitioningRef.current) return;
    const beat = beats[beatIdx];
    if (!beat) return;

    if (lineIdx === -1) {
      const t = window.setTimeout(() => setLineIdx(0), 700);
      return () => window.clearTimeout(t);
    }

    const line = beat.lines[lineIdx];
    if (!line) return;
    const t = window.setTimeout(() => {
      if (lineIdx < beat.lines.length - 1) {
        setLineIdx((i) => i + 1);
      } else if (beatIdx < beats.length - 1) {
        startBeatTransition();
      } else {
        finish();
      }
    }, holdFor(line));
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, beatIdx, lineIdx, beats]);

  useDevStep((dir) => {
    if (!active) return;
    const beat = beats[beatIdx];
    if (!beat) return;
    if (dir === 1) {
      advance();
      return;
    }
    if (lineIdx > 0) {
      setLineIdx((i) => i - 1);
    } else if (beatIdx > 0) {
      const prev = beats[beatIdx - 1];
      setVisible(false);
      window.setTimeout(() => {
        setBeatIdx((b) => b - 1);
        setLineIdx(prev.lines.length - 1);
        setVisible(true);
      }, CROSSFADE_MS / 2);
    }
  });

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finish();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, beatIdx, lineIdx]);

  if (!active) return null;

  const safeBeatIdx = Math.max(0, Math.min(beatIdx, beats.length - 1));
  const beat = beats[safeBeatIdx];
  if (!beat) return null;
  const image = BEAT_IMAGES[safeBeatIdx] ?? BEAT_IMAGES[BEAT_IMAGES.length - 1];
  const cam = BEAT_CAMERA[safeBeatIdx] ?? BEAT_CAMERA[BEAT_CAMERA.length - 1];
  const currentLine = lineIdx >= 0 ? (beat.lines[lineIdx] ?? null) : null;
  const beatKey = `beat-${safeBeatIdx}`;

  const beatDurationSec = Math.max(
    5,
    (700 + beat.lines.reduce((s, l) => s + holdFor(l), 0)) / 1000,
  );

  const spring = {
    type: "spring" as const,
    damping: 40,
    stiffness: 18,
    mass: 1.5,
    duration: beatDurationSec,
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black"
      onClick={advance}
      role="presentation"
    >
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.img
              key={beatKey}
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{
                opacity: 0,
                scale: cam.scale[0],
                x: `${cam.pan[0]}%`,
                y: `${cam.pan[1]}%`,
              }}
              animate={{
                opacity: 1,
                scale: cam.scale[1],
                x: `${cam.pan[2]}%`,
                y: `${cam.pan[3]}%`,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: CROSSFADE_MS / 1000, ease: "easeOut" },
                scale: spring,
                x: spring,
                y: spring,
              }}
            />
          )}
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {beat.header && (
          <div className="absolute left-4 top-4 font-mono-crt text-[10px] uppercase tracking-[0.3em] text-amber-glow/70 amber-glow">
            {beat.header}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finish();
          }}
          className="absolute right-4 top-4 rounded border border-amber-glow/40 bg-black/50 px-3 py-1.5 font-mono-crt text-xs text-amber-glow/80 transition-colors hover:bg-black/70 hover:text-amber-glow"
        >
          Überspringen ⏵⏵
        </button>
      </div>

      <div className="relative h-[28%] min-h-[140px] border-t border-amber-glow/20 bg-black/85 px-6 py-5 sm:px-10">
        <AnimatePresence mode="wait">
          {currentLine && (
            <motion.div
              key={`${beatIdx}-${lineIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mx-auto flex max-w-3xl flex-col gap-2"
            >
              <div className="font-mono-crt text-base italic text-amber-glow/85 sm:text-lg">
                {currentLine}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
