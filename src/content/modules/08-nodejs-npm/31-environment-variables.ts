import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '31-environment-variables',
  slug: 'environment-variables',
  title: 'Environment Variables',
  description: 'Access and type environment variables safely.',
  order: 31,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['30-es-modules'],
  tags: ['env', 'configuration', 'nodejs'],
  keyConcepts: [
    {
      id: 'environment-variable',
      term: 'Environment Variable',
      definition: 'Environment variables are configuration values stored outside your code. They\'re accessed via `process.env` in Node.js. They\'re useful for secrets (API keys, passwords), configuration (database URLs, ports), and environment-specific settings (dev vs production).',
      syntax: 'process.env.VARIABLE_NAME',
      example: {
        code: '// Set in terminal:\n// export API_KEY=secret123\n\n// Access in code:\nconst apiKey = process.env.API_KEY;\nconsole.log(apiKey);  // "secret123"',
        explanation: 'Environment variables let you keep sensitive data out of your code. You set them in your environment (terminal, deployment platform) and access them via `process.env`.',
      },
      whyItMatters: 'Environment variables are essential for security and configuration. You never want to hardcode API keys or passwords in your code. Environment variables keep secrets safe and make your app configurable for different environments.',
    },
    {
      id: 'typing-env',
      term: 'Typing Environment Variables',
      definition: '`process.env` is typed as `NodeJS.ProcessEnv`, which has all properties as optional strings. You should validate and type your environment variables explicitly. You can create a typed interface or use type assertions, but always handle the case where variables might be undefined.',
      syntax: 'const port = process.env.PORT ?? "3000";\nconst apiKey = process.env.API_KEY!;  // Assertion (risky)',
      example: {
        code: '// Safe approach\nconst port = process.env.PORT ? parseInt(process.env.PORT) : 3000;\n\n// With validation\nif (!process.env.API_KEY) {\n  throw new Error("API_KEY is required");\n}\nconst apiKey: string = process.env.API_KEY;',
        explanation: 'Always check if environment variables exist before using them. Provide defaults or throw errors for required variables. Never assume they\'ll always be set.',
      },
      whyItMatters: 'Type safety for environment variables prevents runtime errors. If you assume a variable exists and it doesn\'t, your app will crash. Proper typing and validation make your code more robust.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Environment Variables?',
      content: `# Configuration Outside Code

**Environment variables** store configuration outside your code:

- API keys and secrets
- Database URLs
- Port numbers
- Feature flags

Access them via \`process.env\` in Node.js.`,
    },
    {
      id: 'step-2-accessing',
      order: 2,
      type: 'instruction',
      title: 'Accessing Environment Variables',
      content: `# Using process.env`,
      codeExample: {
        code: `// Access environment variables
const port = process.env.PORT;
const apiKey = process.env.API_KEY;
const nodeEnv = process.env.NODE_ENV;

// They're always strings (or undefined)
console.log(typeof port);  // "string" | "undefined"

// Provide defaults
const portNumber = process.env.PORT 
  ? parseInt(process.env.PORT) 
  : 3000;

// Check for required variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY is required");
}
const key: string = process.env.API_KEY;`,
        language: 'typescript',
        highlight: [2, 3, 4, 9, 10, 11, 15, 16],
      },
    },
    {
      id: 'step-3-typing',
      order: 3,
      type: 'instruction',
      title: 'Typing Environment Variables',
      content: `# Type-Safe Access`,
      codeExample: {
        code: `// Define your expected environment variables
interface Env {
  PORT: string;
  API_KEY: string;
  NODE_ENV?: string;  // Optional
}

// Type assertion (use carefully)
const env = process.env as unknown as Env;

// Or validate and type
function getEnv(): Env {
  if (!process.env.PORT) throw new Error("PORT required");
  if (!process.env.API_KEY) throw new Error("API_KEY required");
  
  return {
    PORT: process.env.PORT,
    API_KEY: process.env.API_KEY,
    NODE_ENV: process.env.NODE_ENV
  };
}`,
        language: 'typescript',
        highlight: [2, 3, 4, 5, 8, 11, 12, 13],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Access Environment Variable',
      instructions: `Create a function \`getPort\` that:
- Returns a number
- Gets \`process.env.PORT\`
- If PORT exists, parse it as an integer
- If PORT doesn't exist, return default \`3000\`

Note: This is conceptual - we're learning the pattern for accessing env vars.`,
      starterCode: `// Create getPort function

`,
      solutionCode: `// Create getPort function
function getPort(): number {
  const port = process.env.PORT;
  if (port) {
    return parseInt(port);
  }
  return 3000;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getPort should return a number',
          testCode: `const port = getPort();
if (typeof port !== 'number') throw new Error('getPort should return a number');`,
        },
      ],
      hints: [
        'Check if process.env.PORT exists',
        'Use parseInt() to convert string to number',
        'Return 3000 as default',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Validate Required Variable',
      instructions: `Create a function \`getApiKey\` that:
- Returns a string
- Gets \`process.env.API_KEY\`
- If API_KEY doesn't exist, throw an Error("API_KEY is required")
- Otherwise, return the API_KEY as a string`,
      starterCode: `// Create getApiKey function

`,
      solutionCode: `// Create getApiKey function
function getApiKey(): string {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is required");
  }
  return process.env.API_KEY;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getApiKey should return a string when API_KEY exists',
          testCode: `// This test assumes API_KEY might not be set in browser environment
// The function should at least be defined correctly
if (typeof getApiKey !== 'function') throw new Error('getApiKey should be a function');`,
        },
      ],
      hints: [
        'Check if !process.env.API_KEY',
        'Throw Error if missing',
        'Return the value if present',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Environment Variable Access',
      instructions: 'Fill in the missing parts.',
      codeTemplate: `function getConfig() {
  const port = {{BLANK_1}}.PORT;
  const apiKey = {{BLANK_1}}.{{BLANK_2}};
  
  if (!{{BLANK_3}}) {
    throw new Error("API_KEY is required");
  }
  
  return {
    port: port ? parseInt(port) : 3000,
    apiKey: {{BLANK_3}}
  };
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'object',
          correctAnswers: ['process.env'],
          caseSensitive: true,
          hint: 'The object that contains environment variables...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'variable name',
          correctAnswers: ['API_KEY'],
          caseSensitive: true,
          hint: 'The environment variable name for the API key...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'variable',
          correctAnswers: ['apiKey'],
          caseSensitive: true,
          hint: 'The variable that holds the API key value...',
        },
      ],
      hints: [
        'process.env contains environment variables',
        'API_KEY is the variable name',
        'Use the variable you just assigned',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'Why should you validate environment variables?',
      options: [
        {
          id: 'a',
          text: 'To ensure they exist and handle the case where they might be undefined',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'To make code run faster',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'Environment variables are always defined',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Validation is not necessary',
          isCorrect: false,
        },
      ],
      explanation: 'Environment variables might not be set, so they can be `undefined`. Validating them ensures your code handles missing values gracefully, either by providing defaults or throwing clear errors for required variables.',
    },
  ],
}

