import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGameStore } from "@/lib/store";

export function CreateGameForm() {
  const form = useForm();
  const { createRoom, currentRoom } = useGameStore();

  async function onSubmit() {
    const code = await createRoom();
    if (!code) {
      return;
    }
  }

  return (
    <div>
      {currentRoom ? (
        <div className="text-white flex-col justify-center">
          <p>Room Code:</p>
          <h1 className="text-4xl text-white font-bold">{currentRoom}</h1>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
