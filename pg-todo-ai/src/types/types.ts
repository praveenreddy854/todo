import { ChatCompletions, ChatMessage } from "@azure/openai";

export interface LlmInput {
  functions: FunctionSchema[];
}

export interface ChatCompletionsWithPrompt {
  completions: ChatCompletions;
  prompt: string;
}

export enum Functions {
  createTodo = "create",
  deleteTodo = "delete",
  listTodos = "list",
  updateTodo = "update",
}

export enum Actions {
  create = "create",
  delete = "delete",
  update = "update",
  list = "list",
  createUpdate = "create-update",
}

export const Roles = {
  User: "user",
  System : "system",
  Assistant: "assistant"
}

export interface FunctionSchema {
  functionName: Functions;
  functionDescription: string;
  arguments: ArgumentSchema[];
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
