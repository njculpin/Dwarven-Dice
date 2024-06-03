import { CuboidCollider } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
export function Ground() {
  const { viewport } = useThree();
  return (
    <CuboidCollider
      args={[viewport.width, 0.5, viewport.height]}
      position={[0, -1, 0]}
    />
  );
}
