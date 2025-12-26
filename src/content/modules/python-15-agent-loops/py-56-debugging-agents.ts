import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-56-debugging-agents',
  slug: 'debugging-agents',
  title: 'Debugging Agents',
  description: 'Learn how to trace and troubleshoot autonomous agent behavior.',
  order: 4,
  xpReward: 90,
  estimatedMinutes: 20,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-53-react-loop'],
  tags: ['debugging', 'tracing', 'agents'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Black Box Problem',
      content: `
When an agent goes into a loop, it can be hard to see why it's making certain decisions or why it's stuck in a "loop-de-loop" (calling the same tool forever).

To fix this, we need **Visibility**.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Simple Logging',
      content: `
Always print what your agent is "thinking" and what tools it's calling.

\`\`\`python
# Useful Debug Print Pattern
print(f"--- Iteration {i} ---")
if message.content:
    print(f"THOUGHT: {message.content}")
if message.tool_calls:
    for tc in message.tool_calls:
        print(f"CALLING: {tc.function.name}({tc.function.arguments})")
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'instruction',
      title: 'Common Agent Bugs',
      content: `
1.  **The Infinite Loop**: The agent calls a tool, gets an error, then calls the exact same tool again hoping for a different result.
2.  **Hallucinated Tools**: The agent tries to call a tool that doesn't exist.
3.  **Context Overflow**: The history gets so long the model "forgets" the original task.
      `,
    },
    {
      id: 'step-4',
      order: 4,
      type: 'quiz',
      question: 'Your agent is calling a tool that doesn\'t exist. What is the best first step to fix it?',
      options: [
        { id: '1', text: 'Restart your computer.', isCorrect: false },
        { id: '2', text: 'Check your tool definitions and system prompt to ensure the tool names are clear and correct.', isCorrect: true },
        { id: '3', text: 'Delete the tool and hope the AI stops using it.', isCorrect: false },
        { id: '4', text: 'Switch to a more expensive model.', isCorrect: false },
      ],
      explanation: 'Models usually hallucinate tools because the instructions are vague or the tool definition name/description is confusing.',
    },
  ],
}
