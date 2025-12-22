import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '08-object-types',
  slug: 'object-types',
  title: 'Object Types',
  description: 'Learn to define and use typed objects in TypeScript.',
  order: 8,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['07-function-types'],
  tags: ['objects', 'types'],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Objects in TypeScript',
      content: `# Working with Objects

Objects are collections of related data. In TypeScript, you can describe exactly what properties an object should have and what types they should be.

This is one of TypeScript's most powerful features!`,
    },
    {
      id: 'step-2-inline-types',
      order: 2,
      type: 'instruction',
      title: 'Inline Object Types',
      content: `# Describing Object Shape

You can describe an object's type inline:`,
      codeExample: {
        code: `// Inline object type
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// With multiple properties
let product: {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
} = {
  id: 1,
  title: "Laptop",
  price: 999.99,
  inStock: true
};`,
        language: 'typescript',
        highlight: [2, 8, 9, 10, 11],
      },
    },
    {
      id: 'step-3-accessing',
      order: 3,
      type: 'instruction',
      title: 'Accessing Object Properties',
      content: `# Type Safety with Objects

TypeScript knows what properties exist and their types:`,
      codeExample: {
        code: `let person: { name: string; age: number } = {
  name: "Bob",
  age: 30
};

// TypeScript knows these types:
let personName: string = person.name;  // OK
let personAge: number = person.age;    // OK

// TypeScript catches errors:
// person.email;  // Error! Property 'email' doesn't exist
// person.age = "thirty";  // Error! Can't assign string to number`,
        language: 'typescript',
        highlight: [7, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Create a Typed Object',
      instructions: `Create a variable called \`book\` with an inline object type containing:
- \`title\` (string): "TypeScript Guide"
- \`pages\` (number): 350
- \`isPublished\` (boolean): true`,
      starterCode: `// Create your book object with inline type

`,
      solutionCode: `// Create your book object with inline type
let book: { title: string; pages: number; isPublished: boolean } = {
  title: "TypeScript Guide",
  pages: 350,
  isPublished: true
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'book.title should be "TypeScript Guide"',
          testCode: `if (book.title !== "TypeScript Guide") throw new Error('book.title should be "TypeScript Guide"');`,
        },
        {
          id: 'test-2',
          description: 'book.pages should be 350',
          testCode: `if (book.pages !== 350) throw new Error('book.pages should be 350');`,
        },
        {
          id: 'test-3',
          description: 'book.isPublished should be true',
          testCode: `if (book.isPublished !== true) throw new Error('book.isPublished should be true');`,
        },
      ],
      hints: [
        'Start with: let book: { ... } = { ... }',
        'List properties separated by semicolons in the type',
        'The actual object uses commas between properties',
      ],
    },
    {
      id: 'step-5-nested',
      order: 5,
      type: 'instruction',
      title: 'Nested Objects',
      content: `# Objects Inside Objects

Objects can contain other objects:`,
      codeExample: {
        code: `let employee: {
  name: string;
  position: string;
  contact: {
    email: string;
    phone: string;
  };
} = {
  name: "Sarah",
  position: "Developer",
  contact: {
    email: "sarah@example.com",
    phone: "555-1234"
  }
};

// Access nested properties
let email = employee.contact.email;  // "sarah@example.com"`,
        language: 'typescript',
        highlight: [4, 5, 6, 7],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Nested Object Practice',
      instructions: `Create a \`player\` object with:
- \`username\` (string): "hero123"
- \`level\` (number): 5
- \`stats\` (object) containing:
  - \`health\` (number): 100
  - \`mana\` (number): 50`,
      starterCode: `// Create your player object with nested stats

`,
      solutionCode: `// Create your player object with nested stats
let player: {
  username: string;
  level: number;
  stats: {
    health: number;
    mana: number;
  };
} = {
  username: "hero123",
  level: 5,
  stats: {
    health: 100,
    mana: 50
  }
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'player.username should be "hero123"',
          testCode: `if (player.username !== "hero123") throw new Error('player.username should be "hero123"');`,
        },
        {
          id: 'test-2',
          description: 'player.level should be 5',
          testCode: `if (player.level !== 5) throw new Error('player.level should be 5');`,
        },
        {
          id: 'test-3',
          description: 'player.stats.health should be 100',
          testCode: `if (player.stats.health !== 100) throw new Error('player.stats.health should be 100');`,
        },
        {
          id: 'test-4',
          description: 'player.stats.mana should be 50',
          testCode: `if (player.stats.mana !== 50) throw new Error('player.stats.mana should be 50');`,
        },
      ],
      hints: [
        'The stats property type is another object type: { health: number; mana: number }',
        'Nest the type definition and the actual object the same way',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What happens if you try to add a property that\'s not in the object type?',
      codeContext: `let cat: { name: string; age: number } = {
  name: "Whiskers",
  age: 3,
  color: "orange"  // What happens?
};`,
      options: [
        {
          id: 'a',
          text: 'It works fine - extra properties are allowed',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'TypeScript shows an error - the property is not defined in the type',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'The extra property is automatically removed',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'The code crashes at runtime',
          isCorrect: false,
        },
      ],
      explanation: 'TypeScript uses "excess property checking" to catch typos and ensure objects match their declared type exactly. If you need extra properties, you\'d need to include them in the type definition.',
    },
  ],
}
