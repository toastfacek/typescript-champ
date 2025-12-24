import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '28-nodejs-basics',
  slug: 'nodejs-basics',
  title: 'Node.js Basics',
  description: 'Understand Node.js and running TypeScript in Node.',
  order: 28,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['27-error-handling'],
  tags: ['nodejs', 'runtime', 'basics'],
  keyConcepts: [
    {
      id: 'nodejs',
      term: 'Node.js',
      definition: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It lets you run JavaScript (and TypeScript) on the server instead of just in the browser. Node.js provides APIs for file system access, networking, and other server-side operations that browsers don\'t have.',
      syntax: 'node script.js',
      example: {
        code: '// In Node.js, you can use:\nconst fs = require("fs");  // File system\nconst http = require("http");  // HTTP server\n\n// Read a file\nfs.readFile("data.txt", "utf8", (err, data) => {\n  console.log(data);\n});',
        explanation: 'Node.js provides modules like `fs` for file operations and `http` for creating servers. These aren\'t available in browsers.',
      },
      whyItMatters: 'Node.js lets you use TypeScript for backend development. You can build APIs, servers, and command-line tools. Understanding Node.js is essential for full-stack TypeScript development.',
    },
    {
      id: 'typescript-node',
      term: 'TypeScript in Node.js',
      definition: 'To run TypeScript in Node.js, you need to compile it to JavaScript first, or use a tool like `ts-node` that compiles on-the-fly. TypeScript files (.ts) can\'t run directly in Node - they must be compiled to JavaScript (.js) first.',
      syntax: 'tsc script.ts && node script.js\n// or\nts-node script.ts',
      example: {
        code: '// TypeScript file: app.ts\nconsole.log("Hello from TypeScript!");\n\n// Compile:\n// tsc app.ts\n// node app.js\n\n// Or use ts-node:\n// ts-node app.ts',
        explanation: 'You can compile TypeScript to JavaScript with `tsc`, then run the JS file. Or use `ts-node` to compile and run in one step.',
      },
      whyItMatters: 'Understanding how TypeScript runs in Node.js helps you set up development environments and build processes. Most Node.js projects use TypeScript for type safety.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What is Node.js?',
      content: `# JavaScript Runtime

**Node.js** lets you run JavaScript (and TypeScript) on the **server**:

- Built on Chrome's V8 engine
- Provides server-side APIs (file system, networking, etc.)
- Uses the same JavaScript language you know
- Perfect for building APIs and backend services

TypeScript compiles to JavaScript, which Node.js can run!`,
    },
    {
      id: 'step-2-node-vs-browser',
      order: 2,
      type: 'instruction',
      title: 'Node.js vs Browser',
      content: `# Different Environments`,
      codeExample: {
        code: `// Browser APIs (not in Node.js)
window.document
window.localStorage
navigator.geolocation

// Node.js APIs (not in browser)
const fs = require("fs");        // File system
const http = require("http");    // HTTP server
const path = require("path");    // File paths
process.env                       // Environment variables

// Both environments
console.log()
setTimeout()
Promise`,
        language: 'typescript',
        highlight: [1, 2, 3, 6, 7, 8, 9],
      },
    },
    {
      id: 'step-3-running-ts',
      order: 3,
      type: 'instruction',
      title: 'Running TypeScript in Node',
      content: `# Compilation Process

TypeScript must be compiled to JavaScript before Node.js can run it:`,
      codeExample: {
        code: `// 1. Write TypeScript: app.ts
function greet(name: string): string {
  return "Hello, " + name;
}

// 2. Compile to JavaScript: tsc app.ts
// Creates: app.js
function greet(name) {
  return "Hello, " + name;
}

// 3. Run with Node: node app.js

// Or use ts-node (compiles and runs):
// ts-node app.ts`,
        language: 'typescript',
        highlight: [1, 5, 9, 12],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Understand Node.js Concepts',
      instructions: `Create a simple TypeScript function that would work in Node.js:
- Function name: \`logMessage\`
- Takes a string parameter \`message\`
- Returns void
- Uses \`console.log\` to output the message

Note: This is conceptual - we're learning the syntax that would work in Node.js.`,
      starterCode: `// Create a function that would run in Node.js

`,
      solutionCode: `// Create a function that would run in Node.js
function logMessage(message: string): void {
  console.log(message);
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'logMessage should be a function',
          testCode: `if (typeof logMessage !== 'function') throw new Error('logMessage should be a function');`,
        },
      ],
      hints: [
        'Use: function logMessage(message: string): void',
        'Call console.log(message)',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'TypeScript Function for Node',
      instructions: `Create a function \`processData\` that:
- Takes a string \`data\`
- Returns a string
- Returns the data in uppercase

This represents the kind of function you'd write in a Node.js TypeScript project.`,
      starterCode: `// Create processData function

`,
      solutionCode: `// Create processData function
function processData(data: string): string {
  return data.toUpperCase();
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'processData("hello") should return "HELLO"',
          testCode: `if (processData("hello") !== "HELLO") throw new Error('processData("hello") should return "HELLO"');`,
        },
      ],
      hints: [
        'Use .toUpperCase() on the string',
        'Return the result',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Node.js Concept',
      instructions: 'Fill in the missing parts about Node.js.',
      codeTemplate: `// TypeScript file: app.ts
function greet(name: {{BLANK_1}}): string {
  return "Hello, " + name;
}

// To run in Node.js:
// 1. Compile: {{BLANK_2}} app.ts
// 2. Run: {{BLANK_3}} app.js`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type',
          correctAnswers: ['string'],
          caseSensitive: true,
          hint: 'The parameter type...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'command',
          correctAnswers: ['tsc'],
          caseSensitive: true,
          hint: 'The TypeScript compiler command...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'command',
          correctAnswers: ['node'],
          caseSensitive: true,
          hint: 'The Node.js runtime command...',
        },
      ],
      hints: [
        'TypeScript uses string types',
        'tsc compiles TypeScript',
        'node runs JavaScript',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is Node.js?',
      options: [
        {
          id: 'a',
          text: 'A JavaScript runtime for running code on the server',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'A TypeScript compiler',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'A browser API',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'A package manager',
          isCorrect: false,
        },
      ],
      explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that lets you run JavaScript (and compiled TypeScript) on the server. It provides APIs for file system access, networking, and other server-side operations.',
    },
  ],
}

