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
  keyConcepts: [
    {
      id: 'type-aliases',
      term: 'Type Aliases',
      definition: 'Type aliases create a new name for an existing type. They can represent object shapes, unions, intersections, primitives, and more. Type aliases are more flexible than interfaces and can represent any TypeScript type.',
      syntax: 'type AliasName = existingType;',
      example: {
        code: '// Object type\ntype User = {\n  name: string;\n  age: number;\n};\n\n// Union type\ntype ID = string | number;\n\n// Complex type\ntype EventHandler = (event: Event) => void;',
        explanation: 'Type aliases can represent objects (like `User`), unions (like `ID`), function types (like `EventHandler`), and many other type structures. They\'re very versatile.',
      },
      whyItMatters: 'Type aliases give you flexibility to create custom names for any type. They\'re especially useful for unions, intersections, and complex types that interfaces can\'t represent.',
    },
    {
      id: 'interface-declaration-merging',
      term: 'Interface Declaration Merging',
      definition: 'When you declare an interface with the same name multiple times, TypeScript automatically merges them into a single interface. This is called declaration merging. All properties from all declarations are combined.',
      syntax: 'interface Name { prop1: type; }\ninterface Name { prop2: type; }  // Merged!',
      example: {
        code: '// First declaration\ninterface Window {\n  title: string;\n}\n\n// Second declaration - automatically merged\ninterface Window {\n  width: number;\n}\n\n// Result: Window has both title AND width\nlet win: Window = { title: "My App", width: 800 };',
        explanation: 'Both `Window` declarations are merged into one. The final `Window` interface has both `title` and `width` properties. This is unique to interfaces - type aliases cannot be merged.',
      },
      whyItMatters: 'Declaration merging lets you extend interfaces across multiple files or modules. This is useful for library types where you want to add properties to existing interfaces.',
    },
    {
      id: 'when-to-use-each',
      term: 'When to Use Each',
      definition: 'Use interfaces for object shapes that might need extension or merging. Use type aliases for unions, intersections, primitives, and complex types. For simple object shapes, interfaces are preferred, but types work too. The choice often comes down to team preference and specific needs.',
      syntax: 'interface for objects | type for unions/complex types',
      example: {
        code: '// Interface - good for objects\ninterface User {\n  name: string;\n}\n\n// Type - good for unions\ntype Status = "active" | "inactive" | "pending";\n\n// Type - good for intersections\ntype AdminUser = User & { permissions: string[] };',
        explanation: 'Interfaces excel at object shapes. Types excel at unions, intersections, and other complex type operations. Choose based on what you\'re modeling.',
      },
      whyItMatters: 'Knowing when to use interfaces vs types helps you write idiomatic TypeScript. The right choice makes your code more maintainable and easier for other developers to understand.',
    },
  ],
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
