import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-31-methods',
  slug: 'methods',
  title: 'Methods',
  description: 'Learn about instance methods, class methods, and static methods.',
  order: 31,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['py-30-classes'],
  tags: ['oop', 'methods', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'instance-method',
      term: 'Instance Method',
      definition: 'A regular method that takes self as its first parameter and can access instance attributes.',
      syntax: 'def method(self):',
      example: {
        code: 'def greet(self):\\n    return f"Hi, I\'m {self.name}"',
        explanation: 'Instance methods can access and modify instance data.',
      },
      whyItMatters: 'Instance methods define the behaviors of your objects.',
    },
    {
      id: 'class-method',
      term: 'Class Method',
      definition: 'A method that takes cls (the class) as its first parameter. Defined with @classmethod.',
      syntax: '@classmethod\\ndef method(cls):',
      example: {
        code: '@classmethod\\ndef from_string(cls, s):\\n    return cls(s.split(","))',
        explanation: 'Class methods are often used as alternative constructors.',
      },
      whyItMatters: 'Class methods let you create objects in different ways.',
    },
  ],
  steps: [
    {
      id: 'step-1-instance',
      order: 1,
      type: 'instruction',
      title: 'Instance Methods',
      content: '# Instance Methods\n\nThe most common type of method - they operate on instances:',
      codeExample: {
        code: 'class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    \n    def deposit(self, amount):\n        """Instance method - modifies instance data"""\n        self.balance += amount\n        return self.balance\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            return amount\n        return 0\n\naccount = BankAccount(100)\naccount.deposit(50)   # 150\naccount.withdraw(30)  # 30',
        language: 'python',
        highlight: [5, 6, 7, 10, 11, 12],
      },
    },
    {
      id: 'step-2-exercise-1',
      order: 2,
      type: 'code-exercise',
      title: 'Add a Method',
      instructions: 'Add a `get_info` method to the `Product` class that returns a string like:\n`"Laptop: $999"`',
      starterCode: 'class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n    \n    # Add get_info method here\n\np = Product("Laptop", 999)\ninfo = p.get_info()\n',
      solutionCode: 'class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n    \n    # Add get_info method here\n    def get_info(self):\n        return f"{self.name}: ${self.price}"\n\np = Product("Laptop", 999)\ninfo = p.get_info()',
      testCases: [
        {
          id: 'test-1',
          description: 'info should be "Laptop: $999"',
          testCode: 'assert info == "Laptop: $999", \'info should be "Laptop: $999"\'',
        },
      ],
      hints: [
        'def get_info(self):',
        'Use f-string: f"{self.name}: ${self.price}"',
      ],
      aiHintPrompt: 'The user is learning to add methods to classes.',
    },
    {
      id: 'step-3-class-method',
      order: 3,
      type: 'instruction',
      title: 'Class Methods',
      content: '# @classmethod Decorator\n\nClass methods receive the class (not instance) as their first argument:',
      codeExample: {
        code: 'class Person:\n    count = 0  # Class attribute\n    \n    def __init__(self, name):\n        self.name = name\n        Person.count += 1\n    \n    @classmethod\n    def get_count(cls):\n        """Returns how many Person instances exist"""\n        return cls.count\n    \n    @classmethod\n    def from_string(cls, data):\n        """Alternative constructor - create from string"""\n        name, age = data.split(",")\n        return cls(name)\n\nprint(Person.get_count())  # 0\np1 = Person("Alice")\np2 = Person("Bob")\nprint(Person.get_count())  # 2',
        language: 'python',
        highlight: [8, 9, 10, 11, 13, 14, 15, 16, 17],
      },
    },
    {
      id: 'step-4-static',
      order: 4,
      type: 'instruction',
      title: 'Static Methods',
      content: '# @staticmethod Decorator\n\nStatic methods don\'t receive self or cls - they\'re just regular functions in a class:',
      codeExample: {
        code: 'class MathUtils:\n    @staticmethod\n    def add(a, b):\n        return a + b\n    \n    @staticmethod\n    def is_positive(n):\n        return n > 0\n\n# Call without creating an instance\nprint(MathUtils.add(5, 3))       # 8\nprint(MathUtils.is_positive(-5)) # False',
        language: 'python',
        highlight: [2, 3, 6, 7, 11, 12],
      },
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'When would you use a @classmethod?',
      options: [
        {
          id: 'a',
          text: 'When you need to modify instance attributes',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'When you need an alternative constructor',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'When you don\'t need self or cls',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'When you want to make the method private',
          isCorrect: false,
        },
      ],
      explanation: 'Class methods are commonly used as alternative constructors (factory methods) that create instances in different ways. They receive the class as an argument, allowing them to create instances.',
    },
  ],
}
