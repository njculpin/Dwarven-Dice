import { useState, useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { RoundedBox, Html } from "@react-three/drei";

export function RollButton({
  rolls,
  setRoll,
}: {
  rolls: number;
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
    setRoll();
    setClicked(true);
  }

  return (
    <group>
      <group ref={ref}>
        <RigidBody
          type="fixed"
          name="origin"
          collisionGroups={interactionGroups(0, [0, 1])}
          mass={1000}
        >
          <RoundedBox
            onPointerDown={() => handleClick()}
            args={[2, 2, 2]}
            radius={0.3}
            smoothness={4}
            bevelSegments={4}
            creaseAngle={0.4}
          >
            <meshStandardMaterial color="gray" />
            <Html
              className="pointer-events-none"
              scale={1}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 1, 0]}
              transform
            >
              <div className="annotation pointer-events-none font-bold">
                {rolls} Rolls
              </div>
            </Html>
          </RoundedBox>
        </RigidBody>
      </group>
    </group>
  );
}
