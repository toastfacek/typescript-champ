import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '04-user-defined-guards',
  slug: 'user-defined-guards',
  title: 'User-defined Type Guards',
  description: 'Learn how to create custom functions that help TypeScript narrow down types.',
  order: 4,
  estimatedMinutes: 12,
  difficulty: 'advanced',
  xpReward: 70,
  prerequisites: ['01-typeof-instanceof'],
  tags: ['type-guards', 'narrowing'],
  keyConcepts: [
    {
      id: 'type-predicate',
      term: 'Type Predicate',
      definition: 'A return type of the form "parameterName is Type". When the function returns true, TypeScript narrows the parameter to that type.',
      syntax: 'function isType(val: any): val is Type { ... }',
      whyItMatters: 'User-defined guards allow you to implement complex narrowing logic that TypeScript\'s built-in operators can\'t handle automatically.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'Custom Narrowing Logic',
      content: `# User-defined Type Guards

Sometimes you need to narrow a type using logic that isn't just a simple \`typeof\` or \`instanceof\`. To do this, you can define a function whose return type is a **type predicate**.`,
      codeExample: {
        code: `interface Cat {
  meow(): void;
}

function isCat(animal: any): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function speak(animal: any) {
  if (isCat(animal)) {
    animal.meow(); // works!
  }
}`,
        language: 'typescript',
        highlight: [5],
      },
    },
    {
      id: 'step-2-complex',
      order: 2,
      type: 'instruction',
      title: 'Complex Checks',
      content: `# Complex Validation

User-defined guards are perfect for validating that an object matches an interface at runtime.`,
      codeExample: {
        code: `interface User {
  id: number;
  name: string;
}

function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string"
  );
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Validating a Fish',
      instructions: `1. Define an interface \`Fish\` with a method \`swim()\`.
2. Create a type guard function named \`isFish\` that takes \`pet: any\` and returns \`pet is Fish\`.
3. Inside \`isFish\`, check if \`pet.swim\` is a function.`,
      starterCode: `// Define Fish and isFish here
`,
      solutionCode: `interface Fish {
  swim(): void;
}

function isFish(pet: any): pet is Fish {
  return typeof pet.swim === "function";
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'isFish should return true for valid object',
          testCode: `if (isFish({swim: () => {}}) !== true) throw new Error('Fail');`,
        },
        {
          id: 'test-2',
          description: 'isFish should return false for invalid object',
          testCode: `if (isFish({walk: () => {}}) !== false) throw new Error('Fail');`,
        },
      ],
      hints: [
        'The return type must be `pet is Fish` (not just `boolean`)',
        'Use `typeof pet.swim === "function"` for the check',
      ],
      aiHintPrompt: 'The user is learning user-defined type guards and predicates.',
    },
  ],
}
