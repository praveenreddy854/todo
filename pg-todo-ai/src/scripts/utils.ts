import fs from 'fs/promises';
export const getTsConfig = async () => {
    const tsconfig = await fs.readFile('tsconfig.json');
    const tsconfigString = Buffer.from(tsconfig).toString();
    return JSON.parse(tsconfigString);
}

export const escapeDoubleQuotesCsv = (str: string) => {
    return str.replace(/"/g, '""');
};

export const removeEscapedDoubleQuotesCsv = (str: string) => {
    return str.replace(/""/g, '"');
}