import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-59-cli-agent',
  slug: 'cli-agent',
  title: 'CLI Assistant',
  description: 'Build a terminal assistant that uses Python scripts.',
  order: 3,
  xpReward: 150,
  estimatedMinutes: 20,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-40-dotenv'],
  tags: ['cli', 'terminal', 'assistant'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Terminal Powered by AI',
      content: `# Transforming the Workspace

A **CLI Agent** (Command Line Interface) lives in your terminal and helps you automate tasks like:
- Renaming batches of files
- Summarizing local documents
- Searching your logs

It uses libraries like \`click\` or \`argparse\` to take user input, and official AI SDKs to process that input.`,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Simple CLI Structure',
      content: `\`\`\`python
import sys
from openai import OpenAI

def main():
    query = " ".join(sys.argv[1:])
    if not query:
        print("Usage: ai <task>")
        return

    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": query}]
    )
    print(response.choices[0].message.content)

if __name__ == "__main__":
    main()
\`\`\``,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'Which Python module is used to access command-line arguments directly?',
      options: [
        { id: '1', text: 'json', isCorrect: false },
        { id: '2', text: 'sys', isCorrect: true },
        { id: '3', text: 'math', isCorrect: false },
        { id: '4', text: 'random', isCorrect: false },
      ],
      explanation: 'sys.argv is the standard way to get arguments passed to a Python script from the terminal.',
    },
  ],
}
