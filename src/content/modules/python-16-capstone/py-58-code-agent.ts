import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-58-code-agent',
  slug: 'code-agent',
  title: 'Code Assistant',
  description: 'Build an agent that can write, test, and fix Python code.',
  order: 2,
  xpReward: 150,
  estimatedMinutes: 25,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-53-react-loop'],
  tags: ['coding', 'automation', 'agents'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Coding Loop',
      content: `# Beyond Text Generation

A **Code Agent** doesn't just write code—it verifies it.

The "Coding Loop" usually looks like this:
1. **Plan**: LLM decides how to solve the problem.
2. **Write**: LLM generates code and saves it to a file.
3. **Execute**: A tool runs the code and captures errors.
4. **Fix**: If the code failed, the LLM reads the error and tries again.`,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'The Exec-Sandbox Tool',
      content: `Caution: Never run unverified AI code on your own machine without a sandbox!

\`\`\`python
def execute_python(code: str):
    # In production, this runs in a Docker container
    try:
        exec_globals = {}
        exec(code, exec_globals)
        return "Success!"
    except Exception as e:
        return f"Error: {str(e)}"
\`\`\``,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'What is the most important tool for a Code Agent to have?',
      options: [
        { id: '1', text: 'A search tool', isCorrect: false },
        { id: '2', text: 'A tool to execute code and return the output/errors', isCorrect: true },
        { id: '3', text: 'A tool to generate images', isCorrect: false },
        { id: '4', text: 'A tool to send emails', isCorrect: false },
      ],
      explanation: 'Without execution and error feedback, the AI is just guessing. The "Observe" part of the loop is what makes it an agent.',
    },
  ],
}
