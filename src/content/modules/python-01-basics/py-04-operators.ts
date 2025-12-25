import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-04-operators',
  slug: 'operators',
  title: 'Operators',
  description: 'Learn about arithmetic, comparison, and logical operators in Python.',
  order: 4,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['py-03-input-output'],
  tags: ['basics', 'operators', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'arithmetic-operators',
      term: 'Arithmetic Operators',
      definition: 'Operators for mathematical operations: + (add), - (subtract), * (multiply), / (divide), // (floor divide), % (modulo), ** (exponent).',
      syntax: 'result = a + b',
      example: {
        code: 'sum = 5 + 3  # 8\nproduct = 4 * 2  # 8\npower = 2 ** 3  # 8',
        explanation: 'Different operators perform different mathematical operations.',
      },
      whyItMatters: 'Arithmetic operators are fundamental for any calculations in your programs.',
    },
    {
      id: 'comparison-operators',
      term: 'Comparison Operators',
      definition: 'Operators that compare values and return True or False: == (equal), != (not equal), < (less than), > (greater than), <= (less or equal), >= (greater or equal).',
      syntax: 'result = a == b',
      example: {
        code: 'is_equal = 5 == 5  # True\nis_greater = 10 > 5  # True',
        explanation: 'Comparison operators return boolean values.',
      },
      whyItMatters: 'Comparison operators are essential for making decisions and controlling program flow.',
    },
    {
      id: 'logical-operators',
      term: 'Logical Operators',
      definition: 'Operators for combining boolean values: and, or, not.',
      syntax: 'result = condition1 and condition2',
      example: {
        code: 'result = (5 > 3) and (2 < 4)  # True\nresult = not (5 > 10)  # True',
        explanation: 'Logical operators combine multiple conditions.',
      },
      whyItMatters: 'Logical operators let you create complex conditions for decision-making.',
    },
  ],
  steps: [
    {
      id: 'step-1-arithmetic',
      order: 1,
      type: 'instruction',
      title: 'Arithmetic Operators',
      content: `# Math in Python

Python supports all the basic arithmetic operations you'd expect:`,
      codeExample: {
        code: `# Addition
sum = 5 + 3  # 8

# Subtraction
diff = 10 - 4  # 6

# Multiplication
product = 3 * 4  # 12

# Division (always returns float)
quotient = 10 / 3  # 3.333...

# Floor division (returns integer)
floor = 10 // 3  # 3

# Modulo (remainder)
remainder = 10 % 3  # 1

# Exponentiation
power = 2 ** 3  # 8`,
        language: 'python',
        highlight: [2, 3],
      },
    },
    {
      id: 'step-2-exercise-1',
      order: 2,
      type: 'code-exercise',
      title: 'Calculate with Operators',
      instructions: `Create variables and calculate:
1. \`a = 10\` and \`b = 3\`
2. Calculate \`sum\` = a + b
3. Calculate \`product\` = a * b
4. Calculate \`power\` = a ** b
5. Print all three results`,
      starterCode: `# Create variables and calculate

`,
      solutionCode: `# Create variables and calculate
a = 10
b = 3

sum = a + b
product = a * b
power = a ** b

print(sum)
print(product)
print(power)`,
      testCases: [
        {
          id: 'test-1',
          description: 'sum should equal 13',
          testCode: `assert sum == 13, 'sum should be 13'`,
        },
        {
          id: 'test-2',
          description: 'product should equal 30',
          testCode: `assert product == 30, 'product should be 30'`,
        },
        {
          id: 'test-3',
          description: 'power should equal 1000',
          testCode: `assert power == 1000, 'power should be 1000'`,
        },
      ],
      hints: [
        'Use `+` for addition',
        'Use `*` for multiplication',
        'Use `**` for exponentiation',
      ],
      aiHintPrompt: 'The user is learning arithmetic operators in Python.',
    },
    {
      id: 'step-3-comparison',
      order: 3,
      type: 'instruction',
      title: 'Comparison Operators',
      content: `# Comparing Values

Comparison operators return **True** or **False**:`,
      codeExample: {
        code: `# Equal to
5 == 5  # True
5 == 3  # False

# Not equal to
5 != 3  # True

# Less than / Greater than
5 < 10  # True
5 > 10  # False

# Less than or equal / Greater than or equal
5 <= 5  # True
5 >= 10  # False`,
        language: 'python',
        highlight: [2, 3],
      },
    },
    {
      id: 'step-4-exercise-2',
      order: 4,
      type: 'code-exercise',
      title: 'Use Comparison Operators',
      instructions: `Create variables:
1. \`x = 10\` and \`y = 5\`
2. Check if x is greater than y, store in \`is_greater\`
3. Check if x equals y, store in \`is_equal\`
4. Print both results`,
      starterCode: `# Compare x and y

`,
      solutionCode: `# Compare x and y
x = 10
y = 5

is_greater = x > y
is_equal = x == y

print(is_greater)
print(is_equal)`,
      testCases: [
        {
          id: 'test-1',
          description: 'is_greater should be True',
          testCode: `assert is_greater == True, 'is_greater should be True'`,
        },
        {
          id: 'test-2',
          description: 'is_equal should be False',
          testCode: `assert is_equal == False, 'is_equal should be False'`,
        },
      ],
      hints: [
        'Use `>` for greater than',
        'Use `==` for equal to (note: double equals, not single)',
        'Comparison operators return True or False',
      ],
      aiHintPrompt: 'The user is learning comparison operators in Python.',
    },
    {
      id: 'step-5-logical',
      order: 5,
      type: 'instruction',
      title: 'Logical Operators',
      content: `# Combining Conditions

Logical operators combine boolean values:

- **and** - Both must be True
- **or** - At least one must be True
- **not** - Reverses the boolean value`,
      codeExample: {
        code: `# AND - both must be True
result = (5 > 3) and (2 < 4)  # True

# OR - at least one True
result = (5 > 10) or (2 < 4)  # True

# NOT - reverses the value
result = not (5 > 10)  # True (because 5 > 10 is False)`,
        language: 'python',
        highlight: [2],
      },
    },
    {
      id: 'step-6-exercise-3',
      order: 6,
      type: 'code-exercise',
      title: 'Use Logical Operators',
      instructions: `Create variables:
1. \`age = 20\` and \`has_license = True\`
2. Check if age is 18 or older AND has_license is True, store in \`can_drive\`
3. Print the result`,
      starterCode: `# Check if person can drive

`,
      solutionCode: `# Check if person can drive
age = 20
has_license = True

can_drive = (age >= 18) and has_license

print(can_drive)`,
      testCases: [
        {
          id: 'test-1',
          description: 'can_drive should be True',
          testCode: `assert can_drive == True, 'can_drive should be True'`,
        },
      ],
      hints: [
        'Use `>=` for "greater than or equal to"',
        'Use `and` to combine conditions',
        'Both conditions must be True for `and` to return True',
      ],
      aiHintPrompt: 'The user is learning logical operators in Python.',
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `x = 5
y = 10
result = (x < y) and (y > 15)`,
      options: [
        {
          id: 'a',
          text: 'True',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'False',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '5',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error',
          isCorrect: false,
        },
      ],
      explanation: '`x < y` is True (5 < 10), but `y > 15` is False (10 is not > 15). With `and`, both must be True, so the result is False.',
    },
  ],
}

