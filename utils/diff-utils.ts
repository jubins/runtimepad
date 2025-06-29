import * as Diff from 'diff';

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number;
}

export function generateDiff(oldText: string, newText: string): DiffLine[] {
  const diff = Diff.diffLines(oldText, newText);
  const result: DiffLine[] = [];
  
  let oldLineNumber = 1;
  let newLineNumber = 1;

  diff.forEach((part) => {
    const lines = part.value.split('\n');
    // Remove empty last line if it exists
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }

    lines.forEach((line) => {
      if (part.added) {
        result.push({
          type: 'added',
          content: line,
          lineNumber: newLineNumber++,
        });
      } else if (part.removed) {
        result.push({
          type: 'removed',
          content: line,
          lineNumber: oldLineNumber++,
        });
      } else {
        result.push({
          type: 'unchanged',
          content: line,
          lineNumber: oldLineNumber++,
        });
        newLineNumber++;
      }
    });
  });

  return result;
}

export function generateWordDiff(oldText: string, newText: string) {
  return Diff.diffWords(oldText, newText);
}