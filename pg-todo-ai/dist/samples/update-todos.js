"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodosSamples = void 0;
var types_1 = require("../types/types");
exports.updateTodosSamples = [
    {
        prompt: "Show hidden todos with the IDs 101, 102",
        response: "".concat(types_1.Functions.updateTodos, "(ids=[101, 102], hidden=false)"),
    },
    {
        prompt: "Unhide hidden  todos with the IDs 101, 102, 103",
        response: "".concat(types_1.Functions.updateTodos, "(id=[101, 102, 103], hidden=false)"),
    },
];
