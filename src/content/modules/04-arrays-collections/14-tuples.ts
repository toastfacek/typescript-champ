import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '14-tuples',
  slug: 'tuples',
  title: 'Tuples',
  description: 'Create fixed-length arrays with specific types at each position.',
  order: 14,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['13-array-methods'],
  tags: ['tuples', 'arrays', 'types'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Tuples?',
      content: `# Fixed-Length Typed Arrays

A **tuple** is an array where:
- The **length** is fixed
- Each **position** has a specific type

Think of them as "arrays with structure" - perfect for representing things like coordinates, key-value pairs, or function return values.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Tuple Syntax',
      content: `# Creating Tuples`,
      codeExample: {
        code: `// A tuple with [string, number]
let person: [string, number] = ["Alice", 25];

// A coordinate: [x, y]
let point: [number, number] = [10, 20];

// A response: [success, data or error message]
let response: [boolean, string] = [true, "Data loaded"];

// TypeScript knows the type at each position:
let name = person[0];  // string
let age = person[1];   // number`,
        language: 'typescript',
        highlight: [2, 5, 8],
      },
    },
    {
      id: 'step-3-vs-arrays',
      order: 3,
      type: 'instruction',
      title: 'Tuples vs Arrays',
      content: `# The Difference`,
      codeExample: {
        code: `// Array: any number of elements, all same type
let scores: number[] = [95, 87, 92, 88, 91];
// Can have 0, 1, 100, or any number of elements

// Tuple: fixed positions, can have different types
let student: [string, number, boolean] = ["Alice", 95, true];
// Must have exactly 3 elements in this exact order

// Array element access: always the element type
let anyScore = scores[0];  // number

// Tuple element access: type depends on position
let studentName = student[0];   // string
let studentScore = student[1];  // number
let isPassing = student[2];     // boolean`,
        language: 'typescript',
        highlight: [5, 12, 13, 14],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create Tuples',
      instructions: `Create two tuples:
1. \`coordinate\`: a [number, number] tuple set to [5, 10]
2. \`userInfo\`: a [string, number, boolean] tuple representing [name, age, isAdmin]

Set userInfo to ["Admin", 30, true]`,
      starterCode: `// Create coordinate tuple

// Create userInfo tuple
`,
      solutionCode: `// Create coordinate tuple
let coordinate: [number, number] = [5, 10];

// Create userInfo tuple
let userInfo: [string, number, boolean] = ["Admin", 30, true];`,
      testCases: [
        {
          id: 'test-1',
          description: 'coordinate should be [5, 10]',
          testCode: `if (coordinate[0] !== 5 || coordinate[1] !== 10) throw new Error('coordinate should be [5, 10]');`,
        },
        {
          id: 'test-2',
          description: 'userInfo[0] should be "Admin"',
          testCode: `if (userInfo[0] !== "Admin") throw new Error('userInfo[0] should be "Admin"');`,
        },
        {
          id: 'test-3',
          description: 'userInfo[1] should be 30',
          testCode: `if (userInfo[1] !== 30) throw new Error('userInfo[1] should be 30');`,
        },
        {
          id: 'test-4',
          description: 'userInfo[2] should be true',
          testCode: `if (userInfo[2] !== true) throw new Error('userInfo[2] should be true');`,
        },
      ],
      hints: [
        'Tuple type syntax: [type1, type2, type3]',
        'The order of types must match the order of values',
      ],
    },
    {
      id: 'step-5-destructuring',
      order: 5,
      type: 'instruction',
      title: 'Destructuring Tuples',
      content: `# Unpacking Tuple Values

Destructuring makes tuples easy to work with:`,
      codeExample: {
        code: `let response: [number, string] = [200, "Success"];

// Destructure into named variables
let [status, message] = response;
// status: number = 200
// message: string = "Success"

// Great for function returns!
function getMinMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)];
}

let [min, max] = getMinMax([5, 2, 9, 1, 7]);
// min: number = 1
// max: number = 9`,
        language: 'typescript',
        highlight: [4, 9, 13],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Tuple Function Return',
      instructions: `Create a function \`divideWithRemainder\` that:
- Takes two numbers: \`a\` and \`b\`
- Returns a tuple [quotient, remainder]
- Use Math.floor(a / b) for quotient
- Use a % b for remainder

Example: divideWithRemainder(10, 3) returns [3, 1]`,
      starterCode: `// Create the divideWithRemainder function

`,
      solutionCode: `// Create the divideWithRemainder function
function divideWithRemainder(a: number, b: number): [number, number] {
  return [Math.floor(a / b), a % b];
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'divideWithRemainder(10, 3) should return [3, 1]',
          testCode: `let [q, r] = divideWithRemainder(10, 3); if (q !== 3 || r !== 1) throw new Error('divideWithRemainder(10, 3) should return [3, 1]');`,
        },
        {
          id: 'test-2',
          description: 'divideWithRemainder(20, 4) should return [5, 0]',
          testCode: `let [q, r] = divideWithRemainder(20, 4); if (q !== 5 || r !== 0) throw new Error('divideWithRemainder(20, 4) should return [5, 0]');`,
        },
      ],
      hints: [
        'Return type is [number, number]',
        'Return [Math.floor(a / b), a % b]',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What makes a tuple different from a regular array?',
      options: [
        {
          id: 'a',
          text: 'Tuples are faster',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Tuples have fixed length and typed positions',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Tuples can only contain numbers',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Tuples can\'t be modified',
          isCorrect: false,
        },
      ],
      explanation: 'Tuples have a fixed number of elements where each position has its own specific type. Regular arrays can have any length and all elements share the same type.',
    },
  ],
}
