import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-type-inference',
  slug: 'type-inference',
  title: 'Type Inference',
  description: 'Learn when TypeScript can figure out types automatically.',
  order: 3,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['02-basic-types'],
  tags: ['basics', 'types', 'inference'],
  keyConcepts: [
    {
      id: 'type-inference',
      term: 'Type Inference',
      definition: 'Type inference is TypeScript\'s ability to automatically figure out what type a variable should be based on the value you assign to it. When you write `let name = "Alice"`, TypeScript knows it\'s a string without you saying so.',
      syntax: 'let variable = value;  // TypeScript infers the type',
      example: {
        code: 'let message = "Hello";  // TypeScript infers: string\nlet count = 42;        // TypeScript infers: number\nlet isReady = true;    // TypeScript infers: boolean',
        explanation: 'TypeScript looks at the value and automatically determines the type. "Hello" is clearly text, so it\'s a string. 42 is clearly a number.',
      },
      whyItMatters: 'Type inference makes your code cleaner and faster to write. You don\'t need to type `: string` every time when TypeScript can figure it out. But you can still add types explicitly when needed for clarity or safety.',
    },
    {
      id: 'const-vs-let',
      term: 'const vs let',
      definition: '`const` creates a variable that cannot be reassigned (its value stays the same). `let` creates a variable that can be changed later. Use `const` when the value won\'t change, and `let` when it might.',
      syntax: 'const name = "Alice";  // Cannot change\nlet count = 0;        // Can change',
      example: {
        code: 'const pi = 3.14;  // This will never change\npi = 3.15;  // Error! Cannot reassign const\n\nlet score = 0;  // This can change\nscore = 100;   // This works!',
        explanation: '`const` is for values that stay the same (like constants, configuration, or values that shouldn\'t change). `let` is for values that might change (like counters, user input, or game state).',
      },
      whyItMatters: 'Using `const` by default helps prevent bugs - if you accidentally try to change something that shouldn\'t change, TypeScript will catch it. It also makes your code clearer about what can and can\'t change.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'TypeScript is Smart',
      content: `# Type Inference

Here's something cool: TypeScript can often **figure out types automatically**!

When you assign a value right away, TypeScript infers the type:`,
      codeExample: {
        code: `// These are equivalent:
let message: string = "Hello";
let message2 = "Hello";  // TypeScript knows this is a string!

// Same with numbers and booleans:
let count = 42;        // TypeScript infers: number
let isReady = true;    // TypeScript infers: boolean`,
        language: 'typescript',
        highlight: [3],
      },
    },
    {
      id: 'step-2-when-to-use',
      order: 2,
      type: 'instruction',
      title: 'When to Add Types',
      content: `# Best Practices

**Let TypeScript infer** when the value is obvious:
\`\`\`typescript
let name = "Alice";     // Clearly a string
let age = 25;           // Clearly a number
\`\`\`

**Add types explicitly** when:
- Declaring without a value
- The type isn't obvious
- You want to document the expected type

\`\`\`typescript
let username: string;   // No value yet, need the type
let data: unknown;      // Intentionally flexible
\`\`\``,
    },
    {
      id: 'step-3-exercise',
      order: 3,
      type: 'code-exercise',
      title: 'Practice Inference',
      instructions: `Create these variables **without** type annotations (let TypeScript infer them):
1. \`playerName\` set to \`"Hero"\`
2. \`lives\` set to \`3\`
3. \`isPlaying\` set to \`true\``,
      starterCode: `// Create the variables without type annotations


`,
      solutionCode: `// Create the variables without type annotations
let playerName = "Hero";
let lives = 3;
let isPlaying = true;`,
      testCases: [
        {
          id: 'test-1',
          description: 'playerName should be "Hero"',
          testCode: `if (playerName !== "Hero") throw new Error('playerName should be "Hero"');`,
        },
        {
          id: 'test-2',
          description: 'lives should be 3',
          testCode: `if (lives !== 3) throw new Error('lives should be 3');`,
        },
        {
          id: 'test-3',
          description: 'isPlaying should be true',
          testCode: `if (isPlaying !== true) throw new Error('isPlaying should be true');`,
        },
      ],
      hints: [
        'Just use: let variableName = value',
        'No colon or type needed when assigning immediately',
        'TypeScript figures it out!',
      ],
    },
    {
      id: 'step-4-quiz',
      order: 4,
      type: 'quiz',
      question: 'What type will TypeScript infer for: `let items = 5;`',
      options: [
        {
          id: 'a',
          text: 'any',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'number',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'int',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'undefined',
          isCorrect: false,
        },
      ],
      explanation: 'TypeScript sees `5` and infers the type as `number`. It\'s smart enough to understand what kind of value you\'re working with!',
    },
  ],
}
