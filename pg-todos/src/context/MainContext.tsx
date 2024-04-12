import React from "react";
import { TodoType } from "../types";
import { createContext, useState, useEffect, ReactNode } from "react";
import { AddToDoArgs, UpdateToDoArgs } from "../types/types";

interface MainContextInterface {
  todos: TodoType[];
  setTodosChanged: React.Dispatch<React.SetStateAction<TodoType[]>>;
  markComplete: (id: number) => void;
  deleteTodos: (ids: number[]) => void;
  deleteAll: () => void;
  updateTodos: (args: UpdateToDoArgs[]) => void;
  addTodo: (args: AddToDoArgs) => number;
  moveTodo: (old: number, new_: number) => void;
  markStar: (id: number) => void;
  hideTodo: (id: number) => void;
}

interface Props {
  children: ReactNode;
}

export const MainContext = createContext<MainContextInterface | null>(null);

export const MainProvider = ({ children }: Props) => {
  let todosFromLocalStore = JSON.parse(
    localStorage.getItem("todos") || ""
  ) as TodoType[];

  const [todos, setTodos] = useState(todosFromLocalStore);

  const addTodo = (args: AddToDoArgs) => {
    const title = args.title.trim();
    if (title) {
      const newTodo = {
        id: Math.floor(Math.random() * 50000),
        title,
      };
      const orderTodos = [newTodo, ...todosFromLocalStore];
      updateLocalStorage(orderTodos);
      return newTodo.id;
    }
    return 0;
  };

  const updateTodos: (args: UpdateToDoArgs[]) => void = (
    args: UpdateToDoArgs[]
  ) => {
    if (args.length > 0) {
      updateLocalStorage(
        todosFromLocalStore.map((todo) => {
          const update = args.find((x) => x.id === todo.id);
          if (update) {
            todo.title = update.title ? update.title : todo.title;
            todo.completed =
              update.completed !== undefined
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

  const updateLocalStorage = (t: TodoType[]) => {
    localStorage.setItem("todos", JSON.stringify(t));
    todosFromLocalStore = t;
    setTodos(t);
  };
  const markComplete = (id: number) => {
    const orderTodos = todosFromLocalStore.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    updateLocalStorage(orderTodos);
  };

  const markStar = (id: number) => {
    const orderTodos = todosFromLocalStore.map((todo) => {
      if (todo.id === id) todo.starred = !todo.starred;
      return todo;
    });
    orderStarAndComplete(orderTodos);
    updateLocalStorage(orderTodos);
  };

  const hideTodo = (id: number) => {
    const orderTodos = todosFromLocalStore.map((todo) => {
      if (todo.id === id) todo.hidden = !todo.hidden;
      return todo;
    });
    updateLocalStorage(orderTodos);
  };

  const orderStarAndComplete = (todosInput: TodoType[]) => {
    todosInput.sort((x, y) => (y.starred as any) - (x.starred as any));
    todosInput.sort((x, y) => (x.completed as any) - (y.completed as any));
  };

  const deleteTodos = (ids: number[]) => {
    const filteredTodos = todosFromLocalStore.filter(
      (todo) => !ids.includes(todo.id)
    );
    updateLocalStorage(filteredTodos);
  };

  const deleteAll = () => updateLocalStorage([]);
  const moveTodo = (old: number, new_: number) => {
    const copy = JSON.parse(JSON.stringify(todosFromLocalStore));
    const thing = JSON.parse(JSON.stringify(todosFromLocalStore[old]));
    copy.splice(old, 1);
    copy.splice(new_, 0, thing);
    updateLocalStorage(copy);
  };

  const mainContextValue: MainContextInterface = {
    todos,
    setTodosChanged: setTodos,
    markComplete,
    deleteTodos,
    deleteAll,
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
