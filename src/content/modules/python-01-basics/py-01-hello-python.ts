import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-01-hello-python',
  slug: 'hello-python',
  title: 'Hello, Python!',
  description: 'Your first steps into the world of Python. Learn the basics of Python syntax and print statements.',
  order: 1,
  estimatedMinutes: 8,
  difficulty: 'beginner',
  xpReward: 50,
  prerequisites: [],
  tags: ['basics', 'introduction', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'print-function',
      term: 'print() Function',
      definition: 'The `print()` function displays text or values on the screen. It\'s one of the most basic and useful functions in Python for showing output.',
      syntax: 'print("your text here")',
      example: {
        code: 'print("Hello, World!")',
        explanation: 'This displays the text "Hello, World!" on the screen.',
      },
      whyItMatters: 'Print is essential for debugging, showing results, and communicating with users. It\'s often the first function beginners learn.',
    },
    {
      id: 'string',
      term: 'String',
      definition: 'A string is text data in Python. Strings are created by wrapping text in quotes (single, double, or triple quotes).',
      syntax: '"text" or \'text\'',
      example: {
        code: 'message = "Hello, Python!"',
        explanation: 'Creates a string variable containing the text "Hello, Python!".',
      },
      whyItMatters: 'Strings are used everywhere - for messages, user input, file names, and data processing. Understanding strings is fundamental.',
    },
    {
      id: 'variable',
      term: 'Variable',
      definition: 'A variable is a named container that stores a value. In Python, you create variables by assigning values with the `=` sign.',
      syntax: 'variable_name = value',
      example: {
        code: 'name = "Alice"',
        explanation: 'Creates a variable called "name" and stores the string "Alice" in it.',
      },
      whyItMatters: 'Variables let you store and reuse values throughout your program, making code more readable and maintainable.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Welcome to Python!',
      content: `# Welcome to Python!

You're about to learn one of the most popular and beginner-friendly programming languages!

**Python** is known for its simple, readable syntax that makes it perfect for beginners and powerful enough for professional development.

## Why Python?

- **Easy to read** - Python code reads almost like English
- **Versatile** - Used in web development, data science, AI, automation, and more
- **Great community** - Tons of resources and libraries available
- **No semicolons** - Cleaner syntax than many languages

Let's write your first line of Python!`,
    },
    {
      id: 'step-2-print',
      order: 2,
      type: 'instruction',
      title: 'Your First Print Statement',
      content: `# The print() Function

In Python, you use the **print()** function to display text on the screen.

Here's how it works:`,
      codeExample: {
        code: `# Print a simple message
print("Hello, World!")

# Print multiple things
print("Hello", "Python", "!")

# Print numbers
print(42)`,
        language: 'python',
        highlight: [2],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Print Your First Message',
      instructions: `Use the \`print()\` function to display the message \`"Hello, Python!"\`.

Remember: The text should be in quotes (either single or double quotes).`,
      starterCode: `# Write your print statement here

`,
      solutionCode: `# Write your print statement here
print("Hello, Python!")`,
      testCases: [
        {
          id: 'test-1',
          description: 'Code should run without errors',
          testCode: `# Test passes if code runs successfully
pass`,
        },
      ],
      hints: [
        'Start with the keyword `print` followed by parentheses',
        'Put your message inside the parentheses with quotes around it',
        'The syntax is: `print("your message here")`',
      ],
      aiHintPrompt: 'The user is learning their first print statement in Python.',
    },
    {
      id: 'step-4-variables',
      order: 4,
      type: 'instruction',
      title: 'Variables in Python',
      content: `# Creating Variables

In Python, you create variables by assigning values with the **=** sign.

Python is dynamically typed - you don't need to declare the type!`,
      codeExample: {
        code: `# Create a string variable
message = "Hello, Python!"

# Create a number variable
age = 25

# Print the variable
print(message)`,
        language: 'python',
        highlight: [2],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create and Print a Variable',
      instructions: `Create a variable called \`greeting\` that contains the text \`"Welcome to Python!"\`, then print it.

You'll need two lines: one to create the variable, and one to print it.`,
      starterCode: `# Create your variable and print it

`,
      solutionCode: `# Create your variable and print it
greeting = "Welcome to Python!"
print(greeting)`,
      testCases: [
        {
          id: 'test-1',
          description: 'Variable `greeting` should exist',
          testCode: `try:
    greeting
except NameError:
    raise AssertionError('Variable greeting is not defined')`,
        },
        {
          id: 'test-2',
          description: 'Variable should equal "Welcome to Python!"',
          testCode: `assert greeting == "Welcome to Python!", 'greeting should be "Welcome to Python!"'`,
        },
        {
          id: 'test-3',
          description: 'Should print the greeting',
          testCode: `import sys
from io import StringIO

old_stdout = sys.stdout
sys.stdout = captured = StringIO()

# Re-run the print statement
print(greeting)

output = captured.getvalue()
sys.stdout = old_stdout

if "Welcome to Python!" not in output:
    raise AssertionError('Expected output to contain "Welcome to Python!"')`,
        },
      ],
      hints: [
        'Use `=` to assign a value to a variable',
        'Put quotes around the text: `greeting = "Welcome to Python!"`',
        'Then use `print(greeting)` to display it',
      ],
      aiHintPrompt: 'The user is learning to create variables and print them in Python.',
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `message = "Hello"
print(message)
message = "World"
print(message)`,
      options: [
        {
          id: 'a',
          text: 'Hello\nHello',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Hello\nWorld',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'World\nWorld',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Nothing (error)',
          isCorrect: false,
        },
      ],
      explanation: 'The variable `message` is reassigned to "World" before the second print statement, so it prints "Hello" first, then "World".',
    },
  ],
}

