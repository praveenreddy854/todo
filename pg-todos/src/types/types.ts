// Copied from service, can be separated into its own package.
export enum Functions {
  createTodo = "create_todo",
  deleteTodo = "delete_todo",
  deleteTodos = "delete_todos",
  listTodos = "list_todos",
  updateTodo = "update_todo",
  updateTodos = "update_todos",
}

export interface AddToDoArgs {
  title: string;
  starred?: boolean;
  completed?: boolean;
  hidden?: boolean;
}

export interface UpdateToDoArgs {
  id: number;
  title?: string;
  starred?: boolean;
  completed?: boolean;
  hidden?: boolean;
}

export interface ShowHiddenTodosArgs {
  ids: number[];
}

export interface DeleteToDoArgs {
  id: number;
}

export interface DeleteToDosArgs {
  ids: number[];
}
