"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Samples = void 0;
var create_todo_1 = require("./create-todo");
var delete_todo_1 = require("./delete-todo");
var delete_todos_1 = require("./delete-todos");
var types_1 = require("../types/types");
var update_todos_1 = require("./update-todos");
exports.Samples = (_a = {},
    _a[types_1.Functions.createTodo] = create_todo_1.createTodoSamples,
    _a[types_1.Functions.deleteTodo] = delete_todo_1.deleteTodoSamples,
    _a[types_1.Functions.deleteTodos] = delete_todos_1.deleteTodosSamples,
    _a[types_1.Functions.updateTodos] = update_todos_1.updateTodosSamples,
    _a);
