import { createTodoSamples } from "./create";
import { deleteTodoSamples } from "./delete";
import { Functions, SamplePrompt } from "../types/types";
import { updateTodoSamples } from "./update";

export const Samples: { [key: string]: SamplePrompt[] } = {
  [Functions.createTodo]: createTodoSamples,
  [Functions.deleteTodo]: deleteTodoSamples,
  [Functions.updateTodo]: updateTodoSamples,
};
