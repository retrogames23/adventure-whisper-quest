/**
 * Bestand der Bewohnerbibliothek in Raum 1101 (Gebäude E71, Etage 1).
 *
 * `openToOutsiders: true` = für Bewohner ANDERER Gebäude ausleihbar.
 * Alles andere ist Präsenzbestand für E71-Bewohner — Layard (E67) darf
 * es nur am Lesetisch ansehen, nicht mitnehmen.
 *
 * Die Freigabeliste ist bewusst kurz. Weitere Titel kommen später dazu;
 * dann hier eintragen — Dialog und Szene lesen die Liste automatisch.
 */
export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  year: string;
  /** Kurzer Katalogeintrag, wie Herbert ihn vorlesen würde. */
  blurb: string;
  openToOutsiders: boolean;
}

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "sumer-listen",
    title: "Listen aus Uruk — Verwaltung vor der Literatur",
    author: "M. Ehrenhart",
    year: "1981",
    blurb:
      "Über die ältesten Tontafeln: Gerste, Bier, Schafe, Schulden. Herbert legt hier gern den Finger auf eine Zeile und schweigt dann.",
    openToOutsiders: true,
  },
  {
    id: "schmalspur",
    title: "Schmalspur — Nebenbahnen Mitteleuropas 1890–1946",
    author: "K. Obholz",
    year: "1974",
    blurb:
      "Streckenpläne, Fahrpläne, Betriebsstellen. Viele der Strecken gibt es nicht mehr; die Fahrpläne schon.",
    openToOutsiders: true,
  },
  {
    id: "resonanzhygiene-1956",
    title: "Resonanzhygiene — Ein Leitfaden für den Einzelnen",
    author: "Dr. med. H. C. Brennwald",
    year: "1956",
    blurb:
      "Noch aus der Zeit, bevor der Begriff seine soziale Seite bekam: Lüften, Dämmen, Abstandhalten, Ruhepausen. Brennwald schreibt über Resonanz wie über Staub oder Lärm — als individuelle Gefährdung, nicht als zwischenmenschliches Phänomen. Der Anhang listet zugelassene Schirme und Dichtungen.",
    openToOutsiders: true,
  },
  {
    id: "gespaltener-geist",
    title: "Der gespaltene Geist — Eine Geschichte der Datenfluss-Maschinen",
    author: "S. R. Vossen",
    year: "1997",
    blurb:
      "Vossen erzählt, warum unsere Computer nie einen einzelnen Prozessor hatten: 1945 verschwand ein geheimer Entwurf des US-Kriegsministeriums in den Archiven, und die Welt entschied sich stattdessen für die strenge Trennung von Programm und Daten. Aus dieser Gabelung erwuchs nicht die sequenzielle Allzweck-CPU, sondern die Datenstrom-Maschine: hunderte kleiner Knoten, die feuern, sobald genug Eingänge anliegen, ohne Takt, ohne Flaschenhals, ohne das Hin-und-her-Schaufeln, das andere Architekturen plagt. Vossen führt von Aikens und Zuses getrennten Speichern über Intels asynchronen Matrix-1 bis hin zu den heutigen Cellular Arrays in Laptops und Türsteuerungen. Ein Kapitel widmet sich MARV und ähnlichen Systemen: Warum KI bei uns nicht simuliert, sondern eingeätzt wird. Technisch dicht, aber klar geschrieben; für Leser, die wissen wollen, warum ihre Geräte nie abstürzen und ihre Akkus monatelang halten.",
    openToOutsiders: true,
  },
];

export const openBooks = () => LIBRARY_BOOKS.filter((b) => b.openToOutsiders);
