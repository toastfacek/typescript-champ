import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-28-raising-errors',
  slug: 'raising-errors',
  title: 'Raising Exceptions',
  description: 'Learn to raise your own exceptions and create custom error types.',
  order: 28,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-27-try-except'],
  tags: ['errors', 'exceptions', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'raise',
      term: 'raise Statement',
      definition: 'The raise keyword throws an exception, stopping normal execution.',
      syntax: 'raise ExceptionType("message")',
      example: {
        code: 'if age < 0:\\n    raise ValueError("Age cannot be negative")',
        explanation: 'Raises ValueError if age is invalid.',
      },
      whyItMatters: 'Raising exceptions lets you signal errors to calling code.',
    },
    {
      id: 'custom-exception',
      term: 'Custom Exceptions',
      definition: 'You can create your own exception classes by inheriting from Exception.',
      syntax: 'class MyError(Exception):\\n    pass',
      example: {
        code: 'class InvalidAgeError(Exception):\\n    pass',
        explanation: 'Creates a custom exception type.',
      },
      whyItMatters: 'Custom exceptions make error handling more specific and meaningful.',
    },
  ],
  steps: [
    {
      id: 'step-1-raise',
      order: 1,
      type: 'instruction',
      title: 'Raising Exceptions',
      content: '# The raise Statement\n\nUse `raise` to throw exceptions:',
      codeExample: {
        code: 'def set_age(age):\n    if age < 0:\n        raise ValueError("Age cannot be negative")\n    if age > 150:\n        raise ValueError("Age is unrealistic")\n    return age\n\n# Usage\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(f"Error: {e}")  # Error: Age cannot be negative',
        language: 'python',
        highlight: [3, 5, 11],
      },
    },
    {
      id: 'step-2-common-exceptions',
      order: 2,
      type: 'instruction',
      title: 'Common Built-in Exceptions',
      content: '# When to Use Which Exception',
      codeExample: {
        code: '# ValueError - wrong value type/content\nif not email.contains("@"):\n    raise ValueError("Invalid email format")\n\n# TypeError - wrong type\nif not isinstance(name, str):\n    raise TypeError("Name must be a string")\n\n# RuntimeError - general runtime error\nif not connected:\n    raise RuntimeError("Database not connected")',
        language: 'python',
        highlight: [3, 7, 11],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Validate Input',
      instructions: 'Complete the function to validate a username:\n- Raise `ValueError` if username is less than 3 characters\n- Return the username if valid',
      starterCode: 'def validate_username(username):\n    # Raise ValueError if too short, return if valid\n    pass\n',
      solutionCode: 'def validate_username(username):\n    # Raise ValueError if too short, return if valid\n    if len(username) < 3:\n        raise ValueError("Username must be at least 3 characters")\n    return username',
      testCases: [
        {
          id: 'test-1',
          description: 'validate_username("alice") should return "alice"',
          testCode: 'assert validate_username("alice") == "alice"',
        },
        {
          id: 'test-2',
          description: 'validate_username("ab") should raise ValueError',
          testCode: 'try:\\n    validate_username("ab")\\n    assert False, "Should have raised ValueError"\\nexcept ValueError:\\n    pass',
        },
      ],
      hints: [
        'Check len(username) < 3',
        'Use raise ValueError("message")',
        'Return username if valid',
      ],
      aiHintPrompt: 'The user is learning to raise exceptions for validation.',
    },
    {
      id: 'step-4-custom',
      order: 4,
      type: 'instruction',
      title: 'Custom Exceptions',
      content: '# Creating Custom Exception Classes',
      codeExample: {
        code: '# Define custom exception\nclass InsufficientFundsError(Exception):\n    """Raised when account balance is too low"""\n    pass\n\nclass Account:\n    def __init__(self, balance):\n        self.balance = balance\n    \n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise InsufficientFundsError(\n                f"Cannot withdraw ${amount}, only ${self.balance} available"\n            )\n        self.balance -= amount\n\n# Usage\naccount = Account(100)\ntry:\n    account.withdraw(150)\nexcept InsufficientFundsError as e:\n    print(f"Transaction failed: {e}")',
        language: 'python',
        highlight: [2, 3, 4, 12, 13, 14],
      },
    },
    {
      id: 'step-5-reraise',
      order: 5,
      type: 'instruction',
      title: 'Re-raising Exceptions',
      content: '# Catching and Re-raising',
      codeExample: {
        code: 'def process_data(data):\n    try:\n        # Do something risky\n        result = risky_operation(data)\n        return result\n    except Exception as e:\n        # Log the error\n        print(f"Error occurred: {e}")\n        # Re-raise to let caller handle it\n        raise\n\n# You can also wrap in a new exception\ntry:\n    process()\nexcept ValueError as e:\n    raise RuntimeError("Processing failed") from e',
        language: 'python',
        highlight: [10, 16],
      },
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'Which exception type is most appropriate for invalid user input?',
      options: [
        {
          id: 'a',
          text: 'TypeError',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'ValueError',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'RuntimeError',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Exception',
          isCorrect: false,
        },
      ],
      explanation: 'ValueError is for when a function receives an argument of the right type but inappropriate value. TypeError is for wrong types.',
    },
  ],
}
