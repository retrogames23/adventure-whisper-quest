import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * Nimmt Blockfall-Ergebnisse entgegen. Der Client darf NICHT mehr direkt in
 * `blockfall_scores` schreiben — alle Werte werden hier serverseitig geprüft
 * und plausibilisiert, bevor sie mit Service-Rolle eingetragen werden.
 */
function json(status: number, data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Höchstmögliche Punktzahl für eine gegebene Zeilenzahl (großzügig). */
function maxScoreFor(lines: number, level: number): number {
  return lines * 325 * level + 100;
}

export const Route = createFileRoute("/api/public/blockfall-score")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabasePub = process.env.SUPABASE_PUBLISHABLE_KEY;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabasePub || !serviceKey) {
          return json(500, { error: "Server nicht konfiguriert." });
        }

        const authHeader = request.headers.get("authorization") ?? "";
        const userToken = authHeader.replace(/^Bearer\s+/i, "").trim();
        if (!userToken) return json(401, { error: "Anmeldung erforderlich." });

        const userClient = createClient(supabaseUrl, supabasePub, {
          global: { headers: { Authorization: `Bearer ${userToken}` } },
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: u, error: authErr } =
          await userClient.auth.getUser(userToken);
        const uid = u?.user?.id;
        if (authErr || !uid) return json(401, { error: "Ungültiges Token." });

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json(400, { error: "Ungültiger Request." });
        }
        const raw = (body ?? {}) as Record<string, unknown>;

        const displayNameRaw =
          typeof raw.display_name === "string" ? raw.display_name : "";
        const display_name = displayNameRaw.trim().slice(0, 40);
        if (!display_name) return json(400, { error: "Name fehlt." });

        const num = (v: unknown) =>
          typeof v === "number" && Number.isFinite(v) ? Math.floor(v) : NaN;

        const linesIn = num(raw.lines);
        const scoreIn = num(raw.score);
        if (Number.isNaN(linesIn) || Number.isNaN(scoreIn)) {
          return json(400, { error: "Ungültige Werte." });
        }

        // Server berechnet Level aus Zeilen; Client-Level wird ignoriert.
        const lines = Math.max(0, Math.min(5000, linesIn));
        const level = Math.max(1, Math.min(99, Math.floor(lines / 10) + 1));
        const maxScore = maxScoreFor(lines, level);
        if (scoreIn <= 0 || scoreIn > maxScore) {
          return json(400, { error: "Ergebnis nicht plausibel." });
        }
        const score = scoreIn;

        const admin = createClient(supabaseUrl, serviceKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { error } = await admin.from("blockfall_scores").insert({
          user_id: uid,
          display_name,
          score,
          lines,
          level,
        });
        if (error) {
          console.error("blockfall score insert failed", error);
          return json(500, { error: "Eintrag fehlgeschlagen." });
        }
        return json(200, { ok: true, score, lines, level });
      },
    },
  },
});
