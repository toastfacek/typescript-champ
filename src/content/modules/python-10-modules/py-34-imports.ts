import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-34-imports',
  slug: 'imports',
  title: 'Imports and Modules',
  description: 'Learn to organize code with modules and the import system.',
  order: 34,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-33-special-methods'],
  tags: ['modules', 'imports', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'module',
      term: 'Module',
      definition: 'A Python file containing code (functions, classes, variables) that can be imported.',
      syntax: 'import module_name',
      example: {
        code: 'import math\\nprint(math.sqrt(16))  # 4.0',
        explanation: 'Import the math module and use its sqrt function.',
      },
      whyItMatters: 'Modules let you organize code into reusable, maintainable files.',
    },
    {
      id: 'from-import',
      term: 'from...import',
      definition: 'Import specific items from a module instead of the whole module.',
      syntax: 'from module import item',
      example: {
        code: 'from math import sqrt\\nprint(sqrt(16))  # 4.0',
        explanation: 'Import just sqrt, use it directly without the math prefix.',
      },
      whyItMatters: 'Selective imports keep your namespace clean and code readable.',
    },
  ],
  steps: [
    {
      id: 'step-1-import',
      order: 1,
      type: 'instruction',
      title: 'Basic Imports',
      content: '# Importing Modules\n\nPython has many built-in modules you can import:',
      codeExample: {
        code: '# Import entire module\nimport math\nprint(math.sqrt(16))  # 4.0\nprint(math.pi)        # 3.14159...\n\n# Import with alias\nimport datetime as dt\ntoday = dt.date.today()\n\n# Import specific items\nfrom random import randint, choice\nprint(randint(1, 10))  # Random 1-10',
        language: 'python',
        highlight: [2, 7, 11],
      },
    },
    {
      id: 'step-2-from',
      order: 2,
      type: 'instruction',
      title: 'from...import Variations',
      content: '# Different Import Styles',
      codeExample: {
        code: '# Import one item\nfrom math import sqrt\nprint(sqrt(25))  # 5.0\n\n# Import multiple items\nfrom math import pi, ceil, floor\n\n# Import with alias\nfrom datetime import datetime as dt\nnow = dt.now()\n\n# Import all (not recommended!)\n# from math import *  # Pollutes namespace',
        language: 'python',
        highlight: [2, 6, 9, 13],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Import Correctly',
      instructions: 'Import just the `sqrt` function from the `math` module, then use it to calculate the square root of 144.\n\nStore the result in `result`.',
      starterCode: '# Import sqrt from math\n\nresult = \n',
      solutionCode: '# Import sqrt from math\nfrom math import sqrt\n\nresult = sqrt(144)',
      testCases: [
        {
          id: 'test-1',
          description: 'result should be 12.0',
          testCode: 'assert result == 12.0, \'result should be 12.0\'',
        },
      ],
      hints: [
        'from math import sqrt',
        'Then call sqrt(144)',
      ],
      aiHintPrompt: 'The user is learning Python imports.',
    },
    {
      id: 'step-4-own-modules',
      order: 4,
      type: 'instruction',
      title: 'Creating Your Own Modules',
      content: '# Your Code as Modules\n\nAny Python file can be imported as a module:',
      codeExample: {
        code: '# File: utils.py\ndef greet(name):\n    return f"Hello, {name}!"\n\nPI = 3.14159\n\n# File: main.py\nimport utils\nprint(utils.greet("Alice"))  # Hello, Alice!\nprint(utils.PI)               # 3.14159\n\n# Or import specific items\nfrom utils import greet\nprint(greet("Bob"))  # Hello, Bob!',
        language: 'python',
        highlight: [1, 2, 7, 8, 9, 12, 13],
      },
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'What\'s wrong with `from module import *`?',
      options: [
        {
          id: 'a',
          text: 'It doesn\'t work in Python 3',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'It pollutes the namespace and makes code harder to understand',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'It\'s slower than regular imports',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'It only imports functions, not classes',
          isCorrect: false,
        },
      ],
      explanation: '`import *` brings all names into your namespace, making it unclear where functions come from and potentially overwriting existing names. Always prefer explicit imports.',
    },
  ],
}
