import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '29-npm-packages',
  slug: 'npm-packages',
  title: 'npm & Packages',
  description: 'Work with npm packages and package.json.',
  order: 29,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['28-nodejs-basics'],
  tags: ['npm', 'packages', 'dependencies'],
  keyConcepts: [
    {
      id: 'npm',
      term: 'npm',
      definition: 'npm (Node Package Manager) is the package manager for Node.js. It lets you install, manage, and share JavaScript/TypeScript packages (libraries). npm comes bundled with Node.js, so when you install Node.js, you get npm automatically.',
      syntax: 'npm install package-name',
      example: {
        code: '// Install a package\nnpm install lodash\n\n// Use it in your code\nimport _ from "lodash";\nconst numbers = [1, 2, 3];\nconst doubled = _.map(numbers, n => n * 2);',
        explanation: '`npm install lodash` downloads the lodash library. You can then import and use it in your TypeScript code.',
      },
      whyItMatters: 'npm gives you access to millions of packages. Instead of writing everything from scratch, you can use well-tested libraries. Understanding npm is essential for any Node.js/TypeScript project.',
    },
    {
      id: 'package-json',
      term: 'package.json',
      definition: '`package.json` is a file that describes your Node.js project. It lists dependencies (packages your project needs), scripts (commands you can run), and metadata (name, version, etc.). When you run `npm install`, npm reads package.json to know what to install.',
      syntax: '{ "name": "project", "dependencies": { ... } }',
      example: {
        code: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js"\n  },\n  "dependencies": {\n    "lodash": "^4.17.21"\n  }\n}',
        explanation: 'The package.json file defines the project name, version, scripts you can run with `npm run`, and dependencies that will be installed.',
      },
      whyItMatters: 'package.json is the configuration file for your project. It ensures everyone working on the project uses the same dependencies and can run the same scripts. It\'s essential for sharing and deploying projects.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What is npm?',
      content: `# Node Package Manager

**npm** is the package manager for Node.js:

- Install libraries: \`npm install lodash\`
- Manage dependencies in \`package.json\`
- Run scripts: \`npm run build\`
- Share your own packages

npm comes with Node.js - no separate installation needed!`,
    },
    {
      id: 'step-2-package-json',
      order: 2,
      type: 'instruction',
      title: 'package.json Structure',
      content: `# Project Configuration`,
      codeExample: {
        code: `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My TypeScript project",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}`,
        language: 'javascript',
        highlight: [5, 6, 7, 8, 10, 11, 14, 15],
      },
    },
    {
      id: 'step-3-types-packages',
      order: 3,
      type: 'instruction',
      title: '@types Packages',
      content: `# TypeScript Type Definitions

JavaScript packages don't have types. Install \`@types/*\` packages for TypeScript support:`,
      codeExample: {
        code: `// Install a JavaScript library
npm install lodash

// Install its TypeScript types
npm install --save-dev @types/lodash

// Now you get type checking!
import _ from "lodash";
const numbers: number[] = [1, 2, 3];
const doubled = _.map(numbers, n => n * 2);  // TypeScript knows the types`,
        language: 'typescript',
        highlight: [1, 4, 7, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Understand package.json',
      instructions: `Create a simple object that represents what a \`package.json\` might look like:
- Variable name: \`packageJson\`
- Type it as \`Record<string, any>\` (simplified)
- Include properties: \`name\` ("my-app"), \`version\` ("1.0.0"), \`dependencies\` (object with "lodash": "^4.17.21")

This helps you understand the structure of package.json.`,
      starterCode: `// Create packageJson object

`,
      solutionCode: `// Create packageJson object
let packageJson: Record<string, any> = {
  name: "my-app",
  version: "1.0.0",
  dependencies: {
    "lodash": "^4.17.21"
  }
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'packageJson.name should be "my-app"',
          testCode: `if (packageJson.name !== "my-app") throw new Error('packageJson.name should be "my-app"');`,
        },
        {
          id: 'test-2',
          description: 'packageJson.dependencies should have lodash',
          testCode: `if (packageJson.dependencies["lodash"] !== "^4.17.21") throw new Error('packageJson.dependencies should have lodash');`,
        },
      ],
      hints: [
        'Use Record<string, any> for flexible object type',
        'Include name, version, and dependencies properties',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'TypeScript Dependencies',
      instructions: `Create an object \`devDependencies\` of type \`Record<string, string>\` that represents TypeScript-related dev dependencies:
- "typescript": "^5.0.0"
- "@types/node": "^20.0.0"

These are the kind of packages you'd install with \`npm install --save-dev\`.`,
      starterCode: `// Create devDependencies object

`,
      solutionCode: `// Create devDependencies object
let devDependencies: Record<string, string> = {
  "typescript": "^5.0.0",
  "@types/node": "^20.0.0"
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'devDependencies should have typescript',
          testCode: `if (devDependencies["typescript"] !== "^5.0.0") throw new Error('devDependencies should have typescript');`,
        },
      ],
      hints: [
        'Use Record<string, string>',
        'Include typescript and @types/node',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the npm Concept',
      instructions: 'Fill in the missing parts about npm.',
      codeTemplate: `// Install a package
// {{BLANK_1}} install lodash

// Install TypeScript types
// {{BLANK_1}} install --save-dev {{BLANK_2}}/lodash

// Run a script
// {{BLANK_1}} run {{BLANK_3}}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'command',
          correctAnswers: ['npm'],
          caseSensitive: true,
          hint: 'The package manager command...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'prefix',
          correctAnswers: ['@types'],
          caseSensitive: true,
          hint: 'The prefix for TypeScript type packages...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'script name',
          correctAnswers: ['build', 'start', 'dev'],
          caseSensitive: true,
          hint: 'A common script name from package.json...',
        },
      ],
      hints: [
        'npm is the package manager',
        '@types packages provide TypeScript types',
        'Scripts are defined in package.json',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the purpose of @types packages?',
      options: [
        {
          id: 'a',
          text: 'They provide TypeScript type definitions for JavaScript packages',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'They are required for all npm packages',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'They make packages run faster',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'They are only for Node.js packages',
          isCorrect: false,
        },
      ],
      explanation: '@types packages provide TypeScript type definitions for JavaScript libraries. When you install a JavaScript package, you can install its corresponding @types package to get type checking and autocomplete in TypeScript.',
    },
  ],
}

