import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-46-chat-completions',
  slug: 'chat-completions',
  title: 'Chat Completions',
  description: 'Make your first real AI call to generate text.',
  order: 2,
  xpReward: 90,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-45-sdk-setup', 'py-42-roles-messages'],
  tags: ['ai', 'chat', 'openai'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The create() Method',
      content: `
The most common way to get text from an LLM is the \`chat.completions.create()\` method. 

It requires two main arguments:
1.  **model**: The name of the model to use (e.g., \`"gpt-4o-mini"\`)
2.  **messages**: A list of message objects (roles and content).

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

# Extract the text
text = response.choices[0].message.content
print(text)
\`\`\`
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Response Structure',
      content: `
The response object is deeply nested because it contains metadata like token usage and reasons why the model stopped.

-   \`response.choices[0]\`: The first result (usually there\'s only one)
-   \`.message\`: The message object (role + content)
-   \`.content\`: The actual string of text
-   \`response.usage\`: Shows how many tokens were used
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Say Hello to AI',
      instructions: `
Use \`client.chat.completions.create\` to ask \`"gpt-4o-mini"\` the question: \`"What is Python?"\`.
Print the resulting message content.
      `,
      starterCode: `from openai import OpenAI
client = OpenAI()

# 1. Create a completion
# 2. Extract content
# 3. Print it
`,
      solutionCode: `from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "What is Python?"}]
)
print(response.choices[0].message.content)`,
      testCases: [
        {
          id: 'test-1',
          description: 'Calls create with correct model',
          testCode: 'assert "gpt-4o-mini" in __user_code__',
        },
        {
          id: 'test-2',
          description: 'Extracts message content correctly',
          testCode: 'assert ".choices[0].message.content" in __user_code__',
        },
      ],
      hints: [
        'Messages must be a list of dictionaries',
        'Don\'t forget the `print()` function',
      ],
    },
  ],
}
