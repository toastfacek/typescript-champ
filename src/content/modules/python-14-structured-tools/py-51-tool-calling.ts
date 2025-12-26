import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-51-tool-calling',
  slug: 'tool-calling',
  title: 'Tool Calling',
  description: 'Handle the AI\'s request to call a function.',
  order: 3,
  xpReward: 100,
  estimatedMinutes: 18,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-50-defining-tools'],
  tags: ['tool-calling', 'logic', 'ai'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The "Assistant" Message',
      content: `
When an AI wants to use a tool, it doesn't return text. Instead, it returns a \`tool_calls\` object in its message.

### The Flow
1.  **User**: "What's the price of AAPL?"
2.  **Assistant**: (Returns no text, but a tool_call for \`get_stock_price\`)
3.  **Your Code**: See the tool call, run your function, and send the result back.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Checking for Tool Calls',
      content: `
\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Price of AAPL?"}],
    tools=tools # The list we created earlier
)

message = response.choices[0].message

if message.tool_calls:
    for tool_call in message.tool_calls:
        print(f"AI wants to call: {tool_call.function.name}")
        print(f"Arguments: {tool_call.function.arguments}")
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'Does the AI actually execute your Python code?',
      options: [
        { id: '1', text: 'Yes, it runs on OpenAI\'s servers.', isCorrect: false },
        { id: '2', text: 'No, it only requests to call it; your code must execute the function.', isCorrect: true },
        { id: '3', text: 'Only if you use the "auto-execute" parameter.', isCorrect: false },
        { id: '4', text: 'Yes, but only if the function is simple.', isCorrect: false },
      ],
      explanation: 'The AI only says "Please run this function with these arguments." The actual execution happens on YOUR machine/server.',
    },
  ],
}
