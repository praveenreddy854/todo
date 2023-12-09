import { createTodoSamples } from "./create-todo";
import { deleteTodoSamples } from "./delete-todo";
import { deleteTodosSamples } from "./delete-todos";
import { Functions, SamplePrompt } from "../types/types";
import { updateTodosSamples } from "./update-todos";

export const Samples: { [key: string]: SamplePrompt[] } = {
  [Functions.createTodo]: createTodoSamples,
  [Functions.deleteTodo]: deleteTodoSamples,
  [Functions.deleteTodos]: deleteTodosSamples,
  [Functions.updateTodos]: updateTodosSamples,
};
