const trimQuotes = (str: string): string => {
  return str.replace(/^["']|["']$/g, '');
};

export const cleanArguments = (args: Record<string, unknown>): Record<string, unknown> => {
  return Object.entries(args).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? trimQuotes(value) : value;
    return acc;
  }, {} as Record<string, unknown>);
};
