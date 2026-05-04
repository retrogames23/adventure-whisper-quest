import { useEffect, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import { CloseButton } from "./CloseButton";
import { usePubPresence, PUB_MAX_SEATS } from "@/multiplayer/usePubPresence";
import { usePubChat } from "@/multiplayer/usePubChat";

export function PubOverlay() {
  const game = useGame();
  const active = game.scene === "pub";
  const presence = usePubPresence(active);
  const chat = usePubChat(active);
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9 });
  }, [chat.messages.length]);

  if (!active) return null;

  const seatedCount = presence.seats.filter(Boolean).length;
  const isFull = seatedCount >= PUB_MAX_SEATS && presence.mySeat === null;

  async function onSend() {
    if (!presence.me) return;
    const r = await chat.send({
      userId: presence.me.userId,
      displayName: presence.me.displayName,
      seatIndex: presence.mySeat,
      shiftNumber: presence.me.shiftNumber,
      text: input,
      isAnonymous: presence.me.isAnonymous,
    });
    if (r.ok) { setInput(""); setErr(null); }
    else setErr(r.error ?? "Fehler.");
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex max-h-[55%] flex-col border-t border-amber-glow/40 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-amber-glow/20 px-4 py-2 pr-12">
        <span className="font-mono-crt text-xs uppercase tracking-widest text-amber-glow">
          Kneipe „Zum stillen Funk“ · {seatedCount}/{PUB_MAX_SEATS} besetzt
          {presence.me ? ` · du bist Schicht ${presence.me.shiftNumber}` : ""}
        </span>
        <span className="absolute right-2 top-2">
          <CloseButton onClick={() => game.api.goTo("passage")} label="Kneipe verlassen" />
        </span>
      </div>

      <div className="flex flex-1 min-h-0 gap-2 p-3">
        {/* Sitzplätze */}
        <div className="flex w-48 shrink-0 flex-col gap-1">
          {presence.seats.map((occ, i) => {
            const mine = presence.mySeat === i;
            return (
              <button
                key={i}
                disabled={!presence.ready || (!!occ && !mine)}
                onClick={() => (mine ? presence.leaveSeat() : presence.takeSeat(i))}
                className={`rounded-sm border px-2 py-1 text-left font-mono-crt text-xs uppercase tracking-widest transition ${
                  mine
                    ? "border-phosphor bg-phosphor/15 text-phosphor"
                    : occ
                      ? "border-amber-glow/40 bg-amber-glow/5 text-foreground"
                      : "border-border bg-background/60 text-muted-foreground hover:bg-amber-glow/5"
                }`}
              >
                {`Hocker ${i + 1}: `}
                {mine ? "du · aufstehen" : occ ? `${occ.displayName}` : "frei · setzen"}
              </button>
            );
          })}
          {isFull && (
            <p className="mt-2 font-display text-xs italic text-rust">
              Voll. Drinnen lärmt es.
            </p>
          )}
        </div>

        {/* Chat */}
        <div className="flex flex-1 min-w-0 flex-col">
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto rounded-sm border border-border bg-background/60 p-2">
            {chat.messages.length === 0 && (
              <p className="font-display text-sm italic text-muted-foreground">
                Stille. Nur das Brummen der Leuchtstoffröhre.
              </p>
            )}
            {chat.messages.map((m) => (
              <div key={m.id} className="mb-1 font-display text-sm leading-snug">
                <span className="font-mono-crt text-xs uppercase tracking-widest text-amber-glow">
                  {m.displayName}:
                </span>{" "}
                <span className="text-foreground">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
              maxLength={240}
              placeholder={presence.mySeat === null ? "Erst auf einen Hocker setzen …" : "Sag was."}
              disabled={presence.mySeat === null}
              className="flex-1 rounded-sm border border-border bg-background/80 px-2 py-1 font-display text-sm text-foreground placeholder:text-muted-foreground/60 disabled:opacity-50"
            />
            <button
              onClick={onSend}
              disabled={presence.mySeat === null || !input.trim()}
              className="rounded-sm border border-amber-glow/50 bg-amber-glow/10 px-3 py-1 font-mono-crt text-xs uppercase tracking-widest text-amber-glow disabled:opacity-40"
            >
              Senden
            </button>
          </div>
          {err && <p className="mt-1 font-mono-crt text-xs text-rust">{err}</p>}
        </div>
      </div>
    </div>
  );
}