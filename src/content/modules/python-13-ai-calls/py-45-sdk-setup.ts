import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-45-sdk-setup',
  slug: 'sdk-setup',
  title: 'SDK Setup',
  description: 'Install and initialize the OpenAI and Anthropic Python SDKs.',
  order: 1,
  xpReward: 70,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-40-dotenv'],
  tags: ['ai', 'sdk', 'setup'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Installing the SDKs',
      content: `
To talk to AI models in Python, we use official client libraries called **SDKs** (Software Development Kits).

### The Libraries
-   **OpenAI**: \`pip install openai\`
-   **Anthropic**: \`pip install anthropic\`

Once installed, we can import them and create a **Client** object. The client handles all the network communication and authentication for us.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'The OpenAI Client',
      content: `
To use OpenAI, you need to provide your API key to the \`OpenAI\` class.

\`\`\`python
from openai import OpenAI
import os

# Initialize the client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)
\`\`\`

If you don't provide an API key, the SDK will automatically look for an environment variable named \`OPENAI_API_KEY\`.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'instruction',
      title: 'The Anthropic Client',
      content: `
Anthropic works very similarly but uses the \`Anthropic\` class.

\`\`\`python
from anthropic import Anthropic

client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)
\`\`\`
      `,
    },
    {
      id: 'step-4',
      order: 4,
      type: 'code-exercise',
      title: 'Initialize a Client',
      instructions: `
Create an instance of the \`OpenAI\` client and assign it to a variable named \`client\`. 
(Assume \`OPENAI_API_KEY\` is already in your environment).
      `,
      starterCode: `from openai import OpenAI

# Initialize the client here
`,
      solutionCode: `from openai import OpenAI

client = OpenAI()`,
      testCases: [
        {
          id: 'test-1',
          description: 'Uses OpenAI class',
          testCode: 'assert "OpenAI(" in __user_code__',
        },
        {
          id: 'test-2',
          description: 'Assigns to variable client',
          testCode: 'assert "client =" in __user_code__.replace(" ", "")',
        },
      ],
      hints: [
        'Call `OpenAI()` as a function',
        'You don\'t *need* to pass arguments if the environment variable is set',
      ],
    },
  ],
}
