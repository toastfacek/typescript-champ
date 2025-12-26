import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '05-interfaces-classes',
  slug: 'interfaces-classes',
  title: 'Interfaces & Classes',
  description: 'Learn how to use interfaces to define contracts that classes must implement.',
  order: 5,
  estimatedMinutes: 10,
  difficulty: 'advanced',
  xpReward: 70,
  prerequisites: ['03-objects-interfaces', '01-class-basics'],
  tags: ['oop', 'classes', 'interfaces'],
  keyConcepts: [
    {
      id: 'implements',
      term: 'implements Keyword',
      definition: 'Used by a class to declare that it follows a specific interface. The class must then provide implementations for all members defined in that interface.',
      syntax: 'class Name implements InterfaceName { ... }',
      whyItMatters: 'Using implements ensures that a class meets a specific contract, which is vital for building decoupled and testable systems.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Classes and Interfaces',
      content: `# Defining Contracts

An interface describes what an object looks like. When a class **implements** an interface, it's signing a contract saying "I promise to have these properties and methods".`,
      codeExample: {
        code: `interface Alarm {
  alert(): void;
}

class Clock implements Alarm {
  alert() {
    console.log("Beep beep!");
  }
}

const c = new Clock();
c.alert();`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-multiple-interfaces',
      order: 2,
      type: 'instruction',
      title: 'Multiple Interfaces',
      content: `# Implementing Multiple Interfaces

Unlike inheritance (where you can only extend one class), a class can implement as many interfaces as you need.`,
      codeExample: {
        code: `interface Driveable {
  drive(): void;
}

interface Chargeable {
  charge(): void;
}

class Tesla implements Driveable, Chargeable {
  drive() { console.log("Driving..."); }
  charge() { console.log("Charging..."); }
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Smart Home System',
      instructions: `1. Define an interface \`Switchable\` with a method \`turnOn()\` that returns \`void\`.
2. Create a class \`Light\` that implements \`Switchable\`.
3. Create a class \`Fan\` that implements \`Switchable\`.
4. In both classes, implement \`turnOn()\` to log a message to the console.`,
      starterCode: `// Define Switchable and its implementations here
`,
      solutionCode: `interface Switchable {
  turnOn(): void;
}

class Light implements Switchable {
  turnOn() {
    console.log('Light is on');
  }
}

class Fan implements Switchable {
  turnOn() {
    console.log('Fan is on');
  }
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Light should implement turnOn',
          testCode: `const l = new Light();
if (typeof l.turnOn !== 'function') throw new Error('Light must have a turnOn method');`,
        },
        {
          id: 'test-2',
          description: 'Fan should implement turnOn',
          testCode: `const f = new Fan();
if (typeof f.turnOn !== 'function') throw new Error('Fan must have a turnOn method');`,
        },
      ],
      hints: [
        'Start with `interface Switchable { turnOn(): void; }`',
        'Use `class Light implements Switchable { ... }`',
      ],
      aiHintPrompt: 'The user is learning how to implement interfaces in classes.',
    },
  ],
}
