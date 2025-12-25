import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '16-union-types',
  slug: 'union-types',
  title: 'Union Types',
  description: 'Combine multiple types into one flexible type.',
  order: 16,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['15-records-maps'],
  tags: ['types', 'unions', 'advanced'],
  keyConcepts: [
    {
      id: 'union-type',
      term: 'Union Type',
      definition: 'A union type allows a value to be one of several types. You create it using the pipe symbol `|` between types. For example, `string | number` means the value can be either a string OR a number.',
      syntax: 'type | type | type',
      example: {
        code: 'let id: string | number = "abc123";\nid = 42;  // Also valid!\n\nfunction printId(id: string | number) {\n  console.log(id);\n}',
        explanation: 'The variable `id` can hold either a string or a number. The function `printId` accepts either type as well.',
      },
      whyItMatters: 'Union types make your code more flexible. Instead of creating separate functions for strings and numbers, you can handle both with one function. This reduces code duplication and makes your APIs more versatile.',
    },
    {
      id: 'type-narrowing',
      term: 'Type Narrowing',
      definition: 'Type narrowing is TypeScript\'s ability to figure out the specific type within a union based on your code. When you check `typeof value === "string"`, TypeScript knows that inside that if block, the value must be a string.',
      syntax: 'if (typeof value === "string") { /* value is string here */ }',
      example: {
        code: 'function process(value: string | number) {\n  if (typeof value === "string") {\n    // TypeScript knows value is string here\n    return value.toUpperCase();\n  } else {\n    // TypeScript knows value is number here\n    return value * 2;\n  }\n}',
        explanation: 'Inside the `if` block, TypeScript narrows the type to `string`, so you can use string methods. In the `else` block, it\'s narrowed to `number`.',
      },
      whyItMatters: 'Type narrowing lets you safely use type-specific operations. Without it, TypeScript would complain because it doesn\'t know which type you have. Narrowing gives you the best of both worlds: flexibility and type safety.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Union Types?',
      content: `# Flexible Types

Sometimes a value can be **one of several types**. Union types let you express this:

\`\`\`typescript
let id: string | number = "abc123";
id = 42;  // Also valid!
\`\`\`

The \`|\` symbol means "or" - the value can be a string **OR** a number.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Union Type Syntax',
      content: `# Creating Union Types`,
      codeExample: {
        code: `// Union of two types
let value: string | number = "hello";
value = 42;  // OK

// Union of three types
let status: "loading" | "success" | "error" = "loading";

// Function parameters
function printId(id: string | number) {
  console.log(id);
}

printId("abc");   // OK
printId(123);     // OK
printId(true);    // Error!`,
        language: 'typescript',
        highlight: [2, 5, 8],
      },
    },
    {
      id: 'step-3-narrowing',
      order: 3,
      type: 'instruction',
      title: 'Type Narrowing',
      content: `# Narrowing Union Types

When you have a union type, TypeScript needs help figuring out which type you're working with. Use \`typeof\` checks:`,
      codeExample: {
        code: `function process(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toString();
  }
}`,
        language: 'typescript',
        highlight: [2, 3, 6],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Union Type Function',
      instructions: `Create a function \`formatValue\` that:
- Takes a parameter \`value\` of type \`string | number\`
- Returns a string
- If value is a string, return it as-is
- If value is a number, convert it to a string using \`.toString()\``,
      starterCode: `// Create the formatValue function

`,
      solutionCode: `// Create the formatValue function
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value;
  } else {
    return value.toString();
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'formatValue("hello") should return "hello"',
          testCode: `if (formatValue("hello") !== "hello") throw new Error('formatValue("hello") should return "hello"');`,
        },
        {
          id: 'test-2',
          description: 'formatValue(42) should return "42"',
          testCode: `if (formatValue(42) !== "42") throw new Error('formatValue(42) should return "42"');`,
        },
        {
          id: 'test-3',
          description: 'formatValue(0) should return "0"',
          testCode: `if (formatValue(0) !== "0") throw new Error('formatValue(0) should return "0"');`,
        },
      ],
      hints: [
        'Use typeof to check if value is "string"',
        'Return value directly if it\'s a string',
        'Use .toString() if it\'s a number',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Union Type Variable',
      instructions: `Create a variable \`userId\` that can be either a string or a number.
Set it to the string \`"user-123"\` first, then reassign it to the number \`456\`.`,
      starterCode: `// Create userId variable

`,
      solutionCode: `// Create userId variable
let userId: string | number = "user-123";
userId = 456;`,
      testCases: [
        {
          id: 'test-1',
          description: 'userId should be 456 (number)',
          testCode: `if (userId !== 456) throw new Error('userId should be 456');`,
        },
      ],
      hints: [
        'Use the union type syntax: string | number',
        'Assign "user-123" first, then 456',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Union Types',
      instructions: 'Fill in the missing union types.',
      codeTemplate: `function process(input: {{BLANK_1}}) {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input;
  }
}

let result: {{BLANK_2}} = process("hello");`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type',
          correctAnswers: ['string | number'],
          caseSensitive: true,
          hint: 'The function handles both strings and numbers...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'type',
          correctAnswers: ['number'],
          caseSensitive: true,
          hint: 'The function returns a number (length for strings, or the number itself)',
        },
      ],
      hints: [
        'Think about what types the function accepts',
        'What does the function return?',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `string | number` mean?',
      options: [
        {
          id: 'a',
          text: 'The value must be both a string and a number',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'The value can be either a string or a number',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'The value must be a string, then a number',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'The value cannot be a string or number',
          isCorrect: false,
        },
      ],
      explanation: 'Union types use `|` to mean "or". `string | number` means the value can be either a string OR a number, but not both at the same time.',
    },
  ],
}


