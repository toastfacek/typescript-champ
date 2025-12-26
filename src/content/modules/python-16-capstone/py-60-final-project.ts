import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-60-final-project',
  slug: 'final-project',
  title: 'The Final Project',
  description: 'Bring it all together to build your own custom AI Agent.',
  order: 4,
  xpReward: 200,
  estimatedMinutes: 30,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-57-research-agent', 'py-58-code-agent', 'py-59-cli-agent'],
  tags: ['capstone', 'project', 'completion'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Choose Your Adventure',
      content: `# Congratulations! 🎓

You've mastered the Python AI track. For your final project, you will build a complete agent.

### Option A: The Personal Assistant
Build an agent that can manage a local \`todo.txt\` file. Give it tools to \`add_task\`, \`list_tasks\`, and \`mark_complete\`.

### Option B: The Data Analyst
Build an agent that can read a \`.csv\` file and use Python code to calculate averages, trends, or stats.

### Option C: The Creative Writer
Build an agent that can search for plot ideas and then write structured story outlines using Pydantic.`,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Project Requirements',
      content: `Your agent must include:
1. **SDK Integration**: Use OpenAI or Anthropic.
2. **Environment Variables**: Use \`python-dotenv\`.
3. **Structured Logic**: Use Pydantic or Tool Calling.
4. **The Loop**: Your agent should be able to take user input and handle tools in a loop.`,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'You are done! What is the first thing you should do when starting a new Agent project?',
      options: [
        { id: '1', text: 'Write 1000 lines of code.', isCorrect: false },
        { id: '2', text: 'Define your goal, choose your tools, and set up your .env file.', isCorrect: true },
        { id: '3', text: 'Publish it to the App Store immediately.', isCorrect: false },
        { id: '4', text: 'Ask the AI to write the whole thing for you without checking it.', isCorrect: false },
      ],
      explanation: 'Planning your goal and tools is the foundation of any successful AI Agent!',
    },
  ],
}
