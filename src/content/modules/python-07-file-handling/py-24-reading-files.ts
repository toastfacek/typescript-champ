import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-24-reading-files',
  slug: 'reading-files',
  title: 'Reading Files',
  description: 'Learn to read files in Python using open(), read(), and the with statement.',
  order: 24,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-23-sets'],
  tags: ['files', 'io', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'open-function',
      term: 'open() Function',
      definition: 'The open() function opens a file and returns a file object. Always close files when done.',
      syntax: 'file = open("filename", "mode")',
      example: {
        code: 'f = open("data.txt", "r")\\ncontent = f.read()\\nf.close()',
        explanation: 'Opens file, reads content, then closes it.',
      },
      whyItMatters: 'Reading files lets your programs work with persistent data.',
    },
    {
      id: 'with-statement',
      term: 'with Statement',
      definition: 'The with statement automatically closes files even if an error occurs. Always use it!',
      syntax: 'with open("file", "r") as f:\\n    content = f.read()',
      example: {
        code: 'with open("data.txt") as f:\\n    print(f.read())',
        explanation: 'File is automatically closed after the with block.',
      },
      whyItMatters: 'Using with prevents resource leaks and is the Pythonic way to handle files.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Opening and Reading Files',
      content: '# Reading Files in Python\n\nUse `open()` to access files. The basic pattern:',
      codeExample: {
        code: '# Basic file reading\nfile = open("example.txt", "r")  # "r" = read mode\ncontent = file.read()  # Read entire file\nfile.close()  # Always close!\n\n# File modes:\n# "r" - Read (default)\n# "w" - Write (overwrites)\n# "a" - Append\n# "rb" - Read binary',
        language: 'python',
        highlight: [2, 3, 4],
      },
    },
    {
      id: 'step-2-with',
      order: 2,
      type: 'instruction',
      title: 'The with Statement',
      content: '# Better: Use with Statement\n\nThe `with` statement automatically closes files:',
      codeExample: {
        code: '# Automatic file closing with "with"\nwith open("example.txt", "r") as file:\n    content = file.read()\n    print(content)\n# File is automatically closed here!\n\n# Even if an error occurs, file gets closed\nwith open("data.txt") as f:\n    lines = f.readlines()',
        language: 'python',
        highlight: [2, 3, 4],
      },
    },
    {
      id: 'step-3-read-methods',
      order: 3,
      type: 'instruction',
      title: 'Reading Methods',
      content: '# Different Ways to Read',
      codeExample: {
        code: 'with open("example.txt") as f:\n    # Read entire file as string\n    content = f.read()\n\nwith open("example.txt") as f:\n    # Read all lines as list\n    lines = f.readlines()  # ["line1\\n", "line2\\n"]\n\nwith open("example.txt") as f:\n    # Read line by line (memory efficient!)\n    for line in f:\n        print(line.strip())  # Remove newline',
        language: 'python',
        highlight: [3, 7, 11, 12],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Understanding File Reading',
      instructions: 'Given a file object, what method would you use to:\n\n1. Read the entire file as one string? Store in `method1`\n2. Read all lines as a list? Store in `method2`\n\n(Store the method names as strings)',
      starterCode: '# What methods would you use?\nmethod1 = ""  # Read entire file as string\nmethod2 = ""  # Read all lines as list\n',
      solutionCode: '# What methods would you use?\nmethod1 = "read"  # Read entire file as string\nmethod2 = "readlines"  # Read all lines as list',
      testCases: [
        {
          id: 'test-1',
          description: 'method1 should be "read"',
          testCode: 'assert method1 == "read", \'method1 should be "read"\'',
        },
        {
          id: 'test-2',
          description: 'method2 should be "readlines"',
          testCode: 'assert method2 == "readlines", \'method2 should be "readlines"\'',
        },
      ],
      hints: [
        'read() gets the entire file as one string',
        'readlines() gets a list of lines',
      ],
      aiHintPrompt: 'The user is learning file reading methods.',
    },
    {
      id: 'step-5-encoding',
      order: 5,
      type: 'instruction',
      title: 'Encoding and Errors',
      content: '# Handling Encoding',
      codeExample: {
        code: '# Specify encoding (recommended for text files)\nwith open("data.txt", "r", encoding="utf-8") as f:\n    content = f.read()\n\n# Handle missing files\nimport os\nif os.path.exists("data.txt"):\n    with open("data.txt") as f:\n        content = f.read()\nelse:\n    print("File not found!")',
        language: 'python',
        highlight: [2, 7, 8, 9],
      },
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'Why should you use `with open()` instead of just `open()`?',
      options: [
        {
          id: 'a',
          text: 'It reads files faster',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'It automatically closes the file',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'It can read binary files',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'It supports more file types',
          isCorrect: false,
        },
      ],
      explanation: 'The with statement ensures the file is properly closed even if an error occurs, preventing resource leaks.',
    },
  ],
}
