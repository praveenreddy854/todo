import {
  ChatChoice,
  ChatCompletions,
  ContentFilterResult,
} from "@azure/openai";

export const getFilteredResponse = (response: ChatCompletions): ChatChoice => {
  if (response.choices[0].finishReason !== "function_call") {
    console.error(JSON.stringify(response, null, 2));
    throw new Error("The response is not a function call.");
  }
  response.promptFilterResults?.forEach((result) => {
    if (result.contentFilterResults) {
      for (const [key, value] of Object.entries(result.contentFilterResults)) {
        throwIfNotSafe(key, value);
      }
    }
  });
  return response.choices[0];
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
