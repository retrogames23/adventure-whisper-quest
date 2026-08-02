export interface ChatMsg {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Strukturierter Kontext, den der Server zum Bauen des System-Prompts
 * braucht. Niemals Freitext aus dem Client einfließen lassen.
 */
export type LlmContext =
  | {
      kind: "persona";
      sceneTitle: string;
      resonance: number;
      activeFlags: string[];
      playedDialogIds: string[];
      /**
       * ID des laufenden Spieldurchgangs (Save-Slot bzw. frischer Start).
       * Das NSC-Langzeitgedächtnis ist darauf beschränkt — ein neues Spiel
       * beginnt ohne Erinnerungen früherer Spielstände.
       */
      runId?: string;
      /**
       * Optionaler MARV-Zustand aus dem Spielstand. Wird nur bei
       * `npcId === "marv9"` genutzt; der Server nimmt diesen Wert als
       * `marvBefore` und schreibt ihn nicht mehr in die DB — die
       * Persistenz liegt beim Save-Slot.
       */
      marvState?: {
        empathyScore: number;
        unlocked: boolean;
        oiled: boolean;
        messageCount: number;
      };
    }
  | {
      kind: "bram";
      seatedCount: number;
      myShift: number | null;
    };

export interface LlmRuntimeStatus {
  kind: "local" | "cloud";
  ready: boolean;
  /** Optionaler Lade-Fortschritt (nur lokal). */
  loading?: { text: string; pct?: number };
  /** Hat sich der Modus wegen lokalem Fehler auf Cloud umgestellt? */
  fallback?: boolean;
  error?: string | null;
}

export interface LlmRuntime {
  status: LlmRuntimeStatus;
  send(
    messages: ChatMsg[],
    opts?: { signal?: AbortSignal; context?: LlmContext },
  ): Promise<string>;
  dispose?(): void;
}