import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-typescript-integration',
  slug: 'typescript-integration',
  title: 'TypeScript Integration',
  description: 'Learn how to automatically extract TypeScript types from your Zod schemas using z.infer.',
  order: 4,
  estimatedMinutes: 8,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-zod-basics'],
  tags: ['validation', 'zod', 'typescript'],
  keyConcepts: [
    {
      id: 'zod-infer',
      term: 'z.infer',
      definition: 'A utility that allows you to extract the TypeScript type that a Zod schema represents.',
      syntax: 'type MyType = z.infer<typeof mySchema>',
      whyItMatters: 'Using z.infer ensures that your types and your runtime validation logic are always perfectly in sync. If you update the schema, the type updates automatically.',
    },
  ],
  steps: [
    {
      id: 'step-1-infer',
      order: 1,
      type: 'instruction',
      title: 'The Single Source of Truth',
      content: `# Schema-Driven Types

With Zod, you don't need to write an interface and then write a validator. You write the validator, and Zod generates the type for you.`,
      codeExample: {
        code: `import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Extract the type!
type User = z.infer<typeof UserSchema>;

// Now 'User' is equivalent to:
// interface User { id: number; name: string; }

function greet(user: User) {
  console.log("Hello, " + user.name);
}`,
        language: 'typescript',
        highlight: [8],
      },
    },
    {
      id: 'step-2-integration',
      order: 2,
      type: 'instruction',
      title: 'Why it Matters',
      content: `# Avoiding Drifting Types

If you manually write both an interface and a schema, they can get out of sync. Using \`z.infer\` guarantees they are the same.`,
      codeExample: {
        code: `// If I add 'email' here...
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// ...this 'User' type is automatically updated to include 'email'!
type User = z.infer<typeof UserSchema>;`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Inferring an Article',
      instructions: `1. Create an object schema named \`ArticleSchema\` with:
   - \`title\`: string
   - \`content\`: string
   - \`published\`: boolean
2. Use \`z.infer\` to create a TypeScript type named \`Article\` from the \`ArticleSchema\`.`,
      starterCode: `import { z } from "zod";

// 1. Define ArticleSchema
const ArticleSchema = z.object({
  // ...
});

// 2. Extract the type
`,
      solutionCode: `import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export type Article = z.infer<typeof ArticleSchema>;`,
      testCases: [
        {
          id: 'test-1',
          description: 'Article type should be correctly inferred',
          testCode: `// This is primarily a compilation check, but we can verify existence
const a: Article = { title: 'T', content: 'C', published: true };`,
        },
      ],
      hints: [
        'Use `type Article = z.infer<typeof ArticleSchema>`',
      ],
      aiHintPrompt: 'The user is learning how to keep types and schemas in sync with z.infer.',
    },
  ],
}
