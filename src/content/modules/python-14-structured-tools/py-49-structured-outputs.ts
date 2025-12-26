import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-49-structured-outputs',
  slug: 'structured-data',
  title: 'Structured Data',
  description: 'Use Pydantic to get guaranteed JSON outputs from your AI calls.',
  order: 1,
  xpReward: 80,
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  language: 'python',
  prerequisites: ['py-38-pydantic', 'py-46-chat-completions'],
  tags: ['pydantic', 'json', 'openai'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The JSON Problem',
      content: `
By default, LLMs return text. If you ask for JSON, they usually get it right, but sometimes they add extra text (like "Here is the JSON:") or miss a bracket.

This breaks your code. To solve this, we use **Structured Outputs**.
      `,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'response_format with Pydantic',
      content: `
Modern SDKs allow you to pass a Pydantic model directly into the API call. The model enforces the structure, and the SDK automatically parses it for you.

\`\`\`python
from pydantic import BaseModel
from openai import OpenAI

class Weather(BaseModel):
    city: str
    temp: float
    condition: str

client = OpenAI()

response = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "What's the weather in NYC?"}],
    response_format=Weather
)

weather = response.choices[0].message.parsed
print(f"It is {weather.temp} degrees in {weather.city}")
\`\`\`
      `,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'Define an AI Schema',
      instructions: `
Define a Pydantic class named \`Recipe\` with two fields:
1. \`name\` (str)
2. \`minutes\` (int)

Then, mock an AI call by creating an instance of \`Recipe\` with some data.
      `,
      starterCode: `from pydantic import BaseModel

# 1. Define Recipe model
# 2. Create an instance called 'my_recipe'
`,
      solutionCode: `from pydantic import BaseModel

class Recipe(BaseModel):
    name: str
    minutes: int

my_recipe = Recipe(name="Tacos", minutes=15)`,
      testCases: [
        {
          id: 'test-1',
          description: 'Class Recipe defined correctly',
          testCode: 'assert "class Recipe(BaseModel):" in __user_code__.replace(" ", "")',
        },
        {
          id: 'test-2',
          description: 'Instance my_recipe created',
          testCode: 'assert isinstance(my_recipe, Recipe)',
        },
      ],
      hints: [
        'Inherit from BaseModel',
        'Use type hints for name and minutes',
      ],
    },
  ],
}
