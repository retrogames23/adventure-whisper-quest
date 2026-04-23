import apartmentBg from "@/assets/scene-apartment.jpg";
import hallwayBg from "@/assets/scene-hallway.jpg";
import philippeBg from "@/assets/scene-philippe.jpg";
import sectorBg from "@/assets/scene-sector-door.jpg";
import e71LobbyBg from "@/assets/scene-e71-lobby.jpg";
import corridor15Bg from "@/assets/scene-corridor-15.jpg";
import room1534Bg from "@/assets/scene-room-1534.jpg";
import type { Scene } from "./types";

export const scenes: Record<string, Scene> = {
  apartment: {
    id: "apartment",
    background: apartmentBg,
    title: "Wohnung 2611 — Quadrant E67",
    intro:
      "Layard Worag. Ein-Zimmer-Wohnung, Quadrant E67. Auf dem Tisch: das Schmerz-Radio. Die Frequenz steht auf 102,3 — Einsamkeit. Routine.",
    hotspots: [
      {
        id: "radio",
        x: 5,
        y: 55,
        w: 22,
        h: 18,
        label: "Schmerz-Radio",
        onUse: (api) => api.openRadio(),
      },
      {
        id: "terminal",
        x: 24,
        y: 48,
        w: 22,
        h: 22,
        label: "CentralOS Terminal",
        onUse: (api) => api.openTerminal(),
      },
      {
        id: "bed",
        x: 50,
        y: 60,
        w: 35,
        h: 30,
        label: "Bett",
        onUse: (api) =>
          api.showText([
            "Ungemacht. Wie immer.",
            "Schlaf ist B2-konform: ausreichend, geschmacklos.",
          ]),
      },
      {
        id: "b2",
        x: 4,
        y: 84,
        w: 12,
        h: 14,
        label: "B2-Ration",
        onUse: (api) =>
          api.showText([
            "Synthetische Nährpaste B2.",
            "„Vollständige Versorgung. Keine Reizüberflutung.“",
            "Sie schmeckt nach nichts. Das ist Absicht.",
          ]),
      },
      {
        id: "window",
        x: 65,
        y: 18,
        w: 18,
        h: 35,
        label: "Fenster",
        onUse: (api) =>
          api.showText([
            "Hinter dem Fenster: derselbe Innenhof wie gestern.",
            "Dasselbe fahle Grün. Dieselbe Stille.",
          ]),
      },
      {
        id: "door",
        x: 86,
        y: 35,
        w: 12,
        h: 60,
        label: "Wohnungstür",
        requires: ["doorbellRang"],
        onUse: (api) => {
          if (!api.hasFlag("metPhilippe")) {
            api.setFlag("metPhilippe");
            api.goTo("philippe");
          } else {
            api.goTo("hallway");
          }
        },
      },
    ],
  },

  philippe: {
    id: "philippe",
    background: philippeBg,
    title: "Wohnung 2610 — Philippe",
    intro:
      "Philippes Wohnung riecht nach echtem Kaffee. Verboten. Im Hintergrund tragen die Sanitäter jemanden weg. Reglos. Augen offen.",
    hotspots: [
      {
        id: "philippeNpc",
        x: 0,
        y: 30,
        w: 30,
        h: 60,
        label: "Philippe",
        hiddenWhen: ["calledLeitstelle"],
        onUse: (api) => api.startDialog("philippeIntro"),
      },
      {
        id: "phone",
        x: 32,
        y: 55,
        w: 16,
        h: 16,
        label: "Telefon",
        requires: ["metPhilippe"],
        hiddenWhen: ["calledLeitstelle"],
        onUse: (api) => {
          api.setFlag("calledLeitstelle");
          api.startDialog("insa1");
        },
      },
      {
        id: "paramedics",
        x: 56,
        y: 18,
        w: 38,
        h: 70,
        label: "Sanitäter",
        requires: ["calledLeitstelle"],
        hiddenWhen: ["protocolReceived"],
        onUse: (api) => {
          api.setFlag("protocolReceived");
          api.addItem({
            id: "protocol",
            name: "Einsatzprotokoll (verschlüsselt)",
            description:
              "Eine versiegelte Datenkapsel. Ziel: Sektor E71, Zimmer 1534.",
          });
          api.setKnowledge("resonanceTerm");
          api.setKnowledge("responsibilityE67");
          api.startDialog("paramedic");
        },
      },
      {
        id: "lamp",
        x: 30,
        y: 30,
        w: 14,
        h: 25,
        label: "Lampe",
        onUse: (api) =>
          api.showText([
            "Die einzige warme Lichtquelle in E67.",
            "Philippe muss sie heimlich repariert haben.",
          ]),
      },
      {
        id: "exitPhilippe",
        x: 88,
        y: 70,
        w: 11,
        h: 28,
        label: "Zurück in den Flur",
        requires: ["protocolReceived"],
        onUse: (api) => api.goTo("hallway"),
      },
    ],
  },

  hallway: {
    id: "hallway",
    background: hallwayBg,
    title: "Korridor 26 — Quadrant E67",
    intro:
      "Der Korridor. Wie jeden Morgen. Nur dass Layard ihn jeden Morgen nicht betritt.",
    hotspots: [
      {
        id: "back2611",
        x: 70,
        y: 35,
        w: 22,
        h: 50,
        label: "Tür 2611 (zurück)",
        onUse: (api) => api.goTo("apartment"),
      },
      {
        id: "to2610",
        x: 5,
        y: 35,
        w: 22,
        h: 50,
        label: "Tür 2610 (Philippe)",
        hiddenWhen: ["protocolReceived"],
        onUse: (api) => api.goTo("philippe"),
      },
      {
        id: "toSector",
        x: 38,
        y: 30,
        w: 24,
        h: 60,
        label: "Korridor → Sektor-Tür",
        requires: ["protocolReceived"],
        onUse: (api) => api.goTo("sectorDoor"),
      },
    ],
  },

  sectorDoor: {
    id: "sectorDoor",
    background: sectorBg,
    title: "Sektor-Tür E67 / E71",
    intro:
      "Eine Tür, die Layard seit Jahren nicht passiert hat. Daneben: ein Keypad. Darüber: ein Monitor mit grüner Phosphor-Schrift, der „ERROR 4567“ blinkt.",
    hotspots: [
      {
        id: "monitor",
        x: 22,
        y: 25,
        w: 22,
        h: 18,
        label: "Status-Monitor",
        onUse: (api) =>
          api.showText([
            ">> CENTRALOS v2.3 — SEKTOR-GATEWAY",
            ">> ERROR 4567: Gateway-Authentifizierung fehlgeschlagen",
            ">> Wartungsarbeiten am Gateway gemeldet.",
            ">> Lösungspfad: Manueller Code via Leitstelle 001.",
          ]),
      },
      {
        id: "keypadCall",
        x: 60,
        y: 50,
        w: 18,
        h: 30,
        label: "Keypad — Code eingeben",
        onUse: (api) => {
          if (!api.hasFlag("calledForCode")) {
            api.showText([
              "Das Keypad blinkt rot.",
              "Layard hat keinen Code. Noch nicht.",
              "Es gibt nur einen Weg: 001 anrufen — aber dafür braucht es ein Telefon.",
              "[ Geh zurück in den Flur und nutze Philippes Telefon erneut. ]",
            ]);
          } else {
            api.openTerminal();
          }
        },
      },
      {
        id: "elevator",
        x: 82,
        y: 30,
        w: 16,
        h: 60,
        label: "Aufzug → E71",
        requires: ["sectorDoorOpen"],
        onUse: (api) => {
          api.setFlag("elevatorTaken");
          api.goTo("e71Lobby");
        },
      },
      {
        id: "backHallwayS",
        x: 0,
        y: 60,
        w: 14,
        h: 38,
        label: "Zurück in den Flur",
        onUse: (api) => api.goTo("hallway"),
      },
    ],
  },

  elevatorEnd: {
    id: "elevatorEnd",
    background: sectorBg,
    title: "Aufzug",
    hotspots: [],
  },

  e71Lobby: {
    id: "e71Lobby",
    background: e71LobbyBg,
    title: "Sektor E71 — Empfang",
    intro:
      "Der Aufzug schließt hinter Layard. Andere Luft. Kühler. Sauberer. Eine Frau hinter einem Tresen sieht auf — als hätte sie ihn erwartet.",
    hotspots: [
      {
        id: "receptionist",
        x: 70,
        y: 35,
        w: 25,
        h: 50,
        label: "Empfangsdame",
        hiddenWhen: ["metReceptionist"],
        onUse: (api) => {
          api.setFlag("metReceptionist");
          api.startDialog("reception");
        },
      },
      {
        id: "directory",
        x: 35,
        y: 30,
        w: 18,
        h: 22,
        label: "Hinweisschild",
        onUse: (api) =>
          api.showText([
            ">> SEKTOR E71 — MEDIZIN",
            ">> Korridor 15  →  Zimmer 1500–1540",
            ">> Korridor 16  →  Pathologie",
            ">> Frequenzsperre 104,6 in diesem Sektor — bitte respektieren.",
          ]),
      },
      {
        id: "elevatorBack",
        x: 0,
        y: 30,
        w: 22,
        h: 65,
        label: "Aufzug zurück nach E67",
        requires: ["heardMikaelTruth"],
        onUse: (api) => {
          api.setFlag("ending");
          api.setEnding();
        },
      },
      {
        id: "toCorridor15",
        x: 50,
        y: 50,
        w: 16,
        h: 35,
        label: "Tür → Korridor 15",
        requires: ["metReceptionist"],
        onUse: (api) => api.goTo("corridor15"),
      },
    ],
  },

  corridor15: {
    id: "corridor15",
    background: corridor15Bg,
    title: "Korridor 15 — Sektor E71",
    intro:
      "Spiegelblanker Linoleum. Drei Lichter flackern. Am Ende des Korridors: eine rote Tür. Zimmer 1534.",
    hotspots: [
      {
        id: "gurney",
        x: 6,
        y: 55,
        w: 22,
        h: 25,
        label: "Verlassene Trage",
        onUse: (api) =>
          api.showText([
            "Eine zurückgelassene Trage. Auf dem Laken: ein hellbrauner Fleck.",
            "Daneben: ein Klemmbrett. Name unleserlich. Datum: heute.",
          ]),
      },
      {
        id: "doors",
        x: 28,
        y: 30,
        w: 38,
        h: 50,
        label: "Türen 1530–1540",
        onUse: (api) =>
          api.showText([
            "1530, 1532, 1536, 1538 — alle grün. Alle leer.",
            "Nur 1534 zeigt ein gelbes Licht. Aktiv. Bewohnt.",
          ]),
      },
      {
        id: "door1534",
        x: 44,
        y: 35,
        w: 14,
        h: 50,
        label: "Tür 1534 (rot beleuchtet)",
        onUse: (api) => {
          api.setFlag("foundRoom1534");
          api.goTo("room1534");
        },
      },
      {
        id: "backLobby",
        x: 84,
        y: 70,
        w: 14,
        h: 28,
        label: "Zurück zum Empfang",
        onUse: (api) => api.goTo("e71Lobby"),
      },
    ],
  },

  room1534: {
    id: "room1534",
    background: room1534Bg,
    title: "Zimmer 1534 — Mikael Bauerfeind",
    intro:
      "Warmes Licht. Echtes Holz. Ein alter Mann unter einer dünnen Decke. Neben ihm ein kleiner Empfänger, der amber glüht — auf einer Frequenz, die nicht im Verzeichnis steht.",
    hotspots: [
      {
        id: "mikaelNpc",
        x: 18,
        y: 50,
        w: 40,
        h: 35,
        label: "Alter Mann",
        hiddenWhen: ["metMikael"],
        onUse: (api) => {
          api.setFlag("metMikael");
          api.setKnowledge("radioOrigin");
          api.setKnowledge("leitstelleListens");
          api.setKnowledge("frequencyControl");
          api.startDialog("mikael");
        },
      },
      {
        id: "nightstand",
        x: 0,
        y: 55,
        w: 18,
        h: 38,
        label: "Nachttisch / Schubladen",
        requires: ["metMikael"],
        hiddenWhen: ["tookCrystal"],
        onUse: (api) => {
          api.setFlag("tookCrystal");
          api.setFlag("readLetter");
          api.addItem({
            id: "tuningCrystal",
            name: "Bernstein-Kristall",
            description:
              "Ein handgeschliffener Quarz. Stimmt das Schmerz-Radio jenseits des offiziellen Bands.",
          });
          api.addItem({
            id: "mikaelLetter",
            name: "Brief an Insa",
            description:
              "Ein versiegelter, handbeschriebener Umschlag. Nicht über das Terminal zu öffnen.",
          });
          api.setFlag("heardMikaelTruth");
          api.startDialog("mikaelLast");
        },
      },
      {
        id: "monitor",
        x: 0,
        y: 60,
        w: 14,
        h: 18,
        label: "Medizinmonitor",
        requires: ["heardMikaelTruth"],
        onUse: (api) =>
          api.showText([
            "Eine flache Linie. Kein Alarm.",
            "Niemand hat ihn aktiviert. Niemand wird kommen.",
          ]),
      },
      {
        id: "photo",
        x: 38,
        y: 32,
        w: 12,
        h: 18,
        label: "Foto an der Wand",
        onUse: (api) =>
          api.showText([
            "Ein junges Mädchen, vielleicht zehn Jahre alt.",
            "Auf der Rückseite, in derselben Handschrift wie der Brief: „Insa, 1986“.",
          ]),
      },
      {
        id: "leaveRoom",
        x: 86,
        y: 60,
        w: 12,
        h: 35,
        label: "Zurück in den Korridor",
        requires: ["heardMikaelTruth"],
        onUse: (api) => {
          if (!api.hasFlag("insa3Called")) {
            api.setFlag("insa3Called");
            api.startDialog("insa3");
          }
          api.goTo("corridor15");
        },
      },
    ],
  },
};