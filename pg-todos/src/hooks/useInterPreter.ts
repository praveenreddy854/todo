import { ChatChoice } from "@azure/openai";
import { Functions } from "../types/types";
import { useAddInterPreter } from "./useAddInterPreter";
import {
  useDeleteInterPreter,
  useDeletesInterPreter,
} from "./useDeleteInterPreter";
import {
  useUpdatesInterPreter,
  useUpdateInterPreter,
} from "./useUpdateInterPreter";

export const useInterPreter = () => {
  // Execute create ToDo interpreter only if the LLM response returned create_todo fn
  const addTodo = useAddInterPreter();
  const deleteTodo = useDeleteInterPreter();
  const deleteTodos = useDeletesInterPreter();
  const updateTodos = useUpdatesInterPreter();
  const updateTodo = useUpdateInterPreter();
  return function (response?: ChatChoice) {
    if (response?.finishReason && response?.finishReason !== "function_call") {
      throw Error("Not an open ai function call");
    }
    const fn = response?.message?.functionCall;
    addTodo(fn?.arguments, fn?.name === Functions.createTodo);
    deleteTodo(fn?.arguments, fn?.name === Functions.deleteTodo);
    deleteTodos(fn?.arguments, fn?.name === Functions.deleteTodos);
    updateTodos(fn?.arguments, fn?.name === Functions.updateTodos);
    updateTodo(fn?.arguments, fn?.name === Functions.updateTodo);
  };
};
