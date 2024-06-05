import { Stage } from "@react-three/drei";

export function LightRig() {
  return (
    <group>
      <Stage preset="soft" shadows="contact" environment="sunset">
        <mesh castShadow />
      </Stage>
    </group>
  );
}
