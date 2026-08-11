import { useState } from "react";
import { useGame } from "@/game/GameContext";
import { LIBRARY_BOOKS } from "@/game/libraryE71Books";

/**
 * Dev-only Bücher-Switcher: Öffnet jedes im Spiel lesbare Buch direkt,
 * unabhängig davon, ob Layard es schon gefunden hat. Zusätzlich wird der
 * Bestand der Bewohnerbibliothek (E71, Raum 1101) als Katalog gelistet —
 * diese Titel haben noch keinen Lesetext.
 */
export function BookSwitcher() {
  const { api, openHandbook } = useGame();
  const [open, setOpen] = useState(false);

  const readable: { label: string; note: string; open: () => void }[] = [
    {
      label: "E67-Handbuch (Auszug)",
      note: "Bewohner-Heft, 7. rev. Fassung",
      open: () => openHandbook(),
    },
    {
      label: "Sektoren-Almanach 1997",
      note: "Wandregal, Layards Wohnung",
      open: () => api.openAlmanach(),
    },
    {
      label: "Die kürzeste Geschichte der Menschheit",
      note: "Wandregal, Layards Wohnung",
      open: () => api.openHistoryBook(),
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Dev: Bücher öffnen"
        className="fixed bottom-4 left-[22rem] z-[9998] flex h-10 w-10 items-center justify-center rounded-full border border-amber-glow/60 bg-background/80 font-mono-crt text-base text-amber-glow shadow-lg hover:bg-amber-glow/15"
      >
        📚
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/70 px-4 py-12"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-sm border border-amber-glow/60 bg-background p-4 shadow-[0_0_60px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="font-display text-sm uppercase tracking-[0.3em] text-amber-glow amber-glow">
                Dev · Bücher
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono-crt text-xs uppercase text-muted-foreground hover:text-amber-glow"
              >
                schließen
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-1 font-mono-crt text-sm">
              <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Lesbar
              </div>
              <ul className="mb-3 space-y-1">
                {readable.map((b) => (
                  <li key={b.label}>
                    <button
                      type="button"
                      onClick={() => {
                        b.open();
                        setOpen(false);
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-sm border border-amber-glow/20 px-3 py-2 text-left text-foreground transition hover:border-amber-glow/60 hover:bg-amber-glow/10"
                    >
                      <span className="truncate">{b.label}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {b.note}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Bibliothek E71 · Katalog (Katalogeintrag)
              </div>
              <ul className="space-y-1">
                {LIBRARY_BOOKS.map((b) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        api.showText([
                          `„${b.title}“ — ${b.author}, ${b.year}.`,
                          b.blurb,
                          b.openToOutsiders
                            ? "Grüner Punkt: auch für Bewohner anderer Gebäude ausleihbar."
                            : "Kein grüner Punkt: Präsenzbestand, nur am Lesetisch.",
                        ]);
                      }}
                      className="w-full rounded-sm border border-amber-glow/20 px-3 py-2 text-left text-muted-foreground transition hover:border-amber-glow/60 hover:bg-amber-glow/10"
                    >
                      <div className="truncate text-foreground/80">{b.title}</div>
                      <div className="text-xs">
                        {b.author} · {b.year} ·{" "}
                        {b.openToOutsiders ? "ausleihbar" : "Präsenzbestand"}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
