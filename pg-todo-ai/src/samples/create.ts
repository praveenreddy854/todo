import { dueDateProp, idsProp, starProps, titleProp } from '../types/todo-props';
import { Functions, SamplePrompt } from '../types/types';
import { feedResponseToAnotherFunction } from './utils';

export const createTodoSamples: SamplePrompt[] = [
  {
    prompt: "Create a todo with the title 'prepare dinner'",
    reasoning: 'User asked to create a todo with the title "prepare dinner"',
    response: `${Functions.createTodo}(${titleProp.name}='prepare dinner')`,
  },
  {
    prompt: 'Pay electricity bill and star the todo',
    reasoning:
      'User asked to create a todo with the title "pay electricity bill" and star it so I need to use create function with title and and use update function to star it',
    response: `const id = ${Functions.createTodo}(${titleProp.name}='pay electricity bill'); ${Functions.updateTodo}(${
      idsProp.name
    }=${feedResponseToAnotherFunction('[id]')}, ${starProps.name}=true)`,
  },
  {
    prompt: "Create two todos with the titles 'prepare dinner' and 'pay electricity bill' and star them both",
    reasoning:
      'User asked to create two todos with the titles "prepare dinner" and "pay electricity bill" and star them both so I need to use create function with given title back to back twice and use update function to star them',
    response: `const id1 = ${Functions.createTodo}(${titleProp.name}='prepare dinner'); const id2 = ${
      Functions.createTodo
    }(${titleProp.name}='pay electricity bill'); ${Functions.updateTodo}(${
      idsProp.name
    }=${feedResponseToAnotherFunction('[id1, id2]')}, ${starProps.name}=true)`,
  },
  {
    prompt: 'Play tennis at 9 PM',
    reasoning:
      'User asked to create a todo with the title "Play tennis" and due date at 9 PM. So I need to use create function with title and due date. Since only time is given I will set the date to today and time to 9 PM',
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
    reasoning:
      'User asked to create a todo with the title "Goto library" and due date every Monday at 10 AM. So I need to use create function with title and due date. Since a relative date "every monday" is given so I need to find the next Monday date and set the time to 10 AM. User mentioned every Monday but did not mention how many todos to be created so defaulting to maximum of 10 todos',
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
