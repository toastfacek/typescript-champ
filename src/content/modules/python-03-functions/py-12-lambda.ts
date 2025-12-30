import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-12-lambda',
  slug: 'lambda',
  title: 'Lambda Functions',
  description: 'Learn to create concise anonymous functions with lambda expressions.',
  order: 12,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-11-scope'],
  tags: ['functions', 'lambda', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'lambda-function',
      term: 'Lambda Function',
      definition: 'A lambda is a small anonymous function defined in a single line. It can have any number of arguments but only one expression.',
      syntax: 'lambda arguments: expression',
      example: {
        code: 'double = lambda x: x * 2\\nprint(double(5))  # 10',
        explanation: 'Creates a function that doubles its input without using def.',
      },
      whyItMatters: 'Lambdas are useful for short, throwaway functions, especially with map(), filter(), and sorted().',
    },
    {
      id: 'higher-order-functions',
      term: 'Higher-Order Functions',
      definition: 'Functions that take other functions as arguments (like map, filter, sorted) work well with lambdas.',
      syntax: 'map(lambda x: x * 2, [1, 2, 3])',
      example: {
        code: 'numbers = [1, 2, 3]\\ndoubled = list(map(lambda x: x * 2, numbers))',
        explanation: 'Uses lambda with map() to double each element.',
      },
      whyItMatters: 'Lambdas make it easy to customize built-in functions without defining named functions.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What are Lambda Functions?',
      content: `# Lambda Functions

A **lambda** is a small anonymous function. It's a shortcut for simple functions you'd use only once.`,
      codeExample: {
        code: `# Regular function
def double(x):
    return x * 2

# Same thing as a lambda
double = lambda x: x * 2

# Both work the same way
print(double(5))  # 10`,
        language: 'python',
        highlight: [6],
      },
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Lambda Syntax',
      content: `# Lambda Syntax

\`lambda arguments: expression\`

- **arguments** - Input parameters (separated by commas)
- **expression** - What to return (no \`return\` keyword needed)`,
      codeExample: {
        code: `# One argument
square = lambda x: x ** 2
print(square(4))  # 16

# Multiple arguments
add = lambda a, b: a + b
print(add(3, 5))  # 8

# No arguments
greet = lambda: "Hello!"
print(greet())  # Hello!`,
        language: 'python',
        highlight: [2, 6, 10],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Lambda',
      instructions: `Create a lambda function called \`cube\` that returns a number cubed (raised to the power of 3).

Then test it: \`result = cube(3)\` should give 27.`,
      starterCode: `# Create your lambda function
cube = 
`,
      solutionCode: `# Create your lambda function
cube = lambda x: x ** 3

result = cube(3)`,
      testCases: [
        {
          id: 'test-1',
          description: 'result should equal 27',
          testCode: `assert result == 27, 'result should be 27'`,
        },
        {
          id: 'test-2',
          description: 'cube(2) should equal 8',
          testCode: `assert cube(2) == 8, 'cube(2) should be 8'`,
        },
      ],
      hints: [
        'Use `lambda x: expression`',
        'Cubing is `x ** 3`',
        'The whole thing is: `lambda x: x ** 3`',
      ],
      aiHintPrompt: 'The user is learning to create lambda functions.',
    },
    {
      id: 'step-4-with-map',
      order: 4,
      type: 'instruction',
      title: 'Using Lambda with map()',
      content: `# Lambda with map()

\`map()\` applies a function to every item in a list. Lambdas are perfect for this:`,
      codeExample: {
        code: `numbers = [1, 2, 3, 4, 5]

# Double each number
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10]

# Convert to strings
strings = list(map(lambda x: str(x), numbers))
print(strings)  # ['1', '2', '3', '4', '5']`,
        language: 'python',
        highlight: [4, 8],
      },
    },
    {
      id: 'step-5-with-filter',
      order: 5,
      type: 'instruction',
      title: 'Using Lambda with filter()',
      content: `# Lambda with filter()

\`filter()\` keeps only items where the function returns True:`,
      codeExample: {
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Keep only numbers greater than 5
big = list(filter(lambda x: x > 5, numbers))
print(big)  # [6, 7, 8, 9, 10]`,
        language: 'python',
        highlight: [4, 8],
      },
    },
    {
      id: 'step-6-with-sorted',
      order: 6,
      type: 'instruction',
      title: 'Using Lambda with sorted()',
      content: `# Lambda with sorted()

Use the \`key\` parameter to customize sorting:`,
      codeExample: {
        code: `# Sort by length
words = ["apple", "pie", "banana", "kiwi"]
by_length = sorted(words, key=lambda x: len(x))
print(by_length)  # ['pie', 'kiwi', 'apple', 'banana']

# Sort list of tuples by second element
pairs = [(1, 'b'), (3, 'a'), (2, 'c')]
by_letter = sorted(pairs, key=lambda x: x[1])
print(by_letter)  # [(3, 'a'), (1, 'b'), (2, 'c')]`,
        language: 'python',
        highlight: [3, 8],
      },
    },
    {
      id: 'step-7-exercise-2',
      order: 7,
      type: 'code-exercise',
      title: 'Sort by Last Character',
      instructions: `Given a list of words, sort them by their **last character**.

\`words = ["hello", "world", "python", "code"]\`

Use \`sorted()\` with a lambda and store the result in \`result\`.`,
      starterCode: `# Sort words by last character
words = ["hello", "world", "python", "code"]

result = 
`,
      solutionCode: `# Sort words by last character
words = ["hello", "world", "python", "code"]

result = sorted(words, key=lambda x: x[-1])`,
      testCases: [
        {
          id: 'test-1',
          description: 'result should be sorted by last character',
          testCode: `assert result == ["world", "code", "python", "hello"], 'Should be sorted by last char: world(d), code(e), python(n), hello(o)'`,
        },
      ],
      hints: [
        'Use `sorted(words, key=...)`',
        'The lambda gets the last character: `lambda x: x[-1]`',
        'Negative indexing: `x[-1]` gets the last character',
      ],
      aiHintPrompt: 'The user is learning to use lambda with sorted().',
    },
    {
      id: 'step-8-quiz',
      order: 8,
      type: 'quiz',
      question: 'What does this code produce?',
      codeContext: `nums = [1, 2, 3, 4, 5]
result = list(filter(lambda x: x % 2 == 1, nums))`,
      options: [
        {
          id: 'a',
          text: '[2, 4]',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '[1, 3, 5]',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '[1, 2, 3, 4, 5]',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '[]',
          isCorrect: false,
        },
      ],
      explanation: 'The lambda `x % 2 == 1` returns True for odd numbers. filter() keeps items where the function returns True, so we get [1, 3, 5].',
    },
  ],
}
