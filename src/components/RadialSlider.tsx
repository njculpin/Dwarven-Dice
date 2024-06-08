import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export function RadialSlider({
  trigger,
}: {
  trigger: (action: string) => void;
}) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, offset: [ox] }) => {
      if (ox > 30) {
        trigger("save");
      }
      if (ox < -30) {
        trigger("spend");
      }
      api.start({ x: ox, y: 0, immediate: down });
    },
    {
      bounds: { left: -50, right: 50, top: 0, bottom: 0 },
    }
  );
  return (
    <div className="flex flex-row justify-center items-center p-2 rounded-full">
      <animated.div {...bind()} style={{ x, y, touchAction: "pan-x" }}>
        <div className="border-red-500 border-2 w-16 h-16 rounded-full" />
      </animated.div>
    </div>
  );
}
