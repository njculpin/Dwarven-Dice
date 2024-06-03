import { RigidBody } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import { Wall } from "./Wall";

export function Box() {
  const { viewport } = useThree();
  const wallHeight = 25;
  return (
    <RigidBody type="fixed">
      <Wall
        width={viewport.width / 2}
        height={wallHeight}
        depth={1}
        x={0}
        y={25}
        z={viewport.height / 2}
      />
      <Wall
        width={viewport.width / 2}
        height={wallHeight}
        depth={1}
        x={0}
        y={25}
        z={-viewport.height / 2}
      />
      <Wall
        width={1}
        height={wallHeight}
        depth={viewport.height / 2}
        x={viewport.width / 2}
        y={25}
        z={0}
      />
      <Wall
        width={1}
        height={wallHeight}
        depth={viewport.height / 2}
        x={-viewport.width / 2}
        y={25}
        z={0}
      />
    </RigidBody>
  );
}
