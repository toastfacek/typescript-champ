import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-54-memory-management',
  slug: 'memory-management',
  title: 'Memory Management',
  description: 'Manage conversation history to stay within token limits.',
  order: 2,
  xpReward: 80,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-53-react-loop'],
  tags: ['memory', 'tokens', 'agents'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Burden of Memory',
      content: `
LLMs are **stateless**. Every time you call the API, you have to send the *entire* conversation history so the model remembers what happened.

As the conversation grows, you hit two problems:
1.  **Context Limit**: You running out of space (tokens).
2.  **Cost**: You pay for every token in the history on every call.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Pruning History',
      content: `
A simple way to manage memory is to keep only the last \`N\` messages.

\`\`\`python
def manage_memory(messages: list, max_messages: int = 10):
    if len(messages) > max_messages:
        # Keep the SYSTEM message at index 0, but remove old messages
        system_msg = messages[0]
        recent_messages = messages[-(max_messages-1):]
        return [system_msg] + recent_messages
    return messages
\`\`\`

Note: You should always keep the **System Message** as it contains the agent's core instructions.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Implement a Simple Pruner',
      instructions: `
Write a function \`prune_messages\` that takes a list of messages. 
If the list has more than 5 messages, return only the last 5. 
Otherwise, return the full list.
      `,
      starterCode: `def prune_messages(messages):
    # Your code here
    pass
`,
      solutionCode: `def prune_messages(messages):
    if len(messages) > 5:
        return messages[-5:]
    return messages`,
      testCases: [
        {
          id: 'test-1',
          description: 'Works for short lists',
          testCode: 'assert len(prune_messages([1, 2, 3])) == 3',
        },
        {
          id: 'test-2',
          description: 'Prunes long lists to exactly 5',
          testCode: 'assert len(prune_messages([1, 2, 3, 4, 5, 6, 7])) == 5',
        },
        {
          id: 'test-3',
          description: 'Keeps the most RECENT messages',
          testCode: 'assert prune_messages([1, 2, 3, 4, 5, 6]) == [2, 3, 4, 5, 6]',
        },
      ],
      hints: [
        'Use the `len()` function to check count.',
        'Use negative slicing `[-5:]` to get the end of a list.',
      ],
    },
  ],
}
