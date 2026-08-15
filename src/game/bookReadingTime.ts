/**
 * Wie lange ein Buch im Spiel tatsächlich offen war (kumuliert, in ms).
 *
 * Wird gebraucht, damit NPCs unterscheiden können, ob Layard einen Titel
 * nie geöffnet, nur kurz überflogen oder wirklich gelesen hat.
 */

const KEY = "sr:book-reading-ms";

type Store = Record<string, number>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

export function getBookReadingMs(bookId: string): number {
  return read()[bookId] ?? 0;
}

export function addBookReadingMs(bookId: string, ms: number) {
  if (typeof window === "undefined" || ms <= 0) return;
  const store = read();
  store[bookId] = (store[bookId] ?? 0) + ms;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* Speicher voll oder gesperrt – Lesezeit ist nicht spielkritisch. */
  }
}

export type BookReadState = "none" | "peek" | "read";

/** Schwelle für „richtig gelesen“: 20 Sekunden Anzeigedauer. */
export const BOOK_READ_THRESHOLD_MS = 20_000;

export function getBookReadState(bookId: string): BookReadState {
  const ms = getBookReadingMs(bookId);
  if (ms <= 0) return "none";
  return ms >= BOOK_READ_THRESHOLD_MS ? "read" : "peek";
}
