import {
  ContentFilterResult,
} from "@azure/openai";
import { ChatCompletionsWithPrompt } from "./types/types";

export const getFilteredResponse = (
  response: ChatCompletionsWithPrompt
): ChatCompletionsWithPrompt => {
  const choice = response.completions.choices[0];
  if (choice.finishReason !== "stop") {
    throw new Error("The response is not a stop.");
  }

  response.completions.promptFilterResults?.forEach((result) => {
    if (result.contentFilterResults) {
      for (const [key, value] of Object.entries(result.contentFilterResults)) {
        throwIfNotSafe(key, value);
      }
    }
  });
  return response;
};

const throwIfNotSafe = (
  key: string,
  contentFilterResult: ContentFilterResult
) => {
  if (contentFilterResult.severity !== "safe") {
    throw new Error(
      `It seems like the input has ${key} content. Please try again with a different input.`
    );
  }
};
