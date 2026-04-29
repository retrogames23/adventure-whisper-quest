import type { ChatMsg } from "./runtime";

/**
 * Globaler Singleton-Loader für das lokale WebLLM-Modell.
 * Kann jederzeit (z.B. vom Titelbildschirm) heimlich gestartet werden,
 * unterstützt mehrere Subscriber für Fortschritt und ist abbrechbar.
 *
 * Wichtig: Ein einmal geladenes Modell bleibt im Speicher — ein Cancel
 * verwirft den Lade-Prozess, das Engine-Objekt wird gelöscht.
 */

export type LoadPhase = "idle" | "loading" | "ready" | "error" | "cancelled";

export interface LoadProgress {
  phase: LoadPhase;
  /** 0..1 wenn bekannt */
  pct?: number;
  /** Menschenlesbarer Status (z.B. „Lade Modell-Gewichte …") */
  text: string;
  /** Fehlertext, falls phase === "error" */
  error?: string;
}

type Engine = {
  reload: (model: string) => Promise<void>;
  chat: {
    completions: {
      create: (args: {
        messages: ChatMsg[];
        temperature?: number;
        max_tokens?: number;
        stream?: false;
      }) => Promise<{
        choices: Array<{ message: { content?: string | null } }>;
      }>;
    };
  };
};

// Modell-Kaskade: gutes Deutsch zuerst, bei VRAM-Mangel kleiner werden.
// 8B (~4–5 GB) → 3B (~2 GB) → 1B (~700 MB).
const MODEL_CASCADE = [
  "Llama-3.1-8B-Instruct-q4f16_1-MLC",
  "Llama-3.2-3B-Instruct-q4f16_1-MLC",
  "Llama-3.2-1B-Instruct-q4f16_1-MLC",
];

let engine: Engine | null = null;
let loadingPromise: Promise<Engine> | null = null;
let cancelled = false;
const subscribers = new Set<(p: LoadProgress) => void>();

let current: LoadProgress = {
  phase: "idle",
  text: "Modell noch nicht geladen.",
};

// ----- Gate: erst laden, wenn das Spiel "essential assets" geladen hat. -----
// Wir warten auf ein externes Signal (GameContext setzt es nach dem ersten
// erfolgreich gerenderten Raum). Solange das Gate `false` ist, blockiert
// `startLocalLlmLoad()` und stellt den Lade-Vorgang zurück.
let essentialAssetsReady = false;
const gateWaiters = new Set<() => void>();

/**
 * Vom Spiel aufzurufen, sobald die ersten Spiel-Assets (Hintergrundbild
 * der Startszene etc.) im Browser angekommen sind.
 */
export function markEssentialAssetsLoaded() {
  if (essentialAssetsReady) return;
  essentialAssetsReady = true;
  for (const w of gateWaiters) w();
  gateWaiters.clear();
}

function waitForEssentialAssets(): Promise<void> {
  if (essentialAssetsReady) return Promise.resolve();
  return new Promise((resolve) => gateWaiters.add(resolve));
}

/**
 * Führt `cb` aus, sobald der Browser-Hauptthread Ruhe hat.
 * Fallback: 2 s `setTimeout`, damit dem Spiel ein Vorsprung beim Laden
 * der Szene gegeben wird.
 */
function whenIdle(cb: () => void): () => void {
  type IdleHandle = number;
  type IdleWindow = Window & {
    requestIdleCallback?: (
      cb: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
      opts?: { timeout?: number },
    ) => IdleHandle;
    cancelIdleCallback?: (handle: IdleHandle) => void;
  };
  if (typeof window === "undefined") {
    cb();
    return () => {};
  }
  const w = window as IdleWindow;
  if (typeof w.requestIdleCallback === "function") {
    const handle = w.requestIdleCallback(() => cb(), { timeout: 8000 });
    return () => {
      if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(handle);
    };
  }
  const t = window.setTimeout(cb, 2000);
  return () => window.clearTimeout(t);
}

function emit(next: Partial<LoadProgress>) {
  current = { ...current, ...next };
  for (const s of subscribers) s(current);
}

export function getProgress(): LoadProgress {
  return current;
}

export function subscribe(fn: (p: LoadProgress) => void): () => void {
  subscribers.add(fn);
  fn(current);
  return () => subscribers.delete(fn);
}

export function isWebGpuAvailable(): boolean {
  return typeof navigator !== "undefined" && "gpu" in (navigator as object);
}

/**
 * Bittet den Browser, den Origin-Storage (IndexedDB / Cache Storage, wo
 * WebLLM die Modell-Gewichte ablegt) als „persistent" zu markieren.
 * Damit wird er nicht mehr unter Speicherdruck automatisch geleert —
 * der nächste Spielstart kann das Modell aus dem Cache rehydrieren,
 * statt die GB-große Datei erneut zu ziehen.
 *
 * Best effort: schlägt still fehl, wenn der Browser die API nicht hat
 * oder die Anfrage ablehnt. Idempotent.
 */
let persistRequested = false;
export async function requestPersistentModelCache(): Promise<void> {
  if (persistRequested) return;
  persistRequested = true;
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.storage &&
      typeof navigator.storage.persist === "function"
    ) {
      const already = await navigator.storage.persisted?.().catch(() => false);
      if (!already) {
        await navigator.storage.persist();
      }
    }
  } catch {
    /* ignore — Cache-Persistenz ist eine Optimierung, kein Muss. */
  }
}

/**
 * Startet das Laden, falls noch nicht passiert. Mehrfach-Aufrufe
 * teilen sich denselben Promise.
 */
export function startLocalLlmLoad(): Promise<Engine> {
  if (engine) return Promise.resolve(engine);
  if (loadingPromise) return loadingPromise;
  if (!isWebGpuAvailable()) {
    const err = new Error("WebGPU nicht verfügbar.");
    emit({ phase: "error", text: "Kein WebGPU.", error: err.message });
    return Promise.reject(err);
  }

  cancelled = false;
  emit({
    phase: "loading",
    text: essentialAssetsReady
      ? "Initialisiere lokales Modell …"
      : "Wartet auf Spiel-Assets …",
    pct: 0,
    error: undefined,
  });

  loadingPromise = (async () => {
    // 1) Erst warten, bis der erste Raum geladen ist — sonst blockieren
    //    die GB-großen Modell-Downloads die Bandbreite für Spiel-Assets.
    await waitForEssentialAssets();
    if (cancelled) throw new Error("cancelled");

    // 2) Dann auf den nächsten Idle-Slot warten, damit der Hauptthread
    //    nicht beim Rendern der Szene blockiert wird.
    await new Promise<void>((resolve) => whenIdle(resolve));
    if (cancelled) throw new Error("cancelled");

    // 3) Browser bitten, den Modell-Cache persistent zu halten, damit
    //    der nächste Spielstart das Modell aus dem Cache lädt.
    void requestPersistentModelCache();

    emit({
      phase: "loading",
      text: "Initialisiere lokales Modell …",
      pct: 0,
    });

    const mod = await import("@mlc-ai/web-llm");
    if (cancelled) throw new Error("cancelled");
    const eng = new mod.MLCEngine({
      initProgressCallback: (report: { text: string; progress?: number }) => {
        if (cancelled) return;
        emit({
          phase: "loading",
          text: report.text,
          pct: typeof report.progress === "number" ? report.progress : current.pct,
        });
      },
    }) as unknown as Engine;
    let lastErr: unknown = null;
    let loaded = false;
    for (let i = 0; i < MODEL_CASCADE.length; i++) {
      if (cancelled) throw new Error("cancelled");
      const model = MODEL_CASCADE[i];
      try {
        if (i > 0) {
          emit({
            text: `Vorheriges Modell zu groß — versuche kleineres (${i + 1}/${MODEL_CASCADE.length}) …`,
            pct: 0,
          });
        }
        await eng.reload(model);
        loaded = true;
        break;
      } catch (e) {
        if (cancelled) throw new Error("cancelled");
        console.warn(`WebLLM model ${model} failed:`, e);
        lastErr = e;
      }
    }
    if (!loaded) throw lastErr ?? new Error("Kein Modell konnte geladen werden.");
    if (cancelled) throw new Error("cancelled");
    engine = eng;
    emit({ phase: "ready", text: "Lokales Modell bereit.", pct: 1 });
    return eng;
  })();

  loadingPromise.catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg === "cancelled") {
      emit({ phase: "cancelled", text: "Laden abgebrochen.", pct: undefined });
    } else {
      emit({ phase: "error", text: "Laden fehlgeschlagen.", error: msg });
    }
    loadingPromise = null;
  });

  return loadingPromise;
}

/**
 * Bricht einen laufenden Ladevorgang ab. Ein bereits geladenes Modell
 * bleibt erhalten. Nach Cancel kann später erneut `startLocalLlmLoad`
 * aufgerufen werden.
 */
export function cancelLocalLlmLoad() {
  if (engine) return; // schon fertig — nichts zu tun
  if (!loadingPromise) return;
  cancelled = true;
  loadingPromise = null;
  // Engine, das während Cancel evtl. noch entsteht, wird nicht referenziert.
  emit({ phase: "cancelled", text: "Laden abgebrochen.", pct: undefined });
}

export async function getLoadedEngineOrLoad(): Promise<Engine> {
  if (engine) return engine;
  return startLocalLlmLoad();
}

export function hasLoadedEngine(): boolean {
  return engine !== null;
}
