import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-21-dict-basics',
  slug: 'dict-basics',
  title: 'Dictionary Basics',
  description: 'Learn to create and use dictionaries for key-value data storage.',
  order: 21,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 70,
  prerequisites: ['py-20-tuples'],
  tags: ['dictionaries', 'collections', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'dictionary',
      term: 'Dictionary',
      definition: 'A dictionary stores key-value pairs. Keys must be unique and immutable. Values can be anything.',
      syntax: 'my_dict = {"key": value}',
      example: {
        code: 'person = {"name": "Alice", "age": 30}\\nprint(person["name"])  # "Alice"',
        explanation: 'Access values using their keys in square brackets.',
      },
      whyItMatters: 'Dictionaries are essential for structured data, configuration, and fast lookups.',
    },
    {
      id: 'key-value',
      term: 'Key-Value Pair',
      definition: 'Each dictionary item has a key (the name) and a value (the data). Keys are used to access values.',
      syntax: '"key": value',
      example: {
        code: '{"name": "Alice", "age": 30}',
        explanation: '"name" and "age" are keys; "Alice" and 30 are values.',
      },
      whyItMatters: 'Understanding key-value pairs is fundamental to working with JSON, APIs, and databases.',
    },
  ],
  steps: [
    {
      id: 'step-1-creating',
      order: 1,
      type: 'instruction',
      title: 'Creating Dictionaries',
      content: '# Dictionaries in Python\n\nDictionaries store data as **key-value pairs**:',
      codeExample: {
        code: '# Create a dictionary\nperson = {\n    "name": "Alice",\n    "age": 30,\n    "city": "New York"\n}\n\n# Empty dictionary\nempty = {}\n\n# Using dict() constructor\ncolors = dict(red="#FF0000", green="#00FF00")',
        language: 'python',
        highlight: [2, 3, 4, 5, 6, 12],
      },
    },
    {
      id: 'step-2-accessing',
      order: 2,
      type: 'instruction',
      title: 'Accessing Values',
      content: '# Getting Values from Dictionaries',
      codeExample: {
        code: 'person = {"name": "Alice", "age": 30}\n\n# Access by key\nprint(person["name"])  # "Alice"\n\n# Using get() - safer, returns None if missing\nprint(person.get("name"))     # "Alice"\nprint(person.get("salary"))   # None\nprint(person.get("salary", 0))  # 0 (default value)\n\n# Check if key exists\nif "age" in person:\n    print("Age found!")',
        language: 'python',
        highlight: [4, 7, 8, 9, 12],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create and Access a Dictionary',
      instructions: 'Create a dictionary called `book` with:\n- "title": "Python 101"\n- "author": "Jane Doe"\n- "pages": 250\n\nThen get the title and store it in `title`.',
      starterCode: '# Create the book dictionary\n\n',
      solutionCode: '# Create the book dictionary\nbook = {\n    "title": "Python 101",\n    "author": "Jane Doe",\n    "pages": 250\n}\ntitle = book["title"]',
      testCases: [
        {
          id: 'test-1',
          description: 'book should have correct structure',
          testCode: 'assert book == {"title": "Python 101", "author": "Jane Doe", "pages": 250}',
        },
        {
          id: 'test-2',
          description: 'title should be "Python 101"',
          testCode: 'assert title == "Python 101", \'title should be "Python 101"\'',
        },
      ],
      hints: [
        'Use curly braces {}',
        'Format: {"key": value, "key2": value2}',
        'Access with book["title"]',
      ],
      aiHintPrompt: 'The user is learning to create and access dictionaries.',
    },
    {
      id: 'step-4-modifying',
      order: 4,
      type: 'instruction',
      title: 'Modifying Dictionaries',
      content: '# Adding, Updating, and Removing',
      codeExample: {
        code: 'person = {"name": "Alice", "age": 30}\n\n# Add new key\nperson["email"] = "alice@example.com"\n\n# Update existing key\nperson["age"] = 31\n\n# Remove a key\ndel person["email"]\n\n# Remove and get value\nage = person.pop("age")  # Returns 31, removes "age"\n\nprint(person)  # {"name": "Alice"}',
        language: 'python',
        highlight: [4, 7, 10, 13],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Modify a Dictionary',
      instructions: 'Given `scores = {"math": 85, "english": 90}`:\n1. Add a new key "science" with value 95\n2. Update "math" to 88',
      starterCode: 'scores = {"math": 85, "english": 90}\n\n# Add science and update math\n',
      solutionCode: 'scores = {"math": 85, "english": 90}\n\n# Add science and update math\nscores["science"] = 95\nscores["math"] = 88',
      testCases: [
        {
          id: 'test-1',
          description: 'scores should have science',
          testCode: 'assert scores.get("science") == 95, \'scores["science"] should be 95\'',
        },
        {
          id: 'test-2',
          description: 'math should be updated to 88',
          testCode: 'assert scores["math"] == 88, \'scores["math"] should be 88\'',
        },
      ],
      hints: [
        'Add: scores["science"] = 95',
        'Update same way: scores["math"] = 88',
      ],
      aiHintPrompt: 'The user is learning to modify dictionaries.',
    },
    {
      id: 'step-6-nested',
      order: 6,
      type: 'instruction',
      title: 'Nested Dictionaries',
      content: '# Dictionaries Inside Dictionaries',
      codeExample: {
        code: 'users = {\n    "alice": {\n        "email": "alice@example.com",\n        "age": 30\n    },\n    "bob": {\n        "email": "bob@example.com",\n        "age": 25\n    }\n}\n\n# Access nested values\nprint(users["alice"]["email"])  # alice@example.com\n\n# Safely access nested\nprint(users.get("alice", {}).get("email", "N/A"))',
        language: 'python',
        highlight: [2, 3, 4, 5, 13, 16],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What happens with this code?',
      codeContext: 'd = {"a": 1, "b": 2}\nresult = d.get("c", 0)',
      options: [
        {
          id: 'a',
          text: 'KeyError exception',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'result is None',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'result is 0',
          isCorrect: true,
        },
        {
          id: 'd',
          text: 'result is "c"',
          isCorrect: false,
        },
      ],
      explanation: 'The get() method returns the default value (0) when the key "c" is not found, instead of raising an error.',
    },
  ],
}
