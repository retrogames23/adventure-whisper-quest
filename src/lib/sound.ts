/**
 * Minimaler Sound-Helper: cached <audio>-Elemente und spielt sie
 * vom Anfang ab. Stumme Browser/Autoplay-Verbote werden geschluckt,
 * damit der Spielfluss nie blockiert.
 */
const cache = new Map<string, HTMLAudioElement>();

export function playSound(src: string, volume = 0.6): void {
  if (typeof window === "undefined") return;
  let audio = cache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";
    cache.set(src, audio);
  }
  audio.volume = volume;
  try {
    audio.currentTime = 0;
  } catch {
    /* manche Browser werfen, solange noch nichts geladen ist */
  }
  audio.play().catch(() => {
    /* Autoplay-Block: ignorieren */
  });
}