import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '21-generic-interfaces',
  slug: 'generic-interfaces',
  title: 'Generic Interfaces',
  description: 'Create reusable interfaces with type parameters.',
  order: 21,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['20-generic-functions'],
  tags: ['generics', 'interfaces', 'advanced'],
  keyConcepts: [
    {
      id: 'generic-interface',
      term: 'Generic Interface',
      definition: 'A generic interface is an interface that has one or more type parameters. This lets you create reusable interfaces that work with different types. The type is specified when you use the interface.',
      syntax: 'interface Name<T> { property: T; }',
      example: {
        code: 'interface Box<T> {\n  value: T;\n}\n\nlet stringBox: Box<string> = { value: "hello" };\nlet numberBox: Box<number> = { value: 42 };',
        explanation: 'The `Box` interface has a type parameter T. When you use `Box<string>`, T becomes string, so value must be a string. When you use `Box<number>`, T becomes number.',
      },
      whyItMatters: 'Generic interfaces let you create reusable data structures. Instead of creating separate interfaces for boxes of strings, boxes of numbers, etc., you create one generic Box interface that works with any type.',
    },
    {
      id: 'multiple-type-params',
      term: 'Multiple Type Parameters',
      definition: 'Interfaces can have multiple type parameters, just like functions. This is useful when you need to relate multiple types, like a key-value pair or a result that contains both success data and error information.',
      syntax: 'interface Name<T, U> { prop1: T; prop2: U; }',
      example: {
        code: 'interface Pair<T, U> {\n  first: T;\n  second: U;\n}\n\nlet nameAge: Pair<string, number> = {\n  first: "Alice",\n  second: 25\n};',
        explanation: 'The `Pair` interface has two type parameters. `Pair<string, number>` means first is string and second is number. You can mix and match types as needed.',
      },
      whyItMatters: 'Multiple type parameters give you flexibility to model complex relationships between types. You can create interfaces that work with any combination of types while maintaining type safety.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Generic Interfaces',
      content: `# Reusable Type Definitions

Interfaces can also be generic! This lets you create reusable type definitions:

\`\`\`typescript
interface Box<T> {
  value: T;
}
\`\`\`

The \`<T>\` is a type parameter - specify it when you use the interface.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Generic Interface Syntax',
      content: `# Creating Generic Interfaces`,
      codeExample: {
        code: `// Single type parameter
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: "hello" };
let numberBox: Box<number> = { value: 42 };

// Multiple type parameters
interface Pair<T, U> {
  first: T;
  second: U;
}

let nameAge: Pair<string, number> = {
  first: "Alice",
  second: 25
};`,
        language: 'typescript',
        highlight: [2, 3, 4, 10, 11, 12],
      },
    },
    {
      id: 'step-3-generic-functions',
      order: 3,
      type: 'instruction',
      title: 'Interfaces with Generic Methods',
      content: `# Methods in Generic Interfaces

Interfaces can have generic methods:`,
      codeExample: {
        code: `interface Container<T> {
  value: T;
  getValue(): T;
  setValue(newValue: T): void;
}

let container: Container<string> = {
  value: "hello",
  getValue() {
    return this.value;
  },
  setValue(newValue: string) {
    this.value = newValue;
  }
};`,
        language: 'typescript',
        highlight: [1, 2, 3, 4],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Generic Interface',
      instructions: `Create a generic interface \`Wrapper\` with:
- A type parameter \`T\`
- A property \`data\` of type \`T\`

Then create a variable \`myWrapper\` of type \`Wrapper<string>\` with data set to \`"Hello"\`.`,
      starterCode: `// Define the Wrapper interface

// Create myWrapper variable

`,
      solutionCode: `// Define the Wrapper interface
interface Wrapper<T> {
  data: T;
}

// Create myWrapper variable
let myWrapper: Wrapper<string> = {
  data: "Hello"
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'myWrapper.data should be "Hello"',
          testCode: `if (myWrapper.data !== "Hello") throw new Error('myWrapper.data should be "Hello"');`,
        },
      ],
      hints: [
        'Use: interface Wrapper<T> { data: T; }',
        'Create: let myWrapper: Wrapper<string> = { data: "Hello" }',
      ],
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Multiple Type Parameters',
      instructions: `Create a generic interface \`Result\` with two type parameters:
- \`T\` for success data
- \`E\` for error data
- Properties: \`success\` (boolean), \`data\` (T | null), \`error\` (E | null)

Then create a variable \`result\` of type \`Result<string, string>\` with success: true, data: "Done", error: null.`,
      starterCode: `// Define the Result interface

// Create result variable

`,
      solutionCode: `// Define the Result interface
interface Result<T, E> {
  success: boolean;
  data: T | null;
  error: E | null;
}

// Create result variable
let result: Result<string, string> = {
  success: true,
  data: "Done",
  error: null
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'result.success should be true',
          testCode: `if (result.success !== true) throw new Error('result.success should be true');`,
        },
        {
          id: 'test-2',
          description: 'result.data should be "Done"',
          testCode: `if (result.data !== "Done") throw new Error('result.data should be "Done"');`,
        },
      ],
      hints: [
        'Use: interface Result<T, E> { ... }',
        'Set success: true, data: "Done", error: null',
      ],
    },
    {
      id: 'step-6-fill-blank',
      order: 6,
      type: 'fill-in-blank',
      title: 'Complete the Generic Interface',
      instructions: 'Fill in the missing parts.',
      codeTemplate: `interface Stack<{{BLANK_1}}> {
  items: {{BLANK_2}}[];
  push(item: T): void;
  pop(): {{BLANK_3}} | undefined;
}`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'type parameter',
          correctAnswers: ['T'],
          caseSensitive: true,
          hint: 'The generic type parameter...',
        },
        {
          id: 'BLANK_2',
          placeholder: 'type',
          correctAnswers: ['T'],
          caseSensitive: true,
          hint: 'items is an array of the generic type...',
        },
        {
          id: 'BLANK_3',
          placeholder: 'type',
          correctAnswers: ['T'],
          caseSensitive: true,
          hint: 'pop returns an item of the generic type...',
        },
      ],
      hints: [
        'All three blanks use the same type parameter',
        'Think about what type a stack should hold',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the advantage of using generic interfaces?',
      options: [
        {
          id: 'a',
          text: 'They make code run faster',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'They allow you to create reusable interfaces that work with different types',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'They are required for all interfaces',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'They only work with arrays',
          isCorrect: false,
        },
      ],
      explanation: 'Generic interfaces let you define a structure once and reuse it with different types. Instead of creating separate interfaces for each type, you create one generic interface that adapts to whatever type you need.',
    },
  ],
}




