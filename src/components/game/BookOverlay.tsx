import { useEffect, useRef, useState } from "react";
import type { HandbookChapter } from "@/game/e67Handbook";
import { CloseButton } from "./CloseButton";

export interface BookUiText {
  ariaLabel: string;
  closeLabel: string;
  contents: string;
  chaptersUnit: (n: number) => string;
  edition: string;
  pagerStart: string;
  pagerEnd: string;
  pagerOf: (idx: number, total: number) => string;
  chapterSelectLabel: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  chapters: HandbookChapter[];
  uiText: BookUiText;
}

/**
 * Generisches Buch-Lese-Overlay ("Bewohner-Heft"-Optik).
 * Render-Logik identisch zu `AlmanachOverlay`, aber über Props gefüttert,
 * damit weitere Bücher (z. B. „Die kürzeste Geschichte der Menschheit“)
 * dieselbe Darstellung nutzen können.
 */
export function BookOverlay({ open, onClose, title, subtitle, chapters, uiText }: Props) {

  const [chapterId, setChapterId] = useState<string>(chapters[0].id);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open, chapterId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const chapter =
    chapters.find((c) => c.id === chapterId) ?? chapters[0];

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4"
      onClick={onClose}
      role="dialog"
      aria-label={uiText.ariaLabel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-sm border-2 border-amber-glow/60 bg-[#f4e8c8] text-[#2a1c0a] shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(120,80,20,0.08) 0%, rgba(120,80,20,0.0) 8%, rgba(120,80,20,0.0) 92%, rgba(120,80,20,0.12) 100%)",
        }}
      >
        <CloseButton
          onClick={onClose}
          tone="amber"
          label={uiText.closeLabel}
          className="absolute right-2 top-2"
        />

        <aside className="hidden w-56 shrink-0 flex-col border-r-2 border-[#caa861] bg-[#ead8a8] p-4 sm:flex">
          <div className="font-display text-[13px] uppercase tracking-[0.16em] text-[#6b4a16]">
            {uiText.contents}
          </div>
          <div className="mt-1 font-mono-crt text-[12px] uppercase tracking-[0.12em] text-[#6b4a16]">
            {uiText.chaptersUnit(chapters.length)}
          </div>
          <nav className="mt-3 flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
            {chapters.map((c) => {
              const active = c.id === chapter.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChapterId(c.id)}
                  className={`group flex items-center justify-between rounded-sm border px-2 py-1.5 text-left font-mono-crt text-sm leading-snug transition ${
                    active
                      ? "border-[#6b4a16] bg-[#f4e8c8] text-[#2a1c0a] shadow-[inset_0_0_0_1px_rgba(107,74,22,0.4)]"
                      : "border-transparent text-[#5a4015] hover:border-[#caa861] hover:bg-[#f0dfb0]"
                  }`}
                >
                  <span className="truncate">{c.shortTitle}</span>
                  {active && <span aria-hidden>▸</span>}
                </button>
              );
            })}
          </nav>
          <div className="mt-3 border-t border-[#caa861] pt-2 font-mono-crt text-[11px] uppercase tracking-[0.12em] text-[#6b4a16]">
            {uiText.edition}
          </div>
        </aside>

        <div className="absolute left-3 top-2 sm:hidden">
          <select
            value={chapter.id}
            onChange={(e) => setChapterId(e.target.value)}
            className="rounded-sm border border-[#6b4a16] bg-[#f4e8c8] px-2 py-1 font-mono-crt text-xs text-[#2a1c0a]"
            aria-label={uiText.chapterSelectLabel}
          >
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.shortTitle}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-1 flex-col">
          <header className="border-b-2 border-[#caa861] bg-[#ead8a8] px-6 py-3 pr-12">
            <div className="font-mono-crt text-[13px] uppercase tracking-[0.16em] text-[#6b4a16]">
              {title}
            </div>
            <div className="mt-0.5 font-display text-[13px] italic tracking-wide text-[#5a4015]">
              {subtitle}
            </div>
          </header>

          <div
            ref={scrollRef}
            className="prose-handbook flex-1 overflow-y-auto px-6 py-5 pt-12 sm:pt-5"
          >
            <h1 className="mb-4 font-display text-2xl font-bold leading-tight text-[#2a1c0a]">
              {chapter.title}
            </h1>
            {chapter.image && (
              <figure className="mb-5">
                <img
                  src={chapter.image}
                  alt={chapter.imageCaption ?? chapter.title}
                  loading="lazy"
                  width={1024}
                  height={576}
                  className="w-full rounded-sm border border-[#a87d2a]/70 shadow-[0_2px_10px_rgba(60,40,10,0.25)]"
                  style={{ filter: "sepia(0.15) contrast(1.02)" }}
                />
                {chapter.imageCaption && (
                  <figcaption className="mt-1 font-mono-crt text-[13px] uppercase tracking-widest text-[#6b4a16] sm:text-[10px]">
                    {chapter.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
            <ChapterBody chapter={chapter} />

            <Divider />

            <ChapterPager
              chapter={chapter}
              chapters={chapters}
              uiText={uiText}
              onPick={(id) => setChapterId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      className="my-6 h-px w-full"
      style={{
        background:
          "repeating-linear-gradient(90deg, rgba(107,74,22,0.5) 0 6px, transparent 6px 12px)",
      }}
    />
  );
}

function ChapterPager({
  chapter,
  chapters,
  uiText,
  onPick,
}: {
  chapter: HandbookChapter;
  chapters: HandbookChapter[];
  uiText: BookUiText;
  onPick: (id: string) => void;
}) {
  const idx = chapters.findIndex((c) => c.id === chapter.id);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next =
    idx < chapters.length - 1 ? chapters[idx + 1] : null;
  return (
    <div className="flex items-center justify-between font-mono-crt text-[13px] text-[#5a4015]">
      <div>
        {prev ? (
          <button
            type="button"
            onClick={() => onPick(prev.id)}
            className="rounded-sm border border-[#caa861] bg-[#f0dfb0] px-2 py-1 hover:bg-[#e6d196]"
          >
            ◂ {prev.shortTitle}
          </button>
        ) : (
          <span className="opacity-40">{uiText.pagerStart}</span>
        )}
      </div>
      <div className="opacity-70">
        {uiText.pagerOf(idx + 1, chapters.length)}
      </div>
      <div>
        {next ? (
          <button
            type="button"
            onClick={() => onPick(next.id)}
            className="rounded-sm border border-[#caa861] bg-[#f0dfb0] px-2 py-1 hover:bg-[#e6d196]"
          >
            {next.shortTitle} ▸
          </button>
        ) : (
          <span className="opacity-40">{uiText.pagerEnd}</span>
        )}
      </div>
    </div>
  );
}

/* ---------- Mini-Renderer für Body-Zeilen (gespiegelt aus HandbookOverlay) ---------- */

function ChapterBody({ chapter }: { chapter: HandbookChapter }) {
  const blocks = groupBlocks(chapter.body);
  return (
    <div className="space-y-3 text-[20px] leading-relaxed text-[#2a1c0a] sm:text-[15px]">
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return <p key={i}>{renderInline(b.lines.join(" "))}</p>;
        }
        if (b.kind === "ul") {
          return (
            <ul key={i} className="ml-5 list-disc space-y-1">
              {b.lines.map((line, j) => (
                <li key={j}>{renderInline(line.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }
        if (b.kind === "quote") {
          return (
            <div
              key={i}
              className="rounded-sm border-l-4 border-[#a87d2a] bg-[#ead8a8]/70 px-3 py-2 italic text-[#5a4015]"
            >
              {b.lines.map((line, j) => (
                <div key={j}>{renderInline(line.replace(/^> ?/, ""))}</div>
              ))}
            </div>
          );
        }
        if (b.kind === "table") {
          const [header, ...rows] = b.lines.map(parseTableRow);
          return (
            <div key={i} className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#ead8a8] text-left">
                    {header.map((cell, j) => (
                      <th
                        key={j}
                        className="border border-[#caa861] px-2 py-1 font-display text-[12px] uppercase tracking-wide text-[#5a4015]"
                      >
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((cells, ri) => (
                    <tr key={ri} className={ri % 2 ? "bg-[#f0dfb0]/40" : ""}>
                      {cells.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border border-[#caa861] px-2 py-1 align-top"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

type Block =
  | { kind: "p"; lines: string[] }
  | { kind: "ul"; lines: string[] }
  | { kind: "quote"; lines: string[] }
  | { kind: "table"; lines: string[] };

function groupBlocks(lines: string[]): Block[] {
  const out: Block[] = [];
  for (const raw of lines) {
    const line = raw;
    const last = out[out.length - 1];
    if (line.startsWith("- ")) {
      if (last && last.kind === "ul") last.lines.push(line);
      else out.push({ kind: "ul", lines: [line] });
    } else if (line.startsWith("> ")) {
      if (last && last.kind === "quote") last.lines.push(line);
      else out.push({ kind: "quote", lines: [line] });
    } else if (line.startsWith("|")) {
      if (last && last.kind === "table") last.lines.push(line);
      else out.push({ kind: "table", lines: [line] });
    } else {
      out.push({ kind: "p", lines: [line] });
    }
  }
  return out;
}

function parseTableRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .split("|")
    .map((s) => s.trim());
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={key++} className="font-bold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      parts.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}