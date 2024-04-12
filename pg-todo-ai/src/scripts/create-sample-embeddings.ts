import { escapeDoubleQuotesCsv, getTsConfig } from "./utils";
import fs from "fs/promises";
import { Samples } from "../samples";
import { getEmbeddings } from "../embeddings";

export const SamplesPath = "/samples/";
export const RelativeEmbeddingsPath = `${SamplesPath}embeddings.csv`;

export const createSamplesEmbeddings = async () => {
    // Read tsconfig.json outDir
    const tsConfig = await getTsConfig();
    const outDir = tsConfig.compilerOptions.outDir;
    const filePath = `${outDir}${RelativeEmbeddingsPath}`;
    // Create embeddings.csv with header input,embedding
    const header = "prompt,response,embedding\n";
    await fs.writeFile(filePath, header);
    // Create each prompt and response as a row in embeddings.csv
    Object.keys(Samples).forEach((functionName) => {
        const samples = Samples[functionName];
        samples.forEach(async (sample) => {
            const embedding = await getEmbeddings(sample.response);
            const row = `"${escapeDoubleQuotesCsv(sample.prompt)}","${escapeDoubleQuotesCsv(sample.response)}","${embedding}"\n`;
            await fs.appendFile(filePath, row);
        });
    });
};