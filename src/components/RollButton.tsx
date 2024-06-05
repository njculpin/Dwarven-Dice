import { useState, useRef } from "react";
import { Vector3, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, interactionGroups } from "@react-three/rapier";

export function RollButton({ position }: { position: Vector3 }) {
  const ref = useRef<Group>(null);
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
  }

  useFrame((_, delta) => {
    if (ref.current && clicked) {
      ref.current.position.y -= 20 * delta;
      if (ref.current.position.y <= 0) {
        ref.current.position.y = 0;
        setClicked(false);
      }
    }
    if (ref.current && !clicked) {
      ref.current.position.y = 1;
    }
  });

  return (
    <group position={position} ref={ref}>
      <RigidBody
        type="fixed"
        name="origin"
        collisionGroups={interactionGroups(0, [0, 1])}
        mass={1000}
      >
        <mesh onPointerDown={() => handleClick()}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </group>
  );
}
