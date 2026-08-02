import type { DialogTree } from "../types";

/**
 * Ralf am Fenster — E71-Bewohner hinter einer fast geschlossenen Rollade.
 * Reiner Welt-Erklärer, keine Rätselfunktion. Hub-Struktur: Layard fragt,
 * Ralf antwortet, danach zurück ins Themenmenü.
 */
export const ralfDialogs: Record<string, DialogTree> = {
  ralfIntro: {
    id: "ralfIntro",
    start: "r1",
    npcId: "ralf",
    lines: {
      r1: {
        id: "r1",
        speaker: "SYSTEM",
        text: "[ Die Hand im Rolladenschlitz bewegt sich nicht. Der Zigarettenkegel wird kurz heller. Dann Rauch, langsam, waagerecht. ]",
        next: "r2",
      },
      r2: {
        id: "r2",
        speaker: "LAYARD",
        text: "Entschuldigung. Ich wollte nicht stören.",
        next: "r3",
      },
      r3: {
        id: "r3",
        speaker: "RALF",
        text: "Sie stören nicht. Es kommt hier selten jemand vorbei, der stehen bleibt. Die meisten gehen schneller, wenn sie die Hand sehen.",
        subtext: "Die Stimme ist ruhig, tief, sehr geübt im Leisesprechen.",
        next: "r4",
      },
      r4: {
        id: "r4",
        speaker: "LAYARD",
        text: "Warum machen Sie die Rollade nicht hoch?",
        next: "r5",
      },
      r5: {
        id: "r5",
        speaker: "RALF",
        text: "Weil unten ein Schlitz reicht. Ralf. Wohne hier, seit E71 noch keine Nummer hatte. Rauchen darf man drinnen nicht, draußen bin ich nicht gemeldet. Also so.",
        subtext: "Er sagt das ohne Bitterkeit. Eher wie eine Wetterlage.",
        action: (api) => api.setFlag("metRalf"),
        next: "hub",
      },
      hub: { id: "hub", speaker: "RALF", text: "Fragen Sie ruhig. Ich habe Zeit und eine halbe Schachtel.", choicesFn: buildTopics },

      // ── Themen ────────────────────────────────────────────────────
      tSektoren: {
        id: "tSektoren",
        speaker: "RALF",
        text: "E67 und E71 waren mal ein Haus mit zwei Aufgängen. Dann kam die Sektor-Reform. Man hat nichts abgerissen und nichts gebaut — man hat Zuständigkeiten gezogen. Eine Tür, ein Keypad, ein anderer Briefkopf. Seitdem ist E71 die Medizin und E67 das, was übrig war.",
        subtext: "„Getrennt“ heißt hier nie räumlich. Es heißt: verschiedene Formulare.",
        action: (api) => api.setFlag("ralfToldSektoren"),
        next: "hubBack",
      },
      tMandat: {
        id: "tMandat",
        speaker: "RALF",
        text: "Das Mandatsgebiet ist keine Stadt und kein Staat, es ist eine Übergangslösung, die geblieben ist. Der Mandatsrat sollte drei Jahre verwalten, bis geklärt ist, wer zuständig ist. Das war vor deutlich mehr als drei Jahren. Geklärt wurde nie etwas, deshalb ist er noch da.",
        subtext: "Nichts ist so dauerhaft wie ein Provisorium mit Briefkopf.",
        action: (api) => api.setFlag("ralfToldMandat"),
        next: "hubBack",
      },
      tResonanz: {
        id: "tResonanz",
        speaker: "RALF",
        text: "Resonanz war ursprünglich ein bau-akustischer Begriff. Hellhörige Wände, Beschwerden, Messprotokolle. Irgendwann hat jemand gemerkt, dass sich damit auch alles andere erfassen lässt, was zwischen den Wänden zu laut wird. Streit. Trauer. Meinungen. Resonanz-Hygiene heißt heute: leise sein und es freiwillig nennen.",
        subtext: "Ein Wort, das sich gedehnt hat, bis alles hineinpasste.",
        action: (api) => api.setFlag("ralfToldResonanz"),
        next: "hubBack",
      },
      tBewohner: {
        id: "tBewohner",
        speaker: "RALF",
        text: "Wen wollen Sie hören? Bodo hält den Bau zusammen und tut so, als wäre das Hausmeisterei. Insa in der Leitstelle weiß mehr, als sie weitergeben darf, und das frisst sie. Vossbeck hat sich in die Sprechzeit zurückgezogen wie andere in den Wald. Frau Okwu in 1532 ist die einzige hier, die zuhört, ohne zu notieren — glaube ich jedenfalls. Und Stegmann in 1534 hat vor Jahren aufgehört, seine Stapel zu zählen.",
        subtext: "Er zählt sie auf wie Inventar. Ohne Häme, ohne Wärme.",
        action: (api) => api.setFlag("ralfToldBewohner"),
        next: "hubBack",
      },
      tZeitungen: {
        id: "tZeitungen",
        speaker: "RALF",
        text: "Über E67 stand mal einiges gedruckt. Serie über die Belegungspraxis, ein Foto vom Innenhof, ein sehr höflicher Kommentar über „strukturelle Härten“. Nach der dritten Folge wurde die Serie eingestellt — nicht verboten, nur nicht fortgesetzt. Die Redaktion sitzt heute in E70 und schreibt über Kantinenverordnungen.",
        subtext: "Nichts wird hier verboten. Es hört nur auf.",
        action: (api) => api.setFlag("ralfToldZeitungen"),
        next: "hubBack",
      },
      tSelbst: {
        id: "tSelbst",
        speaker: "RALF",
        text: "Ich habe das alles mal gesammelt. Ordner, Ausschnitte, Datumsstempel. Dann habe ich gemerkt, dass Sammeln eine Beschäftigung ist und keine Handlung. Jetzt lese ich, rauche und rede mit Leuten, die stehen bleiben. Das ist weniger, aber es ist ehrlicher.",
        subtext: "Er hat sich eingerichtet. Er weiß das und beschönigt es nicht.",
        action: (api) => api.setFlag("ralfToldSelbst"),
        next: "hubBack",
      },
      tMira: {
        id: "tMira",
        speaker: "RALF",
        text: "Layard, du weißt, es gibt keine absoluten Wahrheiten. Aber was Mira sieht, ist noch weitgehend ungetrübt von Erfahrungen. Ich sage dir: Das eigentlich Erschreckende ist, dass für all das hier gar keine Verschwörung verantwortlich ist. Einfach sehr viele Menschen, die alle für sich die Verantwortung scheuen.",
        subtext: "Zum ersten Mal duzt er ihn. Es klingt nicht vertraulich, sondern müde.",
        action: (api) => api.setFlag("ralfToldMira"),
        next: "hubBack",
      },
      hubBack: { id: "hubBack", speaker: "RALF", text: "Noch was?", choicesFn: buildTopics },
      bye: {
        id: "bye",
        speaker: "RALF",
        text: "Gehen Sie ruhig. Ich bin hier. Das ist ungefähr meine ganze Eigenschaft.",
        end: true,
      },
    },
  },
};

function buildTopics(): Array<{ text: string; next?: string }> {
  return [];
}
