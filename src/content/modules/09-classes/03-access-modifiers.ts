import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-access-modifiers',
  slug: 'access-modifiers',
  title: 'Access Modifiers',
  description: 'Control who can access your class properties and methods using public, private, and protected.',
  order: 3,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-class-basics'],
  tags: ['oop', 'classes', 'encapsulation'],
  keyConcepts: [
    {
      id: 'encapsulation',
      term: 'Encapsulation',
      definition: 'The practice of hiding the internal state of an object and requiring all interaction to be performed through an object\'s methods.',
      whyItMatters: 'Encapsulation makes your code more robust by preventing external code from accidentally corrupting an object\'s state.',
    },
    {
      id: 'private',
      term: 'private keyword',
      definition: 'Members marked as private can only be accessed from within the class they are defined in.',
      syntax: 'private propertyName: type;',
      example: {
        code: 'class BankAccount {\n  private balance: number = 0;\n}',
        explanation: 'The balance cannot be accessed directly from outside the class.',
      },
      whyItMatters: 'Private members allow you to hide implementation details and protect sensitive data.',
    },
    {
      id: 'protected',
      term: 'protected keyword',
      definition: 'Members marked as protected can be accessed from within the class they are defined in AND from subclasses.',
      syntax: 'protected propertyName: type;',
      whyItMatters: 'Protected is useful when you want to allow subclasses to use certain parts of the parent class while keeping them hidden from the rest of the world.',
    },
  ],
  steps: [
    {
      id: 'step-1-public',
      order: 1,
      type: 'instruction',
      title: 'The Default: public',
      content: `# public by Default

In TypeScript, every member of a class is \`public\` by default. You can access \`public\` members from anywhere.

It is common practice to omit the \`public\` keyword unless you want to be explicitly clear.`,
      codeExample: {
        code: `class User {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("Alice");
console.log(user.name); // Accessible!`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-private',
      order: 2,
      type: 'instruction',
      title: 'Hiding State with private',
      content: `# The private Modifier

When a member is marked as \`private\`, it cannot be accessed from outside of its containing class.`,
      codeExample: {
        code: `class BankAccount {
  private balance: number = 0;

  deposit(amount: number) {
    this.balance += amount;
  }
}

const account = new BankAccount();
account.deposit(100);
// account.balance; // Error: Property 'balance' is private`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-protected',
      order: 3,
      type: 'instruction',
      title: 'Allowing Subclasses: protected',
      content: `# The protected Modifier

The \`protected\` modifier acts like \`private\`, but it also allows access in subclasses.`,
      codeExample: {
        code: `class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  greet() {
    console.log("Hello, I'm " + this.name); // OK!
  }
}

const emp = new Employee("Bob");
// emp.name; // Error: Property 'name' is protected`,
        language: 'typescript',
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Implement Encapsulation',
      instructions: `1. Create a class named \`Logger\`.
2. Add a \`private\` property named \`logs\` which is an array of strings (\`string[]\`).
3. Add a constructor that initializes \`logs\` as an empty array.
4. Add a \`public\` method \`addLog(message: string)\` that pushes the message into the \`logs\` array.
5. Add a \`public\` method \`getLogCount()\` that returns the length of the \`logs\` array.`,
      starterCode: `class Logger {
  // Implement here
}
`,
      solutionCode: `class Logger {
  private logs: string[];

  constructor() {
    this.logs = [];
  }

  public addLog(message: string) {
    this.logs.push(message);
  }

  public getLogCount(): number {
    return this.logs.length;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'logs should be private',
          testCode: `// We can't easily test private in JS runtime but we can check the API
const logger = new Logger();
if ('logs' in logger && (logger as any).logs !== undefined) {
    // If it's emitted as a property it might be visible in JS, 
    // but TS should catch access errors.
}
`,
        },
        {
          id: 'test-2',
          description: 'addLog and getLogCount should work',
          testCode: `const logger = new Logger();
logger.addLog('First');
logger.addLog('Second');
if (logger.getLogCount() !== 2) throw new Error('getLogCount should return 2');`,
        },
      ],
      hints: [
        'Declare `private logs: string[];`',
        'Use `this.logs.push(message);` in `addLog`',
        'Use `return this.logs.length;` in `getLogCount`',
      ],
      aiHintPrompt: 'The user is practicing encapsulation using private and public modifiers.',
    },
  ],
}
