import * as dotenv from "dotenv";
import { getOpenAIClient } from "./llm";
import similarity from 'compute-cosine-similarity';
import { Embeddings } from "@azure/openai";

export const getEmbeddingsSync = (input: string): number[] => {
    dotenv.config();
    const client = getOpenAIClient();
    const deployment = process.env.OPENAI_EMBEDDING_DEPLOYMENT_NAME;
    if (!deployment) throw new Error("Missing OpenAI deployment name");
    let embeddings: unknown;
    client.getEmbeddings(deployment, [input]).then((response) => {
        embeddings = response;
    });
    return (embeddings as Embeddings).data[0].embedding;
};

export const getEmbeddingsAsync = async (input: string): Promise<number[]> => {
    try{
    dotenv.config();
    const client = getOpenAIClient();
    const deployment = process.env.OPENAI_EMBEDDING_DEPLOYMENT_NAME;
    if (!deployment) throw new Error("Missing OpenAI deployment name");
    const embeddings = await client.getEmbeddings(deployment, [input]);
    return embeddings.data[0].embedding;
    }
    catch (error) {
        console.log("Failed to get embeddings", error);
        throw error;
    }
}

export const getEmbeddingsScore = async (query: string, input: string): Promise<number> => {
    const embeddingsQueryPromise = getEmbeddingsAsync(query);
    const embeddingsInputPromise = getEmbeddingsAsync(input);
    const [embeddingsQuery, embeddingsInput] = await Promise.all([embeddingsQueryPromise, embeddingsInputPromise]);
    return similarity(embeddingsQuery, embeddingsInput) || 0;
};