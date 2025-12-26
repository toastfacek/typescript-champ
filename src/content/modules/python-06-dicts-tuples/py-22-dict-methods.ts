import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-22-dict-methods',
  slug: 'dict-methods',
  title: 'Dictionary Methods',
  description: 'Master dictionary methods for iterating, merging, and manipulating data.',
  order: 22,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-21-dict-basics'],
  tags: ['dictionaries', 'methods', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'dict-views',
      term: 'Dictionary Views',
      definition: 'keys(), values(), and items() return view objects for iterating over dictionaries.',
      syntax: 'dict.keys() / dict.values() / dict.items()',
      example: {
        code: 'd = {"a": 1, "b": 2}\\nfor k, v in d.items():\\n    print(k, v)',
        explanation: 'items() returns key-value pairs for easy iteration.',
      },
      whyItMatters: 'Dictionary views are essential for looping through and processing dictionary data.',
    },
    {
      id: 'dict-update',
      term: 'update() Method',
      definition: 'Merge another dictionary into the current one, overwriting existing keys.',
      syntax: 'dict1.update(dict2)',
      example: {
        code: 'd = {"a": 1}\\nd.update({"b": 2})\\n# d is now {"a": 1, "b": 2}',
        explanation: 'update() adds new keys and overwrites existing ones.',
      },
      whyItMatters: 'update() is useful for merging configuration or combining data.',
    },
  ],
  steps: [
    {
      id: 'step-1-iterating',
      order: 1,
      type: 'instruction',
      title: 'Iterating Over Dictionaries',
      content: '# Looping Through Dictionaries',
      codeExample: {
        code: 'person = {"name": "Alice", "age": 30, "city": "NYC"}\n\n# Loop through keys (default)\nfor key in person:\n    print(key)\n\n# Loop through values\nfor value in person.values():\n    print(value)\n\n# Loop through key-value pairs\nfor key, value in person.items():\n    print(f"{key}: {value}")',
        language: 'python',
        highlight: [4, 8, 12],
      },
    },
    {
      id: 'step-2-views',
      order: 2,
      type: 'instruction',
      title: 'Keys, Values, and Items',
      content: '# Dictionary View Objects',
      codeExample: {
        code: 'scores = {"math": 90, "english": 85, "science": 95}\n\n# Get all keys\nkeys = list(scores.keys())\nprint(keys)  # ["math", "english", "science"]\n\n# Get all values\nvalues = list(scores.values())\nprint(values)  # [90, 85, 95]\n\n# Get key-value tuples\nitems = list(scores.items())\nprint(items)  # [("math", 90), ("english", 85), ("science", 95)]',
        language: 'python',
        highlight: [4, 8, 12],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Sum Dictionary Values',
      instructions: 'Given `prices = {"apple": 1.50, "banana": 0.75, "orange": 2.00}`, calculate the total price of all items.\n\nStore the result in `total`.',
      starterCode: 'prices = {"apple": 1.50, "banana": 0.75, "orange": 2.00}\n\n# Calculate total\ntotal = 0\n',
      solutionCode: 'prices = {"apple": 1.50, "banana": 0.75, "orange": 2.00}\n\n# Calculate total\ntotal = 0\nfor price in prices.values():\n    total += price',
      testCases: [
        {
          id: 'test-1',
          description: 'total should be 4.25',
          testCode: 'assert total == 4.25, \'total should be 4.25\'',
        },
      ],
      hints: [
        'Use prices.values() to get all prices',
        'Loop through and add each to total',
        'Or use sum(prices.values())',
      ],
      aiHintPrompt: 'The user is learning to iterate over dictionary values.',
    },
    {
      id: 'step-4-update-merge',
      order: 4,
      type: 'instruction',
      title: 'Updating and Merging',
      content: '# Combining Dictionaries',
      codeExample: {
        code: 'defaults = {"theme": "light", "font_size": 12}\nuser_prefs = {"theme": "dark"}\n\n# update() modifies in place\ndefaults.update(user_prefs)\nprint(defaults)  # {"theme": "dark", "font_size": 12}\n\n# Merge with | operator (Python 3.9+)\na = {"x": 1}\nb = {"y": 2}\nmerged = a | b\nprint(merged)  # {"x": 1, "y": 2}\n\n# Unpack with **\ncombined = {**a, **b}\nprint(combined)  # {"x": 1, "y": 2}',
        language: 'python',
        highlight: [5, 11, 15],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Merge Dictionaries',
      instructions: 'Merge `dict1 = {"a": 1, "b": 2}` with `dict2 = {"c": 3, "d": 4}` into a new dictionary called `merged`.\n\nUse the `{**dict1, **dict2}` syntax.',
      starterCode: 'dict1 = {"a": 1, "b": 2}\ndict2 = {"c": 3, "d": 4}\n\n# Merge into new dictionary\nmerged = \n',
      solutionCode: 'dict1 = {"a": 1, "b": 2}\ndict2 = {"c": 3, "d": 4}\n\n# Merge into new dictionary\nmerged = {**dict1, **dict2}',
      testCases: [
        {
          id: 'test-1',
          description: 'merged should contain all keys',
          testCode: 'assert merged == {"a": 1, "b": 2, "c": 3, "d": 4}',
        },
      ],
      hints: [
        'Use {**dict1, **dict2}',
        'The ** operator unpacks dictionary contents',
      ],
      aiHintPrompt: 'The user is learning to merge dictionaries.',
    },
    {
      id: 'step-6-comprehension',
      order: 6,
      type: 'instruction',
      title: 'Dictionary Comprehensions',
      content: '# Creating Dictionaries with Comprehensions',
      codeExample: {
        code: '# Create dict from list\nnumbers = [1, 2, 3, 4, 5]\nsquares = {n: n**2 for n in numbers}\nprint(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n\n# Filter with condition\neven_squares = {n: n**2 for n in numbers if n % 2 == 0}\nprint(even_squares)  # {2: 4, 4: 16}\n\n# Transform existing dict\nnames = {"alice": 1, "bob": 2}\nupper = {k.upper(): v for k, v in names.items()}\nprint(upper)  # {"ALICE": 1, "BOB": 2}',
        language: 'python',
        highlight: [3, 7, 12],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `d.items()` return?',
      codeContext: 'd = {"a": 1, "b": 2}',
      options: [
        {
          id: 'a',
          text: '["a", "b"]',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '[1, 2]',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '[("a", 1), ("b", 2)]',
          isCorrect: true,
        },
        {
          id: 'd',
          text: '{"a": 1, "b": 2}',
          isCorrect: false,
        },
      ],
      explanation: 'items() returns a view of key-value pairs as tuples: [("a", 1), ("b", 2)].',
    },
  ],
}
