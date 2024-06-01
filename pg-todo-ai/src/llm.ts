import { OpenAIClient, AzureKeyCredential, ChatMessage } from "@azure/openai";
import * as dotenv from "dotenv";
import { generatePrompt } from "./promptGen";
import { ChatCompletionsWithPrompt } from "./types/types";

export const fnCallOpenAI = async (
  query: string
): Promise<ChatCompletionsWithPrompt> => {
  const client = await getOpenAIClient();
  const deployment = process.env.OPENAI_DEPLOYMENT_NAME;
  if (!deployment) throw new Error("Missing OpenAI deployment name");

  const rawInput = await generatePrompt(query);

  const result = await client.getChatCompletions(
    `${deployment}`,
    rawInput.messages,
    { functions: rawInput.functions, temperature: 0.6 }
  );

  const resultWithPrompt = { completions: result, prompt: JSON.stringify(rawInput) };
  return resultWithPrompt;
};

export const getOpenAIClient = () => {
  dotenv.config();
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const key = process.env.OPENAI_API_KEY;

  if (!endpoint || !key) throw new Error("Missing OpenAI credentials");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
  return client;
};

export interface LlmRawInput {
  messages: ChatMessage[];
  functions: LlmRawFunction[];
}
export interface LlmRawFunction {
  name: string;
  description: string;
  parameters: LlmRawParameters;
}

export interface LlmRawParameters {
  type: string;
  properties: Record<string, LlmRawPropertySchema>;
  required: string[];
}
export interface SampleEmbeddingsFileSchema {
  prompt: string,
  response: string,
  embeddings: number[],
};

export interface SampleEmbeddingsFileSchemaWithScore extends SampleEmbeddingsFileSchema {
  matchScore: number;
}

export interface LlmRawPropertySchema {
  type: string;
  description: string;
}
