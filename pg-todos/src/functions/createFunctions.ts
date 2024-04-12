export const createFunctions = (props: Record<string, unknown>, addTodo: Function) => {
  Object.keys(props).forEach((key) => {
    if (key === "title") {
      return addTodo({ title: props[key] as string });
    }
  });
}