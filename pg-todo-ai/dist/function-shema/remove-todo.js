"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodos = exports.removeTodo = void 0;
var types_1 = require("../types/types");
var todo_props_1 = require("../types/todo-props");
exports.removeTodo = {
    userQueryMatcher: "Remove the todo with ID 1",
    prompt: "Remove todo with ID 1",
    functions: [
        {
            functionName: types_1.Functions.deleteTodo,
            arguments: { id: todo_props_1.idProp },
        },
    ],
};
exports.removeTodos = {
    userQueryMatcher: "Remove the todos with IDs 1, 2, 3",
    prompt: "Remove todos with IDs 1, 2, 3",
    functions: [
        {
            functionName: types_1.Functions.deleteTodos,
            arguments: { ids: todo_props_1.idsProp },
        },
    ],
};
