import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Compact, container-relative CRT code stream designed to live INSIDE a small
 * box (e.g. a painted monitor on the title screen). Unlike CrtMatrixBackground
 * (which is sized to the viewport in vh/vw), this component sizes columns and
 * line-height to its own bounding box.
 */

const LINES: string[] = [
  ">> CENTRALOS v2.3",
  "OK leitstelle.001",
  "AUTH 001 -> Insa",
  "open ROUTER567",
  "ERR 4567 gateway",
  "uplink E67 stable",
  "ps -ef | schmerz",
  "tail klopf.log",
  "klopf 26.13/26.15",
  "DISPATCH 26.15",
  "PRINT @ E67/2613",
  "fall 5245@2613",
  "GET door/code 401",
  "POST door/code 200",
  "verify layard OK",
  "FREQ 104.6 lock",
  "drift 0.0008",
  "warn res 0.74",
  "ALERT res 0.81",
  "ZKS @ 03:14",
  "snapshot slot_2",
  "wake term 2611",
  "ls philippe/",
  "trace 8 hops",
  "elevator -> 3",
  ">> ready.",
];

interface ColumnState {
  /** vertical offset in px relative to the container. */
  y: number;
  /** scroll speed in px/s. */
  speed: number;
  /** horizontal offset in px relative to the container. */
  x: number;
  text: string[];
  alpha: number;
}

function buildColumns(width: number, height: number): ColumnState[] {
  const colWidthPx = 70; // approx px per column
  const count = Math.max(3, Math.min(5, Math.floor(width / colWidthPx)));
  const lineHeightPx = 13;
  const linesPerCol = Math.ceil((height * 2) / lineHeightPx);
  const cols: ColumnState[] = [];
  for (let i = 0; i < count; i++) {
    const x = (i / count) * width + 4 + (Math.random() * 4 - 2);
    const text: string[] = [];
    for (let j = 0; j < linesPerCol; j++) {
      text.push(LINES[Math.floor(Math.random() * LINES.length)]);
    }
    cols.push({
      // Start each column at a random position WITHIN the visible viewport so
      // the user sees code immediately on load (not after a long scroll-in).
      y: Math.random() * height,
      speed: 18 + Math.random() * 24,
      x,
      text,
      alpha: 0.65 + Math.random() * 0.35,
    });
  }
  return cols;
}

interface MonitorCodeStreamProps {
  /** Width of the screen area in px (e.g. 360). */
  width: number;
  /** Height of the screen area in px (e.g. 220). */
  height: number;
}

export function MonitorCodeStream({ width, height }: MonitorCodeStreamProps) {
  const [columns, setColumns] = useState<ColumnState[]>(() =>
    width > 0 && height > 0 ? buildColumns(width, height) : [],
  );
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const lineHeightPx = 13;

  // Rebuild columns if the size prop changes.
  useEffect(() => {
    if (width > 0 && height > 0) {
      setColumns(buildColumns(width, height));
    }
  }, [width, height]);

  // Animate.
  useEffect(() => {
    if (columns.length === 0 || height === 0) return;
    const animate = (t: number) => {
      const last = lastRef.current || t;
      const dt = Math.min(0.1, (t - last) / 1000);
      lastRef.current = t;
      const wrap = height * 2;
      setColumns((prev) =>
        prev.map((c) => {
          let y = c.y - c.speed * dt;
          if (y < -wrap) y += wrap;
          return { ...c, y };
        }),
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns.length, height]);

  const cols = useMemo(() => columns, [columns]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ width: "100%", height: "100%" }}
    >
      {cols.map((c, idx) => (
        <div
          key={idx}
          className="absolute font-mono-crt whitespace-pre"
          style={{
            left: `${c.x}px`,
            top: `${c.y}px`,
            color: "#39ff7a",
            opacity: c.alpha,
            textShadow: "0 0 5px rgba(57,255,122,0.7)",
            fontSize: "10px",
            lineHeight: `${lineHeightPx}px`,
            letterSpacing: "0.02em",
            transform: "translateZ(0)",
          }}
        >
          {c.text.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ))}
      {/* Soft top/bottom fade so the loop is invisible. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,10,4,0.85) 0%, rgba(2,10,4,0) 18%, rgba(2,10,4,0) 82%, rgba(2,10,4,0.9) 100%)",
        }}
      />
    </div>
  );
}