import {
  HISTORY_CHAPTERS,
  HISTORY_SUBTITLE,
  HISTORY_TITLE,
  HISTORY_UI_TEXT,
} from "@/game/kuerzesteGeschichte";
import { registerBook } from "./index";

registerBook({
  id: "history",
  title: HISTORY_TITLE,
  subtitle: HISTORY_SUBTITLE,
  author: "Mandats-Schulbuchreihe",
  year: "1994",
  blurb:
    "Populärwissenschaftlicher Überblick über die Weltgeschichte. Zweites Buch im Wandregal von Layards Wohnung.",
  chapters: HISTORY_CHAPTERS,
  uiText: HISTORY_UI_TEXT,
  locationHint: "Wandregal, Layards Wohnung",
  lendable: false,
});
