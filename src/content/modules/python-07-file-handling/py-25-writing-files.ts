import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-25-writing-files',
  slug: 'writing-files',
  title: 'Writing Files',
  description: 'Learn to write and append data to files in Python.',
  order: 25,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 70,
  prerequisites: ['py-24-reading-files'],
  tags: ['files', 'io', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'write-mode',
      term: 'Write Mode ("w")',
      definition: 'Opens a file for writing. Creates the file if it doesn\'t exist, or overwrites if it does.',
      syntax: 'open("file.txt", "w")',
      example: {
        code: 'with open("output.txt", "w") as f:\\n    f.write("Hello, World!")',
        explanation: 'Creates or overwrites output.txt with the text.',
      },
      whyItMatters: 'Writing files lets you save program output and persist data.',
    },
    {
      id: 'append-mode',
      term: 'Append Mode ("a")',
      definition: 'Opens a file for appending. Adds to the end without overwriting existing content.',
      syntax: 'open("file.txt", "a")',
      example: {
        code: 'with open("log.txt", "a") as f:\\n    f.write("New entry\\n")',
        explanation: 'Adds a new line to the end of the file.',
      },
      whyItMatters: 'Append mode is essential for logs and accumulating data.',
    },
  ],
  steps: [
    {
      id: 'step-1-writing',
      order: 1,
      type: 'instruction',
      title: 'Writing to Files',
      content: '# Writing Files\n\nUse mode `"w"` to write. Warning: this overwrites existing files!',
      codeExample: {
        code: '# Write to a file (creates or overwrites)\nwith open("output.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("Second line\\n")\n\n# The file now contains:\n# Hello, World!\n# Second line',
        language: 'python',
        highlight: [2, 3, 4],
      },
    },
    {
      id: 'step-2-appending',
      order: 2,
      type: 'instruction',
      title: 'Appending to Files',
      content: '# Append Mode\n\nUse mode `"a"` to add to the end without overwriting:',
      codeExample: {
        code: '# Append to existing file\nwith open("log.txt", "a") as f:\n    f.write("Log entry 1\\n")\n\n# Append again\nwith open("log.txt", "a") as f:\n    f.write("Log entry 2\\n")\n\n# File now contains both entries',
        language: 'python',
        highlight: [2, 6],
      },
    },
    {
      id: 'step-3-writelines',
      order: 3,
      type: 'instruction',
      title: 'Writing Multiple Lines',
      content: '# writelines() Method',
      codeExample: {
        code: '# Write a list of strings\nlines = ["First line\\n", "Second line\\n", "Third line\\n"]\n\nwith open("output.txt", "w") as f:\n    f.writelines(lines)\n\n# Or use join for a list without newlines\nitems = ["apple", "banana", "cherry"]\nwith open("fruits.txt", "w") as f:\n    f.write("\\n".join(items))',
        language: 'python',
        highlight: [5, 10],
      },
    },
    {
      id: 'step-4-exercise-1',
      order: 4,
      type: 'code-exercise',
      title: 'Choose the Right Mode',
      instructions: 'For each scenario, what file mode would you use?\n\n1. Create a new config file (overwriting if exists): `mode1`\n2. Add a new line to an existing log: `mode2`\n3. Read a file: `mode3`',
      starterCode: '# Choose the right file modes\nmode1 = ""  # Create/overwrite config file\nmode2 = ""  # Add to existing log\nmode3 = ""  # Read a file\n',
      solutionCode: '# Choose the right file modes\nmode1 = "w"  # Create/overwrite config file\nmode2 = "a"  # Add to existing log\nmode3 = "r"  # Read a file',
      testCases: [
        {
          id: 'test-1',
          description: 'mode1 should be "w"',
          testCode: 'assert mode1 == "w", \'mode1 should be "w"\'',
        },
        {
          id: 'test-2',
          description: 'mode2 should be "a"',
          testCode: 'assert mode2 == "a", \'mode2 should be "a"\'',
        },
        {
          id: 'test-3',
          description: 'mode3 should be "r"',
          testCode: 'assert mode3 == "r", \'mode3 should be "r"\'',
        },
      ],
      hints: [
        '"w" writes and overwrites',
        '"a" appends without overwriting',
        '"r" reads',
      ],
      aiHintPrompt: 'The user is learning file modes.',
    },
    {
      id: 'step-5-practical',
      order: 5,
      type: 'instruction',
      title: 'Practical Example',
      content: '# Real-World Example: Simple Logger',
      codeExample: {
        code: 'from datetime import datetime\n\ndef log(message):\n    """Append a timestamped message to log file"""\n    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")\n    with open("app.log", "a") as f:\n        f.write(f"[{timestamp}] {message}\\n")\n\n# Usage\nlog("Application started")\nlog("User logged in")\nlog("Processing complete")',
        language: 'python',
        highlight: [5, 6, 7],
      },
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'What happens if you open a file with mode "w" that already exists?',
      options: [
        {
          id: 'a',
          text: 'An error is raised',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Content is appended to the file',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'The file is overwritten (content deleted)',
          isCorrect: true,
        },
        {
          id: 'd',
          text: 'Nothing happens',
          isCorrect: false,
        },
      ],
      explanation: 'Mode "w" (write) creates a new file or overwrites an existing one. All previous content is deleted! Use "a" (append) to add without overwriting.',
    },
  ],
}
