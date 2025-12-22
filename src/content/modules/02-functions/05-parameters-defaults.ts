import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '05-parameters-defaults',
  slug: 'parameters-defaults',
  title: 'Parameters & Defaults',
  description: 'Master required, optional, and default parameters in functions.',
  order: 5,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['04-function-basics'],
  tags: ['functions', 'parameters'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Function Parameters',
      content: `# Required vs Optional Parameters

By default, all parameters in TypeScript are **required**. But sometimes you want parameters to be optional!

TypeScript gives you two ways to handle this:
- **Optional parameters** - marked with \`?\`
- **Default values** - provide a fallback value`,
    },
    {
      id: 'step-2-optional',
      order: 2,
      type: 'instruction',
      title: 'Optional Parameters',
      content: `# Making Parameters Optional

Add a \`?\` after the parameter name to make it optional:`,
      codeExample: {
        code: `// lastName is optional
function greet(firstName: string, lastName?: string): string {
  if (lastName) {
    return "Hello, " + firstName + " " + lastName + "!";
  }
  return "Hello, " + firstName + "!";
}

greet("Alice");           // "Hello, Alice!"
greet("Alice", "Smith");  // "Hello, Alice Smith!"`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-3-defaults',
      order: 3,
      type: 'instruction',
      title: 'Default Parameter Values',
      content: `# Default Values

Instead of making a parameter optional, you can give it a default value:`,
      codeExample: {
        code: `// greeting defaults to "Hello"
function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "!";
}

greet("Alice");              // "Hello, Alice!"
greet("Alice", "Hi");        // "Hi, Alice!"
greet("Alice", "Welcome");   // "Welcome, Alice!"`,
        language: 'typescript',
        highlight: [2],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Optional Parameter Practice',
      instructions: `Create a function called \`formatName\` that:
- Takes a required \`first\` parameter (string)
- Takes an optional \`last\` parameter (string)
- Returns the full name if last is provided, otherwise just first`,
      starterCode: `// Create your formatName function here

`,
      solutionCode: `// Create your formatName function here
function formatName(first: string, last?: string): string {
  if (last) {
    return first + " " + last;
  }
  return first;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'formatName("John") should return "John"',
          testCode: `if (formatName("John") !== "John") throw new Error('formatName("John") should return "John"');`,
        },
        {
          id: 'test-2',
          description: 'formatName("John", "Doe") should return "John Doe"',
          testCode: `if (formatName("John", "Doe") !== "John Doe") throw new Error('formatName("John", "Doe") should return "John Doe"');`,
        },
      ],
      hints: [
        'Use ? after the parameter name: last?: string',
        'Check if last exists with: if (last)',
        'Return different strings based on whether last exists',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Default Parameter Practice',
      instructions: `Create a function called \`power\` that:
- Takes a \`base\` number (required)
- Takes an \`exponent\` number with a default of \`2\`
- Returns base raised to the exponent

Hint: Use \`Math.pow(base, exponent)\` or \`base ** exponent\``,
      starterCode: `// Create your power function here

`,
      solutionCode: `// Create your power function here
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'power(3) should return 9 (3²)',
          testCode: `if (power(3) !== 9) throw new Error('power(3) should return 9');`,
        },
        {
          id: 'test-2',
          description: 'power(2, 3) should return 8 (2³)',
          testCode: `if (power(2, 3) !== 8) throw new Error('power(2, 3) should return 8');`,
        },
        {
          id: 'test-3',
          description: 'power(5, 1) should return 5',
          testCode: `if (power(5, 1) !== 5) throw new Error('power(5, 1) should return 5');`,
        },
      ],
      hints: [
        'Set default with: exponent: number = 2',
        'Use ** for exponentiation: base ** exponent',
        'When called with one argument, exponent will be 2',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Parameters',
      instructions: 'Fill in the blanks to create functions with optional and default parameters.',
      codeTemplate: `// Make 'excited' optional
function sayHello(name: string, excited{{BLANK_1}} boolean): string {
  return excited ? "Hello, " + name + "!" : "Hello, " + name;
}

// Give 'times' a default value of 1
function repeat(text: string, times: number {{BLANK_2}} 1): string {
  return text.repeat(times);
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'symbol',
          correctAnswers: ['?:'],
          caseSensitive: true,
          hint: 'What symbol makes a parameter optional?',
        },
        {
          id: 'BLANK_2',
          placeholder: 'operator',
          correctAnswers: ['='],
          caseSensitive: true,
          hint: 'What operator assigns a default value?',
        },
      ],
      hints: [
        'Optional parameters use ?: between name and type',
        'Default values use = after the type or after : type',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What\'s the difference between `name?: string` and `name: string = "Guest"`?',
      options: [
        {
          id: 'a',
          text: 'They are exactly the same',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Optional can be undefined, default always has a value',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Default is faster than optional',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Optional only works with strings',
          isCorrect: false,
        },
      ],
      explanation: 'With `name?: string`, if you don\'t pass a value, `name` is `undefined`. With `name: string = "Guest"`, if you don\'t pass a value, `name` is `"Guest"`. Default values are great when you want a fallback!',
    },
  ],
}
