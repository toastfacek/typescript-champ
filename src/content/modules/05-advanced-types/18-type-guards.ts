import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '18-type-guards',
  slug: 'type-guards',
  title: 'Type Guards',
  description: 'Create custom functions to narrow types safely.',
  order: 18,
  estimatedMinutes: 14,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['17-literal-types'],
  tags: ['types', 'guards', 'advanced'],
  keyConcepts: [
    {
      id: 'type-guard',
      term: 'Type Guard',
      definition: 'A type guard is a function that checks if a value is of a certain type and returns a boolean. TypeScript uses the return type `value is Type` to narrow the type in the calling code. When the function returns true, TypeScript knows the value is that specific type.',
      syntax: 'function isType(value: unknown): value is Type { return ... }',
      example: {
        code: 'function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nlet data: unknown = "hello";\nif (isString(data)) {\n  // TypeScript knows data is string here\n  console.log(data.toUpperCase());\n}',
        explanation: 'The `isString` function checks if a value is a string. The return type `value is string` tells TypeScript to narrow the type when the function returns true.',
      },
      whyItMatters: 'Type guards let you create reusable type-checking logic. Instead of writing `typeof` checks everywhere, you can create a function once and use it anywhere. This makes your code cleaner and more maintainable.',
    },
    {
      id: 'typeof-instanceof',
      term: 'typeof and instanceof',
      definition: '`typeof` checks primitive types (string, number, boolean, etc.) and returns a string. `instanceof` checks if an object is an instance of a class. Both are built-in type guards that TypeScript understands automatically.',
      syntax: 'typeof value === "string"\nvalue instanceof ClassName',
      example: {
        code: 'if (typeof value === "string") {\n  // value is string\n}\n\nif (value instanceof Date) {\n  // value is Date\n}',
        explanation: '`typeof` works for primitives, `instanceof` works for objects and classes. TypeScript automatically narrows types after these checks.',
      },
      whyItMatters: 'These built-in checks are the foundation of type narrowing. They\'re fast, reliable, and TypeScript understands them perfectly. Most custom type guards use these internally.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Type Guards?',
      content: `# Narrowing Types Safely

Type guards are functions that check if a value is a specific type. TypeScript uses them to **narrow** types automatically:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}
\`\`\`

The \`value is string\` return type tells TypeScript: "if this returns true, the value is a string".`,
    },
    {
      id: 'step-2-builtin',
      order: 2,
      type: 'instruction',
      title: 'Built-in Type Guards',
      content: `# typeof and instanceof

TypeScript understands these built-in checks:`,
      codeExample: {
        code: `// typeof for primitives
function process(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }
  // TypeScript knows value is number here
  return value * 2;
}

// instanceof for objects
function formatDate(date: Date | string) {
  if (date instanceof Date) {
    // TypeScript knows date is Date here
    return date.toISOString();
  }
  // TypeScript knows date is string here
  return date;
}`,
        language: 'typescript',
        highlight: [3, 6, 12, 15],
      },
    },
    {
      id: 'step-3-custom',
      order: 3,
      type: 'instruction',
      title: 'Custom Type Guards',
      content: `# Creating Your Own Guards

Use the \`value is Type\` syntax:`,
      codeExample: {
        code: `interface User {
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "email" in value &&
    typeof (value as any).name === "string" &&
    typeof (value as any).email === "string"
  );
}

let data: unknown = { name: "Alice", email: "alice@example.com" };
if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.name);
}`,
        language: 'typescript',
        highlight: [7, 18],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Use typeof Guard',
      instructions: `Create a function \`doubleValue\` that:
- Takes a parameter \`value\` of type \`string | number\`
- Returns a string
- If value is a string, return it repeated twice (value + value)
- If value is a number, return it multiplied by 2 as a string

Use \`typeof\` to check the type.`,
      starterCode: `// Create the doubleValue function

`,
      solutionCode: `// Create the doubleValue function
function doubleValue(value: string | number): string {
  if (typeof value === "string") {
    return value + value;
  } else {
    return (value * 2).toString();
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'doubleValue("hi") should return "hihi"',
          testCode: `if (doubleValue("hi") !== "hihi") throw new Error('doubleValue("hi") should return "hihi"');`,
        },
        {
          id: 'test-2',
          description: 'doubleValue(5) should return "10"',
          testCode: `if (doubleValue(5) !== "10") throw new Error('doubleValue(5) should return "10"');`,
        },
      ],
      hints: [
        'Use typeof value === "string" to check',
        'For strings, concatenate: value + value',
        'For numbers, multiply by 2 and convert to string',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create a Custom Type Guard',
      instructions: `Create a type guard function \`isNumber\` that:
- Takes a parameter \`value\` of type \`unknown\`
- Returns \`value is number\`
- Checks if the value is a number using \`typeof\`

Then use it to check a variable \`data\` of type \`unknown\` set to \`42\`, and if it's a number, store it in a variable \`num\` of type \`number\`.`,
      starterCode: `// Create the isNumber type guard

// Use it to check data
let data: unknown = 42;

`,
      solutionCode: `// Create the isNumber type guard
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

// Use it to check data
let data: unknown = 42;
let num: number;
if (isNumber(data)) {
  num = data;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'num should be 42',
          testCode: `if (typeof num !== 'undefined' && num !== 42) throw new Error('num should be 42');`,
        },
      ],
      hints: [
        'Return type should be: value is number',
        'Check with: typeof value === "number"',
        'After the if check, TypeScript knows data is number',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Type Guard',
      instructions: 'Fill in the missing parts of the type guard.',
      codeTemplate: `function isString(value: unknown): {{BLANK_1}} {
  return {{BLANK_2}} value === "string";
}

let data: unknown = "hello";
if ({{BLANK_3}}(data)) {
  let str: string = data;
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'return type',
          correctAnswers: ['value is string'],
          caseSensitive: true,
          hint: 'The return type that tells TypeScript to narrow the type...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'operator',
          correctAnswers: ['typeof'],
          caseSensitive: true,
          hint: 'The operator that checks the type of a value...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'function name',
          correctAnswers: ['isString'],
          caseSensitive: true,
          hint: 'Call the type guard function...',
        },
      ],
      hints: [
        'Type guards return "value is Type"',
        'Use typeof to check types',
        'Call the function you just defined',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `value is string` mean in a type guard function?',
      options: [
        {
          id: 'a',
          text: 'It converts the value to a string',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'It tells TypeScript to narrow the type to string when the function returns true',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'It checks if the value is a string at runtime',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'It\'s the same as typeof value === "string"',
          isCorrect: false,
        },
      ],
      explanation: 'The `value is string` syntax is a type predicate that tells TypeScript\'s type system: "when this function returns true, treat the value as a string". It doesn\'t change runtime behavior, only type checking.',
    },
  ],
}




