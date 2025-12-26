import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-prompt-engineering',
  slug: 'prompt-engineering',
  title: 'Prompt Engineering',
  description: 'Learn the basic techniques for writing effective prompts to get the best results from an LLM.',
  order: 3,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['02-messages-roles'],
  tags: ['ai', 'concepts', 'prompting'],
  keyConcepts: [
    {
      id: 'zero-shot',
      term: 'Zero-shot Prompting',
      definition: 'Providing a task to the AI without any examples.',
      whyItMatters: 'Good for simple tasks, but can struggle with complex formatting or logic.',
    },
    {
      id: 'few-shot',
      term: 'Few-shot Prompting',
      definition: 'Providing one or more examples (shots) in the prompt to show the AI exactly what you want.',
      whyItMatters: 'Examples are often the fastest way to get an AI to follow a specific output format or tone.',
    },
    {
      id: 'chain-of-thought',
      term: 'Chain of Thought',
      definition: 'Asking the AI to "think step-by-step" before giving the final answer.',
      whyItMatters: 'Significantly improves reasoning performance on complex logic or math problems.',
    },
  ],
  steps: [
    {
      id: 'step-1-clarity',
      order: 1,
      type: 'instruction',
      title: 'Be Specific',
      content: `# The Golden Rule: Specificity

The more specific your prompt, the better the result. Avoid vague requests like "fix this code". Instead, use "Refactor this function to be more readable and add type annotations".`,
    },
    {
      id: 'step-2-examples',
      order: 2,
      type: 'instruction',
      title: 'Using Examples',
      content: `# Few-Shot Examples

If you want the AI to output JSON in a specific format, show it an example!`,
      codeExample: {
        code: `const prompt = \`
Extract the name and age from the text.
Example:
Input: "John is 25 years old"
Output: {"name": "John", "age": 25}

Input: "Alice is 30"
Output: \`;`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Chain of Thought Generator',
      instructions: `1. Create a function named \`buildCOTRequest\` that takes a \`question\` string.
2. It should return a system prompt that tells the AI: \`"Solve the user question. First, think step by step. Then, provide the final answer."\`.
3. The function should return a single string combining the instruction and the question.`,
      starterCode: `function buildCOTRequest(question: string): string {
  // Implement here
}
`,
      solutionCode: `function buildCOTRequest(question: string): string {
  return "Solve the user question. First, think step by step. Then, provide the final answer.\\n\\nQuestion: " + question;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should include COT instructions',
          testCode: `if (!buildCOTRequest('2+2').includes('think step by step')) throw new Error('Fail');`,
        },
      ],
      hints: [
        'Include the exact instruction: "First, think step by step."'
      ],
      aiHintPrompt: 'The user is learning a basic chain-of-thought prompting pattern.',
    },
  ],
}
