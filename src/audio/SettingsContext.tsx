import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isDevMode } from "@/dev/devMode";

// v3: Im Dev-Modus (?dev=1) startet die Musik standardmäßig aus.
// Key-Bump erzwingt, dass bestehende Spieler die neue Voreinstellung
// übernehmen — sonst würde der alte v2-Eintrag die Dev-Default-Logik
// überschreiben.
const STORAGE_KEY = "schmerz-radio.settings.v3";

export interface Settings {
  musicEnabled: boolean;
  ttsEnabled: boolean;
  musicVolume: number; // 0..1
  sfxVolume: number; // 0..1
}

const DEFAULTS: Settings = {
  musicEnabled: true,
  // Standardmäßig aus, solange die Dialoge noch nicht final sind
  // (TTS-Credits sollen nicht für Zwischenversionen verbraucht werden).
  ttsEnabled: false,
  musicVolume: 0.45,
  sfxVolume: 0.7,
};

interface Ctx extends Settings {
  set: (patch: Partial<Settings>) => void;
  toggleMusic: () => void;
  toggleTts: () => void;
}

const SettingsCtx = createContext<Ctx | null>(null);

function load(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Im Dev-Modus ohne gespeicherte Einstellungen startet die Musik aus.
      return { ...DEFAULTS, musicEnabled: !isDevMode() };
    }
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Settings>(() => load());

  useEffect(() => {
    // Nach der Hydration korrigieren: Im Dev-Modus ohne gespeicherte
    // Einstellungen soll die Musik aus bleiben (SSR kennt keinen Dev-Modus).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw && isDevMode()) {
        setState((s) => ({ ...s, musicEnabled: false }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const set = useCallback(
    (patch: Partial<Settings>) => setState((s) => ({ ...s, ...patch })),
    [],
  );

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      set,
      toggleMusic: () => set({ musicEnabled: !state.musicEnabled }),
      toggleTts: () => set({ ttsEnabled: !state.ttsEnabled }),
    }),
    [state, set],
  );

  return <SettingsCtx.Provider value={value}>{children}</SettingsCtx.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}