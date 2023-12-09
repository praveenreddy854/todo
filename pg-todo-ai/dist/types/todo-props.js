"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hiddenProp = exports.idsProp = exports.idProp = exports.titleProp = void 0;
exports.titleProp = {
    type: "string",
    description: "The title of the todo",
    name: "title",
    required: true,
};
exports.idProp = {
    type: "number",
    description: "The id of the todo",
    name: "id",
    required: true,
};
exports.idsProp = {
    type: "array",
    items: { type: "number" },
    description: "The ids of the todos",
    name: "ids",
    required: true,
};
exports.hiddenProp = {
    type: "boolean",
    description: "Whether the todo is hidden",
    name: "hidden",
    required: false,
};
