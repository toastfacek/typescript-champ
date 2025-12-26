import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-abstract-classes',
  slug: 'abstract-classes',
  title: 'Abstract Classes',
  description: 'Learn how to define base classes that cannot be instantiated directly and require subclasses to implement specific methods.',
  order: 4,
  estimatedMinutes: 12,
  difficulty: 'advanced',
  xpReward: 70,
  prerequisites: ['02-inheritance'],
  tags: ['oop', 'classes', 'abstract-classes'],
  keyConcepts: [
    {
      id: 'abstract-class',
      term: 'Abstract Class',
      definition: 'A class that serves as a base for other classes but cannot be instantiated itself. It may contain abstract methods that must be implemented by subclasses.',
      syntax: 'abstract class Name { ... }',
      whyItMatters: 'Abstract classes allow you to define a common interface and shared behavior for a group of related classes while ensuring each subclass provides its own specific implementation for certain methods.',
    },
    {
      id: 'abstract-method',
      term: 'Abstract Method',
      definition: 'A method in an abstract class that has no implementation. Subclasses are required to provide the implementation.',
      syntax: 'abstract methodName(): type;',
      whyItMatters: 'Abstract methods guarantee that all subclasses will have a certain method with a specific signature, which is essential for polymorphism.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'What is an Abstract Class?',
      content: `# Abstract Classes

An **abstract class** is a class that cannot be instantiated directly (you can't use \`new\` on it). It exists solely to be extended by other classes.

Think of it as a partially finished blueprint.`,
      codeExample: {
        code: `abstract class Shape {
  abstract getArea(): number;

  printArea() {
    console.log("The area is: " + this.getArea());
  }
}

// const s = new Shape(); // Error! Cannot create an instance of an abstract class`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-implementation',
      order: 2,
      type: 'instruction',
      title: 'Implementing Abstract Methods',
      content: `# Providing Implementation

Subclasses of an abstract class **must** implement all of its abstract methods.`,
      codeExample: {
        code: `class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle(5);
c.printArea(); // The area is: 78.5398...`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Employee System',
      instructions: `1. Create an abstract class named \`Employee\`.
2. Add an abstract method \`getSalary()\` that returns a \`number\`.
3. Create a class \`FullTimeEmployee\` that extends \`Employee\`.
4. Implement \`getSalary()\` in \`FullTimeEmployee\` to return \`5000\`.
5. Create a class \`PartTimeEmployee\` that extends \`Employee\`.
6. Implement \`getSalary()\` in \`PartTimeEmployee\` to return \`2000\`.`,
      starterCode: `// Define abstract Employee class and its subclasses here
`,
      solutionCode: `abstract class Employee {
  abstract getSalary(): number;
}

class FullTimeEmployee extends Employee {
  getSalary(): number {
    return 5000;
  }
}

class PartTimeEmployee extends Employee {
  getSalary(): number {
    return 2000;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'FullTimeEmployee should return 5000',
          testCode: `const ft = new FullTimeEmployee();
if (ft.getSalary() !== 5000) throw new Error('FullTimeEmployee salary should be 5000');`,
        },
        {
          id: 'test-2',
          description: 'PartTimeEmployee should return 2000',
          testCode: `const pt = new PartTimeEmployee();
if (pt.getSalary() !== 2000) throw new Error('PartTimeEmployee salary should be 2000');`,
        },
        {
          id: 'test-3',
          description: 'Employee should be abstract',
          testCode: `// We check if it exists but we can't easily check 'abstract' at runtime
if (typeof Employee === 'undefined') throw new Error('Employee class is not defined');`,
        },
      ],
      hints: [
        'Use `abstract class Employee` and `abstract getSalary(): number;`',
        'In subclasses, use `getSalary(): number { return ... }`',
      ],
      aiHintPrompt: 'The user is learning abstract classes and methods.',
    },
  ],
}
