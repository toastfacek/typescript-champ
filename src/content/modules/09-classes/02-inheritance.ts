import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-inheritance',
  slug: 'inheritance',
  title: 'Inheritance',
  description: 'Learn how to create specialized classes from existing ones using inheritance.',
  order: 2,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-class-basics'],
  tags: ['oop', 'classes', 'inheritance'],
  keyConcepts: [
    {
      id: 'inheritance',
      term: 'Inheritance',
      definition: 'A mechanism where one class (subclass) acquires the properties and methods of another class (superclass).',
      syntax: 'class Subclass extends Superclass { ... }',
      example: {
        code: 'class Animal { name: string = ""; }\nclass Dog extends Animal { breed: string = ""; }',
        explanation: 'Dog inherits name from Animal.',
      },
      whyItMatters: 'Inheritance enables code reuse and allows you to create hierarchical relationships between objects.',
    },
    {
      id: 'super-keyword',
      term: 'super Keyword',
      definition: 'Used in a subclass to call the constructor or methods of its superclass.',
      syntax: 'super(args);',
      example: {
        code: 'constructor(name: string) {\n  super(name);\n}',
        explanation: 'Calls the constructor of the parent class.',
      },
      whyItMatters: 'You must call super() in a subclass constructor before using "this" to ensure the parent class is correctly initialized.',
    },
  ],
  steps: [
    {
      id: 'step-1-extends',
      order: 1,
      type: 'instruction',
      title: 'The extends Keyword',
      content: `# Inheritance with extends

Inheritance allows you to create a new class based on an existing one. The new class (the **subclass**) inherits all the properties and methods of the original class (the **superclass** or **base class**).

In TypeScript, we use the \`extends\` keyword for inheritance.`,
      codeExample: {
        code: `class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.move(); // Still works!
dog.bark();`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-super',
      order: 2,
      type: 'instruction',
      title: 'Using super()',
      content: `# Calling the Base Constructor

If a subclass has its own constructor, it **must** call \`super()\` to execute the constructor of the base class. This must happen before you use \`this\`.`,
      codeExample: {
        code: `class Employee {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Developer extends Employee {
  language: string;
  constructor(name: string, language: string) {
    super(name); // Must call parent constructor
    this.language = language;
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Specialized Class',
      instructions: `Follow these steps:
1. Use the provided \`Vehicle\` class as a base.
2. Create a subclass named \`ElectricCar\` that extends \`Vehicle\`.
3. Add a new property \`batteryLevel\` (number) to \`ElectricCar\`.
4. Implement a constructor in \`ElectricCar\` that takes \`brand\` (string) and \`batteryLevel\` (number).
5. Remember to call \`super(brand)\`!`,
      starterCode: `class Vehicle {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}

// Create ElectricCar subclass here
`,
      solutionCode: `class Vehicle {
  brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}

class ElectricCar extends Vehicle {
  batteryLevel: number;
  constructor(brand: string, batteryLevel: number) {
    super(brand);
    this.batteryLevel = batteryLevel;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'ElectricCar should extend Vehicle',
          testCode: `const car = new ElectricCar('Tesla', 100);
if (!(car instanceof Vehicle)) throw new Error('ElectricCar must extend Vehicle');`,
        },
        {
          id: 'test-2',
          description: 'ElectricCar should have batteryLevel',
          testCode: `const car = new ElectricCar('Tesla', 90);
if (car.batteryLevel !== 90) throw new Error('batteryLevel should be correctly assigned');`,
        },
        {
          id: 'test-3',
          description: 'ElectricCar should inherit brand',
          testCode: `const car = new ElectricCar('Tesla', 80);
if (car.brand !== 'Tesla') throw new Error('brand should be inherited and assigned via super()');`,
        },
      ],
      hints: [
        'Use `class ElectricCar extends Vehicle`',
        'In the constructor, call `super(brand)` first',
        'Then assign `this.batteryLevel = batteryLevel`',
      ],
      aiHintPrompt: 'The user is learning inheritance and how to use super().',
    },
  ],
}
