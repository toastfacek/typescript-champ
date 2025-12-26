import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-in-operator',
  slug: 'in-operator',
  title: 'The in Operator',
  description: 'Learn how to narrow types by checking for the existence of properties using the in operator.',
  order: 3,
  estimatedMinutes: 8,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['01-typeof-instanceof'],
  tags: ['type-guards', 'narrowing'],
  keyConcepts: [
    {
      id: 'in-operator',
      term: 'in operator',
      definition: 'A JavaScript operator used to check if a property exists on an object. TypeScript uses this as a type guard.',
      syntax: '"propertyName" in object',
      whyItMatters: 'The in operator is particularly useful for narrowing union types of objects that don\'t share a common base class or structure.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Checking for Properties',
      content: `# The in Operator

The \`in\` operator checks if a property exists on an object. TypeScript uses this check to narrow the type of an object.`,
      codeExample: {
        code: `interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    // animal is Bird
    animal.fly();
  } else {
    // animal is Fish
    animal.swim();
  }
}`,
        language: 'typescript',
        highlight: [10],
      },
    },
    {
      id: 'step-2-vs-others',
      order: 2,
      type: 'instruction',
      title: 'Why use in?',
      content: `# Why use in?

Unlike \`typeof\` (which only works for primitives) or \`instanceof\` (which only works for classes), \`in\` works for interfaces and simple objects.`,
      codeExample: {
        code: `type Admin = { privileges: string[] };
type User = { name: string };

function login(person: Admin | User) {
  if ("privileges" in person) {
    console.log("Admin log: " + person.privileges.length);
  } else {
    console.log("User log: " + person.name);
  }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Messaging System',
      instructions: `1. You are given a union type \`Email | SMS\`.
2. Create a function named \`send\` that takes a \`message\` of this union type.
3. If the message has an \`address\` property (it is an \`Email\`), return \`"Sending Email to " + message.address\`.
4. If the message has a \`phoneNumber\` property (it is an \`SMS\`), return \`"Sending SMS to " + message.phoneNumber\`.`,
      starterCode: `interface Email {
  address: string;
}

interface SMS {
  phoneNumber: string;
}

function send(message: Email | SMS) {
  // Implement narrowing here
}
`,
      solutionCode: `interface Email {
  address: string;
}

interface SMS {
  phoneNumber: string;
}

function send(message: Email | SMS) {
  if ("address" in message) {
    return "Sending Email to " + message.address;
  } else {
    return "Sending SMS to " + message.phoneNumber;
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should handle Email',
          testCode: `if (send({address: 'test@test.com'}) !== 'Sending Email to test@test.com') throw new Error('Fail');`,
        },
        {
          id: 'test-2',
          description: 'Should handle SMS',
          testCode: `if (send({phoneNumber: '12345'}) !== 'Sending SMS to 12345') throw new Error('Fail');`,
        },
      ],
      hints: [
        'Use \`if ("address" in message)\` to check for Email',
      ],
      aiHintPrompt: 'The user is practicing narrowing with the in operator.',
    },
  ],
}
