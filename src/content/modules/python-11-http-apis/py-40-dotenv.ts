import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-40-dotenv',
  slug: 'env-variables',
  title: 'Environment Variables',
  description: 'Keep your API keys safe with .env files.',
  order: 4,
  xpReward: 60,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: [],
  tags: ['security', 'env', 'secrets'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Never Hardcode Secrets',
      content: `
If you put your OpenAI API key directly in your code and upload it to GitHub, hackers will Steal it and spend your money.

Instead, we use **Environment Variables**.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Using python-dotenv',
      content: `
1. Create a file named \`.env\`:
\`\`\`text
OPENAI_API_KEY=sk-abc123...
\`\`\`

2. Load it in Python:
\`\`\`python
import os
from dotenv import load_dotenv

load_dotenv() # Reads the .env file

api_key = os.getenv("OPENAI_API_KEY")
print(f"Key loaded: {api_key[:5]}...")
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'quiz',
      question: 'Which file should you ALWAYS add to your .gitignore?',
      options: [
        { id: '1', text: '.env', isCorrect: true },
        { id: '2', text: 'main.py', isCorrect: false },
        { id: '3', text: 'requirements.txt', isCorrect: false },
        { id: '4', text: 'README.md', isCorrect: false },
      ],
      explanation: 'The .env file contains secrets like API keys. You should NEVER commit it to version control.',
    },
  ],
}
