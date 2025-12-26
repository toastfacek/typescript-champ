import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-streaming-intro',
  slug: 'streaming-intro',
  title: 'Streaming Responses',
  description: 'Learn why streaming is essential for AI applications and how it works conceptually.',
  order: 4,
  estimatedMinutes: 8,
  difficulty: 'intermediate',
  xpReward: 50,
  prerequisites: ['01-what-are-llms'],
  tags: ['ai', 'concepts', 'streaming'],
  keyConcepts: [
    {
      id: 'streaming',
      term: 'Streaming',
      definition: 'Sending the AI\'s response piece-by-piece as it is generated, rather than waiting for the entire response to be finished.',
      whyItMatters: 'LLMs can take several seconds (or even minutes) to finish a long response. Streaming makes the app feel instant by showing text as it arrives.',
    },
    {
      id: 'time-to-first-token',
      term: 'TTFT',
      definition: 'Time to First Token. A metric of how fast an AI starts responding.',
      whyItMatters: 'In UX, TTFT is more important than the total generation time.',
    },
  ],
  steps: [
    {
      id: 'step-1-why-streaming',
      order: 1,
      type: 'instruction',
      title: 'The UX of AI',
      content: `# Why Streaming?

Imagine asking an AI to write a 1000-word essay.
- **Without streaming**: The user stares at a loading spinner for 20 seconds.
- **With streaming**: The first sentence appears in 0.5 seconds, and the user can start reading immediately.`,
    },
    {
      id: 'step-2-how-it-works',
      order: 2,
      type: 'instruction',
      title: 'Conceptual Flow',
      content: `# Behind the Scenes

When streaming, the server sends a series of "chunks".
1. Chunk: "Hello"
2. Chunk: " there"
3. Chunk: "!"
4. Chunk: [DONE]`,
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Word Streamer',
      instructions: `1. Create an async function named \`fakeStream\` that takes a \`text\` string.
2. Split the text into an array of words.
3. For each word, return it immediately (in a real app, this would be a generator or stream).
4. For this exercise, just return the array of words to simulate chunks.`,
      starterCode: `async function fakeStream(text: string) {
  // Implement here
}
`,
      solutionCode: `async function fakeStream(text: string) {
  return text.split(" ");
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should split into words',
          testCode: `const res = await fakeStream('hi there');
if (res.length !== 2) throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use `.split(" ")`'
      ],
      aiHintPrompt: 'The user is learning the concept of breaking a response into chunks for streaming.',
    },
  ],
}
