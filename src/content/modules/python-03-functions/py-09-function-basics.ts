import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-09-function-basics',
  slug: 'function-basics',
  title: 'Function Basics',
  description: 'Learn how to create reusable code with functions using def, parameters, and return.',
  order: 9,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-08-comprehensions'],
  tags: ['functions', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'function-definition',
      term: 'Function Definition',
      definition: 'A function is a reusable block of code that performs a specific task. Define functions with the `def` keyword.',
      syntax: 'def function_name(parameters):\\n    # code\\n    return value',
      example: {
        code: 'def greet(name):\\n    return f"Hello, {name}!"',
        explanation: 'Creates a function that returns a greeting message.',
      },
      whyItMatters: 'Functions help organize code, reduce repetition, and make programs easier to understand and maintain.',
    },
    {
      id: 'parameters',
      term: 'Parameters',
      definition: 'Parameters are variables listed in the function definition that receive values when the function is called.',
      syntax: 'def function_name(param1, param2):',
      example: {
        code: 'def add(a, b):\\n    return a + b',
        explanation: 'a and b are parameters that receive values when calling add(5, 3).',
      },
      whyItMatters: 'Parameters make functions flexible - the same function can work with different inputs.',
    },
    {
      id: 'return-statement',
      term: 'return Statement',
      definition: 'The return statement sends a value back from a function. Without it, the function returns None.',
      syntax: 'return value',
      example: {
        code: 'def square(n):\\n    return n ** 2\\n\\nresult = square(5)  # 25',
        explanation: 'The function calculates and returns the square of n.',
      },
      whyItMatters: 'Return values let functions produce results that can be used elsewhere in your program.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Creating Functions',
      content: `# Functions in Python

Functions are reusable blocks of code. Use the **def** keyword to define them.`,
      codeExample: {
        code: `# Define a function
def say_hello():
    print("Hello, World!")

# Call the function
say_hello()  # Prints: Hello, World!
say_hello()  # Call it again!`,
        language: 'python',
        highlight: [2, 3, 6],
      },
    },
    {
      id: 'step-2-parameters',
      order: 2,
      type: 'instruction',
      title: 'Adding Parameters',
      content: `# Parameters

Parameters let you pass data into a function.`,
      codeExample: {
        code: `# Function with one parameter
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!

# Function with multiple parameters
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(5, 3)  # 5 + 3 = 8`,
        language: 'python',
        highlight: [2, 9],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Greeting Function',
      instructions: `Create a function called \`greet\` that:
1. Takes a \`name\` parameter
2. Prints \`"Hello, {name}!"\`

Then call it with \`"Python"\` to test.`,
      starterCode: `# Create your greet function here

`,
      solutionCode: `# Create your greet function here
def greet(name):
    print(f"Hello, {name}!")

greet("Python")`,
      testCases: [
        {
          id: 'test-1',
          description: 'Function greet should exist',
          testCode: `assert callable(greet), 'greet should be a function'`,
        },
      ],
      hints: [
        'Start with `def greet(name):`',
        'Use an f-string to include the name',
        'Don\'t forget to call the function at the end',
      ],
      aiHintPrompt: 'The user is learning to define basic functions with parameters.',
    },
    {
      id: 'step-4-return',
      order: 4,
      type: 'instruction',
      title: 'Returning Values',
      content: `# The return Statement

Use **return** to send a value back from a function. This lets you use the result elsewhere.`,
      codeExample: {
        code: `# Function that returns a value
def square(n):
    return n ** 2

# Use the returned value
result = square(5)
print(result)  # 25

# Use directly in expressions
total = square(3) + square(4)
print(total)  # 9 + 16 = 25`,
        language: 'python',
        highlight: [3, 6, 10],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Calculate Function',
      instructions: `Create a function called \`multiply\` that:
1. Takes two parameters: \`a\` and \`b\`
2. Returns the product (a * b)

Then call it with \`6\` and \`7\` and store the result in \`answer\`.`,
      starterCode: `# Create your multiply function

`,
      solutionCode: `# Create your multiply function
def multiply(a, b):
    return a * b

answer = multiply(6, 7)`,
      testCases: [
        {
          id: 'test-1',
          description: 'answer should equal 42',
          testCode: `assert answer == 42, 'answer should be 42'`,
        },
        {
          id: 'test-2',
          description: 'multiply should return the product',
          testCode: `assert multiply(3, 4) == 12, 'multiply(3, 4) should return 12'`,
        },
      ],
      hints: [
        'Define: `def multiply(a, b):`',
        'Use `return a * b` to return the result',
        'Store the result: `answer = multiply(6, 7)`',
      ],
      aiHintPrompt: 'The user is learning to use return statements in functions.',
    },
    {
      id: 'step-6-multiple-returns',
      order: 6,
      type: 'instruction',
      title: 'Multiple Return Values',
      content: `# Returning Multiple Values

Python functions can return multiple values using tuples!`,
      codeExample: {
        code: `# Return multiple values
def get_min_max(numbers):
    return min(numbers), max(numbers)

# Unpack the returned values
lowest, highest = get_min_max([5, 2, 8, 1, 9])
print(f"Min: {lowest}, Max: {highest}")
# Min: 1, Max: 9`,
        language: 'python',
        highlight: [3, 6],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `def double(n):
    return n * 2

result = double(5) + double(3)
print(result)`,
      options: [
        {
          id: 'a',
          text: '16',
          isCorrect: true,
        },
        {
          id: 'b',
          text: '10',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '8',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'None',
          isCorrect: false,
        },
      ],
      explanation: 'double(5) returns 10, double(3) returns 6. Adding them gives 16.',
    },
  ],
}
