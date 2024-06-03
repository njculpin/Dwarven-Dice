import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { MobileController } from "./components/MobileController";
import { CameraRig } from "./components/CameraRig";
import { LightRight } from "./components/LightsRig";
import { insertCoin } from "playroomkit";
import { useGameManager } from "./hooks/useGameManager";

export default function App() {
  const game = useGameManager();

  useEffect(() => {
    async function initPlayRoom() {
      await insertCoin({ streamMode: false, gameId: process.env.PLAYROOM });
    }
    initPlayRoom();
  }, []);

  function startGame() {
    return game.startGame();
  }

  function roll() {
    return game.rollDice();
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas
        camera={{
          fov: 35,
          position: [0, 15, 0],
        }}
      >
        <MotionConfig
          transition={{
            type: "spring",
            mass: 5,
            stiffness: 500,
            damping: 100,
            restDelta: 0.0001,
          }}
        >
          <MobileController />
          {/* <CameraRig /> */}
          <LightRight />
        </MotionConfig>
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
        onClick={roll}
      >
        Roll
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
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}
