export type { BookUiText, ReadableBook } from "./registry";
export { registerBook, listBooks } from "./registry";
import { getBook as getRegisteredBook, type ReadableBook } from "./registry";

// Die drei Kernbücher werden direkt referenziert. Damit hängt ihre Verfügbarkeit
// weder von Import-Reihenfolge noch von einer HMR-/Preview-Neuladung ab.
import { HISTORY_BOOK } from "./history";
import { ALMANACH_BOOK } from "./almanach";
import { GFA_MANIFEST_BOOK } from "./gfaManifest";
import "./libraryBooks";

const CORE_BOOKS: Readonly<Record<string, ReadableBook>> = {
  [HISTORY_BOOK.id]: HISTORY_BOOK,
  [ALMANACH_BOOK.id]: ALMANACH_BOOK,
  [GFA_MANIFEST_BOOK.id]: GFA_MANIFEST_BOOK,
};

export function getBook(id: string): ReadableBook | undefined {
  return CORE_BOOKS[id] ?? getRegisteredBook(id);
}
