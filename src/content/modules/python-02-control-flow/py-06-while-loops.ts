import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-06-while-loops',
  slug: 'while-loops',
  title: 'While Loops',
  description: 'Learn how to repeat code with while loops, and control flow with break and continue.',
  order: 6,
  estimatedMinutes: 12,
  difficulty: 'beginner',
  xpReward: 60,
  prerequisites: ['py-05-conditionals'],
  tags: ['control-flow', 'loops', 'python'],
  language: 'python',
  keyConcepts: [
    {
      id: 'while-loop',
      term: 'while Loop',
      definition: 'A while loop repeats a block of code as long as a condition remains True. Be careful to avoid infinite loops!',
      syntax: 'while condition:\\n    # code to repeat',
      example: {
        code: 'count = 0\\nwhile count < 3:\\n    print(count)\\n    count += 1',
        explanation: 'Prints 0, 1, 2, then stops when count reaches 3.',
      },
      whyItMatters: 'While loops are essential when you don\'t know how many times you need to repeat something.',
    },
    {
      id: 'break-statement',
      term: 'break Statement',
      definition: 'The break statement immediately exits a loop, skipping any remaining iterations.',
      syntax: 'while True:\\n    if condition:\\n        break',
      example: {
        code: 'while True:\\n    answer = input("Quit? ")\\n    if answer == "yes":\\n        break',
        explanation: 'Creates a loop that only exits when the user types "yes".',
      },
      whyItMatters: 'Break lets you exit loops early when a special condition is met.',
    },
    {
      id: 'continue-statement',
      term: 'continue Statement',
      definition: 'The continue statement skips the rest of the current iteration and jumps to the next one.',
      syntax: 'while condition:\\n    if skip_condition:\\n        continue\\n    # code',
      example: {
        code: 'for i in range(5):\\n    if i == 2:\\n        continue\\n    print(i)',
        explanation: 'Prints 0, 1, 3, 4 - skips 2.',
      },
      whyItMatters: 'Continue helps you skip specific iterations without stopping the entire loop.',
    },
  ],
  steps: [
    {
      id: 'step-1-intro',
      order: 1,
      type: 'instruction',
      title: 'The while Loop',
      content: `# Repeating with while

A **while** loop repeats code as long as a condition is True. Make sure the condition eventually becomes False, or you'll have an infinite loop!`,
      codeExample: {
        code: `count = 0

while count < 5:
    print(f"Count is {count}")
    count += 1  # Don't forget this!

print("Done!")`,
        language: 'python',
        highlight: [3, 5],
      },
    },
    {
      id: 'step-2-exercise-1',
      order: 2,
      type: 'code-exercise',
      title: 'Countdown Timer',
      instructions: `Create a countdown from 5 to 1:
1. Set \`count = 5\`
2. Use a while loop to print each number
3. Decrement count each iteration
4. After the loop, print "Blastoff!"`,
      starterCode: `# Countdown timer
count = 5

`,
      solutionCode: `# Countdown timer
count = 5

while count > 0:
    print(count)
    count -= 1

print("Blastoff!")`,
      testCases: [
        {
          id: 'test-1',
          description: 'count should be 0 after the loop',
          testCode: `assert count == 0, 'count should be 0 after the loop'`,
        },
      ],
      hints: [
        'Use `while count > 0:` to continue while count is positive',
        'Use `count -= 1` to decrease count by 1 each time',
        'Print "Blastoff!" after the loop ends',
      ],
      aiHintPrompt: 'The user is learning while loops with a countdown example.',
    },
    {
      id: 'step-3-break',
      order: 3,
      type: 'instruction',
      title: 'Exiting Early with break',
      content: `# The break Statement

Use **break** to exit a loop immediately, even if the condition is still True.`,
      codeExample: {
        code: `# Find the first number divisible by 7
num = 1

while num <= 100:
    if num % 7 == 0:
        print(f"Found it: {num}")
        break
    num += 1`,
        language: 'python',
        highlight: [5, 6, 7],
      },
    },
    {
      id: 'step-4-continue',
      order: 4,
      type: 'instruction',
      title: 'Skipping with continue',
      content: `# The continue Statement

Use **continue** to skip the rest of the current iteration and jump to the next one.`,
      codeExample: {
        code: `# Print only odd numbers
num = 0

while num < 10:
    num += 1
    if num % 2 == 0:  # Skip even numbers
        continue
    print(num)`,
        language: 'python',
        highlight: [6, 7],
      },
    },
    {
      id: 'step-5-exercise-2',
      order: 5,
      type: 'code-exercise',
      title: 'Sum Until Limit',
      instructions: `Calculate the sum of numbers from 1 until the sum exceeds 50:
1. Set \`total = 0\` and \`num = 0\`
2. In a while loop, add num to total
3. Increment num each iteration
4. Use \`break\` when total exceeds 50`,
      starterCode: `# Sum until exceeding 50
total = 0
num = 0

`,
      solutionCode: `# Sum until exceeding 50
total = 0
num = 0

while True:
    num += 1
    total += num
    if total > 50:
        break`,
      testCases: [
        {
          id: 'test-1',
          description: 'total should be greater than 50',
          testCode: `assert total > 50, 'total should exceed 50'`,
        },
        {
          id: 'test-2',
          description: 'total should be the sum of 1+2+3+...+num',
          testCode: `expected = sum(range(1, num + 1))
assert total == expected, f'total should be {expected}'`,
        },
      ],
      hints: [
        'You can use `while True:` and break when done',
        'Increment num before adding to total',
        'Check if total > 50 and break if True',
      ],
      aiHintPrompt: 'The user is learning to use break in while loops.',
    },
    {
      id: 'step-6-patterns',
      order: 6,
      type: 'instruction',
      title: 'Common Loop Patterns',
      content: `# While Loop Patterns

Here are some common patterns you'll use:`,
      codeExample: {
        code: `# Pattern 1: Counter loop
i = 0
while i < 5:
    print(i)
    i += 1

# Pattern 2: Sentinel loop (wait for condition)
password = ""
while password != "secret":
    password = "secret"  # Simulated input

# Pattern 3: Accumulator
total = 0
num = 1
while num <= 10:
    total += num
    num += 1`,
        language: 'python',
        highlight: [2, 3, 9, 10],
      },
    },
    {
      id: 'step-7-quiz',
      order: 7,
      type: 'quiz',
      question: 'How many times will "Hello" be printed?',
      codeContext: `count = 3
while count > 0:
    print("Hello")
    count -= 1`,
      options: [
        {
          id: 'a',
          text: '0 times',
          isCorrect: false,
        },
        {
          id: 'b',
          text: '2 times',
          isCorrect: false,
        },
        {
          id: 'c',
          text: '3 times',
          isCorrect: true,
        },
        {
          id: 'd',
          text: 'Infinite loop',
          isCorrect: false,
        },
      ],
      explanation: 'The loop runs while count > 0. Starting at 3, it prints "Hello" when count is 3, 2, and 1, then stops when count becomes 0. That\'s 3 times.',
    },
  ],
}
