import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export function RadialSlider({ open, face }: { open: boolean; face: string }) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, offset: [ox] }) => api.start({ x: ox, y: 0, immediate: down }),
    {
      bounds: { left: -100, right: 100, top: 0, bottom: 0 },
    }
  );
  if (!open) {
    return <></>;
  }
  return (
    <div className="bg-blue-500 flex flex-row justify-center items-center p-2">
      <div className="bg-green-500 h-6 w-6 rounded-full">s</div>
      <animated.div {...bind()} style={{ x, y, touchAction: "pan-x" }}>
        <div className="bg-red-500 w-16 h-16 rounded-full" />
      </animated.div>
      <div className="bg-green-500 h-6 w-6 rounded-full">s</div>
    </div>
  );
}
