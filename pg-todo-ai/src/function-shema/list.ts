import { Functions, LlmInput } from '../types/types';
import { idsProp } from '../types/todo-props';

export const listTodos: LlmInput = {
  functions: [
    {
      functionName: Functions.listTodos,
      functionDescription: 'List all todos',
      arguments: [],
    },
    {
      functionName: Functions.listTodos,
      functionDescription: 'List all todos with the given ids',
      arguments: [idsProp],
    },
  ],
};
