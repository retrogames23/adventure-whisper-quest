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

const allBooks: ReadableBook[] = [];

export function registerBook(book: ReadableBook) {
  if (allBooks.some((b) => b.id === book.id)) {
    console.warn(`Book with id ${book.id} already registered. Skipping.`);
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
