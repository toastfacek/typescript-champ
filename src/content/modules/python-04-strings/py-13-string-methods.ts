import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-13-string-methods',
  slug: 'string-methods',
  title: 'String Methods',
  description: 'Learn essential string methods for transforming and manipulating text.',
  order: 13,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-12-lambda'],
  tags: ['strings', 'methods', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'string-methods',
      term: 'String Methods',
      definition: 'Methods are functions that belong to objects. String methods transform or analyze text without modifying the original string.',
      syntax: 'string.method()',
      example: {
        code: 'text = "hello"\\nprint(text.upper())  # HELLO\\nprint(text)  # hello (unchanged)',
        explanation: 'Methods return a new string; they don\'t change the original.',
      },
      whyItMatters: 'String methods are essential for cleaning data, validating input, and formatting output.',
    },
    {
      id: 'case-methods',
      term: 'Case Methods',
      definition: 'Methods that change the case of strings: upper(), lower(), title(), capitalize(), swapcase().',
      syntax: 'string.upper() / string.lower()',
      example: {
        code: '"Hello World".upper()  # HELLO WORLD\\n"Hello World".lower()  # hello world',
        explanation: 'Convert between uppercase and lowercase.',
      },
      whyItMatters: 'Case conversion is crucial for comparing strings and formatting display text.',
    },
    {
      id: 'split-join',
      term: 'split() and join()',
      definition: 'split() breaks a string into a list by a delimiter. join() combines a list into a string.',
      syntax: 'string.split(delimiter) / delimiter.join(list)',
      example: {
        code: '"a,b,c".split(",")  # ["a", "b", "c"]\\n"-".join(["a", "b"])  # "a-b"',
        explanation: 'split() breaks apart, join() puts together.',
      },
      whyItMatters: 'These methods are essential for parsing data and building formatted output.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Case Conversion Methods',
      content: `# Changing String Case

Python provides methods to change the case of strings:`,
      codeExample: {
        code: `text = "Hello, World!"

print(text.upper())      # HELLO, WORLD!
print(text.lower())      # hello, world!
print(text.title())      # Hello, World!
print(text.capitalize()) # Hello, world!
print(text.swapcase())   # hELLO, wORLD!`,
        language: 'python',
        highlight: [3, 4, 5],
      },
    },
    {
      id: 'step-2-exercise-1',
      order: 2,
      type: 'code-exercise',
      title: 'Normalize Text Case',
      instructions: `Given a variable \`name = "jOhN sMiTh"\`, convert it to proper title case and store in \`proper_name\`.

Expected result: \`"John Smith"\``,
      starterCode: `name = "jOhN sMiTh"

# Convert to proper title case
proper_name = 
`,
      solutionCode: `name = "jOhN sMiTh"

# Convert to proper title case
proper_name = name.title()`,
      testCases: [
        {
          id: 'test-1',
          description: 'proper_name should be "John Smith"',
          testCode: `assert proper_name == "John Smith", 'proper_name should be "John Smith"'`,
        },
      ],
      hints: [
        'Use the .title() method',
        'title() capitalizes the first letter of each word',
      ],
      aiHintPrompt: 'The user is learning string case methods.',
    },
    {
      id: 'step-3-strip',
      order: 3,
      type: 'instruction',
      title: 'Trimming Whitespace',
      content: `# Removing Whitespace

Use strip methods to remove unwanted spaces:`,
      codeExample: {
        code: `text = "   Hello, World!   "

print(text.strip())   # "Hello, World!" (both sides)
print(text.lstrip())  # "Hello, World!   " (left only)
print(text.rstrip())  # "   Hello, World!" (right only)

# Also works with other characters
"###Hello###".strip("#")  # "Hello"`,
        language: 'python',
        highlight: [3, 8],
      },
    },
    {
      id: 'step-4-split-join',
      order: 4,
      type: 'instruction',
      title: 'Splitting and Joining',
      content: `# split() - Break String into List

Split a string by a delimiter:`,
      codeExample: {
        code: `# Split by comma
data = "apple,banana,cherry"
fruits = data.split(",")
print(fruits)  # ['apple', 'banana', 'cherry']

# Split by space (default)
sentence = "Hello World Python"
words = sentence.split()
print(words)  # ['Hello', 'World', 'Python']

# Join list into string
joined = " - ".join(fruits)
print(joined)  # "apple - banana - cherry"`,
        language: 'python',
        highlight: [3, 9, 13],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Parse and Rejoin Data',
      instructions: `Given a comma-separated string, convert it to a space-separated string:

1. Start with \`data = "red,green,blue"\`
2. Split by comma into a list
3. Join with spaces
4. Store in \`result\`

Expected: \`"red green blue"\``,
      starterCode: `data = "red,green,blue"

# Split and rejoin with spaces
result = 
`,
      solutionCode: `data = "red,green,blue"

# Split and rejoin with spaces
result = " ".join(data.split(","))`,
      testCases: [
        {
          id: 'test-1',
          description: 'result should be "red green blue"',
          testCode: `assert result == "red green blue", 'result should be "red green blue"'`,
        },
      ],
      hints: [
        'First split: data.split(",")',
        'Then join with space: " ".join(list)',
        'Can chain: " ".join(data.split(","))',
      ],
      aiHintPrompt: 'The user is learning split() and join() methods.',
    },
    {
      id: 'step-6-find-replace',
      order: 6,
      type: 'instruction',
      title: 'Finding and Replacing',
      content: `# Search and Replace

Find substrings and replace text:`,
      codeExample: {
        code: `text = "Hello, World!"

# Find substring (returns index or -1)
print(text.find("World"))  # 7
print(text.find("Python")) # -1 (not found)

# Check if contains
print("World" in text)  # True

# Replace
new_text = text.replace("World", "Python")
print(new_text)  # "Hello, Python!"

# Count occurrences
"banana".count("a")  # 3`,
        language: 'python',
        highlight: [4, 11, 14],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does this code produce?',
      codeContext: `text = "hello world"
result = "-".join(text.split())`,
      options: [
        {
          id: 'a',
          text: '"hello world"',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '"hello-world"',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '["hello", "world"]',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error',
          isCorrect: false,
        },
      ],
      explanation: 'split() breaks "hello world" into ["hello", "world"], then join("-") combines them with hyphens to get "hello-world".',
    },
  ],
}
