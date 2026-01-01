import { GoogleGenAI, type GenerateContentConfig } from '@google/genai'

// Model constant for easy updates
// See: https://ai.google.dev/gemini-api/docs/models#gemini-3-flash
const GEMINI_MODEL = 'gemini-3-flash-preview'

const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
if (!apiKey) {
  throw new Error('GOOGLE_API_KEY or GEMINI_API_KEY environment variable is required')
}

const genAI = new GoogleGenAI({ apiKey })

export interface GeminiCompletionOptions {
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
}

export async function complete(
  prompt: string,
  options: GeminiCompletionOptions = {}
): Promise<string> {
  const { systemPrompt, temperature = 0.7, maxTokens = 4096 } = options

  const config: GenerateContentConfig = {
    temperature,
    maxOutputTokens: maxTokens
  }

  if (systemPrompt) {
    config.systemInstruction = systemPrompt
  }

  const response = await genAI.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config
  })

  if (!response.text) {
    throw new Error('No text response from Gemini')
  }

  return response.text
}

export async function completeWithJSON<T>(
  prompt: string,
  options: GeminiCompletionOptions = {}
): Promise<T> {
  const response = await complete(prompt, {
    ...options,
    systemPrompt: `${options.systemPrompt || ''}

CRITICAL: You MUST respond with ONLY valid JSON. No markdown code blocks, no backticks, no explanations before or after - just the raw JSON object starting with { and ending with }.`
  })

  // Extract JSON from response (handle potential markdown code blocks and other formatting)
  let jsonStr = response.trim()

  // Remove markdown code fences if present (handle multiple formats)
  const codeFencePatterns = [
    /^```json\s*/i,
    /^```javascript\s*/i,
    /^```\s*/,
  ]

  for (const pattern of codeFencePatterns) {
    jsonStr = jsonStr.replace(pattern, '')
  }

  // Remove trailing code fences
  jsonStr = jsonStr.replace(/\s*```\s*$/g, '').trim()

  // Try to find JSON object if there's extra text
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    jsonStr = jsonMatch[0]
  }

  try {
    return JSON.parse(jsonStr) as T
  } catch (e) {
    console.error('Failed to parse JSON response from Gemini')
    console.error('First 500 chars:', jsonStr.slice(0, 500))
    console.error('Last 200 chars:', jsonStr.slice(-200))
    console.error('Parse error:', e instanceof Error ? e.message : String(e))
    throw new Error('Invalid JSON response from Gemini')
  }
}

