import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-api-errors',
  slug: 'api-errors',
  title: 'API Error Handling',
  description: 'Learn how to handle network failures, timeouts, and structured error responses from APIs.',
  order: 3,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['02-handling-responses', '11-error-handling'],
  tags: ['http', 'api', 'errors'],
  keyConcepts: [
    {
      id: 'api-error-class',
      term: 'ApiError Class',
      definition: 'A custom error class used to capture HTTP status codes and response data alongside the error message.',
      whyItMatters: 'Standard Error objects only have a message. Custom API error classes allow your application to react differently to different types of failures (e.g., 401 Unauthorized vs 500 Server Error).',
    },
    {
      id: 'timeout',
      term: 'Timeouts',
      definition: 'Aborting a request that takes too long to respond.',
      syntax: 'AbortController',
      whyItMatters: 'Timeouts prevent your application from hung states when an API is slow or unreachable.',
    },
  ],
  steps: [
    {
      id: 'step-1-custom-error',
      order: 1,
      type: 'instruction',
      title: 'Structured API Errors',
      content: `# Handling Structured Failures

APIs often return a JSON body explaining why they failed. You can capture this data in a custom error class.`,
      codeExample: {
        code: `class ApiError extends Error {
  constructor(public status: number, public data: any) {
    super(\`API Error \${status}\`);
    this.name = "ApiError";
  }
}

async function fetchWithErr(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data);
  }
  return res.json();
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-timeouts',
      order: 2,
      type: 'instruction',
      title: 'Handling Timeouts',
      content: `# Aborting Requests

Use \`AbortController\` to set a timeout for your requests.`,
      codeExample: {
        code: `async function fetchWithTimeout(url: string, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(id);
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Protected FetchER',
      instructions: `1. Create an async function \`fetchOrThrow\` that takes a \`url\`.
2. Perform a \`fetch(url)\`.
3. If \`!response.ok\`, throw an \`Error\` with the message \`"API Error: " + response.status\`.
4. Otherwise, return the parsed JSON.`,
      starterCode: `async function fetchOrThrow(url: string) {
  // Implement here
}
`,
      solutionCode: `async function fetchOrThrow(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("API Error: " + response.status);
  }
  return await response.json();
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should throw on 404',
          testCode: `// Mocking fetch (simulated)
try {
  await fetchOrThrow('https://example.com/404');
  throw new Error('Should have thrown');
} catch (e) {
  if (e.message.indexOf('404') === -1) throw e;
}`,
        },
      ],
      hints: [
        'Use `if (!response.ok)`',
        'Concatenate "API Error: " with `response.status`',
      ],
      aiHintPrompt: 'The user is practicing basic error propagation for HTTP requests.',
    },
  ],
}
