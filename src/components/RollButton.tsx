import { useState, useRef } from "react";
import { Vector3, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";

export function RollButton({
  position,
  setRoll,
}: {
  position: Vector3;
  setRoll: () => void;
}) {
  const ref = useRef<Group>(null);
  const [clicked, setClicked] = useState(false);

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

  function handleClick() {
    console.log("roll hit");
    setRoll();
    setClicked(true);
  }

  return (
    <group>
      <group position={position} ref={ref}>
        <RigidBody
          type="fixed"
          name="origin"
          collisionGroups={interactionGroups(0, [0, 1])}
          mass={1000}
        >
          <RoundedBox
            onPointerDown={() => handleClick()}
            args={[1, 1, 1]}
            radius={0.05}
            smoothness={4}
            bevelSegments={4}
            creaseAngle={0.4}
          >
            <meshStandardMaterial color="gray" />
          </RoundedBox>
        </RigidBody>
      </group>
    </group>
  );
}
