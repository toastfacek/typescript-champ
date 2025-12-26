import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-object-schemas',
  slug: 'object-schemas',
  title: 'Object Schemas',
  description: 'Learn how to define complex object structures and nested validation with Zod.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-zod-basics'],
  tags: ['validation', 'zod', 'objects'],
  keyConcepts: [
    {
      id: 'zod-object',
      term: 'z.object()',
      definition: 'A function used to define a schema for an object. You provide keys and their corresponding Zod schemas.',
      syntax: 'z.object({ key: z.string() })',
      whyItMatters: 'Objects are the primary way data is structured in modern applications. z.object allows you to validate entire data payloads at once.',
    },
    {
      id: 'optional-nullable',
      term: 'Optional & Nullable',
      definition: 'Modifiers that mark a field as optional (.optional()) or capable of being null (.nullable()).',
      syntax: 'z.string().optional()',
      whyItMatters: 'Real-world data is often incomplete. These modifiers allow your schema to reflect the reality of your data.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Defining Objects',
      content: `# Object Shapes

You define the "shape" of an object by passing a configuration to \`z.object()\`.`,
      codeExample: {
        code: `const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  active: z.boolean(),
});

const user = UserSchema.parse({
  id: 1,
  username: "alice",
  active: true,
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-optional',
      order: 2,
      type: 'instruction',
      title: 'Optional and Nullable Fields',
      content: `# Handling Missing Data

In TypeScript, objects often have optional fields (\`?\`) or values that can be \`null\`. Zod handles these with \`.optional()\` and \`.nullable()\`.`,
      codeExample: {
        code: `const ProfileSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  avatarUrl: z.string().nullable(),
});

ProfileSchema.parse({ name: "Alice" }); // OK!
ProfileSchema.parse({ name: "Alice", bio: "Coder", avatarUrl: null }); // OK!`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-nested',
      order: 3,
      type: 'instruction',
      title: 'Nested Objects',
      content: `# Nesting Schemas

You can nest object schemas inside each other to validate complex data structures.`,
      codeExample: {
        code: `const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
});

const UserWithAddress = z.object({
  name: z.string(),
  address: AddressSchema,
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Product Schema',
      instructions: `1. Create a schema named \`productSchema\` using \`z.object()\`.
2. It should have:
   - \`id\`: a number
   - \`name\`: a string
   - \`price\`: a number
   - \`description\`: an optional string
3. Export the schema.`,
      starterCode: `import { z } from "zod";

// Define your productSchema here
`,
      solutionCode: `import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
});`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should accept product without description',
          testCode: `productSchema.parse({ id: 1, name: 'Phone', price: 500 });`,
        },
        {
          id: 'test-2',
          description: 'Should reject invalid ID type',
          testCode: `try { productSchema.parse({ id: '1', name: 'Phone', price: 500 }); throw new Error('Fail'); } catch (e) { if (e.name !== 'ZodError') throw e; }`,
        },
      ],
      hints: [
        'Use `z.object({ ... })`',
        'Use `.optional()` for the description field',
      ],
      aiHintPrompt: 'The user is practicing defining object schemas with optional fields.',
    },
  ],
}
