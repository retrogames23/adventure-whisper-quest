import { useEffect, useState } from "react";
import { useGame } from "@/game/GameContext";
import { CloseButton } from "./CloseButton";
import { useDevMode } from "@/dev/devMode";
import {
  useEditActive,
} from "@/dev/dialogPatchState";
import {
  applyTextPatch,
  setTextLine,
  useTextPatchTick,
  clearTextPatch,
  getTextPatch,
  mergeTextLine,
  splitTextLine,
} from "@/dev/textPatchState";
import { usePaused, useDevStep } from "@/dev/devPlaybackState";

/**
 * Fasst die Einzelzeilen eines `showText`-Blocks zu Seiten zusammen,
 * damit ein zusammenhängender Absatz nur einen Klick kostet.
 *
 * Regeln:
 * - Eine leere Zeile ("") erzwingt einen Seitenwechsel — so bleiben
 *   dramaturgisch gesetzte Einzel-Beats erhalten.
 * - Budget pro Seite: Zeilenzahl und Zeichen, auf Mobile enger.
 */
export function buildTextPages(lines: string[], compact = false): string[][] {
  const maxLines = compact ? 4 : 6;
  const maxChars = compact ? 260 : 450;
  const pages: string[][] = [];
  let cur: string[] = [];
  let chars = 0;
  const flush = () => {
    if (cur.length) pages.push(cur);
    cur = [];
    chars = 0;
  };
  for (const raw of lines) {
    const line = raw ?? "";
    if (line.trim() === "") {
      flush();
      continue;
    }
    if (
      cur.length > 0 &&
      (cur.length >= maxLines || chars + line.length > maxChars)
    ) {
      flush();
    }
    cur.push(line);
    chars += line.length;
  }
  flush();
  return pages.length ? pages : [[""]];
}

export function TextOverlay() {
  const { textOverlay, closeText } = useGame();
  const [idx, setIdx] = useState(0);
  const dev = useDevMode();
  const editActive = useEditActive();
  useTextPatchTick();
  const editing = dev && editActive;
  const pausedRaw = usePaused();
  const paused = dev && pausedRaw;
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Anzahl der Seiten (nicht Zeilen) bestimmt das Weiterklicken.
  const patchedLines = textOverlay ? applyTextPatch(textOverlay) : null;
  const pages =
    patchedLines && !editing ? buildTextPages(patchedLines, compact) : null;
  const stepCount = editing
    ? (patchedLines?.length ?? 0)
    : (pages?.length ?? 0);

  useEffect(() => {
    setIdx(0);
  }, [textOverlay]);

  useEffect(() => {
    if (!textOverlay) return;
    if (editing) return; // im Edit-Modus nicht automatisch weiterspringen
    if (paused) return; // Dev-Pause friert auch das Auto-Advance ein
    const isLast = idx >= stepCount - 1;
    const t = setTimeout(() => {
      if (isLast) closeText();
      else setIdx((i) => i + 1);
    }, 20000);
    return () => clearTimeout(t);
  }, [textOverlay, idx, closeText, editing, paused, stepCount]);

  // Dev: Schritt zurück / vor über das Wiedergabe-Panel.
  useDevStep((dir) => {
    if (!textOverlay) return;
    if (dir === -1) setIdx((i) => Math.max(0, i - 1));
    else {
      const isLast = idx >= stepCount - 1;
      if (isLast) closeText();
      else setIdx((i) => i + 1);
    }
  });

  if (!textOverlay || !patchedLines) return null;
  const displayed = patchedLines;
  // idx wird per Effect zurückgesetzt, wenn sich `textOverlay` ändert —
  // beim ersten Render mit neuem Overlay kann idx aber noch zu groß sein.
  // Wir clampen, damit `current` nie undefined ist und die Edit-Textarea
  // nicht auf `undefined.length` crasht.
  const total = Math.max(1, stepCount);
  const safeIdx = Math.min(idx, total - 1);
  const current = displayed[safeIdx] ?? "";
  const currentPage = pages ? (pages[safeIdx] ?? []) : [];
  const isLast = safeIdx >= total - 1;
  const patched = !!getTextPatch(textOverlay);

  const advance = () => {
    if (isLast) closeText();
    else setIdx((i) => i + 1);
  };

  const onMergeNext = () => {
    if (safeIdx >= displayed.length - 1) return;
    mergeTextLine(textOverlay, safeIdx);
  };
  const onSplitHere = () => {
    const ta = document.getElementById(
      "showtext-edit-textarea",
    ) as HTMLTextAreaElement | null;
    const pos = ta?.selectionStart ?? Math.floor(current.length / 2);
    splitTextLine(textOverlay, safeIdx, pos);
  };

  return (
    <div
      className="absolute inset-0 z-40 flex cursor-pointer items-end justify-center overflow-y-auto bg-black/60 px-4 pb-16 pt-14 text-left sm:px-6 sm:pb-24"
      onClick={editing ? undefined : advance}
      role="button"
      tabIndex={-1}
    >
      <div
        className="absolute right-4 top-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={closeText} label="Schließen" />
      </div>
      {editing ? (
        <div
          className="fade-in max-h-full w-full max-w-3xl overflow-y-auto rounded-sm border border-amber-glow bg-background/95 px-6 py-5 text-left shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-amber-glow">
            <span>showText · Edit</span>
            <span>
              {safeIdx + 1} / {displayed.length}
              {patched ? " · ✎" : ""}
            </span>
          </div>
          <textarea
            id="showtext-edit-textarea"
            value={current}
            onChange={(e) => setTextLine(textOverlay, safeIdx, e.target.value)}
            rows={Math.max(3, Math.ceil(current.length / 60))}
            className="w-full resize-y rounded-sm border border-amber-glow/40 bg-black/60 p-2 font-mono-crt text-sm text-foreground"
          />
          <div className="mt-3 flex items-center justify-between gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
                className="rounded-sm border border-amber-glow/40 px-2 py-1 hover:bg-amber-glow/10 disabled:opacity-40"
              >
                ◂
              </button>
              <button
                type="button"
                onClick={() =>
                  setIdx((i) => Math.min(displayed.length - 1, i + 1))
                }
                disabled={isLast}
                className="rounded-sm border border-amber-glow/40 px-2 py-1 hover:bg-amber-glow/10 disabled:opacity-40"
              >
                ▸
              </button>
              <button
                type="button"
                onClick={onMergeNext}
                disabled={isLast}
                title="Mit nächster Zeile verbinden"
                className="rounded-sm border border-amber-glow/40 px-2 py-1 hover:bg-amber-glow/10 disabled:opacity-40"
              >
                ⇩ Merge
              </button>
              <button
                type="button"
                onClick={onSplitHere}
                title="An Cursor-Position splitten"
                className="rounded-sm border border-amber-glow/40 px-2 py-1 hover:bg-amber-glow/10"
              >
                ✂ Split
              </button>
            </div>
            <div className="flex gap-2">
              {patched && (
                <button
                  type="button"
                  onClick={() => clearTextPatch(textOverlay)}
                  className="rounded-sm border border-red-500/40 px-2 py-1 text-red-300 hover:bg-red-500/10"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={advance}
                className="rounded-sm border border-amber-glow/60 px-3 py-1 text-amber-glow hover:bg-amber-glow/10"
              >
                {isLast ? "▣ Schließen" : "▸ Weiter"}
              </button>
            </div>
          </div>
        </div>
      ) : (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          advance();
        }}
        className="fade-in max-h-full w-full max-w-3xl cursor-pointer overflow-y-auto rounded-sm border border-amber-glow/40 bg-background/95 px-6 py-5 text-left shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        aria-label="Weiter"
      >
        <p className="font-display text-lg leading-relaxed text-foreground text-shadow-hard sm:text-xl">
          {currentPage.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>
            {safeIdx + 1} / {total}
          </span>
          <span className="amber-glow">{isLast ? "▣ Schließen" : "▸ Weiter"}</span>
        </div>
      </button>
      )}
    </div>
  );
}