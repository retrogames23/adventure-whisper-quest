import { useEffect } from "react";
import { useGame } from "@/game/GameContext";
import { CloseButton } from "./CloseButton";

/**
 * Kondomautomat-Overlay in der Toilette von „Zum stillen Funk".
 * Drei Reihen: Kondome, Pfefferminzkaugummi, OP-Maske. Layard kauft
 * eine OP-Maske (Reihe 3) für 1 RM. Nach erstem Kauf ist Reihe 3 leer.
 */
export function CondomAutomatOverlay() {
  const { condomAutomatOpen, closeCondomAutomat, api } = useGame();

  useEffect(() => {
    if (!condomAutomatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCondomAutomat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [condomAutomatOpen, closeCondomAutomat]);

  if (!condomAutomatOpen) return null;

  const alreadyTook =
    api.hasFlag("tookMedMaskFromAutomat") || api.hasItem("medMask");

  const buyMask = () => {
    if (alreadyTook) return;
    api.addItem({
      id: "medMask",
      name: "Medizinische Maske",
      description:
        "OP-Maske aus dem Kondomautomaten im „stillen Funk“. Riecht leicht nach Plastik und Bier. Reicht, um in E71 durchgewunken zu werden.",
    });
    api.setFlag("tookMedMaskFromAutomat");
    closeCondomAutomat();
    setTimeout(() => {
      api.showText([
        "Layard wirft eine Reichsmark ein, dreht den Knopf von Reihe 3.",
        "Es klackt, eine zellophanverpackte Maske fällt in die Schublade.",
      ]);
    }, 80);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4"
      onClick={closeCondomAutomat}
      role="dialog"
      aria-label="Kondomautomat"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-sm border-2 border-emerald-400/60 bg-[#142a1a] p-5 text-emerald-100 shadow-[0_20px_80px_rgba(0,0,0,0.7)]"
      >
        <CloseButton
          onClick={closeCondomAutomat}
          tone="amber"
          label="Automat schließen"
          className="absolute right-2 top-2"
        />
        <div className="font-display text-[10px] uppercase tracking-[0.3em] text-emerald-300/70">
          Mintgrüner Automat · „Zum stillen Funk“
        </div>
        <h2 className="mt-1 font-display text-xl font-bold text-emerald-100">
          Reihe wählen
        </h2>
        <p className="mt-2 font-mono-crt text-xs leading-relaxed text-emerald-200/80">
          Drei Reihen, drei Knöpfe. Eine Reichsmark pro Zug.
        </p>

        <ul className="mt-4 space-y-2 font-mono-crt text-sm">
          <li className="rounded-sm border border-emerald-500/30 bg-black/30 px-3 py-2">
            <div className="text-emerald-200/90">Reihe 1 — Kondome</div>
            <div className="text-[11px] text-emerald-200/50">
              Drei Sorten, eine Sorte fehlt.
            </div>
          </li>
          <li className="rounded-sm border border-emerald-500/30 bg-black/30 px-3 py-2">
            <div className="text-emerald-200/90">Reihe 2 — Pfefferminzkaugummi</div>
            <div className="text-[11px] text-emerald-200/50">
              Verstaubte Schachteln. Steht seit Wochen.
            </div>
          </li>
          <li
            className={`rounded-sm border px-3 py-2 ${
              alreadyTook
                ? "border-emerald-500/20 bg-black/20 opacity-60"
                : "border-emerald-400/60 bg-emerald-500/10"
            }`}
          >
            <div className="text-emerald-100">
              Reihe 3 — OP-Maske{" "}
              <span className="text-[11px] text-emerald-300/70">· 1 RM</span>
            </div>
            <div className="text-[11px] text-emerald-200/60">
              Handgeschriebener Aufkleber: »OP-MASKE — 1 RM«.
            </div>
            <button
              type="button"
              onClick={buyMask}
              disabled={alreadyTook}
              className="mt-2 w-full rounded-sm border border-emerald-400/60 bg-emerald-500/15 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-emerald-100 hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {alreadyTook ? "▸ Reihe 3 ist leer" : "▸ Knopf von Reihe 3 drücken"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}