import { LlmInput, Roles } from "./types/types";
import { LlmRawInput, SampleEmbeddingsFileSchema } from "./llm";
import fs from "fs";
import { FnSchemas } from "./function-shema";
import { getTsConfig, removeEscapedDoubleQuotesCsv } from "./scripts/utils";
import { RelativeEmbeddingsPath } from "./scripts/create-sample-embeddings";
import { getEmbeddingsScore } from "./embeddings";
import { intro } from "./samples/intro";
const { parse } = require("csv-parse");

type SampleResponse = Pick<SampleEmbeddingsFileSchema, "prompt" | "response">;

export const generatePrompt = async (userQuery: string) => {
  const sampleResponsesPromise = getRelatedSamplePromptResponses(userQuery);
  const fnSchemasPromise = getRelatedFnSchemas(userQuery);
  const [sampleResponses, fnSchemas] = await Promise.all([sampleResponsesPromise, fnSchemasPromise]);
  return generatePromptInternal(fnSchemas, sampleResponses, userQuery);

  // Ignore samples for now
  // const fnSchemas = await getRelatedFnSchemas(userQuery);
  // return generatePromptInternal(fnSchemas, [], userQuery);
};

const generatePromptInternal = (
  fnSchemas: LlmInput[],
  sampleResponses: SampleResponse[],
  query: string
  ): LlmRawInput => {
    let llmRawInputMerged: LlmRawInput = {
      messages: [],
      functions: [],
    };
    
    // Inset the fnSchemas into the llmRawInputMerged
    fnSchemas.forEach((fnSchema) => 
    {
      fnSchema.functions.forEach((fn) => 
      {
        const rawFn = {
          name: fn.functionName,
          description: fn.functionDescription,
          // open ai parameters
          parameters: {
            type: "object",
            properties: (function () {
              const properties: Record<string, any> = {};
              Object.entries(fn.arguments).forEach(([key, value]) => {
                properties[value.name] = {
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
                  required.push(value.name);
                }
              });
              return required;
            })(),
          },
        }
        llmRawInputMerged.functions.push(rawFn);
      })  
    })

    llmRawInputMerged.messages.push({
      role: Roles.System,
      content: intro
    });

    sampleResponses.forEach((response) => {
      llmRawInputMerged.messages.push({
        role: Roles.System,
        content: JSON.stringify(response),
      });
    });

    llmRawInputMerged.messages.push({
      role: Roles.User,
      content: query,
    });
    return llmRawInputMerged;
  };
  
  const getRelatedSamplePromptResponses = async (query: string): Promise<SampleResponse[]> => {
    // Match the query with embeddings to get the closest samples
    // Read embeddings.csv    
    const tsConfig = await getTsConfig();
    const outDir = tsConfig.compilerOptions.outDir;
    const filePath = `${outDir}${RelativeEmbeddingsPath}`;

    const embeddings: SampleEmbeddingsFileSchema[] = [];
    return await new Promise<SampleResponse[]>((resolve, reject) => {
    fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", (row: string) => {
    embeddings.push({
      prompt: row[0],
      response: row[1],
      embeddings: row[2].split(',').map((e: string) => parseFloat(e)),
    });
  }).on("end", async () => {

    const embeddingsWithScore = await Promise.all( embeddings.map(async (embedding) => {
      const matchScore = await getEmbeddingsScore(query, embedding.prompt);
      return { ...embedding, matchScore };
    }));
    // Sort by matchScore and return the top 5
    const result = await embeddingsWithScore.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
    return resolve(result.map((r) => ({response: removeEscapedDoubleQuotesCsv(r.response), prompt: removeEscapedDoubleQuotesCsv(r.prompt)})));
  });
    })
  }
  
  const getRelatedFnSchemas = async (query: string): Promise<LlmInput[]> => {
    // TODO: use embeddings to get the closest prompt
    return Object.values(FnSchemas);
  };