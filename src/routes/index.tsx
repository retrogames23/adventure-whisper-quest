import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/components/game/Game";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Schmerz-Radio auf 104,6 — Akt I" },
      {
        name: "description",
        content:
          "Ein 2D Point & Click-Adventure über bürokratische Erstarrung und das heimliche Begehren nach echtem Erleben.",
      },
    ],
  }),
});

function Index() {
  return <Game />;
}
