import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { UpdateToDoArgs } from "../types/types";

export const useUpdatesInterPreter = () => {
  const { updateTodos } = useContext(MainContext)!;
  return function (updatesArgs: UpdateToDoArgs[], enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (updatesArgs?.length === 0) {
      throw Error("Args can't be null for ToDos update");
    }
    const updateTodosArray: UpdateToDoArgs[] = [];

    updatesArgs.forEach((updateArgs) => {
      updateTodosArray.push({
        id: updateArgs.id,
        hidden: updateArgs.hidden,
        title: updateArgs.title,
        starred: updateArgs.starred,
        completed: updateArgs.completed,
      });
    });
    updateTodos(updateTodosArray);
  };
};
