import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-03-input-output',
  slug: 'input-output',
  title: 'Input and Output',
  description: 'Learn how to get input from users and format output with f-strings.',
  order: 3,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: ['py-02-variables-types'],
  tags: ['basics', 'input', 'output', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'input-function',
      term: 'input() Function',
      definition: 'The `input()` function reads text from the user. It displays a prompt and waits for the user to type something.',
      syntax: 'user_input = input("Prompt: ")',
      example: {
        code: 'name = input("What is your name? ")',
        explanation: 'Displays the prompt and stores whatever the user types in the `name` variable.',
      },
      whyItMatters: 'Input allows your programs to interact with users, making them dynamic and useful.',
    },
    {
      id: 'f-string',
      term: 'f-string',
      definition: 'An f-string (formatted string literal) lets you embed variables and expressions inside strings using curly braces.',
      syntax: 'f"Text {variable} more text"',
      example: {
        code: 'name = "Alice"\nmessage = f"Hello, {name}!"',
        explanation: 'The f-string inserts the value of `name` into the string, resulting in "Hello, Alice!".',
      },
      whyItMatters: 'F-strings make it easy to create dynamic messages and format output beautifully.',
    },
  ],
  steps: [
    {
      id: 'step-1-input',
      order: 1,
      type: 'instruction',
      title: 'Getting User Input',
      content: `# The input() Function

Use **input()** to get text from the user. It always returns a string, even if the user types a number.`,
      codeExample: {
        code: `# Get user input
name = input("What is your name? ")
print(f"Hello, {name}!")`,
        language: 'python',
        highlight: [2],
      },
    },
    {
      id: 'step-2-fstrings',
      order: 2,
      type: 'instruction',
      title: 'F-strings for Formatting',
      content: `# F-strings (Formatted String Literals)

F-strings let you embed variables directly in strings. Start with \`f\` before the quotes and use \`{variable}\` to insert values.`,
      codeExample: {
        code: `name = "Alice"
age = 25

# Using f-strings
message = f"My name is {name} and I'm {age} years old."
print(message)

# You can also do calculations
print(f"Next year I'll be {age + 1}")`,
        language: 'python',
        highlight: [5, 6],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Greeting Program',
      instructions: `Create a program that:
1. Asks the user for their name using \`input()\`
2. Stores it in a variable called \`name\`
3. Prints a greeting using an f-string: \`"Hello, {name}! Welcome to Python!"\`

Note: Since we can't actually get user input in this environment, just create the variable \`name\` with a value like \`"Student"\` and print the greeting.`,
      starterCode: `# Create your greeting program here

`,
      solutionCode: `# Create your greeting program here
name = "Student"
greeting = f"Hello, {name}! Welcome to Python!"
print(greeting)`,
      testCases: [
        {
          id: 'test-1',
          description: 'Variable `name` should exist',
          testCode: `try:
    name
except NameError:
    raise AssertionError('name variable should exist')`,
        },
        {
          id: 'test-2',
          description: 'Should create a greeting',
          testCode: `# Test passes if code runs without errors
pass`,
        },
      ],
      hints: [
        'Create a variable: `name = "Student"`',
        'Use an f-string: `greeting = f"Hello, {name}!"`',
        'Print the greeting with `print()`',
      ],
      aiHintPrompt: 'The user is learning to use input and f-strings in Python.',
    },
    {
      id: 'step-4-formatting',
      order: 4,
      type: 'instruction',
      title: 'More Formatting Options',
      content: `# Advanced F-string Formatting

F-strings support many formatting options:

- Numbers: \`{number:.2f}\` - Format as float with 2 decimals
- Alignment: \`{text:>10}\` - Right align in 10 characters
- Expressions: You can put any Python expression inside \`{}\``,
      codeExample: {
        code: `price = 19.99
print(f"Price: \${price:.2f}")

name = "Python"
print(f"{name:>10}")  # Right aligned`,
        language: 'python',
        highlight: [2],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Format Numbers',
      instructions: `Create a variable \`price\` with the value \`19.99\` and print it formatted to 2 decimal places using an f-string.

Use the format: \`f"Price: \${price:.2f}"\``,
      starterCode: `# Format your price here

`,
      solutionCode: `# Format your price here
price = 19.99
print(f"Price: \${price:.2f}")`,
      testCases: [
        {
          id: 'test-1',
          description: 'Variable `price` should exist and equal 19.99',
          testCode: `assert price == 19.99, 'price should be 19.99'`,
        },
      ],
      hints: [
        'Create the price variable: `price = 19.99`',
        'Use f-string formatting: `f"Price: ${price:.2f}"`',
        'The `.2f` formats to 2 decimal places',
      ],
      aiHintPrompt: 'The user is learning number formatting with f-strings.',
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `x = 5
y = 3
print(f"{x} + {y} = {x + y}")`,
      options: [
        {
          id: 'a',
          text: '5 + 3 = 8',
          isCorrect: true,
        },
        {
          id: 'b',
          text: '8',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '5 + 3 = 53',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error',
          isCorrect: false,
        },
      ],
      explanation: 'F-strings evaluate expressions inside curly braces, so `{x + y}` calculates 5 + 3 = 8, resulting in "5 + 3 = 8".',
    },
  ],
}

