import { useEffect, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import filmAsset from "@/assets/lehrfilm-mandatsgebiet.mp4.asset.json";
import { useQA } from "@/dev/overlayQAState";

/**
 * Lichtspielsaal 5 (Etage 5, Sektor E71).
 * Beim ersten Betreten läuft der Lehrfilm „Mandatsgebiet Mitteleuropa"
 * einmal automatisch. Danach lässt er sich nur noch über die Leinwand
 * erneut starten (Flag `cinemaFilmSeen`).
 */
export function CinemaProjection() {
  const { scene, flags, api } = useGame();
  const qa = useQA();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inScene = scene === "cinemaE71";
  const seen = flags.has("cinemaFilmSeen");

  // Automatischer Anspieler beim Betreten — genau einmal pro Spielstand.
  useEffect(() => {
    if (!inScene || seen || qa.active || qa.editorForced) return;
    const t = window.setTimeout(() => {
      api.setFlag("cinemaFilmSeen");
      setPlaying(true);
    }, 900);
    return () => window.clearTimeout(t);
  }, [inScene, seen, qa.active, qa.editorForced, api]);

  // Verlässt man den Saal, stoppt die Vorführung.
  useEffect(() => {
    if (!inScene) setPlaying(false);
  }, [inScene]);

  // Manuelles Erneut-Abspielen über die Leinwand.
  useEffect(() => {
    const onReplay = () => setPlaying(true);
    window.addEventListener("cinema:play", onReplay);
    return () => window.removeEventListener("cinema:play", onReplay);
  }, []);

  if (!inScene || !playing) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={filmAsset.url}
        autoPlay
        playsInline
        controls
        onEnded={() => setPlaying(false)}
        className="max-h-full max-w-full"
      />
      <button
        type="button"
        onClick={() => {
          videoRef.current?.pause();
          setPlaying(false);
        }}
        className="absolute right-3 top-3 rounded-sm border border-amber-glow/50 bg-background/85 px-3 py-2 font-mono-crt text-xs uppercase tracking-widest text-amber-glow shadow-lg hover:bg-amber-glow/15"
      >
        Vorführung verlassen
      </button>
    </div>
  );
}