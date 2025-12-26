import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-41-how-llms-work',
  slug: 'how-llms-work',
  title: 'How LLMs Work',
  description: 'Understand tokens, context windows, and how models predict text.',
  order: 1,
  xpReward: 50,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  language: 'python',
  prerequisites: [],
  tags: ['llm', 'theory', 'tokens'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'It\'s All Probability',
      content: `
At its core, an LLM (Large Language Model) is a super-advanced **autocomplete engine**.

When you give it a prompt, it doesn't "think" in the human sense. Instead, it looks at the sequence of words and asks: *"Based on everything I've read on the internet, what is the most likely next word?"*

### The Prediction Loop
1.  **Input**: "The capital of France is..."
2.  **Prediction**: "Paris" (99% probability)
3.  **Output**: "Paris"
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Tokens: The Language of AI',
      content: `
LLMs don't read words; they read **tokens**.

A token can be a whole word, a part of a word, or even a single character. 
Roughly: **1,000 tokens ≈ 750 words**.

### Context Window
The "Context Window" is the model's short-term memory. It's the maximum number of tokens the model can "see" at one time. If your conversation gets too long, the model starts "forgetting" the beginning.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'Which of these best describes what an LLM actually does?',
      options: [
        { id: '1', text: 'It searches a database of facts to find answers.', isCorrect: false },
        { id: '2', text: 'It understands the world and reasons like a human.', isCorrect: false },
        { id: '3', text: 'It predicts the most likely next token in a sequence.', isCorrect: true },
        { id: '4', text: 'It executes code in its head to solve problems.', isCorrect: false },
      ],
      explanation: 'LLMs are probabilistic engines that predict the next token based on statistical patterns learned during training.',
    },
  ],
}
