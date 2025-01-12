import { dueDateProp, idsProp, starProps, titleProp } from '../types/todo-props';
import { Functions, SamplePrompt } from '../types/types';
import { feedResponseToAnotherFunction } from './utils';

export const createTodoSamples: SamplePrompt[] = [
  {
    prompt: "Create a todo with the title 'prepare dinner'",
    response: `${Functions.createTodo}(${titleProp.name}='prepare dinner')`,
  },
  {
    prompt: 'Pay electricity bill and star the todo',
    response: `const id = ${Functions.createTodo}(${titleProp.name}='pay electricity bill'); ${Functions.updateTodo}(${
      idsProp.name
    }=${feedResponseToAnotherFunction('[id]')}, ${starProps.name}=true)`,
  },
  {
    prompt: "Create two todos with the titles 'prepare dinner' and 'pay electricity bill' and star them both",
    response: `const id1 = ${Functions.createTodo}(${titleProp.name}='prepare dinner'); const id2 = ${
      Functions.createTodo
    }(${titleProp.name}='pay electricity bill'); ${Functions.updateTodo}(${
      idsProp.name
    }=${feedResponseToAnotherFunction('[id1, id2]')}, ${starProps.name}=true)`,
  },
  {
    prompt: 'Play tennis at 9 PM',
    response: `${Functions.createTodo}(${titleProp.name}='Play tennis', ${dueDateProp.name}='${new Date()
      .toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .reverse()
      .join('-')}T21:00:00.000')`,
  },
  {
    prompt: 'Goto library at 10 AM every Monday',
    response: [0, 9]
      .map(
        (i) => `${Functions.createTodo}(${titleProp.name}='Goto library', ${dueDateProp.name}='${(() => {
          const today = new Date();
          const nextMonday = new Date();
          nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
          return nextMonday.toLocaleDateString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        })()
          .split('/')
          .reverse()
          .join('-')}T22:00:00.000');
      
      `
      )
      .join(' '),
  },
];
