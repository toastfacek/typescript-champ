import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-39-asyncio',
  slug: 'asyncio-basics',
  title: 'Async IO',
  description: 'Handle multiple requests without blocking with asyncio.',
  order: 3,
  xpReward: 90,
  estimatedMinutes: 18,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-37-requests'],
  tags: ['asyncio', 'async-await', 'performance'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Why Async?',
      content: `
Normal Python code is **synchronous**: it runs one line at a time. If a request takes 5 seconds, your whole program stops and waits.

**Asynchronous** code lets Python do other things while waiting for the network. This is crucial for AI agents that might call multiple tools or APIs at once.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Async/Await Basics',
      content: `
To use async, we need:
1. \`async def\`: To define a "coroutine"
2. \`await\`: To wait for an async function to finish

\`\`\`python
import httpx
import asyncio

async def fetch_user():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/user/1")
        return response.json()

# Run the async code
user = asyncio.run(fetch_user())
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Write Your First Async Function',
      instructions: `
Define an \`async\` function named \`get_data\`. 
Inside, use \`await asyncio.sleep(0.1)\` to simulate a network call, then return the string \`"Done!"\`.
      `,
      starterCode: `import asyncio

# Define get_data here
`,
      solutionCode: `import asyncio

async def get_data():
    await asyncio.sleep(0.1)
    return "Done!"`,
      testCases: [
        {
          id: 'test-1',
          description: 'Uses async def',
          testCode: 'assert "async def get_data" in __user_code__',
        },
        {
          id: 'test-2',
          description: 'Uses await',
          testCode: 'assert "await" in __user_code__',
        },
        {
          id: 'test-3',
          description: 'Calls asyncio.sleep',
          testCode: 'assert "asyncio.sleep" in __user_code__',
        },
      ],
      hints: [
        'Prefix the function definition with `async` keyword',
        'Use `await` before calling `asyncio.sleep()`',
      ],
    },
  ],
}
