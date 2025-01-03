// import { Canvas } from "@react-three/fiber";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import "./App.css";
import { CreateGameForm } from "./components/create-game-form";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full flex justify-between">
        <ModeToggle />
      </div>
      <div>
        <CreateGameForm />
      </div>
      {/* <Canvas
        camera={{
          fov: 40,
          position: [25, 25, 25],
        }}
      >
        <Suspense></Suspense>
      </Canvas> */}
    </ThemeProvider>
  );
}

export default App;
