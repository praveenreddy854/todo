import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { UpdateToDoArgs } from "../types/types";

export const useUpdatesInterPreter = () => {
  const { updateTodos } = useContext(MainContext)!;
  return function (args?: string, enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (!args) {
      throw Error("Args can't be empty or null for ToDos update");
    }
    const updateTodosArray: UpdateToDoArgs[] = [];
    const updateArgs = JSON.parse(args);
    const ids = updateArgs.ids;
    const hidden = updateArgs.hidden;
    const title = updateArgs.title;
    const starred = updateArgs.starred;
    const completed = updateArgs.completed;

    ids.forEach((id: number) => {
      updateTodosArray.push({
        id: id,
        hidden: hidden,
        title: title,
        starred: starred,
        completed: completed,
      });
    });
    updateTodos(updateTodosArray);
  };
};

export const useUpdateInterPreter = () => {
  const { updateTodo } = useContext(MainContext)!;
  return function (args?: string, enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (!args) {
      throw Error("Args can't be empty or null for ToDo update");
    }

    const argsObj = JSON.parse(args);
    if (!argsObj.id || !argsObj.title) {
      throw Error("Args must contain id and title for ToDo update");
    }

    updateTodo(argsObj.id, argsObj.title);
  };
};
