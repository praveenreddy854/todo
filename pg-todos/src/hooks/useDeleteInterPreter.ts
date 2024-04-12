import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { DeleteToDosArgs } from "../types/types";

export const useDeletesInterPreter = () => {
  const { deleteTodos } = useContext(MainContext)!;
  return function (args?: DeleteToDosArgs, enabled: boolean = true) {
    if (!enabled) {
      return;
    }
    if (!args) {
      throw Error("Args can't be empty or null for ToDos deletion");
    }
    deleteTodos(args.ids);
  };
};
