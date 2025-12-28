import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '19-discriminated-unions',
  slug: 'discriminated-unions',
  title: 'Discriminated Unions',
  description: 'Use tagged unions for type-safe state management.',
  order: 19,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['18-type-guards'],
  tags: ['types', 'unions', 'advanced'],
  keyConcepts: [
    {
      id: 'discriminated-union',
      term: 'Discriminated Union',
      definition: 'A discriminated union (also called a tagged union) is a union type where each member has a common property (the "discriminant") with a unique literal value. This allows TypeScript to narrow the type based on that property, making it safe to access type-specific properties.',
      syntax: 'type Union = { type: "A"; propA: ... } | { type: "B"; propB: ... }',
      example: {
        code: 'type Result =\n  | { type: "success"; data: string }\n  | { type: "error"; message: string };\n\nfunction handle(result: Result) {\n  if (result.type === "success") {\n    // TypeScript knows result.data exists\n    console.log(result.data);\n  } else {\n    // TypeScript knows result.message exists\n    console.log(result.message);\n  }\n}',
        explanation: 'Each member of the union has a `type` property with a unique literal value. TypeScript uses this to narrow the type, so you can safely access `data` when type is "success" and `message` when type is "error".',
      },
      whyItMatters: 'Discriminated unions provide a type-safe way to handle different states or variants. They\'re perfect for API responses, state machines, or any situation where you have multiple related but different shapes of data. TypeScript ensures you handle all cases.',
    },
    {
      id: 'exhaustive-checking',
      term: 'Exhaustive Checking',
      definition: 'Exhaustive checking means TypeScript ensures you handle all possible cases in a discriminated union. If you use a switch statement with all cases, TypeScript knows you\'ve covered everything. If you add a new case to the union, TypeScript will error until you handle it.',
      syntax: 'switch (value.type) { case "A": ... case "B": ... default: ... }',
      example: {
        code: 'type Status = { type: "loading" } | { type: "success"; data: string } | { type: "error"; msg: string };\n\nfunction handle(status: Status) {\n  switch (status.type) {\n    case "loading":\n      return "Loading...";\n    case "success":\n      return status.data;\n    case "error":\n      return status.msg;\n    default:\n      const _exhaustive: never = status;\n      return "Unknown";\n  }\n}',
        explanation: 'The switch statement handles all cases. The `default` case with `never` ensures TypeScript errors if a new case is added to the union but not handled.',
      },
      whyItMatters: 'Exhaustive checking prevents bugs by ensuring you handle all possible states. If you add a new variant to your union, TypeScript will force you to update all code that uses it, preventing runtime errors from unhandled cases.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Discriminated Unions?',
      content: `# Tagged Unions

A **discriminated union** is a union type where each member has a **common property** (called a "discriminant") with a unique value. This lets TypeScript narrow types automatically:

\`\`\`typescript
type Result = 
  | { type: "success"; data: string }
  | { type: "error"; message: string };
\`\`\`

The \`type\` property is the discriminant - it tells TypeScript which variant you're working with.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Discriminated Union Syntax',
      content: `# Creating Tagged Unions`,
      codeExample: {
        code: `// Each member has a "type" property with unique literal
type ApiResponse = 
  | { type: "loading" }
  | { type: "success"; data: User[] }
  | { type: "error"; message: string };

function handleResponse(response: ApiResponse) {
  if (response.type === "success") {
    // TypeScript knows response.data exists
    console.log(response.data);
  } else if (response.type === "error") {
    // TypeScript knows response.message exists
    console.log(response.message);
  }
}`,
        language: 'typescript',
        highlight: [2, 3, 4, 5, 8, 11],
      },
    },
    {
      id: 'step-3-switch',
      order: 3,
      type: 'instruction',
      title: 'Switch Statements',
      content: `# Exhaustive Checking

Switch statements work great with discriminated unions:`,
      codeExample: {
        code: `type Status = 
  | { type: "idle" }
  | { type: "loading" }
  | { type: "ready"; value: number };

function process(status: Status): string {
  switch (status.type) {
    case "idle":
      return "Waiting...";
    case "loading":
      return "Loading...";
    case "ready":
      // TypeScript knows status.value exists here
      return \`Ready: \${status.value}\`;
  }
}`,
        language: 'typescript',
        highlight: [8, 10, 12, 13],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Discriminated Union',
      instructions: `Create a discriminated union type \`Result\` with two variants:
1. \`{ type: "success"; value: number }\`
2. \`{ type: "error"; message: string }\`

Then create a function \`getValue\` that takes a \`Result\` and returns a string:
- If type is "success", return "Value: " + value
- If type is "error", return "Error: " + message`,
      starterCode: `// Define the Result type

// Create the getValue function

`,
      solutionCode: `// Define the Result type
type Result = 
  | { type: "success"; value: number }
  | { type: "error"; message: string };

// Create the getValue function
function getValue(result: Result): string {
  if (result.type === "success") {
    return "Value: " + result.value;
  } else {
    return "Error: " + result.message;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getValue({ type: "success", value: 42 }) should return "Value: 42"',
          testCode: `if (getValue({ type: "success", value: 42 }) !== "Value: 42") throw new Error('Should return "Value: 42"');`,
        },
        {
          id: 'test-2',
          description: 'getValue({ type: "error", message: "Not found" }) should return "Error: Not found"',
          testCode: `if (getValue({ type: "error", message: "Not found" }) !== "Error: Not found") throw new Error('Should return "Error: Not found"');`,
        },
      ],
      hints: [
        'Use type: "success" | "error" as the discriminant',
        'Check result.type to narrow the type',
        'Access result.value when type is "success"',
        'Access result.message when type is "error"',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Use Switch Statement',
      instructions: `Create a discriminated union \`Action\` with three variants:
- \`{ type: "increment"; amount: number }\`
- \`{ type: "decrement"; amount: number }\`
- \`{ type: "reset" }\`

Create a function \`applyAction\` that takes a \`number\` (current value) and an \`Action\`, and returns a number:
- Use a switch statement
- "increment" adds amount
- "decrement" subtracts amount
- "reset" returns 0`,
      starterCode: `// Define the Action type

// Create the applyAction function

`,
      solutionCode: `// Define the Action type
type Action = 
  | { type: "increment"; amount: number }
  | { type: "decrement"; amount: number }
  | { type: "reset" };

// Create the applyAction function
function applyAction(current: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return current + action.amount;
    case "decrement":
      return current - action.amount;
    case "reset":
      return 0;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'applyAction(10, { type: "increment", amount: 5 }) should return 15',
          testCode: `if (applyAction(10, { type: "increment", amount: 5 }) !== 15) throw new Error('Should return 15');`,
        },
        {
          id: 'test-2',
          description: 'applyAction(10, { type: "decrement", amount: 3 }) should return 7',
          testCode: `if (applyAction(10, { type: "decrement", amount: 3 }) !== 7) throw new Error('Should return 7');`,
        },
        {
          id: 'test-3',
          description: 'applyAction(10, { type: "reset" }) should return 0',
          testCode: `if (applyAction(10, { type: "reset" }) !== 0) throw new Error('Should return 0');`,
        },
      ],
      hints: [
        'Use switch (action.type)',
        'Each case handles one variant',
        'Access action.amount in increment/decrement cases',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Discriminated Union',
      instructions: 'Fill in the missing parts.',
      codeTemplate: `type Response = 
  | { type: "{{BLANK_1}}"; data: string }
  | { type: "{{BLANK_2}}"; error: string };

function handle(response: Response) {
  if (response.type === "{{BLANK_1}}") {
    return response.{{BLANK_3}};
  } else {
    return response.{{BLANK_4}};
  }
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'literal',
          correctAnswers: ['success'],
          caseSensitive: true,
          hint: 'The positive case...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'literal',
          correctAnswers: ['error'],
          caseSensitive: true,
          hint: 'The negative case...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'property',
          correctAnswers: ['data'],
          caseSensitive: true,
          hint: 'Property available when type is success...',
        },
        {
          id: 'BLANK_4',
          placeholder: 'property',
          correctAnswers: ['error'],
          caseSensitive: true,
          hint: 'Property available when type is error...',
        },
      ],
      hints: [
        'Think about common response patterns',
        'Each variant has different properties',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What makes a discriminated union different from a regular union?',
      options: [
        {
          id: 'a',
          text: 'Discriminated unions are faster',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Discriminated unions have a common property with unique literal values that TypeScript can use to narrow types',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Discriminated unions can only have two members',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Discriminated unions don\'t work with switch statements',
          isCorrect: false,
        },
      ],
      explanation: 'Discriminated unions have a common property (like `type`) where each member has a unique literal value. This allows TypeScript to automatically narrow the type when you check that property, making it safe to access type-specific properties.',
    },
  ],
}




