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

// v3: Gespeicherte Einstellungen für reguläre Spielaufrufe.
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
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Server und erster Browser-Render müssen identisch sein. Audio bleibt bis
  // nach der Hydration aus; danach gelten gespeicherte Einstellungen nur
  // außerhalb der Dev-Preview.
  const [state, setState] = useState<Settings>(() => ({
    ...DEFAULTS,
    musicEnabled: false,
  }));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(isDevMode() ? { ...load(), musicEnabled: false } : load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [hydrated, state]);

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