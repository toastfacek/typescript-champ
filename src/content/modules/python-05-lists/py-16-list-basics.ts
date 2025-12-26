import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-16-list-basics',
  slug: 'list-basics',
  title: 'List Basics',
  description: 'Learn to create, access, and modify Python lists.',
  order: 16,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-15-string-formatting'],
  tags: ['lists', 'collections', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'list-definition',
      term: 'List',
      definition: 'A list is an ordered, mutable collection of items. Items can be any type and can be mixed.',
      syntax: 'my_list = [item1, item2, item3]',
      example: {
        code: 'fruits = ["apple", "banana", "cherry"]\\nnumbers = [1, 2, 3, 4, 5]',
        explanation: 'Lists are created with square brackets and comma-separated items.',
      },
      whyItMatters: 'Lists are Python\'s most versatile data structure, used for storing collections of any size.',
    },
    {
      id: 'list-mutability',
      term: 'Mutability',
      definition: 'Lists are mutable - you can change, add, or remove items after creation.',
      syntax: 'list[index] = new_value',
      example: {
        code: 'colors = ["red", "green"]\\ncolors[0] = "blue"  # Now ["blue", "green"]',
        explanation: 'Unlike strings, you can modify list items directly.',
      },
      whyItMatters: 'Mutability makes lists perfect for data that changes over time.',
    },
  ],
  steps: [
    {
      id: 'step-1-creating',
      order: 1,
      type: 'instruction',
      title: 'Creating Lists',
      content: `# Creating Lists in Python

Lists are ordered collections enclosed in square brackets:`,
      codeExample: {
        code: `# Create lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]

# Empty list
empty = []

# List from range
nums = list(range(5))  # [0, 1, 2, 3, 4]

print(fruits)`,
        language: 'python',
        highlight: [2, 3, 4, 10],
      },
    },
    {
      id: 'step-2-accessing',
      order: 2,
      type: 'instruction',
      title: 'Accessing List Items',
      content: `# Indexing and Slicing Lists

Lists use the same indexing and slicing as strings:`,
      codeExample: {
        code: `fruits = ["apple", "banana", "cherry", "date"]

# Indexing
print(fruits[0])    # "apple" (first)
print(fruits[-1])   # "date" (last)

# Slicing
print(fruits[1:3])  # ["banana", "cherry"]
print(fruits[:2])   # ["apple", "banana"]
print(fruits[::2])  # ["apple", "cherry"]

# Length
print(len(fruits))  # 4`,
        language: 'python',
        highlight: [4, 5, 8, 13],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Access List Elements',
      instructions: `Given \`colors = ["red", "green", "blue", "yellow", "purple"]\`:
1. Get the first color, store in \`first\`
2. Get the last color, store in \`last\`
3. Get colors at index 1 through 3, store in \`middle\``,
      starterCode: `colors = ["red", "green", "blue", "yellow", "purple"]

first = 
last = 
middle = 
`,
      solutionCode: `colors = ["red", "green", "blue", "yellow", "purple"]

first = colors[0]
last = colors[-1]
middle = colors[1:4]`,
      testCases: [
        {
          id: 'test-1',
          description: 'first should be "red"',
          testCode: `assert first == "red", 'first should be "red"'`,
        },
        {
          id: 'test-2',
          description: 'last should be "purple"',
          testCode: `assert last == "purple", 'last should be "purple"'`,
        },
        {
          id: 'test-3',
          description: 'middle should be ["green", "blue", "yellow"]',
          testCode: `assert middle == ["green", "blue", "yellow"], 'middle should be ["green", "blue", "yellow"]'`,
        },
      ],
      hints: [
        'First element: colors[0]',
        'Last element: colors[-1]',
        'Slice from 1 to 4: colors[1:4]',
      ],
      aiHintPrompt: 'The user is learning list indexing and slicing.',
    },
    {
      id: 'step-4-modifying',
      order: 4,
      type: 'instruction',
      title: 'Modifying Lists',
      content: `# Changing List Items

Lists are mutable - you can change items directly:`,
      codeExample: {
        code: `fruits = ["apple", "banana", "cherry"]

# Change an item
fruits[0] = "apricot"
print(fruits)  # ["apricot", "banana", "cherry"]

# Change multiple items with slice
fruits[1:3] = ["blueberry", "coconut"]
print(fruits)  # ["apricot", "blueberry", "coconut"]

# Delete an item
del fruits[0]
print(fruits)  # ["blueberry", "coconut"]`,
        language: 'python',
        highlight: [4, 8, 12],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Modify a List',
      instructions: `Given \`numbers = [1, 2, 3, 4, 5]\`:
1. Change the first element to 10
2. Change the last element to 50
3. The list should become \`[10, 2, 3, 4, 50]\``,
      starterCode: `numbers = [1, 2, 3, 4, 5]

# Modify first and last elements

`,
      solutionCode: `numbers = [1, 2, 3, 4, 5]

# Modify first and last elements
numbers[0] = 10
numbers[-1] = 50`,
      testCases: [
        {
          id: 'test-1',
          description: 'numbers should be [10, 2, 3, 4, 50]',
          testCode: `assert numbers == [10, 2, 3, 4, 50], 'numbers should be [10, 2, 3, 4, 50]'`,
        },
      ],
      hints: [
        'Change first: numbers[0] = 10',
        'Change last: numbers[-1] = 50',
      ],
      aiHintPrompt: 'The user is learning to modify list elements.',
    },
    {
      id: 'step-6-checking',
      order: 6,
      type: 'instruction',
      title: 'Checking Lists',
      content: `# Checking Membership and Properties`,
      codeExample: {
        code: `fruits = ["apple", "banana", "cherry"]

# Check if item exists
print("apple" in fruits)      # True
print("grape" in fruits)      # False
print("grape" not in fruits)  # True

# Length
print(len(fruits))  # 3

# Min, Max, Sum (for numbers)
nums = [3, 1, 4, 1, 5]
print(min(nums))  # 1
print(max(nums))  # 5
print(sum(nums))  # 14`,
        language: 'python',
        highlight: [4, 5, 13, 14, 15],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the result of this code?',
      codeContext: `nums = [1, 2, 3, 4, 5]
nums[1:3] = [20, 30, 40]
print(nums)`,
      options: [
        {
          id: 'a',
          text: '[1, 20, 30, 40, 4, 5]',
          isCorrect: true,
        },
        {
          id: 'b',
          text: '[1, 20, 30, 40, 5]',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '[1, [20, 30, 40], 4, 5]',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error',
          isCorrect: false,
        },
      ],
      explanation: 'Slice assignment replaces elements at indices 1 and 2 (value 2 and 3) with the new list [20, 30, 40]. The replacement can be a different size, so we get [1, 20, 30, 40, 4, 5].',
    },
  ],
}
