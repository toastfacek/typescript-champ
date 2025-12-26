import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-23-sets',
  slug: 'sets',
  title: 'Sets',
  description: 'Learn about sets: unordered collections of unique elements.',
  order: 23,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-22-dict-methods'],
  tags: ['sets', 'collections', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'set-definition',
      term: 'Set',
      definition: 'A set is an unordered collection of unique elements. Duplicates are automatically removed.',
      syntax: 'my_set = {1, 2, 3}',
      example: {
        code: 'nums = {1, 2, 2, 3, 3, 3}\\nprint(nums)  # {1, 2, 3}',
        explanation: 'Duplicates are removed automatically.',
      },
      whyItMatters: 'Sets are efficient for removing duplicates and membership testing.',
    },
    {
      id: 'set-operations',
      term: 'Set Operations',
      definition: 'Sets support mathematical operations: union, intersection, difference.',
      syntax: 'set1 | set2 / set1 & set2 / set1 - set2',
      example: {
        code: '{1, 2} | {2, 3}  # {1, 2, 3} union\\n{1, 2} & {2, 3}  # {2} intersection',
        explanation: 'Set operations find common or unique elements.',
      },
      whyItMatters: 'Set operations are powerful for comparing and combining data.',
    },
  ],
  steps: [
    {
      id: 'step-1-creating',
      order: 1,
      type: 'instruction',
      title: 'Creating Sets',
      content: '# Sets in Python\n\nSets store **unique** elements only:',
      codeExample: {
        code: '# Create a set with curly braces\ncolors = {"red", "green", "blue"}\n\n# Duplicates are removed\nnumbers = {1, 2, 2, 3, 3, 3}\nprint(numbers)  # {1, 2, 3}\n\n# Empty set (NOT {} - that\'s a dict!)\nempty = set()\n\n# Set from list (removes duplicates)\nnames = set(["alice", "bob", "alice"])\nprint(names)  # {"alice", "bob"}',
        language: 'python',
        highlight: [5, 6, 9, 12],
      },
    },
    {
      id: 'step-2-operations',
      order: 2,
      type: 'instruction',
      title: 'Adding and Removing',
      content: '# Modifying Sets',
      codeExample: {
        code: 'fruits = {"apple", "banana"}\n\n# Add element\nfruits.add("cherry")\nprint(fruits)  # {"apple", "banana", "cherry"}\n\n# Add multiple elements\nfruits.update(["date", "elderberry"])\n\n# Remove element (error if not found)\nfruits.remove("apple")\n\n# Remove if present (no error)\nfruits.discard("grape")  # No error\n\n# Clear all\nfruits.clear()',
        language: 'python',
        highlight: [4, 8, 11, 14],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Remove Duplicates',
      instructions: 'Given a list with duplicates:\n`numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]`\n\nConvert it to a set to remove duplicates, store in `unique`.',
      starterCode: 'numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\n\n# Remove duplicates\nunique = \n',
      solutionCode: 'numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\n\n# Remove duplicates\nunique = set(numbers)',
      testCases: [
        {
          id: 'test-1',
          description: 'unique should be {1, 2, 3, 4}',
          testCode: 'assert unique == {1, 2, 3, 4}, \'unique should be {1, 2, 3, 4}\'',
        },
      ],
      hints: [
        'Use set() to convert a list to a set',
        'Duplicates are removed automatically',
      ],
      aiHintPrompt: 'The user is learning to use sets to remove duplicates.',
    },
    {
      id: 'step-4-set-ops',
      order: 4,
      type: 'instruction',
      title: 'Set Operations',
      content: '# Mathematical Set Operations',
      codeExample: {
        code: 'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\n# Union: all elements from both\nprint(a | b)  # {1, 2, 3, 4, 5, 6}\nprint(a.union(b))\n\n# Intersection: common elements\nprint(a & b)  # {3, 4}\nprint(a.intersection(b))\n\n# Difference: in a but not in b\nprint(a - b)  # {1, 2}\nprint(a.difference(b))\n\n# Symmetric difference: in a or b, but not both\nprint(a ^ b)  # {1, 2, 5, 6}',
        language: 'python',
        highlight: [5, 9, 13, 17],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Find Common Elements',
      instructions: 'Given two sets:\n`set1 = {1, 2, 3, 4, 5}`\n`set2 = {4, 5, 6, 7, 8}`\n\nFind their intersection (common elements) and store in `common`.',
      starterCode: 'set1 = {1, 2, 3, 4, 5}\nset2 = {4, 5, 6, 7, 8}\n\n# Find common elements\ncommon = \n',
      solutionCode: 'set1 = {1, 2, 3, 4, 5}\nset2 = {4, 5, 6, 7, 8}\n\n# Find common elements\ncommon = set1 & set2',
      testCases: [
        {
          id: 'test-1',
          description: 'common should be {4, 5}',
          testCode: 'assert common == {4, 5}, \'common should be {4, 5}\'',
        },
      ],
      hints: [
        'Use & for intersection',
        'Or use set1.intersection(set2)',
      ],
      aiHintPrompt: 'The user is learning set intersection.',
    },
    {
      id: 'step-6-membership',
      order: 6,
      type: 'instruction',
      title: 'Set Membership and Comparison',
      content: '# Testing Membership\n\nSets have O(1) membership testing - very fast!',
      codeExample: {
        code: 'valid_codes = {"ABC", "DEF", "GHI"}\n\n# Check membership (very fast!)\nif "ABC" in valid_codes:\n    print("Valid code!")\n\n# Subset and superset\na = {1, 2}\nb = {1, 2, 3, 4}\n\nprint(a.issubset(b))    # True - all of a in b\nprint(b.issuperset(a))  # True - b contains all of a\nprint(a < b)            # True - a is proper subset',
        language: 'python',
        highlight: [4, 11, 12, 13],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What is the result of `{1, 2, 3} - {2, 3, 4}`?',
      options: [
        {
          id: 'a',
          text: '{1}',
          isCorrect: true,
        },
        {
          id: 'b',
          text: '{4}',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '{1, 4}',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '{2, 3}',
          isCorrect: false,
        },
      ],
      explanation: 'Set difference (a - b) returns elements in a that are NOT in b. Only 1 is in {1, 2, 3} but not in {2, 3, 4}.',
    },
  ],
}
