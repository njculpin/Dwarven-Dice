import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export function RadialSlider({
  trigger,
}: {
  trigger: (action: string) => void;
}) {
  const [{ x }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, offset: [ox] }) => {
      if (down) {
        if (ox > 30) {
          return trigger("save");
        }
        if (ox < -30) {
          return trigger("spend");
        }
      } else {
        if (ox < 30 || ox > -30) {
          ox = 0;
        }
      }
      api.start({ x: ox, y: 0, immediate: down });
    },
    {
      bounds: { left: -50, right: 50, top: 0, bottom: 0 },
    }
  );

  return (
    <div className="flex flex-row justify-center items-center p-2 rounded-full">
      <animated.div {...bind()} style={{ x, touchAction: "pan-x" }}>
        <div className="w-32 h-32 rounded-full" />
      </animated.div>
    </div>
  );
}
