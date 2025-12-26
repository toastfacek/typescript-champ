import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-openai-call',
  slug: 'openai-call',
  title: 'OpenAI Comparison',
  description: 'Learn how to make requests to OpenAI models like GPT-4 and compare the syntax to the Anthropic SDK.',
  order: 4,
  estimatedMinutes: 8,
  difficulty: 'intermediate',
  xpReward: 50,
  prerequisites: ['01-sdk-setup'],
  tags: ['ai', 'openai', 'gpt'],
  keyConcepts: [
    {
      id: 'openai-chat-completions',
      term: 'chat.completions.create()',
      definition: 'The OpenAI SDK method for generating a response from a chat model.',
      syntax: 'openai.chat.completions.create({ ... })',
      whyItMatters: 'OpenAI defined the standard "Chat" format that many other AI providers now follow.',
    },
  ],
  steps: [
    {
      id: 'step-1-openai-request',
      order: 1,
      type: 'instruction',
      title: 'Talking to GPT',
      content: `# The OpenAI Way

OpenAI uses the \`chat.completions.create\` method. The syntax is very similar to Anthropic, but with slightly different property names.`,
      codeExample: {
        code: `import OpenAI from "openai";

const openai = new OpenAI();

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" },
  ],
});

console.log(completion.choices[0].message.content);`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-comparison',
      order: 2,
      type: 'instruction',
      title: 'Comparing SDKs',
      content: `# Anthropic vs OpenAI

| Feature | Anthropic | OpenAI |
|---------|-----------|--------|
| Method | \`messages.create\` | \`chat.completions.create\` |
| System | \`system\` property | \`system\` message role |
| Result Path | \`content[0].text\` | \`choices[0].message.content\` |`,
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'GPT Request',
      instructions: `1. You have an initialized \`openai\` client.
2. Call \`openai.chat.completions.create\`.
3. Use the model \`"gpt-4o-mini"\`.
4. Send a single user message: \`"Explain TypeScript in 10 words."\`.`,
      starterCode: `async function askGpt() {
  // Implement here
}
`,
      solutionCode: `async function askGpt() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: "Explain TypeScript in 10 words." }
    ],
  });
  return completion;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should use correct model',
          testCode: `// Mock check`,
        },
      ],
      hints: [
        'Method is `openai.chat.completions.create`',
        'Model is "gpt-4o-mini"',
      ],
      aiHintPrompt: 'The user is learning the OpenAI SDK request structure.',
    },
  ],
}
