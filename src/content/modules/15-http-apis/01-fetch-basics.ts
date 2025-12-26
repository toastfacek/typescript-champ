import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-fetch-basics',
  slug: 'fetch-basics',
  title: 'Fetch Basics',
  description: 'Learn how to use the browser Fetch API to make network requests in TypeScript.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['07-async-typescript'],
  tags: ['http', 'api', 'fetch'],
  keyConcepts: [
    {
      id: 'fetch-api',
      term: 'Fetch API',
      definition: 'A modern interface for making HTTP requests in the browser. It returns a Promise that resolves to the Response object.',
      syntax: 'fetch(url)',
      whyItMatters: 'The Fetch API is the standard way to communicate with backend services and AI APIs.',
    },
    {
      id: 'http-methods',
      term: 'HTTP Methods',
      definition: 'Verbs that indicate the type of action you want to perform. Common methods: GET (read), POST (create), PUT (update), DELETE (remove).',
      whyItMatters: 'Using the correct method is essential for following RESTful patterns and interacting correctly with APIs.',
    },
  ],
  steps: [
    {
      id: 'step-1-get-request',
      order: 1,
      type: 'instruction',
      title: 'Making a GET Request',
      content: `# The Fetch API

The simplest way to use \`fetch\` is to provide a URL. By default, it performs a **GET** request.`,
      codeExample: {
        code: `async function getTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log(data);
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-post-request',
      order: 2,
      type: 'instruction',
      title: 'Making a POST Request',
      content: `# Sending Data

To send data, you provide an options object as the second argument to \`fetch\`.`,
      codeExample: {
        code: `async function createTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New Task",
      body: "Learn Fetch",
      userId: 1,
    }),
  });
  const data = await response.json();
  return data;
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Fetch Weather',
      instructions: `1. Create an async function named \`fetchWeather\` that takes a \`city\` string.
2. Use \`fetch\` to call \`"https://api.example.com/weather?city=" + city\`.
3. Wait for the response and then call \`.json()\` on it.
4. Return the resulting data.`,
      starterCode: `async function fetchWeather(city: string) {
  // Implement here
}
`,
      solutionCode: `async function fetchWeather(city: string) {
  const response = await fetch("https://api.example.com/weather?city=" + city);
  const data = await response.json();
  return data;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'fetchWeather should be an async function',
          testCode: `if (fetchWeather.constructor.name !== 'AsyncFunction') throw new Error('Must be async');`,
        },
      ],
      hints: [
        'Use `const response = await fetch(...)`',
        'Use `await response.json()` to parse the data',
      ],
      aiHintPrompt: 'The user is learning the basic pattern of async fetch and json parsing.',
    },
  ],
}
