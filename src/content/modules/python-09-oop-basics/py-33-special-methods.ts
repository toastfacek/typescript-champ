import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-33-special-methods',
  slug: 'special-methods',
  title: 'Special Methods',
  description: 'Learn about dunder methods for operator overloading and object behavior.',
  order: 33,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['py-32-inheritance'],
  tags: ['oop', 'dunder', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'dunder',
      term: 'Dunder Methods',
      definition: 'Special methods with double underscores (like __init__, __str__) that customize class behavior.',
      syntax: 'def __methodname__(self):',
      example: {
        code: 'def __str__(self):\\n    return f"Point({self.x}, {self.y})"',
        explanation: '__str__ defines how the object appears when printed.',
      },
      whyItMatters: 'Dunder methods let your objects work with Python operators and built-in functions.',
    },
    {
      id: 'operator-overloading',
      term: 'Operator Overloading',
      definition: 'Defining how operators (+, -, ==, etc.) work with your custom objects.',
      syntax: 'def __add__(self, other):',
      example: {
        code: 'def __add__(self, other):\\n    return Point(self.x + other.x, self.y + other.y)',
        explanation: 'Allows Point(1, 2) + Point(3, 4) to work.',
      },
      whyItMatters: 'Operator overloading makes your classes feel natural and Pythonic.',
    },
  ],
  steps: [
    {
      id: 'step-1-str-repr',
      order: 1,
      type: 'instruction',
      title: '__str__ and __repr__',
      content: '# String Representations\n\nControl how your object appears as a string:',
      codeExample: {
        code: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __str__(self):\n        """For end users - print(), str()"""\n        return f"Point at ({self.x}, {self.y})"\n    \n    def __repr__(self):\n        """For developers - debugging"""\n        return f"Point({self.x}, {self.y})"\n\np = Point(3, 4)\nprint(p)       # Point at (3, 4) - uses __str__\nprint(repr(p)) # Point(3, 4) - uses __repr__',
        language: 'python',
        highlight: [6, 7, 8, 10, 11, 12],
      },
    },
    {
      id: 'step-2-operators',
      order: 2,
      type: 'instruction',
      title: 'Operator Overloading',
      content: '# Making Operators Work\n\nDefine behavior for +, -, ==, <, etc:',
      codeExample: {
        code: 'class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __add__(self, other):\n        """v1 + v2"""\n        return Vector(self.x + other.x, self.y + other.y)\n    \n    def __eq__(self, other):\n        """v1 == v2"""\n        return self.x == other.x and self.y == other.y\n    \n    def __len__(self):\n        """len(v)"""\n        return int((self.x**2 + self.y**2)**0.5)\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nv3 = v1 + v2      # Vector(4, 6)\nprint(v1 == v2)   # False',
        language: 'python',
        highlight: [6, 7, 8, 10, 11, 12, 14, 15, 16],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Add __str__ Method',
      instructions: 'Add a `__str__` method to the `Book` class that returns:\n`"Title by Author"`\n\nFor example: `"1984 by George Orwell"`',
      starterCode: 'class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n    \n    # Add __str__ method\n\nbook = Book("1984", "George Orwell")\nresult = str(book)\n',
      solutionCode: 'class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n    \n    # Add __str__ method\n    def __str__(self):\n        return f"{self.title} by {self.author}"\n\nbook = Book("1984", "George Orwell")\nresult = str(book)',
      testCases: [
        {
          id: 'test-1',
          description: 'str(book) should return "1984 by George Orwell"',
          testCode: 'assert result == "1984 by George Orwell", \'str(book) should be "1984 by George Orwell"\'',
        },
      ],
      hints: [
        'def __str__(self):',
        'return f"{self.title} by {self.author}"',
      ],
      aiHintPrompt: 'The user is learning to implement __str__.',
    },
    {
      id: 'step-4-common',
      order: 4,
      type: 'instruction',
      title: 'Common Dunder Methods',
      content: '# Useful Special Methods',
      codeExample: {
        code: 'class Collection:\n    def __init__(self, items):\n        self.items = items\n    \n    def __len__(self):\n        """len(obj)"""\n        return len(self.items)\n    \n    def __getitem__(self, index):\n        """obj[index]"""\n        return self.items[index]\n    \n    def __contains__(self, item):\n        """item in obj"""\n        return item in self.items\n    \n    def __iter__(self):\n        """for item in obj"""\n        return iter(self.items)\n\nc = Collection([1, 2, 3])\nprint(len(c))     # 3\nprint(c[0])       # 1\nprint(2 in c)     # True',
        language: 'python',
        highlight: [5, 9, 13, 17],
      },
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'Which dunder method should you implement to make `obj1 == obj2` work?',
      options: [
        {
          id: 'a',
          text: '__cmp__',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '__eq__',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '__equals__',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '__compare__',
          isCorrect: false,
        },
      ],
      explanation: '__eq__ (equals) is called when using the == operator. It should return True or False.',
    },
  ],
}
