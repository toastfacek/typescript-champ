import { Router } from 'express'
import { z } from 'zod'
import { completeWithJSON } from '../services/gemini.js'
import {
  GOAL_ANALYSIS_SYSTEM_PROMPT,
  buildGoalAnalysisPrompt,
  type LessonSummary
} from '../prompts/goal-analysis.js'

export const goalRouter = Router()

// Available lessons (would come from DB in production)
const AVAILABLE_LESSONS: LessonSummary[] = [
  { id: '01-hello-typescript', title: 'Hello, TypeScript!', description: 'Your first steps into TypeScript', tags: ['basics', 'introduction'], difficulty: 'beginner' },
  { id: '02-basic-types', title: 'Basic Types', description: 'Master string, number, and boolean', tags: ['basics', 'types'], difficulty: 'beginner' },
  { id: '03-type-inference', title: 'Type Inference', description: 'Let TypeScript figure out types', tags: ['basics', 'types', 'inference'], difficulty: 'beginner' },
  { id: '04-functions', title: 'Function Basics', description: 'Write typed functions', tags: ['functions'], difficulty: 'beginner' },
  { id: '05-parameters', title: 'Parameters & Returns', description: 'Function parameters and return types', tags: ['functions', 'types'], difficulty: 'beginner' },
  { id: '06-arrow-functions', title: 'Arrow Functions', description: 'Modern function syntax', tags: ['functions'], difficulty: 'beginner' },
  { id: '07-objects', title: 'Object Types', description: 'Type your objects', tags: ['objects', 'types'], difficulty: 'intermediate' },
  { id: '08-interfaces', title: 'Interfaces', description: 'Define contracts with interfaces', tags: ['objects', 'interfaces'], difficulty: 'intermediate' },
  { id: '09-arrays', title: 'Typed Arrays', description: 'Work with typed arrays', tags: ['arrays', 'types'], difficulty: 'intermediate' },
  { id: '10-generics', title: 'Generic Functions', description: 'Write flexible, reusable code', tags: ['generics', 'advanced'], difficulty: 'intermediate' },
  { id: '11-promises', title: 'Promises', description: 'Async operations with types', tags: ['async', 'promises'], difficulty: 'intermediate' },
  { id: '12-async-await', title: 'Async/Await', description: 'Modern async patterns', tags: ['async'], difficulty: 'intermediate' }
]

const AnalyzeGoalSchema = z.object({
  goalDescription: z.string().min(10).max(500)
})

goalRouter.post('/analyze', async (req, res) => {
  try {
    const parseResult = AnalyzeGoalSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: parseResult.error.errors
      })
    }

    const { goalDescription } = parseResult.data

    const prompt = buildGoalAnalysisPrompt(goalDescription, AVAILABLE_LESSONS)

    const startTime = Date.now()
    const analysis = await completeWithJSON(prompt, {
      systemPrompt: GOAL_ANALYSIS_SYSTEM_PROMPT,
      temperature: 0.7
    })
    const analysisTimeMs = Date.now() - startTime

    res.json({
      success: true,
      analysis,
      metadata: {
        analysisTimeMs,
        lessonsAnalyzed: AVAILABLE_LESSONS.length
      }
    })
  } catch (error) {
    console.error('Goal analysis error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Example goals for inspiration
goalRouter.get('/examples', (req, res) => {
  res.json({
    examples: [
      {
        title: 'Build a Slack Bot',
        description: 'I want to build a Slack bot that can respond to messages and automate tasks for my team'
      },
      {
        title: 'Create a CLI Tool',
        description: 'I want to build a command-line tool that helps manage my development workflow'
      },
      {
        title: 'Build a REST API',
        description: 'I want to create a REST API with Express and TypeScript for my web application'
      },
      {
        title: 'AI Agent Development',
        description: 'I want to build AI agents using TypeScript with the Vercel AI SDK or Claude Agent SDK'
      },
      {
        title: 'Full-Stack App',
        description: 'I want to build a full-stack web application with React and Node.js, all in TypeScript'
      }
    ]
  })
})
