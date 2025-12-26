import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: 'py-57-research-agent',
  slug: 'research-agent',
  title: 'Research Assistant',
  description: 'Build an agent that can browse the web to find information.',
  order: 1,
  xpReward: 150,
  estimatedMinutes: 20,
  difficulty: 'advanced',
  language: 'python',
  prerequisites: ['py-53-react-loop'],
  tags: ['research', 'web-search', 'agents'],
  steps: [
    {
      id: 'step-1',
      order: 1,
      type: 'instruction',
      title: 'The Research Pattern',
      content: `# Expanding AI Knowledge

LLMs are frozen in time—they only know what they were trained on. To get current info, we give them a **Research Tool**.

In this capstone, we combine:
1. **Search Tool**: A function that calls a search API (like Tavily or SerpAPI).
2. **Synthesis**: The agent's ability to read multiple search results and summarize them.
3. **Looping**: Searching for one thing, realizing it needs more info, and searching again.`,
    },
    {
      id: 'step-2',
      order: 2,
      type: 'instruction',
      title: 'Defining the Search Tool',
      content: `\`\`\`python
def search_web(query: str):
    # This would call a real API in production
    return [
        "Result 1: Python 3.13 was released in Oct 2024...",
        "Result 2: New features include a JIT compiler..."
    ]

tools = [{
    "type": "function",
    "function": {
        "name": "search_web",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {"type": "string"}
            }
        }
    }
}]
\`\`\``,
    },
    {
      id: 'step-3',
      order: 3,
      type: 'code-exercise',
      title: 'The Research Prompt',
      instructions: `Write a system prompt for a "Research Agent". 
It should tell the agent to use the \`search_web\` tool, analyze multiple results, and provide a cited answer.`,
      starterCode: `# Define your system prompt string
system_prompt = ""
`,
      solutionCode: `system_prompt = "You are a Research Agent. Use the search_web tool to find up-to-date information. Analyze multiple sources and provide a comprehensive answer with citations."`,
      testCases: [
        {
          id: 'test-1',
          description: 'Prompt mentions search_web tool',
          testCode: 'assert "search_web" in system_prompt',
        },
        {
          id: 'test-2',
          description: 'Prompt defines a Research identity',
          testCode: 'assert "Research" in system_prompt or "research" in system_prompt',
        },
      ],
      hints: [
        'Be specific about the tools available.',
        'Encourage the model to cite its sources.',
      ],
    },
  ],
}
