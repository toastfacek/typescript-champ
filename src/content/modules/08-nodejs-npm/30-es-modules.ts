import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '30-es-modules',
  slug: 'es-modules',
  title: 'ES Modules',
  description: 'Use import and export to organize code into modules.',
  order: 30,
  estimatedMinutes: 14,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['29-npm-packages'],
  tags: ['modules', 'import', 'export'],
  keyConcepts: [
    {
      id: 'es-module',
      term: 'ES Module',
      definition: 'ES Modules (ECMAScript Modules) are the standard way to organize and share code in JavaScript and TypeScript. They use `import` and `export` statements to define what code is available from a file and what code you want to use from other files.',
      syntax: 'export function name() { ... }\nimport { name } from "./file"',
      example: {
        code: '// math.ts\nexport function add(a: number, b: number): number {\n  return a + b;\n}\n\n// app.ts\nimport { add } from "./math";\nconst result = add(2, 3);',
        explanation: 'The `export` keyword makes `add` available to other files. The `import` statement brings it into `app.ts`. This is how you organize code into reusable modules.',
      },
      whyItMatters: 'Modules let you split code into logical files, reuse code across files, and manage dependencies. Understanding import/export is essential for any real-world TypeScript project.',
    },
    {
      id: 'named-vs-default',
      term: 'Named vs Default Exports',
      definition: 'Named exports export multiple things from a file, each with its own name. Default exports export one main thing from a file. You can use both in the same file. Named exports use `export`, default exports use `export default`.',
      syntax: 'export { name1, name2 }  // Named\nexport default value  // Default',
      example: {
        code: '// Named exports\nexport function add(a: number, b: number) { return a + b; }\nexport function subtract(a: number, b: number) { return a - b; }\n\n// Default export\nexport default class Calculator { ... }\n\n// Importing\nimport { add, subtract } from "./math";  // Named\nimport Calculator from "./math";  // Default',
        explanation: 'Named exports let you export multiple things. Default export is for the main thing a module provides. You import them differently: named with curly braces, default without.',
      },
      whyItMatters: 'Understanding the difference helps you use libraries correctly and organize your own code. Most modern packages use named exports, but some use default exports. You need to know both.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are ES Modules?',
      content: `# Organizing Code

**ES Modules** let you split code into separate files and share code between them:

\`\`\`typescript
// math.ts
export function add(a: number, b: number) {
  return a + b;
}

// app.ts
import { add } from "./math";
\`\`\`

\`export\` makes code available, \`import\` brings it in.`,
    },
    {
      id: 'step-2-named-exports',
      order: 2,
      type: 'instruction',
      title: 'Named Exports',
      content: `# Exporting Multiple Things`,
      codeExample: {
        code: `// utils.ts
export function formatName(name: string): string {
  return name.toUpperCase();
}

export function formatAge(age: number): string {
  return age.toString();
}

export const PI = 3.14159;

// app.ts
import { formatName, formatAge, PI } from "./utils";

let name = formatName("alice");  // "ALICE"
let age = formatAge(25);         // "25"`,
        language: 'typescript',
        highlight: [2, 6, 10, 14],
      },
    },
    {
      id: 'step-3-default-exports',
      order: 3,
      type: 'instruction',
      title: 'Default Exports',
      content: `# Single Main Export`,
      codeExample: {
        code: `// Calculator.ts
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// app.ts
import Calculator from "./Calculator";

let calc = new Calculator();
calc.add(2, 3);  // 5

// You can rename default imports
import MyCalc from "./Calculator";`,
        language: 'typescript',
        highlight: [2, 9, 15],
      },
    },
    {
      id: 'step-4-mixed',
      order: 4,
      type: 'instruction',
      title: 'Mixed Exports',
      content: `# Both Named and Default`,
      codeExample: {
        code: `// math.ts
export function add(a: number, b: number) {
  return a + b;
}

export default {
  add,
  subtract: (a: number, b: number) => a - b
};

// app.ts
import math, { add } from "./math";

math.add(2, 3);      // Using default
add(2, 3);          // Using named`,
        language: 'typescript',
        highlight: [2, 8, 13, 14],
      },
    },
    {
      id: 'step-5-exercise-1',
      order: 5,
      type: 'code-exercise',
      title: 'Create Named Exports',
      instructions: `Create two functions that would be exported from a module:
1. \`multiply\` - takes two numbers, returns their product
2. \`divide\` - takes two numbers, returns their quotient

Use \`export\` keyword before each function.`,
      starterCode: `// Create exported functions

`,
      solutionCode: `// Create exported functions
export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  return a / b;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'multiply(3, 4) should return 12',
          testCode: `if (multiply(3, 4) !== 12) throw new Error('multiply(3, 4) should return 12');`,
        },
        {
          id: 'test-2',
          description: 'divide(10, 2) should return 5',
          testCode: `if (divide(10, 2) !== 5) throw new Error('divide(10, 2) should return 5');`,
        },
      ],
      hints: [
        'Use: export function name() { ... }',
        'multiply uses *, divide uses /',
      ],
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Create Default Export',
      instructions: `Create a default export:
- Export an object as default
- The object should have a method \`greet\` that takes a string and returns "Hello, " + name

Use \`export default\`.`,
      starterCode: `// Create default export

`,
      solutionCode: `// Create default export
export default {
  greet(name: string): string {
    return "Hello, " + name;
  }
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'Default export should have greet method',
          testCode: `const obj = { greet: (name: string) => "Hello, " + name };
if (typeof obj.greet !== 'function') throw new Error('Should have greet method');`,
        },
      ],
      hints: [
        'Use: export default { ... }',
        'Include a greet method inside the object',
      ],
    },
    {
      id: 'step-7-fill-blank',
      order: 7,
      type: 'fill-in-blank',
      title: 'Complete the Import/Export',
      instructions: 'Fill in the missing keywords.',
      codeTemplate: `// math.ts
{{BLANK_1}} function add(a: number, b: number) {
  return a + b;
}

// app.ts
{{BLANK_2}} { add } {{BLANK_3}} "./math";`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'keyword',
          correctAnswers: ['export'],
          caseSensitive: true,
          hint: 'The keyword that makes code available to other files...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'keyword',
          correctAnswers: ['import'],
          caseSensitive: true,
          hint: 'The keyword that brings code from other files...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'keyword',
          correctAnswers: ['from'],
          caseSensitive: true,
          hint: 'The keyword that specifies the source file...',
        },
      ],
      hints: [
        'export makes code available',
        'import brings code in',
        'from specifies the source',
      ],
    },
    {
      id: 'step-8-quiz',
      order: 8,
      type: 'quiz',
      question: 'What is the difference between named and default exports?',
      options: [
        {
          id: 'a',
          text: 'Named exports export multiple things, default export exports one main thing',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'Named exports are faster',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'Default exports are required',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'There is no difference',
          isCorrect: false,
        },
      ],
      explanation: 'Named exports let you export multiple things from a file (functions, constants, etc.), each with its own name. Default export is for exporting one main thing (like a class or object). You can use both in the same file.',
    },
  ],
}


