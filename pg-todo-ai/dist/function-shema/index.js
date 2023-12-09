"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnSchemas = void 0;
var create_todo_1 = require("./create-todo");
var delete_todo_1 = require("./delete-todo");
var delete_todos_1 = require("./delete-todos");
var update_todos_1 = require("./update-todos");
exports.FnSchemas = [create_todo_1.createTodo, delete_todo_1.deleteTodo, delete_todos_1.deleteTodos, update_todos_1.updateTodos];
