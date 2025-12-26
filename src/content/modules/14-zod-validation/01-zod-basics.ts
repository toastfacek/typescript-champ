import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-zod-basics',
  slug: 'zod-basics',
  title: 'Zod Basics',
  description: 'Learn how to create simple schemas and validate primitive data using Zod.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-getting-started'],
  tags: ['validation', 'zod'],
  keyConcepts: [
    {
      id: 'zod-schema',
      term: 'Zod Schema',
      definition: 'A definition of the structure and constraints of a piece of data. Zod uses these schemas to validate input at runtime.',
      syntax: 'z.string(), z.number()',
      whyItMatters: 'Schemas allow you to guarantee that your data matches your expectations before your logic ever touches it.',
    },
    {
      id: 'zod-parse',
      term: '.parse()',
      definition: 'A method that validates data against a schema. If the data is valid, it returns the data; otherwise, it throws a ZodError.',
      syntax: 'mySchema.parse(data)',
      whyItMatters: 'Parsing is the way you enforce your schemas at the boundaries of your application.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What is Zod?',
      content: `# Data Validation with Zod

TypeScript catches errors at **compile-time**, but it can't see data that comes in at **runtime** (like from an API or a form).

**Zod** is a library that lets you define schemas to validate that runtime data.`,
      codeExample: {
        code: `import { z } from "zod";

const stringSchema = z.string();

// Valid: returns "hello"
const result = stringSchema.parse("hello");

// Invalid: throws ZodError
stringSchema.parse(123);`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-primitives',
      order: 2,
      type: 'instruction',
      title: 'Primitive Schemas',
      content: `# Basic Schemas

Zod has schemas for all primitive types and allows you to add constraints.`,
      codeExample: {
        code: `const ageSchema = z.number().min(18).max(100);

ageSchema.parse(25); // OK
ageSchema.parse(12); // Error: Number must be at least 18`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-safe-parse',
      order: 3,
      type: 'instruction',
      title: 'Handling Errors Safely',
      content: `# safeParse

If you don't want Zod to throw an error, use \`.safeParse()\`. It returns an object with either a success result or an error object.`,
      codeExample: {
        code: `const result = z.string().safeParse(123);

if (!result.success) {
  console.log(result.error.issues);
} else {
  console.log(result.data);
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Username Validator',
      instructions: `1. Import \`z\` from \`zod\`.
2. Create a schema named \`usernameSchema\` that validates a string.
3. The string must have a minimum length of 3 and a maximum length of 20.
4. Export the schema.`,
      starterCode: `import { z } from "zod";

// Create your schema here
`,
      solutionCode: `import { z } from "zod";

export const usernameSchema = z.string().min(3).max(20);`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should accept valid username',
          testCode: `usernameSchema.parse('alice');`,
        },
        {
          id: 'test-2',
          description: 'Should reject short username',
          testCode: `try { usernameSchema.parse('a'); throw new Error('Fail'); } catch (e) { if (e.name !== 'ZodError') throw e; }`,
        },
      ],
      hints: [
        'Use `z.string()`',
        'Chain `.min(3)` and `.max(20)` onto the string schema',
      ],
      aiHintPrompt: 'The user is learning the basics of Zod schemas and constraints.',
    },
  ],
}
