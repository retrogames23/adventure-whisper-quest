import type { HandbookChapter } from "@/game/e67Handbook";
import { registerBook, type BookUiText, type ReadableBook } from "./registry";

const NOVEL_UI_TEXT: BookUiText = {
  ariaLabel: "Buch lesen",
  closeLabel: "Buch schließen",
  contents: "Inhalt",
  chaptersUnit: (n: number) => `${n} Kapitel`,
  edition: "Bibliotheksbestand",
  pagerStart: "— Anfang —",
  pagerEnd: "— Ende —",
  pagerOf: (idx: number, total: number) => `Seite ${idx} / ${total}`,
  chapterSelectLabel: "Kapitel",
};

const chapters: HandbookChapter[] = 
[
  {
    "id": "nv-i-die-kiste",
    "shortTitle": "Die Kiste",
    "title": "I. Die Kiste",
    "body": [
      "Die Kiste steht seit Montag auf dem Wagen im Flur, zwischen den anderen, noch nicht abgeholten Nachlässen, und Ruth hat sie am Dienstag zu sich hereingeholt, weil Brendel, ihr Kollege vom Nachbartisch, gefragt hat, ob sie die Weyer-Sache übernehmen könne, seine eigene Liste sei schon zu lang für den Monat. Sie hat ja gesagt, wie sie immer ja sagt, und dabei nicht geahnt, dass sie diesen Satz noch oft bereuen und noch öfter nicht bereuen würde.",
      "Der Vorgang heißt 14/2204. Nachlass Weyer, Anton, geboren 1919, verstorben im August, Sektor 14, Gebäude E84, vierter Stock, seit der Gründung des Mandatsgebiets ununterbrochen gemeldet. Keine Angehörigen. Keine Vorgänge. Brendel, der die Akte kurz durchgeblättert hat, bevor er sie weiterreichte, hat nur gesagt: „Sauberer Fall. Der hat nie Ärger gemacht.\" Er meinte es als Kompliment für den Toten, so wie man in ihrem Beruf Komplimente macht.",
      "In zwanzig Dienstjahren hat Ruth Hunderte solcher Akten bearbeitet, und sie weiß, wie man das macht: man liest, was zur Einstufung notwendig ist, man stuft ein, man schließt. Verwertbar. Zuzustellen. Zu vernichten. Ein viertes Feld gibt es nicht, hat es nie gegeben, muss es nicht geben, weil ein Menschenleben, ordentlich geführt, immer in eines der drei passt. Sie hat das Brendel einmal so erklärt, in ihrem ersten Jahr, als er noch neu war und sie fragte, ob es sie nie störe. Nein, hat sie gesagt. Es beruhigt mich. Und das war, damals, auch wahr.",
      "Anton Weyers Leben passt nicht.",
      "Der Terminal neben ihr läuft im Ruhemodus, ein bernsteinfarbenes Quadrat, das langsam pulsiert, als atme die Behörde selbst. Auf dem Gang fällt die Rohrpost mit ihrem hohlen, vertrauten Seufzer in die Wandöffnung — halb elf, die Vormittagszustellung, wie an jedem Tag seit zwanzig Jahren. Ruth wartet, bis das Geräusch verklingt, ehe sie den Deckel der Kiste hebt.",
      "Vierzig Hefte, in der Größe gleich, im Zustand verschieden — die ersten mit Wasserflecken am Einband, die letzten kaum benutzt aussehend, als habe die Hand, die sie füllte, mit den Jahren leichter geschrieben, nicht schwerer. Ruth nimmt das oberste heraus, weil es das jüngste ist, dann legt sie es zurück und nimmt stattdessen das unterste, weil sie, ohne es sich einzugestehen, schon in diesem ersten Moment weiß, dass sie am Anfang beginnen will.",
      "Sie hätte, wie vorgeschrieben, das Vorhandensein „persönlicher Aufzeichnungen ohne Verwertungscharakter\" vermerken und die Kiste zur Vernichtung weiterleiten können, mit Formblatt 12b und ihrer Unterschrift darunter, und das wäre, nach jeder Regel, die sie kennt, die vorgesehene Entscheidung gewesen. Stattdessen trägt sie das erste Heft nach Hause — was nicht erlaubt ist, was aber auch niemand prüft, weil niemand mehr prüft, was aus den Nachlässen wird, sobald das Formblatt unterschrieben ist."
    ]
  },
  {
    "id": "nv-ii-1946-was-noch-niemand-wusste",
    "shortTitle": "Was noch niemand wusste",
    "title": "II. 1946 — Was noch niemand wusste",
    "body": [
      "Im Gründungsjahr war Anton Weyer siebenundzwanzig. Das steht nirgends im ersten Heft, aber Ruth rechnet es sich aus, in der Bahn, auf dem Rückweg von der Arbeit, während draußen der Novemberregen die Fenster verschmiert. Siebenundzwanzig, im ersten Jahr einer Verwaltung, von der niemand wusste, ob sie ein Jahr oder ein Jahrhundert dauern würde, in einer Stadt, die gerade aufgehört hatte, zu einem Land zu gehören, ohne dass irgendjemand ihr gesagt hätte, wozu sie stattdessen gehörte.",
      "*Man sagt uns*, schreibt Weyer auf der ersten Seite, mit einer Handschrift, die noch nicht die ordentliche, kleine Schrift der späteren Hefte ist, sondern größer, unruhiger, als übe sie sich selbst zum ersten Mal in etwas, das sie nicht kennt, *man sagt uns, das sei vorläufig. Vier Mächte, ein gemeinsames Gebiet, bis sich zeigt, was aus uns werden soll. Ich habe Vater gefragt, was vorläufig heißt. Er hat gelacht, zum ersten Mal seit dem Frühjahr, und gesagt: es heißt, dass sie es selbst nicht wissen. Das war, glaube ich, als Trost gemeint.*",
      "Ruth kennt diesen Ton. Sie hat ihn oft gehört, von den Alten in ihrem eigenen Sektor, wenn sie über die Gründungsjahre sprechen — nicht mit Schrecken, eher mit einer Art erschöpfter Zärtlichkeit, wie man von einem Sturm spricht, den man überlebt hat, ohne genau sagen zu können, wodurch. Was sie noch nie gehört hat, ist dieser eine Satz, drei Zeilen weiter, den sie zweimal liest, weil sie beim ersten Mal nicht sicher ist, ob sie ihn richtig versteht:",
      "*Ich fürchte, dass ich mich daran gewöhnen werde. Nicht an die Verwaltung. An das Schweigen darüber, dass ich mich daran gewöhne.*",
      "Kein siebenundzwanzigjähriger Mann, denkt Ruth, schreibt so einen Satz, ohne dass ihn danach etwas verändert. Aber im nächsten Eintrag, zwei Wochen später, ist wieder nur die Rede vom Wetter, von einer Zuteilung, die nicht angekommen ist, von einem Nachbarn, der beim Amt für Wohnraumfragen vorgesprochen hat und mit derselben Auskunft zurückkam wie beim letzten Mal. Als hätte der Satz über das Schweigen sich selbst bestätigt, indem ihm kein zweiter folgte."
    ]
  },
  {
    "id": "nv-iii-die-sonntage",
    "shortTitle": "Die Sonntage",
    "title": "III. Die Sonntage",
    "body": [
      "Ruth hat selbst einmal ein Heft geführt. Sie war zweiundzwanzig, im ersten Jahr ihrer Ausbildung, und eine Kollegin hatte ihr das kleine, karierte Buch geschenkt, mit dem Satz, jeder solle festhalten, was er nicht vergessen wolle. Sie hat es sieben Monate lang getan, unregelmäßig, meist sonntags, bis sie eines Tages, ohne bewussten Entschluss, aufhörte. Sie erinnert sich nicht mehr an den letzten Eintrag. Sie erinnert sich nur, dass sie das Heft, Jahre später, beim Umzug in die jetzige Wohnung, nicht mehr gefunden hat, und dass sie nicht danach gesucht hat.",
      "Das denkt sie jetzt, an einem dieser Sonntagnachmittage, öfter, als ihr lieb ist.",
      "Es ist nicht so, dass ihr Beruf ihr das Schreiben ausgetrieben hätte — so einfach ist es nicht, und Ruth misstraut Erklärungen, die zu einfach sind, das hat sie in zwanzig Jahren gelernt, in denen sie täglich mit Formularen zu tun hat, die genau das versuchen: einfache Erklärungen für komplizierte Leben zu liefern. Es ist eher so, dass sie irgendwann gemerkt hat, wie viel leichter es ist, „es wird zur Kenntnis genommen\" zu schreiben als „ich habe verstanden\", und dass diese Leichtigkeit, einmal entdeckt, sich in alles hineinzieht, nicht nur in die Dienstvermerke. Man sagt am Ende auch zu Hause nicht mehr: ich bin traurig. Man sagt: es ist ein trauriger Tag. Als sei die Traurigkeit ein Wetter, das über einen hinwegzieht, und nicht etwas, das man selbst empfindet und für das man, wenn man ehrlich ist, auch geradestehen müsste.",
      "Bei Weyer ist es umgekehrt. Vierzig Jahre lang, Heft für Heft, hat er weitergeschrieben. Ich denke. Ich wollte. Ich habe gehofft. Sätze, die er niemandem sagen konnte, weil es so viele Wege gibt, etwas zu sagen, ohne ein Ich zu benutzen, und weil man diese Wege lernt wie man Rechnen lernt, bis man sie nicht mehr als Wege erkennt, sondern für die Sprache selbst hält. Es ergeht Ablehnung. Nicht: ich lehne ab. Die Unterlage liegt nicht vor. Nicht: Sie haben etwas vergessen. Man spricht so lange in dieser Form, denkt Ruth, dass man am Ende glaubt, es gebe niemanden mehr, der ablehnt, der vergisst, der zuständig wäre. Nur das Formular, das sich selbst ausfüllt.",
      "Sie hat angefangen, sich zu fragen, wann genau sie selbst aufgehört hat zu unterscheiden."
    ]
  },
  {
    "id": "nv-iv-1956-die-krise-die-keine-wurde",
    "shortTitle": "Die Krise, die keine wurde",
    "title": "IV. 1956 — Die Krise, die keine wurde",
    "body": [
      "Im Sommer 1956 — Weyer ist siebenunddreißig, arbeitet inzwischen im Vermessungsamt, das steht diesmal ausdrücklich im Heft, mit einem Stolz, der Ruth beinahe rührt, weil er so unauffällig daherkommt — hört er zum ersten Mal in seinem Leben, wie sich etwas anfühlt, das später als Krise bezeichnet werden wird, ohne dass es, während es geschieht, wie eine Krise aussieht.",
      "*ZDS meldet heute*, notiert er, *eine Reformdebatte im Osten, „im Rahmen der bestehenden Ordnung\", wie es heißt. Man merkt, dass niemand im Studio recht weiß, wie ernst man das nehmen soll. Herr Kluge von nebenan sagt, das erinnere ihn an etwas, aber er will nicht sagen, woran. Ich glaube, er meint, es erinnert ihn an eine Angst, die er sich abgewöhnt hat, weil sie hier nichts mehr zu suchen hat.*",
      "Die Reformkrise, die keine wird — Ruth kennt die Zahlen, aus der Schule, aus den Sektorberichten, die man in ihrem Beruf zwangsläufig irgendwann liest: keine Erhebung im historischen Sinn, kein Einmarsch, kein Herbst, von dem später erzählt werden müsste. Nur eine Reihe von Sitzungen, deren Ergebnisse Monate später in Verordnungen auftauchten, so leise, dass die meisten Menschen im Mandatsgebiet, wenn sie überhaupt davon hörten, es für eine Verwaltungsangelegenheit hielten, die sie nichts anging.",
      "Genau das, schreibt Weyer im September desselben Jahres, sei das Merkwürdige an seinem eigenen Leben: dass Geschichte, wenn sie überhaupt geschieht, immer anderswo geschieht, und zu ihm nur als Meldung kommt, sauber redigiert, zwischen dem Wetterbericht und den Heizölkontingenten. *Ich habe angefangen*, schreibt er, *mich zu fragen, ob es einen Unterschied macht, ob ich an etwas teilnehme oder nur davon erfahre. Ich fürchte, es macht für die Welt keinen Unterschied. Für mich schon.*",
      "Ruth legt das Heft beiseite und denkt an ihre eigenen Sektorberichte, die sie jede Woche liest, ohne sie noch als etwas anderes wahrzunehmen denn als Arbeitsmaterial. Auch für sie, denkt sie, geschieht Geschichte anderswo. Sie verwaltet nur, was davon übrigbleibt, wenn es bei ihr ankommt."
    ]
  },
  {
    "id": "nv-v-ein-name-im-heft",
    "shortTitle": "Ein Name im Heft",
    "title": "V. Ein Name im Heft",
    "body": [
      "Der Name taucht zum ersten Mal 1952 auf und verschwindet 1958 wieder, ohne Erklärung, wie so vieles in den Heften, das Ruth nur in Bruchstücken zusammensetzen kann. Ilse. Kein Nachname, jedenfalls keiner, den Weyer für nötig hielt aufzuschreiben, als könne das Heft ihn sich selbst ergänzen, wenn es ihn je bräuchte.",
      "*Ilse sagt, ich solle nicht so viel schreiben*, steht im Heft von 1953, *nicht, weil sie dagegen wäre, sondern weil sie meint, ich würde mehr im Heft leben als im Zimmer. Vielleicht hat sie recht. Ich habe es ihr nicht gesagt, aber ich glaube, das Heft ist der einzige Ort, an dem ich sicher bin, dass ich wirklich derjenige bin, der spricht.*",
      "Was mit Ilse geschah, sagt keines der Hefte direkt. Ruth findet, verteilt über zwei Jahre, Hinweise: eine Übersiedlung in einen anderen Sektor, ein Brief, der „nicht beantwortet werden konnte, weil die neue Anschrift nicht vorlag\" — ein Satz, den Ruth beim Lesen zweimal ansieht, weil er genau die Form hat, die sie selbst tagsüber schreibt, nur dass hier keine Behörde spricht, sondern ein Mann, der versucht, seinen eigenen Verlust in derselben Sprache zu fassen, die ihm sonst alles wegnimmt. Als wäre selbst der Kummer nicht vorgesehen gewesen, außer in der Form, die für ihn zur Verfügung stand.",
      "Danach, für einige Monate, wird die Schrift kleiner, die Einträge kürzer. Dann, ohne Übergang, wieder das alte Maß. Ruth versteht das. Sie hat selbst gelernt, dass man Trauer nicht immer sieht, wenn sie am größten ist, sondern oft erst später, an der Stelle, wo jemand plötzlich wieder anfängt, in ganzen Sätzen zu schreiben, weil er beschlossen hat, dass es weitergehen muss, auch wenn er nicht sagen kann, warum.",
      "Sie hat sich, an diesem Abend, zum ersten Mal gefragt, ob es eine Ilse gibt, die noch lebt, irgendwo im Mandatsgebiet, die nie erfahren wird, wie lange sie in vierzig Heften weitergelebt hat."
    ]
  },
  {
    "id": "nv-vi-1971-die-umstellung",
    "shortTitle": "Die Umstellung",
    "title": "VI. 1971 — Die Umstellung",
    "body": [
      "Im Jahr der Quadranten-Konvention ist Weyer zweiundfünfzig, und aus seiner Straße wird, über Nacht, wie es ihm vorkommt, obwohl es in Wirklichkeit ein Vorgang von Monaten war, eine Koordinate. Aus dem Amt für Wohnraumfragen, bei dem sein Nachbar Kluge einst vorgesprochen hatte, wird ein numeriertes Ressort. Die Türschilder werden ausgetauscht, ein Techniker mit einer Liste kommt von Wohnung zu Wohnung.",
      "*Heute habe ich zum ersten Mal die neue Anschrift geschrieben*, notiert er, *E84, obwohl noch nicht feststeht, welche Wohnungsnummer ich im Frühjahr bekomme, wenn die Umstellung abgeschlossen ist. Ich habe gemerkt, dass ich nicht weiß, ob ich traurig sein soll. Man kann eine Straße vermissen. Kann man eine Nummer vermissen, bevor man sie überhaupt bekommen hat?*",
      "Ein paar Seiten weiter, im selben Heft, ein Satz, den Ruth für den genauesten in allen vierzig Büchern hält, obwohl — oder gerade weil — er von nichts weiter handelt als von einem Formular: *Das neue Antragsformular hat ein Feld mehr als das alte. „Bemerkungen.\" Ich habe lange überlegt, was ich hineinschreiben könnte, das nicht schon anderswo im Formular steht. Mir ist nichts eingefallen. Vielleicht ist das die eigentliche Umstellung: dass sie uns ein Feld für das geben, was wir zu sagen hätten, wohl wissend, dass wir es längst verlernt haben.*",
      "Ruth denkt an ihr eigenes Formblatt 12b, an die drei Felder, die es seit zwanzig Jahren hat, ohne ein viertes. Sie fragt sich, ob irgendwann einmal jemand entschieden hat, dass ein Bemerkungsfeld zu gefährlich wäre — nicht, weil dort etwas Verbotenes stehen könnte, sondern weil dort etwas Wahres stehen könnte, für das es sonst keinen Ort gäbe."
    ]
  },
  {
    "id": "nv-vii-resonanz",
    "shortTitle": "Resonanz",
    "title": "VII. Resonanz",
    "body": [
      "Mittwochabend, in der vierten Woche, klopft es an Ruths Tür. Sie erschrickt, obwohl sie weiß, dass es nur die Nachbarin von gegenüber sein kann, Frau Ilgner, die einmal im Monat wegen der Treppenhausreinigung vorbeikommt. Ruth schiebt das Heft, das sie gerade liest, unter die Zeitung, bevor sie öffnet — eine Bewegung, die sie erst bemerkt, als sie schon geschehen ist, und über die sie später, allein am Tisch, lange nachdenkt.",
      "Frau Ilgner bleibt an der Tür stehen, wie immer, und sagt, wie immer, nichts von Bedeutung — der Putzplan, eine Lieferverzögerung bei den Nährpasten, das Wetter. Dann, im Gehen, fast beiläufig: „Haben Sie das im Bürgerfunk gehört? Unser Block, zweimal diese Woche. Erhöhter Index.\" Sie lacht kurz, ohne dass klar wird, worüber. „Wahrscheinlich die Heizung. Die knackt neuerdings.\"",
      "Ruth sagt, das werde es sein.",
      "Sie schaltet, als die Tür wieder zu ist, den Apparat an, extra für die Sendung. „Wetter & Resonanz\" bringt, wie jeden Abend, zuerst die Heizölkontingente, dann eine Zahl für jeden Wohnblock des Sektors, ohne Erläuterung, wie es das Format seit jeher verlangt. E84: erhöht. Keine Ursache genannt. Keine wird je genannt. Ruth weiß, aus den Sektorberichten, die sie manchmal quer liest, dass die Formel, nach der diese Zahl berechnet wird, offiziell nie veröffentlicht wurde, dass sie irgendetwas aus Gebäudeschall, Krankmeldungen und Beschwerden mischt, in einem Verhältnis, das niemand kennt, der nicht im Mandatsrat sitzt.",
      "Sie fragt sich, an diesem Abend zum wiederholten Mal, ob es etwas bedeutet — ob eine Formel, die niemand kennt, irgendwo registriert, was in ihrer Wohnung geschieht, wenn sie die Lampe anlässt und liest, bis die fremden Sätze anfangen, sich mit ihren eigenen zu vermischen. Dann erinnert sie sich, dass schon diese Frage außerhalb ihrer Zuständigkeit liegt. Sie schaltet den Apparat aus, bevor der Bürgerfunk mit den Vermisstenmeldungen beginnt, und nimmt das Heft wieder unter der Zeitung hervor."
    ]
  },
  {
    "id": "nv-viii-1983-stillstand",
    "shortTitle": "Stillstand",
    "title": "VIII. 1983 — Stillstand",
    "body": [
      "In den Heften der frühen achtziger Jahre ändert sich etwas, das Ruth zunächst nicht benennen kann, bis sie merkt: es ist nicht, dass weniger geschieht. Es ist, dass Weyer aufgehört hat, etwas zu erwarten.",
      "*Ich habe heute meinen Ausweis erneuern lassen*, schreibt er 1983, vierundsechzig Jahre alt, *zum siebten Mal seit der Gründung. Der Beamte am Schalter war derselbe wie vor fünf Jahren, nur grauer. Wir haben beide nichts gesagt, das über die Formalitäten hinausging, aber ich glaube, wir haben beide gedacht: noch einer. Noch fünf Jahre, in denen sich nichts ändert außer uns selbst.*",
      "Ruth kennt dieses Gefühl aus ihrem eigenen Sektorbericht-Archiv: die achtziger Jahre, vor der Umwandlung, waren, statistisch gesehen, die ruhigsten der ganzen Mandatsgeschichte. Keine Reformkrisen, keine Konventionen, keine neuen Formulare mit einem Feld mehr als die alten. Nur die immer gleichen Zahlen, Quartal für Quartal, so stabil, dass man in der Verwaltung, wie sie einmal gehört hat, intern von der „ruhigen Dekade\" sprach, mit einem Unterton, der zwischen Stolz und Erschöpfung changierte.",
      "*Man könnte glauben*, schreibt Weyer im selben Heft, ein paar Monate später, *dass Stillstand eine Erleichterung ist, wenn man genug erlebt hat, das sich änderte, ohne dass es besser wurde. Ich glaube das auch, an manchen Tagen. An anderen frage ich mich, ob ein Leben, das nur noch verwaltet und nicht mehr entschieden wird, überhaupt noch das Wort Leben verdient, oder ob es nicht ehrlicher wäre, dafür ein eigenes Wort zu finden — eines, das näher bei „Vorgang\" liegt.*",
      "Ruth legt das Heft weg und denkt an ihre eigenen letzten zehn Jahre, an wie wenig sich darin unterscheidet, ein Quartal vom nächsten. Sie hat das nie als Verlust empfunden. Sie fragt sich, an diesem Abend zum ersten Mal, ob das selbst schon die Antwort auf Weyers Frage ist."
    ]
  },
  {
    "id": "nv-ix-1986-was-zurueckbleibt",
    "shortTitle": "Was zurückbleibt",
    "title": "IX. 1986 — Was zurückbleibt",
    "body": [
      "Im letzten Heft, dem vierzigsten, sind die Einträge aus dem Frühjahr 1986 noch in der gewohnten, kleinen Schrift. Weyer ist siebenundsechzig. Er schreibt über die Ankündigung, die im ZDS-Sektorbericht kaum mehr Sendezeit bekommt als eine Straßensperrung: die vier Mandatsmächte treten formal zurück, der Staatenbund wird künftig, wie es heißt, „in eigener Verantwortung\" verwaltet — ein Satz, den Weyer dreimal unterstreicht, mit einer Genauigkeit, die Ruth an ihre eigenen Aktenvermerke erinnert.",
      "*Vierzig Jahre*, schreibt er, *hat man uns gesagt, das sei vorläufig. Jetzt sagt man, es sei endgültig — und es ändert sich: nichts. Dieselben Formulare, dieselben Schalter, dieselben drei Felder. Ich habe mir, ich gebe es zu, in jüngeren Jahren manchmal vorgestellt, wie es wäre, wenn irgendwann jemand käme und sagte: von nun an tragt ihr selbst die Verantwortung. Niemand ist gekommen. Man hat nur die Mächte, die man immerhin noch hätte fragen können, aus dem Zimmer geschickt und den Apparat weiterlaufen lassen, als sei die Verantwortung etwas, das man verlieren kann, ohne dass irgendwer sie aufhebt.*",
      "Danach, über den Sommer, werden die Einträge seltener, kürzer, die Schrift größer. Im Juli notiert er nur noch: *Husten. Termin bei der Sektorärztin verschoben.* Im August, ein einziger Satz, dem Ruth ansieht, dass er mit großer Anstrengung geschrieben wurde: *Ich glaube, ich werde das Heft nicht mehr lange führen können, und das beunruhigt mich mehr, als es sollte.*",
      "Ruth legt das Heft an diesem Abend früher weg als sonst. Sie sitzt eine Weile am Fenster, ohne zu lesen, und denkt daran, dass sie nicht weiß, ob Weyer in seinen letzten Wochen noch gewusst hat, dass die Umstellung, von der er im Frühjahr geschrieben hatte, tatsächlich nichts geändert hatte — oder ob er, wie sie selbst manchmal, insgeheim gehofft hatte, dass es doch noch anders kommen würde, kurz bevor es zu spät war, danach zu fragen."
    ]
  },
  {
    "id": "nv-x-die-sektoraerztin",
    "shortTitle": "Die Sektorärztin",
    "title": "X. Die Sektorärztin",
    "body": [
      "Der letzte datierte Eintrag ist von Anfang August, neun Tage vor dem Datum, das im Vorgang als Todestag vermerkt ist. Die Schrift ist kaum noch als die seine zu erkennen, groß, unsicher, mit Buchstaben, die manchmal ineinanderrutschen, als hätte die Hand beschlossen, dass es auf die Form nicht mehr ankommt.",
      "*Ich habe heute die Sektorärztin gesehen*, steht dort, *und sie hat gefragt, ob mich etwas belastet. Ich habe gesagt: nein. Das war keine Lüge. Es belastet mich nichts. Es gibt nur nichts mehr, wofür ein Formular vorgesehen wäre, und das ist ein anderer Zustand als eine Last. Sie hat das nicht verstanden, glaube ich, oder sie hat es verstanden und nicht danach gefragt, was auf dasselbe hinausläuft.*",
      "*Ich wollte, dass irgendwer das einmal liest — nicht, weil es wichtig ist, sondern weil ich vierzig Jahre lang der Einzige gewesen bin, der weiß, dass ich es geschrieben habe. Das genügt fast. Fast.*",
      "*Wenn dieses Heft gelesen wird, ist es, weil jemand entschieden hat, dass es das wert ist, entgegen der Regel. Ich weiß nicht, wer das sein könnte, und ich habe aufgehört, mir das vorzustellen — aber falls Sie es sind: Ich habe nicht geschrieben, um Recht zu bekommen. Ich habe geschrieben, damit es, für vierzig Jahre, wenigstens einen Ort gab, an dem ich nicht falsch sein musste.*",
      "Danach nichts mehr. Eine leere Seite, dann der Einband.",
      "Ruth sitzt lange mit dem letzten Satz. Sie hat, in zwanzig Jahren, gelernt, Akten zu lesen, ohne sich ansprechen zu lassen. Dieser Satz lässt sich nicht so lesen. Sie liest ihn noch einmal, und dann noch einmal, und erst beim dritten Mal bemerkt sie, dass sie die ganze Zeit, ohne es zu merken, „Sie\" gesagt hat — nicht „er\", nicht „der Verstorbene\" —, als habe Weyer sie, mit diesem einen Satz, direkt angesprochen, über vierzig Hefte und den eigenen Tod hinweg, und als sei es jetzt an ihr, zu antworten."
    ]
  },
  {
    "id": "nv-xi-drei-felder",
    "shortTitle": "Drei Felder",
    "title": "XI. Drei Felder",
    "body": [
      "Am folgenden Morgen sitzt Ruth vor der Kiste mit allen vierzig Heften, geordnet, wie sie sie geordnet vorgefunden hat, und vor Formblatt 12b, das seit zwanzig Jahren dieselben drei Felder hat. Verwertbar. Zuzustellen. Zu vernichten.",
      "Sie hat gelernt, dass Sorgfalt, in ihrem Beruf, bedeutet: das richtige Feld zu finden, nicht ein viertes zu erfinden. Vierzig Hefte sind nicht verwertbar, in keinem Sinn, den das Formular kennt — sie lassen sich nicht weiterverwenden, nicht umverteilen, nicht in eine andere Akte einordnen. Zuzustellen — an wen? Es gibt niemanden, an den man vierzig Jahre eines fremden Ich zustellen könnte, keine Ilse, deren Anschrift „vorläge\", keine Angehörigen, die die Akte selbst schon verneint. Bleibt: zu vernichten.",
      "Brendel steckt kurz den Kopf zur Tür herein, fragt, ob die Weyer-Sache schon durch sei, er müsse die Monatsstatistik abschließen. Ruth sagt, gleich. Er nickt und verschwindet wieder, ohne misstrauisch zu werden — warum auch, es ist ein sauberer Fall, hat er selbst gesagt, einer, der nie Ärger gemacht hat.",
      "Sie sitzt lange da. Draußen fällt, gegen Mittag, wieder die Rohrpost in die Wandöffnung, und zum ersten Mal seit Wochen nimmt Ruth das Geräusch nicht wahr.",
      "Sie denkt an den Satz aus dem Jahr der Quadranten-Konvention, an das Bemerkungsfeld, das niemandem mehr etwas einfällt zu füllen. Sie denkt an Ilse, an die nicht beantwortbaren Briefe, an die Krise, die keine wurde, an den Satz über das Schweigen, den ein Siebenundzwanzigjähriger geschrieben hat, ohne zu wissen, dass er noch vierzig Jahre lang recht behalten würde. Sie denkt an ihr eigenes Heft, das karierte, das sie nach sieben Monaten nicht mehr weitergeführt hat und das irgendwo bei einem Umzug verlorengegangen ist, ohne dass sie danach gesucht hätte.",
      "Dann schreibt sie, in das Feld für die Begründung, das sie in zwanzig Jahren nie anders als mit „es wird empfohlen, den Vorgang wie folgt zu behandeln\" begonnen hat, zum ersten Mal einen anderen Satz."
    ]
  },
  {
    "id": "nv-xii-der-stempel",
    "shortTitle": "Der Stempel",
    "title": "XII. Der Stempel",
    "body": [
      "*Ich empfehle*, schreibt Ruth Anders, *die Übernahme in die Bewohnerbibliothek, unter Vorbehalt.*",
      "Sie sieht auf das Wort „Ich\", das dort jetzt steht, wo zwanzig Jahre lang nur „es\" gestanden hat, und für einen Moment erschrickt sie fast davor, so, wie man vor etwas erschrickt, das man selbst getan hat, ohne sich vorher erlaubt zu haben, es zu wollen.",
      "Sie weiß nicht, ob das genügt. Sie weiß nicht, ob irgendwer das Ich in diesem Satz überhaupt bemerken wird, zwischen all den anderen Es, die an diesem Tag durch die Registratur gehen — ob die Bibliothekarin, die die Kiste entgegennimmt, mehr darin sehen wird als eine ungewöhnliche, aber nicht regelwidrige Verfügung, ob irgendwann ein Leser, in zehn oder zwanzig Jahren, in einem der vierzig Hefte blättern und auf denselben Satz stoßen wird, der sie selbst nicht mehr losgelassen hat, seit sie ihn zum ersten Mal las. Sie weiß es nicht, und sie hat, zum ersten Mal seit langem, das Gefühl, dass es nicht an ihr liegt, das zu wissen.",
      "Sie unterschreibt, faltet das Formblatt und legt die Kiste zur Abholung bereit.",
      "Als der Aktenstempel fällt, ist die Farbe, wie immer im November, zu feucht; das Datum verwischt ein wenig. Niemand wird das je bemerken.",
      "Ruth schon.",
      "Sie geht an diesem Abend nicht gleich nach Hause. Sie bleibt, ungewöhnlich für sie, noch eine Weile am Fenster ihres Büros stehen und sieht hinaus auf den Hof, auf dem der Wagen mit den Kisten für die Abholung steht, zwischen den anderen Nachlässen, ununterscheidbar, wie es sich gehört. Dann nimmt sie ihren Mantel, und zu Hause, an diesem Abend, zum ersten Mal seit sieben Monaten und zwanzig Jahren, holt sie ein neues, kariertes Heft aus der Schublade, in der es seit dem Umzug gelegen hat, ohne dass sie gewusst hätte, warum sie es nicht weggeworfen hat.",
      "Sie schlägt die erste Seite auf. Sie schreibt nichts. Aber sie lässt die Seite offen, auf dem Tisch, über Nacht, zum ersten Mal seit langem bereit, dass am nächsten Tag etwas darauf stehen könnte, das mit Ich beginnt."
    ]
  }
]
;

export const NICHT_VORGESEHEN_BOOK: ReadableBook = {
  id: "nicht-vorgesehen",
  title: "Nicht vorgesehen",
  subtitle: "Christa Wolf · Kurzroman · 1987 · Bewohnerbibliothek E71",
  author: "Christa Wolf",
  year: "1987",
  blurb:
    "Eine Verwaltungsangestellte soll den Nachlass eines Verstorbenen einstufen: vierzig Tagebuchhefte aus vierzig Jahren Mandatsgebiet. Das Formblatt kennt drei Felder — verwertbar, zuzustellen, zu vernichten. Ein viertes gibt es nicht.",
  chapters,
  uiText: NOVEL_UI_TEXT,
  locationHint: "Bewohnerbibliothek 1101, Gebäude E71",
  lendable: true,
};

registerBook(NICHT_VORGESEHEN_BOOK);
