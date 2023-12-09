import { Functions, LlmInput } from "../types/types";
import { titleProp } from "../types/todo-props";

export const createTodo: LlmInput = {
  userQueryMatcher: "Create a todo to",
  prompt: "Create a todo with the title 'prepare dinner'",
  functions: [
    {
      functionName: Functions.createTodo,
      arguments: { title: titleProp },
    },
  ],
};
