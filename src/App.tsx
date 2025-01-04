import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { CreateGameForm } from "./components/create-game-form";
import { JoinGameForm } from "./components/join-game-form";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex justify-center items-center">
        <div className="mt-16 h-full w-1/2 justify-center items-center flex flex-col">
          <div className="hidden presentation:block w-full flex-col space-y-8">
            <h1 className="w-full text-8xl text-center font-bold">
              Dwarven Dice
            </h1>
            <CreateGameForm />
          </div>
          <div className="my-6">
            <Separator orientation="horizontal" />
          </div>
          <div className="hidden presentation:block w-full justify-center items-center space-y-8">
            <JoinGameForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
