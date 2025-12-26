import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-what-are-llms',
  slug: 'what-are-llms',
  title: 'What are LLMs?',
  description: 'Understand the fundamental concepts of Large Language Models and how they differ from traditional software.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: [],
  tags: ['ai', 'concepts', 'llm'],
  keyConcepts: [
    {
      id: 'token',
      term: 'Token',
      definition: 'The basic unit of text that an LLM processes. A token can be a word, part of a word, or even just a character.',
      whyItMatters: 'LLMs have "context limits" measured in tokens. Efficiently using tokens is key to better performance and lower costs.',
    },
    {
      id: 'probabilistic',
      term: 'Probabilistic Output',
      definition: 'Unlike traditional code that is "deterministic" (same input = same output), LLMs predict the *next most likely* token based on probability.',
      whyItMatters: 'This means an AI can give different answers to the same question. Understanding this helps you write code that handles "fuzzy" results.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'AI vs Traditional Code',
      content: `# A New Programming Paradigm

Traditional software is built on **logic gates** and **deterministic rules**. If you write \`if (x > 5)\`, the behavior is 100% predictable.

**LLMs (Large Language Models)** are built on **neural networks**. They don't "execute" your text — they **reason** over it to predict what sounds right.`,
    },
    {
      id: 'step-2-constraints',
      order: 2,
      type: 'instruction',
      title: 'Context & Tokens',
      content: `# Working with Limits

Every LLM has a **Context Window**. This is the maximum number of tokens it can "remember" at one time.

Imagine the context window is the AI's "short-term memory". If you send a prompt that is too long, the AI will "forget" the beginning of the conversation.`,
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Thinking like a Tokenizer',
      instructions: `1. In AI development, we often need to estimate token counts. 
2. A rough rule of thumb is that **1000 tokens ≈ 750 words**.
3. Create a function named \`estimateTokens\` that takes a \`wordCount\` (number) and returns an estimated token count (rounded to the nearest whole number).`,
      starterCode: `function estimateTokens(wordCount: number): number {
  // Use the 1000/750 ratio
}
`,
      solutionCode: `function estimateTokens(wordCount: number): number {
  return Math.round((wordCount / 750) * 1000);
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should estimate correctly for 750 words',
          testCode: `if (estimateTokens(750) !== 1000) throw new Error('Fail');`,
        },
        {
          id: 'test-2',
          description: 'Should estimate correctly for 1500 words',
          testCode: `if (estimateTokens(1500) !== 2000) throw new Error('Fail');`,
        },
      ],
      hints: [
        'Divide wordCount by 750 and multiply by 1000',
        'Use `Math.round()` to get a whole number',
      ],
      aiHintPrompt: 'The user is learning a fundamental rule of thumb for AI token estimation.',
    },
  ],
}
