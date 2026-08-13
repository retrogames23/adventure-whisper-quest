import type { GameApi, DialogTree } from "../types";

/**
 * Walter Grewe — Wohnung 1103, Gebäude E71, Etage 1.
 * Mitte 50, Alt-68er trifft Garagentüftler. Springt zwischen dem
 * sozialen und dem technischen Resonanz-Begriff hin und her.
 *
 * Kern der Szene: Spricht Layard ihn auf die Häufung der
 * Resonanz-Überlastungen an, erklärt Walter seine Peilung —
 * verstärkter Träger auf 104,6, Richtung Nordwest, 300 bis 500 Meter.
 * Das ist, mit Vorbehalt, E67. Layards eigenes Gebäude.
 */
export const walterDialogs: Record<string, DialogTree> = {
  walterIntro: {
    id: "walterIntro",
    start: "wi0",
    npcId: "walter",
    onStart: (api) => api.setFlag("metWalter"),
    lines: {
      wi0: {
        id: "wi0",
        speaker: "WALTER",
        text: "Bitte nicht so fest auftreten! Ich führe gerade eine sensible Resonanz-Messung durch!",
        subtext:
          "Er spricht ohne aufzusehen, den Blick auf einen schwankenden Zeiger gerichtet, während er an einem Knopf dreht.",
        next: "wi1",
      },
      wi1: {
        id: "wi1",
        speaker: "WALTER",
        text: "Nicht an den Rahmen stoßen, der steht auf zwei Grad genau. — Walter. Kaffee steht da, die Tasse ist sauber, das Innere jedenfalls.",
        subtext:
          "Grauer Zopf, Brille auf der Nasenspitze, Strickjacke mit Brandloch. Er dreht weiter an einem Knopf, während er redet.",
        next: "wi2",
      },
      wi2: {
        id: "wi2",
        speaker: "WALTER",
        text: "Sie sind der aus der Registratur, ja? Herbert hat erzählt, dass jemand mit Mantel Fragen stellt. Fragen sind gut. Fragen sind selten. Setzen Sie sich irgendwo hin, wo nichts angeschlossen ist.",
        next: "wHub",
      },
      wHub: {
        id: "wHub",
        speaker: "WALTER",
        text: "Also. Was wollen Sie wissen?",
        choicesFn: (api) => [
          {
            text: "Was ist das hier alles?",
            next: "tech1",
            action: (a: GameApi) => a.setFlag("walterTech"),
          },
          {
            text: "Sie messen Resonanz? Das ist doch ein Verwaltungswort.",
            next: "res1",
            action: (a: GameApi) => a.setFlag("walterResonanz"),
          },
          {
            text: "Im Sektor häufen sich Resonanz-Überlastungen. Sagt Ihnen das etwas?",
            next: "peil1",
          },
          { text: "Ich schaue mich nur um.", next: "wBye" },
        ],
      },

      // ── Die Apparate ─────────────────────────────────────────
      tech1: {
        id: "tech1",
        speaker: "WALTER",
        text: "Das älteste Stück ist der Rahmen, achtunddreißig, den habe ich aus einer Kellerauflösung. Daneben ein Empfänger von sechsundfünfzig, ein Feldstärkemesser von siebzig, der Schreiber ist neu, so neu wie hier etwas ist: zweiundachtzig.",
        next: "tech2",
      },
      tech2: {
        id: "tech2",
        speaker: "WALTER",
        text: "Alles Trödel, alles besser als das, was man heute kaufen kann. Ein Zeiger lügt nicht. Der zittert, wenn er unsicher ist, und das sieht man ihm an. Bei einer Ziffer sieht man gar nichts.",
        next: "wHub",
      },

      // ── Resonanz: sozial vs. technisch ──────────────────────
      res1: {
        id: "res1",
        speaker: "WALTER",
        text: "Verwaltungswort, richtig. Und ein Diebstahl. Resonanz ist Physik, seit Galilei, und dann kommt der Mandatsrat und macht daraus Belegungsdichte und Ruhezeiten und Türsiegel. Ich habe den Begriff nicht geklaut. Ich habe ihn nur zurückgemessen.",
        next: "res2",
      },
      res2: {
        id: "res2",
        speaker: "WALTER",
        text: "Ist ja auch nicht falsch, das Soziale. Sechshundert Leute in einem Betonkasten, das schwingt. Streit in 1408 hört man in 1412, und drei Tage später schreibt einer eine Beschwerde, und das ist derselbe Vorgang, nur langsamer.",
        next: "res3",
      },
      res3: {
        id: "res3",
        speaker: "WALTER",
        text: "Nur: In dem Moment, wo Sie das messen wollen, brauchen Sie eine Einheit. Der Rat hat keine. Der Rat hat einen Index. Ein Index ohne Einheit ist eine Meinung mit Nachkommastelle.",
        next: "wHub",
      },

      // ── Kern: die Peilung ───────────────────────────────────
      peil1: {
        id: "peil1",
        speaker: "WALTER",
        text: "Das sagt mir sogar sehr viel. Warten Sie.",
        subtext:
          "Er stellt die Tasse ab, zum ersten Mal ohne hinzusehen, und dreht den Schreiber zu Layard herum.",
        next: "peil2",
      },
      peil2: {
        id: "peil2",
        speaker: "WALTER",
        text: "Hundertvier Komma sechs. Sie kennen das Band, jeder kennt es, keiner hört es. Da liegt seit Wochen ein Träger drauf, der da nicht hingehört. Nicht das Signal — der Pegel. Der ist zu groß.",
        choicesFn: () => [
          { text: "Zu groß wofür?", next: "peil3" },
          { text: "Woher wollen Sie das wissen?", next: "peil3" },
        ],
      },
      peil3: {
        id: "peil3",
        speaker: "WALTER",
        text: "So ein Gerät ist ein Bastelding. Ein Milliwatt, ein paar hundert Meter, und dabei rauscht es wie ein Wasserhahn. Was ich hier habe, ist sauber und steht still: gleiche Mittenfrequenz, Tag für Tag, kein Wegdriften, wenn die Heizung anspringt.",
        next: "peil4",
      },
      peil4: {
        id: "peil4",
        speaker: "WALTER",
        text: "Das kriegen Sie mit einem freischwingenden Oszillator nicht hin. Dafür brauchen Sie einen Quarz. Und für den Pegel eine Endstufe. Und damit es überhaupt rauskommt, eine ordentliche Antenne, hoch montiert. Kurz: Da hat jemand verstärkt. Mit Absicht und mit Werkzeug.",
        next: "peil5",
      },
      peil5: {
        id: "peil5",
        speaker: "WALTER",
        text: "Und der Schreiber sagt: elf Tage konstant. Kein Mensch, der abends mal einschaltet. Das läuft durch.",
        choicesFn: () => [
          { text: "Können Sie sagen, woher es kommt?", next: "peil6" },
        ],
      },
      peil6: {
        id: "peil6",
        speaker: "WALTER",
        text: "Kann ich. Deswegen steht der Rahmen da. Eine Rahmenantenne hat keine Kugel, die hat eine Acht: zwei Richtungen, in denen sie gut hört, und zwei, in denen sie fast nichts hört. Man peilt nicht auf das Maximum, man peilt auf das Minimum.",
        next: "peil7",
      },
      peil7: {
        id: "peil7",
        speaker: "WALTER",
        text: "Das Maximum ist eine breite Kuppe, da können Sie zwanzig Grad danebenliegen und merken es nicht. Das Minimum ist ein Loch, zwei Grad breit. Da fällt der Zeiger rein wie in einen Gully. Das können Sie ablesen.",
        next: "peil8",
      },
      peil8: {
        id: "peil8",
        speaker: "WALTER",
        text: "Bleibt das Problem: Eine Acht ist symmetrisch, sie sagt Ihnen die Linie, nicht die Seite. Also hänge ich eine kleine Hilfsantenne dazu. Auf der einen Seite addieren sich die beiden, auf der anderen löschen sie sich aus. Wo es lauter wird, da steht der Sender.",
        next: "peil9",
      },
      peil9: {
        id: "peil9",
        speaker: "WALTER",
        text: "Und weil eine Linie noch kein Punkt ist, macht man das zweimal von zwei Orten. Einmal hier am Fenster, einmal im Treppenhaus zwei Etagen höher. Zwei Linien, ein Kreuz. Da oben auf dem Plan.",
        subtext: "Er tippt mit dem Bleistiftende auf den Schnittpunkt.",
        next: "peil10",
      },
      peil10: {
        id: "peil10",
        speaker: "WALTER",
        text: "Richtung: Nordwest. Da bin ich mir sicher.",
        choicesFn: () => [
          { text: "Und die Entfernung?", next: "peil11" },
        ],
      },
      peil11: {
        id: "peil11",
        speaker: "WALTER",
        text: "Die ist ungenauer, weil ich sie mir erschließen muss. Ich messe die Feldstärke an mehreren Punkten — Fenster, Korridor, Treppenhaus, Dachluke — und trage sie gegen den Weg auf. Ein Sender wird mit dem Quadrat der Entfernung schwächer. Aus dem Abfall lässt sich die Strecke zurückrechnen.",
        next: "peil12",
      },
      peil12: {
        id: "peil12",
        speaker: "WALTER",
        text: "Das Problem: Ich kenne die Sendeleistung nicht. Also nehme ich eine Spanne an, was man in ein Bastelgehäuse mit Endstufe hineinbekommt, und rechne beide Ränder aus. Heraus kommt keine Zahl, heraus kommt ein Ring: mindestens dreihundert Meter, höchstens fünfhundert.",
        next: "peil13",
      },
      peil13: {
        id: "peil13",
        speaker: "WALTER",
        text: "Deshalb sage ich dreihundert bis fünfhundert und nicht vierhundert. Wer vierhundert sagt, verkauft Ihnen eine Genauigkeit, die er nicht hat.",
        choicesFn: () => [
          {
            text: "Was steht da in der Richtung?",
            next: "peil14",
            action: (a: GameApi) => a.setFlag("walterBearing"),
          },
        ],
      },
      peil14: {
        id: "peil14",
        speaker: "WALTER",
        text: "Genau das habe ich mich auch gefragt. Nordwest, in dem Ring, mit einem Dach, auf das man so eine Antenne stellen kann, ohne dass jemand fragt — da bleibt praktisch eins übrig.",
        next: "peil15",
      },
      peil15: {
        id: "peil15",
        speaker: "WALTER",
        text: "E67.",
        subtext:
          "Layard sagt eine Sekunde lang nichts. Das ist die Adresse, unter der er seit vierzehn Jahren schläft.",
        next: "peil16",
      },
      peil16: {
        id: "peil16",
        speaker: "WALTER",
        text: "Bevor Sie das jetzt irgendwohin schreiben: Ich verkaufe Ihnen das als Messung, nicht als Beweis. Beton und Stahl werfen zurück. Ich habe im Korridor zwei Stellen mit einem Geisterminimum, das ist eine Reflexion, keine Quelle. Ich glaube meinen Linien. Ich glaube ihnen nicht blind.",
        next: "peil17",
      },
      peil17: {
        id: "peil17",
        speaker: "WALTER",
        text: "Und ob das mit Ihren Überlastungen zusammenhängt, weiß ich nicht. Ein Arzt sagt Ihnen, die Leute sind erschöpft, und das stimmt vermutlich. Ich sage Ihnen nur: Da läuft seit elf Tagen etwas Verstärktes durch, und niemand hat es aufgeschrieben. Jetzt haben Sie es aufgeschrieben.",
        next: "wHub",
      },

      wBye: {
        id: "wBye",
        speaker: "WALTER",
        text: "Machen Sie. Wenn Sie gehen, Tür nur anlehnen, der Zug reißt mir sonst das Papier vom Schreiber.",
      },
    },
  },

  // ── Wiederansprache ────────────────────────────────────────
  walterHub: {
    id: "walterHub",
    start: "wh1",
    npcId: "walter",
    lines: {
      wh1: {
        id: "wh1",
        speaker: "WALTER",
        text: "Der Mantel. Kaffee ist von heute, das ist ausnahmsweise wahr.",
        choicesFn: (api) => [
          ...(!api.hasFlag("walterTech")
            ? [
                {
                  text: "Was ist das hier alles?",
                  next: "whTech",
                  action: (a: GameApi) => a.setFlag("walterTech"),
                },
              ]
            : []),
          ...(!api.hasFlag("walterResonanz")
            ? [
                {
                  text: "Resonanz — meinen Sie das Wort der Verwaltung?",
                  next: "whRes",
                  action: (a: GameApi) => a.setFlag("walterResonanz"),
                },
              ]
            : []),
          ...(!api.hasFlag("walterBearing")
            ? [
                {
                  text: "Die Resonanz-Überlastungen im Sektor. Sagt Ihnen das etwas?",
                  next: "peil1",
                },
              ]
            : [{ text: "Noch mal zu Ihrer Peilung.", next: "whPeil" }]),
          { text: "Nur kurz Hallo.", next: "whBye" },
        ],
      },
      whTech: {
        id: "whTech",
        speaker: "WALTER",
        text: "Sechzig Jahre Messtechnik auf vier Metern Regal. Rahmen von achtunddreißig, Empfänger von sechsundfünfzig, Schreiber von zweiundachtzig. Ein Zeiger lügt nicht, der zittert nur, wenn er unsicher ist.",
        next: "wh1",
      },
      whRes: {
        id: "whRes",
        speaker: "WALTER",
        text: "Ich meine beides, und das ist der Punkt. Sechshundert Leute in einem Betonkasten schwingen, ob man es misst oder nicht. Der Rat misst es nicht, der Rat indexiert es. Ein Index ohne Einheit ist eine Meinung mit Nachkommastelle.",
        next: "wh1",
      },
      whPeil: {
        id: "whPeil",
        speaker: "WALTER",
        text: "Unverändert. Träger auf hundertvier Komma sechs, verstärkt, Dauerbetrieb. Kreuzpeilung über das Minimum, zwei Standorte, Seite mit Hilfsantenne aufgelöst. Nordwest, dreihundert bis fünfhundert Meter. Das ist E67, und Sie wohnen da, ich weiß.",
        next: "whPeil2",
      },
      whPeil2: {
        id: "whPeil2",
        speaker: "WALTER",
        text: "Wenn Sie schon dort sind: Schauen Sie nach oben. Antennen versteckt man nicht im Keller.",
        next: "wh1",
      },
      whBye: {
        id: "whBye",
        speaker: "WALTER",
        text: "Hallo. Tür nur anlehnen, sonst reißt der Zug mir das Papier vom Schreiber.",
      },
    },
  },
};
