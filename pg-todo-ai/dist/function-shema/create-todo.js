"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = void 0;
var types_1 = require("../types/types");
var todo_props_1 = require("../types/todo-props");
exports.createTodo = {
    userQueryMatcher: "Create a todo to",
    prompt: "Create a todo with the title 'prepare dinner'",
    functions: [
        {
            functionName: types_1.Functions.createTodo,
            arguments: { title: todo_props_1.titleProp },
        },
    ],
};
