import { useEffect, useMemo, useRef, useState } from &ldquo;react&ldquo;;
import { useGame } from &ldquo;@/game/GameContext&ldquo;;
import { CloseButton } from &ldquo;./CloseButton&ldquo;;

/**
 * Teleempfänger — drei Kanäle in zermürbender Bürokraten-Sprache.
 *
 * Jeder Kanal hat ein eigenes &ldquo;Programm&ldquo;: eine sehr lange Sequenz aus
 * Meldungen, die in einer Endlos-Schleife abgespielt wird. Die Meldungen
 * werden eine nach der anderen eingeblendet (mit Tickerleiste unten und
 * einem statischen Senderlogo oben rechts). Ein Wechsel des Kanals startet
 * dessen Schleife dort, wo sie beim letzten Verlassen war.
 */

interface Channel {
  id: &ldquo;z1&ldquo; | &ldquo;z2&ldquo; | &ldquo;z3&ldquo;;
  name: string;
  tag: string;
  ticker: string;
  bulletins: string[];
  /** Sekunden pro Meldung */
  hold: number;
}

const CHANNELS: Channel[] = [
  {
    id: &ldquo;z1&ldquo;,
    name: &ldquo;ZDS · Sektorbericht&ldquo;,
    tag: &ldquo;Zentrale Direktion für Sektorale Lage&ldquo;,
    ticker:
      &ldquo;+++ Lagebild stabil +++ keine meldepflichtigen Abweichungen +++ Fortführung des Regelbetriebs in allen Quadranten bestätigt +++ Vorgangsnummern werden im Rahmen der etablierten Verfahren weiterverarbeitet +++ Empfehlung: Beibehaltung der gewohnten Tagesabläufe +++&ldquo;,
    hold: 13,
    bulletins: [
      &ldquo;Sektor E67. Im Berichtszeitraum keine Vorkommnisse oberhalb der zur Vorlage geeigneten Schwelle. Vereinzelte Erfassungen werden im Rahmen der dafür vorgesehenen Verfahren einer geordneten Bewertung zugeführt.&ldquo;,
      &ldquo;Quadrant E67-Süd. Die Versorgungslage entspricht in der Gesamtbetrachtung den Erwartungen, die aus den Erwartungen vergangener Berichtszeiträume hervorgegangen sind. Eine gesonderte Mitteilung erübrigt sich daher.&ldquo;,
      &ldquo;Sektor E71. Die in Teilbereichen beobachtete erhöhte Eingangslage wird durch geeignete organisatorische Maßnahmen einer regulären Bearbeitung zugänglich gemacht. Eine Befassung der Öffentlichkeit ist zum gegenwärtigen Zeitpunkt nicht angezeigt.&ldquo;,
      &ldquo;Sektor E71, Korridor 15. Hinweise auf eine über das übliche Maß hinausgehende Belegungsdichte einzelner Räumlichkeiten lassen sich aus der vorliegenden Datenlage nicht in einer der Veröffentlichung zugänglichen Form ableiten.&ldquo;,
      &ldquo;Quadrant E71-Nord. Die Anwendung der Frequenzhygiene 104,6 wird ausdrücklich erinnert. Verstöße werden, soweit sie als Verstöße in Erscheinung treten, einer angemessenen Würdigung zugeführt.&ldquo;,
      &ldquo;Sektor E73. Es liegen Hinweise auf Hinweise vor. Eine abschließende Einschätzung steht in Aussicht. Ein Zeitpunkt für diese Einschätzung kann derzeit nicht in einer abschließend belastbaren Weise benannt werden.&ldquo;,
      &ldquo;Sektor E04. Die personelle Erreichbarkeit der zuständigen Stellen ist gewährleistet, soweit dies unter Berücksichtigung der jeweiligen Erreichbarkeitsfenster möglich erscheint.&ldquo;,
      &ldquo;Sektor E12. Vereinzelte Rückmeldungen aus der Bevölkerung haben die zuständigen Stellen erreicht. Sie werden, sofern sie sich als rückmeldefähig erweisen, einer Rückmeldung zugeführt.&ldquo;,
      &ldquo;Quadrant E12-West. Eine Häufung von Quarantänesiegeln im Erdgeschossbereich konnte nicht in einer für die Berichterstattung verwertbaren Weise verifiziert werden. Die Berichterstattung beschränkt sich daher auf den Hinweis, dass eine Verifizierung nicht erfolgt ist.&ldquo;,
      &ldquo;Sektor E29. Die Lage ist, wie in den vorangegangenen Berichtszeiträumen, in einem nicht weiter zu spezifizierenden Maß als der Lage entsprechend zu beschreiben.&ldquo;,
      &ldquo;Sektor E55. Hinsichtlich der dort registrierten Resonanzwerte ist auf die etablierten Auslegungsspielräume zu verweisen, die ein abschließendes Urteil ausdrücklich offenhalten.&ldquo;,
      &ldquo;Sektor E58. Es ist davon abzusehen, aus singulären Beobachtungen einen sektoralen Trend abzuleiten. Trends bedürfen der vorherigen Feststellung durch die hierfür zuständige Stelle.&ldquo;,
      &ldquo;Quadrant E61-Ost. Eine im Umlauf befindliche Darstellung über sogenannte &bdquo;leere Etagen&ldquo; entbehrt der durch die Datenlage gedeckten Grundlage und wird hiermit als nicht durch die Datenlage gedeckt eingeordnet.&ldquo;,
      &ldquo;Sektor E66. Im Berichtszeitraum wurden Anfragen zur Lage entgegengenommen. Sie wurden im Rahmen der hierfür vorgesehenen Verfahren entgegengenommen.&ldquo;,
      &ldquo;Sektor E70. Die in einzelnen Häusern beobachtete reduzierte Wohnaktivität bewegt sich in einem Bereich, der aus statistischer Sicht keiner über das Statistische hinausgehenden Bewertung bedarf.&ldquo;,
      &ldquo;Sektor E71. Aufgrund der besonderen medizinischen Funktion des Sektors gelten dort die einschlägigen Regelungen, die jeweils in der jeweils gültigen Fassung gelten.&ldquo;,
      &ldquo;Sektor E84. Hinweise auf eine erhöhte Aufmerksamkeit für die Frequenz 104,6 werden zur Kenntnis genommen und in den allgemeinen Erkenntnisfluss überführt.&ldquo;,
      &ldquo;Sektor E91. Die zuständige Stelle hat die Zuständigkeit der zuständigen Stelle bestätigt. Eine darüber hinausgehende Befassung ist nicht vorgesehen.&ldquo;,
      &ldquo;Sektor E96. In Bezug auf den dort gemeldeten Sachverhalt wird auf die Möglichkeit hingewiesen, dass sich der Sachverhalt nach abschließender Prüfung als ein anderer Sachverhalt darstellen kann.&ldquo;,
      &ldquo;Allgemeiner Hinweis. Die Bewohnerinnen und Bewohner aller Sektoren werden gebeten, ihre Meldepflichten in der gewohnten Sorgfalt wahrzunehmen. Meldungen, die nicht erfolgen, gelten als nicht erfolgt.&ldquo;,
      &ldquo;Schlussvermerk. Die nächste Lagedarstellung erfolgt im Anschluss an die vorliegende Lagedarstellung. Eine darüber hinausgehende Vorankündigung ist nicht erforderlich.&ldquo;,
    ],
  },
  {
    id: &ldquo;z2&ldquo;,
    name: &ldquo;BV-Aktuell&ldquo;,
    tag: &ldquo;Bürger-Verlautbarung — Programm 2&ldquo;,
    ticker:
      &ldquo;+++ Bekanntmachung +++ Anpassung der Sprechzeiten in den nicht öffentlich zugänglichen Bereichen +++ Hinweise zur Frequenzhygiene 104,6 sind unverändert gültig +++ Antragsformular B-3a in der Fassung vom Vortag weiterhin anwendbar +++ Bei Rückfragen gilt die Auskunftslage des Vortages +++&ldquo;,
    hold: 13,
    bulletins: [
      &ldquo;Bekanntmachung der zuständigen Verlautbarungsstelle. Die nachfolgenden Inhalte ersetzen frühere Bekanntmachungen nur insoweit, als frühere Bekanntmachungen erkennbar ersetzt werden sollen.&ldquo;,
      &ldquo;Antragsformular B-3a. Die Verwendung der Fassung vom Vortag bleibt zulässig, solange keine aktuellere Fassung in einer dem Antragsteller zumutbaren Weise zur Kenntnis gelangt ist.&ldquo;,
      &ldquo;Antragsformular B-3a, Hinweis 2. Eine Antragstellung ohne vorherige Antragstellung wird ausdrücklich nicht empfohlen. Die hierfür vorgesehenen Vorverfahren sind in der gewohnten Reihenfolge zu durchlaufen.&ldquo;,
      &ldquo;Sprechzeiten. Die Sprechzeiten der nicht öffentlich zugänglichen Bereiche werden, soweit erforderlich, angepasst. Eine Veröffentlichung der angepassten Sprechzeiten erfolgt nach Maßgabe der jeweiligen Erfordernisse.&ldquo;,
      &ldquo;Hinweis zur Erreichbarkeit. Die telefonische Erreichbarkeit der Leitstelle ist innerhalb der hierfür vorgesehenen Erreichbarkeitsfenster erreichbar. Außerhalb dieser Fenster ist die Erreichbarkeit nicht gewährleistet.&ldquo;,
      &ldquo;Hinweis zur Erreichbarkeit, Ergänzung. Bei nicht zustande gekommener Verbindung wird empfohlen, die Verbindung zu einem späteren Zeitpunkt erneut herzustellen, sofern eine Herstellung möglich erscheint.&ldquo;,
      &ldquo;Frequenzhygiene 104,6. Die Bewohnerinnen und Bewohner werden daran erinnert, dass die Frequenz 104,6 in näher zu bezeichnenden Sektoren einer besonderen Behandlung unterliegt. Einzelheiten ergeben sich aus den einschlägigen Regelungen.&ldquo;,
      &ldquo;Frequenzhygiene 104,6, Ergänzung. Eine Verwendung des Schmerz-Radios in einer der Verwendung nicht zuträglichen Weise wird ausdrücklich nicht empfohlen.&ldquo;,
      &ldquo;Hausmeisterdienste. Die Bereitschaft der Hausmeisterdienste richtet sich nach den jeweils gültigen Bereitschaftsplänen. Diese sind bei der zuständigen Stelle zur Einsichtnahme hinterlegt, soweit eine Hinterlegung erfolgt ist.&ldquo;,
      &ldquo;Wartungsfenster. Die im Umlauf befindlichen Wartungsfenster gelten in der jeweils festgelegten Reihenfolge. Eine Festlegung der Reihenfolge erfolgt durch die für die Festlegung zuständige Stelle.&ldquo;,
      &ldquo;Zugangskontrollen. Zugangskontrollen werden, sofern sie als Zugangskontrollen vorgesehen sind, in der vorgesehenen Form durchgeführt. Eine darüber hinausgehende Erläuterung ist nicht vorgesehen.&ldquo;,
      &ldquo;Mitteilung an Antragstellende. Anträge, deren Bearbeitung sich verzögert, werden bei der Bearbeitung berücksichtigt, sobald sie zur Bearbeitung vorgesehen sind.&ldquo;,
      &ldquo;Mitteilung an Antragstellende, Fortsetzung. Eine zwischenzeitliche Sachstandsanfrage ist möglich. Die Beantwortung erfolgt im Rahmen der Möglichkeiten der bearbeitenden Stelle.&ldquo;,
      &ldquo;Hinweis Quarantäne-Siegel. Türen, die mit einem Siegel der Kategorie &bdquo;Resonanz-Überlastung&ldquo; versehen sind, sind nicht zu öffnen, nicht zu beklopfen und nicht in einer der Aufmerksamkeit zugänglichen Weise zu kommentieren.&ldquo;,
      &ldquo;Hinweis Quarantäne-Siegel, Ergänzung. Eine Beschwerde gegen die Anbringung eines solchen Siegels ist im hierfür vorgesehenen Beschwerdeweg vorzusehen, sofern ein Beschwerdeweg vorgesehen ist.&ldquo;,
      &ldquo;Hinweis zur Berichterstattung. Berichte über das Vorhandensein nicht erteilter Auskünfte sind nicht erteilte Auskünfte und werden als solche behandelt.&ldquo;,
      &ldquo;Mitteilung Schichtdienst. Die Schichtpläne der Leitstelle gelten in der bekannten Reihenfolge. Abweichungen von der bekannten Reihenfolge gelten erst nach Bekanntgabe der Abweichungen.&ldquo;,
      &ldquo;Mitteilung Empfangsbereich. In Empfangsbereichen ist auf eine ruhige und an die jeweilige Empfangssituation angepasste Sprechweise zu achten. Lautes Sprechen kann zu einer Anpassung der Sprechweise führen.&ldquo;,
      &ldquo;Mitteilung Wartebereich. Wartezeiten gelten als Wartezeiten und werden nicht gesondert ausgewiesen.&ldquo;,
      &ldquo;Schlussbemerkung. Diese Verlautbarung wiederholt sich, solange eine Wiederholung als angezeigt erscheint. Über das Vorliegen eines Anlasses zur Nicht-Wiederholung wird gegebenenfalls gesondert informiert.&ldquo;,
    ],
  },
  {
    id: &ldquo;z3&ldquo;,
    name: &ldquo;Wetter & Resonanz&ldquo;,
    tag: &ldquo;Sektorale Wetter- und Resonanzlage&ldquo;,
    ticker:
      &ldquo;+++ Resonanzindex im Mittel +++ keine sektorenübergreifenden Auffälligkeiten +++ punktuelle Erhöhungen werden im Rahmen der dafür vorgesehenen Glättung berücksichtigt +++ Empfehlung: Innenräume bevorzugen, Frequenzhygiene 104,6 beachten +++&ldquo;,
    hold: 12,
    bulletins: [
      &ldquo;Sektorenübergreifend. Die Resonanzlage bewegt sich innerhalb der Bandbreite, die als die der Resonanzlage entsprechende Bandbreite anerkannt ist.&ldquo;,
      &ldquo;Sektor E67. Resonanzindex: im Erwartungsbereich. Eine Häufung von Hörmeldungen wurde nicht in einer der Veröffentlichung zugänglichen Form festgestellt.&ldquo;,
      &ldquo;Sektor E71. Resonanzindex: erhöht, jedoch nicht erhöht im Sinne der für eine Erhöhung vorgesehenen Schwellen. Eine Veröffentlichung erfolgt daher nicht.&ldquo;,
      &ldquo;Sektor E73. Resonanzindex: nicht abschließend bestimmbar. Es wird empfohlen, vorerst von einem als nicht abschließend bestimmbar gekennzeichneten Wert auszugehen.&ldquo;,
      &ldquo;Wetter Quadrant E67-Süd. Bewölkung wechselnd, mit Phasen, in denen die Bewölkung nicht wechselt. Niederschlag möglich, soweit Niederschlag möglich ist.&ldquo;,
      &ldquo;Wetter Quadrant E71-Nord. Sicht eingeschränkt durch Hochnebel. Eine Aufhellung wird in Aussicht gestellt, sobald eine Aufhellung in Aussicht zu stellen ist.&ldquo;,
      &ldquo;Wetter Quadrant E12-West. Wind aus wechselnden Richtungen. Die Richtungen unterliegen der jeweils vorherrschenden Großwetterlage.&ldquo;,
      &ldquo;Hinweis zur Frequenzhygiene. In den Sektoren mit erhöhter sensorischer Sensibilität wird ausdrücklich daran erinnert, die Frequenz 104,6 ausschließlich in der dafür vorgesehenen Weise zu verwenden.&ldquo;,
      &ldquo;Hinweis zu Hörphänomenen. Vereinzelt gemeldete Hörphänomene können nicht ausgeschlossen werden. Sie können jedoch auch nicht als bestätigt gelten.&ldquo;,
      &ldquo;Hinweis zu Hörphänomenen, Ergänzung. Eine Mitteilung an die zuständige Stelle ist möglich. Eine Bestätigung des Eingangs erfolgt, sofern eine Bestätigung erfolgt.&ldquo;,
      &ldquo;Sektor E55. Im Tagesverlauf wurden vereinzelt Resonanzspitzen registriert. Eine Einordnung als Spitzen erfolgt erst nach abschließender Einordnung.&ldquo;,
      &ldquo;Sektor E58. Resonanzlage: ruhig. Eine ruhige Resonanzlage ist als ruhige Resonanzlage zu beschreiben.&ldquo;,
      &ldquo;Sektor E61. Es liegen einzelne Meldungen über sogenanntes &bdquo;inneres Mitschwingen&ldquo; vor. Diese Meldungen werden zur Kenntnis genommen, sofern sie als zur Kenntnis zu nehmende Meldungen vorliegen.&ldquo;,
      &ldquo;Sektor E66. Resonanzlage stabil. Eine Stabilität der Resonanzlage gilt nur insoweit, als die Stabilität nicht erkennbar instabil wird.&ldquo;,
      &ldquo;Sektor E70. Frühnebel im Erdgeschossbereich. Mit zunehmender Tageshöhe ist mit zunehmender Tageshöhe zu rechnen.&ldquo;,
      &ldquo;Sektor E71, Korridor 15. Eine ergänzende Resonanzbeobachtung ist nicht vorgesehen, da eine Beobachtung in dem dafür nicht vorgesehenen Bereich nicht vorgesehen ist.&ldquo;,
      &ldquo;Sektor E84. Resonanzwerte unauffällig, mit Ausnahme der Auffälligkeiten, die für diesen Sektor als unauffällige Auffälligkeiten anerkannt sind.&ldquo;,
      &ldquo;Allgemeiner Hinweis. Bewohnerinnen und Bewohner werden gebeten, bei subjektiven Veränderungen der eigenen Resonanzempfindung den Aufenthalt in Innenräumen zu bevorzugen.&ldquo;,
      &ldquo;Allgemeiner Hinweis, Ergänzung. Eine Selbstbeobachtung ersetzt die Beobachtung durch die hierfür zuständige Stelle nicht.&ldquo;,
      &ldquo;Aussicht. Im weiteren Tagesverlauf ist mit einer Fortsetzung des bisherigen Tagesverlaufs zu rechnen.&ldquo;,
      &ldquo;Schlussbemerkung. Die nächste Wetter- und Resonanzlage wird im Anschluss an die vorliegende Wetter- und Resonanzlage ausgestrahlt.&ldquo;,
    ],
  },
];

export function Television() {
  const { tvOpen, closeTelevision } = useGame();
  const [channelIdx, setChannelIdx] = useState(0);
  // Cursor pro Kanal — bleibt erhalten, wenn der Spieler umschaltet, sodass
  // jeder Kanal seine Schleife nahtlos weiterführt.
  const cursorsRef = useRef<number[]>(CHANNELS.map(() => 0));
  const [tick, setTick] = useState(0);

  // Reset cursors on close, damit beim nächsten Öffnen die Schleifen frisch
  // (und gleichmäßig verteilt) starten.
  useEffect(() => {
    if (!tvOpen) {
      cursorsRef.current = CHANNELS.map(() => 0);
      setChannelIdx(0);
      setTick(0);
    }
  }, [tvOpen]);

  const channel = CHANNELS[channelIdx];

  // Auto-advance der Bulletins. `tick` triggert den Re-Render, der eigentliche
  // State liegt im Cursor-Ref.
  useEffect(() => {
    if (!tvOpen) return;
    const id = window.setInterval(() => {
      cursorsRef.current[channelIdx] =
        (cursorsRef.current[channelIdx] + 1) % channel.bulletins.length;
      setTick((t) => t + 1);
    }, channel.hold * 1000);
    return () => window.clearInterval(id);
  }, [tvOpen, channelIdx, channel.bulletins.length, channel.hold]);

  const bulletinIdx = cursorsRef.current[channelIdx];
  const bulletin = channel.bulletins[bulletinIdx];

  const time = useMemo(() => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, &ldquo;0&ldquo;)}:${d
      .getMinutes()
      .toString()
      .padStart(2, &ldquo;0&ldquo;)}`;
    // tick refresh sorgt indirekt für gelegentliche Aktualisierung
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  if (!tvOpen) return null;

  return (
    <div className=&ldquo;absolute inset-0 z-40 flex items-center justify-center bg-black/85 px-4 py-6&ldquo;>
      <div className=&ldquo;relative flex h-full max-h-[640px] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-amber-glow/40 bg-black shadow-[0_0_60px_rgba(0,0,0,0.8)]&ldquo;>
        <CloseButton
          onClick={closeTelevision}
          label=&ldquo;Aus&ldquo;
          className=&ldquo;absolute right-3 top-3 z-20&ldquo;
        />

        {/* Bildschirm */}
        <div className=&ldquo;relative flex flex-1 flex-col overflow-hidden bg-[oklch(0.16_0.02_120)] scanlines&ldquo;>
          {/* Senderlogo + Uhr */}
          <div className=&ldquo;flex items-start justify-between px-5 pt-5&ldquo;>
            <div>
              <div className=&ldquo;font-mono-crt text-2xl text-amber-glow amber-glow&ldquo;>
                {channel.name}
              </div>
              <div className=&ldquo;mt-1 font-display text-xs uppercase tracking-widest text-muted-foreground&ldquo;>
                {channel.tag}
              </div>
            </div>
            <div className=&ldquo;text-right font-mono-crt text-amber-glow/80&ldquo;>
              <div className=&ldquo;text-lg leading-none&ldquo;>{time}</div>
              <div className=&ldquo;text-[10px] uppercase tracking-widest text-muted-foreground&ldquo;>
                Live · Sektorfunk
              </div>
            </div>
          </div>

          {/* Hauptmeldung */}
          <div className=&ldquo;flex flex-1 items-center justify-center px-8 py-6&ldquo;>
            <p
              key={`${channelIdx}-${bulletinIdx}`}
              className=&ldquo;fade-in max-w-2xl text-center font-display text-base leading-relaxed text-foreground text-shadow-hard sm:text-lg&ldquo;
            >
              {bulletin}
            </p>
          </div>

          {/* Untere Zeile: Meldungs-Position */}
          <div className=&ldquo;flex items-center justify-between border-t border-amber-glow/20 px-5 py-2 font-mono-crt text-[11px] uppercase tracking-widest text-muted-foreground&ldquo;>
            <span>
              Meldung {bulletinIdx + 1} / {channel.bulletins.length}
            </span>
            <span className=&ldquo;text-amber-glow/70&ldquo;>▌Programm läuft</span>
          </div>

          {/* Laufband */}
          <div className=&ldquo;overflow-hidden border-t border-amber-glow/30 bg-black/60 py-1&ldquo;>
            <div className=&ldquo;tv-ticker whitespace-nowrap font-mono-crt text-sm text-amber-glow amber-glow&ldquo;>
              {channel.ticker}
              <span className=&ldquo;px-8&ldquo;>·</span>
              {channel.ticker}
            </div>
          </div>
        </div>

        {/* Kanalwahl */}
        <div className=&ldquo;flex items-stretch gap-px bg-amber-glow/20 p-px&ldquo;>
          {CHANNELS.map((c, i) => (
            <button
              key={c.id}
              type=&ldquo;button&ldquo;
              onClick={() => setChannelIdx(i)}
              className={`flex-1 px-3 py-2 text-left font-mono-crt text-xs uppercase tracking-widest transition-colors ${
                i === channelIdx
                  ? &ldquo;bg-amber-glow/20 text-amber-glow amber-glow&ldquo;
                  : &ldquo;bg-black text-muted-foreground hover:bg-amber-glow/10 hover:text-amber-glow&ldquo;
              }`}
              aria-pressed={i === channelIdx}
            >
              <span className=&ldquo;mr-2 opacity-60&ldquo;>K{i + 1}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}