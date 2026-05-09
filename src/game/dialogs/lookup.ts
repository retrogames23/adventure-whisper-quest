import type { DialogTree } from "../types";
import { dialogs } from "./index";

/**
 * Indirektion über `dialogs[id]`. Production: liefert den Original-Tree.
 * Dev-Mode: Wenn `dialogPatchState` Overrides für diesen Tree hat, wird
 * eine gepatchte Kopie zurückgegeben (Splits/Merges/Inserts/Field-Edits
 * wirksam). Außerhalb des Editors kostet das einen Map-Lookup.
 */
let patcher: ((id: string, original: DialogTree) => DialogTree) | null = null;

export function registerDialogPatcher(
  fn: ((id: string, original: DialogTree) => DialogTree) | null,
) {
  patcher = fn;
}

export function getDialog(id: string): DialogTree | undefined {
  const original = dialogs[id];
  if (!original) return undefined;
  if (!patcher) return original;
  try {
    return patcher(id, original);
  } catch {
    return original;
  }
}