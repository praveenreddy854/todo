import { idsProp, hiddenProp } from "../types/todo-props";
import { Functions, LlmInput } from "../types/types";

export const updateTodos: LlmInput = {
  userQueryMatcher: "Show the hidden todos with IDs 1, 2, 3",
  prompt: "Show the hidden todos with IDs 1, 2, 3",
  functions: [
    {
      functionName: Functions.updateTodos,
      arguments: { ids: idsProp, hidden: hiddenProp },
    },
  ],
};
