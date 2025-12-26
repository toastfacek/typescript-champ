import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-52-executing-tools',
  slug: 'executing-tools',
  title: 'Executing Tools',
  description: 'Run your local Python code and give the results back to the AI.',
  order: 4,
  xpReward: 100,
  estimatedMinutes: 20,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-51-tool-calling'],
  tags: ['execution', 'logic', 'ai-agents'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Tool Message Role',
      content: `
Once you run your function, you must satisfy the AI's request by sending a final message with the role **"tool"**.

This message needs:
1.  **tool_call_id**: The ID from the assistant's request.
2.  **content**: The result of your function (formatted as a string).
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Sending Results Back',
      content: `
\`\`\`python
# 1. Run your code
result = get_stock_price("AAPL")

# 2. Add the result to history
messages.append(message) # Add the assistant's tool_call message
messages.append({
    "role": "tool",
    "tool_call_id": tool_call.id,
    "content": str(result)
})

# 3. Call AI again to get the final answer
second_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages
)
print(second_response.choices[0].message.content)
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Construct a Tool Response',
      instructions: `
Imagine the AI asked to call a tool with ID \`"call_123"\`. The result of the function was \`42\`.
Construct a dictionary representing the tool response message.
      `,
      starterCode: `# Create the message dictionary here
tool_response = {
    # fill in the keys: role, tool_call_id, content
}
`,
      solutionCode: `tool_response = {
    "role": "tool",
    "tool_call_id": "call_123",
    "content": "42"
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Role is tool',
          testCode: 'assert tool_response["role"] == "tool"',
        },
        {
          id: 'test-2',
          description: 'Correct tool_call_id',
          testCode: 'assert tool_response["tool_call_id"] == "call_123"',
        },
        {
          id: 'test-3',
          description: 'Content is a string "42"',
          testCode: 'assert tool_response["content"] == "42"',
        },
      ],
      hints: [
        'Tool responses must always have the "tool" role.',
        'The content should be a string, even if the result was a number.',
      ],
    },
  ],
}
