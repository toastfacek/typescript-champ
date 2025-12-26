import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-26-file-paths',
  slug: 'file-paths',
  title: 'Working with Paths',
  description: 'Learn to work with file paths using os.path and pathlib.',
  order: 26,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['py-25-writing-files'],
  tags: ['files', 'paths', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'os-path',
      term: 'os.path Module',
      definition: 'The os.path module provides functions for working with file paths in a cross-platform way.',
      syntax: 'import os\\nos.path.join("dir", "file.txt")',
      example: {
        code: 'import os\\npath = os.path.join("data", "file.txt")',
        explanation: 'Creates "data/file.txt" on Unix or "data\\\\file.txt" on Windows.',
      },
      whyItMatters: 'Cross-platform path handling ensures your code works on any operating system.',
    },
    {
      id: 'pathlib',
      term: 'pathlib Module',
      definition: 'The modern, object-oriented way to handle paths. Path objects have methods for common operations.',
      syntax: 'from pathlib import Path\\np = Path("file.txt")',
      example: {
        code: 'from pathlib import Path\\np = Path("data") / "file.txt"',
        explanation: 'The / operator joins paths in a readable way.',
      },
      whyItMatters: 'pathlib is more intuitive and is the recommended approach in modern Python.',
    },
  ],
  steps: [
    {
      id: 'step-1-os-path',
      order: 1,
      type: 'instruction',
      title: 'os.path Basics',
      content: '# The os.path Module\n\nUse os.path for cross-platform file path operations:',
      codeExample: {
        code: 'import os\n\n# Join paths (works on any OS)\npath = os.path.join("data", "files", "report.txt")\n# "data/files/report.txt" on Unix\n# "data\\\\files\\\\report.txt" on Windows\n\n# Check if file/directory exists\nos.path.exists("data.txt")  # True/False\nos.path.isfile("data.txt")  # True if file\nos.path.isdir("data")       # True if directory\n\n# Get parts of a path\nos.path.basename("/path/to/file.txt")  # "file.txt"\nos.path.dirname("/path/to/file.txt")   # "/path/to"',
        language: 'python',
        highlight: [4, 9, 14, 15],
      },
    },
    {
      id: 'step-2-pathlib',
      order: 2,
      type: 'instruction',
      title: 'Modern pathlib',
      content: '# The pathlib Module (Python 3.4+)\n\nA more intuitive, object-oriented approach:',
      codeExample: {
        code: 'from pathlib import Path\n\n# Create a path\ndata_dir = Path("data")\nfile_path = data_dir / "report.txt"  # Use / to join!\n\n# Check existence\nfile_path.exists()\nfile_path.is_file()\nfile_path.is_dir()\n\n# Get parts\nfile_path.name      # "report.txt"\nfile_path.stem      # "report" (no extension)\nfile_path.suffix    # ".txt"\nfile_path.parent    # Path("data")',
        language: 'python',
        highlight: [4, 5, 13, 14, 15, 16],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Path Knowledge Check',
      instructions: 'Given `filepath = "/home/user/documents/report.pdf"`\n\nWhat would these return? (Store as strings)\n1. The filename: `filename`\n2. The extension: `extension`',
      starterCode: 'filepath = "/home/user/documents/report.pdf"\n\n# What would these be?\nfilename = ""    # Just the filename\nextension = ""   # Just the extension\n',
      solutionCode: 'filepath = "/home/user/documents/report.pdf"\n\n# What would these be?\nfilename = "report.pdf"    # Just the filename\nextension = ".pdf"   # Just the extension',
      testCases: [
        {
          id: 'test-1',
          description: 'filename should be "report.pdf"',
          testCode: 'assert filename == "report.pdf", \'filename should be "report.pdf"\'',
        },
        {
          id: 'test-2',
          description: 'extension should be ".pdf"',
          testCode: 'assert extension == ".pdf", \'extension should be ".pdf"\'',
        },
      ],
      hints: [
        'The filename is the last part of the path',
        'Extension includes the dot (.pdf)',
      ],
      aiHintPrompt: 'The user is learning path components.',
    },
    {
      id: 'step-4-operations',
      order: 4,
      type: 'instruction',
      title: 'Common Path Operations',
      content: '# Useful Path Operations',
      codeExample: {
        code: 'from pathlib import Path\n\n# Current directory\ncwd = Path.cwd()\n\n# Home directory\nhome = Path.home()\n\n# List files in directory\nfor file in Path("data").iterdir():\n    print(file.name)\n\n# Find files matching pattern\nfor py_file in Path(".").glob("*.py"):\n    print(py_file)\n\n# Create directory\nPath("new_folder").mkdir(exist_ok=True)',
        language: 'python',
        highlight: [4, 7, 10, 14, 18],
      },
    },
    {
      id: 'step-5-reading-pathlib',
      order: 5,
      type: 'instruction',
      title: 'Reading and Writing with pathlib',
      content: '# pathlib for File I/O',
      codeExample: {
        code: 'from pathlib import Path\n\n# Read file content\npath = Path("data.txt")\ncontent = path.read_text()  # Reads entire file\n\n# Write file content\npath.write_text("Hello, World!")\n\n# Read/write bytes\nbinary = path.read_bytes()\npath.write_bytes(binary)',
        language: 'python',
        highlight: [5, 8],
      },
    },
    {
      id: 'step-6-quiz',
      order: 6,
      type: 'quiz',
      question: 'Which is the recommended, modern way to handle paths in Python?',
      options: [
        {
          id: 'a',
          text: 'String concatenation: "dir" + "/" + "file.txt"',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'os.path module',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'pathlib module',
          isCorrect: true,
        },
        {
          id: 'd',
          text: 'Hard-coded paths',
          isCorrect: false,
        },
      ],
      explanation: 'pathlib (Python 3.4+) is the modern, recommended approach. It provides an object-oriented interface that is more intuitive than os.path.',
    },
  ],
}
