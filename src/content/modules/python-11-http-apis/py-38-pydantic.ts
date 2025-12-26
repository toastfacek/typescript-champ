import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-38-pydantic',
  slug: 'json-pydantic',
  title: 'JSON & Pydantic',
  description: 'Use Pydantic to validate and structure API data.',
  order: 2,
  xpReward: 80,
  estimatedMinutes: 15,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-37-requests'],
  tags: ['pydantic', 'json', 'validation'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Problem with Dicts',
      content: `
When you call \`response.json()\`, you get a raw Python dictionary.

\`\`\`python
user = response.json()
print(user["email"]) # What if "email" is missing? This crashes.
\`\`\`

In the TypeScript track, we used **Zod**. In Python, the industry standard is **Pydantic**.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Defining a Pydantic Model',
      content: `
Pydantic uses Python type hints to enforce data structures.

\`\`\`python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str

# Create a model from a dict
raw_data = {"id": 1, "name": "Alice", "email": "alice@example.com"}
user = User(**raw_data)

print(user.name)  # Accessible as an attribute!
\`\`\`

If any field is missing or the wrong type, Pydantic will raise a \`ValidationError\`.
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Create a Post Model',
      instructions: `
Define a Pydantic class named \`Post\` that inherits from \`BaseModel\`.
It should have two fields:
1. \`id\` (an integer)
2. \`title\` (a string)
      `,
      starterCode: `from pydantic import BaseModel

# Define the Post model here
`,
      solutionCode: `from pydantic import BaseModel

class Post(BaseModel):
    id: int
    title: str`,
      testCases: [
        {
          id: 'test-1',
          description: 'Class Post defined',
          testCode: 'assert "class Post" in __user_code__',
        },
        {
          id: 'test-2',
          description: 'Inherits from BaseModel',
          testCode: 'assert "Post(BaseModel)" in __user_code__.replace(" ", "")',
        },
        {
          id: 'test-3',
          description: 'Fields defined correctly',
          testCode: 'assert "id: int" in __user_code__ and "title: str" in __user_code__',
        },
      ],
      hints: [
        'Inherit by using `(BaseModel)` after the class name',
        'Use type hints like `: int` and `: str`',
      ],
    },
  ],
}
