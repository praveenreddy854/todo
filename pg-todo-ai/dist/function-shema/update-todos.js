"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodos = void 0;
var todo_props_1 = require("../types/todo-props");
var types_1 = require("../types/types");
exports.updateTodos = {
    userQueryMatcher: "Show the hidden todos with IDs 1, 2, 3",
    prompt: "Show the hidden todos with IDs 1, 2, 3",
    functions: [
        {
            functionName: types_1.Functions.updateTodos,
            arguments: { ids: todo_props_1.idsProp, hidden: todo_props_1.hiddenProp },
        },
    ],
};
