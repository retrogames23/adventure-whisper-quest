#!/usr/bin/env bun
/**
 * Solvability-Check der Rätselkette bis Akt II.
 *
 *   bun run quest:solve            # Simulation + statische Auswertung
 *   bun run quest:solve --llm      # zusätzlich Lore- und Design-Judge
 *
 * Ebenen (siehe .lovable/plan/rätselkette-bis-akt-ii-prüfbar-machen):
 *   1. Kritischer Pfad aus src/game/questGraph.ts auf innere Schlüssigkeit.
 *   2. Headless-Simulator: Szenen-Hotspots und Dialogbäume werden mit einer
 *      Attrappe der GameApi wirklich ausgeführt (Fixpunkt + Zufalls-Läufe).
 *   3. Ballast-Report: Erreichbares, das nirgendwo einzahlt.
 *   4. Optional: LLM-Urteile zu Lore-Treue und Rätsel-Design.
 *
 * Report: /mnt/documents/quest-solve-report.md
 */

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const REPORT_PATH = "/mnt/documents/quest-solve-report.md";
const args = process.argv.slice(2);
const useLlm = args.includes("--llm");

const { scenes } = await import(ROOT + "src/game/scenes.ts");
const { dialogs } = await import(ROOT + "src/game/dialogs/index.ts");
const { HINT_QUESTS } = await import(ROOT + "src/game/hints.ts");
const {
  criticalPath,
  externalSteps,
  atmosphereWhitelist,
  startItems,
  GOAL_FLAG,
} = await import(ROOT + "src/game/questGraph.ts");

// Browser-Globals, die einzelne Hotspots anfassen (Audio, Timer, Storage).
globalThis.window ??= {
  setTimeout: (fn) => 0,
  clearTimeout: () => {},
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { origin: "http://localhost", href: "http://localhost/" },
  matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  navigator: { userAgent: "sim" },
};
globalThis.Audio ??= class { play() { return Promise.resolve(); } pause() {} };
globalThis.document ??= { createElement: () => ({ style: {} }), body: { appendChild: () => {} } };

const findings = { HARD: [], SOFT: [], INFO: [] };
const seenFindings = new Set();
const add = (sev, cat, msg) => {
  const key = `${sev}|${cat}|${msg}`;
  if (seenFindings.has(key)) return;
  seenFindings.add(key);
  findings[sev].push({ cat, msg });
};

// ══════════════════════════════════════════════════════════════════
// Ebene 1 — Kritischer Pfad in sich schlüssig?
// ══════════════════════════════════════════════════════════════════
function checkPathConsistency() {
  const produced = new Set(startItems);
  for (const ext of externalSteps) {
    for (const f of ext.gibt.flags ?? []) produced.add(f);
    for (const i of ext.gibt.items ?? []) produced.add(i);
  }
  for (const step of criticalPath) {
    for (const need of [
      ...(step.braucht.flags ?? []),
      ...(step.braucht.items ?? []),
    ]) {
      if (!produced.has(need)) {
        add(
          "HARD",
          "Kette unschlüssig",
          `Schritt "${step.id}" braucht "${need}", das kein früherer Schritt liefert.`,
        );
      }
    }
    for (const g of [...(step.gibt.flags ?? []), ...(step.gibt.items ?? [])]) {
      produced.add(g);
    }
  }
  if (!produced.has(GOAL_FLAG)) {
    add("HARD", "Kette unschlüssig", `Zielzustand "${GOAL_FLAG}" wird vom kritischen Pfad nie erreicht.`);
  }
}

// ══════════════════════════════════════════════════════════════════
// Ebene 2 — Headless-Simulator
// ══════════════════════════════════════════════════════════════════
function makeSim({ variant, monotone, radioActive, rng }) {
  const flags = new Set();
  const knowledge = new Set();
  const items = new Map(startItems.map((i) => [i, 1]));
  const paragraphs = new Set();
  const disclosures = new Map();
  const dialogQueue = [];
  const visitedScenes = new Set();
  const errors = [];
  const transcript = [];
  let brustStreak = variant === "win" ? 3 : 0;
  let duelHits = variant === "win" ? 2 : 0;

  const api = {
    goTo: (s) => visitedScenes.add(s),
    setFlag: (f) => flags.add(f),
    clearFlag: (f) => {
      if (!monotone) flags.delete(f);
    },
    hasFlag: (f) => flags.has(f),
    setKnowledge: (k) => knowledge.add(k),
    hasKnowledge: (k) => knowledge.has(k),
    setDisclosure: (k, c) => disclosures.set(k, c),
    getDisclosure: (k) => disclosures.get(k) ?? null,
    addItem: (item) => items.set(item.id, (items.get(item.id) ?? 0) + 1),
    hasItem: (id) => (items.get(id) ?? 0) > 0,
    getItemCount: (id) => items.get(id) ?? 0,
    removeItem: (id, n = 1) => {
      if (monotone) return;
      const left = (items.get(id) ?? 0) - n;
      if (left > 0) items.set(id, left);
      else items.delete(id);
    },
    showText: (lines, onClose) => {
      transcript.push({ kind: "text", lines });
      if (onClose) safe(() => onClose());
    },
    startDialog: (id) => dialogQueue.push(id),
    openTerminal: () => {},
    openRadio: () => {},
    openKeypad: () => {},
    openTelevision: () => {},
    openAmigaWorkbench: () => {},
    openAlmanach: () => {},
    openHistoryBook: () => {},
    openBook: () => {},
    closeBook: () => {},
    openNode5610: () => {},
    openPneumaticTube: () => {},
    openCondomAutomat: () => {},
    openParagraphenNotizbuch: () => {},
    openKantinenverordnung: () => {},
    hasParagraph: (id) => paragraphs.has(id),
    learnParagraph: (id) => paragraphs.add(id),
    getBrustWinStreak: () => brustStreak,
    bumpBrustWinStreak: () => ++brustStreak,
    resetBrustWinStreak: () => (brustStreak = 0),
    bumpDuelHit: () => ++duelHits,
    getDuelHits: () => duelHits,
    resetDuelHits: () => (duelHits = variant === "win" ? 2 : 0),
    markMarvOiled: () => {},
    isRadioActive: () => radioActive,
    setEnding: () => {},
    clearEnding: () => {},
    playBurnSequence: () => {},
    startCutscene: (id) => {
      transcript.push({ kind: "cutscene", id });
      // Cutscenes, die am Ende selbst einen Dialog starten.
      const follow = { miraRepair: "miraRepairScene" }[id];
      if (follow) runDialog(follow);
    },
    getMiraFloors: () => [3, 4, 5],
    getPhilippeFloor: () => 3,
    openDsaCreator: () => {},
    getDsaCharacter: () => null,
    clearDsaCharacter: () => {},
    getDsaSessionId: () => "sim",
    openDsaAdventure: () => {},
    getDsaBeat: () => null,
    setDsaBeat: () => {},
  };

  function safe(fn, label) {
    try {
      fn();
    } catch (e) {
      errors.push(`${label ?? "?"}: ${String(e).slice(0, 200)}`);
    }
  }

  const visibleByFlags = (o) =>
    (o.requires ?? []).every((f) => flags.has(f)) &&
    !(o.hiddenWhen ?? []).some((f) => flags.has(f));

  function runHotspot(scene, hs) {
    if (!visibleByFlags(hs)) return;
    if (hs.visible) {
      let ok = true;
      safe(() => (ok = !!hs.visible(api)), `visible ${scene.id}/${hs.id}`);
      if (!ok) return;
    }
    safe(() => hs.onUse(api), `hotspot ${scene.id}/${hs.id}`);
  }

  const enteredDialogs = new Set();

  function runDialog(id, depthGuard = new Set()) {
    enteredDialogs.add(id);
    const tree = dialogs[id];
    if (!tree) {
      add("HARD", "Dialog fehlt", `startDialog("${id}") verweist auf keinen Dialogbaum.`);
      return;
    }
    if (depthGuard.has(id)) return;
    depthGuard.add(id);
    if (tree.onStart) safe(() => tree.onStart(api), `onStart ${id}`);

    const seen = new Set();
    const walk = (lineId) => {
      if (!lineId || seen.has(lineId)) return;
      seen.add(lineId);
      const line = tree.lines[lineId];
      if (!line) {
        add("SOFT", "Dialog-Sackgasse", `Dialog "${id}" springt auf unbekannte Zeile "${lineId}".`);
        return;
      }
      const skipped = !visibleByFlags(line);
      if (!skipped) transcript.push({ kind: "line", dialog: id, speaker: line.speaker, text: line.text });
      let choices = line.choices;
      if (!choices && line.choicesFn) {
        safe(() => (choices = line.choicesFn(api)), `choicesFn ${id}/${lineId}`);
      }
      if (!skipped && choices) {
        for (const c of choices) {
          if (!visibleByFlags(c)) continue;
          if (c.requiresRadio && !radioActive) continue;
          if (c.action) safe(() => c.action(api), `choice ${id}/${lineId}`);
          if (c.nextDialog) {
            let target = c.nextDialog;
            if (typeof target === "function") safe(() => (target = target(api)), `nextDialog ${id}`);
            if (typeof target === "string") runDialog(target, depthGuard);
          }
          if (c.next) walk(c.next);
        }
      }
      if (line.next) walk(line.next);
    };
    walk(tree.start);
    if (tree.onEnd) safe(() => tree.onEnd(api), `onEnd ${id}`);
    depthGuard.delete(id);
  }

  function applyExternal() {
    for (const ext of externalSteps) {
      const v = ext.variant ?? "both";
      if (v !== "both" && v !== variant) continue;
      const ok =
        (ext.braucht.flags ?? []).every((f) => flags.has(f)) &&
        (ext.braucht.items ?? []).every((i) => (items.get(i) ?? 0) > 0);
      if (!ok) continue;
      for (const f of ext.gibt.flags ?? []) flags.add(f);
      for (const i of ext.gibt.items ?? []) items.set(i, (items.get(i) ?? 0) + 1);
    }
  }

  function snapshot() {
    return [...flags].sort().join("|") + "##" + [...items.keys()].sort().join("|");
  }

  function run(maxRounds = 30) {
    let prev = "";
    for (let round = 0; round < maxRounds; round++) {
      const tasks = [];
      for (const scene of Object.values(scenes)) {
        for (const hs of scene.hotspots ?? []) tasks.push(() => runHotspot(scene, hs));
      }
      if (rng) shuffle(tasks, rng);
      for (const t of tasks) {
        t();
        // Von Hotspots angestoßene Dialoge sofort abarbeiten.
        let guard = 0;
        while (dialogQueue.length && guard++ < 200) runDialog(dialogQueue.shift());
      }
      applyExternal();
      const now = snapshot();
      if (now === prev) break;
      prev = now;
    }
    return { flags, items, errors, transcript, visitedScenes, enteredDialogs };
  }

  return { run };
}

function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ══════════════════════════════════════════════════════════════════
// Läufe
// ══════════════════════════════════════════════════════════════════
checkPathConsistency();

const runs = [];
for (const variant of ["win", "lose"]) {
  for (const radioActive of [true, false]) {
    const r = makeSim({ variant, monotone: true, radioActive }).run();
    runs.push({ name: `fixpunkt-${variant}-radio${radioActive ? "an" : "aus"}`, ...r });
  }
}
for (const seed of [1, 7, 42, 1337, 2611]) {
  const r = makeSim({
    variant: "win",
    monotone: false,
    radioActive: true,
    rng: mulberry32(seed),
  }).run();
  runs.push({ name: `zufall-seed-${seed}`, ...r });
}

const base = runs[0];
/** Flags, die IRGENDEIN Lauf erreicht hat — Reihenfolge-unabhängig. */
const allReached = new Set();
const allItems = new Set();
for (const r of runs) {
  for (const f of r.flags) allReached.add(f);
  for (const i of r.items.keys()) allItems.add(i);
}
for (const r of runs) {
  if (!r.flags.has(GOAL_FLAG)) {
    const missing = criticalPath.find(
      (s) =>
        ![...(s.gibt.flags ?? [])].every((f) => r.flags.has(f)) &&
        (s.braucht.flags ?? []).every((f) => r.flags.has(f)) === false,
    );
    add(
      "HARD",
      "Dead End",
      `Lauf "${r.name}" erreicht "${GOAL_FLAG}" nicht. Erster blockierter Schritt: ${
        missing ? missing.id + " — " + missing.title : "unklar"
      }`,
    );
  }
}

// Laufzeitfehler in echtem Spielcode sind immer ein Fund.
const errorCounts = new Map();
for (const r of runs) for (const e of r.errors) errorCounts.set(e, (errorCounts.get(e) ?? 0) + 1);
for (const [e] of errorCounts) add("SOFT", "Laufzeitfehler", e);

// ══════════════════════════════════════════════════════════════════
// Ebene 3 — Ballast
// ══════════════════════════════════════════════════════════════════
const pathFlags = new Set();
for (const s of criticalPath) {
  for (const f of s.braucht.flags ?? []) pathFlags.add(f);
  for (const f of s.gibt.flags ?? []) pathFlags.add(f);
}
for (const s of externalSteps) {
  for (const f of s.braucht.flags ?? []) pathFlags.add(f);
  for (const f of s.gibt.flags ?? []) pathFlags.add(f);
}
const whitelisted = (f) => atmosphereWhitelist.some((p) => f.startsWith(p));
const ballast = [...allReached]
  .filter((f) => !pathFlags.has(f) && !whitelisted(f))
  .sort();
for (const f of ballast) {
  add("INFO", "Ballast-Kandidat", `Flag "${f}" ist erreichbar, zahlt aber auf keinen Pfadschritt ein.`);
}


// ══════════════════════════════════════════════════════════════════
// Ebene 4 — LLM-Judges
// ══════════════════════════════════════════════════════════════════
const llmSections = [];
async function callGateway(messages, model = "google/gemini-2.5-flash") {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY fehlt.");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 2000, stream: false }),
  });
  if (!res.ok) throw new Error(`Gateway ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  return j.choices?.[0]?.message?.content?.trim() ?? "";
}

if (useLlm) {
  const lore = readFileSync(ROOT + "LORE.md", "utf8").slice(0, 20000);
  const chain = criticalPath
    .map(
      (s, i) =>
        `${i + 1}. [${s.id}] ${s.title} — Ort: ${s.ort}, Beteiligte: ${s.wer}\n   braucht: ${JSON.stringify(s.braucht)}\n   gibt: ${JSON.stringify(s.gibt)}`,
    )
    .join("\n");
  const hintText = HINT_QUESTS.map((q) => `- ${q.id} (${q.title}): ${q.hints.join(" / ")}`).join("\n");

  try {
    const loreVerdict = await callGateway([
      {
        role: "user",
        content: [
          "Du prüfst die Rätselkette eines Adventures gegen die verbindliche Lore.",
          "LORE:", lore,
          "RÄTSELKETTE:", chain,
          "IN-GAME-HINWEISE:", hintText,
          "",
          "Nenne ausschließlich konkrete Lore-Verstöße als Liste (jeweils Schritt-ID, Zitat, Begründung, ein Satz Korrekturvorschlag).",
          "Wenn nichts zu beanstanden ist, schreibe genau: KEINE VERSTOESSE.",
        ].join("\n\n"),
      },
    ]);
    llmSections.push(["Lore-Judge", loreVerdict]);
  } catch (e) {
    llmSections.push(["Lore-Judge", `Fehler: ${String(e)}`]);
  }

  try {
    const designVerdict = await callGateway([
      {
        role: "user",
        content: [
          "Du bist Rätsel-Designer und bewertest die Kette eines Point-and-Click-Adventures.",
          "RÄTSELKETTE:", chain,
          "IN-GAME-HINWEISE (was der Spieler notfalls erfährt):", hintText,
          "",
          "Bewerte JEDEN Schritt mit drei Ampeln (grün/gelb/rot):",
          "A) Ist das Ziel dem Spieler an diesem Punkt klar?",
          "B) Gibt es eine im Spiel auffindbare Spur zur Lösung?",
          "C) Ist die Lösung logisch ableitbar (statt Ausprobieren)?",
          "Format pro Schritt: `id | A | B | C | ein Satz`. Am Ende drei Sätze: größte Design-Schwäche der Kette.",
        ].join("\n\n"),
      },
    ]);
    llmSections.push(["Design-Judge", designVerdict]);
  } catch (e) {
    llmSections.push(["Design-Judge", `Fehler: ${String(e)}`]);
  }
}

// ══════════════════════════════════════════════════════════════════
// Report
// ══════════════════════════════════════════════════════════════════
const out = [];
out.push("# Quest-Solve-Report");
out.push(`Generated: ${new Date().toISOString()}`);
out.push(`Modus: ${useLlm ? "Simulation + LLM" : "nur Simulation"}`);
out.push("");
out.push(
  `**HARD: ${findings.HARD.length} · SOFT: ${findings.SOFT.length} · INFO: ${findings.INFO.length}**`,
);
out.push("");
out.push("## Läufe");
for (const r of runs) {
  out.push(
    `- ${r.flags.has(GOAL_FLAG) ? "✅" : "❌"} \`${r.name}\` — ${r.flags.size} Flags, ${r.items.size} Items, ${r.errors.length} Laufzeitfehler`,
  );
}
out.push("");
if (process.env.DEBUG_DIALOGS) {
  console.log("entered:", [...base.enteredDialogs].filter((d) => d.startsWith("mira")).join(", "));
  console.log("scenes:", [...base.visitedScenes].join(", "));
}
out.push("## Kritischer Pfad");
for (const s of criticalPath) {
  const missing = (s.gibt.flags ?? []).filter((f) => !allReached.has(f));
  const blocked = [
    ...(s.braucht.flags ?? []).filter((f) => !allReached.has(f)),
    ...(s.braucht.items ?? []).filter((i) => !allItems.has(i)),
  ];
  out.push(
    `- ${missing.length === 0 ? "✅" : "❌"} \`${s.id}\` — ${s.title}` +
      (missing.length ? ` (nicht gesetzt: ${missing.join(", ")}${blocked.length ? "; fehlende Vorbedingung: " + blocked.join(", ") : ""})` : ""),
  );
  if (missing.length) {
    add(
      "HARD",
      "Pfadschritt unerreicht",
      `"${s.id}" liefert im Simulationslauf nicht: ${missing.join(", ")}${blocked.length ? " (fehlende Vorbedingung: " + blocked.join(", ") + ")" : ""}`,
    );
  }
}
for (const sev of ["HARD", "SOFT", "INFO"]) {
  out.push("");
  out.push(`## ${sev}`);
  if (!findings[sev].length) out.push("_keine_");
  for (const f of findings[sev]) out.push(`- **${f.cat}:** ${f.msg}`);
}
for (const [title, body] of llmSections) {
  out.push("");
  out.push(`## ${title}`);
  out.push(body);
}

mkdirSync(dirname(REPORT_PATH), { recursive: true });
writeFileSync(REPORT_PATH, out.join("\n"));

console.log(
  `HARD ${findings.HARD.length} · SOFT ${findings.SOFT.length} · INFO ${findings.INFO.length}`,
);
for (const r of runs) console.log(`${r.flags.has(GOAL_FLAG) ? "OK  " : "FAIL"} ${r.name}`);
for (const f of findings.HARD) console.log(`HARD  ${f.cat}: ${f.msg}`);
console.log(`Report: ${REPORT_PATH}`);
process.exit(findings.HARD.length > 0 ? 1 : 0);
