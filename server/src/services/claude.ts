import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export interface ClaudeCompletionOptions {
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
}

export async function complete(
  prompt: string,
  options: ClaudeCompletionOptions = {}
): Promise<string> {
  const { systemPrompt, temperature = 0.7, maxTokens = 4096 } = options

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }]
  })

  const textBlock = response.content.find(block => block.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude')
  }

  return textBlock.text
}

export async function completeWithJSON<T>(
  prompt: string,
  options: ClaudeCompletionOptions = {}
): Promise<T> {
  const response = await complete(prompt, {
    ...options,
    systemPrompt: `${options.systemPrompt || ''}

IMPORTANT: Respond with valid JSON only. No markdown, no code fences, no explanation - just the JSON object.`
  })

  // Extract JSON from response (handle potential markdown code blocks)
  let jsonStr = response.trim()

  // Remove markdown code fences if present
  if (jsonStr.startsWith('```json')) {
    jsonStr = jsonStr.slice(7)
  } else if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.slice(3)
  }
  if (jsonStr.endsWith('```')) {
    jsonStr = jsonStr.slice(0, -3)
  }
  jsonStr = jsonStr.trim()

  try {
    return JSON.parse(jsonStr) as T
  } catch (e) {
    console.error('Failed to parse JSON response:', jsonStr.slice(0, 200))
    throw new Error('Invalid JSON response from Claude')
  }
}
