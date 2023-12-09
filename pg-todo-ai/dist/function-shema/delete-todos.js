"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = void 0;
var todo_props_1 = require("../types/todo-props");
var types_1 = require("../types/types");
exports.deleteTodos = {
    userQueryMatcher: "Delete the todos with IDs 1, 2, 3",
    prompt: "Delete todos with IDs 1, 2, 3",
    functions: [
        {
            functionName: types_1.Functions.deleteTodos,
            arguments: { ids: todo_props_1.idsProp },
        },
    ],
};
