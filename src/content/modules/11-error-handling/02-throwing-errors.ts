import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '02-throwing-errors',
  slug: 'throwing-errors',
  title: 'Throwing Errors',
  description: 'Learn how to manually trigger errors using the throw keyword to handle exceptional cases.',
  order: 2,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['01-try-catch'],
  tags: ['error-handling'],
  keyConcepts: [
    {
      id: 'throw',
      term: 'throw Keyword',
      definition: 'Used to manually trigger an error. When a throw statement is executed, the current function stops and the error is passed up to the nearest catch block.',
      syntax: 'throw new Error("Message");',
      whyItMatters: 'Throwing errors allows you to signal that something went wrong in a way that can be handled by other parts of your code.',
    },
    {
      id: 'error-object',
      term: 'Error Object',
      definition: 'The standard object used for errors in JavaScript and TypeScript. It typically contains a "message" property.',
      syntax: 'new Error("Something went wrong")',
      whyItMatters: 'Using the Error object provides a standard way to transmit information about what went wrong.',
    },
  ],
  steps: [
    {
      id: 'step-1-basics',
      order: 1,
      type: 'instruction',
      title: 'The throw Keyword',
      content: `# Manually Triggering Errors

You can use the \`throw\` keyword to create your own errors when something happens that your code can't handle.`,
      codeExample: {
        code: `function divide(a: number, b: number) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.log(error.message); // "Division by zero is not allowed"
}`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-what-to-throw',
      order: 2,
      type: 'instruction',
      title: 'What Can You Throw?',
      content: `# Throwing Anything

In JavaScript, you can throw anything - a string, a number, or an object. However, it is **strongly recommended** to always throw an \`Error\` object or a class that extends \`Error\`.`,
      codeExample: {
        code: `// Don't do this:
// throw "Something failed"; 

// Do this:
throw new Error("Something failed");`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Validate User Age',
      instructions: `1. Create a function named \`validateAge\` that takes a \`number\` named \`age\`.
2. If \`age\` is less than 0, throw an \`Error\` with the message \`"Age cannot be negative"\`.
3. If \`age\` is greater than 120, throw an \`Error\` with the message \`"Age is too high"\`.
4. Otherwise, return the \`age\`.`,
      starterCode: `function validateAge(age: number) {
  // Implement here
}
`,
      solutionCode: `function validateAge(age: number) {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
  if (age > 120) {
    throw new Error("Age is too high");
  }
  return age;
}`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should return valid age',
          testCode: `if (validateAge(25) !== 25) throw new Error('Should return valid age');`,
        },
        {
          id: 'test-2',
          description: 'Should throw for negative age',
          testCode: `try {
  validateAge(-1);
  throw new Error('Should have thrown');
} catch (e) {
  if (e.message !== "Age cannot be negative") throw e;
}`,
        },
        {
          id: 'test-3',
          description: 'Should throw for high age',
          testCode: `try {
  validateAge(150);
  throw new Error('Should have thrown');
} catch (e) {
  if (e.message !== "Age is too high") throw e;
}`,
        },
      ],
      hints: [
        'Use `if` statements to check the age',
        'Use `throw new Error("message")`',
      ],
      aiHintPrompt: 'The user is practicing throwing errors with specific messages.',
    },
  ],
}
