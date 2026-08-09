import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mobile-Stage: skaliert die Desktop-App (virtuelle 1280×720-Bühne) so,
 * dass sie das gesamte iPhone-/Mobil-Viewport ausfüllt. Auf Desktop
 * (>= 768px Breite) wird der Wrapper transparent — die Kinder rendern
 * unverändert.
 *
 * Im Hochformat auf Mobil wird die Bühne um 90° gedreht und so
 * gestreckt, dass keine schwarzen Balken mehr sichtbar sind.
 */
const STAGE_W = 1280;
const STAGE_H = 720;
const MOBILE_BREAKPOINT = 768;

/**
 * `uprightOnPortrait`: Wenn true, wird im Hochformat NICHT gedreht — die
 * Bühne bleibt aufrecht und wird passend skaliert. Wird für offene
 * Text-Konsolen (Terminal, NodeTerminal) gesetzt, weil dort die
 * System-Tastatur aufpoppt und mit einer 90°-Rotation kollidiert.
 */
export function MobileStage({
  children,
  uprightOnPortrait = false,
}: {
  children: ReactNode;
  uprightOnPortrait?: boolean;
}) {
  const [enabled, setEnabled] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(false);
  const [passthrough, setPassthrough] = useState(false);
  const [stageH, setStageH] = useState(STAGE_H);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const compute = () => {
      // 100dvw/dvh berücksichtigen die tatsächliche sichtbare Fläche inkl.
      // dynamischer Browser-UI (Adressleiste etc.) und füllen das Display
      // auf iPhones vollständig aus.
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      const isMobile = w < MOBILE_BREAKPOINT;
      setEnabled(isMobile);
      if (isMobile) {
        const isPortrait = h > w;
        if (isPortrait && !uprightOnPortrait) {
          // Bühne um 90° drehen. Die Bühnen-Höhe wird so gewählt, dass
          // nach der Rotation beide Achsen exakt den Viewport ausfüllen
          // (keine schwarzen Balken mehr).
          const desiredStageH = (w * STAGE_W) / h;
          setRotate(true);
          setPassthrough(false);
          setStageH(desiredStageH);
          setScale(Math.min(h / STAGE_W, w / desiredStageH));
        } else if (isPortrait && uprightOnPortrait) {
          // Aufrecht im Hochformat (Konsole offen): Pass-Through-Modus.
          setRotate(false);
          setPassthrough(true);
          setStageH(STAGE_H);
          setScale(1);
        } else {
          setRotate(false);
          setPassthrough(false);
          setStageH(STAGE_H);
          setScale(Math.min(w / STAGE_W, h / STAGE_H));
        }
      }
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    // iOS Safari ändert die sichtbare Höhe beim Scrollen; hier neu berechnen.
    window.addEventListener("scroll", compute, { passive: true });
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
      window.removeEventListener("scroll", compute);
    };
  }, [uprightOnPortrait]);

  if (!enabled) {
    // Desktop-Pfad: unverändert, kein Wrapper-Effekt.
    return <>{children}</>;
  }

  if (passthrough) {
    // Konsolen-Modus: kein Skalieren, kein Rotieren. Children erhalten den
    // vollen mobilen Viewport — die offenen Konsolen-Overlays (Terminal,
    // NodeTerminal) liegen ohnehin als `fixed`/`absolute inset-0`-Layer
    // darüber und nutzen den Platz dann komplett aus.
    return (
      <div
        data-mobile-passthrough="true"
        className="fixed inset-0 overflow-hidden bg-black"
        style={{ touchAction: "manipulation" }}
      >
        {children}
      </div>
    );
  }

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
          height: stageH,
          transform: `translate(-50%, -50%) rotate(${rotate ? -90 : 0}deg) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
