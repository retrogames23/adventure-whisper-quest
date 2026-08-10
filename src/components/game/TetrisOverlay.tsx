import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * ASCII-TETRIS für Layards Terminal ("./tetris.bin").
 *
 * 99 Level. Die Fallgeschwindigkeit steigt wie beim Game-Boy-Tetris
 * schrittweise an: pro Level fällt der Stein etwas schneller,
 * bis zu einem harten Minimum (Framerate-Grenze).
 */

const COLS = 10;
const ROWS = 18;
const LINES_PER_LEVEL = 10;

type Cell = 0 | 1;
type Board = Cell[][];

const SHAPES: number[][][][] = [
  // I
  [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  ],
  // O
  [
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
  ],
  // T
  [
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
  ],
  // S
  [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
  ],
  // Z
  [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]],
  ],
  // J
  [
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
  ],
  // L
  [
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
  ],
];

interface Piece {
  type: number;
  rot: number;
  x: number;
  y: number;
}

/**
 * Fallintervall in Millisekunden für Level 1..99.
 * Game-Boy-Kurve: anfangs deutliche Sprünge, später asymptotisch
 * gegen ~30 ms (ein "Frame").
 */
function dropInterval(level: number): number {
  const l = Math.max(1, Math.min(99, level));
  const ms = 800 * Math.pow(0.9, l - 1);
  return Math.max(28, Math.round(ms));
}

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0 as Cell));
}

function randomType(): number {
  return Math.floor(Math.random() * SHAPES.length);
}

function newPiece(type: number): Piece {
  const shape = SHAPES[type][0];
  return { type, rot: 0, x: Math.floor((COLS - shape.length) / 2), y: 0 };
}

function collides(board: Board, p: Piece): boolean {
  const shape = SHAPES[p.type][p.rot];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const y = p.y + r;
      const x = p.x + c;
      if (x < 0 || x >= COLS || y >= ROWS) return true;
      if (y >= 0 && board[y][x]) return true;
    }
  }
  return false;
}

function merge(board: Board, p: Piece): Board {
  const next = board.map((row) => [...row]) as Board;
  const shape = SHAPES[p.type][p.rot];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const y = p.y + r;
      const x = p.x + c;
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) next[y][x] = 1;
    }
  }
  return next;
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const kept = board.filter((row) => row.some((c) => !c));
  const cleared = ROWS - kept.length;
  while (kept.length < ROWS) kept.unshift(Array.from({ length: COLS }, () => 0 as Cell));
  return { board: kept as Board, cleared };
}

const SCORE_TABLE = [0, 40, 100, 300, 1200];

interface Props {
  onExit: () => void;
  /** Farbton passend zum Terminal. */
  tone?: "phosphor" | "sepia" | "destructive";
}

export function TetrisOverlay({ onExit, tone = "phosphor" }: Props) {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(() => newPiece(randomType()));
  const [nextType, setNextType] = useState<number>(randomType);
  const [lines, setLines] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [over, setOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const overRef = useRef(over);
  const pausedRef = useRef(paused);
  boardRef.current = board;
  pieceRef.current = piece;
  overRef.current = over;
  pausedRef.current = paused;

  const spawn = useCallback(
    (b: Board) => {
      const p = newPiece(nextType);
      setNextType(randomType());
      if (collides(b, p)) {
        setOver(true);
        setPiece(p);
        return;
      }
      setPiece(p);
    },
    [nextType],
  );

  const lockPiece = useCallback(() => {
    const merged = merge(boardRef.current, pieceRef.current);
    const { board: cleaned, cleared } = clearLines(merged);
    setBoard(cleaned);
    if (cleared) {
      setLines((n) => {
        const total = n + cleared;
        setLevel(Math.min(99, Math.floor(total / LINES_PER_LEVEL) + 1));
        return total;
      });
      setScore((s) => s + SCORE_TABLE[cleared] * level);
    }
    spawn(cleaned);
  }, [level, spawn]);

  const step = useCallback(() => {
    if (overRef.current || pausedRef.current) return;
    const moved = { ...pieceRef.current, y: pieceRef.current.y + 1 };
    if (collides(boardRef.current, moved)) {
      lockPiece();
    } else {
      setPiece(moved);
    }
  }, [lockPiece]);

  const move = useCallback((dx: number) => {
    if (overRef.current || pausedRef.current) return;
    const moved = { ...pieceRef.current, x: pieceRef.current.x + dx };
    if (!collides(boardRef.current, moved)) setPiece(moved);
  }, []);

  const rotate = useCallback(() => {
    if (overRef.current || pausedRef.current) return;
    const p = pieceRef.current;
    for (const kick of [0, -1, 1, -2, 2]) {
      const cand = { ...p, rot: (p.rot + 1) % 4, x: p.x + kick };
      if (!collides(boardRef.current, cand)) {
        setPiece(cand);
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (overRef.current || pausedRef.current) return;
    let p = pieceRef.current;
    while (!collides(boardRef.current, { ...p, y: p.y + 1 })) p = { ...p, y: p.y + 1 };
    pieceRef.current = p;
    setPiece(p);
    lockPiece();
  }, [lockPiece]);

  const restart = useCallback(() => {
    setBoard(emptyBoard());
    setPiece(newPiece(randomType()));
    setNextType(randomType());
    setLines(0);
    setScore(0);
    setLevel(1);
    setOver(false);
    setPaused(false);
  }, []);

  // Gravitation.
  useEffect(() => {
    if (over || paused) return;
    const id = setInterval(step, dropInterval(level));
    return () => clearInterval(id);
  }, [level, over, paused, step]);

  // Tastatursteuerung.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "p", "P", "q", "Q", "r", "R"].includes(k)) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (k === "q" || k === "Q" || k === "Escape") return onExit();
      if (k === "r" || k === "R") return restart();
      if (over) return;
      if (k === "p" || k === "P") return setPaused((v) => !v);
      if (k === "ArrowLeft") return move(-1);
      if (k === "ArrowRight") return move(1);
      if (k === "ArrowUp") return rotate();
      if (k === "ArrowDown") {
        setScore((s) => s + 1);
        return step();
      }
      if (k === " ") return hardDrop();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [move, rotate, step, hardDrop, onExit, restart, over]);

  // Render-Grid: Board + aktueller Stein.
  const rendered = useMemo(() => {
    const grid = board.map((row) => [...row]) as Board;
    if (!over) {
      const shape = SHAPES[piece.type][piece.rot];
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (!shape[r][c]) continue;
          const y = piece.y + r;
          const x = piece.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) grid[y][x] = 1;
        }
      }
    }
    return grid.map((row) => `<!${row.map((c) => (c ? "[]" : " ."))?.join("")}!>`);
  }, [board, piece, over]);

  const nextRows = useMemo(() => {
    const shape = SHAPES[nextType][0];
    return shape.map((row) => row.map((c) => (c ? "[]" : "  ")).join(""));
  }, [nextType]);

  const textClass =
    tone === "destructive" ? "text-destructive" : tone === "sepia" ? "text-sepia" : "text-phosphor";

  const btn =
    "rounded border border-current/40 px-3 py-2 font-mono-crt text-sm active:opacity-60";

  return (
    <div className={`min-h-0 flex-1 overflow-y-auto bg-black px-4 py-3 font-mono-crt ${textClass}`}>
      <div className="flex flex-wrap gap-6">
        <pre className="text-[13px] leading-tight sm:text-[15px]">
{rendered.join("\n")}
{"\n"}{`<!${"=".repeat(COLS * 2)}!>`}
        </pre>
        <div className="text-[13px] leading-relaxed sm:text-sm">
          <div>SCORE  {String(score).padStart(6, "0")}</div>
          <div>LINES  {String(lines).padStart(4, "0")}</div>
          <div>LEVEL  {String(level).padStart(2, "0")} / 99</div>
          <div className="opacity-70">TAKT   {dropInterval(level)} ms</div>
          <div className="mt-3">NÄCHSTER:</div>
          <pre className="text-[13px] leading-tight">{nextRows.join("\n")}</pre>
          <div className="mt-4 opacity-70">
            ← → bewegen · ↑ drehen
            <br />↓ schneller · Leertaste fallen
            <br />P Pause · R neu · Q Ende
          </div>
        </div>
      </div>

      {paused && !over && <div className="mt-3">— PAUSE — [P]</div>}
      {over && (
        <div className="mt-3">
          <div>— SPIEL ENDE — Level {level}, {lines} Reihen, {score} Punkte.</div>
          <div className="opacity-70">[R] neues Spiel · [Q] zurück zum Terminal</div>
        </div>
      )}

      {/* Touch-Steuerung (Mobil) */}
      <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
        <button type="button" className={btn} onClick={() => move(-1)}>←</button>
        <button type="button" className={btn} onClick={rotate}>DREHEN</button>
        <button type="button" className={btn} onClick={() => move(1)}>→</button>
        <button type="button" className={btn} onClick={step}>↓</button>
        <button type="button" className={btn} onClick={hardDrop}>FALLEN</button>
        <button type="button" className={btn} onClick={() => setPaused((v) => !v)}>PAUSE</button>
        <button type="button" className={btn} onClick={restart}>NEU</button>
        <button type="button" className={btn} onClick={onExit}>ENDE</button>
      </div>
    </div>
  );
}
