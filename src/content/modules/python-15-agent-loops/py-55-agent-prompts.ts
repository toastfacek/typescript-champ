import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-55-agent-prompts',
  slug: 'agent-prompts',
  title: 'Agent System Prompts',
  description: 'Design effective system prompts to guide autonomous behavior.',
  order: 3,
  xpReward: 70,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-42-roles-messages'],
  tags: ['prompting', 'agents', 'persona'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Agent\'s Constitution',
      content: `
For a standard chatbot, your system prompt might be: *"You are a helpful assistant."*

For an **Agent**, you need to be much more specific about its tools, its reasoning process, and its stopping conditions.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Structuring an Agent Prompt',
      content: `
A strong agent prompt includes:
1.  **Role**: "You are a specialized Research Agent."
2.  **Capabilities**: "You have tools to search the web and read files."
3.  **Process**: "Always think step-by-step before using a tool."
4.  **Formatting**: "Return your final answer in Markdown."
5.  **Constraints**: "Never guess facts; use your tools."
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'Which of these is the most effective system prompt for a File-Management Agent?',
      options: [
        { id: '1', text: 'You are a bot that helps with files.', isCorrect: false },
        { id: '2', text: 'You are an agent with access to read_file and write_file tools. Analyze the user request, plan your steps, and use tools to manage their project files. Always verify a file exists before reading.', isCorrect: true },
        { id: '3', text: 'Hello, please help the user with their files as best as you can.', isCorrect: false },
        { id: '4', text: 'Read the file then write the file.', isCorrect: false },
      ],
      explanation: 'A good agent prompt defines the identity, specific tools, process (plan steps), and constraints (verify existence).',
    },
  ],
}
