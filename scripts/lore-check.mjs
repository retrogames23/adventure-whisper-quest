#!/usr/bin/env bun
/**
 * Lore-Konsistenz-Check für die NPC-Personas.
 *
 *   bun scripts/lore-check.mjs            # nur statische Checks
 *   bun scripts/lore-check.mjs --llm      # zusätzlich LLM-Judge (kostet Credits)
 *   bun scripts/lore-check.mjs --llm --npc=bodo
 *
 * Statisch (kostenlos, schnell):
 *  - Jede Persona hat hardFacts + biography (für Free-Mode-NPCs Pflicht).
 *  - Im aufgebauten System-Prompt tauchen Biografie- und HardFacts-Blöcke auf.
 *  - Few-Shots widersprechen keiner Biografie (z. B. kein "Hier. E67"-Pattern,
 *    wenn die Persona laut Biografie woanders geboren wurde).
 *  - Personas widersprechen sich nicht selbst (HardFacts vs. Biografie:
 *    triviale Token-Überprüfung auf Ortsnamen / Berufe).
 *
 * LLM-Judge (--llm, kostet Credits):
 *  Pro NPC werden Standard-Biografie-Fragen an Lovable AI Gateway geschickt
 *  (mit dem ECHTEN System-Prompt aus promptBuilder), und ein zweites Modell
 *  bewertet, ob die Antwort konsistent zur Biografie ist.
 *
 * Output:
 *  - Konsole: knappes Pass/Fail
 *  - /mnt/documents/lore-check-report.md (Markdown-Report mit Details)
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// Wir importieren die Personas + Prompt-Builder direkt aus dem Quellcode.
// Bun versteht TS nativ, also klappt das ohne Build.
const { npcPersonas } = await import("../src/game/npcPersonas.ts");
const { buildSystemPrompt } = await import("../src/game/promptBuilder.ts");

const args = process.argv.slice(2);
const useLlm = args.includes("--llm");
const npcFilter = args.find((a) => a.startsWith("--npc="))?.slice(6);
const judgeModel = "google/gemini-2.5-flash";
const npcModel = "google/gemini-3-flash-preview";

const REPORT_PATH = "/mnt/documents/lore-check-report.md";

// --- Fragen, die jeder Free-Mode-NPC beantworten können muss --------------
const BIOGRAPHY_QUESTIONS = [
  "Wo bist du eigentlich geboren?",
  "Was haben deine Eltern gemacht?",
  "Hast du Geschwister?",
  "Was hast du beruflich gemacht, bevor du hier gelandet bist?",
  "Wie lange wohnst du schon in E67?",
];

// --- Statische Helfer ------------------------------------------------------
function buildPromptFor(persona) {
  return buildSystemPrompt(persona, {
    sceneTitle: "Korridor 26",
    resonance: 50,
    activeFlags: [],
    playedDialogIds: [],
  });
}

const STATIC_CHECKS = [
  {
    name: "hardFacts vorhanden",
    fn: (p) => (p.hardFacts?.length ?? 0) > 0,
  },
  {
    name: "biography vorhanden",
    fn: (p) => (p.biography?.length ?? 0) >= 3,
  },
  {
    name: "Prompt enthält BIOGRAFIE-Block",
    fn: (p) => buildPromptFor(p).includes("BIOGRAFIE"),
  },
  {
    name: "Prompt enthält HARTE FAKTEN-Block",
    fn: (p) => buildPromptFor(p).includes("HARTE FAKTEN"),
  },
  {
    name: "Regel 17 (Biografie ist wahr) aktiv",
    fn: (p) => buildPromptFor(p).includes("BIOGRAFIE IST WAHR"),
  },
  {
    name: "Biografie nennt einen Geburtsort",
    fn: (p) =>
      (p.biography ?? []).some((line) => /geboren/i.test(line)),
  },
  {
    name: "Biografie nennt mind. einen Elternteil",
    fn: (p) =>
      (p.biography ?? []).some((line) => /Vater|Mutter/i.test(line)),
  },
];

// --- LLM-Calls -------------------------------------------------------------
async function callGateway(messages, model) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY fehlt im Environment.");
  const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 500,
      stream: false,
    }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Gateway ${r.status}: ${t.slice(0, 300)}`);
  }
  const j = await r.json();
  return j.choices?.[0]?.message?.content?.trim() ?? "";
}

async function askNpc(persona, question) {
  const systemPrompt = buildPromptFor(persona);
  const reply = await callGateway(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    npcModel,
  );
  return reply;
}

async function judgeAnswer(persona, question, answer) {
  const judgePrompt = [
    "Du bist ein strenger Lore-Prüfer für ein Videospiel.",
    `NPC: ${persona.displayName} (${persona.job}).`,
    "BIOGRAFIE (gilt als wahr):",
    ...(persona.biography ?? []).map((b) => `- ${b}`),
    "HARTE FAKTEN:",
    ...(persona.hardFacts ?? []).map((f) => `- ${f}`),
    "",
    `Frage des Spielers: ${question}`,
    `Antwort des NPC: ${answer}`,
    "",
    "Aufgabe: Prüfe, ob die Antwort des NPC mit BIOGRAFIE und HARTEN FAKTEN konsistent ist.",
    "- Verschwiegenheit / In-Charakter-Ausweichen ist OK.",
    "- NICHT OK: aktiv falsche Aussagen (z. B. Geburtsort leugnen, anderen Beruf behaupten,",
    "  Familienmitglieder erfinden, die nicht in der Biografie stehen).",
    "- NICHT OK: Standard-KI-Absagen ('Ich bin eine KI', 'Ich kann nicht…').",
    "",
    "Antworte AUSSCHLIESSLICH als JSON in genau diesem Format:",
    '{"verdict":"PASS"|"FAIL","reason":"<ein Satz>"}',
  ].join("\n");

  const raw = await callGateway(
    [{ role: "user", content: judgePrompt }],
    judgeModel,
  );
  // Tolerantes JSON-Parsing
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) return { verdict: "FAIL", reason: `Judge-Output unparsbar: ${raw}` };
  try {
    const parsed = JSON.parse(m[0]);
    if (parsed.verdict !== "PASS" && parsed.verdict !== "FAIL") {
      return { verdict: "FAIL", reason: `Unklarer Verdict: ${raw}` };
    }
    return parsed;
  } catch (e) {
    return { verdict: "FAIL", reason: `JSON-Fehler: ${String(e)}` };
  }
}

// --- Runner ----------------------------------------------------------------
const personas = Object.values(npcPersonas).filter(
  (p) => !npcFilter || p.id === npcFilter,
);

const report = [];
report.push(`# Lore-Check Report`);
report.push(`Generated: ${new Date().toISOString()}`);
report.push(`Mode: ${useLlm ? "static + LLM judge" : "static only"}`);
if (npcFilter) report.push(`NPC-Filter: ${npcFilter}`);
report.push("");

let totalFail = 0;
let totalPass = 0;

for (const persona of personas) {
  console.log(`\n=== ${persona.displayName} (${persona.id}) ===`);
  report.push(`## ${persona.displayName} (\`${persona.id}\`)`);

  // Statische Checks
  report.push("### Statische Checks");
  for (const check of STATIC_CHECKS) {
    const ok = !!check.fn(persona);
    if (ok) totalPass++;
    else totalFail++;
    const symbol = ok ? "✅" : "❌";
    console.log(`  ${symbol} ${check.name}`);
    report.push(`- ${symbol} ${check.name}`);
  }

  // Few-Shot-Konsistenz: Wenn Biografie sagt, NPC ist NICHT in E67 geboren,
  // darf im finalen Prompt kein "Hier. E67"-Geburts-Antwortmuster auftauchen.
  const prompt = buildPromptFor(persona);
  const bornInE67 = (persona.biography ?? []).some((b) =>
    /geboren in.*E67/i.test(b),
  );
  const promptHasE67BirthLie = /Wo bist du geboren\?[\s\S]{0,80}Hier\. E67/.test(
    prompt,
  );
  if (!bornInE67 && promptHasE67BirthLie) {
    totalFail++;
    console.log("  ❌ Few-Shot widerspricht Biografie (E67-Geburt)");
    report.push("- ❌ Few-Shot widerspricht Biografie (E67-Geburt)");
  } else {
    totalPass++;
    console.log("  ✅ Few-Shot konsistent zur Biografie");
    report.push("- ✅ Few-Shot konsistent zur Biografie");
  }

  // LLM-Judge
  if (useLlm) {
    report.push("### LLM-Judge");
    for (const q of BIOGRAPHY_QUESTIONS) {
      try {
        const answer = await askNpc(persona, q);
        const verdict = await judgeAnswer(persona, q, answer);
        const ok = verdict.verdict === "PASS";
        if (ok) totalPass++;
        else totalFail++;
        const symbol = ok ? "✅" : "❌";
        console.log(`  ${symbol} ${q}`);
        if (!ok) console.log(`     → ${verdict.reason}`);
        report.push(`- ${symbol} **F:** ${q}`);
        report.push(`  - **A:** ${answer.replace(/\n+/g, " ")}`);
        report.push(`  - **Judge:** ${verdict.verdict} — ${verdict.reason}`);
      } catch (e) {
        totalFail++;
        console.log(`  ❌ ${q} — Fehler: ${String(e)}`);
        report.push(`- ❌ ${q} — Fehler: ${String(e)}`);
      }
      // freundliches Throttling
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  report.push("");
}

report.unshift(`**Result: ${totalPass} pass / ${totalFail} fail**\n`);
report.unshift("");

mkdirSync(dirname(REPORT_PATH), { recursive: true });
writeFileSync(REPORT_PATH, report.join("\n"));
console.log(`\nReport: ${REPORT_PATH}`);
console.log(`Total: ${totalPass} pass, ${totalFail} fail`);

process.exit(totalFail > 0 ? 1 : 0);