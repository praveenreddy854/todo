import { Functions, LlmInput } from "./types/types";
import { LlmRawInput } from "./llm";
import fs from "fs";

export const generatePrompt = async (userQuery: string) => {
  const fileNames = await getRelatedPromptFileNames(userQuery);
  return generatePromptInternal(fileNames, userQuery);
};

const generatePromptInternal = (
  fileNames: string[],
  query: string
): LlmRawInput => {
  let llmRawInputMerged: LlmRawInput = {
    messages: [],
    functions: [],
  };

  fileNames.forEach((fileName) => {
    const file = `${__dirname}/samples/prompts/${fileName}.json`;
    if (!fs.existsSync(file)) {
      throw new Error(`File ${file} does not exist`);
    }

    const llmRawInput = JSON.parse(
      fs.readFileSync(file, "utf8")
    ) as LlmRawInput;

    llmRawInputMerged.messages.push(...llmRawInput.messages);
    llmRawInputMerged.functions.push(...llmRawInput.functions);
  });

  llmRawInputMerged.messages.push({
    role: "user",
    content: query,
  });
  return llmRawInputMerged;
};

const getRelatedPromptFileNames = async (
  query: string
): Promise<Functions[]> => {
  const lowerQuery = query.toLowerCase();
  const fileNames: Functions[] = [];
  if (lowerQuery.includes("create")) {
    fileNames.push(Functions.createTodo);
  }
  if (
    (lowerQuery.includes("delete") || lowerQuery.includes("remove")) &&
    (lowerQuery.includes("all") || lowerQuery.includes("ids"))
  ) {
    fileNames.push(Functions.deleteTodos);
  }
  if (lowerQuery.includes("delete") || lowerQuery.includes("remove")) {
    fileNames.push(Functions.deleteTodo);
  }
  if (
    (lowerQuery.includes("update") ||
      lowerQuery.includes("change") ||
      lowerQuery.includes("unhide") ||
      (lowerQuery.includes("show") && lowerQuery.includes("hidden"))) &&
    (lowerQuery.includes("all") || lowerQuery.includes("ids"))
  ) {
    fileNames.push(Functions.updateTodos);
  }
  return fileNames;
};
