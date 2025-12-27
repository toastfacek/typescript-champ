import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '17-literal-types',
  slug: 'literal-types',
  title: 'Literal Types',
  description: 'Use specific string or number values as types.',
  order: 17,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['16-union-types'],
  tags: ['types', 'literals', 'advanced'],
  keyConcepts: [
    {
      id: 'literal-type',
      term: 'Literal Type',
      definition: 'A literal type is a type that represents a specific value, not just any string or number. For example, `"success"` is a literal type that can only be the exact string "success", not any other string.',
      syntax: '"value" | "another"',
      example: {
        code: 'let status: "success" | "error" = "success";\nstatus = "error";  // OK\nstatus = "pending";  // Error! Only "success" or "error" allowed',
        explanation: 'The variable `status` can only be the literal strings "success" or "error", not any other string value.',
      },
      whyItMatters: 'Literal types let you create very specific, constrained types. They\'re perfect for things like status codes, configuration options, or API endpoints where you want to limit values to a specific set.',
    },
    {
      id: 'as-const',
      term: 'as const',
      definition: '`as const` is a TypeScript assertion that makes a value\'s type as narrow as possible. Instead of inferring `string`, it infers the exact literal type. This is useful when you want TypeScript to remember the exact value.',
      syntax: 'const value = "text" as const;',
      example: {
        code: 'const colors = ["red", "green", "blue"] as const;\n// Type is: readonly ["red", "green", "blue"]\n// Not: string[]\n\nlet color = colors[0];  // Type is "red", not string',
        explanation: 'Without `as const`, TypeScript would infer `string[]`. With `as const`, it infers a tuple of literal types.',
      },
      whyItMatters: '`as const` helps you create more precise types without manually writing out literal unions. It\'s especially useful for configuration objects or constants where you want the exact values preserved.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Literal Types?',
      content: `# Specific Values as Types

A **literal type** is a type that represents a **specific value**, not just any string or number:

\`\`\`typescript
let status: "success" | "error" = "success";
// Only these two exact strings are allowed!
\`\`\`

This is more restrictive than \`string\` - it must be exactly one of those values.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Literal Type Syntax',
      content: `# String and Number Literals`,
      codeExample: {
        code: `// String literals
let direction: "up" | "down" | "left" | "right" = "up";

// Number literals
let dice: 1 | 2 | 3 | 4 | 5 | 6 = 3;

// Combined with unions
function setStatus(status: "loading" | "success" | "error") {
  console.log(status);
}

setStatus("success");  // OK
setStatus("pending");  // Error! Not in the union`,
        language: 'typescript',
        highlight: [2, 5, 8],
      },
    },
    {
      id: 'step-3-as-const',
      order: 3,
      type: 'instruction',
      title: 'The as const Assertion',
      content: `# Making Types More Specific

\`as const\` makes TypeScript infer the most specific type possible:`,
      codeExample: {
        code: `// Without as const: type is string
let color = "red";

// With as const: type is "red" (literal)
let color2 = "red" as const;

// Arrays with as const
const colors = ["red", "green", "blue"] as const;
// Type is: readonly ["red", "green", "blue"]
// Not: string[]`,
        language: 'typescript',
        highlight: [5, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create Literal Types',
      instructions: `Create a variable \`theme\` that can only be \`"light"\` or \`"dark"\`.
Set it to \`"light"\`.`,
      starterCode: `// Create theme variable

`,
      solutionCode: `// Create theme variable
let theme: "light" | "dark" = "light";`,
      testCases: [
        {
          id: 'test-1',
          description: 'theme should be "light"',
          testCode: `if (theme !== "light") throw new Error('theme should be "light"');`,
        },
      ],
      hints: [
        'Use literal types: "light" | "dark"',
        'Set it to "light"',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Function with Literal Types',
      instructions: `Create a function \`logLevel\` that:
- Takes a parameter \`level\` of type \`"info" | "warn" | "error"\`
- Returns a string
- Returns \`"Level: " + level\``,
      starterCode: `// Create the logLevel function

`,
      solutionCode: `// Create the logLevel function
function logLevel(level: "info" | "warn" | "error"): string {
  return "Level: " + level;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'logLevel("info") should return "Level: info"',
          testCode: `if (logLevel("info") !== "Level: info") throw new Error('logLevel("info") should return "Level: info"');`,
        },
        {
          id: 'test-2',
          description: 'logLevel("error") should return "Level: error"',
          testCode: `if (logLevel("error") !== "Level: error") throw new Error('logLevel("error") should return "Level: error"');`,
        },
      ],
      hints: [
        'Use literal union: "info" | "warn" | "error"',
        'Concatenate "Level: " with the level parameter',
      ],
    },
    {
      id: 'step-6-as-const-exercise',
      order: 6,
      type: 'code-exercise',
      title: 'Use as const',
      instructions: `Create a constant \`apiUrl\` using \`as const\`:
- Set it to the string \`"https://api.example.com"\`
- Use \`as const\` to make it a literal type`,
      starterCode: `// Create apiUrl with as const

`,
      solutionCode: `// Create apiUrl with as const
const apiUrl = "https://api.example.com" as const;`,
      testCases: [
        {
          id: 'test-1',
          description: 'apiUrl should be "https://api.example.com"',
          testCode: `if (apiUrl !== "https://api.example.com") throw new Error('apiUrl should be "https://api.example.com"');`,
        },
      ],
      hints: [
        'Use: const variable = "value" as const',
        'The type will be the literal string, not just string',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the difference between `string` and `"success" | "error"`?',
      options: [
        {
          id: 'a',
          text: 'They are the same',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '`string` allows any string, while `"success" | "error"` only allows those two exact values',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '`string` is faster',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Literal types don\'t exist in TypeScript',
          isCorrect: false,
        },
      ],
      explanation: 'Literal types are more restrictive than general types. `string` allows any string value, while `"success" | "error"` only allows those two specific strings. This gives you better type safety and autocomplete.',
    },
  ],
}



