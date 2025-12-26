import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-27-try-except',
  slug: 'try-except',
  title: 'Try/Except Basics',
  description: 'Learn to handle errors gracefully using try/except blocks.',
  order: 27,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-26-file-paths'],
  tags: ['errors', 'exceptions', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'exception',
      term: 'Exception',
      definition: 'An error that occurs during program execution. Unhandled exceptions crash the program.',
      syntax: 'raise ValueError("message")',
      example: {
        code: 'int("abc")  # Raises ValueError',
        explanation: 'Converting "abc" to int fails and raises an exception.',
      },
      whyItMatters: 'Understanding exceptions is essential for writing robust programs that handle errors.',
    },
    {
      id: 'try-except',
      term: 'try/except Block',
      definition: 'Catches and handles exceptions, preventing program crashes.',
      syntax: 'try:\\n    # risky code\\nexcept Error:\\n    # handle error',
      example: {
        code: 'try:\\n    x = int("abc")\\nexcept ValueError:\\n    print("Invalid input!")',
        explanation: 'The except block runs when ValueError occurs.',
      },
      whyItMatters: 'Error handling makes your programs resilient and user-friendly.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Exceptions in Python',
      content: '# What Are Exceptions?\n\nExceptions are errors that occur during execution:',
      codeExample: {
        code: '# Common exceptions\nint("abc")        # ValueError: invalid literal\n1 / 0             # ZeroDivisionError\nmy_list[100]      # IndexError: list index out of range\nmy_dict["nope"]   # KeyError\nopen("fake.txt")  # FileNotFoundError',
        language: 'python',
        highlight: [2, 3, 4, 5, 6],
      },
    },
    {
      id: 'step-2-basic-try',
      order: 2,
      type: 'instruction',
      title: 'Basic try/except',
      content: '# Catching Exceptions\n\nUse try/except to handle errors:',
      codeExample: {
        code: '# Without error handling - crashes!\n# result = int("abc")\n\n# With error handling - graceful!\ntry:\n    result = int("abc")\nexcept ValueError:\n    print("Please enter a valid number")\n    result = 0\n\nprint(f"Result: {result}")  # Result: 0',
        language: 'python',
        highlight: [5, 6, 7, 8, 9],
      },
    },
    {
      id: 'step-3-multiple',
      order: 3,
      type: 'instruction',
      title: 'Multiple Exception Types',
      content: '# Handling Different Errors',
      codeExample: {
        code: 'def divide(a, b):\n    try:\n        result = a / b\n        return result\n    except ZeroDivisionError:\n        print("Cannot divide by zero!")\n        return None\n    except TypeError:\n        print("Please provide numbers!")\n        return None\n\n# Or catch multiple at once\ntry:\n    x = int(input("Enter a number: "))\nexcept (ValueError, EOFError):\n    print("Invalid input")',
        language: 'python',
        highlight: [5, 6, 8, 9, 15],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Handle Division Error',
      instructions: 'Complete the function to safely divide two numbers. Return `None` if division by zero occurs.',
      starterCode: 'def safe_divide(a, b):\n    # Return a / b, or None if b is zero\n    pass\n\n# Test\nresult = safe_divide(10, 0)\n',
      solutionCode: 'def safe_divide(a, b):\n    # Return a / b, or None if b is zero\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\n# Test\nresult = safe_divide(10, 0)',
      testCases: [
        {
          id: 'test-1',
          description: 'safe_divide(10, 2) should return 5',
          testCode: 'assert safe_divide(10, 2) == 5, \'safe_divide(10, 2) should return 5\'',
        },
        {
          id: 'test-2',
          description: 'safe_divide(10, 0) should return None',
          testCode: 'assert safe_divide(10, 0) is None, \'safe_divide(10, 0) should return None\'',
        },
      ],
      hints: [
        'Use try: return a / b',
        'Catch ZeroDivisionError',
        'Return None in the except block',
      ],
      aiHintPrompt: 'The user is learning try/except for error handling.',
    },
    {
      id: 'step-5-else-finally',
      order: 5,
      type: 'instruction',
      title: 'else and finally',
      content: '# Complete Error Handling',
      codeExample: {
        code: 'try:\n    file = open("data.txt")\nexcept FileNotFoundError:\n    print("File not found!")\nelse:\n    # Runs only if no exception occurred\n    content = file.read()\n    file.close()\n    print("File read successfully!")\nfinally:\n    # Always runs, exception or not\n    print("Cleanup complete")',
        language: 'python',
        highlight: [5, 6, 7, 10, 11],
      },
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'When does the `else` block run in a try/except/else statement?',
      options: [
        {
          id: 'a',
          text: 'Always, after try',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Only when an exception occurs',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'Only when NO exception occurs',
          isCorrect: true,
        },
        {
          id: 'd',
          text: 'Before the finally block',
          isCorrect: false,
        },
      ],
      explanation: 'The else block only runs if the try block completes without raising an exception. It\'s useful for code that should only run on success.',
    },
  ],
}
