import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '01-class-basics',
  slug: 'class-basics',
  title: 'Class Basics',
  description: 'Introduction to Object-Oriented Programming in TypeScript using classes.',
  order: 1,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 50,
  prerequisites: ['03-objects-interfaces'],
  tags: ['oop', 'classes'],
  keyConcepts: [
    {
      id: 'class',
      term: 'Class',
      definition: 'A blueprint for creating objects. It defines the properties and behaviors that the objects created from it will have.',
      syntax: 'class Name { ... }',
      example: {
        code: 'class User {\n  name: string = "";\n}',
        explanation: 'Defines a User class with a name property.',
      },
      whyItMatters: 'Classes are the foundation of Object-Oriented Programming, allowing you to bundle data and functionality together.',
    },
    {
      id: 'constructor',
      term: 'Constructor',
      definition: 'A special method that runs automatically when a new instance of a class is created. It is used to initialize the object.',
      syntax: 'constructor(param: type) { this.prop = param; }',
      example: {
        code: 'class User {\n  constructor(public name: string) {}\n}',
        explanation: 'A constructor that takes a name and automatically creates a public property.',
      },
      whyItMatters: 'Constructors allow you to set up your objects with the necessary data immediately upon creation.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Introduction to Classes',
      content: `# Introduction to Classes

Classes are a fundamental part of Object-Oriented Programming (OOP). They act as **blueprints** for creating objects.

In TypeScript, classes provide a powerful way to define the structure and behavior of objects while benefiting from type safety.

## A Simple Class

Here is a basic class definition:`,
      codeExample: {
        code: `class Point {
  x: number = 0;
  y: number = 0;
}

const pt = new Point();
console.log(pt.x, pt.y); // 0 0`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-constructor',
      order: 2,
      type: 'instruction',
      title: 'The Constructor',
      content: `# The Constructor

The \`constructor\` is a special method that runs when you create a new instance using the \`new\` keyword. It's used to initialize class properties.`,
      codeExample: {
        code: `class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const pt = new Point(10, 20);`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Car Class',
      instructions: `Create a class named \`Car\` with two properties: \`make\` (string) and \`year\` (number).
      
Include a constructor that initializes both properties.`,
      starterCode: `// Define your Car class here
`,
      solutionCode: `class Car {
  make: string;
  year: number;

  constructor(make: string, year: number) {
    this.make = make;
    this.year = year;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Car class should exist',
          testCode: `if (typeof Car === 'undefined') throw new Error('Car class is not defined');`,
        },
        {
          id: 'test-2',
          description: 'Car should have a make property',
          testCode: `const myCar = new Car('Toyota', 2020);
if (typeof myCar.make !== 'string') throw new Error('Car should have a string property "make"');`,
        },
        {
          id: 'test-3',
          description: 'Car should have a year property',
          testCode: `const myCar = new Car('Toyota', 2020);
if (typeof myCar.year !== 'number') throw new Error('Car should have a number property "year"');`,
        },
      ],
      hints: [
        'Use the `class` keyword followed by `Car` and curly braces',
        'Inside the class, declare `make: string;` and `year: number;`',
        'Add a `constructor(make: string, year: number) { ... }`',
      ],
      aiHintPrompt: 'The user is creating their first TypeScript class with a constructor.',
    },
  ],
}
