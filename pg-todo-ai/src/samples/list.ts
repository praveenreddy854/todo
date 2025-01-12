import { dueDateProp, idsProp, starProps, titleProp } from '../types/todo-props';
import { Functions, SamplePrompt } from '../types/types';
import { feedResponseToAnotherFunction } from './utils';

export const listTodoSamples: SamplePrompt[] = [
  {
    prompt: 'List all todos',
    response: `${Functions.listTodos}()`,
  },
  {
    prompt: 'Follow the give context of todo id and title to find the relevant ids for the given given todo title',
    response: `${Functions.listTodos}(${idsProp.name}=[101, 103])`,
  },
];
