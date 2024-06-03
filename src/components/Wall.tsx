import { CuboidCollider } from "@react-three/rapier";

export function Wall({
  height,
  width,
  depth,
  x,
  y,
  z,
}: {
  height: number;
  width: number;
  depth: number;
  x: number;
  y: number;
  z: number;
}) {
  return <CuboidCollider args={[width, height, depth]} position={[x, y, z]} />;
}
