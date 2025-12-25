import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '15-records-maps',
  slug: 'records-maps',
  title: 'Records & Maps',
  description: 'Create type-safe key-value collections.',
  order: 15,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['14-tuples'],
  tags: ['records', 'maps', 'collections'],
  keyConcepts: [
    {
      id: 'record-type',
      term: 'Record Type',
      definition: '`Record<K, V>` is a TypeScript utility type that creates an object type with specific key and value types. It\'s a type-safe way to represent key-value pairs where all keys are of type K and all values are of type V. It\'s like saying "an object where keys are strings and values are numbers".',
      syntax: 'Record<KeyType, ValueType>',
      example: {
        code: '// Record with string keys and number values\ntype Scores = Record<string, number>;\n\nlet gameScores: Scores = {\n  "Alice": 100,\n  "Bob": 85,\n  "Charlie": 92\n};\n\ngameScores["Alice"];  // 100',
        explanation: '`Record<string, number>` means "an object where all keys are strings and all values are numbers". It provides type safety for key-value structures.',
      },
      whyItMatters: 'Record types provide type safety for dynamic object structures. They\'re perfect for dictionaries, lookup tables, and any situation where you need type-safe key-value pairs.',
    },
    {
      id: 'map-type',
      term: 'Map Type',
      definition: '`Map<K, V>` is a built-in JavaScript collection that stores key-value pairs with type safety in TypeScript. Unlike objects, Maps can have any type as keys (not just strings), maintain insertion order, and have methods like `get()`, `set()`, and `has()`. TypeScript ensures keys and values match the specified types.',
      syntax: 'Map<KeyType, ValueType>',
      example: {
        code: '// Create a typed Map\nlet userMap = new Map<string, number>();\n\nuserMap.set("Alice", 30);\nuserMap.set("Bob", 25);\n\nuserMap.get("Alice");  // 30\nuserMap.has("Bob");    // true',
        explanation: '`Map<string, number>` creates a Map where keys are strings and values are numbers. The `set()` and `get()` methods are type-safe.',
      },
      whyItMatters: 'Maps provide a more powerful alternative to objects for key-value storage. They support any key type, maintain order, and have convenient methods, all with full type safety.',
    },
    {
      id: 'object-vs-map',
      term: 'Object vs Map',
      definition: 'Objects and Maps both store key-value pairs, but have different strengths. Objects are simpler and work well for fixed structures. Maps are more flexible - they support any key type, maintain insertion order, have a `size` property, and are better for dynamic key-value pairs. Choose objects for structured data, Maps for dynamic collections.',
      syntax: '{ } vs Map<K, V>',
      example: {
        code: '// Object: good for fixed structure\nlet user = { name: "Alice", age: 30 };\n\n// Map: good for dynamic key-value pairs\nlet data = new Map<string, any>();\ndata.set("name", "Alice");\ndata.set("age", 30);\ndata.set("city", "NYC");  // Easy to add new keys',
        explanation: 'Objects are ideal when you know the structure ahead of time. Maps are better when you need to add/remove keys dynamically or use non-string keys.',
      },
      whyItMatters: 'Understanding when to use objects vs Maps helps you choose the right data structure. Objects are simpler for fixed structures, Maps are better for dynamic collections.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Key-Value Collections',
      content: `# Beyond Arrays

Sometimes you need to store data by keys rather than by position. TypeScript offers two main approaches:

- **Record<K, V>** - A type for objects with specific key and value types
- **Map<K, V>** - A built-in JavaScript collection with type safety`,
    },
    {
      id: 'step-2-record',
      order: 2,
      type: 'instruction',
      title: 'The Record Type',
      content: `# Record<Keys, Values>

\`Record\` creates an object type with specified key and value types:`,
      codeExample: {
        code: `// Record with string keys and number values
let scores: Record<string, number> = {
  alice: 95,
  bob: 87,
  charlie: 92
};

// Access values
let aliceScore = scores["alice"];  // number
scores["dave"] = 88;  // OK - adding new entries

// Record with specific keys (union type)
type Grade = "A" | "B" | "C" | "D" | "F";
let gradePoints: Record<Grade, number> = {
  A: 4.0,
  B: 3.0,
  C: 2.0,
  D: 1.0,
  F: 0.0
};`,
        language: 'typescript',
        highlight: [2, 14],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Record',
      instructions: `Create a \`prices\` variable using \`Record<string, number>\` to store product prices:
- "apple": 1.50
- "banana": 0.75
- "orange": 2.00`,
      starterCode: `// Create the prices Record

`,
      solutionCode: `// Create the prices Record
let prices: Record<string, number> = {
  apple: 1.50,
  banana: 0.75,
  orange: 2.00
};`,
      testCases: [
        {
          id: 'test-1',
          description: 'prices["apple"] should be 1.5',
          testCode: `if (prices["apple"] !== 1.5) throw new Error('prices["apple"] should be 1.5');`,
        },
        {
          id: 'test-2',
          description: 'prices["banana"] should be 0.75',
          testCode: `if (prices["banana"] !== 0.75) throw new Error('prices["banana"] should be 0.75');`,
        },
        {
          id: 'test-3',
          description: 'prices["orange"] should be 2',
          testCode: `if (prices["orange"] !== 2) throw new Error('prices["orange"] should be 2');`,
        },
      ],
      hints: [
        'Use Record<string, number> as the type',
        'Create an object with the key-value pairs',
      ],
    },
    {
      id: 'step-4-map',
      order: 4,
      type: 'instruction',
      title: 'The Map Collection',
      content: `# Map<K, V>

\`Map\` is a built-in collection that's more flexible than objects:`,
      codeExample: {
        code: `// Create a typed Map
let userAges = new Map<string, number>();

// Add entries
userAges.set("alice", 25);
userAges.set("bob", 30);

// Get values (returns undefined if not found)
let aliceAge = userAges.get("alice");  // number | undefined

// Check if key exists
if (userAges.has("alice")) {
  console.log("Alice exists!");
}

// Maps can use any type as keys (unlike objects)
let objectMap = new Map<object, string>();`,
        language: 'typescript',
        highlight: [2, 5, 6, 9],
      },
    },
    {
      id: 'step-5-map-methods',
      order: 5,
      type: 'instruction',
      title: 'Map Methods',
      content: `# Working with Maps`,
      codeExample: {
        code: `let inventory = new Map<string, number>();
inventory.set("apples", 50);
inventory.set("oranges", 30);
inventory.set("bananas", 45);

// Useful Map properties and methods:
inventory.size;           // 3
inventory.has("apples");  // true
inventory.get("apples");  // 50
inventory.delete("oranges");

// Iterate over a Map
for (let [fruit, count] of inventory) {
  console.log(\`\${fruit}: \${count}\`);
}

// Convert to array of entries
let entries = Array.from(inventory);
// [["apples", 50], ["bananas", 45]]`,
        language: 'typescript',
        highlight: [7, 8, 9, 13],
      },
    },
    {
      id: 'step-6-exercise-2',
      order: 6,
      type: 'code-exercise',
      title: 'Work with Maps',
      instructions: `Create a Map called \`wordCount\` that maps strings to numbers.

Add these entries:
- "hello" -> 5
- "world" -> 3
- "typescript" -> 10

Then get the count for "typescript" and store it in \`tsCount\`.`,
      starterCode: `// Create the wordCount Map

// Add entries

// Get typescript count
`,
      solutionCode: `// Create the wordCount Map
let wordCount = new Map<string, number>();

// Add entries
wordCount.set("hello", 5);
wordCount.set("world", 3);
wordCount.set("typescript", 10);

// Get typescript count
let tsCount = wordCount.get("typescript");`,
      testCases: [
        {
          id: 'test-1',
          description: 'wordCount should have "hello" with value 5',
          testCode: `if (wordCount.get("hello") !== 5) throw new Error('wordCount.get("hello") should be 5');`,
        },
        {
          id: 'test-2',
          description: 'wordCount should have "world" with value 3',
          testCode: `if (wordCount.get("world") !== 3) throw new Error('wordCount.get("world") should be 3');`,
        },
        {
          id: 'test-3',
          description: 'tsCount should be 10',
          testCode: `if (tsCount !== 10) throw new Error('tsCount should be 10');`,
        },
      ],
      hints: [
        'Create with: new Map<string, number>()',
        'Add entries with: map.set(key, value)',
        'Get values with: map.get(key)',
      ],
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'When should you use Map instead of Record?',
      options: [
        {
          id: 'a',
          text: 'When you need to iterate in insertion order',
          isCorrect: true,
        },
        {
          id: 'b',
          text: 'When keys are always strings',
          isCorrect: false,
        },
        {
          id: 'c',
          text: 'When you want faster access',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'When the object is immutable',
          isCorrect: false,
        },
      ],
      explanation: 'Map maintains insertion order, allows any type as keys (not just strings), and has useful methods like .size. Use Record for simple string-keyed objects, Map for more complex scenarios.',
    },
  ],
}
