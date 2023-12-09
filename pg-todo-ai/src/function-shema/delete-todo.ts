import { Functions, LlmInput } from "../types/types";
import { idProp, idsProp } from "../types/todo-props";

export const deleteTodo: LlmInput = {
  userQueryMatcher: "Delete the todo with ID 1",
  prompt: "Delete todo with ID 1",
  functions: [
    {
      functionName: Functions.deleteTodo,
      arguments: { id: idProp },
    },
  ],
};
