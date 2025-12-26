import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-17-list-methods',
  slug: 'list-methods',
  title: 'List Methods',
  description: 'Master essential list methods: append, extend, insert, remove, and more.',
  order: 17,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-16-list-basics'],
  tags: ['lists', 'methods', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'append-method',
      term: 'append()',
      definition: 'Adds a single item to the end of the list.',
      syntax: 'list.append(item)',
      example: {
        code: 'fruits = ["apple"]\\nfruits.append("banana")\\n# ["apple", "banana"]',
        explanation: 'Adds "banana" to the end of the list.',
      },
      whyItMatters: 'append() is the most common way to add items to a list.',
    },
    {
      id: 'pop-method',
      term: 'pop()',
      definition: 'Removes and returns an item at a given index (default: last item).',
      syntax: 'list.pop(index)',
      example: {
        code: 'nums = [1, 2, 3]\\nlast = nums.pop()  # returns 3\\n# nums is now [1, 2]',
        explanation: 'Removes the last item and returns it.',
      },
      whyItMatters: 'pop() is useful when you need the removed value, like implementing a stack.',
    },
    {
      id: 'sort-method',
      term: 'sort()',
      definition: 'Sorts the list in place. Use sorted() to get a new sorted list.',
      syntax: 'list.sort() / sorted(list)',
      example: {
        code: 'nums = [3, 1, 2]\\nnums.sort()\\n# nums is now [1, 2, 3]',
        explanation: 'sort() modifies the original list.',
      },
      whyItMatters: 'Sorting is essential for organizing and searching data efficiently.',
    },
  ],
  steps: [
    {
      id: 'step-1-adding',
      order: 1,
      type: 'instruction',
      title: 'Adding Items',
      content: `# Methods to Add Items

Python lists have several ways to add items:`,
      codeExample: {
        code: `fruits = ["apple"]

# append() - add one item to end
fruits.append("banana")
print(fruits)  # ["apple", "banana"]

# extend() - add multiple items
fruits.extend(["cherry", "date"])
print(fruits)  # ["apple", "banana", "cherry", "date"]

# insert() - add at specific position
fruits.insert(1, "apricot")
print(fruits)  # ["apple", "apricot", "banana", "cherry", "date"]`,
        language: 'python',
        highlight: [4, 8, 12],
      },
    },
    {
      id: 'step-2-exercise-1',
      order: 2,
      type: 'code-exercise',
      title: 'Build a List',
      instructions: `Start with an empty list \`items = []\`, then:
1. Append "first"
2. Append "second"
3. Insert "zero" at the beginning (index 0)

Result should be \`["zero", "first", "second"]\``,
      starterCode: `items = []

# Build the list

`,
      solutionCode: `items = []

# Build the list
items.append("first")
items.append("second")
items.insert(0, "zero")`,
      testCases: [
        {
          id: 'test-1',
          description: 'items should be ["zero", "first", "second"]',
          testCode: `assert items == ["zero", "first", "second"], 'items should be ["zero", "first", "second"]'`,
        },
      ],
      hints: [
        'Use append() to add to the end',
        'Use insert(0, item) to add at the beginning',
      ],
      aiHintPrompt: 'The user is learning append() and insert() methods.',
    },
    {
      id: 'step-3-removing',
      order: 3,
      type: 'instruction',
      title: 'Removing Items',
      content: `# Methods to Remove Items`,
      codeExample: {
        code: `fruits = ["apple", "banana", "cherry", "banana"]

# remove() - remove first occurrence of value
fruits.remove("banana")
print(fruits)  # ["apple", "cherry", "banana"]

# pop() - remove and return by index (default: last)
last = fruits.pop()
print(last)    # "banana"
print(fruits)  # ["apple", "cherry"]

first = fruits.pop(0)
print(first)   # "apple"

# clear() - remove all items
fruits.clear()
print(fruits)  # []`,
        language: 'python',
        highlight: [4, 8, 12, 16],
      },
    },
    {
      id: 'step-4-exercise-2',
      order: 4,
      type: 'code-exercise',
      title: 'Remove from List',
      instructions: `Given \`numbers = [1, 2, 3, 4, 5]\`:
1. Remove the value 3 using .remove()
2. Pop the last item and store it in \`last\`

After this, \`numbers\` should be \`[1, 2, 4]\` and \`last\` should be \`5\``,
      starterCode: `numbers = [1, 2, 3, 4, 5]

# Remove 3 and pop last

`,
      solutionCode: `numbers = [1, 2, 3, 4, 5]

# Remove 3 and pop last
numbers.remove(3)
last = numbers.pop()`,
      testCases: [
        {
          id: 'test-1',
          description: 'numbers should be [1, 2, 4]',
          testCode: `assert numbers == [1, 2, 4], 'numbers should be [1, 2, 4]'`,
        },
        {
          id: 'test-2',
          description: 'last should be 5',
          testCode: `assert last == 5, 'last should be 5'`,
        },
      ],
      hints: [
        'Use remove(3) to remove the value 3',
        'Use pop() without arguments to remove and return last item',
      ],
      aiHintPrompt: 'The user is learning remove() and pop() methods.',
    },
    {
      id: 'step-5-finding',
      order: 5,
      type: 'instruction',
      title: 'Finding and Counting',
      content: `# Searching in Lists`,
      codeExample: {
        code: `letters = ["a", "b", "c", "b", "d", "b"]

# index() - find position of first occurrence
pos = letters.index("b")
print(pos)  # 1

# count() - count occurrences
times = letters.count("b")
print(times)  # 3

# index with start position
pos2 = letters.index("b", 2)  # start searching at index 2
print(pos2)  # 3`,
        language: 'python',
        highlight: [4, 8, 12],
      },
    },
    {
      id: 'step-6-sorting',
      order: 6,
      type: 'instruction',
      title: 'Sorting and Reversing',
      content: `# Ordering Lists`,
      codeExample: {
        code: `nums = [3, 1, 4, 1, 5, 9, 2]

# sort() - sorts in place (modifies original)
nums.sort()
print(nums)  # [1, 1, 2, 3, 4, 5, 9]

# sort descending
nums.sort(reverse=True)
print(nums)  # [9, 5, 4, 3, 2, 1, 1]

# sorted() - returns NEW sorted list (original unchanged)
original = [3, 1, 2]
new_sorted = sorted(original)
print(original)    # [3, 1, 2] (unchanged)
print(new_sorted)  # [1, 2, 3]

# reverse() - reverse in place
nums.reverse()`,
        language: 'python',
        highlight: [4, 8, 13, 14],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the difference between `list.sort()` and `sorted(list)`?',
      options: [
        {
          id: 'a',
          text: 'sort() returns a new list, sorted() modifies in place',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'sort() modifies in place, sorted() returns a new list',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'They are exactly the same',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'sorted() only works on strings',
          isCorrect: false,
        },
      ],
      explanation: 'list.sort() modifies the original list and returns None. sorted(list) leaves the original unchanged and returns a new sorted list.',
    },
  ],
}
