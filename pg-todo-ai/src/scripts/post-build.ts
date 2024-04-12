import { createPrompts } from "./create-prompts";
import { createSamplesEmbeddings } from "./create-sample-embeddings";

export const postBuild = async () => {
  await createSamplesEmbeddings();
  await createPrompts();
};

postBuild();