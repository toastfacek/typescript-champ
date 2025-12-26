import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-export-import',
  slug: 'export-import',
  title: 'Export & Import',
  description: 'Learn how to split your code into multiple files and share code using export and import.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-getting-started'],
  tags: ['modules', 'basics'],
  keyConcepts: [
    {
      id: 'module',
      term: 'Module',
      definition: 'A separate file containing code. By default, code in a module is private to that file unless exported.',
      whyItMatters: 'Modules allow you to organize your code into small, manageable pieces instead of one giant file.',
    },
    {
      id: 'export',
      term: 'export Keyword',
      definition: 'Used to make a variable, function, or class available to other files.',
      syntax: 'export const name = value;',
      example: {
        code: 'export const pi = 3.14;',
        explanation: 'Makes the pi constant available for import in other files.',
      },
      whyItMatters: 'Exporting allows you to share functionality across your entire application.',
    },
    {
      id: 'import',
      term: 'import Keyword',
      definition: 'Used to bring in code that was exported from another file.',
      syntax: 'import { name } from "./file";',
      example: {
        code: 'import { pi } from "./math";',
        explanation: 'Imports the pi constant from a file named math.ts.',
      },
      whyItMatters: 'Importing allows you to reuse code and build complex systems from simple components.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Splitting Code into Modules',
      content: `# Organizing with Modules

As your programs grow, you'll want to split your code into multiple files. In TypeScript (and modern JavaScript), each file is a **module**.

To use code from one file in another, you must **export** it from the source file and **import** it into the destination file.`,
      codeExample: {
        code: `// file: math.ts
export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;

// file: app.ts
import { add, subtract } from "./math";

console.log(add(5, 3));      // 8
console.log(subtract(10, 4)); // 6`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-named-exports',
      order: 2,
      type: 'instruction',
      title: 'Named Exports',
      content: `# Named Exports

When you use the \`export\` keyword before a declaration, it's called a **named export**. You can have many named exports in a single file.

When importing them, you must use the exact name inside curly braces \`{ }\`.`,
      codeExample: {
        code: `export interface User {
  id: number;
  name: string;
}

export const admin: User = { id: 1, name: "Admin" };`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Exporting and Importing',
      instructions: `Follow these steps:
1. Export a constant named \`API_URL\` with the value \`"https://api.example.com"\`.
2. Export a function named \`formatDate\` that takes a \`Date\` and returns a \`string\`.
3. (In this exercise environment, we write the code as if it were in a single module that exports these members).`,
      starterCode: `// Export API_URL and formatDate here
`,
      solutionCode: `export const API_URL = "https://api.example.com";

export function formatDate(date: Date): string {
  return date.toISOString();
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'API_URL should be exported',
          testCode: `if (typeof API_URL === 'undefined') throw new Error('API_URL is not defined');
if (API_URL !== "https://api.example.com") throw new Error('API_URL has the wrong value');`,
        },
        {
          id: 'test-2',
          description: 'formatDate should be exported',
          testCode: `if (typeof formatDate !== 'function') throw new Error('formatDate is not defined');`,
        },
      ],
      hints: [
        'Use `export const API_URL = ...`',
        'Use `export function formatDate(date: Date): string { ... }`',
      ],
      aiHintPrompt: 'The user is learning how to use named exports.',
    },
  ],
}
