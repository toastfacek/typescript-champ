import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-18-list-operations',
  slug: 'list-operations',
  title: 'List Operations',
  description: 'Learn list concatenation, multiplication, and advanced slicing techniques.',
  order: 18,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-17-list-methods'],
  tags: ['lists', 'operations', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'concatenation',
      term: 'List Concatenation',
      definition: 'Combine two lists using the + operator to create a new list.',
      syntax: 'new_list = list1 + list2',
      example: {
        code: '[1, 2] + [3, 4]  # [1, 2, 3, 4]',
        explanation: 'Creates a new list with all elements from both lists.',
      },
      whyItMatters: 'Concatenation is useful for combining data from multiple sources.',
    },
    {
      id: 'multiplication',
      term: 'List Multiplication',
      definition: 'Repeat a list using the * operator.',
      syntax: 'new_list = list * n',
      example: {
        code: '[0] * 5  # [0, 0, 0, 0, 0]',
        explanation: 'Creates a list with the element repeated n times.',
      },
      whyItMatters: 'Useful for initializing lists with default values.',
    },
    {
      id: 'copying',
      term: 'List Copying',
      definition: 'Create a copy of a list using slicing, copy(), or list().',
      syntax: 'copy = original[:] or original.copy()',
      example: {
        code: 'original = [1, 2, 3]\\ncopy = original[:]',
        explanation: 'Creates a new list with the same values.',
      },
      whyItMatters: 'Understanding copying vs referencing prevents unexpected bugs.',
    },
  ],
  steps: [
    {
      id: 'step-1-concat',
      order: 1,
      type: 'instruction',
      title: 'Concatenating Lists',
      content: `# Combining Lists with +

Use the + operator to join lists:`,
      codeExample: {
        code: `list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Concatenate
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# Original lists unchanged
print(list1)  # [1, 2, 3]

# += to extend in place
list1 += [7, 8]
print(list1)  # [1, 2, 3, 7, 8]`,
        language: 'python',
        highlight: [5, 12],
      },
    },
    {
      id: 'step-2-multiply',
      order: 2,
      type: 'instruction',
      title: 'Repeating Lists',
      content: `# Multiplying Lists with *

Use * to repeat a list:`,
      codeExample: {
        code: `# Repeat an element
zeros = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]

# Repeat a pattern
pattern = [1, 2] * 3
print(pattern)  # [1, 2, 1, 2, 1, 2]

# Initialize a 2D list (careful!)
# WRONG: [[0] * 3] * 3 (shares references!)
# RIGHT:
matrix = [[0] * 3 for _ in range(3)]`,
        language: 'python',
        highlight: [3, 7, 12],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Pattern',
      instructions: `Create a list called \`pattern\` that contains \`[1, 0, 1, 0, 1, 0, 1, 0]\`.

Use list multiplication to create this efficiently.`,
      starterCode: `# Create the pattern [1, 0, 1, 0, 1, 0, 1, 0]
pattern = 
`,
      solutionCode: `# Create the pattern [1, 0, 1, 0, 1, 0, 1, 0]
pattern = [1, 0] * 4`,
      testCases: [
        {
          id: 'test-1',
          description: 'pattern should be [1, 0, 1, 0, 1, 0, 1, 0]',
          testCode: `assert pattern == [1, 0, 1, 0, 1, 0, 1, 0], 'pattern should be [1, 0, 1, 0, 1, 0, 1, 0]'`,
        },
      ],
      hints: [
        'The pattern repeats [1, 0]',
        'Use [1, 0] * 4 to repeat 4 times',
      ],
      aiHintPrompt: 'The user is learning list multiplication.',
    },
    {
      id: 'step-4-copying',
      order: 4,
      type: 'instruction',
      title: 'Copying Lists',
      content: `# Shallow Copy vs Reference

Assigning a list creates a reference, not a copy:`,
      codeExample: {
        code: `original = [1, 2, 3]

# This creates a REFERENCE (not a copy!)
reference = original
reference[0] = 999
print(original)  # [999, 2, 3] - Changed!

# Create a COPY instead
original = [1, 2, 3]
copy1 = original[:]      # Slice copy
copy2 = original.copy()  # copy() method
copy3 = list(original)   # list() constructor

copy1[0] = 999
print(original)  # [1, 2, 3] - Unchanged!`,
        language: 'python',
        highlight: [4, 10, 11, 12],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Safe Copy',
      instructions: `Given \`original = [10, 20, 30]\`:
1. Create a copy called \`backup\` (not a reference!)
2. Change the first element of \`original\` to 999

After this, \`original\` should be \`[999, 20, 30]\` and \`backup\` should still be \`[10, 20, 30]\`.`,
      starterCode: `original = [10, 20, 30]

# Create a backup copy, then modify original

`,
      solutionCode: `original = [10, 20, 30]

# Create a backup copy, then modify original
backup = original.copy()
original[0] = 999`,
      testCases: [
        {
          id: 'test-1',
          description: 'original should be [999, 20, 30]',
          testCode: `assert original == [999, 20, 30], 'original should be [999, 20, 30]'`,
        },
        {
          id: 'test-2',
          description: 'backup should still be [10, 20, 30]',
          testCode: `assert backup == [10, 20, 30], 'backup should still be [10, 20, 30]'`,
        },
      ],
      hints: [
        'Use .copy() or [:] to create a copy',
        'Make the copy BEFORE modifying the original',
      ],
      aiHintPrompt: 'The user is learning the difference between copying and referencing.',
    },
    {
      id: 'step-6-unpacking',
      order: 6,
      type: 'instruction',
      title: 'List Unpacking',
      content: `# Unpacking Lists

Assign list items to multiple variables at once:`,
      codeExample: {
        code: `coords = [10, 20, 30]

# Unpack into variables
x, y, z = coords
print(x)  # 10
print(y)  # 20
print(z)  # 30

# Swap values
a, b = [1, 2]
a, b = b, a  # Now a=2, b=1

# Rest with *
first, *rest = [1, 2, 3, 4, 5]
print(first)  # 1
print(rest)   # [2, 3, 4, 5]`,
        language: 'python',
        highlight: [4, 11, 14],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What happens when you run this code?',
      codeContext: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
      options: [
        {
          id: 'a',
          text: '[1, 2, 3]',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '[1, 2, 3, 4]',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Error',
          isCorrect: false,
        },
        {
          id: 'd',
          text: '[4]',
          isCorrect: false,
        },
      ],
      explanation: 'b = a creates a reference to the same list, not a copy. When you modify b with append(4), you\'re also modifying a because they point to the same list object.',
    },
  ],
}
