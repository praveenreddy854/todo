"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodosSamples = void 0;
var types_1 = require("../types/types");
exports.deleteTodosSamples = [
    {
        prompt: "Delete todos with the IDs 101, 102",
        response: "".concat(types_1.Functions.deleteTodos, "(ids=[101, 102])"),
    },
    {
        prompt: "Remove todos with the IDs 101, 102, 103",
        response: "".concat(types_1.Functions.deleteTodos, "(id=[101, 102, 103])"),
    },
];
