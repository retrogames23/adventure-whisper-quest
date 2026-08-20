import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Wird aufgerufen, wenn der Nutzer das kaputte Overlay schließt. */
  onClose?: () => void;
}

interface State {
  error: Error | null;
}

/**
 * Fängt Fehler einzelner Overlays (Bücher, Terminal, Hilfe …) ab, damit ein
 * fehlgeschlagener Chunk oder ein Render-Fehler nicht das ganze Spiel in die
 * globale Fehlerseite ("Something went wrong") kippt.
 */
export class OverlayErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/85 p-6">
        <div className="max-w-md rounded-sm border border-amber-glow/60 bg-background p-5 text-center font-mono-crt text-sm text-foreground">
          <p className="mb-2 uppercase tracking-[0.2em] text-amber-glow">
            Nicht verfügbar
          </p>
          <p className="mb-4 text-muted-foreground">
            Dieser Inhalt konnte nicht geladen werden. Bitte noch einmal
            versuchen.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                this.setState({ error: null });
                this.props.onClose?.();
              }}
              className="border border-amber-glow/60 px-4 py-2 uppercase text-amber-glow hover:bg-amber-glow/15"
            >
              Schließen
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="border border-amber-glow/30 px-4 py-2 uppercase text-muted-foreground hover:text-amber-glow"
            >
              Neu laden
            </button>
          </div>
        </div>
      </div>
    );
  }
}
