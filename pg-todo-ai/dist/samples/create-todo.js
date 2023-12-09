"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoSamples = void 0;
var types_1 = require("../types/types");
exports.createTodoSamples = [
    {
        prompt: "Create a todo with the title 'prepare dinner'",
        response: "".concat(types_1.Functions.createTodo, "(title=\"prepare dinner\")"),
    },
    {
        prompt: "Add a todo to pick up my friend from the airport",
        response: "".concat(types_1.Functions.createTodo, "(title=\"pick up my friend from the airport\")"),
    },
    {
        prompt: "Meet Mr. X at 5pm tomorrow",
        response: "".concat(types_1.Functions.createTodo, "(title=\"Meet Mr. X at 5pm tomorrow\")"),
    },
    {
        prompt: "Create a todo pay electricity bill and star the todo",
        response: "const id = ".concat(types_1.Functions.createTodo, "(title=\"pay electricity bill\"); ").concat(types_1.Functions.updateTodos, "(ids=[id], starred=true)"),
    },
];
