import { createPrompts } from "./create-prompts";
import { createSamplesEmbeddings } from "./create-sample-embeddings";

export const postBuild = async () => {
  console.log("Creating sample embeddings...")
  await createSamplesEmbeddings();
  console.log("Creating prompts...")
  createPrompts();
  console.log("Post build completed.")
};

postBuild();