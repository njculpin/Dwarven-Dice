import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useGameStore } from "@/store/use-game-store";

const formSchema = z.object({
  display_name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  game_code: z.string().min(5, {
    message: "Name must be 5 characters",
  }),
});

export function JoinGameForm() {
  const { joinRoom } = useGameStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: "",
      game_code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await joinRoom(values.display_name, values.game_code);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Cool Kid" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="game_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Code</FormLabel>
                <FormControl>
                  <Input placeholder="GAME CODE" {...field} />
                </FormControl>
                <FormDescription>
                  This is the code for your game
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="text-3xl py-8 px-16 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            size="lg"
            type="submit"
          >
            Join Game
          </Button>
        </form>
      </Form>
    </>
  );
}
