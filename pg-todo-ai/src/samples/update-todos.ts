import { Functions, SamplePrompt } from "../types/types";

export const updateTodosSamples: SamplePrompt[] = [
  {
    prompt: "Show hidden todos with the IDs 101, 102",
    response: `${Functions.updateTodos}(ids=[101, 102], hidden=false)`,
  },
  {
    prompt: "Unhide hidden  todos with the IDs 101, 102, 103",
    response: `${Functions.updateTodos}(id=[101, 102, 103], hidden=false)`,
  },
];
