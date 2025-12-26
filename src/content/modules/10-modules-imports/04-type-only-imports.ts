import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-type-only-imports',
  slug: 'type-only-imports',
  title: 'Type-only Imports',
  description: 'Learn how to import only types to improve performance and avoid runtime overhead.',
  order: 4,
  estimatedMinutes: 5,
  difficulty: 'advanced',
  xpReward: 40,
  prerequisites: ['01-export-import'],
  tags: ['modules', 'optimization'],
  keyConcepts: [
    {
      id: 'import-type',
      term: 'import type',
      definition: 'A syntax that explicitly tells TypeScript to only import the type information from a module. This code is completely removed during compilation to JavaScript.',
      syntax: 'import type { Name } from "module";',
      whyItMatters: 'Using import type avoids importing actual JavaScript code that you don\'t need at runtime, which can reduce bundle size and prevent circular dependency issues.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Importing Types Only',
      content: `# Type-only Imports

TypeScript allows you to import only the **type definitions** from a module. This is useful when you only need a class or interface for type checking, but don't need to use it as a value at runtime.`,
      codeExample: {
        code: `// Regular import (imports the class/value)
import { User } from "./models";

// Type-only import (only imports the type)
import type { UserProfile } from "./types";

function greet(user: UserProfile) {
  console.log("Hello!");
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-mixed',
      order: 2,
      type: 'instruction',
      title: 'Mixed Imports',
      content: `# Mixed Imports

In modern TypeScript, you can even mix type and value imports in the same line.`,
      codeExample: {
        code: `import { realValue, type JustAType } from "./module";`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Practice Type-only Imports',
      instructions: `1. Use \`import type\` to import an interface named \`Config\` from \`"./settings"\`.
2. Use a regular \`import\` to import a constant named \`DEFAULT_SETTINGS\` from \`"./settings"\`.`,
      starterCode: `// Write your imports here
`,
      solutionCode: `import type { Config } from "./settings";
import { DEFAULT_SETTINGS } from "./settings";`,
      testCases: [
        {
          id: 'test-1',
          description: 'Syntactic check for imports',
          testCode: `// Runner will validate syntax`,
        },
      ],
      hints: [
        'Use `import type { ... } from "..."`',
        'Use `import { ... } from "..."`',
      ],
      aiHintPrompt: 'The user is learning type-only import syntax.',
    },
  ],
}
