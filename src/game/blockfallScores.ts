import { supabase } from "@/integrations/supabase/client";
import { ensureAuthSession, getDisplayName, getShiftNumber } from "@/multiplayer/identity";

export interface BlockfallScoreRow {
  id: string;
  display_name: string;
  score: number;
  lines: number;
  level: number;
  created_at: string;
}

const LOCAL_KEY = "e67.blockfall.highscore";

/** Persönlicher Bestwert (lokal im Browser). */
export function readLocalHighscore(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(LOCAL_KEY);
  const n = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Schreibt den Bestwert, wenn er geschlagen wurde. Gibt true zurück, wenn neu. */
export function writeLocalHighscore(score: number): boolean {
  if (typeof window === "undefined") return false;
  if (score <= readLocalHighscore()) return false;
  window.localStorage.setItem(LOCAL_KEY, String(score));
  return true;
}

/** Top-Einträge der spielerübergreifenden Bestenliste. */
export async function fetchLeaderboard(limit = 10): Promise<BlockfallScoreRow[]> {
  const { data, error } = await supabase
    .from("blockfall_scores")
    .select("id, display_name, score, lines, level, created_at")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("blockfall leaderboard failed", error);
    return [];
  }
  return (data ?? []) as BlockfallScoreRow[];
}

/** Trägt ein Ergebnis ein (legt bei Bedarf eine anonyme Sitzung an). */
export async function submitScore(entry: {
  score: number;
  lines: number;
  level: number;
}): Promise<boolean> {
  if (entry.score <= 0) return false;
  const session = await ensureAuthSession();
  if (!session) return false;
  const display_name = getDisplayName({
    user: { id: session.userId, email: session.email, is_anonymous: session.isAnonymous },
    shiftNumber: getShiftNumber(),
  });
  const token = await getFreshAccessToken();
  if (!token) return false;
  try {
    // Die eigentliche Prüfung passiert serverseitig; der Client darf nicht
    // mehr direkt in die Bestenliste schreiben.
    const res = await fetch("/api/public/blockfall-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        score: Math.floor(entry.score),
        lines: Math.floor(entry.lines),
        display_name,
      }),
    });
    if (!res.ok) {
      console.error("blockfall score submit failed", res.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("blockfall score submit failed", e);
    return false;
  }
}
