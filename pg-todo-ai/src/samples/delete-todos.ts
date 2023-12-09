import { Functions, SamplePrompt } from "../types/types";

export const deleteTodosSamples: SamplePrompt[] = [
  {
    prompt: "Delete todos with the IDs 101, 102",
    response: `${Functions.deleteTodos}(ids=[101, 102])`,
  },
  {
    prompt: "Remove todos with the IDs 101, 102, 103",
    response: `${Functions.deleteTodos}(id=[101, 102, 103])`,
  },
];
