import { hiddenProp, idsProp } from '../types/todo-props';
import { Functions, SamplePrompt } from '../types/types';

export const updateTodoSamples: SamplePrompt[] = [
  {
    response: `${Functions.updateTodo}(${idsProp.name}=[101, 102], ${hiddenProp.name}=false)`,
    reasoning:
      'User asked to unhide hidden todos with the IDs 101, 102 so I need to use update function with the given IDs and hidden property set to false',
    prompt: 'Show hidden todos with the IDs 101, 102',
  },
  {
    prompt: 'Unhide hidden  todos with the IDs 101, 102, 103',
    reasoning:
      'User asked to unhide hidden todos with the IDs 101, 102, 103 so I need to use update function with the given IDs and hidden property set to false',
    response: `${Functions.updateTodo}(${idsProp.name}=[101, 102, 103], ${hiddenProp.name}=false)`,
  },
];
