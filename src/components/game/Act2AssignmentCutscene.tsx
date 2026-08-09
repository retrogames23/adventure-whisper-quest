import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/game/GameContext";
import {
  ACT2_ASSIGNMENT_BEATS,
  ACT2_ASSIGNMENT_UI_TEXT,
} from "@/game/cutscenes";
import { usePaused, useDevStep } from "@/dev/devPlaybackState";
import { useDevMode } from "@/dev/devMode";
import beat1 from "@/assets/cutscene-act2-1.jpg";
import beat2 from "@/assets/cutscene-act2-2.jpg";
import beat3 from "@/assets/cutscene-act2-3.jpg";
import beat4 from "@/assets/cutscene-act2-4.jpg";
import beat5 from "@/assets/cutscene-act2-5.jpg";

/**
 * Akt-II-Auftakt: Am Morgen nach der Protokoll-Übergabe findet Layard in
 * seinem Dienstpostfach den ersten Rechercheauftrag, der ihn aus dem
 * Gebäude schickt. Bebilderte Cutscene mit Ken-Burns-Kamerafahrt pro Beat
 * und Untertitelband — Anmutung wie die Sektor-Schwelle-Cutscene.
 */
const BEAT_IMAGES = [beat1, beat2, beat3, beat4, beat5];

/** Pro Beat: Start-/Ziel-Skalierung und Pan (in % der Bildgröße). */
const BEAT_CAMERA: Array<{
  scale: [number, number];
  pan: [number, number, number, number];
}> = [
  { scale: [1.05, 1.13], pan: [-2, -1, 2, 1] }, // Aufwachen
  { scale: [1.03, 1.11], pan: [3, 0, -3, 0] }, // Postfach
  { scale: [1.12, 1.02], pan: [0, 2, 0, -1] }, // Closeup, langsamer Rückzug
  { scale: [1.02, 1.12], pan: [-3, 1, 3, -1] }, // Dienststelle
  { scale: [1.06, 1.16], pan: [0, -1, 0, 1] }, // Mantel
];

const CROSSFADE_MS = 600;

function holdFor(text: string): number {
  return Math.max(3600, Math.min(10000, Math.round(text.length * 82 + 1400)));
}

export function Act2AssignmentCutscene() {
  const { cutscene, endCutscene, api } = useGame();
  const active = cutscene === "act2Assignment";
  const dev = useDevMode();
  const paused = dev && usePaused();

  const beats = ACT2_ASSIGNMENT_BEATS;
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
    if (!api.hasFlag("act2MailReceived")) api.setFlag("act2MailReceived");
    endCutscene();
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
      const t = window.setTimeout(() => setLineIdx(0), 600);
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
    if (dir === 1) {
      advance();
      return;
    }
    if (lineIdx > 0) {
      setLineIdx((i) => i - 1);
    } else if (beatIdx > 0) {
      const prev = beats[beatIdx - 1];
      setBeatIdx((b) => b - 1);
      setLineIdx(prev.lines.length - 1);
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
  const shown = beat.lines.slice(0, Math.max(0, lineIdx + 1));

  const bodyClass =
    beat.style === "clinical"
      ? "font-mono-crt text-base text-foreground sm:text-lg"
      : beat.style === "amber"
        ? "font-display text-lg text-amber-glow amber-glow sm:text-xl"
        : "font-display text-lg text-foreground sm:text-xl";

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black px-6"
      onClick={advance}
      role="presentation"
    >
      {beat.header && (
        <div className="mb-8 font-mono-crt text-[11px] uppercase tracking-[0.4em] text-amber-glow/80 amber-glow">
          {beat.header}
        </div>
      )}
      <div className="w-full max-w-3xl space-y-4 text-center">
        <AnimatePresence initial={false}>
          {shown.map((line, i) => (
            <motion.p
              key={`${safeBeatIdx}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={bodyClass}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 font-mono-crt text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {ACT2_ASSIGNMENT_UI_TEXT.skipHint}
      </div>
    </div>
  );
}