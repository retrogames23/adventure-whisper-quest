import { useState } from "react";
import { GameProvider } from "@/game/GameContext";
import { SceneView } from "./SceneView";
import { TopBar } from "./TopBar";
import { Inventory } from "./Inventory";
import { TextOverlay } from "./TextOverlay";
import { DialogOverlay } from "./DialogOverlay";
import { RadioPanel } from "./RadioPanel";
import { Terminal } from "./Terminal";
import { Ending } from "./Ending";
import { TitleScreen } from "./TitleScreen";

export function Game() {
  const [started, setStarted] = useState(false);

  if (!started) return <TitleScreen onStart={() => setStarted(true)} />;

  return (
    <GameProvider>
      <div className="flex min-h-screen flex-col bg-bureaucracy">
        <TopBar />
        <main className="relative flex-1 px-2 py-3 sm:px-4">
          <div className="relative">
            <SceneView />
            <TextOverlay />
            <DialogOverlay />
            <RadioPanel />
            <Terminal />
            <Ending />
          </div>
        </main>
        <Inventory />
      </div>
    </GameProvider>
  );
}