import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Vector3, Group } from "three";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Dice: Mesh;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  materials: {};
};

export function Die({ face, position }: { face: string; position: Vector3 }) {
  const ref = useRef<Group>(null);
  const URL = "/models/Dice.gltf";
  const { nodes } = useGLTF(URL) as GLTFResult;

  useFrame(() => {
    if (face && ref.current) {
      getRotationAngle(face);
    }
  });

  function getRotationAngle(face: string) {
    if (!ref.current) {
      return;
    }
    switch (face) {
      case "beers":
        ref.current.rotation.set(0, 0, -Math.PI / 2);
        break;
      case "horns":
        ref.current.rotation.set(Math.PI / 2, 0, 0);
        break;
      case "axes":
        ref.current.rotation.set(Math.PI, 0, 0);
        break;
      case "bombs":
        ref.current.rotation.set(0, 0, 0);
        break;
      case "lanterns":
        ref.current.rotation.set(0, 0, Math.PI / 2);
        break;
      case "heads":
        ref.current.rotation.set(-Math.PI / 2, 0, 0);
        break;
      default:
        ref.current.rotation.set(0, 0, Math.PI / 2);
        break;
    }
  }

  return (
    <group ref={ref} position={position} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dice.geometry}
        material={nodes.Dice.material}
        scale={[0.3, 0.3, 0.3]}
      />
    </group>
  );
}
