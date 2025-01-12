import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

export const useListInterPreter = () => {
  const { listTodos } = useContext(MainContext)!;
  return function (ids: number[]) {
    if (!ids || ids?.length === 0) {
      throw Error("Args can't be null for ToDos update");
    }
    return listTodos(ids);
  };
};
