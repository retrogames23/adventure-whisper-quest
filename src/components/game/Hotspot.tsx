import { useGame } from "@/game/GameContext";
import type { Hotspot as HotspotType } from "@/game/types";

interface Props {
  hotspot: HotspotType;
}

export function Hotspot({ hotspot }: Props) {
  const { api, setCaption, flags } = useGame();

  if (hotspot.requires?.some((f) => !flags.has(f))) return null;
  if (hotspot.hiddenWhen?.some((f) => flags.has(f))) return null;
  if (hotspot.visible && !hotspot.visible(api)) return null;

  return (
    <button
      type="button"
      onMouseEnter={() => setCaption(hotspot.label)}
      onMouseLeave={() => setCaption(null)}
      onFocus={() => setCaption(hotspot.label)}
      onBlur={() => setCaption(null)}
      onClick={() => {
        setCaption(null);
        hotspot.onUse(api);
      }}
      aria-label={hotspot.label}
      className="absolute z-20 cursor-crosshair rounded-sm border border-amber-glow/0 transition-colors duration-200 hover:border-amber-glow/80 hover:bg-amber-glow/10 focus:border-amber-glow/80 focus:bg-amber-glow/10 focus:outline-none"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.w}%`,
        height: `${hotspot.h}%`,
      }}
    />
  );
}