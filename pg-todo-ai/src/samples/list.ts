import { idsProp, titleProp } from '../types/todo-props';
import { Functions, SamplePrompt } from '../types/types';

export const listTodoSamples: SamplePrompt[] = [
  {
    prompt: 'List all todos',
    reasoning: 'User asked to list all todos so I need to use list function without any arguments',
    response: `${Functions.listTodos}()`,
  },
  {
    prompt: 'List todos with the ID 101 and 103',
    reasoning: 'User asked to list todos with the IDs 101 and 103 so I need to use list function with the given IDs',
    response: `${Functions.listTodos}(${idsProp.name}=[101, 103])`,
  },
  {
    prompt: 'List todos with the title "pay electricity bill"',
    reasoning:
      'User asked to list todos with the title "pay electricity bill" so I need to use list function with the given title',
    response: `${Functions.listTodos}(${titleProp.name}='pay electricity bill')`,
  },
];
