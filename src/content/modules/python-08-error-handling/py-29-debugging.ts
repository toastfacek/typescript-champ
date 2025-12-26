import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-29-debugging',
  slug: 'debugging',
  title: 'Debugging Basics',
  description: 'Learn debugging techniques and how to use assertions.',
  order: 29,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['py-28-raising-errors'],
  tags: ['debugging', 'testing', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'assert',
      term: 'assert Statement',
      definition: 'Asserts that a condition is True. Raises AssertionError if False.',
      syntax: 'assert condition, "error message"',
      example: {
        code: 'assert x > 0, "x must be positive"',
        explanation: 'Crashes with AssertionError if x is not positive.',
      },
      whyItMatters: 'Assertions catch bugs early by validating assumptions.',
    },
    {
      id: 'traceback',
      term: 'Traceback',
      definition: 'The error output showing the call stack when an exception occurs.',
      syntax: 'Traceback (most recent call last):...',
      example: {
        code: 'Traceback (most recent call last):\\n  File "main.py", line 5, in <module>\\n  ...\\nValueError: invalid',
        explanation: 'Shows the sequence of function calls leading to the error.',
      },
      whyItMatters: 'Reading tracebacks is essential for finding and fixing bugs.',
    },
  ],
  steps: [
    {
      id: 'step-1-print',
      order: 1,
      type: 'instruction',
      title: 'Print Debugging',
      content: '# The Simplest Debugging: print()\n\nStart with print statements to see what\'s happening:',
      codeExample: {
        code: 'def calculate_total(items):\n    print(f"DEBUG: items = {items}")  # See input\n    \n    total = 0\n    for item in items:\n        print(f"DEBUG: processing {item}")  # Track progress\n        total += item["price"]\n        print(f"DEBUG: total now = {total}")  # See changes\n    \n    return total',
        language: 'python',
        highlight: [2, 6, 8],
      },
    },
    {
      id: 'step-2-assert',
      order: 2,
      type: 'instruction',
      title: 'Assertions',
      content: '# Assert Statements\n\nUse `assert` to verify assumptions:',
      codeExample: {
        code: 'def calculate_average(numbers):\n    # Preconditions - verify inputs\n    assert len(numbers) > 0, "List cannot be empty"\n    assert all(isinstance(n, (int, float)) for n in numbers), "All items must be numbers"\n    \n    total = sum(numbers)\n    average = total / len(numbers)\n    \n    # Postcondition - verify output\n    assert min(numbers) <= average <= max(numbers), "Average out of range"\n    \n    return average',
        language: 'python',
        highlight: [3, 4, 10],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Add an Assertion',
      instructions: 'Complete the function by adding an assertion that `divisor` is not zero.',
      starterCode: 'def divide(dividend, divisor):\n    # Add assertion here\n    \n    return dividend / divisor\n',
      solutionCode: 'def divide(dividend, divisor):\n    # Add assertion here\n    assert divisor != 0, "Divisor cannot be zero"\n    return dividend / divisor',
      testCases: [
        {
          id: 'test-1',
          description: 'divide(10, 2) should return 5',
          testCode: 'assert divide(10, 2) == 5',
        },
        {
          id: 'test-2',
          description: 'divide(10, 0) should raise AssertionError',
          testCode: 'try:\\n    divide(10, 0)\\n    assert False, "Should have raised AssertionError"\\nexcept AssertionError:\\n    pass',
        },
      ],
      hints: [
        'Use assert divisor != 0',
        'Add a message: "Divisor cannot be zero"',
      ],
      aiHintPrompt: 'The user is learning to use assertions.',
    },
    {
      id: 'step-4-traceback',
      order: 4,
      type: 'instruction',
      title: 'Reading Tracebacks',
      content: '# Understanding Error Messages',
      codeExample: {
        code: '# Example traceback:\n#\n# Traceback (most recent call last):\n#   File "main.py", line 10, in <module>\n#     result = process_data(data)\n#   File "main.py", line 5, in process_data\n#     return calculate(x)\n#   File "utils.py", line 3, in calculate\n#     return 100 / value\n# ZeroDivisionError: division by zero\n#\n# Reading: Bottom to top\n# 1. Error type: ZeroDivisionError\n# 2. Where: utils.py, line 3, in calculate\n# 3. How we got there: process_data called calculate',
        language: 'python',
        highlight: [10, 13, 14, 15],
      },
    },
    {
      id: 'step-5-tips',
      order: 5,
      type: 'instruction',
      title: 'Debugging Tips',
      content: '# Pro Debugging Tips',
      codeExample: {
        code: '# 1. Isolate the problem\ndef debug_issue():\n    # Comment out code to find the problem line\n    step1()  # Works?\n    step2()  # Works?\n    step3()  # Problem here?\n\n# 2. Check types\nprint(type(variable), variable)\n\n# 3. Check edge cases\n# What if list is empty?\n# What if value is None?\n# What if string has spaces?\n\n# 4. Use breakpoint() for interactive debugging\ndef complex_function():\n    x = calculate()\n    breakpoint()  # Pauses here, lets you inspect\n    return process(x)',
        language: 'python',
        highlight: [9, 19],
      },
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'What happens when an assert statement fails?',
      options: [
        {
          id: 'a',
          text: 'Returns False',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Raises AssertionError',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Prints a warning',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Continues silently',
          isCorrect: false,
        },
      ],
      explanation: 'When an assert condition is False, Python raises an AssertionError exception with the optional message.',
    },
  ],
}
