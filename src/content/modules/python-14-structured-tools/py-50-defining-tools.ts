import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-50-defining-tools',
  slug: 'defining-tools',
  title: 'Defining Tools',
  description: 'Learn how to describe Python functions so an AI can understand and use them.',
  order: 2,
  xpReward: 90,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-49-structured-outputs'],
  tags: ['tools', 'functions', 'ai-agents'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'What are Tools?',
      content: `
A **Tool** is a Python function that you give to the AI.

To make this work, you have to describe the function to the AI using a specific JSON format. This tells the AI:
-   **What** the function does (description)
-   **What inputs** it needs (parameters)
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'The Tool Definition',
      content: `
In the OpenAI SDK, tools are a list of objects.

\`\`\`python
def get_stock_price(symbol: str):
    # Imagine this calls a real API
    return 150.0

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_stock_price",
            "description": "Get the current stock price for a symbol",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string"}
                },
                "required": ["symbol"]
            }
        }
    }
]
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'Which part of the tool definition helps the AI decide WHEN to use the tool?',
      options: [
        { id: '1', text: 'The function name', isCorrect: false },
        { id: '2', text: 'The function description', isCorrect: true },
        { id: '3', text: 'The parameters list', isCorrect: false },
        { id: '4', text: 'The Python code inside the function', isCorrect: false },
      ],
      explanation: 'The AI uses the description to match the user\'s intent with available tools. A clear description is crucial!',
    },
  ],
}
