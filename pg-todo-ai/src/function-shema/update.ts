import {
  idsProp,
  hiddenProp,
  starProps,
  completedProp,
} from "../types/todo-props";
import { Functions, LlmInput } from "../types/types";

export const updateTodo: LlmInput = {
  functions: [
    {
      functionName: Functions.updateTodo,
      functionDescription: "Update the todos with the given IDs",
      arguments: [idsProp, hiddenProp, starProps, completedProp],
    },
  ],
};
