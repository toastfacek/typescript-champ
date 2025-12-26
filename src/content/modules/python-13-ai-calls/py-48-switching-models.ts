import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-48-switching-models',
  slug: 'switching-models',
  title: 'Switching Models',
  description: 'Understand the differences between OpenAI and Anthropic SDKs.',
  order: 4,
  xpReward: 70,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-46-chat-completions', 'py-45-sdk-setup'],
  tags: ['anthropic', 'claude', 'models'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Anthropic\'s "Messages" API',
      content: `
While the concepts are the same, the Anthropic SDK (Claude) has slightly different method names.

\`\`\`python
from anthropic import Anthropic

client = Anthropic()

response = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)

print(response.content[0].text)
\`\`\`

Key differences:
-   \`.messages.create\` instead of \`.chat.completions.create\`
-   \`.content[0].text\` instead of \`.choices[0].message.content\`
-   \*\*max_tokens\*\* is REQUIRED by Anthropic.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Choosing a Model',
      content: `
Each provider has "family" names for their models:

### OpenAI
-   **gpt-4o**: Most powerful, balanced speed.
-   **gpt-4o-mini**: Fast and very cheap. Perfect for simple tasks.

### Anthropic
-   **claude-3-5-sonnet**: Top-tier intelligence (best for coding).
-   **claude-3-haiku**: Extremely fast and cheap.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'fill-in-blank',
      title: 'Claude API Syntax',
      instructions: 'Complete the code to get text from a Claude response.',
      codeTemplate: `response = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=500,
    messages=[{"role": "user", "content": "Hi"}]
)
print(response.{{BLANK_1}}[0].{{BLANK_2}})`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'field',
          correctAnswers: ['content'],
          caseSensitive: true,
          hint: 'The list of response parts.',
        },
        {
          id: 'BLANK_2',
          placeholder: 'field',
          correctAnswers: ['text'],
          caseSensitive: true,
          hint: 'The actual text within a content block.',
        },
      ],
      hints: [
        'Anthropic returns a list of content blocks.',
      ],
    },
  ],
}
