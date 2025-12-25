import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '09-interfaces',
  slug: 'interfaces',
  title: 'Interfaces',
  description: 'Create reusable type definitions with interfaces.',
  order: 9,
  estimatedMinutes: 14,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['08-object-types'],
  tags: ['interfaces', 'types', 'objects'],
  keyConcepts: [
    {
      id: 'interfaces',
      term: 'Interfaces',
      definition: 'An interface is a reusable blueprint for object types. Instead of writing the same object type over and over, you define it once with an interface and reuse it. Interfaces make your code more maintainable and easier to understand.',
      syntax: 'interface Name { property: type; }',
      example: {
        code: '// Define once\ninterface User {\n  name: string;\n  age: number;\n}\n\n// Use everywhere\nlet user1: User = { name: "Alice", age: 30 };\nlet user2: User = { name: "Bob", age: 25 };',
        explanation: 'The `User` interface defines what a user object should look like. Now you can use `User` as a type anywhere, and TypeScript will ensure objects match this structure.',
      },
      whyItMatters: 'Interfaces eliminate repetition and create a single source of truth for object shapes. When you need to change a structure, you only update it in one place.',
    },
    {
      id: 'interface-extension',
      term: 'Interface Extension',
      definition: 'Interfaces can extend (inherit from) other interfaces. This means one interface can include all properties from another interface, plus add its own. Extension lets you build complex types from simpler ones.',
      syntax: 'interface Child extends Parent { newProperty: type; }',
      example: {
        code: 'interface Animal {\n  name: string;\n  age: number;\n}\n\n// Dog extends Animal, so it has name, age, AND breed\ninterface Dog extends Animal {\n  breed: string;\n}\n\nlet myDog: Dog = {\n  name: "Buddy",\n  age: 3,\n  breed: "Golden Retriever"\n};',
        explanation: '`Dog` extends `Animal`, so it automatically has `name` and `age` properties, plus it adds `breed`. This is like saying "a Dog is an Animal with an additional breed property".',
      },
      whyItMatters: 'Interface extension promotes code reuse and models real-world relationships. It lets you build complex types incrementally, making your type system more organized and maintainable.',
    },
    {
      id: 'interface-vs-type',
      term: 'Interface vs Type',
      definition: 'Both interfaces and type aliases can describe object shapes, but they have differences. Interfaces are better for object shapes and can be extended/merged. Type aliases are more flexible and can represent unions, intersections, and other complex types. For simple object shapes, either works, but interfaces are more common.',
      syntax: 'interface I { } vs type T = { }',
      example: {
        code: '// Interface - good for objects\ninterface User {\n  name: string;\n}\n\n// Type alias - more flexible\ntype ID = string | number;\ntype Status = "active" | "inactive";',
        explanation: 'Interfaces are ideal for object shapes. Type aliases are better for unions, intersections, and other complex types. Both can describe objects, but interfaces are preferred for that use case.',
      },
      whyItMatters: 'Understanding when to use interfaces vs types helps you write idiomatic TypeScript. Interfaces are the standard choice for object shapes, while types are better for complex type operations.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What Are Interfaces?',
      content: `# Reusable Object Types

Inline object types get repetitive. **Interfaces** let you define an object type once and reuse it everywhere!

Think of an interface as a blueprint for objects.`,
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Interface Syntax',
      content: `# Defining an Interface

Use the \`interface\` keyword:`,
      codeExample: {
        code: `// Define the interface
interface User {
  name: string;
  email: string;
  age: number;
}

// Use it to type variables
let user1: User = {
  name: "Alice",
  email: "alice@example.com",
  age: 28
};

let user2: User = {
  name: "Bob",
  email: "bob@example.com",
  age: 35
};`,
        language: 'typescript',
        highlight: [2, 3, 4, 5, 6],
      },
    },
    {
      id: 'step-3-functions',
      order: 3,
      type: 'instruction',
      title: 'Interfaces with Functions',
      content: `# Using Interfaces in Functions

Interfaces make function signatures cleaner:`,
      codeExample: {
        code: `interface Product {
  id: number;
  name: string;
  price: number;
}

// Function that takes a Product
function displayProduct(product: Product): string {
  return \`\${product.name}: $\${product.price}\`;
}

// Function that returns a Product
function createProduct(id: number, name: string, price: number): Product {
  return { id, name, price };
}

let laptop = createProduct(1, "Laptop", 999);
displayProduct(laptop);  // "Laptop: $999"`,
        language: 'typescript',
        highlight: [7, 12],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create an Interface',
      instructions: `Create an interface called \`Song\` with:
- \`title\` (string)
- \`artist\` (string)
- \`duration\` (number) - in seconds

Then create a variable \`mySong\` of type \`Song\` with any values you like.`,
      starterCode: `// Define the Song interface

// Create a mySong variable
`,
      solutionCode: `// Define the Song interface
interface Song {
  title: string;
  artist: string;
  duration: number;
}

// Create a mySong variable
let mySong: Song = {
  title: "Bohemian Rhapsody",
  artist: "Queen",
  duration: 354
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'mySong should have a title (string)',
          testCode: `if (typeof mySong.title !== 'string') throw new Error('mySong.title should be a string');`,
        },
        {
          id: 'test-2',
          description: 'mySong should have an artist (string)',
          testCode: `if (typeof mySong.artist !== 'string') throw new Error('mySong.artist should be a string');`,
        },
        {
          id: 'test-3',
          description: 'mySong should have a duration (number)',
          testCode: `if (typeof mySong.duration !== 'number') throw new Error('mySong.duration should be a number');`,
        },
      ],
      hints: [
        'Start with: interface Song { ... }',
        'Use the interface as a type: let mySong: Song = { ... }',
        'Fill in any song details you want!',
      ],
    },
    {
      id: 'step-5-extending',
      order: 5,
      type: 'instruction',
      title: 'Extending Interfaces',
      content: `# Building on Interfaces

Interfaces can extend other interfaces using \`extends\`:`,
      codeExample: {
        code: `interface Animal {
  name: string;
  age: number;
}

// Dog extends Animal - it has all Animal properties plus more
interface Dog extends Animal {
  breed: string;
  isGoodBoy: boolean;
}

let myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  isGoodBoy: true  // Always true!
};`,
        language: 'typescript',
        highlight: [7, 8, 9],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Extend an Interface',
      instructions: `Given this base interface:

\`\`\`typescript
interface Vehicle {
  brand: string;
  year: number;
}
\`\`\`

Create a \`Car\` interface that extends \`Vehicle\` and adds:
- \`doors\` (number)
- \`electric\` (boolean)

Then create a \`myCar\` variable of type \`Car\`.`,
      starterCode: `interface Vehicle {
  brand: string;
  year: number;
}

// Create Car interface that extends Vehicle

// Create myCar variable
`,
      solutionCode: `interface Vehicle {
  brand: string;
  year: number;
}

// Create Car interface that extends Vehicle
interface Car extends Vehicle {
  doors: number;
  electric: boolean;
}

// Create myCar variable
let myCar: Car = {
  brand: "Tesla",
  year: 2023,
  doors: 4,
  electric: true
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'myCar should have brand from Vehicle',
          testCode: `if (typeof myCar.brand !== 'string') throw new Error('myCar.brand should be a string');`,
        },
        {
          id: 'test-2',
          description: 'myCar should have year from Vehicle',
          testCode: `if (typeof myCar.year !== 'number') throw new Error('myCar.year should be a number');`,
        },
        {
          id: 'test-3',
          description: 'myCar should have doors',
          testCode: `if (typeof myCar.doors !== 'number') throw new Error('myCar.doors should be a number');`,
        },
        {
          id: 'test-4',
          description: 'myCar should have electric',
          testCode: `if (typeof myCar.electric !== 'boolean') throw new Error('myCar.electric should be a boolean');`,
        },
      ],
      hints: [
        'Use: interface Car extends Vehicle { ... }',
        'Car will have all Vehicle properties automatically',
        'Only add the new properties in Car',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is a key benefit of using interfaces over inline object types?',
      options: [
        {
          id: 'a',
          text: 'Interfaces are faster at runtime',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Interfaces can be reused and extended',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Interfaces allow any property',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Interfaces are required for objects',
          isCorrect: false,
        },
      ],
      explanation: 'Interfaces let you define a type once and use it everywhere. You can also extend interfaces to build on existing types, making your code more organized and maintainable.',
    },
  ],
}
