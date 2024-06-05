import { Billboard, Text } from "@react-three/drei";

export function PlayerInfo({
  gems,
  name,
  color,
}: {
  gems: number;
  name: string;
  color: string;
}) {
  return (
    <Billboard position-y={2.5}>
      <Text position-y={0.36} fontSize={0.4}>
        {name}
        <meshBasicMaterial color={color} />
      </Text>
      <mesh position-z={-0.1}>
        <planeGeometry args={[1, 0.2]} />
        <meshBasicMaterial color="black" transparent opacity={0.5} />
      </mesh>
      <mesh scale-x={gems / 100} position-x={-0.5 * (1 - gems / 100)}>
        <planeGeometry args={[1, 0.2]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </Billboard>
  );
}
