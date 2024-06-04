import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { MobileController } from "./components/MobileController";
import { LightRig } from "./components/LightsRig";
import { useGameManager } from "./hooks/useGameManager";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  const game = useGameManager();
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas
        camera={{
          fov: 40,
          position: [0, 40, 0],
        }}
      >
        <StrictMode>
          <Physics>
            <MobileController />
          </Physics>
          <LightRig />
        </StrictMode>
        <OrbitControls />
      </Canvas>
      <button
        style={{
          border: 1,
          padding: "16px",
          position: "absolute",
          zIndex: 100,
          top: 16,
          right: 16,
        }}
        onClick={() => game.startGame()}
      >
        Start
      </button>
      <button
        style={{
          border: 1,
          padding: "16px",
          position: "absolute",
          zIndex: 100,
          top: 100,
          right: 16,
        }}
        onClick={() => game.rollDice()}
      >
        Roll
      </button>
    </div>
  );
}
