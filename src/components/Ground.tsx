import { CuboidCollider } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
export function Ground() {
  const { viewport } = useThree();
  return (
    <CuboidCollider
      args={[viewport.width / 2, 0.5, viewport.height / 2]}
      position={[0, -1, 0]}
    />
  );
}
