"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = void 0;
var types_1 = require("../types/types");
var todo_props_1 = require("../types/todo-props");
exports.deleteTodo = {
    userQueryMatcher: "Delete the todo with ID 1",
    prompt: "Delete todo with ID 1",
    functions: [
        {
            functionName: types_1.Functions.deleteTodo,
            arguments: { id: todo_props_1.idProp },
        },
    ],
};
