import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-05-conditionals',
  slug: 'conditionals',
  title: 'If Statements',
  description: 'Learn how to make decisions in your code using if, elif, and else statements.',
  order: 5,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-04-operators'],
  tags: ['control-flow', 'conditionals', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'if-statement',
      term: 'if Statement',
      definition: 'An if statement runs a block of code only when a condition is True. It\'s how programs make decisions.',
      syntax: 'if condition:\\n    # code to run',
      example: {
        code: 'age = 18\\nif age >= 18:\\n    print("You can vote!")',
        explanation: 'The print statement only runs if age is 18 or more.',
      },
      whyItMatters: 'Conditionals are the foundation of program logic - they let code respond differently to different situations.',
    },
    {
      id: 'elif-statement',
      term: 'elif Statement',
      definition: 'Short for "else if", elif lets you check multiple conditions in sequence. Only the first True condition runs.',
      syntax: 'if condition1:\\n    # code\\nelif condition2:\\n    # code',
      example: {
        code: 'score = 85\\nif score >= 90:\\n    grade = "A"\\nelif score >= 80:\\n    grade = "B"',
        explanation: 'Checks conditions in order, stopping at the first True one.',
      },
      whyItMatters: 'elif chains let you handle multiple cases cleanly without nesting many if statements.',
    },
    {
      id: 'else-statement',
      term: 'else Statement',
      definition: 'The else block runs when no other conditions are True. It\'s the "default" or "fallback" case.',
      syntax: 'if condition:\\n    # code\\nelse:\\n    # fallback code',
      example: {
        code: 'age = 15\\nif age >= 18:\\n    print("Adult")\\nelse:\\n    print("Minor")',
        explanation: 'If the condition is False, the else block runs.',
      },
      whyItMatters: 'else ensures your program handles all cases, including unexpected ones.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'Making Decisions with if',
      content: `# The if Statement

Programs often need to make decisions. The **if** statement runs code only when a condition is True.

**Important:** Python uses indentation (spaces) to define code blocks, not curly braces!`,
      codeExample: {
        code: `age = 20

if age >= 18:
    print("You are an adult!")
    print("You can vote!")

print("This always runs")`,
        language: 'python',
        highlight: [3, 4, 5],
      },
    },
    {
      id: 'step-2-else',
      order: 2,
      type: 'instruction',
      title: 'Adding else for Fallback',
      content: `# The else Statement

Use **else** to run code when the condition is False.`,
      codeExample: {
        code: `temperature = 25

if temperature > 30:
    print("It's hot!")
else:
    print("It's nice weather!")`,
        language: 'python',
        highlight: [5, 6],
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Check if a Number is Positive',
      instructions: `Create a variable \`number = 10\`, then write an if/else statement:
- If the number is greater than 0, set \`result = "positive"\`
- Otherwise, set \`result = "not positive"\``,
      starterCode: `# Check if number is positive
number = 10

`,
      solutionCode: `# Check if number is positive
number = 10

if number > 0:
    result = "positive"
else:
    result = "not positive"`,
      testCases: [
        {
          id: 'test-1',
          description: 'result should be "positive"',
          testCode: `assert result == "positive", 'result should be "positive" for number = 10'`,
        },
      ],
      hints: [
        'Use `if number > 0:` to check if positive',
        'Don\'t forget the colon after the condition',
        'Indent the code block with 4 spaces',
      ],
      aiHintPrompt: 'The user is learning basic if/else statements in Python.',
    },
    {
      id: 'step-4-elif',
      order: 4,
      type: 'instruction',
      title: 'Multiple Conditions with elif',
      content: `# The elif Statement

Use **elif** (short for "else if") to check multiple conditions. Python checks each condition in order and runs the first True one.`,
      codeExample: {
        code: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is {grade}")`,
        language: 'python',
        highlight: [3, 5, 7, 9, 11],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Grade Calculator',
      instructions: `Create a grade calculator:
1. Set \`score = 75\`
2. Use if/elif/else to assign a \`grade\`:
   - 90 or above: "A"
   - 80-89: "B"
   - 70-79: "C"
   - 60-69: "D"
   - Below 60: "F"`,
      starterCode: `# Grade calculator
score = 75

`,
      solutionCode: `# Grade calculator
score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"`,
      testCases: [
        {
          id: 'test-1',
          description: 'grade should be "C" for score 75',
          testCode: `assert grade == "C", 'grade should be "C" for score 75'`,
        },
      ],
      hints: [
        'Start with the highest grade first',
        'Use `>=` for "greater than or equal to"',
        'The order of elif matters - check higher scores first',
      ],
      aiHintPrompt: 'The user is learning elif chains in Python.',
    },
    {
      id: 'step-6-nested',
      order: 6,
      type: 'instruction',
      title: 'Nested Conditionals',
      content: `# Nesting if Statements

You can put if statements inside other if statements. Be careful with indentation!`,
      codeExample: {
        code: `age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive!")
    else:
        print("Get a license first.")
else:
    print("Too young to drive.")`,
        language: 'python',
        highlight: [4, 5, 6],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'What will this code print?',
      codeContext: `x = 15

if x > 20:
    print("A")
elif x > 10:
    print("B")
elif x > 5:
    print("C")
else:
    print("D")`,
      options: [
        {
          id: 'a',
          text: 'A',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'B',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'C',
          isCorrect: false,
        },
        {
          id: 'd',
          text: 'B and C',
          isCorrect: false,
        },
      ],
      explanation: 'x = 15 is not > 20 (A fails), but is > 10 (B succeeds). Once a condition is True, Python skips the rest, so C doesn\'t run even though 15 > 5 is also True.',
    },
  ],
}
