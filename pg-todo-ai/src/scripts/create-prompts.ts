import { ChatMessage } from "@azure/openai";
import { intro } from "../samples/intro";
import { LlmRawInput } from "../llm";
import { FnSchemas } from "../function-shema";
import fs from "fs";
import { Samples } from "../samples";

export const createPrompts = () => {
  Object.entries(FnSchemas).forEach(([fnSchemaKey, fnSchemaVal]) => {
    const parameters = {
      type: "object",
      properties: {},
      required: [],
    };

    let introPrompt = "system:" + intro;

    const samples = fnSchemaVal.functions.map(
      (fn) => "\n" + JSON.stringify(Samples[fn.functionName])
    );
    introPrompt += samples.join("\n");

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: introPrompt,
      },
    ];

    const rawInput: LlmRawInput = {
      messages,
      functions: fnSchemaVal.functions.map((fn) => ({
        name: fn.functionName,
        description: "",
        // open ai parameters
        parameters: {
          type: "object",
          properties: (function () {
            const properties: Record<string, any> = {};
            Object.entries(fn.arguments).forEach(([key, value]) => {
              properties[key] = {
                type: value.type,
                description: value.description,
                items: value.items,
              };
            });
            return properties;
          })(),
          required: (function () {
            const required: string[] = [];
            fn.arguments.forEach((arg) => {
              if (arg.required) {
                required.push(arg.name);
              }
            });
            return required;
          })(),
        },
      })),
    };
    const fileName = fnSchemaKey;
    const dir = "./dist/samples/prompts";
    // create dir if not exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    console.log("Writing to file: ", fileName);
    // write to file
    fs.writeFileSync(
      `./dist/samples/prompts/${fileName}.json`,
      JSON.stringify(rawInput)
    );
  });
};
