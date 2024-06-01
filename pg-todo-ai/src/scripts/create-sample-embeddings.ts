import { escapeDoubleQuotesCsv, getTsConfig } from "./utils";
import { Samples } from "../samples";
import { getEmbeddingsAsync } from "../embeddings";
import fs from "fs";

export const SamplesPath = "/samples/";
export const RelativeEmbeddingsPath = `${SamplesPath}embeddings.csv`;

export const createSamplesEmbeddings = async () => {
    // Read tsconfig.json outDir
    const tsConfig = await getTsConfig();
    const outDir = tsConfig.compilerOptions.outDir;
    const filePath = `${outDir}${RelativeEmbeddingsPath}`;
    // Create embeddings.csv with header input,embedding
    const header = "prompt,response,embedding\n";
    fs.writeFileSync(filePath, header);
    // Create each prompt and response as a row in embeddings.csv
    Object.keys(Samples).forEach(async (functionName) => {
        const samples = Samples[functionName];
        samples.forEach(async (sample) => {
            console.log(`Creating embedding for: ${sample.prompt}`);
            const embedding = await getEmbeddingsAsync(sample.response).catch((err) => {
                console.error(`Error creating embedding for: ${sample.prompt}`);
                console.error(err);
            });
            console.log(`Embedding created for: ${sample.prompt}`);
            const row = `"${escapeDoubleQuotesCsv(sample.prompt)}","${escapeDoubleQuotesCsv(sample.response)}","${embedding}"\n`;
            fs.appendFileSync(filePath, row);
        });
    });
};