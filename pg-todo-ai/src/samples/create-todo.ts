import { Functions, SamplePrompt } from "../types/types";

export const createTodoSamples: SamplePrompt[] = [
  {
    prompt: "Create a todo with the title 'prepare dinner'",
    response: `${Functions.createTodo}(title="prepare dinner")`,
  },
  {
    prompt: "Add a todo to pick up my friend from the airport",
    response: `${Functions.createTodo}(title="pick up my friend from the airport")`,
  },
  {
    prompt: "Meet Mr. X at 5pm tomorrow",
    response: `${Functions.createTodo}(title="Meet Mr. X at 5pm tomorrow")`,
  },
  {
    prompt: "Create a todo pay electricity bill and star the todo",
    response: `const id = ${Functions.createTodo}(title="pay electricity bill"); ${Functions.updateTodos}(ids=[id], starred=true)`,
  },
];
