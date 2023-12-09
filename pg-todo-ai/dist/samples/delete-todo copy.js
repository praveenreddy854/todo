"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoSamples = void 0;
var types_1 = require("../types/types");
exports.deleteTodoSamples = [
    {
        prompt: "Delete a todo with the ID 101",
        response: "".concat(types_1.Functions.deleteTodo, "(id=101)"),
    },
    {
        prompt: "Remove the todo with the ID 101",
        response: "".concat(types_1.Functions.deleteTodo, "(id=101)"),
    },
];
