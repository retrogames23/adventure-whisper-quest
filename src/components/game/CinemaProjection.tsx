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

  // Der Film läuft direkt auf der Leinwand des Hintergrundbildes.
  // Koordinaten in % der Bildfläche (siehe scene-cinema-e71.jpg).
  return (
    <div
      className="pointer-events-auto absolute z-20"
      style={{ left: "30.9%", top: "13.8%", width: "43.8%", height: "32.1%" }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={filmAsset.url}
        autoPlay
        playsInline
        onEnded={() => setPlaying(false)}
        className="h-full w-full object-cover opacity-95 mix-blend-screen"
      />
      <button
        type="button"
        onClick={() => {
          videoRef.current?.pause();
          setPlaying(false);
        }}
        className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-amber-glow/40 bg-background/80 px-3 py-1 font-mono-crt text-[10px] uppercase tracking-widest text-amber-glow hover:bg-amber-glow/15"
      >
        Vorführung beenden
      </button>
    </div>
  );
}