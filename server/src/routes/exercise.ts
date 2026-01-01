import { Router } from 'express'
import { z } from 'zod'
import { completeWithJSON } from '../services/gemini.js'
import {
  validateCodeExercise,
  validateFillBlank,
  validateQuiz,
  validateFocusedPracticeMiniLesson
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
import {
  FOCUSED_PRACTICE_SYSTEM_PROMPT,
  buildFocusedPracticePrompt
} from '../prompts/focused-practice.js'
import {
  RECAP_EXERCISE_SYSTEM_PROMPT,
  buildRecapExercisePrompt
} from '../prompts/recap-exercise.js'
import {
  AI_HINT_SYSTEM_PROMPT,
  buildAIHintPrompt
} from '../prompts/ai-hint.js'
import { complete } from '../services/gemini.js'

export const exerciseRouter = Router()

// Request schema
const GenerateExerciseSchema = z.object({
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  exerciseType: z.enum(['code-exercise', 'fill-in-blank', 'quiz']),
  language: z.enum(['typescript', 'python']).optional().default('typescript'),
  sprintMode: z.boolean().optional().default(false),
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

    const { topic, difficulty, exerciseType, language, themeContext, sprintMode } = parseResult.data

    // Build prompt based on exercise type
    let systemPrompt: string
    let userPrompt: string

    switch (exerciseType) {
      case 'code-exercise':
        systemPrompt = CODE_EXERCISE_SYSTEM_PROMPT(language)
        userPrompt = buildCodeExercisePrompt(topic, difficulty, language, themeContext, sprintMode)
        break
      case 'fill-in-blank':
        systemPrompt = FILL_BLANK_SYSTEM_PROMPT(language)
        userPrompt = buildFillBlankPrompt(topic, difficulty, language, themeContext)
        break
      case 'quiz':
        systemPrompt = QUIZ_SYSTEM_PROMPT(language)
        userPrompt = buildQuizPrompt(topic, difficulty, language, themeContext)
        break
    }

    // Generate exercise from Gemini
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
          modelUsed: 'gemini-3-flash-preview'
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

// Batch generate multiple exercises
const BatchGenerateSchema = z.object({
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  count: z.number().min(1).max(10).default(5),
  exerciseTypes: z.array(z.enum(['code-exercise', 'fill-in-blank', 'quiz'])).optional(),
  language: z.enum(['typescript', 'python']).optional().default('typescript'),
  themeContext: z.object({
    projectType: z.string().optional(),
    domain: z.string().optional(),
    exampleEntities: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional()
  }).optional()
})

exerciseRouter.post('/generate-batch', async (req, res) => {
  try {
    const parseResult = BatchGenerateSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: parseResult.error.errors
      })
    }

    const { topic, difficulty, count, exerciseTypes, language, themeContext } = parseResult.data
    const types = exerciseTypes || ['code-exercise', 'fill-in-blank', 'quiz']

    const exercises: unknown[] = []
    const errors: string[] = []
    const startTime = Date.now()

    // Note: Batch generation is not typically used for sprints
    // Sprints use individual /generate calls with sprintMode: true
    // Generate exercises in parallel (max 3 concurrent to avoid rate limits)
    const batchSize = 3
    for (let i = 0; i < count; i += batchSize) {
      const batch = []
      for (let j = i; j < Math.min(i + batchSize, count); j++) {
        const exerciseType = types[j % types.length]
        batch.push(generateSingleExercise(topic, difficulty, exerciseType as any, language, themeContext, false))
      }

      const results = await Promise.allSettled(batch)
      for (const result of results) {
        if (result.status === 'fulfilled' && result.value) {
          exercises.push(result.value)
        } else if (result.status === 'rejected') {
          errors.push(result.reason?.message || 'Generation failed')
        }
      }
    }

    const totalTimeMs = Date.now() - startTime

    res.json({
      success: true,
      exercises,
      metadata: {
        requested: count,
        generated: exercises.length,
        failed: errors.length,
        totalTimeMs,
        errors: errors.length > 0 ? errors : undefined
      }
    })
  } catch (error) {
    console.error('Batch generation error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Helper function for single exercise generation
async function generateSingleExercise(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  exerciseType: 'code-exercise' | 'fill-in-blank' | 'quiz',
  language: 'typescript' | 'python' = 'typescript',
  themeContext?: any,
  sprintMode?: boolean
) {
  let systemPrompt: string
  let userPrompt: string

  switch (exerciseType) {
    case 'code-exercise':
      systemPrompt = CODE_EXERCISE_SYSTEM_PROMPT(language)
      userPrompt = buildCodeExercisePrompt(topic, difficulty, language, themeContext, sprintMode)
      break
    case 'fill-in-blank':
      systemPrompt = FILL_BLANK_SYSTEM_PROMPT(language)
      userPrompt = buildFillBlankPrompt(topic, difficulty, language, themeContext)
      break
    case 'quiz':
      systemPrompt = QUIZ_SYSTEM_PROMPT(language)
      userPrompt = buildQuizPrompt(topic, difficulty, language, themeContext)
      break
  }

  const generated = await completeWithJSON(userPrompt, {
    systemPrompt,
    temperature: 0.8
  })

  // Validate
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
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`)
  }

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

  return {
    id: exerciseId,
    type: exerciseType,
    topic,
    difficulty,
    step,
    generatedAt: new Date().toISOString()
  }
}

// Generate focused practice mini-lesson
const GenerateFocusedPracticeSchema = z.object({
  lessonContext: z.object({
    lessonId: z.string(),
    lessonTitle: z.string(),
    lessonDescription: z.string(),
    lessonTags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    language: z.enum(['typescript', 'python']).optional().default('typescript')
  }),
  practiceDifficulty: z.enum(['easy', 'medium', 'hard']).optional().default('medium')
})

exerciseRouter.post('/generate-focused', async (req, res) => {
  try {
    const parseResult = GenerateFocusedPracticeSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: parseResult.error.errors
      })
    }

    const { lessonContext, practiceDifficulty } = parseResult.data

    // Build prompt
    const language = lessonContext.language || 'typescript'
    const userPrompt = buildFocusedPracticePrompt(lessonContext, practiceDifficulty || 'medium', language)

    // Generate mini-lesson from Gemini
    const startTime = Date.now()
    const generated = await completeWithJSON(userPrompt, {
      systemPrompt: FOCUSED_PRACTICE_SYSTEM_PROMPT,
      temperature: 0.8
    })
    const generationTimeMs = Date.now() - startTime

    // Validate generated content
    const validation = validateFocusedPracticeMiniLesson(generated)

    if (!validation.valid) {
      console.error('Generated mini-lesson failed validation:', validation.errors)
      return res.status(422).json({
        success: false,
        error: 'Generated mini-lesson failed validation',
        validationErrors: validation.errors
      })
    }

    const data = generated as any

    // Build instruction step
    const instructionStep = {
      id: `instruction-${Date.now()}`,
      order: 1,
      type: 'instruction' as const,
      title: data.instruction.title,
      content: data.instruction.content,
      codeExample: data.instruction.codeExample
    }

    // Build exercise steps
    const exerciseSteps = data.exercises.map((exercise: any, index: number) => {
      const stepId = `exercise-${Date.now()}-${index}`
      const order = index + 2

      if (exercise.type === 'code-exercise') {
        return {
          id: stepId,
          order,
          type: 'code-exercise' as const,
          title: exercise.title,
          instructions: exercise.instructions,
          starterCode: exercise.starterCode,
          solutionCode: exercise.solutionCode,
          testCases: exercise.testCases,
          hints: exercise.hints
        }
      } else if (exercise.type === 'fill-in-blank') {
        return {
          id: stepId,
          order,
          type: 'fill-in-blank' as const,
          title: exercise.title,
          instructions: exercise.instructions,
          codeTemplate: exercise.codeTemplate,
          blanks: exercise.blanks,
          hints: exercise.hints
        }
      } else if (exercise.type === 'quiz') {
        return {
          id: stepId,
          order,
          type: 'quiz' as const,
          title: exercise.title,
          question: exercise.question,
          codeContext: exercise.codeContext,
          options: exercise.options,
          explanation: exercise.explanation
        }
      }
      return null
    }).filter(Boolean)

    // Combine all steps
    const allSteps = [instructionStep, ...exerciseSteps]

    res.json({
      success: true,
      miniLesson: {
        lessonId: lessonContext.lessonId,
        lessonTitle: lessonContext.lessonTitle,
        steps: allSteps,
        estimatedMinutes: data.estimatedMinutes || 10,
        language: lessonContext.language || 'typescript'
      },
      validation: {
        valid: true,
        warnings: validation.warnings
      },
      metadata: {
        generationTimeMs,
        modelUsed: 'gemini-3-flash-preview'
      }
    })
  } catch (error) {
    console.error('Focused practice generation error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Generate recap exercise
const GenerateRecapSchema = z.object({
  lessonId: z.string(),
  lessonTitle: z.string(),
  lessonDescription: z.string(),
  lessonTags: z.array(z.string()),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.enum(['typescript', 'python']).default('typescript'),
  timesCompleted: z.number().optional().default(0)
})

exerciseRouter.post('/generate-recap', async (req, res) => {
  try {
    const parseResult = GenerateRecapSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: parseResult.error.errors
      })
    }

    const { lessonTitle, lessonDescription, lessonTags, difficulty, language, timesCompleted } = parseResult.data

    // Determine exercise type - prefer quiz or fill-in-blank for quick recap
    const exerciseTypes: Array<'code-exercise' | 'fill-in-blank' | 'quiz'> = [
      'quiz',
      'fill-in-blank',
      'code-exercise'
    ]
    const exerciseType = exerciseTypes[timesCompleted % exerciseTypes.length]

    // Build prompt
    const userPrompt = buildRecapExercisePrompt(
      lessonTitle,
      lessonDescription,
      lessonTags,
      difficulty,
      language,
      timesCompleted
    )

    // Generate exercise from Gemini
    const startTime = Date.now()
    const generated = await completeWithJSON(userPrompt, {
      systemPrompt: RECAP_EXERCISE_SYSTEM_PROMPT,
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
      console.error('Generated recap exercise failed validation:', validation.errors)
      return res.status(422).json({
        success: false,
        error: 'Generated exercise failed validation',
        validationErrors: validation.errors
      })
    }

    // Build the step object matching frontend types
    const exerciseId = `recap-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    let step: unknown
    const data = generated as any
    switch (exerciseType) {
      case 'code-exercise':
        step = {
          id: `step-${exerciseId}`,
          order: 1,
          type: 'code-exercise',
          title: data.title,
          instructions: data.instructions,
          starterCode: data.starterCode,
          solutionCode: data.solutionCode,
          testCases: data.testCases,
          hints: data.hints
        }
        break
      case 'fill-in-blank':
        step = {
          id: `step-${exerciseId}`,
          order: 1,
          type: 'fill-in-blank',
          title: data.title,
          instructions: data.instructions,
          codeTemplate: data.codeTemplate,
          blanks: data.blanks,
          hints: data.hints
        }
        break
      case 'quiz':
        step = {
          id: `step-${exerciseId}`,
          order: 1,
          type: 'quiz',
          title: data.title,
          question: data.question,
          codeContext: data.codeContext,
          options: data.options,
          explanation: data.explanation
        }
        break
    }

    // Map lesson tags to practice topic
    const tagStr = lessonTags.join(' ').toLowerCase()
    let topic = 'basics'
    if (tagStr.includes('function') || tagStr.includes('arrow')) topic = 'functions'
    else if (tagStr.includes('type') || tagStr.includes('interface')) topic = 'types'
    else if (tagStr.includes('array') || tagStr.includes('list')) topic = 'arrays'
    else if (tagStr.includes('object') || tagStr.includes('class')) topic = 'objects'
    else if (tagStr.includes('generic')) topic = 'generics'
    else if (tagStr.includes('async') || tagStr.includes('promise')) topic = 'async'

    // Map difficulty
    const difficultyMap = {
      beginner: 'easy' as const,
      intermediate: 'medium' as const,
      advanced: 'hard' as const
    }
    const practiceDifficulty = difficultyMap[difficulty]

    res.json({
      success: true,
      exercise: {
        id: exerciseId,
        type: exerciseType,
        topic,
        difficulty: practiceDifficulty,
        step,
        generatedAt: new Date().toISOString(),
        aiMetadata: {
          generationTimeMs,
          modelUsed: 'gemini-3-flash-preview'
        }
      },
      validation: {
        valid: true,
        warnings: validation.warnings
      }
    })
  } catch (error) {
    console.error('Recap exercise generation error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Generate AI hint for code exercise
const GenerateAIHintSchema = z.object({
  instructions: z.string(),
  starterCode: z.string(),
  currentCode: z.string(),
  testCases: z.array(z.object({
    id: z.string(),
    description: z.string(),
    testCode: z.string()
  })),
  language: z.enum(['typescript', 'python']),
  concept: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string()
  }).optional()
})

exerciseRouter.post('/ai-hint', async (req, res) => {
  try {
    const parseResult = GenerateAIHintSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: parseResult.error.errors
      })
    }

    const { instructions, starterCode, currentCode, testCases, language, concept } = parseResult.data

    // Build prompt
    const userPrompt = buildAIHintPrompt(
      instructions,
      starterCode,
      currentCode,
      testCases,
      language,
      concept
    )

    // Generate hint from Gemini
    const startTime = Date.now()
    const hint = await complete(userPrompt, {
      systemPrompt: AI_HINT_SYSTEM_PROMPT,
      temperature: 0.7,
      maxTokens: 200 // Keep hints concise
    })
    const generationTimeMs = Date.now() - startTime

    res.json({
      success: true,
      hint: hint.trim(),
      metadata: {
        generationTimeMs,
        modelUsed: 'gemini-3-flash-preview'
      }
    })
  } catch (error) {
    console.error('AI hint generation error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate hint'
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
