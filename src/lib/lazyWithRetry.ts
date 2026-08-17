import { lazy, type ComponentType } from "react";

const RELOAD_KEY = "schmerz-radio.chunk-reload";

/**
 * `React.lazy` mit Retry: Wenn ein Code-Chunk nicht geladen werden kann
 * (typisch nach einem neuen Deploy oder bei wackligem Mobilfunk), wird
 * einmal erneut versucht und — falls das auch scheitert — die Seite genau
 * einmal neu geladen, statt in die Fehler-Boundary zu laufen
 * ("Something went wrong").
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      if (typeof window !== "undefined") {
        window.sessionStorage?.removeItem(RELOAD_KEY);
      }
      return mod;
    } catch (err) {
      // Zweiter Versuch (transienter Netzwerkfehler).
      try {
        return await factory();
      } catch {
        if (typeof window !== "undefined") {
          const already = window.sessionStorage?.getItem(RELOAD_KEY);
          if (!already) {
            window.sessionStorage?.setItem(RELOAD_KEY, "1");
            window.location.reload();
            // Nie auflösendes Promise: Seite lädt gerade neu.
            return await new Promise<{ default: T }>(() => {});
          }
        }
        throw err;
      }
    }
  });
}
