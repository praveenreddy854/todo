import { ArgumentSchema } from "./types";

export const titleProp: ArgumentSchema = {
  type: "string",
  description: "The title of the todo",
  name: "title",
  required: true,
};

export const idProp: ArgumentSchema = {
  type: "number",
  description: "The id of the todo",
  name: "id",
  required: true,
};

export const idsProp: ArgumentSchema = {
  type: "array",
  items: { type: "number" },
  description: "The ids of the todos",
  name: "ids",
  required: true,
};

export const hiddenProp: ArgumentSchema = {
  type: "boolean",
  description: "Whether the todo is hidden",
  name: "hidden",
  required: false,
};
