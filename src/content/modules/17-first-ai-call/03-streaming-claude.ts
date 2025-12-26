import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-streaming-claude',
  slug: 'streaming-claude',
  title: 'Streaming with Claude',
  description: 'Learn how to handle real-time streaming responses from Claude for a better user experience.',
  order: 3,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['02-claude-call', '16-llm-concepts'],
  tags: ['ai', 'claude', 'streaming'],
  keyConcepts: [
    {
      id: 'stream-method',
      term: 'stream: true',
      definition: 'An option in the Anthropic SDK that tells the API to send the response piece-by-piece.',
      syntax: 'anthropic.messages.create({ ..., stream: true })',
      whyItMatters: 'Streaming is essential for making AI applications feel responsive and interactive.',
    },
  ],
  steps: [
    {
      id: 'step-1-streaming-loop',
      order: 1,
      type: 'instruction',
      title: 'Using Async Iterators',
      content: `# Reading the Stream

When you enable \`stream: true\`, the SDK returns an object that you can iterate over using a \`for await...of\` loop.`,
      codeExample: {
        code: `const stream = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20240620",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Write a short poem." }],
  stream: true,
});

for await (const event of stream) {
  if (event.type === "content_block_delta") {
    // This is a partial piece of text!
    process.stdout.write(event.delta.text);
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-event-types',
      order: 2,
      type: 'instruction',
      title: 'Handling Stream events',
      content: `# Diverse Events

A stream isn't just text. It also sends events when the message starts, when blocks change, and when the message is finished.`,
      codeExample: {
        code: `for await (const event of stream) {
  switch (event.type) {
    case "message_start":
      console.log("Started...");
      break;
    case "content_block_delta":
      console.log("Got some text: " + event.delta.text);
      break;
    case "message_stop":
      console.log("Finished!");
      break;
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Simple Streamer',
      instructions: `1. You are given a \`stream\` object from Claude.
2. Implement a \`for await\` loop to process the events.
3. If the \`event.type\` is \`"content_block_delta"\`, append the \`event.delta.text\` to the provided \`result\` string.`,
      starterCode: `async function collectStream(stream: any) {
  let result = "";
  // Implement loop here
  return result;
}
`,
      solutionCode: `async function collectStream(stream: any) {
  let result = "";
  for await (const event of stream) {
    if (event.type === "content_block_delta") {
      result += event.delta.text;
    }
  }
  return result;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should correctly collect text',
          testCode: `const mockStream = (async function*() {
  yield { type: 'content_block_delta', delta: { text: 'Hi' } };
  yield { type: 'content_block_delta', delta: { text: '!' } };
})();
const res = await collectStream(mockStream);
if (res !== 'Hi!') throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use `for await (const event of stream)`',
        'Check `event.type === "content_block_delta"`',
      ],
      aiHintPrompt: 'The user is learning how to consume an async iterator for AI streaming.',
    },
  ],
}
