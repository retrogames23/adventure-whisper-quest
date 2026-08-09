import { useEffect, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import filmAsset from "@/assets/lehrfilm-mandatsgebiet.mp4.asset.json";
import filmAssetMobile from "@/assets/lehrfilm-mandatsgebiet-mobile.mp4.asset.json";
import { useQA } from "@/dev/overlayQAState";
import { useMusic } from "@/audio/MusicPlayer";

/**
 * Lichtspielsaal 5 (Etage 5, Gebäude E71).
 * Beim ersten Betreten läuft der Lehrfilm „Mandatsgebiet Mitteleuropa"
 * einmal automatisch. Danach lässt er sich nur noch über die Leinwand
 * erneut starten (Flag `cinemaFilmSeen`).
 */
export function CinemaProjection() {
  const { scene, flags, api } = useGame();
  const qa = useQA();
  const music = useMusic();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Wenn der Browser Autoplay mit Ton verweigert, läuft der Film stumm an
  // und der Zuschauer bekommt einen „Ton einschalten"-Knopf.
  const [needsSoundTap, setNeedsSoundTap] = useState(false);
  // Kleine Geräte bekommen die 480p-Fassung (~4,5 MB statt 12 MB).
  const [useMobileCut, setUseMobileCut] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(
      "(max-width: 900px), (pointer: coarse) and (max-width: 1200px)",
    );
    const update = () => setUseMobileCut(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
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

  // Während der Vorführung wird die Hintergrundmusik stummgeschaltet,
  // damit der Filmton hörbar ist (besonders auf Mobilgeräten).
  useEffect(() => {
    if (!playing) return;
    music.setDuck(0);
    return () => music.setDuck(1);
  }, [playing, music]);

  // Wiedergabe aktiv anstoßen: erst mit Ton, bei Ablehnung stumm + Hinweis.
  useEffect(() => {
    if (!playing) return;
    setNeedsSoundTap(false);
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    let cancelled = false;
    v.play().catch(() => {
      if (cancelled) return;
      v.muted = true;
      setNeedsSoundTap(true);
      void v.play().catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, [playing]);

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
        src={useMobileCut ? filmAssetMobile.url : filmAsset.url}
        autoPlay
        playsInline
        preload="auto"
        onEnded={() => setPlaying(false)}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="h-full w-full object-cover opacity-95"
      />
      {needsSoundTap && (
        <button
          type="button"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            v.volume = 1;
            void v.play().catch(() => {});
            setNeedsSoundTap(false);
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-amber-glow/60 bg-background/85 px-4 py-2 font-mono-crt text-xs uppercase tracking-widest text-amber-glow hover:bg-amber-glow/20"
        >
          Ton einschalten
        </button>
      )}
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