import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '23-utility-types',
  slug: 'utility-types',
  title: 'Utility Types',
  description: 'Use built-in utility types to transform types.',
  order: 23,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['22-constraints'],
  tags: ['generics', 'utility-types', 'advanced'],
  keyConcepts: [
    {
      id: 'utility-type',
      term: 'Utility Type',
      definition: 'Utility types are built-in TypeScript types that transform one type into another. They\'re generic types that take a type as input and produce a modified version. Common examples include `Partial<T>`, `Required<T>`, `Pick<T, K>`, and `Omit<T, K>`.',
      syntax: 'Partial<Type>, Required<Type>, Pick<Type, Keys>, Omit<Type, Keys>',
      example: {
        code: 'interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Make all properties optional\nlet partial: Partial<User> = { name: "Alice" };\n\n// Pick only specific properties\nlet nameAge: Pick<User, "name" | "age"> = { name: "Alice", age: 25 };',
        explanation: '`Partial<User>` makes all properties optional. `Pick<User, "name" | "age">` creates a type with only name and age properties.',
      },
      whyItMatters: 'Utility types let you create new types from existing ones without rewriting them. This is powerful for creating variations of types (like making properties optional for updates) or selecting specific properties.',
    },
    {
      id: 'partial-required',
      term: 'Partial and Required',
      definition: '`Partial<T>` makes all properties of T optional. `Required<T>` makes all properties of T required (removes optional markers). These are opposites - Partial adds `?` to all properties, Required removes all `?`.',
      syntax: 'Partial<Type>, Required<Type>',
      example: {
        code: 'interface User {\n  name: string;\n  age?: number;\n}\n\n// All optional\nlet partial: Partial<User> = {};\n\n// All required (even age)\nlet required: Required<User> = { name: "Alice", age: 25 };',
        explanation: '`Partial<User>` makes name optional too. `Required<User>` makes age required even though it was optional in the original interface.',
      },
      whyItMatters: 'These are perfect for update operations. When updating a user, you might only want to change some fields, so `Partial<User>` is ideal. When creating a user, you might want all fields required, so `Required<User>` ensures completeness.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Utility Types?',
      content: `# Built-in Type Transformations

TypeScript provides **utility types** that transform one type into another:

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;  // All properties optional
\`\`\`

These are generic types that modify existing types.`,
    },
    {
      id: 'step-2-partial-required',
      order: 2,
      type: 'instruction',
      title: 'Partial and Required',
      content: `# Making Properties Optional/Required`,
      codeExample: {
        code: `interface User {
  name: string;
  age: number;
  email?: string;  // Already optional
}

// Partial: makes ALL properties optional
type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

// Required: makes ALL properties required
type RequiredUser = Required<User>;
// { name: string; age: number; email: string; }`,
        language: 'typescript',
        highlight: [7, 10],
      },
    },
    {
      id: 'step-3-pick-omit',
      order: 3,
      type: 'instruction',
      title: 'Pick and Omit',
      content: `# Selecting Properties`,
      codeExample: {
        code: `interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

// Pick: select specific properties
type PublicUser = Pick<User, "name" | "email">;
// { name: string; email: string; }

// Omit: exclude specific properties
type SafeUser = Omit<User, "password">;
// { name: string; age: number; email: string; }`,
        language: 'typescript',
        highlight: [8, 11],
      },
    },
    {
      id: 'step-4-record',
      order: 4,
      type: 'instruction',
      title: 'Record Type',
      content: `# Creating Object Types

\`Record<K, V>\` creates an object type with keys of type K and values of type V:`,
      codeExample: {
        code: `// Record<string, number> is like { [key: string]: number }
type Scores = Record<string, number>;
// { [key: string]: number }

let scores: Scores = {
  "Alice": 95,
  "Bob": 87,
  "Charlie": 92
};

// With specific keys
type Status = Record<"loading" | "success" | "error", boolean>;
// { loading: boolean; success: boolean; error: boolean }`,
        language: 'typescript',
        highlight: [2, 3, 12],
      },
    },
    {
      id: 'step-5-exercise-1',
      order: 5,
      type: 'code-exercise',
      title: 'Use Partial',
      instructions: `Given this interface:
\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
}
\`\`\`

Create a variable \`update\` of type \`Partial<User>\` with only \`name\` set to \`"Bob"\`.`,
      starterCode: `interface User {
  name: string;
  age: number;
  email: string;
}

// Create update variable

`,
      solutionCode: `interface User {
  name: string;
  age: number;
  email: string;
}

// Create update variable
let update: Partial<User> = {
  name: "Bob"
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'update.name should be "Bob"',
          testCode: `if (update.name !== "Bob") throw new Error('update.name should be "Bob"');`,
        },
      ],
      hints: [
        'Use: let update: Partial<User> = { name: "Bob" }',
        'Partial makes all properties optional',
      ],
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Use Pick',
      instructions: `Given the same \`User\` interface, create a type \`PublicProfile\` using \`Pick\` that only includes \`name\` and \`email\`.

Then create a variable \`profile\` of type \`PublicProfile\` with name: "Alice" and email: "alice@example.com".`,
      starterCode: `interface User {
  name: string;
  age: number;
  email: string;
}

// Create PublicProfile type

// Create profile variable

`,
      solutionCode: `interface User {
  name: string;
  age: number;
  email: string;
}

// Create PublicProfile type
type PublicProfile = Pick<User, "name" | "email">;

// Create profile variable
let profile: PublicProfile = {
  name: "Alice",
  email: "alice@example.com"
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'profile.name should be "Alice"',
          testCode: `if (profile.name !== "Alice") throw new Error('profile.name should be "Alice"');`,
        },
        {
          id: 'test-2',
          description: 'profile.email should be "alice@example.com"',
          testCode: `if (profile.email !== "alice@example.com") throw new Error('profile.email should be "alice@example.com"');`,
        },
      ],
      hints: [
        'Use: type PublicProfile = Pick<User, "name" | "email">',
        'Pick selects specific properties',
      ],
    },
    {
      id: 'step-7-fill-blank',
      order: 7,
      type: 'fill-in-blank',
      title: 'Complete the Utility Types',
      instructions: 'Fill in the missing utility types.',
      codeTemplate: `interface Config {
  host: string;
  port: number;
  secure?: boolean;
}

// Make all properties required
type RequiredConfig = {{BLANK_1}}<Config>;

// Exclude the secure property
type BasicConfig = {{BLANK_2}}<Config, "secure">;`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'utility type',
          correctAnswers: ['Required'],
          caseSensitive: true,
          hint: 'Makes all properties required...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'utility type',
          correctAnswers: ['Omit'],
          caseSensitive: true,
          hint: 'Excludes specific properties...',
        },
      ],
      hints: [
        'Required makes all properties required',
        'Omit removes specific properties',
      ],
    },
    {
      id: 'step-8-quiz',
      order: 8,
      type: 'quiz',
      question: 'What does `Pick<User, "name" | "email">` create?',
      options: [
        {
          id: 'a',
          text: 'A type with only name and email properties from User',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'A type with all User properties except name and email',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'A type that makes name and email optional',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'A type that requires name and email',
          isCorrect: false,
        },
      ],
      explanation: '`Pick<T, K>` creates a new type with only the properties specified in K. So `Pick<User, "name" | "email">` creates a type with just name and email from User.',
    },
  ],
}



