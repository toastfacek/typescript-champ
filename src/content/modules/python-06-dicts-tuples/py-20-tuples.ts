import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-20-tuples',
  slug: 'tuples',
  title: 'Tuples',
  description: 'Learn about tuples: immutable sequences for fixed collections of data.',
  order: 20,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-19-nested-lists'],
  tags: ['tuples', 'collections', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'tuple-definition',
      term: 'Tuple',
      definition: 'A tuple is an immutable, ordered sequence. Once created, you cannot change its contents.',
      syntax: 'my_tuple = (item1, item2, item3)',
      example: {
        code: 'coords = (10, 20)\\nprint(coords[0])  # 10',
        explanation: 'Tuples use parentheses and are accessed like lists.',
      },
      whyItMatters: 'Tuples are perfect for data that should not change, like coordinates or RGB colors.',
    },
    {
      id: 'tuple-unpacking',
      term: 'Tuple Unpacking',
      definition: 'Assign tuple elements to multiple variables in one statement.',
      syntax: 'a, b, c = (1, 2, 3)',
      example: {
        code: 'point = (10, 20)\\nx, y = point',
        explanation: 'Unpacking extracts values into separate variables.',
      },
      whyItMatters: 'Unpacking makes code cleaner when working with fixed-size collections.',
    },
  ],
  steps: [
    {
      id: 'step-1-creating',
      order: 1,
      type: 'instruction',
      title: 'Creating Tuples',
      content: '# Tuples in Python\n\nTuples are like lists, but **immutable** (cannot be changed after creation):',
      codeExample: {
        code: '# Create tuples with parentheses\ncoords = (10, 20)\ncolors = ("red", "green", "blue")\n\n# Single-element tuple needs a comma!\nsingle = (42,)  # Note the comma\n\n# Tuple without parentheses (packing)\npoint = 1, 2, 3\n\n# Empty tuple\nempty = ()',
        language: 'python',
        highlight: [2, 6, 9],
      },
    },
    {
      id: 'step-2-accessing',
      order: 2,
      type: 'instruction',
      title: 'Accessing Tuple Elements',
      content: '# Indexing and Slicing\n\nTuples use the same indexing as lists:',
      codeExample: {
        code: 'colors = ("red", "green", "blue", "yellow")\n\n# Indexing\nprint(colors[0])   # "red"\nprint(colors[-1])  # "yellow"\n\n# Slicing\nprint(colors[1:3])  # ("green", "blue")\n\n# Length\nprint(len(colors))  # 4\n\n# Cannot modify!\n# colors[0] = "purple"  # Error!',
        language: 'python',
        highlight: [4, 5, 8, 14],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create and Access Tuples',
      instructions: 'Create a tuple called `person` with three elements: `"Alice"`, `30`, `"Engineer"`.\n\nThen extract the first element into `name` and the last element into `job`.',
      starterCode: '# Create the person tuple\n\n',
      solutionCode: '# Create the person tuple\nperson = ("Alice", 30, "Engineer")\nname = person[0]\njob = person[-1]',
      testCases: [
        {
          id: 'test-1',
          description: 'person should be a tuple with 3 elements',
          testCode: 'assert person == ("Alice", 30, "Engineer"), \'person should be ("Alice", 30, "Engineer")\'',
        },
        {
          id: 'test-2',
          description: 'name should be "Alice"',
          testCode: 'assert name == "Alice", \'name should be "Alice"\'',
        },
        {
          id: 'test-3',
          description: 'job should be "Engineer"',
          testCode: 'assert job == "Engineer", \'job should be "Engineer"\'',
        },
      ],
      hints: [
        'Create tuple: person = ("Alice", 30, "Engineer")',
        'First element: person[0]',
        'Last element: person[-1]',
      ],
      aiHintPrompt: 'The user is learning to create and access tuples.',
    },
    {
      id: 'step-4-unpacking',
      order: 4,
      type: 'instruction',
      title: 'Tuple Unpacking',
      content: '# Unpacking Tuples\n\nExtract tuple values into separate variables:',
      codeExample: {
        code: 'coords = (10, 20, 30)\n\n# Unpack into variables\nx, y, z = coords\nprint(x)  # 10\nprint(y)  # 20\nprint(z)  # 30\n\n# Swap values using tuples\na, b = 1, 2\na, b = b, a  # Now a=2, b=1\n\n# Ignore values with _\nfirst, _, last = (1, 2, 3)\nprint(first, last)  # 1 3',
        language: 'python',
        highlight: [4, 11, 14],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Unpack a Tuple',
      instructions: 'Given `point = (100, 200)`, unpack it into variables `x` and `y`.',
      starterCode: 'point = (100, 200)\n\n# Unpack into x and y\n',
      solutionCode: 'point = (100, 200)\n\n# Unpack into x and y\nx, y = point',
      testCases: [
        {
          id: 'test-1',
          description: 'x should be 100',
          testCode: 'assert x == 100, \'x should be 100\'',
        },
        {
          id: 'test-2',
          description: 'y should be 200',
          testCode: 'assert y == 200, \'y should be 200\'',
        },
      ],
      hints: [
        'Unpack with: x, y = point',
        'The number of variables must match the tuple length',
      ],
      aiHintPrompt: 'The user is learning tuple unpacking.',
    },
    {
      id: 'step-6-uses',
      order: 6,
      type: 'instruction',
      title: 'When to Use Tuples',
      content: '# Tuples vs Lists\n\nUse tuples when:\n- Data should not change\n- Returning multiple values from functions\n- Dictionary keys (lists cannot be keys)',
      codeExample: {
        code: '# Multiple return values\ndef get_stats(numbers):\n    return min(numbers), max(numbers), sum(numbers)\n\nlow, high, total = get_stats([1, 2, 3, 4, 5])\nprint(f"Min: {low}, Max: {high}, Sum: {total}")\n\n# Tuples as dictionary keys\nlocations = {\n    (40.7, -74.0): "New York",\n    (34.0, -118.2): "Los Angeles"\n}',
        language: 'python',
        highlight: [3, 5, 10, 11],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What happens when you try to modify a tuple?',
      codeContext: 't = (1, 2, 3)\nt[0] = 10',
      options: [
        {
          id: 'a',
          text: 't becomes (10, 2, 3)',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'TypeError: tuples are immutable',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'A new tuple is created',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Nothing happens',
          isCorrect: false,
        },
      ],
      explanation: 'Tuples are immutable - you cannot change their elements after creation. Attempting to modify raises a TypeError.',
    },
  ],
}
