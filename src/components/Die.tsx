import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Mesh } from "three";
import { useRef } from "react";
import { DragControls } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    Dice: Mesh;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  materials: {};
};

export function Die({ face }: { face: string }) {
  const ref = useRef<Mesh>(null);
  const URL = "/models/Dice.gltf";
  const { nodes } = useGLTF(URL) as GLTFResult;

  useEffect(() => {
    rotateRandom(face);
  }, [face]);

  function rotateRandom(face: string) {
    getRotationAngle(face);
  }

  function getRotationAngle(face: string) {
    if (!ref.current) {
      return;
    }
    switch (face) {
      case "beers":
        ref.current.rotation.set(
          0,
          randomIntFromInterval(1, 360),
          -Math.PI / 2
        );
        break;
      case "horns":
        ref.current.rotation.set(Math.PI / 2, 0, randomIntFromInterval(1, 360));
        break;
      case "axes":
        ref.current.rotation.set(Math.PI, randomIntFromInterval(1, 360), 0);
        break;
      case "bombs":
        ref.current.rotation.set(0, randomIntFromInterval(1, 360), 0);
        break;
      case "lanterns":
        ref.current.rotation.set(0, randomIntFromInterval(1, 360), Math.PI / 2);
        break;
      case "heads":
        ref.current.rotation.set(
          -Math.PI / 2,
          0,
          randomIntFromInterval(1, 360)
        );
        break;
      default:
        ref.current.rotation.set(0, 0, Math.PI / 2);
        break;
    }
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <DragControls>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Dice.geometry}
        material={nodes.Dice.material}
        scale={[0.3, 0.3, 0.3]}
      />
    </DragControls>
  );
}
