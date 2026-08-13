import type { HandbookChapter } from "@/game/e67Handbook";

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

export interface ReadableBook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  year: string;
  /** Kurzer Katalogeintrag, wie Herbert oder der Karteikasten ihn zeigen. */
  blurb: string;
  chapters: HandbookChapter[];
  uiText: BookUiText;
  /** Woher stammt das Buch im Spiel? */
  locationHint?: string;
  /** True: Layard kann es ausleihen und mit sich tragen. */
  lendable: boolean;
}

/**
 * Registry auf globalThis, damit ein Hot-Reload dieses Moduls die bereits
 * registrierten Bücher nicht verliert (sonst fällt die UI auf den
 * Katalog-Text zurück, statt das Buch zu öffnen).
 */
const registryKey = "__lovableBookRegistry" as const;
const globalStore = globalThis as typeof globalThis & {
  __lovableBookRegistry?: ReadableBook[];
};
const allBooks: ReadableBook[] = (globalStore[registryKey] ??= []);

export function registerBook(book: ReadableBook) {
  const existing = allBooks.findIndex((b) => b.id === book.id);
  if (existing >= 0) {
    // Hot-Reload: Eintrag ersetzen statt verwerfen.
    allBooks[existing] = book;
    return;
  }
  allBooks.push(book);
}

export function getBook(id: string): ReadableBook | undefined {
  return allBooks.find((b) => b.id === id);
}

export function listBooks(): readonly ReadableBook[] {
  return allBooks;
}
