/**
 * Dev-Mode-Dialog-Editor — Patch-Schicht über `dialogs`.
 *
 * Speichert pro DialogTree-ID:
 *  - `fields`: Text/Subtext/Speaker/Choice-Text-Overrides je Line.
 *  - `ops`:    strukturelle Änderungen (split / merge / insertAfter).
 *
 * Beim Lesen baut `applyPatch` eine vollständige neue `DialogTree`-Kopie,
 * die das DialogOverlay und die Spiel-Logik (`advanceDialog`) gemeinsam
 * benutzen — sonst landet der Player nach einem Split auf einer LineId,
 * die in `dialogs[…]` nicht existiert.
 *
 * Persistenz: localStorage `e67.dialogPatches` (JSON-Map).
 */
import { useEffect, useState } from "react";
import type { DialogLine, DialogTree } from "@/game/types";
import { registerDialogPatcher } from "@/game/dialogs/lookup";

export type FieldPatch = {
  text?: string;
  subtext?: string;
  speaker?: DialogLine["speaker"];
  choices?: Record<number, { text: string }>;
};

export type DialogOp =
  | { kind: "split"; at: string; parts: string[] }
  | { kind: "merge"; from: string; into: string }
  | {
      kind: "insertAfter";
      after: string;
      text: string;
      speaker: DialogLine["speaker"];
    };

export type DialogPatch = {
  fields: Record<string, FieldPatch>;
  ops: DialogOp[];
};

type AllPatches = Record<string, DialogPatch>;

const KEY = "e67.dialogPatches";
const ACTIVE_KEY = "e67.dialogEdit.active";
const EVT = "e67:dialogPatch-change";

function emit() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent(EVT));
}

function readAll(): AllPatches {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as AllPatches) : {};
  } catch {
    return {};
  }
}

function writeAll(all: AllPatches) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
  emit();
}

export function getPatch(id: string): DialogPatch {
  return readAll()[id] ?? { fields: {}, ops: [] };
}

export function getAllPatches(): AllPatches {
  return readAll();
}

export function clearAllPatches() {
  writeAll({});
}

export function clearPatch(id: string) {
  const all = readAll();
  if (!all[id]) return;
  delete all[id];
  writeAll(all);
}

export function setField(
  treeId: string,
  lineId: string,
  patch: FieldPatch,
) {
  const all = readAll();
  const p = all[treeId] ?? { fields: {}, ops: [] };
  const cur = p.fields[lineId] ?? {};
  const merged: FieldPatch = { ...cur, ...patch };
  if (patch.choices) {
    merged.choices = { ...(cur.choices ?? {}), ...patch.choices };
  }
  p.fields[lineId] = merged;
  all[treeId] = p;
  writeAll(all);
}

export function clearLineFields(treeId: string, lineId: string) {
  const all = readAll();
  const p = all[treeId];
  if (!p) return;
  if (!p.fields[lineId]) return;
  delete p.fields[lineId];
  all[treeId] = p;
  writeAll(all);
}

export function pushOp(treeId: string, op: DialogOp) {
  const all = readAll();
  const p = all[treeId] ?? { fields: {}, ops: [] };
  p.ops = [...p.ops, op];
  all[treeId] = p;
  writeAll(all);
}

export function popLastOpFor(treeId: string) {
  const all = readAll();
  const p = all[treeId];
  if (!p || p.ops.length === 0) return;
  p.ops = p.ops.slice(0, -1);
  all[treeId] = p;
  writeAll(all);
}

/* -------------------- Aktivierung des Edit-Modus -------------------- */

export function isEditActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ACTIVE_KEY) === "1";
  } catch {
    return false;
  }
}
export function setEditActive(on: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (on) window.localStorage.setItem(ACTIVE_KEY, "1");
    else window.localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* ignore */
  }
  emit();
}

/* -------------------- Patch-Anwendung -------------------- */

/** Tiefe Kopie eines DialogTree (Lines/Choices), Funktionen bleiben Refs. */
function cloneTree(t: DialogTree): DialogTree {
  const lines: Record<string, DialogLine> = {};
  for (const k of Object.keys(t.lines)) {
    const l = t.lines[k];
    lines[k] = {
      ...l,
      choices: l.choices ? l.choices.map((c) => ({ ...c })) : undefined,
    };
  }
  return { ...t, lines };
}

/** Rewire: alle `next`-Verweise auf `from` auf `to` umbiegen. */
function rewire(
  lines: Record<string, DialogLine>,
  from: string,
  to: string | undefined,
) {
  for (const k of Object.keys(lines)) {
    const l = lines[k];
    if (l.next === from) l.next = to;
    if (l.choices) {
      for (const c of l.choices) {
        if (c.next === from) c.next = to;
      }
    }
  }
}

export function applyPatch(
  original: DialogTree,
  patch: DialogPatch,
): DialogTree {
  if (
    Object.keys(patch.fields).length === 0 &&
    patch.ops.length === 0
  ) {
    return original;
  }
  const t = cloneTree(original);

  // Strukturelle Ops in Reihenfolge anwenden.
  let insCounter = 0;
  for (const op of patch.ops) {
    if (op.kind === "split") {
      const orig = t.lines[op.at];
      if (!orig || op.parts.length < 2) continue;
      const parts = op.parts;
      // ID-Folge: erster Teil behält op.at, weitere Teile bekommen Suffix.
      const ids = [op.at, ...parts.slice(1).map((_, i) => `${op.at}__split_${i + 2}`)];
      // Letzter Teil erbt next/end/choices, frühere bekommen next=ids[i+1].
      for (let i = 0; i < parts.length; i++) {
        if (i === 0) {
          orig.text = parts[0];
          orig.choices = undefined;
          orig.end = false;
          orig.next = ids[1];
          continue;
        }
        const isLast = i === parts.length - 1;
        t.lines[ids[i]] = {
          id: ids[i],
          speaker: orig.speaker,
          text: parts[i],
          subtext: isLast ? undefined : undefined,
          next: isLast ? undefined : ids[i + 1],
          end: false,
          choices: undefined,
        };
      }
      // Letzten Teil mit ursprünglichen Tail-Eigenschaften ausstatten.
      // Diese stehen noch in `original.lines[op.at]` (vor der Mutation).
      const tail = original.lines[op.at];
      const last = t.lines[ids[ids.length - 1]];
      if (last && tail) {
        last.next = tail.next;
        last.end = tail.end;
        last.choices = tail.choices ? tail.choices.map((c) => ({ ...c })) : undefined;
        last.subtext = tail.subtext;
      }
    } else if (op.kind === "merge") {
      const fromL = t.lines[op.from];
      const intoL = t.lines[op.into];
      if (!fromL || !intoL) continue;
      intoL.text = `${intoL.text} ${fromL.text}`.trim();
      intoL.next = fromL.next;
      intoL.end = fromL.end;
      intoL.choices = fromL.choices;
      intoL.subtext = fromL.subtext ?? intoL.subtext;
      delete t.lines[op.from];
      rewire(t.lines, op.from, op.into);
      if (t.start === op.from) t.start = op.into;
    } else if (op.kind === "insertAfter") {
      const after = t.lines[op.after];
      if (!after) continue;
      insCounter += 1;
      const newId = `${op.after}__ins_${insCounter}`;
      t.lines[newId] = {
        id: newId,
        speaker: op.speaker,
        text: op.text,
        next: after.next,
        end: after.end,
      };
      after.next = newId;
      after.end = false;
    }
  }

  // Field-Overrides auf das (jetzt strukturierte) Resultat anwenden.
  for (const lineId of Object.keys(patch.fields)) {
    const fp = patch.fields[lineId];
    const l = t.lines[lineId];
    if (!l) continue;
    if (typeof fp.text === "string") l.text = fp.text;
    if (typeof fp.subtext === "string")
      l.subtext = fp.subtext.length === 0 ? undefined : fp.subtext;
    if (fp.speaker) l.speaker = fp.speaker;
    if (fp.choices && l.choices) {
      for (const idxStr of Object.keys(fp.choices)) {
        const idx = Number(idxStr);
        const co = fp.choices[idx];
        if (l.choices[idx] && typeof co.text === "string") {
          l.choices[idx] = { ...l.choices[idx], text: co.text };
        }
      }
    }
  }

  return t;
}

/* -------------------- Globaler Patcher-Hook -------------------- */

// Patcher beim Modul-Load registrieren — jede `getDialog(id)`-Anfrage
// läuft ab jetzt durch `applyPatch`. Außerhalb der Edit-Session ist die
// Patch-Map leer und das Original wird unverändert zurückgegeben.
if (typeof window !== "undefined") {
  registerDialogPatcher((id, original) => applyPatch(original, getPatch(id)));
}

/* -------------------- Hooks -------------------- */

export function useDialogPatchTick() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const h = () => setTick((t) => t + 1);
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
}

export function useEditActive(): boolean {
  const [on, setOn] = useState<boolean>(() => isEditActive());
  useEffect(() => {
    const h = () => setOn(isEditActive());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return on;
}

/* -------------------- Stats / Report -------------------- */

export function patchStats(all: AllPatches = readAll()) {
  let trees = 0;
  let fields = 0;
  let splits = 0;
  let merges = 0;
  let inserts = 0;
  for (const id of Object.keys(all)) {
    const p = all[id];
    const fc = Object.keys(p.fields).length;
    const oc = p.ops.length;
    if (fc + oc === 0) continue;
    trees += 1;
    for (const lid of Object.keys(p.fields)) {
      const f = p.fields[lid];
      if (typeof f.text === "string") fields += 1;
      if (typeof f.subtext === "string") fields += 1;
      if (f.speaker) fields += 1;
      if (f.choices) fields += Object.keys(f.choices).length;
    }
    for (const op of p.ops) {
      if (op.kind === "split") splits += 1;
      else if (op.kind === "merge") merges += 1;
      else if (op.kind === "insertAfter") inserts += 1;
    }
  }
  return { trees, fields, splits, merges, inserts };
}