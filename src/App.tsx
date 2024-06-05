import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { UI } from "./components/UI";
import { isStreamScreen } from "playroomkit";
import { Experience } from "./components/Experience";

export default function App() {
  const stream = isStreamScreen();
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas
        camera={{
          fov: 40,
          position: stream ? [25, 25, 25] : [0, 35, 0],
        }}
      >
        <Suspense>
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <UI />
    </div>
  );
}
