import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-api-clients',
  slug: 'api-clients',
  title: 'Typed API Clients',
  description: 'Learn how to build reusable, class-based API clients that bundle parsing and error handling.',
  order: 4,
  estimatedMinutes: 12,
  difficulty: 'advanced',
  xpReward: 70,
  prerequisites: ['02-handling-responses', '09-classes'],
  tags: ['http', 'api', 'patterns'],
  keyConcepts: [
    {
      id: 'api-client-pattern',
      term: 'API Client Pattern',
      definition: 'Encapsulating all network logic (base URLs, headers, error handling) into a single class or object.',
      whyItMatters: 'API clients make your code cleaner, easier to test, and provide a single place to update if the API changes.',
    },
  ],
  steps: [
    {
      id: 'step-1-basic-client',
      order: 1,
      type: 'instruction',
      title: 'Building a Base Client',
      content: `# Reusable API Logic

Instead of calling \`fetch\` everywhere, create a class that handles the common logic.`,
      codeExample: {
        code: `class BaseClient {
  constructor(public baseUrl: string) {}

  async request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(this.baseUrl + path, options);
    if (!res.ok) throw new Error(\`Request failed: \${res.status}\`);
    return res.json();
  }
}

const api = new BaseClient("https://api.myapp.com");`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-feature-client',
      order: 2,
      type: 'instruction',
      title: 'Domain-Specific Clients',
      content: `# Specialized Clients

Extend your base client to create high-level methods for specific features.`,
      codeExample: {
        code: `class UserClient extends BaseClient {
  async getUser(id: number) {
    return this.request<User>(\`/users/\${id}\`);
  }
}

const users = new UserClient("https://api.myapp.com");
const user = await users.getUser(1);`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Todo Client',
      instructions: `1. Create a class named \`TodoClient\`.
2. Implement a constructor that sets a \`baseUrl\` property.
3. Implement an async method \`getTodo(id: number)\`.
4. It should fetch from \`baseUrl + "/todos/" + id\`.
5. Return the JSON result.`,
      starterCode: `class TodoClient {
  // Implement here
}
`,
      solutionCode: `class TodoClient {
  constructor(public baseUrl: string) {}

  async getTodo(id: number) {
    const response = await fetch(this.baseUrl + "/todos/" + id);
    return await response.json();
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'TodoClient should have getTodo method',
          testCode: `const client = new TodoClient('http://test.com');
if (typeof client.getTodo !== 'function') throw new Error('Missing getTodo');`,
        },
      ],
      hints: [
        'Use `public baseUrl: string` in the constructor for shorthand property setting',
        'Use `fetch(this.baseUrl + "/todos/" + id)`',
      ],
      aiHintPrompt: 'The user is learning the API client pattern using classes.',
    },
  ],
}
