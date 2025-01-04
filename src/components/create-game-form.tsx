import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGameStore } from "@/store/use-game-store";

export function CreateGameForm() {
  const form = useForm();
  const { createRoom, gameCode } = useGameStore();

  async function onSubmit() {
    const code = await createRoom();
    if (!code) {
      return;
    }
  }

  return (
    <>
      {gameCode ? (
        <div className="text-white flex-col justify-center">
          <p>Room Code:</p>
          <h1 className="text-4xl text-white font-bold">{gameCode}</h1>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Button
              className="text-3xl py-8 px-16 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              size="lg"
              type="submit"
            >
              Create Game
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
