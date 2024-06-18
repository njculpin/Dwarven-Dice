import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export function RadialSlider({
  trigger,
}: {
  trigger: (action: string) => void;
}) {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ down, offset: [ox] }) => {
      if (down) {
        if (ox > 30) {
          trigger("commit");
        }
        if (ox < -30) {
          trigger("spend");
        }
      } else {
        if (ox < 30 || ox > -30) {
          ox = 0;
        }
      }
      api.start({ x: ox, immediate: down });
    },
    {
      bounds: { left: -100, right: 100, top: 0, bottom: 0 },
    }
  );

  return (
    <div className="flex flex-row justify-center items-center p-2 rounded-full">
      <animated.div {...bind()} style={{ x, touchAction: "none" }}>
        <div className="w-16 h-16 rounded-full" />
      </animated.div>
    </div>
  );
}
