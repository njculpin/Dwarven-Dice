import { SoftShadows } from "@react-three/drei";

export function LightRight() {
  return (
    <group>
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <SoftShadows />
    </group>
  );
}
