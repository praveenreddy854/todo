import { Functions, LlmInput } from "../types/types";
import { titleProp } from "../types/todo-props";

export const createTodo: LlmInput = {
  functions: [
    {
      functionName: Functions.createTodo,
      functionDescription: "Create a todo with the given title",
      arguments: [titleProp],
    },
  ],
};
