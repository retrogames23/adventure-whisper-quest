# DSA-Kosten senken + Modellwahl prüfen

Ziel: die Kosten pro Spieler-Session deutlich senken, ohne dass die Meister-Erzählung spürbar schlechter wird. Auslöser: zwei legitime Spieler haben ~2,75 $ verursacht, vor allem durch viele Runden mit großem Prompt.

## 1. Runden-Limit für anonyme Spieler

Aktuell gilt: anonyme Spieler bekommen genau **ein** Abenteuer — aber innerhalb dieses Abenteuers **unbegrenzt viele Runden**. Genau das war der Kostentreiber (62 bzw. 48 Runden in einer Session).

Neu: ein Schnupper-Abenteuer endet nach **30 Meisterwenden**. Danach kommt die bestehende, freundliche Spenden-/Anmelde-Meldung (`code: "donation_required"`), kein harter Abbruch mitten im Satz. Die Zahl liegt in einer Konstante, damit sie leicht anpassbar ist.

## 2. History-Fenster kürzen

Das Default-Fenster ist 10 Nachrichten; jede Runde schickt also ~10 vorherige Nachrichten zusätzlich zum großen Lore-Block mit. Kürzung auf **6** (wie bei allen anderen Modellen bereits) spart grob 25–30 % ungecachte Prompt-Tokens. Die Kurz-Zusammenfassung im System-Prompt bleibt, der Erzählfaden reißt daher nicht.

## 3. Modellwahl (geprüft)

Aktuelle Preise (pro Mio. Tokens, OpenRouter, heute abgefragt):

| Modell | Input | Cache-Read | Output |
|---|---|---|---|
| anthropic/claude-haiku-4.5 (heute Standard) | 1,00 $ | 0,10 $ | 5,00 $ |
| google/gemini-3.8-flash | 0,75 $ | 0,075 $ | 3,75 $ |
| google/gemini-3.1-flash-lite | 0,25 $ | 0,025 $ | 1,50 $ |
| openai/gpt-5.6-luna | 0,20 $ | 0,02 $ | 1,20 $ |

Haiku 4.5 ist damit das **teuerste** der schnellen Modelle — rund 5x teurer als gpt-5.6-luna bei sehr ähnlichem Einsatzprofil (schnell, gutes Deutsch, Tool-Calls).

Vorschlag: **openai/gpt-5.6-luna wird der neue Standard** für Routine-Runden, Haiku 4.5 bleibt als wählbare Option erhalten (nicht donorOnly, damit niemand etwas verliert), Sonnet bleibt Premium. Erwartete Einsparung bei gleichem Spielverhalten: ~75–80 %.

Damit das sauber läuft: GPT-5.6-Modelle brauchen `reasoning_effort: "none"` im Request, sonst werden Anfragen mit Tools abgelehnt. Das wird beim Umstellen mit eingebaut.

Wenn dir ein Modellwechsel des Standards zu riskant ist: Punkt 1 und 2 allein bringen schon ~40 % — sag Bescheid, dann lasse ich Haiku als Default stehen.

## Technische Umsetzung

- `src/lib/aiModel.ts`
  - `AI_MODEL_DSA_MASTER` → `openai/gpt-5.6-luna`; Haiku 4.5 als eigener Eintrag in `DSA_MASTER_MODELS` (nicht donorOnly), Reihenfolge/Labels/Hints anpassen.
  - `DEFAULT_LIMITS.historyWindow` 10 → 6; Limits-Eintrag für `openai/gpt-5.6-luna` (maxTokens 800, historyWindow 6, maxToolRounds 4, useTools true). Haiku-Eintrag ebenfalls auf historyWindow 6.
  - Neues Feld `reasoningEffort?: "none"` in `ModelLimits` für GPT-5.6.
- `src/routes/api/public/dsa-master.ts` und `dsa-group.ts`
  - `reasoning_effort` aus den Limits in den OpenRouter-Body übernehmen, wenn gesetzt.
  - Neue Konstante `ANON_MAX_TURNS = 30`: bei `action === "turn"` ohne `uid` die bisherigen Meisterwenden des Abenteuers zählen und bei Überschreitung mit 402 + `code: "donation_required"` antworten.
- Bestehende `[dsa-cost]`-Telemetrie bleibt, damit die Wirkung messbar ist.
