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
    throw new Error('Invalid JSON response from Gemini')
  }
}

