import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-10-function-args',
  slug: 'function-args',
  title: 'Function Arguments',
  description: 'Learn about default values, keyword arguments, and flexible *args and **kwargs.',
  order: 10,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-09-function-basics'],
  tags: ['functions', 'arguments', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'default-values',
      term: 'Default Values',
      definition: 'Default values are assigned to parameters when no argument is provided. They make parameters optional.',
      syntax: 'def function(param=default_value):',
      example: {
        code: 'def greet(name="World"):\\n    print(f"Hello, {name}!")\\n\\ngreet()  # Hello, World!',
        explanation: 'If no name is given, it defaults to "World".',
      },
      whyItMatters: 'Default values make functions more flexible and easier to use.',
    },
    {
      id: 'keyword-arguments',
      term: 'Keyword Arguments',
      definition: 'Keyword arguments let you specify which parameter gets which value by name, regardless of order.',
      syntax: 'function(param_name=value)',
      example: {
        code: 'def power(base, exp):\\n    return base ** exp\\n\\npower(exp=3, base=2)  # 8',
        explanation: 'Order doesn\'t matter when using keyword arguments.',
      },
      whyItMatters: 'Keyword arguments make function calls clearer and more readable.',
    },
    {
      id: 'args-kwargs',
      term: '*args and **kwargs',
      definition: '*args collects extra positional arguments as a tuple. **kwargs collects extra keyword arguments as a dictionary.',
      syntax: 'def function(*args, **kwargs):',
      example: {
        code: 'def print_all(*args):\\n    for arg in args:\\n        print(arg)',
        explanation: '*args lets you pass any number of arguments.',
      },
      whyItMatters: 'These patterns let you create highly flexible functions.',
    },
  ],
  steps: [
    {
      id: 'step-1-defaults',
      order: 1,
      type: 'instruction',
      title: 'Default Parameter Values',
      content: `# Default Values

Give parameters default values to make them optional:`,
      codeExample: {
        code: `def greet(name="World"):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet()         # Hello, World! (uses default)

# Multiple defaults
def power(base, exp=2):
    return base ** exp

print(power(5))     # 25 (5²)
print(power(5, 3))  # 125 (5³)`,
        language: 'python',
        highlight: [1, 8],
      },
    },
    {
      id: 'step-2-exercise-1',
      order: 2,
      type: 'code-exercise',
      title: 'Create a Function with Defaults',
      instructions: `Create a function called \`greet\` that:
1. Takes a \`name\` parameter with default value \`"Guest"\`
2. Returns the string \`"Welcome, {name}!"\`

Test by calling \`greet()\` and storing in \`msg1\`, then \`greet("Alice")\` in \`msg2\`.`,
      starterCode: `# Create greet function with default

`,
      solutionCode: `# Create greet function with default
def greet(name="Guest"):
    return f"Welcome, {name}!"

msg1 = greet()
msg2 = greet("Alice")`,
      testCases: [
        {
          id: 'test-1',
          description: 'msg1 should use default value',
          testCode: `assert msg1 == "Welcome, Guest!", 'msg1 should be "Welcome, Guest!"'`,
        },
        {
          id: 'test-2',
          description: 'msg2 should use provided value',
          testCode: `assert msg2 == "Welcome, Alice!", 'msg2 should be "Welcome, Alice!"'`,
        },
      ],
      hints: [
        'Use `def greet(name="Guest"):` for the default',
        'Return using an f-string',
        'Call without arguments to use the default',
      ],
      aiHintPrompt: 'The user is learning default parameter values.',
    },
    {
      id: 'step-3-keyword',
      order: 3,
      type: 'instruction',
      title: 'Keyword Arguments',
      content: `# Keyword Arguments

Use parameter names when calling functions for clarity:`,
      codeExample: {
        code: `def describe_pet(name, animal, age):
    print(f"{name} is a {age}-year-old {animal}")

# Positional arguments (order matters)
describe_pet("Buddy", "dog", 3)

# Keyword arguments (order doesn't matter!)
describe_pet(age=5, name="Whiskers", animal="cat")

# Mix positional and keyword
describe_pet("Max", animal="dog", age=2)`,
        language: 'python',
        highlight: [8, 11],
      },
    },
    {
      id: 'step-4-args',
      order: 4,
      type: 'instruction',
      title: 'Variable Arguments with *args',
      content: `# *args - Accept Any Number of Arguments

Use \`*args\` to accept any number of positional arguments:`,
      codeExample: {
        code: `def add_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Call with any number of arguments
print(add_all(1, 2))        # 3
print(add_all(1, 2, 3, 4))  # 10
print(add_all(5))           # 5`,
        language: 'python',
        highlight: [1, 8, 9, 10],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create a Sum Function',
      instructions: `Create a function called \`sum_all\` that:
1. Uses \`*args\` to accept any number of arguments
2. Returns the sum of all arguments

Test with \`result = sum_all(1, 2, 3, 4, 5)\``,
      starterCode: `# Create sum_all function with *args

`,
      solutionCode: `# Create sum_all function with *args
def sum_all(*args):
    return sum(args)

result = sum_all(1, 2, 3, 4, 5)`,
      testCases: [
        {
          id: 'test-1',
          description: 'result should equal 15',
          testCode: `assert result == 15, 'result should be 15'`,
        },
        {
          id: 'test-2',
          description: 'sum_all should work with any number of args',
          testCode: `assert sum_all(2, 3) == 5, 'sum_all(2, 3) should be 5'`,
        },
      ],
      hints: [
        'Use `def sum_all(*args):` to accept any number',
        'You can use the built-in `sum()` function',
        'args is a tuple, so `sum(args)` works',
      ],
      aiHintPrompt: 'The user is learning *args for variable arguments.',
    },
    {
      id: 'step-6-kwargs',
      order: 6,
      type: 'instruction',
      title: 'Keyword Arguments with **kwargs',
      content: `# **kwargs - Accept Any Keyword Arguments

Use \`**kwargs\` to accept any keyword arguments as a dictionary:`,
      codeExample: {
        code: `def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# name: Alice
# age: 30
# city: NYC

# Combine regular, *args, and **kwargs
def flexible(required, *args, **kwargs):
    print(f"Required: {required}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")`,
        language: 'python',
        highlight: [1, 11],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will this function return?',
      codeContext: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

result = greet("Bob", greeting="Hi")`,
      options: [
        {
          id: 'a',
          text: '"Hello, Bob!"',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '"Hi, Bob!"',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Error - too many arguments',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '"greeting, Bob!"',
          isCorrect: false,
        },
      ],
      explanation: 'The keyword argument `greeting="Hi"` overrides the default value of "Hello", so it returns "Hi, Bob!".',
    },
  ],
}
