import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-37-requests',
  slug: 'requests-basics',
  title: 'Requests & API Basics',
  description: 'Learn how to make HTTP requests in Python using the httpx library.',
  order: 1,
  xpReward: 70,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: [],
  tags: ['http', 'api', 'requests'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'Connecting to the Web',
      content: `
Python makes it incredibly easy to connect to other servers. Most developers use a library like \`requests\` or \`httpx\`.

We'll use **httpx** because it supports both synchronous and asynchronous requests (we'll need async for AI later!).

### The Anatomy of a Request
1.  **URL**: Where are you sending the request? (e.g., https://api.openai.com)
2.  **Method**: What are you doing? (GET to fetch, POST to create)
3.  **Headers**: Meta-information (like API keys)
4.  **Body**: Data you're sending (usually JSON)
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Your First GET Request',
      content: `
A **GET** request is used to "get" data from a server.

\`\`\`python
import httpx

# Send the request
response = httpx.get("https://jsonplaceholder.typicode.com/posts/1")

# Check if it was successful (200 OK)
print(response.status_code)

# Parse the JSON response
data = response.json()
print(data["title"])
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Fetch Some Data',
      instructions: `
Use \`httpx.get()\` to fetch data from the URL: \`"https://api.example.com/user/123"\`.
Print the \`status_code\` of the response.
      `,
      starterCode: `import httpx

# 1. Make a GET request to https://api.example.com/user/123
# 2. Print the response status code
`,
      solutionCode: `import httpx

response = httpx.get("https://api.example.com/user/123")
print(response.status_code)`,
      testCases: [
        {
          id: 'test-1',
          description: 'Uses httpx.get()',
          testCode: 'assert "httpx.get" in __user_code__',
        },
        {
          id: 'test-2',
          description: 'Correct URL used',
          testCode: 'assert "https://api.example.com/user/123" in __user_code__',
        },
        {
          id: 'test-3',
          description: 'Prints status code',
          testCode: 'assert "print(response.status_code)" in __user_code__.replace(" ", "") or "print(res.status_code)" in __user_code__.replace(" ", "")',
        },
      ],
      hints: [
        'Use the `httpx.get(url)` function',
        'Assign the result to a variable like `response` or `res`',
        'Access the status code with `.status_code`',
      ],
    },
  ],
}
