import { Functions, SamplePrompt } from "../types/types";

export const deleteTodoSamples: SamplePrompt[] = [
  {
    prompt: "Delete a todo with the ID 101",
    response: `${Functions.deleteTodo}(id=101)`,
  },
  {
    prompt: "Remove the todo with the ID 101",
    response: `${Functions.deleteTodo}(id=101)`,
  },
];
