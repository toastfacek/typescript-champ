import { Router } from 'express'
import { z } from 'zod'
import { completeWithJSON } from '../services/claude.js'
import {
  validateCodeExercise,
  validateFillBlank,
  validateQuiz
} from '../services/validator.js'
import {
  CODE_EXERCISE_SYSTEM_PROMPT,
  buildCodeExercisePrompt
} from '../prompts/code-exercise.js'
import {
  FILL_BLANK_SYSTEM_PROMPT,
  buildFillBlankPrompt
} from '../prompts/fill-blank.js'
import {
  QUIZ_SYSTEM_PROMPT,
  buildQuizPrompt
} from '../prompts/quiz.js'

export const exerciseRouter = Router()

// Request schema
const GenerateExerciseSchema = z.object({
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  exerciseType: z.enum(['code-exercise', 'fill-in-blank', 'quiz']),
  themeContext: z.object({
    projectType: z.string().optional(),
    domain: z.string().optional(),
    exampleEntities: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional()
  }).optional()
})

exerciseRouter.post('/generate', async (req, res) => {
  try {
    // Validate request
    const parseResult = GenerateExerciseSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: parseResult.error.errors
      })
    }

    const { topic, difficulty, exerciseType, themeContext } = parseResult.data

    // Build prompt based on exercise type
    let systemPrompt: string
    let userPrompt: string

    switch (exerciseType) {
      case 'code-exercise':
        systemPrompt = CODE_EXERCISE_SYSTEM_PROMPT
        userPrompt = buildCodeExercisePrompt(topic, difficulty, themeContext)
        break
      case 'fill-in-blank':
        systemPrompt = FILL_BLANK_SYSTEM_PROMPT
        userPrompt = buildFillBlankPrompt(topic, difficulty, themeContext)
        break
      case 'quiz':
        systemPrompt = QUIZ_SYSTEM_PROMPT
        userPrompt = buildQuizPrompt(topic, difficulty, themeContext)
        break
    }

    // Generate exercise from Claude
    const startTime = Date.now()
    const generated = await completeWithJSON(userPrompt, {
      systemPrompt,
      temperature: 0.8
    })
    const generationTimeMs = Date.now() - startTime

    // Validate generated content
    let validation
    switch (exerciseType) {
      case 'code-exercise':
        validation = validateCodeExercise(generated)
        break
      case 'fill-in-blank':
        validation = validateFillBlank(generated)
        break
      case 'quiz':
        validation = validateQuiz(generated)
        break
    }

    if (!validation.valid) {
      console.error('Generated exercise failed validation:', validation.errors)
      return res.status(422).json({
        success: false,
        error: 'Generated exercise failed validation',
        validationErrors: validation.errors
      })
    }

    // Build the step object matching frontend types
    const exerciseId = `practice-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    let step: unknown
    switch (exerciseType) {
      case 'code-exercise':
        step = {
          id: `step-${exerciseId}`,
          order: 1,
          type: 'code-exercise',
          title: (generated as any).title,
          instructions: (generated as any).instructions,
          starterCode: (generated as any).starterCode,
          solutionCode: (generated as any).solutionCode,
          testCases: (generated as any).testCases,
          hints: (generated as any).hints
        }
        break
      case 'fill-in-blank':
        step = {
          id: `step-${exerciseId}`,
          order: 1,
          type: 'fill-in-blank',
          title: (generated as any).title,
          instructions: (generated as any).instructions,
          codeTemplate: (generated as any).codeTemplate,
          blanks: (generated as any).blanks,
          hints: (generated as any).hints
        }
        break
      case 'quiz':
        step = {
          id: `step-${exerciseId}`,
          order: 1,
          type: 'quiz',
          title: (generated as any).title,
          question: (generated as any).question,
          codeContext: (generated as any).codeContext,
          options: (generated as any).options,
          explanation: (generated as any).explanation
        }
        break
    }

    res.json({
      success: true,
      exercise: {
        id: exerciseId,
        type: exerciseType,
        topic,
        difficulty,
        step,
        generatedAt: new Date().toISOString(),
        aiMetadata: {
          generationTimeMs,
          modelUsed: 'claude-sonnet-4-20250514'
        }
      },
      validation: {
        valid: true,
        warnings: validation.warnings
      }
    })
  } catch (error) {
    console.error('Exercise generation error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Get available topics
exerciseRouter.get('/topics', (req, res) => {
  res.json({
    topics: [
      { id: 'basics', name: 'TypeScript Basics', description: 'Variables, types, and fundamentals' },
      { id: 'types', name: 'Type System', description: 'Type annotations and inference' },
      { id: 'functions', name: 'Functions', description: 'Parameters, returns, and arrow functions' },
      { id: 'objects', name: 'Objects & Interfaces', description: 'Object types and interfaces' },
      { id: 'arrays', name: 'Arrays & Collections', description: 'Typed arrays and array methods' },
      { id: 'generics', name: 'Generics', description: 'Generic types and constraints' },
      { id: 'advanced-types', name: 'Advanced Types', description: 'Unions, intersections, and guards' },
      { id: 'async', name: 'Async TypeScript', description: 'Promises, async/await, error handling' },
      { id: 'classes', name: 'Classes', description: 'Classes, inheritance, and access modifiers' }
    ]
  })
})
