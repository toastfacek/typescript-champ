import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-44-params',
  slug: 'model-params',
  title: 'Temperature & Top-P',
  description: 'Control the creativity and randomness of AI responses.',
  order: 4,
  xpReward: 60,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-41-how-llms-work'],
  tags: ['llm', 'parameters', 'temperature'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Controlling Randomness',
      content: `
When a model predicts the next token, it doesn't just pick one; it generates a list of probabilities for *all* possible tokens.

We use **parameters** to decide how the model picks from that list.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Temperature',
      content: `
**Temperature** (usually 0 to 2) controls how much "risk" the model takes.

-   **Temp = 0**: Deterministic. Always picks the single most likely token. Best for facts, math, and code.
-   **Temp = 0.7**: Balanced. Good for chat and general tasks.
-   **Temp = 1.0+**: Creative/Random. Good for brainstorming or poetry.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'instruction',
      title: 'Top-P (Nucleus Sampling)',
      content: `
**Top-P** is an alternative to Temperature. It tells the model to only consider the top segment of tokens whose combined probability reaches **P**.

For example, if P = 0.1, the model only looks at the tokens that make up the top 10% of probability mass.
      `,
    },
    {
      id: 'step-4',
      order: 4,
      type: 'quiz',
      question: 'Which Temperature setting is best for a coding assistant?',
      options: [
        { id: '1', text: '2.0 (Maximize creativity)', isCorrect: false },
        { id: '2', text: '1.0 (Standard chat)', isCorrect: false },
        { id: '3', text: '0.0 (Focus on accuracy/consistency)', isCorrect: true },
        { id: '4', text: 'Temperature doesn\'t matter for code.', isCorrect: false },
      ],
      explanation: 'For structured tasks like coding or math, you want the model to be as consistent and accurate as possible. Setting temperature to 0 minimizes "hallucinations" and random variations.',
    },
  ],
}
