import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";

export function Walls() {
  const { viewport } = useThree();
  return (
    <RigidBody type="fixed">
      <CuboidCollider
        args={[viewport.width, 10, 0.5]}
        position={[0, 10, viewport.height]}
      />
      <CuboidCollider
        args={[viewport.width, 10, 0.5]}
        position={[0, 10, -viewport.height]}
      />
      <CuboidCollider
        args={[0.5, 10, viewport.height]}
        position={[viewport.width, 10, 0]}
      />
      <CuboidCollider
        args={[0.5, 10, viewport.height]}
        position={[-viewport.width, 10, 0]}
      />
    </RigidBody>
  );
}
