// Copied from service, can be separated into its own package.
export enum Functions {
  createTodos = "create",
  deleteTodos = "delete",
  listTodos = "list",
  updateTodos = "update",
}

export interface AddToDoArgs {
  title: string;
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
