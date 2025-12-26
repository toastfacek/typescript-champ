import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-14-string-slicing',
  slug: 'string-slicing',
  title: 'String Slicing',
  description: 'Learn to extract parts of strings using indexing and slicing.',
  order: 14,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-13-string-methods'],
  tags: ['strings', 'slicing', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'string-indexing',
      term: 'String Indexing',
      definition: 'Access individual characters using their position (index). Python uses 0-based indexing.',
      syntax: 'string[index]',
      example: {
        code: 'text = "Python"\\ntext[0]  # "P"\\ntext[5]  # "n"',
        explanation: 'Index 0 is the first character, index 5 is the sixth.',
      },
      whyItMatters: 'Indexing lets you access specific characters for validation, parsing, and manipulation.',
    },
    {
      id: 'negative-indexing',
      term: 'Negative Indexing',
      definition: 'Access characters from the end using negative indices. -1 is the last character.',
      syntax: 'string[-1]',
      example: {
        code: 'text = "Python"\\ntext[-1]  # "n"\\ntext[-2]  # "o"',
        explanation: '-1 is last, -2 is second to last, etc.',
      },
      whyItMatters: 'Negative indexing is convenient when you need to access the end of a string.',
    },
    {
      id: 'slicing',
      term: 'Slicing',
      definition: 'Extract a portion of a string using start:stop:step notation.',
      syntax: 'string[start:stop:step]',
      example: {
        code: 'text = "Python"\\ntext[0:3]  # "Pyt"\\ntext[::2]  # "Pto"',
        explanation: 'start:stop gets characters from start up to (not including) stop.',
      },
      whyItMatters: 'Slicing is powerful for extracting substrings, reversing, and sampling.',
    },
  ],
  steps: [
    {
      id: 'step-1-indexing',
      order: 1,
      type: 'instruction',
      title: 'String Indexing',
      content: `# Accessing Characters by Index

Strings are sequences of characters. Access each character by its position (index):`,
      codeExample: {
        code: `text = "Python"
#       012345  (indices)

print(text[0])  # P (first character)
print(text[1])  # y
print(text[5])  # n (last character)

# Strings are immutable - can't change characters
# text[0] = "J"  # This would cause an error!`,
        language: 'python',
        highlight: [4, 5, 6],
      },
    },
    {
      id: 'step-2-negative',
      order: 2,
      type: 'instruction',
      title: 'Negative Indexing',
      content: `# Counting from the End

Use negative indices to count backwards from the end:`,
      codeExample: {
        code: `text = "Python"
#      -6-5-4-3-2-1  (negative indices)

print(text[-1])  # n (last character)
print(text[-2])  # o (second to last)
print(text[-6])  # P (same as text[0])`,
        language: 'python',
        highlight: [4, 5],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Get First and Last',
      instructions: `Given \`word = "programming"\`:
1. Get the first character, store in \`first\`
2. Get the last character, store in \`last\``,
      starterCode: `word = "programming"

# Get first and last characters
first = 
last = 
`,
      solutionCode: `word = "programming"

# Get first and last characters
first = word[0]
last = word[-1]`,
      testCases: [
        {
          id: 'test-1',
          description: 'first should be "p"',
          testCode: `assert first == "p", 'first should be "p"'`,
        },
        {
          id: 'test-2',
          description: 'last should be "g"',
          testCode: `assert last == "g", 'last should be "g"'`,
        },
      ],
      hints: [
        'First character: word[0]',
        'Last character: word[-1]',
      ],
      aiHintPrompt: 'The user is learning string indexing.',
    },
    {
      id: 'step-4-slicing',
      order: 4,
      type: 'instruction',
      title: 'Basic Slicing',
      content: `# Extracting Substrings with Slicing

Use \`[start:stop]\` to get a range of characters:`,
      codeExample: {
        code: `text = "Hello, World!"
#       0123456789...

# Get characters from index 0 to 4 (not including 5)
print(text[0:5])   # "Hello"

# Get characters from index 7 to 11
print(text[7:12])  # "World"

# Omit start = start from beginning
print(text[:5])    # "Hello"

# Omit stop = go to end
print(text[7:])    # "World!"`,
        language: 'python',
        highlight: [5, 8, 11, 14],
      },
    },
    {
      id: 'step-5-step',
      order: 5,
      type: 'instruction',
      title: 'Slicing with Step',
      content: `# Adding a Step

Use \`[start:stop:step]\` to skip characters:`,
      codeExample: {
        code: `text = "Python"

# Every other character
print(text[::2])   # "Pto"

# Every other, starting at index 1
print(text[1::2])  # "yhn"

# Reverse a string (step = -1)
print(text[::-1])  # "nohtyP"

# Reverse and take every 2nd
print(text[::-2])  # "nhy"`,
        language: 'python',
        highlight: [4, 10],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Reverse a String',
      instructions: `Given \`text = "hello"\`, reverse it and store in \`reversed_text\`.

Expected: \`"olleh"\``,
      starterCode: `text = "hello"

# Reverse the string
reversed_text = 
`,
      solutionCode: `text = "hello"

# Reverse the string
reversed_text = text[::-1]`,
      testCases: [
        {
          id: 'test-1',
          description: 'reversed_text should be "olleh"',
          testCode: `assert reversed_text == "olleh", 'reversed_text should be "olleh"'`,
        },
      ],
      hints: [
        'Use slicing with a negative step',
        'The syntax is: text[::-1]',
        '[::-1] means start to end, stepping backwards',
      ],
      aiHintPrompt: 'The user is learning to reverse strings with slicing.',
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `"Python"[1:4]` return?',
      options: [
        {
          id: 'a',
          text: '"Pyt"',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '"yth"',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '"ytho"',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '"hon"',
          isCorrect: false,
        },
      ],
      explanation: 'Slicing [1:4] gets characters at indices 1, 2, and 3 (not including 4). "Python"[1] is "y", [2] is "t", [3] is "h", so the result is "yth".',
    },
  ],
}
