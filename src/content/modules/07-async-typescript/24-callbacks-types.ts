import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '24-callbacks-types',
  slug: 'callbacks-types',
  title: 'Callbacks & Types',
  description: 'Type callback functions for asynchronous operations.',
  order: 24,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['23-utility-types'],
  tags: ['async', 'callbacks', 'functions'],
  keyConcepts: [
    {
      id: 'callback',
      term: 'Callback',
      definition: 'A callback is a function that is passed as an argument to another function and is executed later, often after an asynchronous operation completes. Callbacks let you specify what should happen after something finishes, like "when the data loads, do this".',
      syntax: 'function doSomething(callback: () => void) { callback(); }',
      example: {
        code: 'function fetchData(callback: (data: string) => void) {\n  setTimeout(() => {\n    callback("Data loaded!");\n  }, 1000);\n}\n\nfetchData((data) => {\n  console.log(data);  // "Data loaded!"\n});',
        explanation: 'The `fetchData` function takes a callback that receives a string. When the data is ready, it calls the callback with the data.',
      },
      whyItMatters: 'Callbacks are fundamental to asynchronous programming. They let you handle events, timers, and async operations. Understanding how to type callbacks is essential for working with older APIs and understanding how async code flows.',
    },
    {
      id: 'callback-type',
      term: 'Callback Type',
      definition: 'In TypeScript, you can type callbacks using function type syntax. A callback type describes what parameters the callback accepts and what it returns. This ensures type safety when passing functions around.',
      syntax: '(param: Type) => ReturnType',
      example: {
        code: 'type Callback = (error: Error | null, data: string) => void;\n\nfunction fetchData(callback: Callback) {\n  // ...\n  callback(null, "Success!");\n}\n\nfetchData((err, data) => {\n  if (err) console.error(err);\n  else console.log(data);\n});',
        explanation: 'The `Callback` type defines a function that takes an Error or null, and a string, and returns void. This is the "error-first" callback pattern common in Node.js.',
      },
      whyItMatters: 'Typing callbacks ensures that when you pass a function, it matches what the receiving function expects. This prevents bugs from mismatched parameters or return types.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Callbacks?',
      content: `# Functions as Arguments

A **callback** is a function passed to another function to be called later:

\`\`\`typescript
function doSomething(callback: () => void) {
  // Do work...
  callback();  // Call it when done
}
\`\`\`

Callbacks are common in asynchronous code - they run after something finishes.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Typing Callbacks',
      content: `# Callback Type Syntax`,
      codeExample: {
        code: `// Simple callback: no parameters, returns nothing
function runCallback(callback: () => void) {
  callback();
}

// Callback with parameters
function processData(data: string, callback: (result: string) => void) {
  let result = data.toUpperCase();
  callback(result);
}

// Error-first callback pattern
function fetchData(callback: (error: Error | null, data: string) => void) {
  // Simulate async work
  callback(null, "Data loaded!");
}`,
        language: 'typescript',
        highlight: [2, 7, 12],
      },
    },
    {
      id: 'step-3-type-aliases',
      order: 3,
      type: 'instruction',
      title: 'Callback Type Aliases',
      content: `# Reusable Callback Types

You can create type aliases for callbacks:`,
      codeExample: {
        code: `// Define a callback type
type DataCallback = (data: string) => void;

function fetchUser(callback: DataCallback) {
  callback("User data");
}

function fetchPosts(callback: DataCallback) {
  callback("Post data");
}

// Both functions use the same callback type`,
        language: 'typescript',
        highlight: [2, 4, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Function with Callback',
      instructions: `Create a function \`processNumber\` that:
- Takes a number \`num\`
- Takes a callback \`callback\` of type \`(result: number) => void\`
- Multiplies num by 2 and calls the callback with the result`,
      starterCode: `// Create the processNumber function

`,
      solutionCode: `// Create the processNumber function
function processNumber(num: number, callback: (result: number) => void) {
  callback(num * 2);
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'processNumber should call callback with doubled value',
          testCode: `let called = false;
let result = 0;
processNumber(5, (res) => {
  called = true;
  result = res;
});
if (!called || result !== 10) throw new Error('Callback should be called with 10');`,
        },
      ],
      hints: [
        'Use: function processNumber(num: number, callback: (result: number) => void)',
        'Call callback(num * 2)',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Error-First Callback',
      instructions: `Create a function \`divide\` that:
- Takes two numbers \`a\` and \`b\`
- Takes a callback of type \`(error: Error | null, result: number) => void\`
- If b is 0, call callback with an Error and 0
- Otherwise, call callback with null and a / b`,
      starterCode: `// Create the divide function

`,
      solutionCode: `// Create the divide function
function divide(a: number, b: number, callback: (error: Error | null, result: number) => void) {
  if (b === 0) {
    callback(new Error("Division by zero"), 0);
  } else {
    callback(null, a / b);
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'divide(10, 2, callback) should call callback with null and 5',
          testCode: `let error: Error | null = null;
let result = 0;
divide(10, 2, (err, res) => {
  error = err;
  result = res;
});
if (error !== null || result !== 5) throw new Error('Should call callback with null and 5');`,
        },
        {
          id: 'test-2',
          description: 'divide(10, 0, callback) should call callback with Error',
          testCode: `let error: Error | null = null;
divide(10, 0, (err) => {
  error = err;
});
if (!(error instanceof Error)) throw new Error('Should call callback with Error');`,
        },
      ],
      hints: [
        'Check if b === 0',
        'Call callback(new Error(...), 0) for error case',
        'Call callback(null, a / b) for success case',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Callback Type',
      instructions: 'Fill in the missing callback type.',
      codeTemplate: `function transform(value: string, callback: {{BLANK_1}}) {
  callback(value.toUpperCase());
}

transform("hello", (result: {{BLANK_2}}) => {
  console.log(result);
});`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type',
          correctAnswers: ['(result: string) => void'],
          caseSensitive: true,
          hint: 'The callback takes a string result and returns nothing...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'type',
          correctAnswers: ['string'],
          caseSensitive: true,
          hint: 'The result parameter is a string...',
        },
      ],
      hints: [
        'The callback receives the transformed string',
        'Think about what type the result is',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is a callback function?',
      options: [
        {
          id: 'a',
          text: 'A function that calls another function',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'A function passed as an argument to be executed later',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'A function that returns a function',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'A function that never executes',
          isCorrect: false,
        },
      ],
      explanation: 'A callback is a function that is passed as an argument to another function and is executed at a later time, often after an asynchronous operation completes.',
    },
  ],
}





