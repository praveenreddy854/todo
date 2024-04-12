import { idsProp } from "../types/todo-props";
import { Functions, LlmInput } from "../types/types";

export const deleteTodo: LlmInput = {
  functions: [
    {
      functionName: Functions.deleteTodo,
      functionDescription: "Delete todos with the given IDs",
      arguments: [idsProp],
    },
  ],
};
