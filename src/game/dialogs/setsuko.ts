import type { DialogTree } from "../types";

/**
 * Setsuko Arai — Künstlerin in Wohnung 1102 (E71, Etage 1),
 * gegenüber der Bewohnerbibliothek.
 *
 * Überschwänglich, exzentrisch, redet schnell. Ekel vor Essen und Sex
 * ist ihr offen benanntes Material. Weltbild: Befreiung durch das
 * Zeigen des Schambehafteten — „So befreiend!“
 *
 * Nur wer hartnäckig nachfragt (Kunst- UND Körper-Ebene) und dann
 * weiterbohrt, hört von „Zero is Infinity“. Sie kennt die Leute,
 * sie gehört nicht dazu.
 */
export const setsukoDialogs: Record<string, DialogTree> = {
  setsukoIntro: {
    id: "setsukoIntro",
    start: "si1",
    npcId: "setsuko",
    onStart: (api) => api.setFlag("metSetsuko"),
    lines: {
      si1: {
        id: "si1",
        speaker: "SETSUKO",
        text: "Nicht stehenbleiben in der Tür! In der Tür ist der schlechteste Punkt im ganzen Raum, da ist man halb drinnen und halb entschuldigt. Kommen Sie ganz rein. So. — Setsuko.",
        subtext:
          "Sie hat Farbe an beiden Unterarmen und einen Pinsel hinterm Ohr, als hätte sie ihn vergessen.",
        next: "si2",
      },
      si2: {
        id: "si2",
        speaker: "SETSUKO",
        text: "Tee? Ich habe Tee. Ich trinke ihn nicht, aber ich habe ihn. Ich mag es, wenn andere Leute in meiner Wohnung schlucken. Das ist gut für mich, das ist Übung.",
        next: "sHub",
      },
      sHub: {
        id: "sHub",
        speaker: "SETSUKO",
        text: "Und? Sie sehen sich um. Alle sehen sich zuerst um und stellen dann die falsche Frage. Stellen Sie ruhig die falsche.",
        choicesFn: (api) => [
          { text: "Warum überall diese Punkte?", next: "kunst1" },
          { text: "Warum genau Essen und Körper?", next: "koerper1" },
          ...(api.hasFlag("setsukoArtTalk") && api.hasFlag("setsukoBodyTalk")
            ? [
                {
                  text: "Sie reden von „wir“. Machen das hier noch andere?",
                  next: "andere1",
                },
              ]
            : []),
          ...(api.hasFlag("heardZeroIsInfinity")
            ? [
                {
                  text: "Zero is Infinity — was ist das genau?",
                  next: "zero4",
                },
              ]
            : []),
          { text: "Ich lasse Sie arbeiten. Danke." },
        ],
      },

      // ── Ebene: Kunst ─────────────────────────────────────────
      kunst1: {
        id: "kunst1",
        speaker: "SETSUKO",
        text: "Weil ein Punkt allein nichts ist. Ein Punkt ist ein Fehler auf der Wand, den meldet man. Aber zehntausend Punkte sind kein Fehler mehr, das ist eine Ordnung, und in einer Ordnung fragt niemand nach dem einzelnen Punkt.",
        subtext: "Sie tippt mit dem Pinselstiel auf die Wand, dreimal.",
        next: "kunst2",
      },
      kunst2: {
        id: "kunst2",
        speaker: "SETSUKO",
        onEnter: (api) => api.setFlag("setsukoArtTalk"),
        text: "Ich male, bis ich verschwinde. Erst der Tisch, dann der Boden, dann meine Hände — sehen Sie? — dann bin ich nur noch Muster. Und wer Muster ist, den kann man nicht mehr beschämen. So befreiend!",
        next: "kunst3",
      },
      kunst3: {
        id: "kunst3",
        speaker: "SETSUKO",
        text: "Die Hausverwaltung nennt das „Wandveränderung ohne Vorlage“. Ich habe ein Formblatt bekommen. Ich habe es bepunktet und zurückgeschickt. Seitdem ist es still.",
        next: "sHub",
      },

      // ── Ebene: Körper, Essen, Sex ────────────────────────────
      koerper1: {
        id: "koerper1",
        speaker: "SETSUKO",
        text: "Weil mir davor graut. Vor beidem. Vor Essen und vor Sex. Wirklich körperlich, nicht kokett. Ich kann kaum zusehen, wie jemand kaut.",
        subtext:
          "Sie sagt es so beiläufig wie eine Zimmernummer und sieht dabei erwartungsvoll aus.",
        next: "koerper2",
      },
      koerper2: {
        id: "koerper2",
        speaker: "SETSUKO",
        text: "Also nähe ich es. Ich nähe hundert davon, ich lege sie auf mein Sofa, ich setze mich mitten hinein und mache ein Foto. Was hundertmal daliegt, kann mir nichts mehr tun. Man frisst die Angst, indem man sie ausstellt.",
        next: "koerper3",
      },
      koerper3: {
        id: "koerper3",
        speaker: "SETSUKO",
        onEnter: (api) => api.setFlag("setsukoBodyTalk"),
        text: "Und deshalb sage ich: alle sollen sich nackt machen. Nicht die Kleider — das ist das Leichteste. Das Verletzlichste zeigen, das, wofür man sich am meisten schämt. Wenn das jeder täte, hätte niemand mehr etwas gegen einen in der Hand. Keine Akte, keine Nachbarn, nichts. So befreiend!",
        next: "koerper4",
      },
      koerper4: {
        id: "koerper4",
        speaker: "SETSUKO",
        text: "Aber alle bedecken sich. Von morgens bis abends. Und dann wundern sie sich, dass sie leise sprechen.",
        subtext:
          "Layard merkt, dass er die Hände in den Manteltaschen hat, und lässt sie da.",
        next: "sHub",
      },

      // ── Ebene: die anderen — Hinweis auf Zero is Infinity ────
      andere1: {
        id: "andere1",
        speaker: "SETSUKO",
        text: "Andere. Hm. Ja, es gibt andere. Die meisten malen nicht, die machen es draußen, mit Leuten, an Orten, wo es weh tut.",
        subtext: "Zum ersten Mal wird sie langsamer.",
        choicesFn: () => [
          { text: "Erzählen Sie mir davon.", next: "andere2" },
          { text: "Klingt nach Ärger. Lassen wir das.", next: "sHub" },
        ],
      },
      andere2: {
        id: "andere2",
        speaker: "SETSUKO",
        text: "Warum wollen Sie das wissen? Sie sind aus einem anderen Gebäude, Sie haben einen Mantel, der nach Registratur riecht, und Sie fragen nach Leuten. Das ist eine Kombination, bei der man normalerweise Tee anbietet und dann aufhört zu reden.",
        choicesFn: () => [
          {
            text: "Weil mir Ihr Gedanke nicht mehr aus dem Kopf geht.",
            next: "andere3",
          },
          {
            text: "Dienstlich. Ich schreibe etwas auf.",
            next: "andereAbwehr",
          },
          { text: "Sie haben recht. Vergessen Sie's.", next: "sHub" },
        ],
      },
      andereAbwehr: {
        id: "andereAbwehr",
        speaker: "SETSUKO",
        text: "Dann schreiben Sie: „Bewohnerin hat gepunktete Wände.“ Das stimmt, das ist wahr, und mehr steht Ihnen nicht zu.",
        subtext:
          "Sie lächelt weiter, aber sie dreht sich zur Leinwand. Vielleicht ein anderes Mal, anders gefragt.",
        next: "sHub",
      },
      andere3: {
        id: "andere3",
        speaker: "SETSUKO",
        text: "Gut. Das ist wenigstens keine Sprawka-Antwort.",
        subtext: "Sie legt den Pinsel weg. Das hat sie bisher nicht getan.",
        next: "zero1",
      },
      zero1: {
        id: "zero1",
        speaker: "SETSUKO",
        text: "Es gibt Leute, die arbeiten mit der Null. Nicht mit Farbe — mit sich. Sie ziehen sich aus, wo es nicht vorgesehen ist. Auf Treppen, in Wartebereichen, einmal in einer Schleuse. Zwei Minuten, dann sind sie weg.",
        next: "zero2",
      },
      zero2: {
        id: "zero2",
        speaker: "SETSUKO",
        onEnter: (api) => api.setFlag("heardZeroIsInfinity"),
        text: "Sie nennen sich Zero is Infinity. Englisch, ja. Null ist Unendlich. Wenn du nichts mehr bist, was man wegnehmen kann, bist du alles. Das ist mein Satz, ehrlich gesagt, aber sie tragen ihn weiter, und das ist in Ordnung.",
        next: "zero3",
      },
      zero3: {
        id: "zero3",
        speaker: "SETSUKO",
        text: "Fragen Sie mich nicht nach Namen. Ich kenne welche, ich sage keine. Ich gehöre nicht dazu, ich mache ihnen nur manchmal Kaffee und höre zu, wenn sie zittern.",
        next: "sHub",
      },
      zero4: {
        id: "zero4",
        speaker: "SETSUKO",
        text: "Mehr als ich gesagt habe, sage ich nicht. Ein Name, kein Ort, keine Leute. Wenn die Sie finden wollen, finden die Sie. So läuft das mit der Null.",
        subtext:
          "Sie nimmt den Pinsel wieder auf und setzt einen Punkt, sehr genau, sehr ruhig.",
        next: "sHub",
      },
    },
  },

  // ── Wiederansprache ────────────────────────────────────────
  setsukoHub: {
    id: "setsukoHub",
    start: "sh1",
    npcId: "setsuko",
    lines: {
      sh1: {
        id: "sh1",
        speaker: "SETSUKO",
        text: "Ah, der Mantel. Alles in Regel? Setzen Sie sich nicht aufs Sofa, das trocknet noch.",
        choicesFn: (api) => [
          ...(!api.hasFlag("setsukoArtTalk")
            ? [{ text: "Warum überall diese Punkte?", next: "shKunst" }]
            : []),
          ...(!api.hasFlag("setsukoBodyTalk")
            ? [{ text: "Warum Essen und Körper?", next: "shKoerper" }]
            : []),
          ...(api.hasFlag("setsukoArtTalk") &&
          api.hasFlag("setsukoBodyTalk") &&
          !api.hasFlag("heardZeroIsInfinity")
            ? [
                {
                  text: "Sie sagten, es gibt andere. Ich frage noch mal.",
                  next: "shAndere",
                },
              ]
            : []),
          ...(api.hasFlag("heardZeroIsInfinity")
            ? [{ text: "Noch mal zu Zero is Infinity.", next: "shZero" }]
            : []),
          { text: "Ich wollte nur Hallo sagen.", next: "shBye" },
        ],
      },
      shKunst: {
        id: "shKunst",
        speaker: "SETSUKO",
        onEnter: (api) => api.setFlag("setsukoArtTalk"),
        text: "Ein Punkt ist ein Fehler. Zehntausend sind eine Ordnung. Ich male, bis ich verschwinde, und was verschwunden ist, kann man nicht beschämen. So befreiend!",
        next: "sh1",
      },
      shKoerper: {
        id: "shKoerper",
        speaker: "SETSUKO",
        onEnter: (api) => api.setFlag("setsukoBodyTalk"),
        text: "Weil mir vor beidem graut, vor Essen und vor Sex. Also nähe ich es hundertmal und setze mich hinein. Wer sein Schlimmstes ausstellt, ist frei. Alle anderen bedecken sich und wundern sich, dass sie flüstern.",
        next: "sh1",
      },
      shAndere: {
        id: "shAndere",
        speaker: "SETSUKO",
        text: "Sie sind hartnäckig. Das mag ich mehr, als ich sollte.",
        next: "shZeroReveal",
      },
      shZeroReveal: {
        id: "shZeroReveal",
        speaker: "SETSUKO",
        onEnter: (api) => api.setFlag("heardZeroIsInfinity"),
        text: "Es gibt Leute, die arbeiten mit der Null. Sie ziehen sich aus, wo es nicht vorgesehen ist, zwei Minuten lang, dann sind sie weg. Zero is Infinity nennen sie sich. Keine Namen von mir. Ich mache ihnen Kaffee, mehr nicht.",
        next: "sh1",
      },
      shZero: {
        id: "shZero",
        speaker: "SETSUKO",
        text: "Ein Name, kein Ort, keine Leute. Ich gehöre nicht dazu. Aber ich schlafe besser, seit es sie gibt.",
        next: "sh1",
      },
      shBye: {
        id: "shBye",
        speaker: "SETSUKO",
        text: "Hallo. Und: bedecken Sie sich weniger, Herr Mantel.",
        subtext: "Sie lacht und malt weiter, noch bevor er an der Tür ist.",
      },
    },
  },
};
