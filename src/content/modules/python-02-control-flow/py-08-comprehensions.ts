import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-08-comprehensions',
  slug: 'comprehensions',
  title: 'List Comprehensions',
  description: 'Learn Pythonic ways to create lists with list comprehensions.',
  order: 8,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-07-for-loops'],
  tags: ['control-flow', 'comprehensions', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'list-comprehension',
      term: 'List Comprehension',
      definition: 'A concise way to create lists by describing the elements. It combines a loop and an expression in a single line.',
      syntax: '[expression for item in iterable]',
      example: {
        code: 'squares = [x**2 for x in range(5)]\\n# Result: [0, 1, 4, 9, 16]',
        explanation: 'Creates a list of squares for numbers 0-4 in one line.',
      },
      whyItMatters: 'List comprehensions are more Pythonic and often faster than traditional loops for creating lists.',
    },
    {
      id: 'conditional-comprehension',
      term: 'Conditional Comprehension',
      definition: 'A list comprehension with a condition to filter which elements are included.',
      syntax: '[expression for item in iterable if condition]',
      example: {
        code: 'evens = [x for x in range(10) if x % 2 == 0]\\n# Result: [0, 2, 4, 6, 8]',
        explanation: 'Creates a list of only even numbers from 0-9.',
      },
      whyItMatters: 'Filter and transform data in a single, readable line.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'What are List Comprehensions?',
      content: `# List Comprehensions

List comprehensions are a **Pythonic** way to create lists. Instead of writing a loop, you describe the list you want in a single line.`,
      codeExample: {
        code: `# Traditional way (4 lines)
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension (1 line!)
squares = [x ** 2 for x in range(5)]

# Both produce: [0, 1, 4, 9, 16]`,
        language: 'python',
        highlight: [7],
      },
    },
    {
      id: 'step-2-syntax',
      order: 2,
      type: 'instruction',
      title: 'Comprehension Syntax',
      content: `# Breaking Down the Syntax

\`[expression for item in iterable]\`

- **expression** - What to do with each item
- **item** - The variable for each element
- **iterable** - The source collection`,
      codeExample: {
        code: `# Double each number
doubles = [n * 2 for n in range(5)]
# [0, 2, 4, 6, 8]

# Convert to uppercase
names = ["alice", "bob", "charlie"]
upper = [name.upper() for name in names]
# ["ALICE", "BOB", "CHARLIE"]

# Get lengths
lengths = [len(name) for name in names]
# [5, 3, 7]`,
        language: 'python',
        highlight: [2, 7, 11],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create Squares',
      instructions: `Use a list comprehension to create a list of squares from 1 to 5:
- Result should be \`[1, 4, 9, 16, 25]\`
- Store in a variable called \`squares\``,
      starterCode: `# Create squares 1 to 5
squares = 
`,
      solutionCode: `# Create squares 1 to 5
squares = [x ** 2 for x in range(1, 6)]`,
      testCases: [
        {
          id: 'test-1',
          description: 'squares should be [1, 4, 9, 16, 25]',
          testCode: `assert squares == [1, 4, 9, 16, 25], 'squares should be [1, 4, 9, 16, 25]'`,
        },
      ],
      hints: [
        'Use range(1, 6) to get numbers 1-5',
        'The expression is x ** 2',
        'Format: [expression for x in range(...)]',
      ],
      aiHintPrompt: 'The user is learning basic list comprehension syntax.',
    },
    {
      id: 'step-4-conditional',
      order: 4,
      type: 'instruction',
      title: 'Adding Conditions',
      content: `# Filtering with if

Add an **if** clause to filter which elements are included:

\`[expression for item in iterable if condition]\``,
      codeExample: {
        code: `# Only even numbers
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# Only long names
names = ["Al", "Bob", "Charlie", "Dan"]
long_names = [name for name in names if len(name) > 3]
# ["Charlie"]

# Only positive numbers
numbers = [-2, -1, 0, 1, 2, 3]
positive = [n for n in numbers if n > 0]
# [1, 2, 3]`,
        language: 'python',
        highlight: [2, 7, 12],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Filter Even Numbers',
      instructions: `Use a list comprehension to get all even numbers from 1 to 20:
- Result should be \`[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\`
- Store in a variable called \`evens\``,
      starterCode: `# Get even numbers 1 to 20
evens = 
`,
      solutionCode: `# Get even numbers 1 to 20
evens = [x for x in range(1, 21) if x % 2 == 0]`,
      testCases: [
        {
          id: 'test-1',
          description: 'evens should be [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]',
          testCode: `assert evens == [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 'evens should be [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]'`,
        },
      ],
      hints: [
        'Use range(1, 21) for numbers 1-20',
        'Add `if x % 2 == 0` to filter evens',
        'The expression is just `x`',
      ],
      aiHintPrompt: 'The user is learning conditional list comprehensions.',
    },
    {
      id: 'step-6-transform',
      order: 6,
      type: 'instruction',
      title: 'Transform and Filter',
      content: `# Combining Transform and Filter

You can transform and filter in the same comprehension:`,
      codeExample: {
        code: `# Squares of even numbers
numbers = range(1, 11)
even_squares = [x ** 2 for x in numbers if x % 2 == 0]
# [4, 16, 36, 64, 100]

# Uppercase long names
names = ["Al", "Bob", "Charlie", "Dan", "Eve"]
result = [name.upper() for name in names if len(name) > 2]
# ["BOB", "CHARLIE", "DAN", "EVE"]`,
        language: 'python',
        highlight: [3, 8],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does this code produce?',
      codeContext: `result = [x * 2 for x in [1, 2, 3, 4] if x > 2]`,
      options: [
        {
          id: 'a',
          text: '[2, 4, 6, 8]',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '[6, 8]',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '[3, 4]',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '[1, 2, 3, 4]',
          isCorrect: false,
        },
      ],
      explanation: 'First, filter: x > 2 keeps only 3 and 4. Then, transform: multiply by 2 to get [6, 8].',
    },
  ],
}
