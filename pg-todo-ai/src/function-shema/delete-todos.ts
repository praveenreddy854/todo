import { idsProp } from "../types/todo-props";
import { Functions, LlmInput } from "../types/types";

export const deleteTodos: LlmInput = {
  userQueryMatcher: "Delete the todos with IDs 1, 2, 3",
  prompt: "Delete todos with IDs 1, 2, 3",
  functions: [
    {
      functionName: Functions.deleteTodos,
      arguments: { ids: idsProp },
    },
  ],
};
