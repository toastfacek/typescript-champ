import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-32-inheritance',
  slug: 'inheritance',
  title: 'Inheritance',
  description: 'Learn to create class hierarchies with inheritance.',
  order: 32,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 80,
  prerequisites: ['py-31-methods'],
  tags: ['oop', 'inheritance', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'inheritance',
      term: 'Inheritance',
      definition: 'A way to create a new class based on an existing class, inheriting its attributes and methods.',
      syntax: 'class Child(Parent):',
      example: {
        code: 'class Animal:\\n    pass\\n\\nclass Dog(Animal):\\n    pass',
        explanation: 'Dog inherits from Animal.',
      },
      whyItMatters: 'Inheritance promotes code reuse and creates logical class hierarchies.',
    },
    {
      id: 'super',
      term: 'super() Function',
      definition: 'Calls a method from the parent class, usually used in __init__ to initialize parent attributes.',
      syntax: 'super().__init__()',
      example: {
        code: 'def __init__(self, name):\\n    super().__init__()\\n    self.name = name',
        explanation: 'Calls parent\'s __init__ before adding child-specific code.',
      },
      whyItMatters: 'super() ensures proper initialization in class hierarchies.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Basic Inheritance',
      content: '# Inheritance in Python\n\nCreate a child class that inherits from a parent:',
      codeExample: {
        code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        return "Some sound"\n\nclass Dog(Animal):  # Dog inherits from Animal\n    def speak(self):  # Override parent method\n        return "Woof!"\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow!"\n\ndog = Dog("Buddy")\nprint(dog.name)    # "Buddy" (inherited)\nprint(dog.speak()) # "Woof!" (overridden)',
        language: 'python',
        highlight: [8, 9, 10, 17, 18],
      },
    },
    {
      id: 'step-2-super',
      order: 2,
      type: 'instruction',
      title: 'Using super()',
      content: '# Calling Parent Methods\n\nUse `super()` to call parent class methods:',
      codeExample: {
        code: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nclass Employee(Person):\n    def __init__(self, name, age, employee_id):\n        # Call parent __init__ first\n        super().__init__(name, age)\n        # Then add child-specific attributes\n        self.employee_id = employee_id\n\nemp = Employee("Alice", 30, "E001")\nprint(emp.name)        # "Alice" (from parent)\nprint(emp.employee_id) # "E001" (from child)',
        language: 'python',
        highlight: [9, 11, 14, 15],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Child Class',
      instructions: 'Given the `Vehicle` class, create a `Car` class that:\n1. Inherits from Vehicle\n2. Adds a `num_doors` attribute\n3. Use super() to call parent __init__',
      starterCode: 'class Vehicle:\n    def __init__(self, brand):\n        self.brand = brand\n\n# Create Car class inheriting from Vehicle\n\nmy_car = Car("Toyota", 4)\n',
      solutionCode: 'class Vehicle:\n    def __init__(self, brand):\n        self.brand = brand\n\n# Create Car class inheriting from Vehicle\nclass Car(Vehicle):\n    def __init__(self, brand, num_doors):\n        super().__init__(brand)\n        self.num_doors = num_doors\n\nmy_car = Car("Toyota", 4)',
      testCases: [
        {
          id: 'test-1',
          description: 'my_car.brand should be "Toyota"',
          testCode: 'assert my_car.brand == "Toyota", \'my_car.brand should be "Toyota"\'',
        },
        {
          id: 'test-2',
          description: 'my_car.num_doors should be 4',
          testCode: 'assert my_car.num_doors == 4, \'my_car.num_doors should be 4\'',
        },
      ],
      hints: [
        'class Car(Vehicle):',
        'def __init__(self, brand, num_doors):',
        'super().__init__(brand)',
      ],
      aiHintPrompt: 'The user is learning inheritance with super().',
    },
    {
      id: 'step-4-isinstance',
      order: 4,
      type: 'instruction',
      title: 'Checking Types',
      content: '# isinstance() and issubclass()',
      codeExample: {
        code: 'class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nbuddy = Dog()\n\n# Check if object is instance of class\nprint(isinstance(buddy, Dog))     # True\nprint(isinstance(buddy, Animal))  # True (inherited)\nprint(isinstance(buddy, str))     # False\n\n# Check if class is subclass of another\nprint(issubclass(Dog, Animal))    # True\nprint(issubclass(Animal, Dog))    # False',
        language: 'python',
        highlight: [10, 11, 15, 16],
      },
    },
    {
      id: 'step-5-quiz',
      order: 5,
      type: 'quiz',
      question: 'What does `super().__init__()` do?',
      options: [
        {
          id: 'a',
          text: 'Creates a new parent instance',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Calls the parent class __init__ method',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Makes the class a superclass',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Overrides the parent class',
          isCorrect: false,
        },
      ],
      explanation: 'super().__init__() calls the parent class\'s __init__ method, ensuring the parent\'s initialization code runs. This is essential when the child class adds to but doesn\'t replace parent functionality.',
    },
  ],
}
