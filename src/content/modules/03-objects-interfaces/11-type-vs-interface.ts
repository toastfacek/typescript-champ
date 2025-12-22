import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '11-type-vs-interface',
  slug: 'type-vs-interface',
  title: 'Type vs Interface',
  description: 'Understand when to use type aliases vs interfaces.',
  order: 11,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['10-optional-readonly'],
  tags: ['types', 'interfaces', 'best-practices'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Two Ways to Define Types',
      content: `# Type Aliases vs Interfaces

You've seen \`interface\`. Now meet \`type\` aliases!

Both can describe object shapes, but they have different strengths. Let's explore when to use each.`,
    },
    {
      id: 'step-2-type-syntax',
      order: 2,
      type: 'instruction',
      title: 'Type Alias Syntax',
      content: `# The \`type\` Keyword

Type aliases use the \`type\` keyword and \`=\`:`,
      codeExample: {
        code: `// Type alias for an object
type User = {
  name: string;
  email: string;
};

// Interface (for comparison)
interface UserInterface {
  name: string;
  email: string;
}

// Both work the same way:
let user1: User = { name: "Alice", email: "alice@example.com" };
let user2: UserInterface = { name: "Bob", email: "bob@example.com" };`,
        language: 'typescript',
        highlight: [2, 8],
      },
    },
    {
      id: 'step-3-type-only',
      order: 3,
      type: 'instruction',
      title: 'Type-Only Features',
      content: `# What Types Can Do That Interfaces Can't

Type aliases can represent more than just objects:`,
      codeExample: {
        code: `// Union types - can only be done with type
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

// Tuple types
type Coordinate = [number, number];

// Function types (cleaner with type)
type Formatter = (value: string) => string;

// Using them:
let status: Status = "pending";
let id: ID = 123;
let point: Coordinate = [10, 20];
let format: Formatter = (s) => s.toUpperCase();`,
        language: 'typescript',
        highlight: [2, 3, 6, 9],
      },
    },
    {
      id: 'step-4-interface-only',
      order: 4,
      type: 'instruction',
      title: 'Interface-Only Features',
      content: `# What Interfaces Can Do

Interfaces can be extended and merged:`,
      codeExample: {
        code: `// Interfaces can extend each other
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Declaration merging (interfaces only!)
interface Window {
  title: string;
}

interface Window {
  count: number;
}

// Now Window has both title AND count
// This is useful for extending third-party types`,
        language: 'typescript',
        highlight: [6, 11, 15],
      },
    },
    {
      id: 'step-5-exercise-1',
      order: 5,
      type: 'code-exercise',
      title: 'Use Type for Union',
      instructions: `Create a type alias called \`Theme\` that can be one of:
- "light"
- "dark"
- "system"

Then create a variable \`currentTheme\` of type \`Theme\` set to "dark".`,
      starterCode: `// Create the Theme type alias

// Create currentTheme variable
`,
      solutionCode: `// Create the Theme type alias
type Theme = "light" | "dark" | "system";

// Create currentTheme variable
let currentTheme: Theme = "dark";`,
      testCases: [
        {
          id: 'test-1',
          description: 'currentTheme should be "dark"',
          testCode: `if (currentTheme !== "dark") throw new Error('currentTheme should be "dark"');`,
        },
      ],
      hints: [
        'Use: type Theme = "light" | "dark" | "system"',
        'The | symbol means "or"',
        'This is called a union type',
      ],
    },
    {
      id: 'step-6-guidelines',
      order: 6,
      type: 'instruction',
      title: 'When to Use Which',
      content: `# Practical Guidelines

**Use \`interface\` when:**
- Defining object shapes that might be extended
- Working with classes
- You want declaration merging

**Use \`type\` when:**
- Creating union types (\`A | B\`)
- Creating tuple types
- Creating aliases for primitives or complex types
- You need intersections (\`A & B\`)

**Rule of thumb:** Start with \`interface\` for objects, use \`type\` for everything else.`,
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'Which can ONLY be done with a type alias, not an interface?',
      options: [
        {
          id: 'a',
          text: 'Define an object shape',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Create a union like `"yes" | "no"`',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Extend another type',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Use with functions',
          isCorrect: false,
        },
      ],
      explanation: 'Union types (using |) can only be created with type aliases. Interfaces are specifically for describing object shapes and can\'t represent "this OR that" directly.',
    },
  ],
}
