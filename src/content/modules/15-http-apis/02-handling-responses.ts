import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-handling-responses',
  slug: 'handling-responses',
  title: 'Handling Responses',
  description: 'Learn how to handle HTTP status codes and parse JSON data safely using Zod.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-fetch-basics', '14-zod-validation'],
  tags: ['http', 'api', 'zod'],
  keyConcepts: [
    {
      id: 'response-ok',
      term: 'response.ok',
      definition: 'A boolean property that is true if the HTTP status code is in the range 200-299.',
      whyItMatters: 'Always check response.ok before trying to parse the data, as fetch does not throw for HTTP errors (like 404 or 500).',
    },
    {
      id: 'zod-integration',
      term: 'Zod Integration',
      definition: 'Using Zod schemas to validate that the JSON structure returned by an API matches your expectations.',
      whyItMatters: 'APIs can change or break. Validating the response at the boundary ensures your application doesn\'t crash later with "undefined is not a function".',
    },
  ],
  steps: [
    {
      id: 'step-1-checking-status',
      order: 1,
      type: 'instruction',
      title: 'Checking for Success',
      content: `# Handling HTTP Errors

A \`fetch\` promise only rejects on network failure. For HTTP errors like 404 (Not Found) or 500 (Server Error), you must check the \`ok\` property.`,
      codeExample: {
        code: `async function loadData() {
  const response = await fetch("/api/data");
  
  if (!response.ok) {
    throw new Error("HTTP error! status: " + response.status);
  }
  
  return await response.json();
}`,
        language: 'typescript',
        highlight: [4, 5, 6],
      },
    },
    {
      id: 'step-2-typed-parsing',
      order: 2,
      type: 'instruction',
      title: 'Typed Parsing with Zod',
      content: `# Validating API Responses

Combine \`fetch\` and \`Zod\` to create a type-safe boundary for your data.`,
      codeExample: {
        code: `import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

async function fetchUser(id: number) {
  const response = await fetch(\`/api/users/\${id}\`);
  const json = await response.json();
  
  // Validate the data!
  return UserSchema.parse(json);
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Safe User Fetcher',
      instructions: `1. Define a Zod schema named \`UserSchema\` with \`id\` (number) and \`email\` (string).
2. Create an async function \`getSafeUser\` that fetches from \`"https://api.example.com/user"\`.
3. Check \`if (!response.ok)\` and throw an error if not.
4. Parse the JSON and return it validated through \`UserSchema.parse()\`.`,
      starterCode: `import { z } from "zod";

// 1. Define schema
const UserSchema = z.object({
  // ...
});

async function getSafeUser() {
  // 2. Fetch and validate
}
`,
      solutionCode: `import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
});

async function getSafeUser() {
  const response = await fetch("https://api.example.com/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const json = await response.json();
  return UserSchema.parse(json);
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should define UserSchema',
          testCode: `if (!UserSchema) throw new Error('UserSchema missing');`,
        },
      ],
      hints: [
        'Check `response.ok` before calling `.json()`',
        'Use `UserSchema.parse(json)` at the end',
      ],
      aiHintPrompt: 'The user is learning to combine fetch with Zod for safe API interaction.',
    },
  ],
}
