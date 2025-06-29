export function formatJson(input: string): { formatted: string; error?: string } {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    return { formatted };
  } catch (error) {
    return { formatted: input, error: error instanceof Error ? error.message : 'Invalid JSON' };
  }
}

export function minifyJson(input: string): { minified: string; error?: string } {
  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    return { minified };
  } catch (error) {
    return { minified: input, error: error instanceof Error ? error.message : 'Invalid JSON' };
  }
}

export function validateJson(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : 'Invalid JSON' };
  }
}