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
];

export const openBooks = () => LIBRARY_BOOKS.filter((b) => b.openToOutsiders);
