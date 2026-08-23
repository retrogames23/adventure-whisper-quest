// Schmerz-Radio – statische Daten und Konstanten.
// Aus RadioPanel.tsx ausgelagert, damit das große Render-Modul kleiner
// bleibt und die Konstanten nicht pro Render neu evaluiert werden müssen.

export type BandStyle =
  | "panic"
  | "lonely"
  | "grief"
  | "angel"
  | "longing"
  | "noise"
  | "off";

export interface RadioBand {
  from: number;
  to: number;
  label: string;
  art: string;
  style: BandStyle;
  color: string;
}

export const BANDS: RadioBand[] = [
  { from: 100.0, to: 101.9, label: "Angst / Panik", art: "Statisch, zitternd", style: "panic", color: "bg-destructive" },
  { from: 102.0, to: 103.4, label: "Einsamkeit", art: "Dumpf, wogend", style: "lonely", color: "bg-phosphor-dim" },
  { from: 103.5, to: 104.5, label: "Trauer", art: "Fließend, warm", style: "grief", color: "bg-amber-glow/70" },
  { from: 104.6, to: 104.6, label: "Engel-Trauer", art: "Kristallklar, tief", style: "angel", color: "bg-amber-glow" },
  { from: 105.0, to: 106.5, label: "Sehnsucht", art: "Pulsierend", style: "longing", color: "bg-primary" },
  { from: 107.0, to: 108.0, label: "Gestörte Signale", art: "Rauschen", style: "noise", color: "bg-muted-foreground" },
];

export const BURNED_NOISE_BAND: RadioBand = {
  from: 104.6,
  to: 104.6,
  label: "— Rauschen —",
  art: "Träger ausgefallen",
  style: "noise",
  color: "bg-muted-foreground",
};

export function bandFor(freq: number): RadioBand | null {
  return BANDS.find((b) => freq >= b.from && freq <= b.to) ?? null;
}
