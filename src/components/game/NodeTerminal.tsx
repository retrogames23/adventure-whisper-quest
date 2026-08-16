import { useEffect, useRef, useState } from "react";
import { useGame } from "@/game/GameContext";
import { useSettings } from "@/audio/SettingsContext";
import { playBeep, playKeypress } from "@/audio/sfx";
import {
  SECTOR_CHATTER,
  chatterDelayMs,
  chatterTimestamp,
} from "@/game/sectorChatter";
import { CloseButton } from "./CloseButton";

interface Line {
  text: string;
  kind?: "in" | "out" | "system" | "warn";
}

/**
 * Wartungsterminal hinter Tür 5610 — eigenes UI.
 *
 * NODE-MAINT 5610 ist KEIN Resonanz-Knoten (das wäre lore-widrig — es gibt
 * keine staatliche Resonanz-Infrastruktur), sondern der Vorgangsknoten der
 * Hausverwaltung E67: eine Datenfluss-Maschine, die jeden Vorgang im Haus
 * mitschreibt. Befehle: vorgang, mitschnitt, drucken, loeschlauf.
 * Alte Eingaben (tap/listen/burn) bleiben als Alias erhalten.
 */
export function NodeTerminal() {
  const { nodeOpen, closeNode, api, flags, ending } = useGame();
  const { sfxVolume } = useSettings();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const listenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listenIndexRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeOpen) return;
    const tapped = flags.has("tappedNode5610");
    const burned = flags.has("burnedNode5610");
    const status = burned
      ? "SPEICHER GELÖSCHT — keine Vorgänge"
      : "AKTIV — Vorgänge im Umlauf: 41";
    setLines([
      { text: "── NODE-MAINT 5610 · E67 ──────────────────", kind: "system" },
      { text: "── Vorgangsknoten der Hausverwaltung     ──", kind: "system" },
      { text: "── Gitter: 64 Knoten · Datenfluss, asynchron", kind: "system" },
      { text: "", kind: "out" },
      { text: `Status: ${status}`, kind: tapped || burned ? "warn" : "out" },
      { text: "", kind: "out" },
      { text: "Verfügbare Befehle:", kind: "system" },
      {
        text: "  vorgang    — Vorgangsliste E67 (letzte Monate)",
        kind: tapped ? "out" : "out",
      },
      {
        text: "  mitschnitt — laufender Vorgangsverkehr E67 ↔ Leitstelle",
        kind: "out",
      },
      {
        text: "  drucken    — Vorgangsstreifen ausgeben (Papier)",
        kind: "out",
      },
      {
        text: "  loeschlauf — Speicher löschen (irreversibel, ALARM)",
        kind: "warn",
      },
      { text: "  exit       — Terminal schließen", kind: "out" },
      { text: "", kind: "out" },
    ]);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [nodeOpen, flags]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Stop Listen-Loop sobald Terminal geschlossen wird ODER Komponente unmountet.
  // Vorher wurde der Timer nur während eines Renders mit nodeOpen=false beräumt,
  // wodurch nach Schließen weiter Geräusche/Zeilen kamen.
  useEffect(() => {
    if (!nodeOpen) {
      if (listenTimerRef.current) {
        clearTimeout(listenTimerRef.current);
        listenTimerRef.current = null;
      }
      setListening(false);
    }
    return () => {
      if (listenTimerRef.current) {
        clearTimeout(listenTimerRef.current);
        listenTimerRef.current = null;
      }
    };
  }, [nodeOpen]);

  // Sobald das Ending startet, brechen wir einen laufenden Listen-Loop
  // halten wir die Beeps stumm — die Chatter-Zeilen sollen aber als
  // stille Atmosphäre weiterlaufen (visuell, ohne Ton).
  const endingRef = useRef(false);
  useEffect(() => {
    endingRef.current = ending;
  }, [ending]);

  if (!nodeOpen) return null;

  const append = (more: Line[]) => setLines((p) => [...p, ...more]);

  const stopListening = (silent = false) => {
    if (listenTimerRef.current) {
      clearTimeout(listenTimerRef.current);
      listenTimerRef.current = null;
    }
    setListening(false);
    if (!silent) {
      append([
        { text: ">> listen: Mitschnitt beendet.", kind: "system" },
        { text: "", kind: "out" },
      ]);
    }
  };

  /** Mischt die Chatter-Liste neu durch (Fisher–Yates auf einer Kopie). */
  const shuffledChatter = () => {
    const arr = SECTOR_CHATTER.map((m) => m);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startListening = () => {
    setListening(true);
    const stream = shuffledChatter();
    listenIndexRef.current = 0;
    const tick = () => {
      const idx = listenIndexRef.current;
      const msg = stream[idx % stream.length];
      const ts = chatterTimestamp();
      // Einrückungen so wählen, dass von/an unterschiedlich gut lesbar bleiben.
      const header = `[${ts}]  ${msg.from}  →  ${msg.to}`;
      const body = `         » ${msg.text}«`;
      // Leiser Beep für Eingang — im Abspann stumm, damit nur die
      // Zeilen als Atmosphäre durchscrollen.
      if (!endingRef.current) playBeep(0.18 * sfxVolume);
      setLines((prev) => [
        ...prev,
        { text: header, kind: "system" },
        { text: body, kind: "out" },
      ]);
      listenIndexRef.current = idx + 1;
      listenTimerRef.current = setTimeout(tick, chatterDelayMs());
    };
    // Erstes Paket nach kurzer Anlaufzeit (1–2 s), damit der Banner sichtbar bleibt.
    listenTimerRef.current = setTimeout(tick, 1200);
  };

  const runScripted = (
    steps: { text: string; delayMs: number; kind?: Line["kind"]; beep?: boolean }[],
    done?: () => void,
  ) => {
    setBusy(true);
    let acc = 0;
    for (const step of steps) {
      acc += Math.max(0, step.delayMs);
      setTimeout(() => {
        if (step.beep) playBeep(0.25 * sfxVolume);
        setLines((prev) => [...prev, { text: step.text, kind: step.kind ?? "out" }]);
      }, acc);
    }
    setTimeout(() => {
      setLines((prev) => [...prev, { text: "", kind: "out" }]);
      setBusy(false);
      done?.();
      setTimeout(() => inputRef.current?.focus(), 30);
    }, acc + 60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    // Während gelauscht wird beendet jede Eingabe (auch leer) den Mitschnitt.
    if (listening) {
      const echo: Line = { text: `node-5610# ${input || ""}`, kind: "in" };
      setInput("");
      append([echo]);
      stopListening();
      return;
    }
    const raw = input.trim().toLowerCase();
    if (!raw) return;
    playBeep(0.4 * sfxVolume);
    const echo: Line = { text: `node-5610# ${input}`, kind: "in" };
    setInput("");

    if (raw === "exit" || raw === "quit" || raw === "logout") {
      append([echo, { text: ">> Verbindung zum Knoten geschlossen.", kind: "system" }]);
      setTimeout(() => closeNode(), 500);
      return;
    }

    if (raw === "help" || raw === "?") {
      append([
        echo,
        {
          text: "Befehle: vorgang | mitschnitt | drucken | loeschlauf | exit",
          kind: "out",
        },
        { text: "", kind: "out" },
      ]);
      return;
    }

    if (raw === "mitschnitt" || raw === "listen") {
      if (flags.has("burnedNode5610")) {
        append([
          echo,
          { text: "mitschnitt: Speicher gelöscht. Es läuft nichts mehr auf.", kind: "warn" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      append([
        echo,
        { text: ">> Öffne Mitleseanschluss am Vorgangsbus E67 …", kind: "system" },
        {
          text: ">> [Enter drücken, um den Mitschnitt zu beenden]",
          kind: "system",
        },
        { text: "", kind: "out" },
      ]);
      playBeep(0.3 * sfxVolume);
      startListening();
      return;
    }

    if (raw === "vorgang" || raw === "vorgaenge" || raw === "tap") {
      if (flags.has("burnedNode5610")) {
        append([
          echo,
          { text: "vorgang: Speicher gelöscht. Kein Bestand.", kind: "warn" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      if (flags.has("tappedNode5610")) {
        append([
          echo,
          { text: "vorgang: Liste bereits abgerufen. Sie ändert sich nicht.", kind: "out" },
          { text: "Mit 'drucken' gibt es sie auf Papier.", kind: "out" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      append([echo]);
      runScripted(
        [
          { text: ">> Öffne Bestand: HAUS E67 · lfd. Vorgänge …", delayMs: 0, kind: "system", beep: true },
          { text: ">> Zeitraum: 01/97 – heute. Sortierung: Abschlussvermerk.", delayMs: 420 },
          { text: ">> ─── VORGANGSLISTE E67 (Auszug) ───", delayMs: 380, kind: "system" },
          { text: "   Eingegangen gesamt:            41", delayMs: 340 },
          { text: "   davon Ruhezeit / Körperschall: 19", delayMs: 300 },
          { text: "   davon Türsiegel / Belegung:     9", delayMs: 300 },
          { text: "   davon Krankmeldung weitergel.:  7", delayMs: 300 },
          { text: "   davon Aufzug / Wartungssperre:  6", delayMs: 300 },
          { text: "   ─── Abschlussvermerke ───", delayMs: 380, kind: "system" },
          { text: "   »nicht vorgesehen«             34", delayMs: 360, kind: "warn" },
          { text: "   »zuständigkeitshalber zurück«   5", delayMs: 300, kind: "warn" },
          { text: "   sachlich beschieden:            2", delayMs: 300 },
          { text: "   Alle 34 mit derselben Paraphe abgezeichnet.", delayMs: 520, kind: "warn" },
          { text: "   ─── Einzelvorgang 5245 · Wohnung 2615 ───", delayMs: 420, kind: "system" },
          { text: "   14:22  Befund aufgenommen (Sanitätereinsatz).", delayMs: 340 },
          { text: "   14:26  Befund zurückgenommen — »Wahrnehmungsschwankung«.", delayMs: 420, kind: "warn" },
          { text: "   14:26  Beide Eintragungen: dieselbe Paraphe.", delayMs: 420, kind: "warn" },
          { text: "   ─── Beteiligte im Bestand ───", delayMs: 380, kind: "system" },
          { text: "   MARSCHKE, B.  — 12 eigenmächtige Wartungsfahrten", delayMs: 320, kind: "warn" },
          { text: "   ARLT, M. (4601) — 11 Beschwerden, alle geschlossen", delayMs: 320, kind: "warn" },
          { text: "   WORAG, L. (2611) — 3 Zutritte, heute", delayMs: 420, kind: "warn" },
          { text: ">> Kein Komplott im Bestand. Nur ein Haus, das weggeschrieben wird.", delayMs: 800, kind: "system" },
          { text: ">> Bestand bleibt geöffnet. 'drucken' gibt ihn auf Papier aus.", delayMs: 500, kind: "system", beep: true },
        ],
        () => {
          api.setFlag("tappedNode5610");
          api.setFlag("readVorgangsliste5610");
          api.setKnowledge("vorgangsspur5610");
        },
      );
      return;
    }

    if (raw === "drucken" || raw === "print") {
      if (flags.has("burnedNode5610")) {
        append([
          echo,
          { text: "drucken: Kein Bestand. Der Speicher ist gelöscht.", kind: "warn" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      if (!flags.has("readVorgangsliste5610") && !flags.has("tappedNode5610")) {
        append([
          echo,
          { text: "drucken: Kein Bestand geöffnet. Erst 'vorgang'.", kind: "out" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      if (flags.has("printedVorgangsstreifen")) {
        append([
          echo,
          { text: "drucken: Ausdruck liegt bereits vor. Einer genügt.", kind: "out" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      append([echo]);
      runScripted(
        [
          { text: ">> Nadeldrucker DK-4 :: Endlospapier eingezogen …", delayMs: 0, kind: "system", beep: true },
          { text: ">> Kopfzeile: HAUS E67 · BESTANDSAUSZUG · 5610", delayMs: 500 },
          { text: ">> 41 Zeilen. Abschlussvermerke mit abgedruckt.", delayMs: 520 },
          { text: ">> Streifen abgerissen.", delayMs: 600, kind: "system", beep: true },
        ],
        () => {
          api.setFlag("printedVorgangsstreifen");
          api.addItem({
            id: "vorgangsstreifen5610",
            name: "Vorgangsstreifen 5610",
            description:
              "Ein Endlospapier-Streifen aus dem Vorgangsknoten E67. 41 Zeilen, davon 34 mit demselben Abschlussvermerk: »nicht vorgesehen«. Darunter der Vorgang 5245 — Befund aufgenommen, vier Minuten später zurückgenommen, beide Zeilen mit derselben Paraphe. Ein Schriftstück, das man vorlegen kann.",
          });
          api.showText([
            "Der Drucker rattert, hält an, rattert weiter. Layard reißt den Streifen ab.",
            "[ Vorgangsstreifen 5610 eingesteckt. ]",
          ]);
        },
      );
      return;
    }

    if (raw === "loeschlauf" || raw === "löschlauf" || raw === "burn") {
      if (flags.has("burnedNode5610")) {
        append([
          echo,
          { text: "loeschlauf: bereits durchgeführt. Der Bestand ist weg.", kind: "warn" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      // Erste Eingabe = nur Warnung. Ausgeführt wird der Löschlauf erst
      // nach Bestätigung. So passiert es nicht aus Versehen.
      append([
        echo,
        { text: ">> WARNUNG: Der Löschlauf vernichtet den Bestand E67 irreversibel.", kind: "warn" },
        { text: ">> Danach ist nichts mehr belegbar — auch nicht Vorgang 5245.", kind: "warn" },
        { text: ">> Aber: MARSCHKE, ARLT und WORAG stehen dann in keiner Auswertung mehr.", kind: "warn" },
        { text: ">> Tippe 'loeschlauf bestaetigen' zum Ausführen.", kind: "out" },
        { text: ">> Tippe 'exit' zum Abbrechen.", kind: "out" },
        { text: "", kind: "out" },
      ]);
      return;
    }

    if (
      raw === "loeschlauf bestaetigen" ||
      raw === "löschlauf bestätigen" ||
      raw === "loeschlauf bestätigen" ||
      raw === "burn confirm"
    ) {
      if (flags.has("burnedNode5610")) {
        append([
          echo,
          { text: "loeschlauf: bereits durchgeführt. Der Bestand ist weg.", kind: "warn" },
          { text: "", kind: "out" },
        ]);
        return;
      }
      append([echo]);
      runScripted(
        [
          { text: ">> Löschlauf gestartet. Bestand E67 wird überschrieben.", delayMs: 0, kind: "warn", beep: true },
          { text: ">> Überspannung an PSU-1 — Gitter läuft heiß …", delayMs: 400, kind: "warn" },
          { text: ">> Rauchmelder Sektor 5/Tech: ALARM ausgelöst.", delayMs: 500, kind: "warn", beep: true },
          { text: ">> Vorgang 5245 :: GELÖSCHT.", delayMs: 500, kind: "warn" },
          { text: ">> 41 von 41 Zeilen :: GELÖSCHT.", delayMs: 500, kind: "warn" },
          { text: ">> Namen im Bestand :: KEINE.", delayMs: 600, kind: "system" },
          { text: ">> Lobby-Pult E67: eingehender Anruf an 001.", delayMs: 600, kind: "warn" },
          { text: ">> Querkopplung E67↔E71: GETRENNT.", delayMs: 500, kind: "warn", beep: true },
        ],
        () => {
          // Edge-Case-Schutz: Sollte der Spieler hier landen, bevor das
          // Klopf-Event mit Philippe getriggert wurde, holen wir die
          // Eröffnung der Story nach — der Alarm im Haus bringt die
          // Nachbarn ohnehin an die Türen.
          const needsPhilippeRecovery = !flags.has("doorbellRang");
          api.setFlag("burnedNode5610");
          api.setFlag("wipedNode5610");
          api.playBurnSequence();
          if (needsPhilippeRecovery) {
            api.setFlag("doorbellRang");
            api.setFlag("metPhilippe");
            // Klopf-Dialog reiht sich nach der BurnSequence ein.
            api.startDialog("philippeAtDoor");
          }
        },
      );
      return;
    }

    append([
      echo,
      { text: `Unbekannter Befehl: ${raw}. Tippe 'help'.`, kind: "out" },
      { text: "", kind: "out" },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/85 sm:items-center sm:px-4">
      <div className="fade-in relative flex h-full w-full flex-col overflow-hidden rounded-none border-0 border-amber-glow/40 bg-black shadow-[0_0_60px_rgba(0,0,0,0.85)] scanlines sm:h-auto sm:max-w-3xl sm:rounded-sm sm:border">
        <div className="flex items-center justify-between border-b border-amber-glow/30 bg-black px-4 py-2">
          <span className="font-mono-crt text-base uppercase tracking-[0.3em] text-amber-glow amber-glow">
            NODE-MAINT 5610
          </span>
          <CloseButton onClick={closeNode} tone="amber" label="Wartungsterminal schließen" />
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto bg-black px-4 py-3 font-mono-crt text-[15px] leading-relaxed crt-flicker sm:h-[55vh] sm:flex-none sm:text-base"
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "system"
                  ? "text-amber-glow amber-glow"
                  : l.kind === "warn"
                    ? "text-destructive"
                    : l.kind === "in"
                      ? "text-amber-glow"
                      : "text-amber-glow/70"
              }
            >
              {l.text || "\u00A0"}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-amber-glow/30 bg-black px-4 py-2"
        >
          <span className="font-mono-crt text-[15px] text-amber-glow amber-glow sm:text-sm">
            node-5610#
          </span>
          <input
            ref={inputRef}
            value={input}
            disabled={busy}
            onChange={(e) => {
              if (e.target.value.length > input.length) {
                playKeypress(0.3 * sfxVolume);
              }
              setInput(e.target.value);
            }}
            className="flex-1 bg-transparent font-mono-crt text-[15px] text-amber-glow caret-amber-glow outline-none disabled:opacity-40 placeholder:text-amber-glow/40 sm:text-base"
            placeholder={
              busy
                ? "… Ausgabe läuft …"
                : listening
                  ? "… Mitschnitt läuft. Enter beendet."
                  : "vorgang | mitschnitt | drucken | loeschlauf | exit"
            }
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}