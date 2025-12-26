import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-47-streaming',
  slug: 'streaming-responses',
  title: 'Streaming Responses',
  description: 'Learn how to handle real-time AI responses using generators.',
  order: 3,
  xpReward: 90,
  estimatedMinutes: 18,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-46-chat-completions'],
  tags: ['ai', 'streaming', 'generators'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Why Stream?',
      content: `
Large responses can take several seconds to generate. Instead of making the user wait for the whole paragraph, we can **stream** the response piece by piece, just like ChatGPT does.

In Python, this is handled using an **iterator** (a \`for\` loop).
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Enabling Stream',
      content: `
To enable streaming, set \`stream=True\` in the \`create()\` call.

\`\`\`python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Write a story."}],
    stream=True
)

for chunk in stream:
    # Each chunk might contain a small piece of text
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
\`\`\`

Note: In a stream, the field is \`delta\` instead of \`message\`.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'What is the main benefit of using streaming?',
      options: [
        { id: '1', text: 'It makes the AI response faster overall.', isCorrect: false },
        { id: '2', text: 'It reduces the total number of tokens used.', isCorrect: false },
        { id: '3', text: 'It improves perceived performance by showing text as it generates.', isCorrect: true },
        { id: '4', text: 'It makes the AI smarter.', isCorrect: false },
      ],
      explanation: 'Streaming doesn\'t change the generation speed, but it makes the app feel much faster by letting the user read the beginning while the end is still being created.',
    },
  ],
}
