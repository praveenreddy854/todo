import { TodoType } from "../types";
import { createContext, useState, useEffect, ReactNode } from "react";
import { AddToDoArgs, UpdateToDoArgs } from "../types/types";

interface MainContextInterface {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  markComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  deleteTodos: (ids: number[]) => void;
  deleteAll: () => void;
  updateTodo: (id: number, text: string) => void;
  updateTodos: (args: UpdateToDoArgs[]) => void;
  addTodo: (args: AddToDoArgs) => void;
  moveTodo: (old: number, new_: number) => void;
  markStar: (id: number) => void;
  hideTodo: (id: number) => void;
}

interface Props {
  children: ReactNode;
}

export const MainContext = createContext<MainContextInterface | null>(null);

export const MainProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (args: AddToDoArgs) => {
    const title = args.title.trim();
    if (title) {
      const newTodo = {
        id: Math.floor(Math.random() * 50000),
        title,
        completed: args.completed,
        starred: args.starred,
        hidden: args.hidden,
      };
      const orderTodos = [newTodo, ...todos];
      orderStarAndComplete(orderTodos);
      setTodos(orderTodos);
    }
  };
  const updateTodo: (id: number, text: string) => void = (
    id: number,
    text: string
  ) => {
    if (!(text === null) && text.trim()) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) todo.title = text;
          return todo;
        })
      );
    }
  };

  const updateTodos: (args: UpdateToDoArgs[]) => void = (
    args: UpdateToDoArgs[]
  ) => {
    if (args.length > 0) {
      setTodos(
        todos.map((todo) => {
          const update = args.find((x) => x.id === todo.id);
          if (update) {
            todo.title = update.title ? update.title : todo.title;
            todo.completed = update.completed
              ? update.completed
              : todo.completed;
            todo.starred =
              update.starred !== undefined ? update.starred : todo.starred;
            todo.hidden =
              update.hidden !== undefined ? update.hidden : todo.hidden;
          }
          return todo;
        })
      );
    }
  };

  const markComplete = (id: number) => {
    const orderTodos = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    setTodos(orderTodos);
  };

  const markStar = (id: number) => {
    const orderTodos = todos.map((todo) => {
      if (todo.id === id) todo.starred = !todo.starred;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    setTodos(orderTodos);
  };

  const hideTodo = (id: number) => {
    const orderTodos = todos.map((todo) => {
      if (todo.id === id) todo.hidden = !todo.hidden;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    setTodos(orderTodos);
  };

  const orderStarAndComplete = (todos: TodoType[]) => {
    todos.sort((x, y) => (y.starred as any) - (x.starred as any));
    todos.sort((x, y) => (x.completed as any) - (y.completed as any));
  };

  const deleteTodo = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const deleteTodos = (ids: number[]) =>
    setTodos(todos.filter((todo) => !ids.includes(todo.id)));

  const deleteAll = () => setTodos([]);
  const moveTodo = (old: number, new_: number) => {
    const copy = JSON.parse(JSON.stringify(todos));
    const thing = JSON.parse(JSON.stringify(todos[old]));
    copy.splice(old, 1);
    copy.splice(new_, 0, thing);
    setTodos(copy);
  };

  const mainContextValue: MainContextInterface = {
    todos,
    setTodos,
    markComplete,
    deleteTodo,
    deleteTodos,
    deleteAll,
    updateTodo,
    updateTodos,
    addTodo,
    moveTodo,
    markStar,
    hideTodo,
  };

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};
