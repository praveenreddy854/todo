import { idsProp, starProps, titleProp } from "../types/todo-props";
import { Functions, SamplePrompt } from "../types/types";
import { feedResponseToAnotherFunction } from "./utils";

export const createTodoSamples: SamplePrompt[] = [
  {
    prompt: "Create a todo with the title 'prepare dinner'",
    response: `${Functions.createTodo}(${titleProp.name}="prepare dinner")`,
  },
  {
    prompt: "Create a todo to pay electricity bill and star the todo",
    response: `const id = ${Functions.createTodo}(${titleProp.name}="pay electricity bill"); ${Functions.updateTodo}(${idsProp.name}=${feedResponseToAnotherFunction('[id]')}, ${starProps.name}=true)`,
  },
  {
    prompt: "Create two todos with the titles 'prepare dinner' and 'pay electricity bill' and star them both",
    response: `const id1 = ${Functions.createTodo}(${titleProp.name}="prepare dinner"); const id2 = ${Functions.createTodo}(${titleProp.name}="pay electricity bill"); ${Functions.updateTodo}(${idsProp.name}=${feedResponseToAnotherFunction('[id1, id2]')}, ${starProps.name}=true)`,
  }
];
