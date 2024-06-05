import { Environment, ContactShadows } from "@react-three/drei";

export function LightRig() {
  return (
    <group>
      {/* <directionalLight
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
      /> */}
      <Environment background={false} preset={"sunset"} blur={1} />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.75}
        scale={30}
        blur={2}
        far={4}
      />
    </group>
  );
}
