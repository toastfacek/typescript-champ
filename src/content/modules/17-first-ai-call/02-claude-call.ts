import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-claude-call',
  slug: 'claude-call',
  title: 'First Claude Call',
  description: 'Learn how to make your first text completion request to Claude using the Anthropic SDK.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-sdk-setup', '16-llm-concepts'],
  tags: ['ai', 'claude', 'anthropic'],
  keyConcepts: [
    {
      id: 'messages-create',
      term: 'messages.create()',
      definition: 'The primary method in the Anthropic SDK for sending a prompt and receiving a response from Claude.',
      syntax: 'anthropic.messages.create({ ... })',
      whyItMatters: 'This is the core interaction point for most AI applications built with Claude.',
    },
  ],
  steps: [
    {
      id: 'step-1-basic-request',
      order: 1,
      type: 'instruction',
      title: 'Sending a Message',
      content: `# Hello, Claude

When making a request, you specify the **model** and a list of **messages**.`,
      codeExample: {
        code: `const msg = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20240620",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Hello, Claude!" }
  ],
});

console.log(msg.content[0].text);`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-handling-response',
      order: 2,
      type: 'instruction',
      title: 'Response Structure',
      content: `# Navigating the Result

The response from Anthropic is a nested object. The actual text is found in the \`content\` array.`,
      codeExample: {
        code: `const text = msg.content
  .filter(block => block.type === "text")
  .map(block => block.text)
  .join("");`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'AI Translator',
      instructions: `1. You have an initialized \`anthropic\` client.
2. Fill in the parameters for \`messages.create\`.
3. Use the model \`"claude-3-5-sonnet-20240620"\`.
4. Set \`max_tokens\` to 100.
5. Create a user message containing: \`"Translate 'Hello' to French."\`.`,
      starterCode: `// anthropic client is available
async function translate() {
  const msg = await anthropic.messages.create({
    // Add parameters here
  });
  return msg;
}
`,
      solutionCode: `async function translate() {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 100,
    messages: [
      { role: "user", content: "Translate 'Hello' to French." }
    ],
  });
  return msg;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should use correct model',
          testCode: `// Simulate/mock environment would check parameters passed to create`,
        },
      ],
      hints: [
        'Model should be "claude-3-5-sonnet-20240620"',
        'Messages is an array of objects',
      ],
      aiHintPrompt: 'The user is learning how to structure a complete Claude API request.',
    },
  ],
}
