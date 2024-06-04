import { StrictMode, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { MobileController } from "./components/MobileController";
import { LightRig } from "./components/LightsRig";
import { useGameManager } from "./hooks/useGameManager";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  const game = useGameManager();

  useEffect(() => {
    game.startGame();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas
        camera={{
          fov: 40,
          position: [0, 50, 0],
        }}
      >
        <StrictMode>
          <Physics>
            <MobileController />
          </Physics>
          <LightRig />
          <OrbitControls />
        </StrictMode>
      </Canvas>
    </div>
  );
}
