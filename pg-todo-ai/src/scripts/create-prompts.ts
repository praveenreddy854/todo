import { ChatMessage } from "@azure/openai";
import { intro } from "../samples/intro";
import { LlmRawInput } from "../llm";
import { FnSchemas } from "../function-shema";
import fs from "fs";
import { Samples } from "../samples";

export const createPrompts = async () => {
  FnSchemas.forEach((fnSchema) => {
    const parameters = {
      type: "object",
      properties: {},
      required: [],
    };

    let introPrompt = "system:" + intro;

    const samples = fnSchema.functions.map(
      (fn) => "\n" + JSON.stringify(Samples[fn.functionName])
    );
    introPrompt += samples.join("\n");

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: fnSchema.prompt,
      },
      {
        role: "system",
        content: introPrompt,
      },
    ];

    const rawInput: LlmRawInput = {
      messages,
      functions: fnSchema.functions.map((fn) => ({
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
            Object.entries(fn.arguments).forEach(([key, value]) => {
              if (value.required) {
                required.push(key);
              }
            });
            return required;
          })(),
        },
      })),
    };
    const fileName = fnSchema.functions[0].functionName;
    const dir = "./dist/samples/prompts";
    // create dir if not exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    // write to file
    fs.writeFile(
      `./dist/samples/prompts/${fileName}.json`,
      JSON.stringify(rawInput),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
};

createPrompts();
