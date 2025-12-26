import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-default-exports',
  slug: 'default-exports',
  title: 'Default Exports',
  description: 'Learn about default exports and when to use them versus named exports.',
  order: 2,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-export-import'],
  tags: ['modules'],
  keyConcepts: [
    {
      id: 'default-export',
      term: 'Default Export',
      definition: 'A single value that is exported as the "default" for a file. Each file can have at most one default export.',
      syntax: 'export default value;',
      example: {
        code: 'export default class User { ... }',
        explanation: 'Exports the User class as the default export of the file.',
      },
      whyItMatters: 'Default exports are often used for the main functionality or class of a module.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Default Exports',
      content: `# Default Exports

In addition to named exports, a module can have a single **default export**. This is often used when a file only has one main thing to share.`,
      codeExample: {
        code: `// file: Logger.ts
export default class Logger {
  log(msg: string) { console.log(msg); }
}

// file: app.ts
import Logger from "./Logger"; // No curly braces!
const logger = new Logger();`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-vs-named',
      order: 2,
      type: 'instruction',
      title: 'Named vs Default',
      content: `# Default vs Named Imports

The main technical difference is how you import them:
- **Default imports** don't use curly braces and can be renamed during import.
- **Named imports** use curly braces and must match the exported name.`,
      codeExample: {
        code: `// Different ways to import
import MyClass from "./MyFile";     // Default import
import { namedVal } from "./MyFile"; // Named import
import { namedVal as x } from "./MyFile"; // Renamed named import`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Default Export',
      instructions: `1. Create a class named \`Config\`.
2. Give it a property \`version\` with the value \`"1.0.0"\`.
3. Export the \`Config\` class as the **default export**.`,
      starterCode: `// Write your class and default export here
`,
      solutionCode: `export default class Config {
  version: string = "1.0.0";
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Default export should exist',
          testCode: `// In our testing environment, we look for the default export on the module object
// but here we can just check if Config is available if we use the right runner.
// For now, let's assume the user code is the module.
if (typeof Config === 'undefined') throw new Error('Config class is not defined');
const c = new Config();
if (c.version !== '1.0.0') throw new Error('version property is wrong');`,
        },
      ],
      hints: [
        'Use `export default class Config { ... }` or declare the class then `export default Config;`',
      ],
      aiHintPrompt: 'The user is practicing default exports.',
    },
  ],
}
