import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-35-packages',
  slug: 'packages',
  title: 'Packages',
  description: 'Learn to organize modules into packages.',
  order: 35,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-34-imports'],
  tags: ['packages', 'modules', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'package',
      term: 'Package',
      definition: 'A directory containing multiple modules and an __init__.py file.',
      syntax: 'from package import module',
      example: {
        code: 'from mypackage import utils\\nutils.helper()',
        explanation: 'Import a module from within a package.',
      },
      whyItMatters: 'Packages let you organize large projects into logical groups.',
    },
    {
      id: 'init-py',
      term: '__init__.py',
      definition: 'A file that marks a directory as a Python package. Can be empty or contain initialization code.',
      syntax: '# __init__.py',
      example: {
        code: '# mypackage/__init__.py\\nfrom .utils import helper',
        explanation: 'Makes helper directly importable from mypackage.',
      },
      whyItMatters: '__init__.py controls what gets exported from your package.',
    },
  ],
  steps: [
    {
      id: 'step-1-structure',
      order: 1,
      type: 'instruction',
      title: 'Package Structure',
      content: '# What is a Package?\n\nA package is a directory of modules:',
      codeExample: {
        code: '# Package structure:\n#\n# myproject/\n# ├── main.py\n# └── mypackage/\n#     ├── __init__.py\n#     ├── utils.py\n#     └── helpers.py\n\n# In main.py:\nfrom mypackage import utils\nfrom mypackage.helpers import some_function',
        language: 'python',
        highlight: [6, 11, 12],
      },
    },
    {
      id: 'step-2-init',
      order: 2,
      type: 'instruction',
      title: 'The __init__.py File',
      content: '# Controlling Package Exports',
      codeExample: {
        code: '# mypackage/__init__.py\n\n# Make specific items available at package level\nfrom .utils import helper_function\nfrom .models import User, Product\n\n# Now users can do:\n# from mypackage import User, helper_function\n# Instead of:\n# from mypackage.models import User',
        language: 'python',
        highlight: [4, 5, 8],
      },
    },
    {
      id: 'step-3-relative',
      order: 3,
      type: 'instruction',
      title: 'Relative Imports',
      content: '# Imports Within a Package\n\nUse dots for relative imports inside a package:',
      codeExample: {
        code: '# mypackage/helpers.py\n\n# Import from same package\nfrom .utils import helper        # Same directory\nfrom .models import User         # Same directory\n\n# Import from parent package\nfrom ..other_package import tool # One level up\n\n# Import from sibling subpackage  \nfrom .subpkg import item         # Into subpkg/',
        language: 'python',
        highlight: [4, 5, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Package Knowledge Check',
      instructions: 'What file marks a directory as a Python package?\n\nStore your answer (just the filename) in `answer`.',
      starterCode: '# What file makes a directory a package?\nanswer = ""\n',
      solutionCode: '# What file makes a directory a package?\nanswer = "__init__.py"',
      testCases: [
        {
          id: 'test-1',
          description: 'answer should be "__init__.py"',
          testCode: 'assert answer == "__init__.py", \'answer should be "__init__.py"\'',
        },
      ],
      hints: [
        'It starts and ends with double underscores',
        'It\'s named after the initialization process',
      ],
      aiHintPrompt: 'The user is learning about __init__.py.',
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'What does the dot in `from .utils import helper` mean?',
      options: [
        {
          id: 'a',
          text: 'Import from the Python standard library',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Import from the current package (relative import)',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Import a hidden module',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Import the latest version',
          isCorrect: false,
        },
      ],
      explanation: 'A single dot means "current package". Two dots (..) means "parent package". This is called a relative import.',
    },
  ],
}
