/**
 * Herberts kuriose Fakten — Kurzfassungen, in seiner Stimme erzählt.
 * Werden im Dialog `herbertTalk` nacheinander ausgegeben (ohne Wiederholung),
 * sobald Layard weiß, dass Herbert ein wandelndes Lexikon ist.
 */
export interface HerbertFakt {
  /** stabile ID — dient als Flag-Suffix (`hbFakt_<id>`) */
  id: string;
  text: string;
  /** erscheint nur bei aktivem Schmerz-Radio */
  subtext?: string;
}

export const HERBERT_FAKTEN: HerbertFakt[] = [
  {
    id: "perle",
    text: "Eine Perle ist keine Laune der Natur, sondern Notwehr. Es dringt etwas in die Muschel ein — meist kein Sandkorn, sondern ein Parasit — und weil sie weder Arme noch Fluchtweg hat, mauert sie ihn Schicht für Schicht in Perlmutt ein. Jede Perlenkette ist im Grunde eine Kette aus Särgen.",
    subtext: "Er sagt es beiläufig, als spräche er von einer Verwaltungsakte.",
  },
  {
    id: "archaeen",
    text: "Bakterien und Archaeen sehen beide aus wie einfache Einzeller ohne Zellkern. Genetisch trennt sie aber ungefähr so viel wie einen Menschen von einem Pilz. Ähnlichkeit ist selten ein Beweis für Verwandtschaft.",
  },
  {
    id: "menschenaffe",
    text: "Der Mensch ist nicht mit den Menschenaffen verwandt — er ist einer. So sortiert es die Zoologie seit Jahrzehnten. Mit dem Schimpansen teilen wir etwa 98,7 Prozent des Erbguts. In den restlichen 1,3 Prozent stecken die Sprache und das Formularwesen.",
    subtext: "Kurzes Lächeln. Er hält das offenbar für die Pointe.",
  },
  {
    id: "lucy",
    text: "Ob unsere Vorfahren vor drei Millionen Jahren klüger waren als ein heutiger Schimpanse, weiß niemand. Größeres Hirn im Verhältnis zum Körper, dafür schlechtere Durchblutung, dafür ein Präzisionsgriff und eine längere Kindheit. Die Forschung ist sich bis heute nicht einig.",
  },
  {
    id: "gehirn",
    text: "Unser Gehirn hat sich in drei Millionen Jahren etwa verdreifacht, und niemand kann sagen, warum genau. Vermutlich alles zusammen: bessere Nahrung, Kochen, größere Gruppen, klügere Jagd. Jedes davon ermöglicht das nächste. Ein Kreislauf, der sich selbst anfeuert.",
  },
  {
    id: "klaeranlage",
    text: "In einer Kläranlage arbeiten Bakterien, und die sind wählerisch. Menschlicher Kot allein reicht ihnen nicht — man füttert nach: Methanol, Essigsäure, notfalls Melasse. Nur damit sie zügig arbeiten. Auch das ist eine Art Verpflegungszuschlag.",
  },
  {
    id: "mopswalross",
    text: "Ein Mops und ein Walross gehören zoologisch in dieselbe Unterordnung, zusammen mit Bären und Mardern. Die Robben stammen von bärenähnlichen Landtieren ab, die vor etwa fünfundzwanzig Millionen Jahren wieder ins Wasser gegangen sind. Rückzüge gibt es überall.",
  },
  {
    id: "hyaene",
    text: "Die Hyäne sieht aus wie ein Hund, läuft wie ein Hund, jagt im Rudel wie ein Hund. Sie ist trotzdem eine Katze, jedenfalls im weiteren Sinn — nächste Verwandte der Mangusten. Schädel und Innenohr entscheiden, nicht das Aussehen.",
  },
  {
    id: "bison",
    text: "Das Tier, das die Amerikaner „Buffalo“ nennen, ist gar kein Büffel, sondern ein Bison. Ein Irrtum europäischer Pelzhändler aus dem siebzehnten Jahrhundert, den nie jemand korrigiert hat. Ein Fehler, der lange genug steht, wird zur Bezeichnung.",
    subtext: "Das klingt, als meinte er nicht nur das Tier.",
  },
  {
    id: "bisonjagd",
    text: "Von dreißig bis sechzig Millionen Bisons blieben in wenigen Jahrzehnten unter tausend übrig. Keine Naturkatastrophe — Politik. Man erschoss sie von fahrenden Zügen aus, unter anderem, um der indigenen Bevölkerung die Lebensgrundlage zu nehmen.",
  },
  {
    id: "dearenemy",
    text: "Hunde beschnüffeln sich, weil Urin ein ziemlich genauer Steckbrief ist: Geschlecht, Alter, Rang, Erregungszustand. Bekannte Rivalen behandeln sie danach entspannter als Fremde. Die Verhaltensforschung nennt das den lieben Feind. Auf dem Gehweg ist das Höflichkeit — im eigenen Revier Hausfriedensbruch.",
  },
  {
    id: "rettungsboot",
    text: "Auf Passagierschiffen sind Haustiere in den Rettungsbooten nicht vorgesehen. Rechtlich gelten Tiere als Sachwert, ungefähr wie ein Koffer im Frachtraum. Und zurück in die Kabine darf nach Alarm niemand mehr. Klingt kalt, rettet Menschen.",
  },
  {
    id: "zink",
    text: "Zink hilft tatsächlich gegen eine Erkältung, nur nimmt es fast niemand richtig. Man muss lutschen statt schlucken, innerhalb des ersten Tages anfangen und ordentlich dosieren. Und die Tablette darf keine Zitronensäure enthalten, sonst bindet die das Zink weg.",
  },
  {
    id: "lawine",
    text: "Wird ein Auto von einer Lawine verschüttet, gelten vier Regeln: Motor aus, angeschnallt bleiben, nicht aussteigen, ruhig atmen. Der Motor wegen der Abgase, das Aussteigen ist aussichtslos, und die Luft im Wagen reicht Stunden — sofern man sie nicht verpanikt.",
  },
  {
    id: "wostok",
    text: "Es gibt noch Orte, die kein Mensch je betreten hat. Sie liegen unter dem antarktischen Eis: Hunderte Seen, abgeschlossen seit Jahrmillionen. Der bekannteste, der Wostoksee, hat seit fünfzehn bis zwanzig Millionen Jahren kein Sonnenlicht gesehen.",
  },
  {
    id: "maoa",
    text: "Es gibt ein Gen, das man reißerisch das Kriegergen genannt hat. Das Gewaltrisiko erhöht es nachweislich nur bei Menschen, die als Kind schwer misshandelt wurden. Als Erklärung dafür, dass ein Volk angeblich gewalttätiger sei als ein anderes, taugt es nicht.",
    subtext: "Diesen Satz betont er etwas deutlicher als die anderen.",
  },
  {
    id: "guillotine",
    text: "Ob ein abgetrennter Kopf noch etwas mitbekommt, hat die Wissenschaft zweihundert Jahre lang beschäftigt. Ein berühmtes Experiment von 1905 deutet auf zwanzig, dreißig Sekunden hin. Gemessen an dem, was vorher üblich war — Rädern zum Beispiel —, galt die Guillotine trotzdem als Fortschritt.",
  },
  {
    id: "christkind",
    text: "Das Christkind ist eine Notlösung. Luther lehnte die Heiligenverehrung ab, also musste der heilige Nikolaus als Gabenbringer weichen. Ersatz brauchte man trotzdem. Aus theologischer Sturheit wurde ein Kinderbrauch.",
  },
  {
    id: "weihnachtsbaum",
    text: "Der Weihnachtsbaum kommt aus dem Theater. Im Mittelalter spielte man in den Kirchen den Sündenfall, dazu brauchte es einen Paradiesbaum. Wohlhabende Bürger nahmen ihn nach der Vorstellung schlicht mit nach Hause.",
  },
  {
    id: "weihnachtsmann",
    text: "Dass eine amerikanische Limonadenfirma den Weihnachtsmann rot angezogen habe, stimmt nicht. Der Karikaturist Thomas Nast zeichnete ihn schon in den siebziger Jahren des vorigen Jahrhunderts in Rot — nach der Bischofstracht des heiligen Nikolaus. Werbung hat es nur wiederholt.",
  },
  {
    id: "birkenhead",
    text: "„Frauen und Kinder zuerst“ war nie Seerecht. Es geht auf einen einzelnen Fall zurück, den Untergang der Birkenhead 1852. Aus einer Anekdote wurde in hundert Jahren ein vermeintliches Gesetz. So entstehen Vorschriften, die niemand je erlassen hat.",
    subtext: "Er sieht kurz auf, als erwarte er, dass Layard das kennt.",
  },
  {
    id: "bolschewiki",
    text: "1903 gewann Lenin eine knappe, für sich genommen belanglose Abstimmung und nannte seine Fraktion sofort „Bolschewiki“ — die Mehrheitler. Der Name blieb, auch als sie längst in der Minderheit waren. Wer sich früh benennt, benennt auch die anderen.",
  },
  {
    id: "leichensynode",
    text: "897 ließ Papst Stephan der Sechste die Leiche seines Vorgängers ausgraben, in Papstgewänder kleiden, auf einen Thron setzen und vor Gericht stellen. Wenige Monate später wurde er selbst von einem Mob erdrosselt. Das Verfahren war korrekt eröffnet, immerhin.",
  },
  {
    id: "dewitt",
    text: "1672 lynchte ein Mob in Den Haag den mächtigsten Politiker der Niederlande samt seinem Bruder. Was danach mit den Leichen geschah, erzähle ich nur, wenn Sie nicht gleich essen gehen. Teile davon wurden verzehrt.",
  },
  {
    id: "konstanz",
    text: "Es gab eine Zeit mit drei Päpsten gleichzeitig, jeder mit eigenem Briefkopf, jeder überzeugt, der einzige zu sein. Vierzig Jahre lang. Das Konzil von Konstanz löste es 1417, indem es alle drei absetzte und einen vierten wählte. Verwaltungstechnisch elegant.",
  },
  {
    id: "kanaan",
    text: "Die Bibel erzählt die Israeliten als Eroberer von außen. Die Funde und die Sprachverwandtschaft mit dem Phönizischen sprechen eher dafür, dass es abtrünnige Kanaaniter waren — Leute von hier, die sich neu erfunden haben.",
  },
  {
    id: "lincoln",
    text: "Lincoln wurde 1860 Präsident, obwohl in zehn Südstaaten kein Mensch für ihn stimmen konnte. Seine Partei hatte dort schlicht keine Stimmzettel drucken lassen — teils aus Logistik, teils aus Angst. Man kann eine Wahl auch gewinnen, indem man irgendwo gar nicht stattfindet.",
  },
  {
    id: "orienthandel",
    text: "Beim Sklavenhandel denken alle an den Atlantik. Der Handel im Orient dauerte über dreizehnhundert Jahre und kostete nach Schätzungen vierzig bis achtzig Millionen Menschen das Leben. Deutlich mehr — nur schlechter überliefert.",
  },
  {
    id: "dahomey",
    text: "Europäische Sklavenhändler betraten das westafrikanische Landesinnere so gut wie nie; die Krankheiten dort waren unter Seeleuten gefürchtet. Die Menschenjagd übernahmen afrikanische Reiche wie Dahomey oder Asante. Es gab immer jemanden, der die Arbeit machte.",
  },
  {
    id: "shaanxi",
    text: "Der tödlichste Tag der Weltgeschichte war der 23. Januar 1556. Ein Erdbeben in der chinesischen Provinz Shaanxi, schätzungsweise 830.000 Tote innerhalb weniger Stunden. Die meisten lebten in Höhlenwohnungen aus Löss, und der hält nichts aus.",
  },
  {
    id: "alaaf",
    text: "„Alaaf“, der Kölner Ruf, heißt ursprünglich nur „alles weg“. Im sechzehnten Jahrhundert war das ein ganz gewöhnlicher Trinkspruch in den Wirtshäusern, kein Karnevalsruf. Die Bedeutung ist nachgewachsen.",
  },
  {
    id: "heege",
    text: "Vom Mittelalter kennt man Minnesang und Ritterturnier. Überliefert ist vor allem Derbes: Rätsel, Spott, viel Fäkalisches. In einer Handschrift von 1480 steckt sogar das komplette Programm eines fahrenden Spielmanns. Ein Abend voller Zoten, sauber abgeschrieben.",
  },
  {
    id: "tanzwut",
    text: "1518 begann in Straßburg eine Frau auf offener Straße zu tanzen, ohne Musik. Innerhalb von Wochen taten es Hunderte, manche bis zum Zusammenbruch, manche bis zum Tod. Der Rat ließ eine Bühne bauen und Musiker kommen — man glaubte, das müsse ausgetanzt werden.",
    subtext: "Er hält kurz inne. „Behörden reagieren selten mit Nichtstun.“",
  },
  {
    id: "furzwitz",
    text: "Der älteste schriftlich überlieferte Witz der Menschheit ist sumerisch, fast viertausend Jahre alt, und es ist ein Furzwitz. Ich sage das ungern, aber es steht auf der Tafel. Zuerst die Abrechnungen, dann die Zoten. Die Gebete kamen später.",
  },
  {
    id: "antisemitismus",
    text: "Das Wort „Antisemitismus“ stammt nicht von Kritikern des Judenhasses. Es wurde 1879 von einem Judenhasser erfunden, Wilhelm Marr, als wissenschaftlich klingende Selbstbezeichnung seiner Bewegung. Wer die Begriffe stellt, bestimmt lange mit, wie geredet wird.",
    subtext: "Er sagt es leise, und für einen Moment sieht er müde aus.",
  },
  {
    id: "gewalt",
    text: "„Gewalt“ hieß im Deutschen ursprünglich nur Macht oder Herrschaft, ganz ohne Schläge. Das Englische trennt bis heute violence und power. Wir haben ein einziges Wort für beides. Das ist kein Zufall, das ist eine Bequemlichkeit.",
    subtext: "„Amtsgewalt“, murmelt er. „Steht auf halb Sektor 28.“",
  },
  {
    id: "malteser",
    text: "Der Malteserorden gilt völkerrechtlich als souveräner Staat, hat aber seit 1798 kein Staatsgebiet. Er entsendet trotzdem Botschafter und stellt Pässe aus. Pässe, mit denen man nirgendwohin einreisen kann, weil es kein Land dazu gibt.",
    subtext: "„Ein Staat, der nur noch aus Verwaltung besteht. Beruhigend, nicht?“",
  },
  {
    id: "schweiz",
    text: "In der Schweiz ist es bis heute legal, den eigenen Hund oder die eigene Katze zu essen. Verboten ist seit 1909 nur der Handel damit. Verbote richten sich fast immer gegen den Markt, nicht gegen die Tat.",
  },
  {
    id: "florian",
    text: "Das St.-Florians-Prinzip — verschon mein Haus, zünd andere an — trägt den Namen eines römischen Märtyrers, der 304 ertränkt wurde, weil er Christ war. Mit dem Zynismus des Sprichworts hat seine Geschichte nicht das Geringste zu tun.",
  },
  {
    id: "blau",
    text: "Homer nennt das Meer weinfarben; ein eigenes Wort für Blau kommt bei ihm nicht vor. In den alten Sprachen fehlt es fast überall. Die einzige mit eigenem Wort dafür war das Ägyptische — und ausgerechnet die Ägypter stellten um 2500 vor Christus das erste künstliche Pigment her: Ägyptisch Blau.",
    subtext: "„Man sieht offenbar erst, wofür man ein Wort hat.“",
  },
];
