import { useEffect } from "react";
import { LightRig } from "./LightsRig";
import { MobileController } from "./MobileController";
import { OrbitControls } from "@react-three/drei";
import { useGame } from "../hooks/useGame";
import { GameContextType } from "../hooks/useGameProvider";

export function Experience() {
  const { mineGems, fieldGems, start } = useGame() as GameContextType;

  useEffect(() => {
    start();
  }, []);

  console.log(mineGems, fieldGems);

  return (
    <>
      <LightRig />
      <OrbitControls />
      <MobileController />
    </>
  );
}
