import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { AddToDoArgs } from "../types/types";

export const useAddInterPreter = () => {
  const { addTodo } = useContext(MainContext)!;
  return function (args?: string, enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (!args) {
      throw Error("Args can't be empty or null for ToDo creation");
    }

    addTodo(JSON.parse(args) as AddToDoArgs);
  };
};
