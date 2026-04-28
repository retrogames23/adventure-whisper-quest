import { useEffect, useState } from "react";
import { CloseButton } from "./CloseButton";

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Lese-Overlay für den E67-Bewohner-Ausweis.
 * Zwei Seiten: Vorderseite (Lichtbild & Daten) und Rückseite mit
 * geprägtem Bewohner-Code „2611“ (siehe §2 Abs. 7 im Handbuch).
 */
export function IdCardOverlay({ open, onClose }: Props) {
  const [side, setSide] = useState<"front" | "back">("front");

  useEffect(() => {
    if (!open) return;
    setSide("front");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setSide((s) => (s === "front" ? "back" : "front"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        <CloseButton
          onClick={onClose}
          tone="amber"
          label="Ausweis schließen"
          className="absolute -right-2 -top-2 z-10"
        />

        {/* Card */}
        <button
          type="button"
          onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
          aria-label="Ausweis umdrehen"
          className="block w-full perspective"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative aspect-[1.586/1] w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform:
                side === "front" ? "rotateY(0deg)" : "rotateY(180deg)",
            }}
          >
            {/* Vorderseite */}
            <div
              className="absolute inset-0 overflow-hidden rounded-md border-2 border-amber-glow/50 shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
              style={{
                backfaceVisibility: "hidden",
                background:
                  "linear-gradient(135deg, #d8c69a 0%, #b89a5c 100%)",
              }}
            >
              <div className="flex h-full flex-col p-4 text-[#2a1c0a]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-[10px] uppercase tracking-[0.3em] text-[#5a4015]">
                      Bewohner-Ausweis · E67
                    </div>
                    <div className="font-mono-crt text-[9px] uppercase tracking-widest text-[#7a5a20]">
                      Quadrant 26 · Etage 26
                    </div>
                  </div>
                  <div className="font-mono-crt text-[9px] text-[#5a4015]/80">
                    No. 2611
                  </div>
                </div>
                <div className="mt-3 flex flex-1 items-stretch gap-3">
                  {/* Lichtbild */}
                  <div className="flex w-20 items-end justify-center overflow-hidden rounded-sm border border-[#5a4015] bg-[#3a2e1a]">
                    <svg viewBox="0 0 32 40" className="h-full w-full" shapeRendering="crispEdges">
                      <rect width="32" height="40" fill="#2a1c0a" />
                      <circle cx="16" cy="15" r="6" fill="#c9a26a" />
                      <rect x="8" y="22" width="16" height="18" fill="#7a5a20" />
                      <rect x="9" y="24" width="14" height="2" fill="#3a2e1a" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center font-mono-crt text-[12px] leading-snug">
                    <div>
                      <span className="text-[#7a5a20]">Name: </span>
                      <span className="font-bold">Worag, Layard</span>
                    </div>
                    <div>
                      <span className="text-[#7a5a20]">Wohnung: </span>
                      <span className="font-bold">2611</span>
                    </div>
                    <div>
                      <span className="text-[#7a5a20]">Status: </span>
                      <span>Bewohner, ständig</span>
                    </div>
                    <div>
                      <span className="text-[#7a5a20]">Gültig bis: </span>
                      <span className="italic opacity-80">unleserlich</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between font-mono-crt text-[9px] uppercase tracking-widest text-[#5a4015]/80">
                  <span>Rückseite klicken</span>
                  <span>nicht knicken</span>
                </div>
              </div>
            </div>

            {/* Rückseite */}
            <div
              className="absolute inset-0 overflow-hidden rounded-md border-2 border-amber-glow/50 shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background:
                  "linear-gradient(135deg, #c9b78a 0%, #a88a4c 100%)",
              }}
            >
              <div className="flex h-full flex-col p-4 text-[#2a1c0a]">
                {/* Magnetstreifen */}
                <div className="-mx-4 -mt-4 h-7 bg-[#1a1208]" />
                <div className="mt-4 flex flex-1 flex-col items-center justify-center text-center">
                  <div className="font-mono-crt text-[9px] uppercase tracking-widest text-[#5a4015]">
                    Bewohner-Code (§2 Abs. 7)
                  </div>
                  <div
                    className="mt-2 font-mono-crt text-4xl tracking-[0.5em] text-[#2a1c0a]"
                    style={{
                      textShadow:
                        "0 0 1px rgba(255,255,255,0.4), 0 1px 0 rgba(0,0,0,0.4)",
                    }}
                  >
                    2611
                  </div>
                  <div className="mt-2 max-w-[80%] font-display text-[10px] italic text-[#5a4015]">
                    geprägt — bitte vor Lichteinfall schützen
                  </div>
                </div>
                <div className="font-mono-crt text-[9px] uppercase tracking-widest text-[#5a4015]/80">
                  Eigentum der Leitstelle E67. Bei Fund: 001.
                </div>
              </div>
            </div>
          </div>
        </button>
        <div className="mt-3 text-center font-mono-crt text-[10px] uppercase tracking-widest text-amber-glow/70">
          Klick auf den Ausweis: umdrehen · ESC: schließen
        </div>
      </div>
    </div>
  );
}