import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-07-for-loops',
  slug: 'for-loops',
  title: 'For Loops',
  description: 'Learn how to iterate over sequences with for loops, range(), and enumerate().',
  order: 7,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-06-while-loops'],
  tags: ['control-flow', 'loops', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'for-loop',
      term: 'for Loop',
      definition: 'A for loop iterates over items in a sequence (like a list, string, or range). It\'s cleaner than while loops when you know what you\'re iterating over.',
      syntax: 'for item in sequence:\\n    # code',
      example: {
        code: 'for letter in "Python":\\n    print(letter)',
        explanation: 'Prints each letter of "Python" on a new line.',
      },
      whyItMatters: 'For loops are the most common way to process collections of items in Python.',
    },
    {
      id: 'range-function',
      term: 'range() Function',
      definition: 'range() generates a sequence of numbers. range(n) gives 0 to n-1, range(start, stop) gives start to stop-1, range(start, stop, step) adds a step.',
      syntax: 'range(stop) or range(start, stop) or range(start, stop, step)',
      example: {
        code: 'for i in range(5):\\n    print(i)  # 0, 1, 2, 3, 4',
        explanation: 'range(5) generates numbers 0 through 4.',
      },
      whyItMatters: 'range() is essential for loops that need to run a specific number of times.',
    },
    {
      id: 'enumerate-function',
      term: 'enumerate() Function',
      definition: 'enumerate() returns both the index and the value when looping over a sequence.',
      syntax: 'for index, value in enumerate(sequence):',
      example: {
        code: 'fruits = ["apple", "banana"]\\nfor i, fruit in enumerate(fruits):\\n    print(f"{i}: {fruit}")',
        explanation: 'Prints "0: apple" and "1: banana".',
      },
      whyItMatters: 'enumerate() is cleaner than manually tracking an index counter.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'The for Loop',
      content: `# Iterating with for

The **for** loop iterates over each item in a sequence. It's simpler than while loops when you're processing a collection.`,
      codeExample: {
        code: `# Loop through a list
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(f"I love {fruit}!")

# Loop through a string
for char in "Hi!":
    print(char)`,
        language: 'python',
        highlight: [4, 5, 8, 9],
      },
    },
    {
      id: 'step-2-range',
      order: 2,
      type: 'instruction',
      title: 'Using range()',
      content: `# The range() Function

Use **range()** to generate a sequence of numbers:

- \`range(5)\` → 0, 1, 2, 3, 4
- \`range(2, 6)\` → 2, 3, 4, 5
- \`range(0, 10, 2)\` → 0, 2, 4, 6, 8`,
      codeExample: {
        code: `# Basic range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Range with start and stop
for i in range(1, 4):
    print(i)  # 1, 2, 3

# Range with step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8`,
        language: 'python',
        highlight: [2, 6, 10],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Sum Numbers with for',
      instructions: `Calculate the sum of numbers from 1 to 10:
1. Set \`total = 0\`
2. Use a for loop with \`range(1, 11)\` to include 1-10
3. Add each number to total`,
      starterCode: `# Sum numbers 1 to 10
total = 0

`,
      solutionCode: `# Sum numbers 1 to 10
total = 0

for num in range(1, 11):
    total += num`,
      testCases: [
        {
          id: 'test-1',
          description: 'total should equal 55',
          testCode: `assert total == 55, 'total should be 55 (1+2+3+...+10)'`,
        },
      ],
      hints: [
        'range(1, 11) gives numbers 1 through 10',
        'Use `total += num` to add each number',
        'The sum of 1 to 10 is 55',
      ],
      aiHintPrompt: 'The user is learning to use for loops with range().',
    },
    {
      id: 'step-4-enumerate',
      order: 4,
      type: 'instruction',
      title: 'Getting Index with enumerate()',
      content: `# The enumerate() Function

Need both the index and value? Use **enumerate()**!`,
      codeExample: {
        code: `colors = ["red", "green", "blue"]

# Without enumerate (manual index)
i = 0
for color in colors:
    print(f"{i}: {color}")
    i += 1

# With enumerate (cleaner!)
for i, color in enumerate(colors):
    print(f"{i}: {color}")`,
        language: 'python',
        highlight: [10, 11],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Find Index of Item',
      instructions: `Find the index of "python" in the languages list:
1. Set \`languages = ["java", "javascript", "python", "ruby"]\`
2. Use enumerate() to loop through with indices
3. When you find "python", store its index in \`found_index\``,
      starterCode: `# Find the index of "python"
languages = ["java", "javascript", "python", "ruby"]
found_index = -1

`,
      solutionCode: `# Find the index of "python"
languages = ["java", "javascript", "python", "ruby"]
found_index = -1

for i, lang in enumerate(languages):
    if lang == "python":
        found_index = i
        break`,
      testCases: [
        {
          id: 'test-1',
          description: 'found_index should be 2',
          testCode: `assert found_index == 2, 'found_index should be 2'`,
        },
      ],
      hints: [
        'Use `for i, lang in enumerate(languages):`',
        'Check if `lang == "python"`',
        'You can use break after finding it',
      ],
      aiHintPrompt: 'The user is learning enumerate() to get indices while looping.',
    },
    {
      id: 'step-6-nested',
      order: 6,
      type: 'instruction',
      title: 'Nested for Loops',
      content: `# Loops Inside Loops

You can nest for loops to process multi-dimensional data:`,
      codeExample: {
        code: `# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    print("---")

# Output:
# 1 x 1 = 1
# 1 x 2 = 2
# 1 x 3 = 3
# ---
# 2 x 1 = 2
# ...`,
        language: 'python',
        highlight: [2, 3, 4],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `for i in range(2, 6, 2):
    print(i)`,
      options: [
        {
          id: 'a',
          text: '2 3 4 5',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '2 4',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '2 4 6',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '0 2 4',
          isCorrect: false,
        },
      ],
      explanation: 'range(2, 6, 2) starts at 2, stops before 6, and steps by 2. So it generates 2 and 4. It doesn\'t include 6 because range stops before the end value.',
    },
  ],
}
