import { useGLTF } from "@react-three/drei";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { GLTF } from "three-stdlib";
import { Mesh } from "three";
import { useRef } from "react";

type Die = {
  id: number;
  face: string;
  spent: boolean;
  commit: boolean;
  used: boolean;
  roll: () => void;
};

type GLTFResult = GLTF & {
  nodes: {
    Dice: Mesh;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  materials: {};
};

export function Die({ die }: { die: Die }) {
  const api = useRef<RapierRigidBody>(null);
  const ref = useRef<Mesh>(null);
  const URL = "/models/Dice.gltf";
  const { nodes } = useGLTF(URL) as GLTFResult;

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <RigidBody
      ref={api}
      restitution={0.2}
      canSleep={false}
      position={[
        randomNumber(-5, 5),
        randomNumber(12, 15),
        randomNumber(-5, 5),
      ]}
    >
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Dice.geometry}
        material={nodes.Dice.material}
        onPointerOver={() => (document.body.style.cursor = "grab")}
        onPointerOut={() => (document.body.style.cursor = "")}
      />
    </RigidBody>
  );
}
