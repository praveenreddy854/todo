import { todoServiceFnUrl } from "../urlHelper";
import axios from "axios";
import { useMutation } from "react-query";
import { ChatChoice } from "@azure/openai";

export const useCallLlmFn = () => {
  return useMutation<ChatChoice, Error, string>({
    mutationFn: async (query: string) => {
      const data = { message: query };
      const response = await axios.post(todoServiceFnUrl, data);
      return response.data.completions.choices[0];
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
