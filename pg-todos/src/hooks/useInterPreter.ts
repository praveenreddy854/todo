import { ChatChoice } from "@azure/openai";
import { DeleteToDosArgs, Functions } from "../types/types";
import { useAddInterPreter } from "./useAddInterPreter";
import { useDeletesInterPreter } from "./useDeleteInterPreter";
import { useUpdatesInterPreter } from "./useUpdateInterPreter";
import { Project } from "ts-morph";
import { createFunctions } from "../functions/createFunctions";

export const useInterPreter = () => {
  // Execute create ToDo interpreter only if the LLM response returned create_todo fn
  const addTodo = useAddInterPreter();
  const deleteTodos = useDeletesInterPreter();
  const updateTodos = useUpdatesInterPreter();
  return function (response?: ChatChoice) {
    if (response?.finishReason !== "stop") {
      throw Error("Function call is not a stop.");
    }

    let resultMap: Record<string, unknown> = {};
    extractFnsAndVariables(response).forEach((fn) => {
      switch (fn?.name) {
        case Functions.createTodos:
          Object.keys(fn.arguments).forEach((key) => {
            if (key === "title") {
              const id = addTodo({ title: fn.arguments[key] as string });
              if (fn.result) {
                resultMap[fn.result as string] = id;
              }
              return;
            }
          });
          break;
        case Functions.deleteTodos:
          const deleteTodoArgs: DeleteToDosArgs = {
            ids: extractIdsFromArgs(fn, resultMap),
          };
          deleteTodos(deleteTodoArgs);
          break;
        case Functions.updateTodos:
          const updateTodoArgs = fn?.arguments;
          const ids = extractIdsFromArgs(fn, resultMap);

          const updatesTodoArgsWithId = ids.map((id) => {
            if (isNaN(id)) {
              throw new Error("Id is not a number");
            }
            const { ids, ...rest } = updateTodoArgs; // remove ids property
            return { ...rest, id: id }; // add id property
          });

          updateTodos(updatesTodoArgsWithId);
          break;
        default:
          throw Error("Function not found");
      }
    });
  };
};

export interface FunctionArgsResultMap {
  name: Functions;
  arguments: Record<string, unknown>;
  result: unknown;
}

const extractFnsAndVariables = (response: ChatChoice) => {
  const fnArgsResults: FunctionArgsResultMap[] = [];
  const project = new Project({ useInMemoryFileSystem: true });
  const responseSplits = response?.message?.content?.split(";");

  responseSplits?.forEach((line) => {
    const sourceFileName = `${Math.random().toString(36).substring(7)}.ts`;
    const sourceFile = project.createSourceFile(sourceFileName, line);
    try {
      let fnName: string = "";
      let fnArgs: Record<string, unknown> = {};
      let result: unknown;

      sourceFile.getDescendants().forEach((node) => {
        if (node.getKindName() === "ExpressionStatement") {
          node.getDescendants().forEach((expressionChild) => {
            if (expressionChild.getKindName() === "CallExpression") {
              expressionChild
                .getDescendants()
                .forEach((callExpressionChild) => {
                  if (
                    callExpressionChild.getKindName() === "Identifier" &&
                    !fnName
                  ) {
                    fnName = callExpressionChild.getText();
                  } else if (
                    callExpressionChild.getKindName() === "BinaryExpression"
                  ) {
                    const splits = callExpressionChild.getText().split("=");
                    fnArgs[splits[0]] = splits[1];
                  }
                });
            }
          });
        } else if (node.getKindName() === "VariableStatement") {
          node.getDescendants().forEach((variableStatementChild) => {
            if (
              variableStatementChild.getKindName() === "VariableDeclarationList"
            ) {
              variableStatementChild
                .getDescendants()
                .forEach((variableDeclarationListChild) => {
                  if (
                    variableDeclarationListChild.getKindName() ===
                    "VariableDeclaration"
                  ) {
                    variableDeclarationListChild
                      .getDescendants()
                      .forEach((variableDeclarationChild) => {
                        if (
                          variableDeclarationChild.getKindName() ===
                            "Identifier" &&
                          !result
                        ) {
                          result = variableDeclarationChild.getText();
                        } else if (
                          variableDeclarationChild.getKindName() ===
                          "CallExpression"
                        ) {
                          variableDeclarationChild
                            .getDescendants()
                            .forEach((callExpressionChild) => {
                              if (
                                callExpressionChild.getKindName() ===
                                  "Identifier" &&
                                !fnName
                              ) {
                                fnName = callExpressionChild.getText();
                              } else if (
                                callExpressionChild.getKindName() ===
                                "BinaryExpression"
                              ) {
                                const splits = callExpressionChild
                                  .getText()
                                  .split("=");
                                fnArgs[splits[0]] = splits[1];
                              }
                            });
                        }
                      });
                  }
                });
            }
          });
        }
      });

      if (!fnName) {
        throw Error("Function name is not found in the response");
      }
      if (Object.keys(fnArgs).length === 0) {
        throw Error("Function arguments are not found in the response");
      }
      fnArgsResults.push({
        name: fnName as Functions,
        arguments: fnArgs,
        result: result,
      });
    } finally {
      // Delete the source file once done
      project.removeSourceFile(sourceFile);
    }
  });
  console.log("fnArgsResults", fnArgsResults);
  return fnArgsResults;
};
function extractIdsFromArgs(
  fn: FunctionArgsResultMap,
  resultMap: Record<string, unknown>
) {
  const ids: number[] = [];
  Object.keys(fn.arguments).forEach((key) => {
    if (key === "ids") {
      const idsStr = (fn.arguments[key] as string)
        .replace("<<", "")
        .replace(">>", "")
        .replace("[", "")
        .replace("]", "");

      idsStr.split(",").forEach((id) => {
        ids.push(
          parseInt(resultMap[id.trim()] as string) || parseInt(id.trim())
        );
      });
      return;
    }
  });
  return ids;
}
