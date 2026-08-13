import type { HandbookChapter } from "@/game/e67Handbook";
import { registerBook } from "./registry";

import imgPlakat from "@/assets/gfa/plakat.jpg";
import imgVorhaben from "@/assets/gfa/vorhaben.jpg";
import imgInnen from "@/assets/gfa/innen.jpg";
import imgAussen from "@/assets/gfa/aussen.jpg";
import imgUmwelt from "@/assets/gfa/umwelt.jpg";
import imgDemokratie from "@/assets/gfa/demokratie.jpg";

/**
 * „Global Future Alliance“ — Manifest, das Walter Grewe an Layard weitergibt.
 * Nadeldrucker-Ausdruck aus dem FastWeb, deshalb ohne Umlaute (ae/oe/ue).
 * Der Text bleibt bewusst unverändert: er ist ein Fundstück, kein Lehrbuch.
 */
export const GFA_MANIFEST_CHAPTERS: HandbookChapter[] = [
  {
    id: "titelblatt",
    shortTitle: "Titelblatt",
    title: "Global Future Alliance",
    image: imgPlakat,
    imageCaption:
      "Titelblatt: das Plakat der Global Future Alliance, grob gerastert vom Nadeldrucker.",
    body: [
      "Global Future Alliance — Manifest, Fassung 1997.",
      "Globales Denken statt nationalstaatlichem. Herausgegeben im FastWeb, gedruckt in Eigenarbeit, Weitergabe ausdruecklich erwuenscht.",
    ],
  },
  {
    id: "vorhaben",
    image: imgVorhaben,
    imageCaption: "Kopie des Plakats, das auch in Walters Wohnung haengt — Beilage zum Manifest.",
    shortTitle: "Unser Vorhaben",
    title: "Unser Vorhaben",
    body: [
      "Unser Vorhaben ist es, ein weltweites Netz und Forum fuer Leute zu schaffen, die sich ueber die festgefahrenen und veralteten Strukturen in Gesellschaft und Politik hinwegsetzen moechten und globales Denken im Gegensatz zu nationalstaatlichem verinnerlicht haben.",
      "Den Anfang wollen wir machen, indem wir eine politische Partei fuer das Mandatsgebiet formieren, die unsere Visionen in der Politik vertritt, um etwas in der Gesellschaft zu veraendern.",
      "Durch das FastWeb ist es heute einfach, uns global mit Gleichgesinnten auszutauschen. Dadurch werden wir hoffentlich weltweit nicht die Einzigen mit diesem Vorhaben bleiben. Ein Schritt Richtung Weltfrieden.",
      "Science Fiction? Sicher. Aber je mehr Leute mitmachen, desto realistischer wird's. Die Zukunft hat bereits begonnen und vielleicht kann man von hier aus die Lawine lostreten.",
      "Wir streben nicht an, in die Fussstapfen herkoemmlicher Parteien zu treten. So praesentieren wir kein detailliertes Programm, sondern grundaetzliche ueberzeugungen und Visionen, zu deren Realisierung wir allerdings konkrete Vorschlaege haben. Wir wollen ein Bewusstsein in Gesellschaft und Politik schaffen, das globales ueber nationalstaatliches Denken setzt.",
      "National- und Mandatsgrenzen sind nicht physisch, und bereits heute verlieren sie durch die globale Vernetzung mehr und mehr an Bedeutung - und das nicht nur wirtschaftlich. Das FastWeb bringt in seiner wichtigsten Funktion als Kommunikationsmedium Menschen verschiedener Nationen zusammen. In Sekundenschnelle kannst du mit Menschen am anderen Ende der Welt Kontakt aufnehmen, und das bald auch problemlos in Bild und Ton - wohl eine der groessten Errungenschaften dieses Jahrhunderts und in der Weltgeschichte einmalig! Dabei kommt es nicht mehr darauf an, welcher Nationalitaet dein Gegenueber angehoert: Der Mensch als Individuum zaehlt.",
      "Haben wir also in den naechsten Jahrzehnten einen grundliegenden Wandel zu erwarten? Unserer Meinung nach waechst das Verstaendnis der Menschheit fuereinander mit der zunehmenden Vernetzung. Dass eine Meinungsverschiedenheit der Staatsoberhaeupter zweier Nationen noch zu Lasten unzaehliger Unbeteiligter bis hin zum Krieg ausartet, wird dadurch mit der Zeit immer unwahrscheinlicher. Es wird nur noch das Verhaeltnis von Mensch zu Mensch zaehlen. Dieses Verstaendnis heute schon zu verinnerlichen und weiterzugeben, bezeichnen wir als globales Denken.",
      "Wir distanzieren uns vom hauptsaechlich im Christentum verwurzelten, apokalyptischen Weltbild, das anscheinend immer noch das politische Handeln indirekt beeinflusst (Das Ende der Menschheit steht ja sowieso schon vor der Tuer). Anders ist es nicht zu erklaeren, dass angesichts der umweltlichen Situation mit den zaghaften Vesuchen, eine Katastrophe abzuwenden, lediglich das Gewissen beruhigt werden soll. Diese Sache muss endlich mit der noetigen Konsequenz angegangen werden, bevor es zu spaet ist.",
      "In der Gesellschaft des 21. Jahrhunderts soll es friedlich und gerecht zugehen, national und global gesehen. Die Technik eroeffnet uns neue Moeglichkeiten, die zur Loesung wirtschaftlicher, sozialer und oekologischer Probleme beitragen koennen: Sie muss nur zum Nutzen aller eingesetzt werden.",
    ],
  },
  {
    id: "innen",
    image: imgInnen,
    imageCaption: "Abbildung 2: „Rationalisierung\" — Fliessband ohne Menschen.",
    shortTitle: "Innenpolitik",
    title: "Innenpolitik",
    body: [
      "Allgemeine Planlosigkeit macht sich in der Politik breit - egal wie die Partei heisst. An den grossen Problemen wie Arbeitslosigkeit, Kriminalitaet und Umweltzerstoerung wird hilflos herumgeflickt, anders ist es nicht auszudruecken. Das entscheidende Merkmal heutiger Politik ist, dass immer nur die Symptome bekaempft werden, niemals die Ursachen - und das kann langfristig nicht gut gehen.",
      "Wir steuern auf eine technisierte und automatisierte Gesellschaft hin. Da wird es schwer, wenn nicht unmoeglich sein, die Arbeitslosenrate langfristig zu senken, bzw. sie auch nur auf dem jetzigen Niveau zu halten. Und das kann niemand leugnen. Die Industrie-Bosse profitieren immer mehr durch die Einsparung von Arbeitsplaetzen, diejenigen, die sich gluecklich schaetzen, einen Arbeitsplatz bekommen zu haben, muessen immer mehr Zugestaendnisse an den Arbeitgeber machen, und der Rest vegetiert in Armut vor sich hin. Tolle Zukunftsaussichten, und gar nicht mal unrealistisch. So etwas hat es schon in krasser Form zur Zeit der Industrialisierung gegeben.",
      "Aber sind wir denn an der Schwelle des 3. Jahrtausends noch kein bisschen weiter? Warum ist nicht die logische Konsequenz aus Technisierung und Automatisierung mehr Freizeit und Lebensqualitaet fuer alle? Warum eigentlich nicht? Es ist moeglich, es wird nur nichts dafuer getan! Der Begriff der Arbeit muss sich wandeln. Die Gesellschaft als Ganzes wird in Zukunft auch funktionieren, wenn der Arbeiter, der taeglich dieselben stupiden Handgriffe am Fliessband macht, durch einen Roboter ersetzt wird. Warum soll dann dieser Arbeiter nicht auch ein Stueck weit davon profitieren, anstatt bestraft zu werden?",
      "Zu realisieren waere dies beispielsweise mit einer Steuer fuer den Arbeitgeber auf jeden wegrationalisierten Arbeitsplatz, die wiederum in die Sozialkassen fliesst. Aber Moment, das kann man doch nicht machen, denn dann wandert ja die Industrie ab! Die Industriebosse werden dadurch nicht gleich an den Rand des Existenzminimums gedraengt werden und es muss einfach auf europaeischer Ebene einen Konsens darueber geben. Wo soll die Industrie dann \"hinwandern\"? Nach Fernost oder Amerika? Dann muss es eben drastische Einfuhrzoelle fuer europaeische Firmen geben, die ausserhalb der europaeischen Mandatsgebiete produzieren. Dass dieser Konsens kommen wird, ist eigentlich keine Frage. Die Frage ist nur, wann er kommen wird.",
      "Erst dann, wenn die Arbeitslosigkeit in Europa sich verdoppelt oder verdreifacht hat? Wir fordern ihn jetzt!",
      "Unter einer modernen Gesellschaft verstehen wir: Ja zur Technisierung und Automatisierung, sogar zur Rationalisierung von Arbeitsplaetzen, aber die Vorteile, die sich daraus ergeben, muessen auch der Gesellschaft als Ganzes zugute kommen!",
    ],
  },
  {
    id: "aussen",
    image: imgAussen,
    imageCaption: "Abbildung 3: Haende ueber Grenzen. Randnotiz: „Zeichen setzen.\"",
    shortTitle: "Aussenpolitik",
    title: "Aussenpolitik",
    body: [
      "Langfristig, so glauben wir, kann es kein stabileres System geben als eine vereinte Welt. Nur so kann man globale Probleme wie Armut in der Dritten Welt oder die Umweltfrage loesen.",
      "Bis dahin ist es noch ein weiter Weg und deshalb sollte unser Grundsatz sein, genau darauf hinzuarbeiten. In das FastWeb setzen wir dabei, wie schon erwaehnt, grosse Hoffnungen. Dennoch sollten wir diesen Prozess, bei dem durch zuhnehmende Vernetzung das Verstaendnis und Einfuehlungsvermoegen fuer andere Kulturen steigt und die interkulturellen Beziehungen immer mehr vom Individuum abhaengen, mit Taten unterstuetzen und beschleunigen.",
      "Obwohl es zwischen den U.S.A. und der Sowjetunion Abruestungsvereinbarungen gibt, werden diese durch sinnlose neue Waffentests immer wieder in Gefahr gebracht. Wir koennen uns als relativ kleines, aber einflussreiches Mandatsgebiet jedoch diesem Schwachsinn entziehen und ein Zeichen setzen, indem wir uns an gewalttaetigen militaerischen Aktionen einfach nicht mehr beteiligen.",
      "Das gehoert einfach nicht mehr in unsere Zeit. Wir fordern ausserdem den sofortigen Stopp von Ruestungsexporten.",
      "Tatsache ist, dass jaehrlich weltweit 780 Milliarden Reichsmark fuer das Militaer ausgegeben werden.",
      "Wenn wir diesem Irrsinn ein Ende bereiten wuerden, koennten wir mit einem Bruchteil dieser Unsumme den Grundstein dafuer legen, den Laendern der dritten Welt langfristig den gleichen Lebensstandard wie uns zu ermoeglichen. Erst dann koennen wir uns gemeinsam um Milliarden verschlingende Projekte wie beispielsweise die Erforschung des Weltalls kuemmern.",
    ],
  },
  {
    id: "umwelt",
    image: imgUmwelt,
    imageCaption: "Abbildung 4: Ein Fluss, zwei Zukuenfte.",
    shortTitle: "Umweltpolitik",
    title: "Umweltpolitk",
    body: [
      "Es ist der Zukunft unserer Erde und somit uns gegenueber ignorant, so mit dem Umweltschutz weiter zu verfahren, wie bisher. Die Ozonloecher werden groesser und von der Politik werden laecherliche Vorgaben ueber die Senkung des FCKW-Ausstosses gemacht, die erstens erst in den naechsten Jahrzehnten greifen und zweitens selbst von grossen Industrienationen wie den U.S.A. nicht eingehalten werden. Es ist leider heute so, dass die fuehrenden Industrie- und Wirtschaftsbosse nicht nur den groessten Einfluss auf die Politik haben, sondern auch ueber den oekologischen Zustand der Erde bestimmen, in dem wir sie in ein paar Jahren ueberlassen bekommen.",
      "So verlangt etwa die Auto-Industrie mit Verweis auf die hohe Zahl an Arbeitsplaetzen, die sie guetigerweise stellt, das Auto in Zukunft aus der umweltpolitischen Diskussion rauszuhalten. Was nuetzen uns jetzt ein paar Arbeitsplaetze mehr, wenn wir in ein paar Jahren vor dem oekologischen Kollaps stehen? Motoren, die mit Rapsoel, Erdgas oder Wasserstoff fahren, sind schon laengst erfunden, aber dass sich solche Alternativen durchsetzen, verhindert wieder die Mineraloel-Industrie. Das kann so nicht weitergehen. Ein internationales Bewusstsein muss dafuer geschaffen werden, und einer muss damit anfangen.",
      "Bei uns ist ebenfalls konsequenterer Tierschutz angesagt. Auf Tiertransporten werden Schweine, Rinder und Pferde auf uebelste Weise durch Platz- und Futtermangel gequaelt und oft noch absichtlich misshandelt - und diese Transporte werden oft noch von den europaeischen Mandatsgebieten subventioniert. Wo solche Transporte notwendig sind - oft sind sie ganz einfach ueberfluessig und unoekonomisch - muessen die Richtlinien zum Wohl der Tiere drastisch verschaerft werden.",
      "Ein weiteres Beispiel, das noch perversere und bestialischere Formen annimmt, sind Legebatterien. Geht man davon aus, dass eine Henne das gleiche Schmerzempfinden hat wie ein Mensch, kann man sich nur annaehernd vorstellen, was fuer eine Qual dieses Lebewesen durchmacht - und dies sein gesamtes Leben lang, bis es elendig zu seiner Erloesung verendet.",
      "Zwar gibt es seit kurzer Zeit ein Gesetz, das die Neueinrichtungen solcher Anlagen im Mandatgebiet Mitteleuropa verbietet, die Betreiber aber siedeln einfach in den ehemaligen Ost-Mandatsgeboiete in die Naehe der Mandatsgebiet-Grenze Mitteleuropa um, um ihrer entarteten Raffgier weiter nachzukommen. Ein schlichtes Einfuhrverbot fuer solche Eier wuerde das Problem schon loesen, das sollten uns ein paar Pfennige mehr fuer unser Fruehstuecksei schon wert sein.",
      "Das sind nur zwei Beispiele, bei dem Tiere uebersteigerter Profitgier zum Opfer fallen. Das Tier muss statt als Ware wieder als Lebewesen angesehen werden.",
    ],
  },
  {
    id: "demokratie",
    image: imgDemokratie,
    imageCaption: "Abbildung 5: Abstimmung im Gemeinschaftssaal.",
    shortTitle: "Direkte Demokratie",
    title: "Direkte Demokratie",
    body: [
      "Auch hier eroeffnet uns der Fortschritt der Technik neue Moeglichkeiten. Durch das FastWeb kann das Volk in einem nationalen Forum durch Meinungsumfragen oder Abstimmungen direkten Einfluss auf politische Geschehnisse nehmen. Dies haette eine auf jeden Fall notwendige Schwaechung der sozialen Hierarchie zufolge. Im FastWeb zaehlt kein Besitz, wohl aber in der heutigen Politik.",
      "Jeder Einzelne haette gleiches Mitspracherecht, waehrend heutzutage alle grossen Parteien dem Druck der Wirtschaft unterliegen und somit gar nicht im Interesse der grossen Masse handeln koennen. Selbst die Gruenen konnten diesem Druck nicht standhalten (Bsp. Atompolitik). Die Interesse des Einzelnen muss mehr beruecksichtigt werden und das nicht nur alle vier Jahre - der Weg in eine Gesellschaft, in der jeder seinen Platz und seine Aufgabe hat.",
    ],
  },
  {
    id: "mitmachen",
    shortTitle: "Mitmachen",
    title: "Mitmachen — unser Knoten im FastWeb",
    body: [
      "Wir mieten keine Saele. Wir treffen uns dort, wo es nichts kostet: auf unserem eigenen Chat-Knoten im FastWeb. Die Leitung ist geliehen, die Zeit knapp, die Diskussionen dafuer ehrlich.",
      "Du erreichst uns von jedem Terminal aus. Tippe:",
      "  telnet chat.globalfuture.net",
      "Als Passwort gibst du ein:",
      "  xodox",
      "Danach bist du im Kanal #globalfuture. Dort sitzen abends fuenf bis zehn von uns. Keine Klarnamen, keine Adressen, keine Wohnungsnummern — nicht aus Angst, sondern aus Anstand.",
      "Wer zuhoert, ist willkommen. Wer widerspricht, ist noch willkommener. Wer das Manifest weitergibt, hat schon mitgemacht.",
    ],
  },
];

export const GFA_MANIFEST_UI_TEXT = {
  ariaLabel: "Manifest der Global Future Alliance",
  closeLabel: "Manifest schließen",
  contents: "Inhalt",
  chaptersUnit: (n: number) => `${n} Abschnitte`,
  edition: "Nadeldrucker-Ausdruck, ohne Umlaute",
  pagerStart: "— Anfang —",
  pagerEnd: "— Ende —",
  pagerOf: (idx: number, total: number) => `Blatt ${idx} / ${total}`,
  chapterSelectLabel: "Abschnitt",
} as const;

registerBook({
  id: "gfaManifest",
  title: "Global Future Alliance",
  subtitle: "Manifest",
  author: "Global Future Alliance",
  year: "1997",
  blurb:
    "Geheftete Blätter aus einem Nadeldrucker. Parteimanifest, das Walter Grewe verteilt.",
  chapters: GFA_MANIFEST_CHAPTERS,
  uiText: GFA_MANIFEST_UI_TEXT,
  locationHint: "Von Walter Grewe, Wohnung 1103",
  lendable: true,
});
