export type { BookUiText, ReadableBook } from "./registry";
export { registerBook, getBook, listBooks } from "./registry";

// Eager laden, damit die Registry immer gefüllt ist, egal welcher Teil der App
// zuerst ein Buch anfragt (sonst: "Unknown book id").
import "./history";
import "./almanach";
import "./gfaManifest";
import "./libraryBooks";
