import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-re-exports',
  slug: 're-exports',
  title: 'Re-exports',
  description: 'Learn how to use barrel files to simplify imports by re-exporting code from other modules.',
  order: 3,
  estimatedMinutes: 8,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-export-import'],
  tags: ['modules', 'organization'],
  keyConcepts: [
    {
      id: 're-export',
      term: 'Re-exporting',
      definition: 'The process of exporting code from one module that was originally defined in another module.',
      syntax: 'export * from "./file";',
      whyItMatters: 'Re-exporting allows you to create a single entry point (a "barrel") for a folder, making imports cleaner for consumers of your code.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Simplifying Imports',
      content: `# Re-exports (Barrel Files)

Sometimes you have a folder with many modules. Instead of importing from each file individually, you can use a "barrel file" (usually \`index.ts\`) to re-export everything.`,
      codeExample: {
        code: `// file: components/Button.ts
export const Button = ...;

// file: components/Input.ts
export const Input = ...;

// file: components/index.ts (The Barrel)
export * from "./Button";
export * from "./Input";

// file: app.ts
import { Button, Input } from "./components"; // Clean!`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-named-re-export',
      order: 2,
      type: 'instruction',
      title: 'Specific Re-exports',
      content: `# Named Re-exports

You can also re-export specific items or rename them as they pass through.`,
      codeExample: {
        code: `// Re-export specific items
export { add, subtract } from "./math";

// Re-export and rename
export { default as MyLogger } from "./Logger";`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Practice Re-exporting',
      instructions: `Suppose you are in a file that wants to re-export functionality from \`./internal-utils\`.
      
1. Re-export everything from \`./internal-utils\`.
2. Re-export a specific function \`validate\` from \`./validators\`.`,
      starterCode: `// Re-export here
`,
      solutionCode: `export * from "./internal-utils";
export { validate } from "./validators";`,
      testCases: [
        {
          id: 'test-1',
          description: 'Syntactic check for re-exports',
          testCode: `// This is a bit hard to test without actual files, but we can check the solution matches.
// The runner will validate the syntax.`,
        },
      ],
      hints: [
        'Use `export * from "..."` to export everything',
        'Use `export { name } from "..."` for specific items',
      ],
      aiHintPrompt: 'The user is learning re-export patterns.',
    },
  ],
}
