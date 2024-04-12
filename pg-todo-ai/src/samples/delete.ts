import { idsProp } from "../types/todo-props";
import { Functions, SamplePrompt } from "../types/types";

export const deleteTodoSamples: SamplePrompt[] = [
  {
    prompt: "Delete a todo with the ID 101",
    response: `${Functions.deleteTodo}(${idsProp.name}=[101])`,
  },
  {
    prompt: "Delete todos with the IDs 101, 102",
    response: `${Functions.deleteTodo}(${idsProp.name}=[101, 102])`,
  },
];
