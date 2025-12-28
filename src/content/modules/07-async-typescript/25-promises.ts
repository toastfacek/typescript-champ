import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '25-promises',
  slug: 'promises',
  title: 'Promises',
  description: 'Work with asynchronous operations using Promises.',
  order: 25,
  estimatedMinutes: 14,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['24-callbacks-types'],
  tags: ['async', 'promises', 'advanced'],
  keyConcepts: [
    {
      id: 'promise',
      term: 'Promise',
      definition: 'A Promise represents a value that will be available in the future, or an error that will occur. It\'s an object that represents the eventual completion (or failure) of an asynchronous operation. Promises have three states: pending, fulfilled (resolved), or rejected.',
      syntax: 'Promise<T>',
      example: {
        code: 'const promise = new Promise<string>((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Done!");\n  }, 1000);\n});\n\npromise.then((value) => {\n  console.log(value);  // "Done!"\n});',
        explanation: 'The Promise is created with a function that calls `resolve` when successful or `reject` when it fails. `Promise<string>` means it will resolve with a string value.',
      },
      whyItMatters: 'Promises provide a cleaner way to handle asynchronous operations than callbacks. They avoid "callback hell" and make error handling easier. They\'re the foundation for async/await syntax.',
    },
    {
      id: 'then-catch',
      term: 'then and catch',
      definition: '`then()` handles successful Promise resolution - it receives the resolved value and can return a new value or Promise. `catch()` handles Promise rejection - it receives the error. Both return new Promises, allowing chaining.',
      syntax: 'promise.then(onFulfilled).catch(onRejected)',
      example: {
        code: 'fetchData()\n  .then((data) => {\n    console.log(data);\n    return processData(data);\n  })\n  .then((result) => {\n    console.log(result);\n  })\n  .catch((error) => {\n    console.error(error);\n  });',
        explanation: 'Each `then` receives the result from the previous step. If any step fails, `catch` handles the error. This creates a chain of async operations.',
      },
      whyItMatters: '`then` and `catch` let you chain async operations in a readable way. Each step can transform the data or trigger the next operation. Error handling is centralized in `catch`.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Promises?',
      content: `# Asynchronous Values

A **Promise** represents a value that will be available in the future:

\`\`\`typescript
const promise: Promise<string> = new Promise((resolve, reject) => {
  // Do async work...
  resolve("Done!");
});
\`\`\`

Promises are better than callbacks - they can be chained and handle errors more cleanly.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Promise Syntax',
      content: `# Creating and Using Promises`,
      codeExample: {
        code: `// Creating a Promise
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

// Using .then() and .catch()
promise
  .then((value) => {
    console.log(value);  // "Success!"
  })
  .catch((error) => {
    console.error(error);
  });`,
        language: 'typescript',
        highlight: [2, 3, 4, 5, 9, 12],
      },
    },
    {
      id: 'step-3-chaining',
      order: 3,
      type: 'instruction',
      title: 'Chaining Promises',
      content: `# Promise Chains

You can chain multiple async operations:`,
      codeExample: {
        code: `function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    resolve("data");
  });
}

function processData(data: string): Promise<number> {
  return new Promise((resolve) => {
    resolve(data.length);
  });
}

fetchData()
  .then((data) => processData(data))
  .then((length) => console.log(length));`,
        language: 'typescript',
        highlight: [12, 13],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Promise',
      instructions: `Create a function \`createPromise\` that:
- Returns a \`Promise<number>\`
- Resolves with the value \`42\` after a short delay

Use \`setTimeout\` to simulate the delay.`,
      starterCode: `// Create the createPromise function

`,
      solutionCode: `// Create the createPromise function
function createPromise(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(42);
    }, 100);
  });
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'createPromise should return a Promise that resolves to 42',
          testCode: `createPromise().then((value) => {
  if (value !== 42) throw new Error('Promise should resolve to 42');
}).catch(() => {
  throw new Error('Promise should not reject');
});`,
        },
      ],
      hints: [
        'Use: return new Promise<number>((resolve) => { ... })',
        'Call resolve(42) inside setTimeout',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Use then and catch',
      instructions: `Create a function \`divideAsync\` that:
- Takes two numbers \`a\` and \`b\`
- Returns a \`Promise<number>\`
- If b is 0, reject with an Error("Division by zero")
- Otherwise, resolve with a / b

Then call it with 10 and 2, and use \`.then()\` to log the result.`,
      starterCode: `// Create the divideAsync function

// Call it and use .then()

`,
      solutionCode: `// Create the divideAsync function
function divideAsync(a: number, b: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    if (b === 0) {
      reject(new Error("Division by zero"));
    } else {
      resolve(a / b);
    }
  });
}

// Call it and use .then()
divideAsync(10, 2).then((result) => {
  console.log(result);
});`,
      testCases: [
        {
          id: 'test-1',
          description: 'divideAsync(10, 2) should resolve to 5',
          testCode: `divideAsync(10, 2).then((result) => {
  if (result !== 5) throw new Error('Should resolve to 5');
}).catch(() => {
  throw new Error('Should not reject');
});`,
        },
      ],
      hints: [
        'Use: return new Promise<number>((resolve, reject) => { ... })',
        'Check if b === 0, then reject or resolve',
        'Call .then() on the returned Promise',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Promise',
      instructions: 'Fill in the missing parts.',
      codeTemplate: `function fetchValue(): {{BLANK_1}} {
  return new Promise<number>(({{BLANK_2}}) => {
    {{BLANK_3}}(100);
  });
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'return type',
          correctAnswers: ['Promise<number>'],
          caseSensitive: true,
          hint: 'The function returns a Promise of number...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'parameter',
          correctAnswers: ['resolve'],
          caseSensitive: true,
          hint: 'The function that resolves the Promise...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'function call',
          correctAnswers: ['resolve'],
          caseSensitive: true,
          hint: 'Call the resolve function...',
        },
      ],
      hints: [
        'Promise functions take resolve (and optionally reject)',
        'Call resolve to complete the Promise',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `Promise<string>` mean?',
      options: [
        {
          id: 'a',
          text: 'A Promise that will resolve with a string value',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'A Promise that takes a string parameter',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'A Promise that is a string',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'A Promise that rejects with a string',
          isCorrect: false,
        },
      ],
      explanation: '`Promise<string>` is a generic type that means "a Promise that will eventually resolve with a string value". The type parameter tells you what type of value the Promise will produce when it succeeds.',
    },
  ],
}




