import type { DialogTree } from "./types";

export const dialogs: Record<string, DialogTree> = {
  philippeIntro: {
    id: "philippeIntro",
    start: "p1",
    lines: {
      p1: {
        id: "p1",
        speaker: "PHILIPPE",
        text: "Worag. Sie müssen sofort kommen. 2613.",
        subtext: "Angst. Echte Angst. Er hat das nicht im Schauspielkurs gelernt.",
        next: "p2",
      },
      p2: {
        id: "p2",
        speaker: "LAYARD",
        text: "Was ist passiert?",
        next: "p3",
      },
      p3: {
        id: "p3",
        speaker: "PHILIPPE",
        text: "Klopfen. Seit … ich weiß nicht, drei Stunden. Erst rhythmisch. Jetzt nur noch — nicht mehr rhythmisch.",
        subtext: "Er hat zugehört. Lange. Ohne etwas zu tun. Schuld.",
        next: "p4",
      },
      p4: {
        id: "p4",
        speaker: "PHILIPPE",
        text: "Ich habe versucht zu klingeln. Niemand öffnet. Sie müssen die Leitstelle anrufen. Mein Telefon. Da drüben.",
        next: "p5",
      },
      p5: {
        id: "p5",
        speaker: "SYSTEM",
        text: "[ Philippes alter Beigetelefon-Apparat steht auf dem Beistelltisch. Wähle 001. ]",
        end: true,
      },
    },
  },

  insa1: {
    id: "insa1",
    start: "i1",
    lines: {
      i1: {
        id: "i1",
        speaker: "INSA",
        text: "Leitstelle E67. Bauerfeind.",
        subtext: "Erschöpfung. Routine. Etwas darunter.",
        next: "i2",
      },
      i2: {
        id: "i2",
        speaker: "LAYARD",
        text: "Worag, 2611. Es gibt einen Vorfall in 2613. Mein Nachbar Philippe sagt — Klopfen, das nicht aufhört.",
        next: "i3",
      },
      i3: {
        id: "i3",
        speaker: "INSA",
        text: "Verstanden. Ich habe das Klopfen seit gestern Nacht hier auf dem Bildschirm. Sanitäter sind unterwegs. Bitte bleiben Sie vor Ort.",
        next: "i4",
      },
      i4: {
        id: "i4",
        speaker: "INSA",
        text: "Sie nehmen das Einsatzprotokoll von den Sanitätern entgegen. Es ist verschlüsselt. Sie tragen es zur Sektor-Tür E67/E71. Ist das verstanden?",
        subtext: "Sie ist froh, dass jemand antwortet. Wirklich froh.",
        next: "i5",
      },
      i5: {
        id: "i5",
        speaker: "LAYARD",
        text: "Verstanden.",
        next: "i6",
      },
      i6: {
        id: "i6",
        speaker: "SYSTEM",
        text: "[ Hörer eingehängt. Die Sanitäter klopfen bereits an Tür 2613. ]",
        end: true,
      },
    },
  },

  paramedic: {
    id: "paramedic",
    start: "s1",
    lines: {
      s1: {
        id: "s1",
        speaker: "SANITÄTER",
        text: "Bewohner Worag? Hier. Einsatzprotokoll, verschlüsselt. Ziel: Sektor E71, Zimmer 1534.",
        subtext: "Routine. Kein Mitgefühl. Tausend solche Einsätze.",
        next: "s2",
      },
      s2: {
        id: "s2",
        speaker: "LAYARD",
        text: "Was hat er?",
        next: "s3",
      },
      s3: {
        id: "s3",
        speaker: "SANITÄTER",
        text: "Resonanz-Überlastung. Stand zu lange auf einer Frequenz. Und sein Herz — wir wissen es nicht. Wegen Krankheiten und …",
        subtext: "Er beendet diesen Satz nie. Niemand beendet ihn.",
        next: "s4",
      },
      s4: {
        id: "s4",
        speaker: "SANITÄTER",
        text: "Gehen Sie. Sektor-Tür. Code haben Sie hoffentlich.",
        end: true,
      },
    },
  },

  insa2: {
    id: "insa2",
    start: "x1",
    lines: {
      x1: {
        id: "x1",
        speaker: "INSA",
        text: "Bauerfeind. Worag, schon wieder?",
        subtext: "Sie wartet auf etwas. Nicht auf den Feierabend.",
        next: "x2",
      },
      x2: {
        id: "x2",
        speaker: "LAYARD",
        text: "Die Sektor-Tür. Error 4567. Ich brauche einen Code.",
        next: "x3",
      },
      x3: {
        id: "x3",
        speaker: "INSA",
        text: "Wartungsarbeiten am Gateway. Ich sehe es hier. Sie haben vorhin selbst eine Störungsmeldung eingereicht — das war korrekt, Herr Worag. Die meisten Bewohner ignorieren sowas.",
        next: "x4",
      },
      x4: {
        id: "x4",
        speaker: "LAYARD",
        text: "Danke. Und … der Code für die Tür?",
        next: "x5",
      },
      x5: {
        id: "x5",
        speaker: "INSA",
        text: "Den darf ich nicht direkt herausgeben. Aber er steht in der Mail, die ich Ihnen gerade ins Terminal lege. Sie wissen schon — das Datum.",
        subtext: "Sie hätte ihn sagen können. Sie wollte nicht.",
        next: "x6",
        choices: [
          {
            text: "Pause … [Schmerz-Radio aktiv lassen]",
            requiresRadio: true,
            next: "x7radio",
          },
          {
            text: "Verstanden. Auf Wiederhören.",
            next: "x8",
          },
        ],
      },
      x7radio: {
        id: "x7radio",
        speaker: "INSA",
        text: "[Pause] … Herr Worag. Haben Sie eigentlich schon mal E67 verlassen?",
        subtext: "Sie fragt das nicht aus Höflichkeit.",
        next: "x7b",
      },
      x7b: {
        id: "x7b",
        speaker: "LAYARD",
        text: "… Nein.",
        next: "x7c",
      },
      x7c: {
        id: "x7c",
        speaker: "INSA",
        text: "Heute könnten Sie. Auf Wiederhören.",
        next: "x8",
      },
      x8: {
        id: "x8",
        speaker: "SYSTEM",
        text: "[ Im Terminal liegt jetzt eine E-Mail. Datum: 06.11.1997. Code-Format: ohne Punkte. ]",
        end: true,
      },
    },
  },

  reception: {
    id: "reception",
    start: "r1",
    lines: {
      r1: {
        id: "r1",
        speaker: "RECEPTION",
        text: "Sektor E71 — Medizin. Sie sind … Worag, korrekt? Quadrant E67. Ihr Eintritt wurde von der Leitstelle vorgemerkt.",
        subtext: "Vorgemerkt. Wie ein Paket, das man erwartet hat.",
        next: "r2",
      },
      r2: {
        id: "r2",
        speaker: "LAYARD",
        text: "Ich bringe das Einsatzprotokoll. Zimmer 1534.",
        next: "r3",
      },
      r3: {
        id: "r3",
        speaker: "RECEPTION",
        text: "Korridor 15. Erste Tür rechts, dann den langen Gang bis zum Ende. Die rote Tür.",
        next: "r4",
      },
      r4: {
        id: "r4",
        speaker: "RECEPTION",
        text: "Eine Bitte: Bleiben Sie nicht zu lange. Frequenz 104,6 ist in diesem Sektor … unstabil.",
        subtext: "Sie weiß, dass er sie kennt. Sie sagt es trotzdem.",
        next: "r5",
      },
      r5: {
        id: "r5",
        speaker: "SYSTEM",
        text: "[ Sie schiebt einen kleinen Besucherchip über den Tresen. Schweigend. ]",
        end: true,
      },
    },
  },

  mikael: {
    id: "mikael",
    start: "m1",
    lines: {
      m1: {
        id: "m1",
        speaker: "SYSTEM",
        text: "[ Der alte Mann öffnet die Augen, langsam. Er wirkt überrascht, dass jemand kommt. ]",
        next: "m2",
      },
      m2: {
        id: "m2",
        speaker: "MIKAEL",
        text: "Sie sind … nicht in Uniform. Gut. Ich habe genug von Uniformen.",
        subtext: "Erleichterung. Und etwas, das wie Wiedererkennen aussieht.",
        next: "m3",
      },
      m3: {
        id: "m3",
        speaker: "LAYARD",
        text: "Mein Name ist Worag. Ich bringe ein Protokoll.",
        next: "m4",
      },
      m4: {
        id: "m4",
        speaker: "MIKAEL",
        text: "Worag. Sie sind der Hörer aus E67. Ich höre Sie seit Jahren auf 102,3.",
        subtext: "Hörer. Nicht „Bewohner“. Ein anderes Wort.",
        next: "m5",
      },
      m5: {
        id: "m5",
        speaker: "LAYARD",
        text: "Sie hören … mich?",
        next: "m6",
      },
      m6: {
        id: "m6",
        speaker: "MIKAEL",
        text: "Das Schmerz-Radio sendet nicht nur, Herr Worag. Es ist eine Schleife. Wer empfängt, sendet auch. 102,3. Einsamkeit. Sehr klar bei Ihnen.",
        subtext: "Schuld? Nein. Mitgefühl. Lange geübt.",
        next: "m7",
      },
      m7: {
        id: "m7",
        speaker: "LAYARD",
        text: "Das wurde uns nie gesagt.",
        next: "m8",
      },
      m8: {
        id: "m8",
        speaker: "MIKAEL",
        text: "Nein. Sonst würde niemand zuhören. Die Leitstelle hört. Sie wissen, wer sich auf 104,6 verstimmt. Sie wissen, wann jemand … abweicht.",
        subtext: "Er meint Sie. Er meint heute. Er meint Insa.",
        next: "m9",
      },
      m9: {
        id: "m9",
        speaker: "MIKAEL",
        text: "Ich habe die ersten Geräte mitgebaut. Damals war es noch ein Empfänger. Erst dann kam der Sender. Erst dann kamen die Quadranten.",
        next: "m10",
      },
      m10: {
        id: "m10",
        speaker: "LAYARD",
        text: "Warum erzählen Sie mir das?",
        next: "m11",
      },
      m11: {
        id: "m11",
        speaker: "MIKAEL",
        text: "Weil heute jemand kommt, der zuhören kann. Und weil die Schubladen-Reihe an meinem Bett nicht aus Holz ist. Da liegt etwas. Für Sie.",
        next: "m12",
      },
      m12: {
        id: "m12",
        speaker: "SYSTEM",
        text: "[ Mikaels Hand zittert. Er deutet auf den Nachttisch und auf den kleinen amber-glühenden Empfänger neben sich. ]",
        end: true,
      },
    },
  },

  mikaelLast: {
    id: "mikaelLast",
    start: "ml1",
    lines: {
      ml1: {
        id: "ml1",
        speaker: "MIKAEL",
        text: "Der Kristall stimmt das Radio jenseits von 104,6. Auf Frequenzen, die die Leitstelle … nicht eingetragen hat.",
        subtext: "Stolz. Sehr alter Stolz.",
        next: "ml2",
      },
      ml2: {
        id: "ml2",
        speaker: "MIKAEL",
        text: "Der Brief ist für Insa Bauerfeind. Wenn Sie heute zurückgehen, geben Sie ihn ihr. Persönlich. Nicht über das Terminal.",
        next: "ml3",
      },
      ml3: {
        id: "ml3",
        speaker: "LAYARD",
        text: "Sie kennen sie?",
        next: "ml4",
      },
      ml4: {
        id: "ml4",
        speaker: "MIKAEL",
        text: "Sie ist meine Tochter. Sie hat seit elf Jahren keinen Sektorwechsel beantragt. Sie wartet. Auf jemanden wie Sie. Heute zum Beispiel.",
        subtext: "Es kostet ihn etwas, das auszusprechen. Er tut es trotzdem.",
        next: "ml5",
      },
      ml5: {
        id: "ml5",
        speaker: "MIKAEL",
        text: "Gehen Sie. Bevor die Sanitäter aus E67 hier oben sind. Und Worag — schalten Sie das Radio aus, wenn Sie den Aufzug betreten. Nur einmal. Probieren Sie es.",
        next: "ml6",
      },
      ml6: {
        id: "ml6",
        speaker: "SYSTEM",
        text: "[ Der Monitor neben dem Bett zeigt eine flache Linie. Der amber Empfänger erlischt. ]",
        end: true,
      },
    },
  },

  insa3: {
    id: "insa3",
    start: "n1",
    lines: {
      n1: {
        id: "n1",
        speaker: "INSA",
        text: "Bauerfeind. — Worag, sind Sie das? Sie sind in E71.",
        subtext: "Sie hat Ihren Standort auf dem Schirm. Schon eine Weile.",
        next: "n2",
      },
      n2: {
        id: "n2",
        speaker: "LAYARD",
        text: "Ich war in Zimmer 1534.",
        next: "n3",
      },
      n3: {
        id: "n3",
        speaker: "INSA",
        text: "[ … ]",
        subtext: "Sie atmet aus. Lautlos. Sie wusste es.",
        next: "n4",
      },
      n4: {
        id: "n4",
        speaker: "INSA",
        text: "Hören Sie zu. In genau elf Minuten gibt die Leitstelle 001 eine Sektor-Sperre für E67/E71 aus. Wartungsfenster. Standardprotokoll bei „Hörer-Drift“.",
        next: "n5",
      },
      n5: {
        id: "n5",
        speaker: "INSA",
        text: "Wenn Sie in E67 sein wollen, müssen Sie jetzt in den Aufzug. Wenn Sie in E71 bleiben wollen — auch.",
        subtext: "Sie zwingt Sie zu wählen. Zum ersten Mal seit Jahren.",
        next: "n6",
      },
      n6: {
        id: "n6",
        speaker: "LAYARD",
        text: "Ich habe etwas für Sie. Von ihm.",
        next: "n7",
      },
      n7: {
        id: "n7",
        speaker: "INSA",
        text: "Dann kommen Sie zurück. Bitte. — Auf Wiederhören, Herr Worag.",
        subtext: "Bitte. Sie hat „bitte“ gesagt.",
        next: "n8",
      },
      n8: {
        id: "n8",
        speaker: "SYSTEM",
        text: "[ Verbindung getrennt. Der Aufzug am Ende des Korridors öffnet sich. ]",
        end: true,
      },
    },
  },
};