import { ChatMessage } from "@azure/openai";

export interface LlmInput {
  userQueryMatcher: string;
  prompt: string;
  functions: FunctionSchema[];
}

export enum Functions {
  createTodo = "create_todo",
  deleteTodo = "delete_todo",
  deleteTodos = "delete_todos",
  listTodos = "list_todos",
  updateTodo = "update_todo",
  updateTodos = "update_todos",
}

export interface FunctionSchema {
  functionName: Functions;
  arguments: Record<string, ArgumentSchema>;
}

export interface ArgumentSchema {
  name: string;
  type: string;
  description: string;
  required: boolean;
  items?: object;
}

export interface SamplePrompt {
  prompt: string;
  response: string;
}
