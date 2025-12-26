import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-43-prompting',
  slug: 'prompting-basics',
  title: 'Prompt Engineering',
  description: 'Master strategies like Few-shot and Chain-of-Thought prompting.',
  order: 3,
  xpReward: 70,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-42-roles-messages'],
  tags: ['prompting', 'engineering', 'ai'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Beyond Simple Questions',
      content: `
Prompt Engineering is the art of crafting inputs that get the best possible output from an LLM.

### Three Key Strategies:
1.  **Zero-shot**: Just asking the question (no examples).
2.  **Few-shot**: Providing a few examples of input/output pairs.
3.  **Chain-of-Thought (CoT)**: Asking the model to "think step-by-step".
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Few-shot Prompting',
      content: `
LLMs are amazing pattern matchers. If you show them 2-3 examples of what you want, they will follow that pattern much better than just a text description.

\`\`\`text
Example 1: Input: "Happy", Output: "Positive"
Example 2: Input: "Sad", Output: "Negative"
Input: "Excited", Output: 
\`\`\`

The model will easily predict "Positive".
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'instruction',
      title: 'Chain-of-Thought (CoT)',
      content: `
For complex logic or math, asking the model to **"Think step-by-step"** significantly reduces errors. 

This forces the model to use its own reasoning as "scratchpad" tokens, which helps it reach the correct final answer.
      `,
    },
    {
      id: 'step-4',
      order: 4,
      type: 'quiz',
      question: 'Why does "thinking step-by-step" help an LLM solve a hard math problem?',
      options: [
        { id: '1', text: 'It gives the model more time to search its database.', isCorrect: false },
        { id: '2', text: 'It allows the model to use intermediate tokens to track its reasoning.', isCorrect: true },
        { id: '3', text: 'It activates the models hidden calculator mode.', isCorrect: false },
        { id: '4', text: 'It makes the prompt longer, which models always prefer.', isCorrect: false },
      ],
      explanation: 'By generating intermediate steps, the model can "see" its own previous work, which provides the necessary context to solve complex problems.',
    },
  ],
}
