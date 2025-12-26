import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-42-roles-messages',
  slug: 'roles-messages',
  title: 'Roles & Messages',
  description: 'Learn about System, User, and Assistant roles in AI conversations.',
  order: 2,
  xpReward: 60,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  language: 'python',
  prerequisites: ['py-41-how-llms-work'],
  tags: ['llm', 'chat', 'roles'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Chat Completion Format',
      content: `
Modern AI models (like GPT-4 and Claude) interact through a list of **messages**. Each message has a \`role\` and \`content\`.

There are three main roles you need to know:
1.  **System**: Instructions for the model's behavior.
2.  **User**: Your questions or commands.
3.  **Assistant**: The model's responses.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'The System Role',
      content: `
The **System Message** sets the stage. It's where you define the persona, rules, and constraints of the AI.

\`\`\`python
# Example System Message
{
    "role": "system",
    "content": "You are a helpful coding tutor. Explain concepts simply and never give the full code answer immediately."
}
\`\`\`

A strong system message is the secret to building specialized AI agents.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'fill-in-blank',
      title: 'Identifying Roles',
      instructions: 'Complete the message list for a chat conversation.',
      codeTemplate: `messages = [
    {"role": "{{BLANK_1}}", "content": "You are a pirate."},
    {"role": "{{BLANK_2}}", "content": "Where is the gold?"},
    {"role": "{{BLANK_3}}", "content": "Arrr, it be buried on the island!"}
]`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'role',
          correctAnswers: ['system'],
          caseSensitive: false,
          hint: 'The role that sets the persona.',
        },
        {
          id: 'BLANK_2',
          placeholder: 'role',
          correctAnswers: ['user'],
          caseSensitive: false,
          hint: 'The role for the person asking the question.',
        },
        {
          id: 'BLANK_3',
          placeholder: 'role',
          correctAnswers: ['assistant'],
          caseSensitive: false,
          hint: 'The role for the AI\'s response.',
        },
      ],
      hints: [
        'Think about who is providing the instruction, who is asking, and who is answering.',
      ],
    },
  ],
}
