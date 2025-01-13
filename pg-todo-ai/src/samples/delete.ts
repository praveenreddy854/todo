import { idsProp, titleProp } from '../types/todo-props';
import { Functions, SamplePrompt } from '../types/types';
import { feedResponseToAnotherFunction } from './utils';

export const deleteTodoSamples: SamplePrompt[] = [
  {
    prompt: 'Delete a todo with the ID 101',
    reasoning: 'User asked to delete a todo with the ID 101 so I need to use delete function with the given ID',
    response: `${Functions.deleteTodo}(${idsProp.name}=[101])`,
  },
  {
    prompt: 'Delete todos with the IDs 101, 102',
    reasoning: 'User asked to delete todos with the IDs 101, 102 so I need to use delete function with the given IDs',
    response: `${Functions.deleteTodo}(${idsProp.name}=[101, 102])`,
  },
  {
    prompt:
      'Delete todos with the title "pay electricity bill". Title can be vague sometimes so your job is to find the corresponding ids for the given title',
    reasoning:
      'User asked to delete todos with the title "pay electricity bill" so I need to find the ids first using list function and then use delete function with the ids',
    response: `const ids = ${Functions.listTodos}(${titleProp.name}="pay electricity bill"); ${Functions.deleteTodo}(${
      idsProp.name
    }=${feedResponseToAnotherFunction('[ids]')})`,
  },
];
