import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-30-classes',
  slug: 'classes',
  title: 'Classes and Objects',
  description: 'Learn the fundamentals of object-oriented programming with classes.',
  order: 30,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['py-29-debugging'],
  tags: ['oop', 'classes', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'class',
      term: 'Class',
      definition: 'A class is a blueprint for creating objects. It defines attributes (data) and methods (functions).',
      syntax: 'class ClassName:\\n    pass',
      example: {
        code: 'class Dog:\\n    def __init__(self, name):\\n        self.name = name',
        explanation: 'Creates a Dog class with a name attribute.',
      },
      whyItMatters: 'Classes let you model real-world concepts and organize complex code.',
    },
    {
      id: 'object',
      term: 'Object (Instance)',
      definition: 'An object is a specific instance of a class, with its own attribute values.',
      syntax: 'my_object = ClassName()',
      example: {
        code: 'my_dog = Dog("Buddy")\\nprint(my_dog.name)  # "Buddy"',
        explanation: 'Creates a Dog instance with name "Buddy".',
      },
      whyItMatters: 'Objects let you create multiple independent instances from one class.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Defining a Class',
      content: '# What is a Class?\n\nA class is a blueprint for creating objects:',
      codeExample: {
        code: '# Define a class\nclass Dog:\n    # The __init__ method runs when creating an instance\n    def __init__(self, name, age):\n        self.name = name  # Instance attribute\n        self.age = age    # Instance attribute\n\n# Create instances (objects)\nbuddy = Dog("Buddy", 3)\nmax = Dog("Max", 5)\n\nprint(buddy.name)  # "Buddy"\nprint(max.age)     # 5',
        language: 'python',
        highlight: [2, 4, 5, 6, 9, 10],
      },
    },
    {
      id: 'step-2-self',
      order: 2,
      type: 'instruction',
      title: 'Understanding self',
      content: '# The self Parameter\n\n`self` refers to the current instance of the class:',
      codeExample: {
        code: 'class Person:\n    def __init__(self, name):\n        self.name = name  # self.name = attribute of THIS instance\n    \n    def greet(self):\n        # self lets us access instance attributes\n        return f"Hi, I\'m {self.name}!"\n\nalice = Person("Alice")\nbob = Person("Bob")\n\nprint(alice.greet())  # "Hi, I\'m Alice!"\nprint(bob.greet())    # "Hi, I\'m Bob!"',
        language: 'python',
        highlight: [3, 7, 12, 13],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Simple Class',
      instructions: 'Create a `Car` class with:\n- `__init__` that takes `brand` and `year`\n- Stores them as instance attributes\n\nThen create a car: `my_car = Car("Toyota", 2022)`',
      starterCode: '# Create the Car class\n\n',
      solutionCode: '# Create the Car class\nclass Car:\n    def __init__(self, brand, year):\n        self.brand = brand\n        self.year = year\n\nmy_car = Car("Toyota", 2022)',
      testCases: [
        {
          id: 'test-1',
          description: 'my_car.brand should be "Toyota"',
          testCode: 'assert my_car.brand == "Toyota", \'my_car.brand should be "Toyota"\'',
        },
        {
          id: 'test-2',
          description: 'my_car.year should be 2022',
          testCode: 'assert my_car.year == 2022, \'my_car.year should be 2022\'',
        },
      ],
      hints: [
        'class Car:',
        'def __init__(self, brand, year):',
        'self.brand = brand',
      ],
      aiHintPrompt: 'The user is learning to create classes in Python.',
    },
    {
      id: 'step-4-attributes',
      order: 4,
      type: 'instruction',
      title: 'Class vs Instance Attributes',
      content: '# Two Types of Attributes',
      codeExample: {
        code: 'class Dog:\n    # Class attribute - shared by ALL instances\n    species = "Canis familiaris"\n    \n    def __init__(self, name):\n        # Instance attribute - unique to each instance\n        self.name = name\n\nbuddy = Dog("Buddy")\nmax = Dog("Max")\n\n# Both share the class attribute\nprint(buddy.species)  # "Canis familiaris"\nprint(max.species)    # "Canis familiaris"\n\n# Each has unique instance attribute\nprint(buddy.name)     # "Buddy"\nprint(max.name)       # "Max"',
        language: 'python',
        highlight: [3, 7, 13, 14, 17, 18],
      },
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'What is `self` in a Python class?',
      options: [
        {
          id: 'a',
          text: 'A reserved keyword for the class name',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'A reference to the current instance',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'A way to call parent class methods',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'A required parameter name (cannot be changed)',
          isCorrect: false,
        },
      ],
      explanation: '`self` refers to the current instance of the class. It allows methods to access and modify instance attributes. Note: "self" is a convention, not a keyword - you could use any name, but "self" is strongly recommended.',
    },
  ],
}
