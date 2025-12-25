import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-02-variables-types',
  slug: 'variables-types',
  title: 'Variables and Types',
  description: 'Learn about Python variables, dynamic typing, and basic data types.',
  order: 2,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['py-01-hello-python'],
  tags: ['basics', 'variables', 'types', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'dynamic-typing',
      term: 'Dynamic Typing',
      definition: 'Python automatically determines the type of a variable based on the value you assign. You don\'t need to declare types explicitly.',
      syntax: 'variable = value',
      example: {
        code: 'age = 25  # Python knows this is an integer\nname = "Alice"  # Python knows this is a string',
        explanation: 'Python automatically assigns the correct type based on the value.',
      },
      whyItMatters: 'Dynamic typing makes Python code simpler and faster to write, though it requires careful attention to what types you\'re working with.',
    },
    {
      id: 'integer',
      term: 'Integer',
      definition: 'An integer is a whole number (positive, negative, or zero) without decimal points.',
      syntax: 'number = 42',
      example: {
        code: 'age = 25\ncount = -10\nzero = 0',
        explanation: 'All of these are integers - whole numbers without decimals.',
      },
      whyItMatters: 'Integers are used for counting, indexing, and mathematical operations.',
    },
    {
      id: 'float',
      term: 'Float',
      definition: 'A float is a number with decimal points. Used for precise calculations.',
      syntax: 'number = 3.14',
      example: {
        code: 'price = 19.99\npi = 3.14159',
        explanation: 'Floats represent decimal numbers for precise calculations.',
      },
      whyItMatters: 'Floats are essential for calculations involving money, measurements, and scientific data.',
    },
    {
      id: 'boolean',
      term: 'Boolean',
      definition: 'A boolean is a type that can only be `True` or `False`. Used for conditions and logic.',
      syntax: 'is_active = True',
      example: {
        code: 'is_logged_in = True\nhas_permission = False',
        explanation: 'Booleans represent yes/no or on/off states.',
      },
      whyItMatters: 'Booleans are essential for making decisions in your code with if statements and loops.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Python Variables',
      content: `# Variables in Python

In Python, you create variables by assigning values. Python uses **dynamic typing** - it automatically figures out the type based on the value you assign.

No need to declare types like in some other languages!`,
      codeExample: {
        code: `# String variable
name = "Alice"

# Integer variable
age = 25

# Float variable
height = 5.6

# Boolean variable
is_student = True`,
        language: 'python',
        highlight: [2, 5, 8, 11],
      },
    },
    {
      id: 'step-2-types',
      order: 2,
      type: 'instruction',
      title: 'Basic Data Types',
      content: `# Python's Basic Types

Python has several built-in types:

- **int** - Whole numbers (42, -10, 0)
- **float** - Decimal numbers (3.14, 2.5)
- **str** - Text strings ("hello", 'world')
- **bool** - True or False
- **None** - Represents "nothing"`,
      codeExample: {
        code: `# Check the type of a variable
age = 25
print(type(age))  # <class 'int'>

price = 19.99
print(type(price))  # <class 'float'>

name = "Python"
print(type(name))  # <class 'str'>`,
        language: 'python',
        highlight: [2, 3],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create Different Types of Variables',
      instructions: `Create three variables:
1. A variable called \`name\` with the value \`"Python"\`
2. A variable called \`age\` with the value \`25\`
3. A variable called \`is_awesome\` with the value \`True\`

Then print each variable on a separate line.`,
      starterCode: `# Create your variables here

`,
      solutionCode: `# Create your variables here
name = "Python"
age = 25
is_awesome = True

print(name)
print(age)
print(is_awesome)`,
      testCases: [
        {
          id: 'test-1',
          description: 'Variable `name` should exist and be a string',
          testCode: `assert name == "Python", 'name should be "Python"'`,
        },
        {
          id: 'test-2',
          description: 'Variable `age` should exist and be an integer',
          testCode: `assert age == 25, 'age should be 25'`,
        },
        {
          id: 'test-3',
          description: 'Variable `is_awesome` should exist and be True',
          testCode: `assert is_awesome == True, 'is_awesome should be True'`,
        },
      ],
      hints: [
        'Use `=` to assign values',
        'Strings need quotes: `name = "Python"`',
        'Numbers don\'t need quotes: `age = 25`',
        'Booleans are `True` or `False` (capitalized)',
      ],
      aiHintPrompt: 'The user is learning to create variables of different types in Python.',
    },
    {
      id: 'step-4-type-conversion',
      order: 4,
      type: 'instruction',
      title: 'Type Conversion',
      content: `# Converting Between Types

Sometimes you need to convert one type to another:

- \`int()\` - Convert to integer
- \`float()\` - Convert to float
- \`str()\` - Convert to string
- \`bool()\` - Convert to boolean`,
      codeExample: {
        code: `# Convert string to integer
age_str = "25"
age = int(age_str)

# Convert integer to string
age = 25
age_str = str(age)

# Convert to float
number = float("3.14")`,
        language: 'python',
        highlight: [2, 3],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'fill-in-blank',
      title: 'Fill in the Types',
      instructions: 'Complete the code by converting values to the correct types.',
      codeTemplate: `# Convert the string to an integer
age_str = "30"
age = {{BLANK_1}}(age_str)

# Convert the integer to a string
count = 42
count_str = {{BLANK_2}}(count)

# Convert to float
price = {{BLANK_3}}("19.99")`,
      blanks: [
        {
          id: 'BLANK_1',
          placeholder: 'function',
          correctAnswers: ['int'],
          caseSensitive: true,
          hint: 'What function converts to an integer?',
        },
        {
          id: 'BLANK_2',
          placeholder: 'function',
          correctAnswers: ['str'],
          caseSensitive: true,
          hint: 'What function converts to a string?',
        },
        {
          id: 'BLANK_3',
          placeholder: 'function',
          correctAnswers: ['float'],
          caseSensitive: true,
          hint: 'What function converts to a float?',
        },
      ],
      hints: [
        'Use `int()` to convert to integer',
        'Use `str()` to convert to string',
        'Use `float()` to convert to float',
      ],
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'What will be the type of the variable `result`?',
      codeContext: `x = "5"
y = 3
result = x + str(y)`,
      options: [
        {
          id: 'a',
          text: 'int',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'str',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'float',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error (can\'t add string and int)',
          isCorrect: false,
        },
      ],
      explanation: 'Since `y` is converted to a string with `str(y)`, adding two strings concatenates them, resulting in a string "53".',
    },
  ],
}

