import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '26-async-await',
  slug: 'async-await',
  title: 'Async/Await',
  description: 'Write asynchronous code that looks synchronous.',
  order: 26,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  xpReward: 90,
  prerequisites: ['25-promises'],
  tags: ['async', 'await', 'advanced'],
  keyConcepts: [
    {
      id: 'async-function',
      term: 'async Function',
      definition: 'An async function is a function declared with the `async` keyword. It always returns a Promise. If you return a value, it wraps it in a resolved Promise. If you throw an error, it wraps it in a rejected Promise. Inside async functions, you can use `await`.',
      syntax: 'async function name(): Promise<Type> { ... }',
      example: {
        code: 'async function fetchData(): Promise<string> {\n  return "Data";\n}\n\n// Equivalent to:\nfunction fetchData2(): Promise<string> {\n  return Promise.resolve("Data");\n}',
        explanation: 'The `async` keyword makes the function return a Promise automatically. Returning a value is the same as returning Promise.resolve(value).',
      },
      whyItMatters: 'Async functions make asynchronous code look synchronous. They\'re easier to read and write than Promise chains, and error handling works naturally with try/catch.',
    },
    {
      id: 'await',
      term: 'await',
      definition: '`await` pauses the execution of an async function until a Promise resolves. It unwraps the Promise, giving you the resolved value directly. If the Promise rejects, `await` throws the error, which can be caught with try/catch. `await` can only be used inside async functions.',
      syntax: 'const value = await promise;',
      example: {
        code: 'async function getData() {\n  const data = await fetchData();  // Waits for Promise\n  console.log(data);  // Uses the value directly\n  return data.toUpperCase();\n}',
        explanation: '`await` makes the code wait for `fetchData()` to complete, then gives you the result directly. No need for `.then()` - it looks like synchronous code.',
      },
      whyItMatters: '`await` eliminates Promise chains and callbacks. Code reads top-to-bottom like synchronous code, making it much easier to understand. Error handling with try/catch is natural.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What is async/await?',
      content: `# Synchronous-Looking Async Code

\`async/await\` lets you write asynchronous code that **looks synchronous**:

\`\`\`typescript
async function fetchData() {
  const data = await getData();  // Wait for Promise
  return data.toUpperCase();     // Use the value
}
\`\`\`

Much cleaner than Promise chains!`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'async/await Syntax',
      content: `# Using async and await`,
      codeExample: {
        code: `// async function always returns a Promise
async function fetchUser(): Promise<string> {
  return "User data";
}

// Using await to wait for Promises
async function processData() {
  const user = await fetchUser();  // Wait for Promise
  console.log(user);               // "User data"
  return user.toUpperCase();
}

// Error handling with try/catch
async function safeFetch() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error(error);
    return "Error occurred";
  }
}`,
        language: 'typescript',
        highlight: [2, 8, 9, 15, 16, 17],
      },
    },
    {
      id: 'step-3-parallel',
      order: 3,
      type: 'instruction',
      title: 'Parallel Execution',
      content: `# Running Multiple Promises

You can run Promises in parallel:`,
      codeExample: {
        code: `// Sequential (slow)
async function sequential() {
  const user = await fetchUser();     // Wait for user
  const posts = await fetchPosts();  // Then wait for posts
  return { user, posts };
}

// Parallel (fast)
async function parallel() {
  const [user, posts] = await Promise.all([
    fetchUser(),    // Start both
    fetchPosts()    // at the same time
  ]);
  return { user, posts };
}`,
        language: 'typescript',
        highlight: [9, 10, 11],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create an async Function',
      instructions: `Create an async function \`getValue\` that:
- Returns \`Promise<number>\`
- Uses \`await\` to wait for a Promise that resolves to \`42\`
- Returns the value multiplied by 2

Create a helper function \`createPromise\` that returns \`Promise.resolve(42)\`.`,
      starterCode: `// Create helper function
function createPromise(): Promise<number> {
  return Promise.resolve(42);
}

// Create async function

`,
      solutionCode: `// Create helper function
function createPromise(): Promise<number> {
  return Promise.resolve(42);
}

// Create async function
async function getValue(): Promise<number> {
  const value = await createPromise();
  return value * 2;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'getValue() should return a Promise that resolves to 84',
          testCode: `getValue().then((result) => {
  if (result !== 84) throw new Error('Should return 84');
}).catch(() => {
  throw new Error('Should not reject');
});`,
        },
      ],
      hints: [
        'Use: async function getValue(): Promise<number>',
        'const value = await createPromise()',
        'Return value * 2',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Use try/catch with await',
      instructions: `Create an async function \`safeDivide\` that:
- Takes two numbers \`a\` and \`b\`
- Returns \`Promise<number>\`
- Uses a helper function \`divideAsync\` (provided) that may reject
- Uses try/catch to handle errors
- If successful, return the result
- If error, return -1`,
      starterCode: `function divideAsync(a: number, b: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (b === 0) reject(new Error("Division by zero"));
    else resolve(a / b);
  });
}

// Create safeDivide function

`,
      solutionCode: `function divideAsync(a: number, b: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (b === 0) reject(new Error("Division by zero"));
    else resolve(a / b);
  });
}

// Create safeDivide function
async function safeDivide(a: number, b: number): Promise<number> {
  try {
    const result = await divideAsync(a, b);
    return result;
  } catch (error) {
    return -1;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'safeDivide(10, 2) should return 5',
          testCode: `safeDivide(10, 2).then((result) => {
  if (result !== 5) throw new Error('Should return 5');
}).catch(() => {
  throw new Error('Should not reject');
});`,
        },
        {
          id: 'test-2',
          description: 'safeDivide(10, 0) should return -1',
          testCode: `safeDivide(10, 0).then((result) => {
  if (result !== -1) throw new Error('Should return -1 on error');
}).catch(() => {
  throw new Error('Should not reject');
});`,
        },
      ],
      hints: [
        'Use try/catch around await',
        'Return result in try block',
        'Return -1 in catch block',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the async Function',
      instructions: 'Fill in the missing keywords.',
      codeTemplate: `{{BLANK_1}} function fetchData(): Promise<string> {
  const data = {{BLANK_2}} getData();
  return data.toUpperCase();
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'keyword',
          correctAnswers: ['async'],
          caseSensitive: true,
          hint: 'The keyword that makes a function return a Promise...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'keyword',
          correctAnswers: ['await'],
          caseSensitive: true,
          hint: 'The keyword that waits for a Promise...',
        },
      ],
      hints: [
        'Functions that use await must be async',
        'Use await to wait for Promises',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does the `async` keyword do?',
      options: [
        {
          id: 'a',
          text: 'Makes code run faster',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Makes a function return a Promise and allows using await',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Makes code run synchronously',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Is required for all functions',
          isCorrect: false,
        },
      ],
      explanation: 'The `async` keyword makes a function return a Promise automatically. If you return a value, it wraps it in Promise.resolve(). It also allows you to use the `await` keyword inside the function.',
    },
  ],
}



