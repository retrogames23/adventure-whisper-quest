import type { GameApi, InventoryItemId } from "./types";

/**
 * Wenn ein Item auf einen Hotspot oder ein anderes Item gezogen wird,
 * suchen wir hier nach einer passenden Reaktion. Findet sich keine,
 * fällt das System auf einen lakonischen Layard-Spruch zurück.
 */

export type CombineTargetKind = "hotspot" | "item";

export interface CombineContext {
  api: GameApi;
  targetId: string;
  targetKind: CombineTargetKind;
  targetLabel?: string;
}

type ItemReactionMap = Partial<Record<InventoryItemId, string[]>>;

// ─── Personen-Reaktionen ─────────────────────────────────────

const PHILIPPE_REACTIONS: ItemReactionMap = {
  protocol: [
    "Philippe schaut auf das Protokoll. Lange.",
    "„Das ist nicht für mich. Das ist für jemanden, der da oben sitzt.“",
    "„Bringen Sie das weg, Layard. Bevor jemand fragt, warum Sie es hier zeigen.“",
  ],
  flyer: [
    "Philippe liest. Bewegt die Lippen mit. Wird sehr still.",
    "„Z.K.S. — das hab’ ich seit der Schulzeit nicht mehr gehört.“",
    "„Stecken Sie das weg, ja? Hier hat das Wand’ Ohren.“",
  ],
};

const HELKA_REACTIONS: ItemReactionMap = {
  protocol: [
    "Helkas Stimme hinter der Tür: „Ein Protokoll? Mit Siegel?“",
    "„Heben Sie das gut auf. Solche Dinge kommen immer zweimal zur Sprache.“",
  ],
  flyer: [
    "Helka schweigt lange. Dann, kaum hörbar:",
    "„Z.K.S. Mein Mann hat das mal gesagt. Bevor er gegangen ist.“",
    "„Lassen Sie es draußen, ja? Ich will das nicht in meiner Wohnung.“",
  ],
};

const BODO_REACTIONS: ItemReactionMap = {
  protocol: [
    "Bodo wirft einen kurzen Blick. „Versiegelt. Schön.“",
    "„Ich hab’ vor zwölf Jahren aufgehört, Siegel zu lesen.“",
    "„Bringen Sie das weg, wo es hingehört.“",
  ],
  flyer: [
    "Bodo liest, einmal, zweimal. Faltet das Blatt nicht.",
    "„Z.K.S. — ich dachte, die hätt’ es gar nicht mehr gegeben.“",
    "„Behalten Sie es. Aber lesen Sie es nicht in Ihrer Wohnung.“",
  ],
};

const ENNIS_REACTIONS: ItemReactionMap = {
  protocol: [
    "Hinter der Tür: ein leises Pfeifen. „Versiegelt? Klar versiegelt.“",
    "„Die versiegeln alles, wenn’s ihnen unangenehm wird.“",
  ],
  flyer: [
    "Ennis öffnet die Tür auf einen Spalt. Greift das Blatt. Liest.",
    "Schließt die Tür wieder. „Wo haben Sie das her, Worag?“",
    "Pause.",
    "„Ich wollte das schon immer mal in der Hand halten.“",
  ],
};

const MIRA_REACTIONS: ItemReactionMap = {
  protocol: [
    "Mira mustert das Protokoll. „Verschlüsselt, ja? Standardprotokoll.“",
    "„Macht Sie auch nicht zum Helden.“",
  ],
  flyer: [
    "Mira lächelt. Zum ersten Mal richtig.",
    "„Sie haben es behalten. Gut.“",
  ],
};

const MIKAEL_REACTIONS: ItemReactionMap = {
  protocol: [
    "Mikael wendet den Kopf, langsam. „Ein Protokoll. Wofür dachten Sie,",
    " ist es geschrieben worden?“",
    "„Damit jemand wie ich es liest. Und nichts daraus folgt.“",
  ],
  flyer: [
    "Mikael lacht. Es ist ein trockenes, glückliches Geräusch.",
    "„Z.K.S. Die sind also noch unterwegs.“",
    "„Dann bin ich nicht der Einzige gewesen.“",
  ],
};

const KOWALK_REACTIONS: ItemReactionMap = {
  protocol: ["Kowalk: „Das ist nicht meine Theke, Worag.“"],
  flyer: [
    "Kowalk: „Die haben uns auch welche unter der Tür durchgeschoben.",
    " Brust hat sie weggeworfen. Ich nicht.“",
  ],
  wartungsnotiz5610: [
    "Kowalk: „Bodos Schrift. Was tun Sie damit, Worag?“",
  ],
  residentId: ["Kowalk: „Worag, E67, 2611. In Ordnung.“"],
  e67Handbook: [
    "Kowalk: „Das alte Ding. Vorne im Hygiene-Kapitel ist ein Eselsohr — meins.“",
  ],
  b3Authorization: [
    "Kowalk nimmt die Vollmacht. „Vier-Drei-Eins-Sieben. Marteau.“",
    "„Reden Sie mich an, nicht den Tresen, dann kümmere ich mich.“",
  ],
  b3Ration: [
    "Kowalk: „Bringen Sie die hoch. Nicht hier öffnen.“",
  ],
  paramedicsReport: [
    "Kowalk wirft einen kurzen Blick. Sieht weg.",
    "„So ein Papier hab’ ich noch nie gesehen, Worag. Verstehen wir uns?“",
  ],
};

const BRUST_REACTIONS: ItemReactionMap = {
  protocol: [
    "Brust: „Formular ist korrekt ausgefüllt. Bitte an zuständiger Stelle abgeben.“",
  ],
  flyer: [
    "Brust: „Nicht-genehmigte Druckerzeugnisse. Bitte umgehend entsorgen.“",
  ],
  wartungsnotiz5610: [
    "Brust: „Wartungsdokumente sind technisch. Nicht hier.“",
  ],
  residentId: [
    "Brust: „Identität bestätigt. Was möchten Sie aufnehmen?“",
  ],
  e67Handbook: [
    "Brust blättert. Stockt. „… die Ausgabe von 91 ist offiziell noch gültig?“",
  ],
  b3Authorization: [
    "Brust: „Vollmacht 4317. Schicht A. Heute Schicht B. Ich kann das nicht.“",
  ],
  b3Ration: [
    "Brust: „Bitte vor Verlassen der Etage übergeben.“",
  ],
  paramedicsReport: [
    "Brust liest. Wird sehr still. „Bitte zeigen Sie mir das nicht noch einmal.“",
  ],
};

/** NPC-Hotspot-IDs → Reaktionsmap. */
const NPC_REACTIONS: Record<string, ItemReactionMap> = {
  philippeNpc: PHILIPPE_REACTIONS,
  door2610Helka: HELKA_REACTIONS,
  bodoNpc: BODO_REACTIONS,
  door2614Ennis: ENNIS_REACTIONS,
  mikaelNpc: MIKAEL_REACTIONS,
  mikaelNpcAfter: MIKAEL_REACTIONS,
  miraSpot36: MIRA_REACTIONS,
  miraSpot46: MIRA_REACTIONS,
  miraSpot56: MIRA_REACTIONS,
  miraInRoom: MIRA_REACTIONS,
  kowalkSpot: KOWALK_REACTIONS,
  brustSpot: BRUST_REACTIONS,
};

// ─── Spezielle Hotspot-Reaktionen (Geräte) ────────────────────

const RADIO_REACTIONS: ItemReactionMap = {
  flyer: [
    "„Lauscht ihr?“ — Layard hält das Flugblatt an den Lautsprecher.",
    "Das Brummen ändert sich nicht. Die Worte schon.",
  ],
};

const TERMINAL_REACTIONS: ItemReactionMap = {
  protocol: [
    "Das Terminal hat keinen Schlitz für versiegelte Protokolle.",
    "Layard erinnert sich: Rohrpost. Manche Dinge gehen noch immer den Weg.",
  ],
};

const KEYPAD_REACTIONS: ItemReactionMap = {
};

const PHONE_REACTIONS: ItemReactionMap = {
  protocol: [
    "Man kann ein versiegeltes Protokoll nicht durch ein Telefonkabel schicken.",
    "Layard weiß das. Er versucht es trotzdem nicht.",
  ],
};

const HOTSPOT_REACTIONS: Record<string, ItemReactionMap> = {
  radio: RADIO_REACTIONS,
  terminal: TERMINAL_REACTIONS,
  bodoTerminal: TERMINAL_REACTIONS,
  keypadCall: KEYPAD_REACTIONS,
  phoneApt: PHONE_REACTIONS,
  phone2613: PHONE_REACTIONS,
  bodoPhone: PHONE_REACTIONS,
};

// ─── Item × Item Kombinationen ────────────────────────────────

function pairKey(a: InventoryItemId, b: InventoryItemId): string {
  return [a, b].sort().join("|");
}

const ITEM_PAIRS: Record<string, string[]> = {};

// ─── Layards Standard-Sprüche ────────────────────────────────

const LAYARD_NOPE: string[] = [
  "Das hat aber nun wirklich noch nie funktioniert.",
  "Das ist so sinnvoll wie eine Nachricht der Leitstelle.",
  "Layard schaut beide Dinge an und kommt zu keinem Ergebnis.",
  "Nein. Auch beim zweiten Mal nicht.",
  "Das passt zusammen wie B2-Pampe und Geschmack.",
  "Layard legt es zurück, ohne es ausgesprochen zu haben.",
  "Das gibt das Standardprotokoll nicht her.",
  "Es bleibt, was es ist. Das ist meistens schon zu viel.",
  "Vielleicht später. Vielleicht morgen. Vielleicht nie.",
  "Layard wartet auf eine Eingebung. Es kommt keine.",
  "Das wäre eine Geschichte für Philippe. Die er nicht erzählen würde.",
  "Insa würde sagen: »Das ist nicht im Verzeichnis, Worag.« Und auflegen.",
];

function pickLakonisch(): string[] {
  const idx = Math.floor(Math.random() * LAYARD_NOPE.length);
  return ["LAYARD: " + LAYARD_NOPE[idx]];
}

// ─── Öffentliche API ─────────────────────────────────────────

export function combineItem(
  itemId: InventoryItemId,
  ctx: CombineContext,
): void {
  let lines: string[] | undefined;

  if (ctx.targetKind === "item") {
    const otherId = ctx.targetId as InventoryItemId;
    if (otherId === itemId) {
      lines = ["Layard schaut sich das eine Ding an. Es bleibt eines."];
    } else {
      // ── Akt-I-Pflichträtsel: Bleistift auf Vollmacht 4317 reibt
      //    den Trockensiegel-Abdruck heraus. Items bleiben erhalten —
      //    Layard braucht beide noch.
      const pair = pairKey(itemId, otherId);
      if (pair === pairKey("pencilStub", "b3Authorization")) {
        // Layard braucht ein dünnes Papier für die Reibung — der
        // Quittungsblock liefert es. Ohne den geht's nicht.
        if (!ctx.api.hasItem("quittungBlankoB")) {
          ctx.api.showText([
            "Layard braucht ein dünnes Stück Papier, um die Kontur",
            "des Trockensiegels herauszureiben. Carbon-Formularpapier",
            "wäre perfekt — aus der Kantine zum Beispiel.",
          ]);
          return;
        }
        if (!ctx.api.hasItem("siegelAbdruck")) {
          ctx.api.addItem({
            id: "siegelAbdruck",
            name: "Trockensiegel-Abdruck",
            description:
              "Ein dünnes, vergilbtes Blatt mit einer mit Bleistift abgeriebenen Kontur des Trockensiegels »BEWOHNERVERTRETUNG E67 / SCHICHT A«. Nicht ganz so scharf wie das Original, aber an den richtigen Stellen schwarz.",
          });
          ctx.api.setFlag("extractedSiegelAbdruck");
          ctx.api.showText([
            "Layard legt ein Stück Papier (vom Quittungsblock abgerissen) über",
            "die Vollmacht 4317 und reibt mit dem Stumpf des Bleistifts darüber.",
            "Langsam tritt der Trockensiegel-Stempel hervor:",
            "»BEWOHNERVERTRETUNG E67 / SCHICHT A«.",
            "Der Abdruck landet in der Aktentasche, beide Originale auch.",
          ]);
          return;
        } else {
          ctx.api.showText([
            "Einen Abdruck hat Layard schon. Mehr braucht er nicht.",
          ]);
          return;
        }
      }
      lines = ITEM_PAIRS[pairKey(itemId, otherId)];
    }
  } else {
    // Spezialfall: Wartungskarte auf Bodo gezogen → Bodo will sie nicht zurücknehmen
    if (
      itemId === "wartungsnotiz5610" &&
      ctx.targetId === "bodoNpc"
    ) {
      ctx.api.startDialog("bodoReturnWartungskarte");
      return;
    }
    // Spezialfall: Thermoskanne auf Bodo gezogen → Übergabe-Dialog
    // (entfernt das Item, setzt `gaveBodoThermos`). Vor dem Fallback,
    // sonst greift „Layard hat keine Idee" und das Item bleibt liegen.
    if (
      itemId === "bodoThermos" &&
      ctx.targetId === "bodoNpc" &&
      !ctx.api.hasFlag("gaveBodoThermos")
    ) {
      ctx.api.startDialog("bodoReturnThermos");
      return;
    }
    // Spezialfall: Fertige Quittung 4317-K auf die Pneumatik-Rohrpost
    // gezogen → Versand-Overlay öffnen (statt Lakonisch-Fallback).
    if (
      ctx.targetId === "cafeteriaPneumaticTube" &&
      itemId === "quittungForged4317"
    ) {
      if (ctx.api.hasFlag("sentForgedQuittung")) {
        ctx.api.showText([
          "Layard hält die Hülse schon in der Hand. Sie ist längst",
          "abgeschickt — jetzt heißt es: warten, bis Antwort kommt.",
        ]);
        return;
      }
      ctx.api.openPneumaticTube();
      return;
    }
    // Ölkännchen → MARV-9. Ölt den Servo-Kiefer, setzt ein Flag und
    // wandert anschließend aus dem Inventar (verbraucht). Der Server
    // gibt MARV beim nächsten Free-Mode-Talk dadurch eine warmere
    // Tonfärbung — das Ölen allein öffnet die Tür aber NICHT.
    if (
      itemId === "oilCan" &&
      ctx.targetId === "marvSpeak"
    ) {
      if (ctx.api.hasFlag("marvOiled")) {
        ctx.api.showText(["Layard: „Das habe ich schon getan.“"]);
        return;
      }
      ctx.api.setFlag("marvOiled");
      // Lokalen MARV-Zustand sofort setzen — der Server-Sync unten ist
      // nur Best-Effort und für anonyme Spieler gar nicht möglich.
      ctx.api.markMarvOiled();
      // Server-State synchronisieren, damit MARVs Tonfärbung beim
      // nächsten Free-Mode-Talk passt. Best-Effort, fire-and-forget.
      void (async () => {
        try {
          const { getFreshAccessToken } = await import("@/auth/freshToken");
          const token = await getFreshAccessToken();
          if (!token) return;
          await fetch("/api/public/marv-oil", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch { /* ignore */ }
      })();
      lines = [
        "Layard tritt einen halben Schritt näher an die Lautsprecher-Maske, hebt den schmalen Schnabel des Ölkännchens und tropft zwei winzige Tropfen in den Spalt, wo der Servo-Kiefer sitzt.",
        "Es klickt leise. Dann ein Geräusch, das fast wie ein Atemzug klingt. MARV-9 (sehr leise): „… oh.“",
      ];
      ctx.api.showText(lines);
      return;
    }
    const hotspotMap = HOTSPOT_REACTIONS[ctx.targetId];
    const npcMap = NPC_REACTIONS[ctx.targetId];
    lines = hotspotMap?.[itemId] ?? npcMap?.[itemId];
  }

  if (!lines || lines.length === 0) {
    lines = pickLakonisch();
  }
  ctx.api.showText(lines);
}

export const LAYARD_LAKONISCH = LAYARD_NOPE;
