import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { DeleteToDoArgs, DeleteToDosArgs } from "../types/types";

export const useDeleteInterPreter = () => {
  const { deleteTodo } = useContext(MainContext)!;
  return function (args?: string, enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (!args) {
      throw Error("Args can't be empty or null for ToDo deletion");
    }

    const id = (JSON.parse(args) as DeleteToDoArgs).id;
    deleteTodo(id);
  };
};

export const useDeletesInterPreter = () => {
  const { deleteTodos } = useContext(MainContext)!;
  return function (args?: string, enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (!args) {
      throw Error("Args can't be empty or null for ToDos deletion");
    }

    const ids = (JSON.parse(args) as DeleteToDosArgs).ids;
    deleteTodos(ids);
  };
};
