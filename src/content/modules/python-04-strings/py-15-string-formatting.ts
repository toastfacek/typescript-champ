import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-15-string-formatting',
  slug: 'string-formatting',
  title: 'Advanced String Formatting',
  description: 'Master Python string formatting with format specs and alignment.',
  order: 15,
  estimatedMinutes: 10,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-14-string-slicing'],
  tags: ['strings', 'formatting', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'format-specs',
      term: 'Format Specifications',
      definition: 'Format specs control how values are displayed: width, alignment, precision, and type.',
      syntax: 'f"{value:format_spec}"',
      example: {
        code: 'f"{3.14159:.2f}"  # "3.14"\\nf"{42:05d}"  # "00042"',
        explanation: '.2f means 2 decimal places, 05d means 5 digits with zero padding.',
      },
      whyItMatters: 'Format specs let you create professional, consistent output for reports and displays.',
    },
    {
      id: 'alignment',
      term: 'Alignment',
      definition: 'Control how text is positioned within a width: < (left), > (right), ^ (center).',
      syntax: 'f"{value:<10}" / f"{value:>10}" / f"{value:^10}"',
      example: {
        code: 'f"{"Hi":>10}"  # "        Hi"\\nf"{"Hi":<10}"  # "Hi        "',
        explanation: '> right-aligns, < left-aligns, ^ centers.',
      },
      whyItMatters: 'Alignment is essential for creating aligned columns in text output.',
    },
  ],
  steps: [
    {
      id: 'step-1-recap',
      order: 1,
      type: 'instruction',
      title: 'F-string Recap',
      content: '# Quick F-string Review\n\nWe learned f-strings earlier. Now let\'s explore advanced formatting:',
      codeExample: {
        code: 'name = "Alice"\nage = 25\nbalance = 1234.5678\n\n# Basic f-string\nprint(f"Name: {name}, Age: {age}")\n\n# With expressions\nprint(f"Next year: {age + 1}")\n\n# With format specs (coming up!)\nprint(f"Balance: ${balance:.2f}")',
        language: 'python',
        highlight: [11],
      },
    },
    {
      id: 'step-2-number-formatting',
      order: 2,
      type: 'instruction',
      title: 'Formatting Numbers',
      content: '# Number Format Specifications\n\nControl how numbers are displayed:',
      codeExample: {
        code: 'price = 19.99\nbig_num = 1234567\n\n# Fixed decimal places\nprint(f"Price: ${price:.2f}")      # $19.99\nprint(f"Exact: {3.14159:.4f}")     # 3.1416\n\n# Thousands separator\nprint(f"Big: {big_num:,}")          # 1,234,567\n\n# Percentage\nratio = 0.856\nprint(f"Rate: {ratio:.1%}")         # 85.6%\n\n# Zero padding\nprint(f"ID: {42:05d}")              # 00042',
        language: 'python',
        highlight: [5, 9, 13, 16],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Format Currency',
      instructions: 'Given `amount = 1234567.891`, format it as currency with:\n- Dollar sign prefix\n- Comma separators\n- 2 decimal places\n\nStore in `formatted`. Expected: `"$1,234,567.89"`',
      starterCode: 'amount = 1234567.891\n\n# Format as currency\nformatted = \n',
      solutionCode: 'amount = 1234567.891\n\n# Format as currency\nformatted = f"${amount:,.2f}"',
      testCases: [
        {
          id: 'test-1',
          description: 'formatted should be "$1,234,567.89"',
          testCode: 'assert formatted == "$1,234,567.89", \'formatted should be "$1,234,567.89"\'',
        },
      ],
      hints: [
        'Use f-string with format spec',
        'Comma adds separators: :,',
        'Combine: ,.2f for comma + 2 decimals',
      ],
      aiHintPrompt: 'The user is learning number formatting with f-strings.',
    },
    {
      id: 'step-4-alignment',
      order: 4,
      type: 'instruction',
      title: 'Text Alignment and Width',
      content: '# Alignment and Padding\n\nControl text position within a fixed width:',
      codeExample: {
        code: 'name = "Alice"\n\n# Left align (default for strings)\nprint(f"|{name:<10}|")   # |Alice     |\n\n# Right align\nprint(f"|{name:>10}|")   # |     Alice|\n\n# Center align\nprint(f"|{name:^10}|")   # |  Alice   |\n\n# Pad with custom character\nprint(f"|{name:-^10}|")  # |--Alice---|\nprint(f"|{name:*>10}|")  # |*****Alice|',
        language: 'python',
        highlight: [4, 7, 10, 13, 14],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Create a Simple Table Row',
      instructions: 'Create a formatted table row with:\n- `item = "Apple"` left-aligned in 15 characters\n- `price = 1.99` right-aligned in 10 characters with 2 decimals\n\nStore the entire row in `row`.',
      starterCode: 'item = "Apple"\nprice = 1.99\n\n# Create formatted row\nrow = \n',
      solutionCode: 'item = "Apple"\nprice = 1.99\n\n# Create formatted row\nrow = f"{item:<15}{price:>10.2f}"',
      testCases: [
        {
          id: 'test-1',
          description: 'row should have correct format',
          testCode: 'assert row == "Apple                1.99", \'Row should be "Apple                1.99"\'',
        },
      ],
      hints: [
        'Left align: {item:<15}',
        'Right align with decimals: {price:>10.2f}',
        'Combine both in one f-string',
      ],
      aiHintPrompt: 'The user is learning text alignment in f-strings.',
    },
    {
      id: 'step-6-other-methods',
      order: 6,
      type: 'instruction',
      title: 'Other Formatting Methods',
      content: '# Alternative Formatting Methods\n\nPython has other ways to format strings:',
      codeExample: {
        code: '# .format() method (older style)\nprint("Hello, {}!".format("World"))\nprint("{name} is {age}".format(name="Alice", age=25))\n\n# % formatting (oldest style)\nprint("Hello, %s!" % "World")\nprint("Value: %.2f" % 3.14159)\n\n# Preferred: f-strings (Python 3.6+)\nname = "Alice"\nprint(f"Hello, {name}!")',
        language: 'python',
        highlight: [2, 3, 11],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What does `f"{42:08d}"` produce?',
      options: [
        {
          id: 'a',
          text: '"42"',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '"00000042"',
          isCorrect: true,
        },
        {
          id: 'c',
          text: '"42000000"',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'Error',
          isCorrect: false,
        },
      ],
      explanation: 'The format spec "08d" means: make it 8 characters wide (0 for padding), using decimal (d) format. So 42 becomes "00000042".',
    },
  ],
}
