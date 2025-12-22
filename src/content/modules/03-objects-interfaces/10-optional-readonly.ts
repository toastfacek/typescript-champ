import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '10-optional-readonly',
  slug: 'optional-readonly',
  title: 'Optional & Readonly',
  description: 'Control which properties are required and which can\'t be changed.',
  order: 10,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['09-interfaces'],
  tags: ['interfaces', 'optional', 'readonly'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Property Modifiers',
      content: `# Fine-Tuning Your Types

Not all properties are created equal:
- Some properties are **optional** - they might not exist
- Some properties are **readonly** - they can't be changed after creation

TypeScript gives you tools for both!`,
    },
    {
      id: 'step-2-optional',
      order: 2,
      type: 'instruction',
      title: 'Optional Properties',
      content: `# Making Properties Optional

Add \`?\` after the property name:`,
      codeExample: {
        code: `interface UserProfile {
  username: string;      // Required
  email: string;         // Required
  bio?: string;          // Optional
  website?: string;      // Optional
}

// Valid - only required properties
let user1: UserProfile = {
  username: "coder123",
  email: "coder@example.com"
};

// Valid - with optional properties
let user2: UserProfile = {
  username: "developer",
  email: "dev@example.com",
  bio: "I love TypeScript!",
  website: "https://example.com"
};`,
        language: 'typescript',
        highlight: [4, 5],
      },
    },
    {
      id: 'step-3-readonly',
      order: 3,
      type: 'instruction',
      title: 'Readonly Properties',
      content: `# Preventing Changes

Add \`readonly\` before the property name:`,
      codeExample: {
        code: `interface Config {
  readonly apiKey: string;
  readonly version: number;
  debug: boolean;  // This can be changed
}

let config: Config = {
  apiKey: "secret-key-123",
  version: 1,
  debug: true
};

// This works:
config.debug = false;

// This causes an error:
// config.apiKey = "new-key";  // Error! Cannot assign to 'apiKey'`,
        language: 'typescript',
        highlight: [2, 3],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Optional Properties Practice',
      instructions: `Create an interface called \`BlogPost\` with:
- \`title\` (string) - required
- \`content\` (string) - required
- \`author\` (string) - optional
- \`tags\` (string) - optional

Then create a \`post\` variable with just title and content.`,
      starterCode: `// Create the BlogPost interface

// Create a post with only required properties
`,
      solutionCode: `// Create the BlogPost interface
interface BlogPost {
  title: string;
  content: string;
  author?: string;
  tags?: string;
}

// Create a post with only required properties
let post: BlogPost = {
  title: "Learning TypeScript",
  content: "TypeScript is awesome!"
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'post should have a title',
          testCode: `if (typeof post.title !== 'string') throw new Error('post.title should be a string');`,
        },
        {
          id: 'test-2',
          description: 'post should have content',
          testCode: `if (typeof post.content !== 'string') throw new Error('post.content should be a string');`,
        },
        {
          id: 'test-3',
          description: 'post.author should be optional (undefined is OK)',
          testCode: `if (post.author !== undefined && typeof post.author !== 'string') throw new Error('post.author should be string or undefined');`,
        },
      ],
      hints: [
        'Use ? for optional properties: author?: string',
        'You only need to provide title and content',
        'Optional properties can be omitted entirely',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Readonly Properties Practice',
      instructions: `Create an interface called \`BankAccount\` with:
- \`accountNumber\` (string) - readonly
- \`owner\` (string) - readonly
- \`balance\` (number) - can be modified

Create an \`account\` variable and set balance to 1000.`,
      starterCode: `// Create the BankAccount interface

// Create an account
`,
      solutionCode: `// Create the BankAccount interface
interface BankAccount {
  readonly accountNumber: string;
  readonly owner: string;
  balance: number;
}

// Create an account
let account: BankAccount = {
  accountNumber: "1234-5678",
  owner: "Alice",
  balance: 1000
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'account.balance should be 1000',
          testCode: `if (account.balance !== 1000) throw new Error('account.balance should be 1000');`,
        },
        {
          id: 'test-2',
          description: 'account should have an accountNumber',
          testCode: `if (typeof account.accountNumber !== 'string') throw new Error('account.accountNumber should be a string');`,
        },
        {
          id: 'test-3',
          description: 'account should have an owner',
          testCode: `if (typeof account.owner !== 'string') throw new Error('account.owner should be a string');`,
        },
      ],
      hints: [
        'Use readonly before the property name: readonly accountNumber: string',
        'balance should NOT be readonly',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Interface',
      instructions: 'Fill in the modifiers to make id readonly and nickname optional.',
      codeTemplate: `interface Player {
  {{BLANK_1}} id: number;
  name: string;
  nickname{{BLANK_2}} string;
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'modifier',
          correctAnswers: ['readonly'],
          caseSensitive: true,
          hint: 'What keyword prevents changes?',
        },
        {
          id: 'BLANK_2',
          placeholder: 'symbol',
          correctAnswers: ['?:'],
          caseSensitive: true,
          hint: 'What makes a property optional?',
        },
      ],
      hints: [
        'readonly goes before the property name',
        '? goes after the property name, before the colon',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What\'s the difference between `name?: string` and `name: string | undefined`?',
      options: [
        {
          id: 'a',
          text: 'They are exactly the same',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Optional (?) allows omitting the property entirely',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'The union type is faster',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Optional only works with strings',
          isCorrect: false,
        },
      ],
      explanation: 'With `name?: string`, you can completely leave out the property. With `name: string | undefined`, you must include the property but can set it to undefined. Subtle but important!',
    },
  ],
}
