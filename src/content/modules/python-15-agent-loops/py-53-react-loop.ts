import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-53-react-loop',
  slug: 'react-loop',
  title: 'The ReAct Loop',
  description: 'Learn the core logic of autonomous agents: Reason + Act.',
  order: 1,
  xpReward: 100,
  estimatedMinutes: 15,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-51-tool-calling'],
  tags: ['logic', 'agents', 'loops'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Autonomous Logic',
      content: `
An **Agent** is more than just a model that can use tools. It's a system that can **loop** until it solves a problem.

The most common pattern is **ReAct** (Reasoning + Acting).

### The ReAct Flow
1.  **Thought**: The AI explains what it plans to do.
2.  **Action**: The AI calls a tool.
3.  **Observation**: The environment (your code) returns the result.
4.  **Loop**: The AI looks at the observation and decides if it's done or needs more actions.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Implementing the Loop',
      content: `
In Python, we use a simple \`while\` loop.

\`\`\`python
messages = [{"role": "user", "content": "Find the weather in Tokyo and then suggest a restaurant."}]

while True:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools
    )
    
    # 1. Add assistant message to history
    message = response.choices[0].message
    messages.append(message)
    
    # 2. Check if finished
    if not message.tool_calls:
        break # Exit the loop when there are no more tools to call
        
    # 3. Handle tool calls (execute and append to messages)
    for tool_call in message.tool_calls:
        result = execute_tool(tool_call)
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": str(result)
        })
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'In a ReAct loop, when should the while loop typically stop?',
      options: [
        { id: '1', text: 'After exactly 3 iterations.', isCorrect: false },
        { id: '2', text: 'When the AI returns a "stop" keyword.', isCorrect: false },
        { id: '3', text: 'When the assistant message contains no tool_calls (only text).', isCorrect: true },
        { id: '4', text: 'When the user presses Enter.', isCorrect: false },
      ],
      explanation: 'An agent finishes its task when it has gathered enough information and decided it doesn\'t need to call any more tools.',
    },
  ],
}
