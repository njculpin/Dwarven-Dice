import { Environment } from "@react-three/drei";

export function LightRig() {
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
      {/* <Environment
        background={false}
        preset={"sunset"}
        blur={0.4}
        ground={{
          height: 15,
          radius: 60,
          scale: 1000,
        }}
      /> */}
    </group>
  );
}
