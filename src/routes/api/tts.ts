import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * ElevenLabs Text-to-Speech proxy.
 * Receives { voiceId, text } and returns the MP3 bytes.
 * Keeps ELEVENLABS_API_KEY server-side.
 *
 * Requires a valid Supabase Bearer token in the Authorization header
 * to prevent unauthenticated callers from draining the ElevenLabs quota.
 */
export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "ELEVENLABS_API_KEY not configured" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        // ── Authentication ───────────────────────────────────────────
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
          return new Response(
            JSON.stringify({ error: "Server auth misconfigured" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
        const authHeader = request.headers.get("authorization") ?? "";
        if (!authHeader.startsWith("Bearer ")) {
          return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
          );
        }
        const token = authHeader.slice("Bearer ".length).trim();
        if (!token) {
          return new Response(
            JSON.stringify({ error: "Authentication required" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
          );
        }
        const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: claimsData, error: claimsError } =
          await supabase.auth.getClaims(token);
        if (claimsError || !claimsData?.claims?.sub) {
          return new Response(
            JSON.stringify({ error: "Invalid or expired session" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
          );
        }

        let body: { voiceId?: string; text?: string; pitch?: number; speed?: number };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const voiceId = body.voiceId;
        const text = body.text;
        if (!voiceId || typeof voiceId !== "string" || voiceId.length > 64) {
          return new Response(JSON.stringify({ error: "Invalid voiceId" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        if (!text || typeof text !== "string" || text.length === 0 || text.length > 2000) {
          return new Response(JSON.stringify({ error: "Invalid text (1-2000 chars)" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const speed = typeof body.speed === "number"
          ? Math.max(0.7, Math.min(1.2, body.speed))
          : 1.0;

        const elResp = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.55,
                similarity_boost: 0.8,
                style: 0.35,
                use_speaker_boost: true,
                speed,
              },
            }),
          },
        );

        if (!elResp.ok) {
          const errText = await elResp.text();
          // Log details server-side only; never forward upstream provider
          // internals (rate-limit info, plan tier, model errors) to clients.
          console.error("ElevenLabs TTS failed", elResp.status, errText);
          let userMessage = "TTS service temporarily unavailable";
          if (elResp.status === 429) userMessage = "Rate limit exceeded, please try again later";
          else if (elResp.status === 400) userMessage = "Invalid TTS request";
          else if (elResp.status === 401 || elResp.status === 403)
            userMessage = "TTS service authentication failed";
          return new Response(
            JSON.stringify({ error: userMessage }),
            { status: 502, headers: { "Content-Type": "application/json" } },
          );
        }

        const audio = await elResp.arrayBuffer();
        return new Response(audio, {
          status: 200,
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});