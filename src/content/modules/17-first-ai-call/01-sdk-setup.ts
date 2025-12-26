import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-sdk-setup',
  slug: 'sdk-setup',
  title: 'SDK Setup',
  description: 'Learn how to install and initialize the Anthropic and OpenAI SDKs in your TypeScript project.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['08-nodejs-npm'],
  tags: ['ai', 'sdk', 'setup'],
  keyConcepts: [
    {
      id: 'ai-sdk',
      term: 'AI SDK',
      definition: 'A library provided by an AI company (like Anthropic or OpenAI) that simplifies making API calls, handling authentication, and parsing responses.',
      whyItMatters: 'Using an SDK is much easier and safer than making raw fetch calls to AI APIs.',
    },
    {
      id: 'api-key',
      term: 'API Key',
      definition: 'A secret token used to authenticate your requests to an AI service.',
      whyItMatters: 'API keys are tied to your billing and identity. They must be kept secret and should never be committed to version control.',
    },
  ],
  steps: [
    {
      id: 'step-1-installation',
      order: 1,
      type: 'instruction',
      title: 'Installing SDKs',
      content: `# Getting the Libraries

You can install the official SDKs using npm.`,
      codeExample: {
        code: `npm install @anthropic-ai/sdk openai`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-initialization',
      order: 2,
      type: 'instruction',
      title: 'Initialization',
      content: `# Creating a Client

To use an SDK, you create a "client" instance by providing your API key.`,
      codeExample: {
        code: `import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: "your-api-key-here",
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Initialize Anthropic',
      instructions: `1. Import \`Anthropic\` from \`@anthropic-ai/sdk\`.
2. Create a constant named \`client\`.
3. Initialize a new \`Anthropic\` instance with a dummy \`apiKey\`: \`"sk-test-123"\`.`,
      starterCode: `// Import and initialize here
`,
      solutionCode: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: "sk-test-123",
});`,
      testCases: [
        {
          id: 'test-1',
          description: 'Client should be an instance of Anthropic',
          testCode: `if (!(client instanceof Anthropic)) throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use `import Anthropic from "@anthropic-ai/sdk"`',
        'Use `new Anthropic({ apiKey: "..." })`',
      ],
      aiHintPrompt: 'The user is learning how to initialize an AI SDK client.',
    },
  ],
}
