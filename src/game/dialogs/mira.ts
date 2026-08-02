import type { DialogTree } from "../types";

/**
 * Mira — skeptisch, nicht paranoid.
 *
 * Ihre These ist sprachlich, nicht technisch: „Resonanz-Hygiene" ist nirgends
 * exakt definiert, taucht aber überall auf. Genau diese Unschärfe erlaubt es,
 * jedes Verhalten nachträglich als Verstoß zu deklarieren. Mira kennt das
 * Schmerz-Radio NICHT und spekuliert nie über Frequenzen.
 *
 * Tonlage: reißt sich mit, rudert aber hörbar zurück, sobald man ihr
 * widerspricht. Jede große These hat eine Selbstkorrektur.
 */

const FLYER_TEXT =
  "WAS IST RESONANZ-HYGIENE? Wir haben in vier Monaten elf Aushänge verglichen. Elf Mal ein anderer Wortlaut. Ruhezeiten. Lüftung. Belegungsdichte. Türsiegel-Praxis. Nirgends eine Definition. Ein Wort, das alles bedeuten kann, bedeutet am Ende: was die Verwaltung heute will. Wir behaupten nichts. Wir bitten um eine Definition. — Z.K.S.";

export const miraDialogs: Record<string, DialogTree> = {
  miraIntro: {
    id: "miraIntro",
    npcId: "mira",
    start: "mi1",
    lines: {
      mi1: {
        id: "mi1",
        speaker: "SYSTEM",
        text: "[ An der Wand lehnt eine junge Frau. Sechzehn, vielleicht siebzehn. Sie sieht Layard direkt an. ]",
        next: "mi2",
      },
      mi2: {
        id: "mi2",
        speaker: "MIRA",
        text: "Hey. Du bist nicht von dieser Etage. Aber du suchst auch nichts Bestimmtes, oder? Du läufst nur. Das machen die meisten, bevor sie wissen, wovor.",
        subtext: "Sie sagt das ohne Vorwurf. Eher wie eine Beobachtung.",
        hiddenWhen: ["sawEmptyOffice"],
        next: "mi2b",
      },
      mi2b: {
        id: "mi2b",
        speaker: "MIRA",
        text: "Hey. Du bist nicht von dieser Etage. Und du läufst, als hättest du ein Ziel. Wen suchst du?",
        subtext: "Sie sagt das ohne Vorwurf. Eher wie eine Beobachtung.",
        requires: ["sawEmptyOffice"],
        next: "mi3",
      },
      mi3: {
        id: "mi3",
        speaker: "LAYARD",
        text: "Ich … wollte mir nur ein paar andere Etagen ansehen.",
        hiddenWhen: ["sawEmptyOffice"],
        next: "mi3b",
      },
      mi3b: {
        id: "mi3b",
        speaker: "LAYARD",
        text: "Den Abschnittsverantwortlichen. Sein Büro ist leer.",
        requires: ["sawEmptyOffice"],
        next: "mi4",
      },
      mi4: {
        id: "mi4",
        speaker: "MIRA",
        text: "Andere Etagen ansehen. — Weißt du, wie selten das jemand macht? Die meisten bleiben in ihrem Quadranten, bis sie transferiert werden. Du nicht.",
        subtext: "Sie wartet auf deine Reaktion.",
        hiddenWhen: ["sawEmptyOffice"],
        next: "mi4b",
        choices: [
          { text: "Was meinst du damit genau?", next: "miraOpen1" },
          {
            text: "Pass auf, was du sagst. Hier hört jemand zu.",
            next: "miraClosed1",
            action: (api) => api.setFlag("miraSystemic"),
          },
          { text: "Keine Zeit für sowas." },
        ],
      },
      mi4b: {
        id: "mi4b",
        speaker: "MIRA",
        text: "Den gibt es heute nicht. Den gibt es meistens nicht. Steht trotzdem auf jedem Aushang, dass es ihn gibt.",
        subtext: "Sie hat das schon oft gesagt. Sie wartet darauf, wie er reagiert.",
        requires: ["sawEmptyOffice"],
        choices: [
          { text: "Was meinst du damit genau?", next: "miraOpen1" },
          {
            text: "Pass auf, was du sagst. Hier hört jemand zu.",
            next: "miraClosed1",
            action: (api) => api.setFlag("miraSystemic"),
          },
          { text: "Keine Zeit für sowas." },
        ],
      },
      // OFFEN — die Wort-These
      miraOpen1: {
        id: "miraOpen1",
        speaker: "MIRA",
        text: "Frag mal jemanden, was „Resonanz-Hygiene“ eigentlich ist. Genau. Wortlaut. Kriegst du nicht. Ich hab elf Aushänge verglichen — elf verschiedene Formulierungen. Ruhezeiten, Lüftung, Belegungsdichte, Türsiegel-Praxis.",
        choices: [
          { text: "Und was schließt du daraus?", next: "miraOpen2" },
          { text: "Das ist einfach Verwaltungssprache. Die ist immer schwammig.", next: "miraCorrect1" },
          { text: "Das ist mir jetzt zu groß. Lass gut sein.", next: "miraDefer" },
        ],
      },
      // Selbstkorrektur: Mira nimmt den Einwand ernst und wird kleiner,
      // nicht lauter.
      miraCorrect1: {
        id: "miraCorrect1",
        speaker: "MIRA",
        text: "… kann sein. Das ist ein guter Einwand, ehrlich. Vielleicht ist es einfach Schlamperei. — Nur: Schlamperei wird korrigiert, wenn jemand nachfragt. Ich hab nachgefragt. Zweimal schriftlich. Es kam keine Definition, es kam ein Hinweis auf meine Belegungsakte.",
        choices: [
          { text: "Okay. Erzähl weiter.", next: "miraOpen2" },
          { text: "Trotzdem: Beweis ist das keiner.", next: "miraCorrect2" },
        ],
      },
      miraCorrect2: {
        id: "miraCorrect2",
        speaker: "MIRA",
        text: "Nein. Ist es nicht. Ich sag auch nicht, dass ich recht habe — ich sag, dass mir niemand antwortet. Das ist ein Unterschied, und ich vergesse ihn manchmal.",
        choices: [
          { text: "Erzähl trotzdem weiter.", next: "miraOpen2" },
          { text: "Reicht. Ich muss weiter.", next: "miraDefer" },
        ],
      },
      miraOpen2: {
        id: "miraOpen2",
        speaker: "MIRA",
        text: "Meine These: Die Unschärfe ist keine Panne, sie ist praktisch. Ein Wort, das nirgends definiert ist, passt hinterher auf alles. Zu laut — Resonanz-Hygiene. Zu viele Leute in der Wohnung — Resonanz-Hygiene. Beschwerde eingereicht — na, rate.",
        choices: [
          { text: "Und wer profitiert davon?", next: "miraOpen4" },
          { text: "Hübsches Bild. Mehr nicht.", next: "miraDeferDry" },
          { text: "Reicht. Ich muss weiter.", next: "miraDefer" },
        ],
      },
      miraOpen4: {
        id: "miraOpen4",
        speaker: "MIRA",
        text: "Wer entscheiden will, ohne begründen zu müssen. Mehr behaupte ich nicht — ich kenne keine Namen, und ich glaube auch nicht an irgendeinen Raum, in dem das ausgeheckt wird. Bei meinem Vater stand „menschliches Versagen“ im Bericht. Auch so ein Wort, das keine Frage übrig lässt. Steht alles hier drauf.",
        next: "miraOpen5",
      },
      miraOpen5: {
        id: "miraOpen5",
        speaker: "SYSTEM",
        text: "[ Sie zieht ein gefaltetes Blatt aus der Innentasche und drückt es Layard in die Hand. Schnell. Geübt. ]",
        next: "miraOpen7",
        choices: [
          {
            text: "[ Annehmen ]",
            next: "miraOpen7",
            action: (api) => api.setFlag("miraOfferedFlyer"),
          },
          {
            text: "[ Ablehnen ]",
            next: "miraRefuse",
            action: (api) => api.setFlag("miraOfferedFlyer"),
          },
        ],
      },
      miraOpen7: {
        id: "miraOpen7",
        speaker: "MIRA",
        text: "Lies es allein. Z.K.S.",
        next: "miraOpen8",
      },
      miraOpen8: {
        id: "miraOpen8",
        speaker: "LAYARD",
        text: "Z.K.S.?",
        next: "miraOpen9",
      },
      miraOpen9: {
        id: "miraOpen9",
        speaker: "MIRA",
        text: "Zentrum. Käfig. Stille. — Die Stille ist der schöne Teil: ein Tag ohne Aushänge, ohne Durchsagen, ohne Merkblätter. Einmal ausprobieren, wie das ist. Mehr will ich gar nicht. Geh jetzt.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => {
              api.setFlag("miraOpenness");
              api.setFlag("tookFlyer");
              api.addItem({
                id: "flyer",
                name: "Flugblatt",
                description: FLYER_TEXT,
              });
              api.setKnowledge("wordControl");
            },
          },
        ],
      },
      miraRefuse: {
        id: "miraRefuse",
        speaker: "MIRA",
        text: "Schade. — Aber ich verstehe. Wenn du es dir anders überlegst: Ich bin oft hier oben.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraOpenness"),
          },
        ],
      },
      miraDefer: {
        id: "miraDefer",
        speaker: "MIRA",
        text: "Auch gut. — Ich bin oft hier oben, falls du irgendwann doch mal Lust hast, weiterzudenken.",
        subtext:
          "Sie steckt etwas zurück in die Innentasche, ohne es ihm zu zeigen.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraDeferred"),
          },
        ],
      },
      miraDeferDry: {
        id: "miraDeferDry",
        speaker: "MIRA",
        text: "Mag sein. — Dann eben ein hübsches Bild. Schönen Tag noch.",
        subtext: "Sie wendet den Blick ab. Das Gespräch ist für heute vorbei.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraDeferred"),
          },
        ],
      },
      // GESCHLOSSEN
      miraClosed1: {
        id: "miraClosed1",
        speaker: "MIRA",
        text: "Ach. Einer von denen. Schon gut. Vergiss, dass ich was gesagt habe.",
        subtext: "Sie ist nicht überrascht. Sie hat damit gerechnet.",
        next: "miraClosed2",
      },
      miraClosed2: {
        id: "miraClosed2",
        speaker: "MIRA",
        text: "Schönen Tag noch, Bürger.",
        end: true,
      },
    },
  },
  miraReturn: {
    id: "miraReturn",
    npcId: "mira",
    start: "mr1",
    lines: {
      mr1: {
        id: "mr1",
        speaker: "MIRA",
        text: "Wieder hier. Hast du es dir überlegt?",
        requires: ["miraOfferedFlyer"],
        hiddenWhen: ["sawEmptyOffice"],
        next: "mr1b",
        choices: [
          { text: "Ja. Gib mir das Blatt.", next: "mr2" },
          { text: "Nein. Ich wollte nur reden.", next: "mrTalk" },
        ],
      },
      mr1b: {
        id: "mr1b",
        speaker: "MIRA",
        text: "Wieder hier. Hast du ihn gefunden? Den Abschnittsverantwortlichen, meine ich.",
        subtext: "Sie weiß die Antwort schon.",
        requires: ["sawEmptyOffice", "miraOfferedFlyer"],
        next: "mrFresh1",
        choices: [
          { text: "Ja. Gib mir das Blatt.", next: "mr2" },
          { text: "Nein. Aber gib mir trotzdem das Blatt.", next: "mr2" },
          { text: "Nein. Ich wollte nur reden.", next: "mrTalk" },
        ],
      },
      mrFresh1: {
        id: "mrFresh1",
        speaker: "MIRA",
        text: "Du bist nochmal hier. Das machen die wenigsten zweimal.",
        subtext: "Keine Begrüßung. Eher eine Notiz.",
        next: "mrFresh2",
      },
      mrFresh2: {
        id: "mrFresh2",
        speaker: "MIRA",
        text: "Sag mal — wüsstest du, wenn dich jemand fragt, was „Resonanz-Hygiene“ genau heißt, was du antworten würdest?",
        choices: [
          { text: "Was willst du damit sagen?", next: "mrOpen1" },
          { text: "Lass mich in Ruhe damit.", next: "mrSystemic" },
          { text: "Keine Zeit." },
        ],
      },
      mrTalk: {
        id: "mrTalk",
        speaker: "MIRA",
        text: "Reden. Gut. — Worüber denn?",
        choices: [
          { text: "Über das, was du vorhin meintest.", next: "mrOpen1" },
          { text: "Eigentlich über nichts." },
        ],
      },
      mrSystemic: {
        id: "mrSystemic",
        speaker: "MIRA",
        text: "Verstanden. — Schönen Tag noch, Bürger.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraSystemic"),
          },
        ],
      },
      mrOpen1: {
        id: "mrOpen1",
        speaker: "MIRA",
        text: "„Resonanz-Hygiene“ steht auf jedem zweiten Aushang und in keinem Katalog. Elf Fassungen hab ich verglichen, elf Mal was anderes. Ich glaube, das ist kein Zufall. Beweisen kann ich's nicht.",
        choices: [
          { text: "Sprich weiter.", next: "mrOpen2" },
          { text: "Vielleicht ist es nur schlecht formuliert.", next: "mrCorrect" },
          { text: "Das ist mir jetzt zu groß. Lass gut sein.", next: "mrOpenDefer" },
        ],
      },
      mrCorrect: {
        id: "mrCorrect",
        speaker: "MIRA",
        text: "Möglich. Ich renne manchmal los, bevor ich fertig gedacht habe — sagt mein Onkel auch. Aber schlechte Formulierungen kann man verbessern lassen. Ich hab's versucht. Man hat mir stattdessen meine Akte erwähnt.",
        choices: [
          { text: "Sprich weiter.", next: "mrOpen2" },
          { text: "Reicht. Ich muss weiter.", next: "mrOpenDefer" },
        ],
      },
      mrOpen2: {
        id: "mrOpen2",
        speaker: "MIRA",
        text: "Ein Wort ohne Definition ist eine Blankovollmacht. Du kannst dich nicht dagegen wehren, weil du nicht weißt, wogegen. Ich denke: genau deshalb bleibt es unscharf. Ich weiß, das klingt nach These. Ist es auch.",
        choices: [
          { text: "Wer sorgt dafür?", next: "mrOpen3" },
          { text: "Reicht. Ich muss weiter.", next: "mrOpenDefer" },
        ],
      },
      mrOpen3: {
        id: "mrOpen3",
        speaker: "MIRA",
        text: "Niemand mit Namen — vielleicht auch niemand überhaupt. Vielleicht ist es einfach bequem, und Bequemlichkeit braucht keinen Plan. Meine Vermutung steht hier drauf.",
        next: "mrOpen4",
      },
      mrOpen4: {
        id: "mrOpen4",
        speaker: "SYSTEM",
        text: "[ Sie zieht ein gefaltetes Blatt aus der Innentasche und drückt es Layard in die Hand. Schnell. Geübt. ]",
        choices: [
          {
            text: "[ Annehmen ]",
            next: "mrOpen5",
            action: (api) => api.setFlag("miraOfferedFlyer"),
          },
          {
            text: "[ Ablehnen ]",
            next: "mrOpenRefuse",
            action: (api) => api.setFlag("miraOfferedFlyer"),
          },
        ],
      },
      mrOpen5: {
        id: "mrOpen5",
        speaker: "MIRA",
        text: "Lies es allein. Niemals im Terminal. Z.K.S. — Geh jetzt. Ich war nie hier.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => {
              api.setFlag("miraOpenness");
              api.setFlag("tookFlyer");
              api.addItem({
                id: "flyer",
                name: "Flugblatt",
                description: FLYER_TEXT,
              });
              api.setKnowledge("wordControl");
            },
          },
        ],
      },
      mrOpenRefuse: {
        id: "mrOpenRefuse",
        speaker: "MIRA",
        text: "Schade. — Aber ich verstehe. Wenn du es dir anders überlegst: Ich bin oft hier oben.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraOpenness"),
          },
        ],
      },
      mrOpenDefer: {
        id: "mrOpenDefer",
        speaker: "MIRA",
        text: "Auch gut. — Ich bin oft hier oben, falls du irgendwann doch mal Lust hast, weiterzudenken.",
        subtext:
          "Sie steckt etwas zurück in die Innentasche, ohne es ihm zu zeigen.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraDeferred"),
          },
        ],
      },
      mr2: {
        id: "mr2",
        speaker: "MIRA",
        text: "Gut. Lies es allein. Niemals im Terminal. Z.K.S.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => {
              api.setFlag("tookFlyer");
              api.setFlag("miraOpenness");
              api.addItem({
                id: "flyer",
                name: "Flugblatt",
                description: FLYER_TEXT,
              });
              api.setKnowledge("wordControl");
            },
          },
        ],
      },
    },
  },
  miraAfter: {
    id: "miraAfter",
    npcId: "mira",
    start: "ma1",
    lines: {
      ma1: {
        id: "ma1",
        speaker: "MIRA",
        text: "Du hast es noch. Gut. — Und du bist immer noch hier. Auch gut.",
        hiddenWhen: ["sawEmptyOffice"],
        next: "ma2",
      },
      ma1b: {
        id: "ma1b",
        speaker: "MIRA",
        text: "Du hast es noch. Gut. — Und der Verantwortliche ist immer noch keiner. Auch gut.",
        requires: ["sawEmptyOffice"],
        next: "ma2",
      },
      ma2: {
        id: "ma2",
        speaker: "MIRA",
        text: "Hör zu. Eine Sache noch. Auf 56 ist eine Tür. 5610. Steht „Technik“ dran. Ich glaube, das stimmt nur halb.",
        hiddenWhen: ["saw5610Door"],
        next: "ma3",
      },
      ma3: {
        id: "ma3",
        speaker: "MIRA",
        text: "Da drin liegt Papier, das nicht im Verzeichnis steht — Umläufe, Fassungen, Entwürfe. Wenn ich recht habe, findest du dort eine ältere Version desselben Merkblatts. Wenn ich falsch liege, ist es ein Abstellraum mit Kabeln.",
        hiddenWhen: ["saw5610Door"],
        next: "ma4",
      },
      ma4: {
        id: "ma4",
        speaker: "MIRA",
        text: "Geh hin. Schau dir's an. Sag mir, was du gesehen hast. Ich kann mich auch täuschen — kommt vor. Mehr sage ich nicht. Geh.",
        hiddenWhen: ["saw5610Door"],
        next: "maAck",
        end: true,
      },
      maAck: {
        id: "maAck",
        speaker: "MIRA",
        text: "Du hast die Tür gesehen. Gut. Lass dich nicht erwischen.",
        requires: ["saw5610Door"],
        end: true,
      },
    },
  },
  miraSystemicGreeting: {
    id: "miraSystemicGreeting",
    start: "msg1",
    lines: {
      msg1: {
        id: "msg1",
        speaker: "MIRA",
        text: "Guten Tag, Bürger.",
        subtext: "Sie sieht ihn nicht einmal an.",
        end: true,
      },
    },
  },
  miraTrustProbe: {
    id: "miraTrustProbe",
    npcId: "mira",
    start: "mtp1",
    lines: {
      mtp1: {
        id: "mtp1",
        speaker: "MIRA",
        text: "Du bist nochmal da. Mit dem Blatt. Und jetzt willst du was.",
        subtext: "Sie wirkt nicht überrascht. Eher: bereit.",
        next: "mtp2",
      },
      mtp2: {
        id: "mtp2",
        speaker: "MIRA",
        text: "Bevor ich dir mehr sage: zwei Sachen. Erstens — auf Etage 56, am Drucker, hängt ein freier Port. Wenn du einen Rechner hast, der Telnet kann, kommst du auf eine Maschine. Da liegt ein Manifest. Lies es. Nicht jetzt. Allein.",
        next: "mtp3",
      },
      mtp3: {
        id: "mtp3",
        speaker: "MIRA",
        text: "Zweitens — bring mir einen Beleg. Irgendeinen Aushang, ein Merkblatt, irgendwas Amtliches, auf dem „Resonanz-Hygiene“ steht. Nicht abgeschrieben. Gelesen und gemerkt. Ich will wissen, ob du hinschaust oder nur zuhörst.",
        next: "mtp4",
      },
      mtp4: {
        id: "mtp4",
        speaker: "MIRA",
        text: "Und eine Frage. Wenn morgen alle Merkblätter, Aushänge und Durchsagen ausfallen — ein ganzer Tag ohne Verlautbarung: Was tust du als erstes?",
        choices: [
          { text: "Ich gehe raus. Ohne Meldung.", next: "mtpAnswerGood" },
          { text: "Ich rufe die Leitstelle und frage, was los ist.", next: "mtpAnswerBad" },
          { text: "Ich warte auf die nächste Anweisung.", next: "mtpAnswerBad" },
          { text: "Nichts. Ich sitze und höre, was übrig ist.", next: "mtpAnswerGood" },
        ],
      },
      mtpAnswerGood: {
        id: "mtpAnswerGood",
        speaker: "MIRA",
        text: "Gute Antwort. — Komm wieder, wenn du das Manifest gelesen UND einen Beleg gesehen hast. Dann reden wir weiter.",
        next: "mtpCheck",
      },
      mtpAnswerBad: {
        id: "mtpAnswerBad",
        speaker: "MIRA",
        text: "Schade. — Du bist noch nicht so weit. Das ist okay, ehrlich. Ich war es letztes Jahr auch nicht.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => api.setFlag("miraTrustWithheld"),
          },
        ],
      },
      mtpCheck: {
        id: "mtpCheck",
        speaker: "SYSTEM",
        text: "[ Mira mustert ihn kurz. ]",
        requires: ["readMiraManifest", "sawResonanzAushang"],
        next: "mtpReveal",
      },
      mtpReveal: {
        id: "mtpReveal",
        speaker: "MIRA",
        text: "Beides erledigt. Ich seh's an dir. — Also gut. 4601. Vierte Etage, gleich hier um die Ecke. Klopf nicht. Tür ist offen, wenn ich da bin.",
        requires: ["readMiraManifest", "sawResonanzAushang"],
        next: "mtpReveal2",
      },
      mtpReveal2: {
        id: "mtpReveal2",
        speaker: "SYSTEM",
        text: "[ Sie drückt Layard einen kleinen, gefalteten Zettel in die Hand. ]",
        requires: ["readMiraManifest", "sawResonanzAushang"],
        choices: [
          {
            text: "[ Annehmen ]",
            action: (api) => {
              api.setFlag("miraTrustEarned");
              api.addItem({
                id: "miraDoorNote",
                name: "Zettel von Mira",
                description:
                  "Karierter Schnipsel, eckige Schrift: »4601. nicht klopfen. wenn ich da bin, ist offen. — m.« Auf der Rückseite ein winzig gemaltes Fragezeichen in einem Kasten.",
              });
            },
          },
        ],
      },
      mtpHold: {
        id: "mtpHold",
        speaker: "MIRA",
        text: "Komm wieder, wenn du beides hast. Du weißt, was zu tun ist.",
        hiddenWhen: ["miraTrustEarned"],
        end: true,
      },
    },
  },
  miraAtHomeIntro: {
    id: "miraAtHomeIntro",
    npcId: "mira",
    start: "mah1",
    lines: {
      mah1: {
        id: "mah1",
        speaker: "SYSTEM",
        text: "[ Die Tür war angelehnt. Mira sitzt im Schneidersitz auf dem Bett, ein offenes Schulbuch im Schoß, daneben ein Stapel sortierter Aushänge. ]",
        next: "mah2",
      },
      mah2: {
        id: "mah2",
        speaker: "MIRA",
        text: "Du hast tatsächlich nicht geklopft. Das ist die erste Bewährung.",
        subtext: "Sie lächelt halb. Es wirkt geübt — als hätte sie den Satz aufgespart.",
        next: "mah3",
      },
      mah3: {
        id: "mah3",
        speaker: "MIRA",
        text: "Setz dich, wenn du willst. Oder steh. Ist eh ein bisschen klein hier. — Frag, was du fragen wolltest.",
        choices: [
          {
            text: "[ Bleiben und reden ]",
            action: (api) => api.setFlag("miraAtHomeMet"),
          },
        ],
      },
    },
  },
  // ── Pflicht-Rätsel: kaputtes Telefon ──────────────────────────────
  miraFaultReport: {
    id: "miraFaultReport",
    npcId: "mira",
    start: "mfr1",
    lines: {
      mfr1: {
        id: "mfr1",
        speaker: "SYSTEM",
        text: "[ Layard klopft. Zweimal. Es dauert. Dann geht die Tür einen Spalt auf. ]",
        next: "mfr2",
      },
      mfr2: {
        id: "mfr2",
        speaker: "MIRA",
        text: "Geklopft. Na gut. Was ist?",
        choices: [
          {
            text: "Störung. Wohnungsapparat 4617. Etagenwartung, Schicht A — das bist du.",
            next: "mfr3",
          },
          {
            text: "Mein Telefon ist tot. Und angeblich kannst nur du das reparieren.",
            next: "mfr3",
          },
        ],
      },
      mfr3: {
        id: "mfr3",
        speaker: "MIRA",
        text: "Schicht A, Korridor 46. Ja. Steht auf einem Aushang, den außer mir keiner liest. — Ich bin Anwärterin, kein Techniker. Aber ich habe den Prüfstecker. Die einzige Zange auf der Etage, die noch was taugt.",
        subtext: "Sie sagt es ohne Stolz. Eher wie eine Tatsache, die sie ärgert.",
        next: "mfr4",
      },
      mfr4: {
        id: "mfr4",
        speaker: "MIRA",
        text: "Dienstvorgang. Ich muss. Also los, bevor ich's mir überlege.",
        hiddenWhen: ["miraTrustEarned"],
        choices: [
          {
            text: "[ Mira mitnehmen ]",
            action: (api) => {
              api.setFlag("knowsMiraIsWartung");
              api.startDialog("miraRepairScene");
            },
          },
        ],
      },
      mfr4b: {
        id: "mfr4b",
        speaker: "MIRA",
        text: "Du hättest auch einfach fragen können, statt den Dienstweg zu zitieren. — Warte, ich hole den Gürtel.",
        requires: ["miraTrustEarned"],
        choices: [
          {
            text: "[ Mira mitnehmen ]",
            action: (api) => {
              api.setFlag("knowsMiraIsWartung");
              api.startDialog("miraRepairScene");
            },
          },
        ],
      },
    },
  },
  miraRepairScene: {
    id: "miraRepairScene",
    npcId: "mira",
    start: "mrs1",
    lines: {
      mrs1: {
        id: "mrs1",
        speaker: "SYSTEM",
        text: "[ 4617. Mira schraubt die Anschlussdose auf, ohne den Raum anzusehen. Ein Werkzeuggürtel, zwei Nummern zu groß. ]",
        next: "mrs2",
      },
      mrs2: {
        id: "mrs2",
        speaker: "MIRA",
        text: "Da. Ader durchgescheuert, an der Klemme. Das passiert, wenn jemand die Leitung mal quer durch den Schacht gezogen hat und danach niemand mehr zuständig war.",
        next: "mrs3",
      },
      mrs3: {
        id: "mrs3",
        speaker: "MIRA",
        text: "Weißt du, wie das im Meldebogen heißt? „Resonanzbedingte Beeinträchtigung der Hausleitung.“ — Es ist ein Draht. Ein durchgescheuerter Draht.",
        subtext: "Sie hält den Kupferrest hoch wie ein Beweisstück.",
        next: "mrs4",
      },
      mrs4: {
        id: "mrs4",
        speaker: "MIRA",
        text: "Und? Sagst du jetzt, ich soll nicht so viel hineinlesen?",
        choices: [
          { text: "Nein. Sag weiter.", next: "mrs5" },
          { text: "Es ist trotzdem nur ein Draht.", next: "mrs5b" },
        ],
      },
      mrs5: {
        id: "mrs5",
        speaker: "MIRA",
        text: "Wenn ein Wort für alles herhalten kann, prüft am Ende keiner mehr, was wirklich kaputt war. — Kann sein, dass ich das zu groß denke. Kommt vor.",
        next: "mrs6",
      },
      mrs5b: {
        id: "mrs5b",
        speaker: "MIRA",
        text: "Ja. Genau das ist mein Punkt. Es ist ein Draht — und im Bogen steht ein Wort, das nach Zustand klingt. Ich behaupte nichts. Ich finde es nur bemerkenswert.",
        next: "mrs6",
      },
      mrs6: {
        id: "mrs6",
        speaker: "SYSTEM",
        text: "[ Sie klemmt neu, dreht die Dose zu, hebt ab. Ein Freizeichen, dünn, aber da. ]",
        hiddenWhen: ["miraTrustEarned"],
        choices: [
          {
            text: "[ Danke sagen ]",
            action: (api) => {
              api.setFlag("miraRepairDone");
              api.setFlag("phoneRepaired");
              api.showText([
                "„Geht wieder“, sagt Mira. „Meldebogen schreibe ich nicht. Dann bleibt es ein Draht.“",
                "Sie ist schon an der Tür, bevor Layard antworten kann.",
              ]);
            },
          },
        ],
      },
      mrs6b: {
        id: "mrs6b",
        speaker: "SYSTEM",
        text: "[ Sie klemmt neu, dreht die Dose zu, hebt ab. Ein Freizeichen, dünn, aber da. ]",
        requires: ["miraTrustEarned"],
        next: "mrs7b",
      },
      mrs7b: {
        id: "mrs7b",
        speaker: "MIRA",
        text: "Mein Vater hat solche Klemmen gesetzt. Unten, in 56. Als er nicht mehr hochkam, stand im Bericht „menschliches Versagen“. Zwei Wörter für einen Mann.",
        subtext: "Sie sagt es beiläufig. Das ist das Schlimmste daran.",
        next: "mrs8b",
      },
      mrs8b: {
        id: "mrs8b",
        speaker: "MIRA",
        text: "Roald hat's damals unterschrieben, weil man das unterschreibt. — Egal. Dein Telefon geht. Ruf an, wen du anrufen musst.",
        requires: ["miraTrustEarned"],
        choices: [
          {
            text: "[ Danke sagen ]",
            action: (api) => {
              api.setFlag("miraRepairDone");
              api.setFlag("phoneRepaired");
            },
          },
        ],
      },
    },
  },
  miraAtHomeIntroLegacy: {
    id: "miraAtHomeIntro",
    npcId: "mira",
    start: "mah1",
    lines: {
      mah1: {
        id: "mah1",
        speaker: "SYSTEM",
        text: "[ Die Tür war angelehnt. Mira sitzt im Schneidersitz auf dem Bett, ein offenes Schulbuch im Schoß, daneben ein Stapel sortierter Aushänge. ]",
        next: "mah2",
      },
      mah2: {
        id: "mah2",
        speaker: "MIRA",
        text: "Du hast tatsächlich nicht geklopft. Das ist die erste Bewährung.",
        subtext: "Sie lächelt halb. Es wirkt geübt — als hätte sie den Satz aufgespart.",
        next: "mah3",
      },
      mah3: {
        id: "mah3",
        speaker: "MIRA",
        text: "Setz dich, wenn du willst. Oder steh. Ist eh ein bisschen klein hier. — Frag, was du fragen wolltest.",
        choices: [
          {
            text: "[ Bleiben und reden ]",
            action: (api) => api.setFlag("miraAtHomeMet"),
          },
        ],
      },
    },
  },
  // ── Beleg-Sammlung (ersetzt die frühere Verstärker-Quest) ──────────
  miraEvidenceAsk: {
    id: "miraEvidenceAsk",
    npcId: "mira",
    start: "me1",
    lines: {
      me1: {
        id: "me1",
        speaker: "MIRA",
        text: "Gut, dass du nochmal kommst. Ich brauche jemanden, der durch drei Etagen laufen kann, ohne dass jemand fragt, warum.",
        next: "me2",
      },
      me2: {
        id: "me2",
        speaker: "MIRA",
        text: "Ich schreibe eine Eingabe an die Bewohnervertretung. Eine einzige Frage: Was heißt „Resonanz-Hygiene“, wörtlich? Damit das kein Meckerbrief wird, brauche ich drei Fundstellen, die sich widersprechen.",
        subtext: "Sie deutet auf den sortierten Stapel neben sich.",
        next: "me3",
      },
      me3: {
        id: "me3",
        speaker: "MIRA",
        text: "Drei Stück reichen: der Aushang im Aufzug, das Plakat im Korridor 46 und der Aushang in der Leitstelle E67. Lies sie. Wirklich lesen, nicht angucken. Dann komm zurück und sag mir, was drin steht.",
        next: "me4",
      },
      me4: {
        id: "me4",
        speaker: "LAYARD",
        text: "Und dann? Antwortet dir dann jemand?",
        next: "me5",
      },
      me5: {
        id: "me5",
        speaker: "MIRA",
        text: "Wahrscheinlich nicht. Aber dann steht die Frage im Umlauf, mit Datum. Ich weiß, dass das wenig ist. Es ist trotzdem mehr als gar nichts.",
        choices: [
          {
            text: "Verstanden — ich schau mir die drei an.",
            action: (api) => api.setFlag("miraAskedEvidence"),
          },
          {
            text: "Klingt nach mehr Ärger, als ich heute brauche.",
            action: (api) => api.setFlag("miraAskedEvidence"),
          },
        ],
      },
    },
  },
  miraEvidenceWait: {
    id: "miraEvidenceWait",
    npcId: "mira",
    start: "mw1",
    lines: {
      mw1: {
        id: "mw1",
        speaker: "MIRA",
        text: "Drei Fundstellen, Worag: Aufzug, Korridor 46, Leitstelle E67. Lies sie und komm wieder. Ich kann die Eingabe nicht abschicken, solange sie auf nichts verweist.",
        end: true,
      },
    },
  },
  miraEvidenceDeliver: {
    id: "miraEvidenceDeliver",
    npcId: "mira",
    start: "md1",
    lines: {
      md1: {
        id: "md1",
        speaker: "LAYARD",
        text: "Drei Aushänge. Drei Fassungen. Keine davon sagt, was das Wort bedeutet.",
        next: "md2",
      },
      md2: {
        id: "md2",
        speaker: "MIRA",
        text: "Sag die Reihenfolge. — Aufzug: „Pflichtinformation“. Korridor: „bei anhaltender Überlastung“. Leitstelle: „Pausen sind Teil der Behandlung“. Drei Verwaltungen, drei Bedeutungen, ein Wort.",
        subtext: "Sie schreibt mit. Schnell, ohne aufzusehen.",
        next: "md3",
      },
      md3: {
        id: "md3",
        speaker: "MIRA",
        text: "Das reicht. Nicht für einen Skandal — dafür reicht es nie. Aber für eine Frage, die man aktenmäßig beantworten muss. Danke. Ehrlich.",
        choices: [
          {
            text: "[ Beenden ]",
            action: (api) => {
              api.setFlag("miraEvidenceDelivered");
              api.setFlag("miraTerminalUnlocked");
            },
          },
        ],
      },
    },
  },
  miraAfterEvidence: {
    id: "miraAfterEvidence",
    npcId: "mira",
    start: "mf1",
    lines: {
      mf1: {
        id: "mf1",
        speaker: "MIRA",
        text: "Die Eingabe ist raus. Mit Datum, mit drei Fundstellen, mit meinem Namen drunter. Wenn sie nicht antworten, ist das auch eine Antwort.",
        next: "mf2",
      },
      mf2: {
        id: "mf2",
        speaker: "MIRA",
        text: "Das Terminal ist offen. Schau dich um, lies, was du willst. Ich passe nicht auf. Wenn du was kaputt machst, ist es eh nicht meins.",
        end: true,
      },
    },
  },
};
