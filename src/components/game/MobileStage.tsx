import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mobile-Stage: skaliert die Desktop-App (virtuelle 1024×640-Bühne) so,
 * dass sie ins Mobil-Viewport passt. Auf Desktop (>= 768px Breite) wird
 * der Wrapper transparent (`display: contents`-artig) — die Kinder
 * rendern unverändert.
 *
 * Im Hochformat auf Mobil zeigen wir einen Hinweis-Banner, der dazu
 * auffordert, das Gerät querzuhalten (mit "Trotzdem spielen"-Option).
 */
const STAGE_W = 1024;
const STAGE_H = 640;
const MOBILE_BREAKPOINT = 768;

export function MobileStage({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [scale, setScale] = useState(1);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [dismissedRotateHint, setDismissedRotateHint] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setVw(w);
      setVh(h);
      const isMobile = w < MOBILE_BREAKPOINT;
      setEnabled(isMobile);
      if (isMobile) {
        setScale(Math.min(w / STAGE_W, h / STAGE_H));
      }
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  if (!enabled) {
    // Desktop-Pfad: unverändert, kein Wrapper-Effekt.
    return <>{children}</>;
  }

  const isPortrait = vh > vw;
  const showRotateHint = isPortrait && !dismissedRotateHint;

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ touchAction: "manipulation" }}
    >
      <div
        ref={wrapRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>

      {showRotateHint && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/85 px-6 text-center">
          <div className="max-w-xs rounded-sm border border-amber-glow/60 bg-background/95 p-6 shadow-[0_0_60px_rgba(0,0,0,0.85)]">
            <div
              aria-hidden
              className="mx-auto mb-3 flex h-12 w-20 items-center justify-center rounded-md border-2 border-amber-glow/70 text-amber-glow"
              style={{ transform: "rotate(90deg)" }}
            >
              <span className="font-mono-crt text-[10px] tracking-widest">
                ↻
              </span>
            </div>
            <div className="font-display text-sm uppercase tracking-[0.25em] text-amber-glow">
              Bitte Gerät drehen
            </div>
            <p className="mt-2 font-mono-crt text-[11px] leading-relaxed text-muted-foreground">
              Schmerz-Radio ist für Querformat optimiert. Halte dein Gerät
              quer für die beste Erfahrung.
            </p>
            <button
              type="button"
              onClick={() => setDismissedRotateHint(true)}
              className="mt-4 rounded-sm border border-amber-glow/40 bg-background/60 px-4 py-2 font-mono-crt text-[10px] uppercase tracking-[0.25em] text-amber-glow/85 hover:border-amber-glow hover:text-amber-glow"
            >
              Trotzdem spielen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
