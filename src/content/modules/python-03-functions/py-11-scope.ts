import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-11-scope',
  slug: 'scope',
  title: 'Scope and Variables',
  description: 'Understand variable scope: local vs global, and the LEGB rule.',
  order: 11,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-10-function-args'],
  tags: ['functions', 'scope', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'local-scope',
      term: 'Local Scope',
      definition: 'Variables defined inside a function are local - they only exist inside that function.',
      syntax: 'def func():\\n    local_var = 10  # Only exists in func',
      example: {
        code: 'def func():\\n    x = 10\\n    print(x)\\n\\nfunc()  # 10\\nprint(x)  # Error!',
        explanation: 'x only exists inside func and cannot be accessed outside.',
      },
      whyItMatters: 'Local scope prevents functions from accidentally modifying variables in other parts of your code.',
    },
    {
      id: 'global-scope',
      term: 'Global Scope',
      definition: 'Variables defined outside functions are global - they can be accessed anywhere in the module.',
      syntax: 'global_var = 10\\n\\ndef func():\\n    print(global_var)  # Can read it',
      example: {
        code: 'name = "Alice"\\n\\ndef greet():\\n    print(f"Hello, {name}")',
        explanation: 'Global variables can be read inside functions.',
      },
      whyItMatters: 'Understanding global scope helps you share data across functions when needed.',
    },
    {
      id: 'global-keyword',
      term: 'global Keyword',
      definition: 'The global keyword lets you modify a global variable from inside a function.',
      syntax: 'def func():\\n    global var_name\\n    var_name = 10',
      example: {
        code: 'count = 0\\n\\ndef increment():\\n    global count\\n    count += 1',
        explanation: 'Without global, this would create a new local variable instead.',
      },
      whyItMatters: 'While generally avoided, global can be useful for counters or configuration.',
    },
  ],
  steps: [
    {
      id: 'step-1-local',
      order: 1,
      type: 'instruction',
      title: 'Local Scope',
      content: `# Local Variables

Variables created inside a function only exist inside that function:`,
      codeExample: {
        code: `def my_function():
    message = "Hello!"  # Local variable
    print(message)

my_function()  # Hello!

# This would cause an error:
# print(message)  # NameError: message is not defined`,
        language: 'python',
        highlight: [2],
      },
    },
    {
      id: 'step-2-global',
      order: 2,
      type: 'instruction',
      title: 'Global Scope',
      content: `# Global Variables

Variables created outside functions can be accessed anywhere:`,
      codeExample: {
        code: `name = "Alice"  # Global variable

def greet():
    print(f"Hello, {name}!")  # Can read global

greet()  # Hello, Alice!
print(name)  # Alice - still accessible`,
        language: 'python',
        highlight: [1, 4],
      },
    },
    {
      id: 'step-3-shadowing',
      order: 3,
      type: 'instruction',
      title: 'Variable Shadowing',
      content: `# Shadowing Global Variables

If you assign to a variable inside a function, it creates a **new local** variable:`,
      codeExample: {
        code: `name = "Alice"  # Global

def change_name():
    name = "Bob"  # This creates a LOCAL variable!
    print(f"Inside: {name}")

change_name()        # Inside: Bob
print(f"Outside: {name}")  # Outside: Alice (unchanged!)`,
        language: 'python',
        highlight: [4, 7, 8],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Predict the Output',
      instructions: `Study this code and predict what \`result\` will be:

\`\`\`python
x = 10

def double():
    x = 20
    return x * 2

result = double() + x
\`\`\`

Create the same code and assign the final answer to \`result\`.`,
      starterCode: `# Recreate the code
x = 10

`,
      solutionCode: `# Recreate the code
x = 10

def double():
    x = 20
    return x * 2

result = double() + x`,
      testCases: [
        {
          id: 'test-1',
          description: 'result should equal 50',
          testCode: `assert result == 50, 'result should be 50 (40 from function + 10 global)'`,
        },
      ],
      hints: [
        'The function creates a LOCAL x = 20',
        'double() returns 20 * 2 = 40',
        'The global x is still 10',
        'Result is 40 + 10 = 50',
      ],
      aiHintPrompt: 'The user is learning about local vs global variable scope.',
    },
    {
      id: 'step-5-global-keyword',
      order: 5,
      type: 'instruction',
      title: 'The global Keyword',
      content: `# Modifying Global Variables

Use the \`global\` keyword to modify a global variable inside a function:`,
      codeExample: {
        code: `count = 0  # Global

def increment():
    global count  # Declare we want to use the global
    count += 1

increment()
increment()
increment()
print(count)  # 3`,
        language: 'python',
        highlight: [4],
      },
    },
    {
      id: 'step-6-legb',
      order: 6,
      type: 'instruction',
      title: 'The LEGB Rule',
      content: `# LEGB: How Python Finds Variables

When you use a variable, Python searches in this order:

1. **L**ocal - Inside the current function
2. **E**nclosing - Inside enclosing functions
3. **G**lobal - At the module level
4. **B**uilt-in - Python's built-in names`,
      codeExample: {
        code: `x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)  # Uses local
    
    inner()

outer()  # Prints: local`,
        language: 'python',
        highlight: [1, 4, 7],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `x = 5

def foo():
    x = 10
    print(x)

foo()
print(x)`,
      options: [
        {
          id: 'a',
          text: '10, then 10',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '10, then 5',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '5, then 5',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error',
          isCorrect: false,
        },
      ],
      explanation: 'Inside foo(), x = 10 creates a local variable, so it prints 10. Outside, the global x is still 5.',
    },
  ],
}
