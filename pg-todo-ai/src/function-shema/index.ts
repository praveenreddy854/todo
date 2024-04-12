import { createTodo } from "./create";
import { deleteTodo } from "./delete";
import { updateTodo } from "./update";

export const FnSchemas = {
  create: createTodo,
  delete: deleteTodo,
  update: updateTodo,
};
