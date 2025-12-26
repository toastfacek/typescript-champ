import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-19-nested-lists',
  slug: 'nested-lists',
  title: 'Nested Lists',
  description: 'Work with 2D lists and matrices for more complex data structures.',
  order: 19,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-18-list-operations'],
  tags: ['lists', 'nested', 'matrices', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'nested-list',
      term: 'Nested List',
      definition: 'A list that contains other lists as elements, creating a multi-dimensional structure.',
      syntax: 'matrix = [[1, 2], [3, 4], [5, 6]]',
      example: {
        code: 'matrix = [[1, 2, 3], [4, 5, 6]]\\nmatrix[0][1]  # 2',
        explanation: 'Access elements with double indexing: [row][column].',
      },
      whyItMatters: 'Nested lists represent grids, tables, and matrices - common in games, data, and math.',
    },
    {
      id: '2d-indexing',
      term: '2D Indexing',
      definition: 'Access nested list elements using [row][column] notation.',
      syntax: 'matrix[row][col]',
      example: {
        code: 'grid = [[1, 2], [3, 4]]\\ngrid[1][0]  # 3 (row 1, column 0)',
        explanation: 'First index selects the inner list, second selects the element.',
      },
      whyItMatters: 'Understanding 2D indexing is essential for working with tabular data.',
    },
  ],
  steps: [
    {
      id: 'step-1-creating',
      order: 1,
      type: 'instruction',
      title: 'Creating Nested Lists',
      content: `# Lists Inside Lists

A nested list (2D list) contains lists as elements:`,
      codeExample: {
        code: `# A 3x3 matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Tic-tac-toe board
board = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "X"]
]`,
        language: 'python',
        highlight: [2, 3, 4, 5, 6],
      },
    },
    {
      id: 'step-2-accessing',
      order: 2,
      type: 'instruction',
      title: 'Accessing Nested Elements',
      content: `# Double Indexing

Use two sets of brackets: \`[row][column]\``,
      codeExample: {
        code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Get element at row 0, column 1
print(matrix[0][1])  # 2

# Get element at row 2, column 2
print(matrix[2][2])  # 9

# Get entire row
print(matrix[1])  # [4, 5, 6]

# Get last element of last row
print(matrix[-1][-1])  # 9`,
        language: 'python',
        highlight: [8, 11, 14, 17],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Access Grid Elements',
      instructions: `Given this grid:
\`\`\`python
grid = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]
\`\`\`

1. Get the value 50 (center), store in \`center\`
2. Get the value 30 (top-right), store in \`top_right\``,
      starterCode: `grid = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]

center = 
top_right = 
`,
      solutionCode: `grid = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]

center = grid[1][1]
top_right = grid[0][2]`,
      testCases: [
        {
          id: 'test-1',
          description: 'center should be 50',
          testCode: `assert center == 50, 'center should be 50'`,
        },
        {
          id: 'test-2',
          description: 'top_right should be 30',
          testCode: `assert top_right == 30, 'top_right should be 30'`,
        },
      ],
      hints: [
        '50 is at row 1, column 1 (middle)',
        '30 is at row 0, column 2 (first row, last column)',
      ],
      aiHintPrompt: 'The user is learning 2D list indexing.',
    },
    {
      id: 'step-4-iterating',
      order: 4,
      type: 'instruction',
      title: 'Iterating Over Nested Lists',
      content: `# Looping Through 2D Lists

Use nested loops to process all elements:`,
      codeExample: {
        code: `matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

# Loop through rows
for row in matrix:
    print(row)
# [1, 2, 3]
# [4, 5, 6]

# Loop through each element
for row in matrix:
    for item in row:
        print(item, end=" ")
    print()  # New line after each row
# 1 2 3
# 4 5 6`,
        language: 'python',
        highlight: [7, 8, 13, 14, 15],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Sum All Elements',
      instructions: `Calculate the sum of all numbers in this nested list:
\`\`\`python
numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
\`\`\`

Store the result in \`total\`. (Expected: 45)`,
      starterCode: `numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

total = 0
# Sum all elements

`,
      solutionCode: `numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

total = 0
# Sum all elements
for row in numbers:
    for num in row:
        total += num`,
      testCases: [
        {
          id: 'test-1',
          description: 'total should be 45',
          testCode: `assert total == 45, 'total should be 45'`,
        },
      ],
      hints: [
        'Use nested for loops',
        'Outer loop: for row in numbers',
        'Inner loop: for num in row',
        'Add each num to total',
      ],
      aiHintPrompt: 'The user is learning to iterate over nested lists.',
    },
    {
      id: 'step-6-comprehension',
      order: 6,
      type: 'instruction',
      title: 'Nested List Comprehensions',
      content: `# Creating 2D Lists with Comprehensions

Use nested comprehensions for complex structures:`,
      codeExample: {
        code: `# Create a 3x3 matrix of zeros
zeros = [[0 for _ in range(3)] for _ in range(3)]
# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# Create multiplication table
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Flatten a nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = [item for row in nested for item in row]
# [1, 2, 3, 4, 5, 6]`,
        language: 'python',
        highlight: [2, 6, 11],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `grid[1][2]` access?',
      codeContext: `grid = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"]
]`,
      options: [
        {
          id: 'a',
          text: '"b"',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '"d"',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '"f"',
          isCorrect: true,
        },
        {
          id: 'd',
          text: '"h"',
          isCorrect: false,
        },
      ],
      explanation: 'grid[1] gets the second row ["d", "e", "f"], then [2] gets the third element of that row, which is "f".',
    },
  ],
}
