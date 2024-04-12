import * as dotenv from "dotenv";
import { getOpenAIClient } from "./llm";
import similarity from 'compute-cosine-similarity';

export const getEmbeddings = async (input: string): Promise<number[]> => {
    dotenv.config();
    const client = await getOpenAIClient();
    const deployment = process.env.OPENAI_EMBEDDING_DEPLOYMENT_NAME;
    if (!deployment) throw new Error("Missing OpenAI deployment name");
    const embeddings = await client.getEmbeddings(deployment, [input]);
    return embeddings.data[0].embedding;
};

export const getEmbeddingsScore = async (query: string, input: string): Promise<number> => {
    const embeddingsQueryPromise = getEmbeddings(query);
    const embeddingsInputPromise = getEmbeddings(input);
    const [embeddingsQuery, embeddingsInput] = await Promise.all([embeddingsQueryPromise, embeddingsInputPromise]);
    return similarity(embeddingsQuery, embeddingsInput) || 0;
};