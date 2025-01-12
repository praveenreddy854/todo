// Copied from service, can be separated into its own package.
export enum Functions {
  createTodos = 'create',
  deleteTodos = 'deletes', // delete is a reserved keyword
  listTodos = 'list',
  updateTodos = 'update',
}

export interface AddToDoArgs {
  title: string;
  dueAt?: Date;
}

export interface UpdateToDoArgs {
  id: number;
  title?: string;
  starred?: boolean;
  completed?: boolean;
  hidden?: boolean;
  dueAt?: Date;
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
