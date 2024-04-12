import { hiddenProp, idsProp } from "../types/todo-props";
import { Functions, SamplePrompt } from "../types/types";

export const updateTodoSamples: SamplePrompt[] = [
  {
    response: `${Functions.updateTodo}(${idsProp.name}=[101, 102], ${hiddenProp.name}=false)`,
    prompt: "Show hidden todos with the IDs 101, 102",
  },
  {
    prompt: "Unhide hidden  todos with the IDs 101, 102, 103",
    response: `${Functions.updateTodo}(${idsProp.name}=[101, 102, 103], ${hiddenProp.name}=false)`,
  },
];
