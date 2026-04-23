import { useEffect, useState } from "react";
import { scenes, useGame } from "@/game/GameContext";
import { Hotspot } from "./Hotspot";
import patientUp from "@/assets/sprite-patient-up.png";
import patientHit from "@/assets/sprite-patient-hit.png";
import paramedicSprite from "@/assets/sprite-paramedic.png";
import philippeSprite from "@/assets/sprite-philippe.png";

export function SceneView() {
  const { scene, caption, radioActive, resonance, api, flags } = useGame();
  const current = scenes[scene];
  const [showIntro, setShowIntro] = useState(true);
  // Knock animation: alternate between two patient sprite frames.
  const [knockFrame, setKnockFrame] = useState<0 | 1>(0);
  useEffect(() => {
    if (scene !== "apt2615" || flags.has("protocolReceived")) return;
    const id = setInterval(() => {
      setKnockFrame((f) => (f === 0 ? 1 : 0));
    }, 620);
    return () => clearInterval(id);
  }, [scene, flags]);

  useEffect(() => {
    setShowIntro(true);
    const t = setTimeout(() => setShowIntro(false), 3800);
    return () => clearTimeout(t);
  }, [scene]);

  // Auto trigger 2nd Insa call when player opens keypad after talking to paramedic
  useEffect(() => {
    if (
      scene === "sectorDoor" &&
      flags.has("protocolReceived") &&
      !flags.has("calledForCode")
    ) {
      // soft hint
    }
  }, [scene, flags]);

  // When in hallway with protocol but no code, allow re-calling Insa via Philippe phone
  // (handled via philippe scene re-entry)

  // Convenience: when player enters Philippe scene after sector door visit, allow second call
  useEffect(() => {
    if (
      scene === "philippe" &&
      flags.has("protocolReceived") &&
      !flags.has("calledForCode")
    ) {
      // nothing automatic; we add a hotspot via second-call check below
    }
  }, [scene, flags]);

  return (
    <div
      className={`relative mx-auto aspect-[4/3] w-full max-w-6xl overflow-hidden border border-border bg-black scanlines ${
        resonance > 75 ? "resonance-shake" : ""
      }`}
    >
      <img
        src={current.background}
        alt={current.title}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Apartment 2615 character overlays */}
      {scene === "apt2615" && !flags.has("protocolReceived") && (
        <>
          {/* Patient — animated knock against the back wall */}
          <img
            src={knockFrame === 0 ? patientUp : patientHit}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[28%] z-10 h-[62%] -translate-x-1/2 select-none object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]"
          />
          {/* Paramedic — to the right of the patient */}
          <img
            src={paramedicSprite}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-[24%] z-10 h-[68%] select-none object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]"
          />
          {/* Philippe — in the broken doorway, far left */}
          <img
            src={philippeSprite}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[6%] top-[26%] z-10 h-[66%] select-none object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]"
          />
        </>
      )}

      {/* Hotspots */}
      {current.hotspots.map((h) => (
        <Hotspot key={h.id} hotspot={h} />
      ))}

      {/* Second-call hotspot in Philippe scene if needed */}
      {scene === "philippe" &&
        flags.has("protocolReceived") &&
        !flags.has("calledForCode") && (
          <button
            type="button"
            onClick={() => {
              api.setFlag("calledForCode");
              api.startDialog("insa2");
            }}
            className="absolute left-[32%] top-[55%] z-20 h-[16%] w-[16%] cursor-crosshair rounded-sm border-2 border-amber-glow/80 bg-amber-glow/10 hotspot-pulse"
            aria-label="Insa erneut anrufen"
          />
        )}

      {/* Amber vignette when radio is active */}
      {radioActive && <div className="amber-vignette" />}

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-sm border border-amber-glow/40 bg-background/90 px-3 py-1 font-mono-crt text-sm text-amber-glow amber-glow">
          {caption}
        </div>
      )}

      {/* Scene title intro */}
      {showIntro && (
        <div className="pointer-events-none absolute inset-x-0 top-6 z-30 flex flex-col items-center gap-2 text-center">
          <div className="fade-in inline-block rounded-sm bg-background/85 px-4 py-2">
            <div className="font-display text-2xl text-foreground text-shadow-hard">
              {current.title}
            </div>
          </div>
          {current.intro && (
            <p className="fade-in mx-auto max-w-2xl rounded-sm bg-background/85 px-4 py-2 font-display text-sm leading-relaxed text-muted-foreground sm:text-base">
              {current.intro}
            </p>
          )}
        </div>
      )}
    </div>
  );
}