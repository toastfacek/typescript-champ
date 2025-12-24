import { z } from 'zod'

// Schemas for validating AI-generated content

export const TestCaseSchema = z.object({
  id: z.string(),
  description: z.string(),
  testCode: z.string(),
  hidden: z.boolean().optional()
})

export const CodeExerciseSchema = z.object({
  title: z.string().max(100),
  instructions: z.string().max(2000),
  starterCode: z.string().max(3000),
  solutionCode: z.string().max(3000),
  testCases: z.array(TestCaseSchema).min(1).max(6),
  hints: z.array(z.string()).min(1).max(4)
})

export const BlankSchema = z.object({
  id: z.string(),
  placeholder: z.string(),
  correctAnswers: z.array(z.string()).min(1),
  caseSensitive: z.boolean().optional(),
  hint: z.string().optional()
})

export const FillBlankSchema = z.object({
  title: z.string().max(100),
  instructions: z.string().max(1000),
  codeTemplate: z.string().max(2000),
  blanks: z.array(BlankSchema).min(1).max(5),
  hints: z.array(z.string()).min(1).max(3)
})

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean()
})

export const QuizSchema = z.object({
  title: z.string().max(100),
  question: z.string().max(1000),
  codeContext: z.string().max(1000).optional(),
  options: z.array(QuizOptionSchema).length(4),
  explanation: z.string().max(1000)
})

// Dangerous patterns that should never appear in generated code
const DANGEROUS_PATTERNS = [
  /\beval\s*\(/,
  /\bFunction\s*\(/,
  /\bfetch\s*\(/,
  /\bXMLHttpRequest\b/,
  /\blocalStorage\b/,
  /\bsessionStorage\b/,
  /\bdocument\./,
  /\bwindow\./,
  /\bprocess\./,
  /\brequire\s*\(/,
  /\bimport\s*\(/,
  /\bfs\./,
  /\bchild_process\b/,
  /__proto__/,
  /\bconstructor\s*\[/
]

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export function validateCodeExercise(exercise: unknown): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Schema validation
  const parseResult = CodeExerciseSchema.safeParse(exercise)
  if (!parseResult.success) {
    return {
      valid: false,
      errors: parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      warnings: []
    }
  }

  const data = parseResult.data

  // Security check
  const allCode = [data.starterCode, data.solutionCode, ...data.testCases.map(t => t.testCode)].join('\n')
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(allCode)) {
      errors.push(`Security: Code contains forbidden pattern: ${pattern.source}`)
    }
  }

  // Validate test cases use throw pattern
  for (const test of data.testCases) {
    if (!test.testCode.includes('throw')) {
      warnings.push(`Test "${test.id}" may not properly throw on failure`)
    }
  }

  // Check blanks in fill-blank aren't in code exercise
  if (data.starterCode.includes('{{BLANK')) {
    errors.push('starterCode contains blank placeholders - wrong exercise type?')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateFillBlank(exercise: unknown): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const parseResult = FillBlankSchema.safeParse(exercise)
  if (!parseResult.success) {
    return {
      valid: false,
      errors: parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      warnings: []
    }
  }

  const data = parseResult.data

  // Security check
  const allCode = data.codeTemplate
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(allCode)) {
      errors.push(`Security: Code contains forbidden pattern: ${pattern.source}`)
    }
  }

  // Validate all blanks are referenced in template
  for (const blank of data.blanks) {
    if (!data.codeTemplate.includes(`{{${blank.id}}}`)) {
      errors.push(`Blank "${blank.id}" not found in codeTemplate`)
    }
  }

  // Check for unreferenced blanks in template
  const blankPattern = /\{\{(BLANK_\d+)\}\}/g
  let match
  while ((match = blankPattern.exec(data.codeTemplate)) !== null) {
    const blankId = match[1]
    if (!data.blanks.find(b => b.id === blankId)) {
      errors.push(`Template references "${blankId}" but no blank definition found`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateQuiz(exercise: unknown): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const parseResult = QuizSchema.safeParse(exercise)
  if (!parseResult.success) {
    return {
      valid: false,
      errors: parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      warnings: []
    }
  }

  const data = parseResult.data

  // Security check on code context
  if (data.codeContext) {
    for (const pattern of DANGEROUS_PATTERNS) {
      if (pattern.test(data.codeContext)) {
        errors.push(`Security: codeContext contains forbidden pattern: ${pattern.source}`)
      }
    }
  }

  // Validate exactly one correct answer
  const correctCount = data.options.filter(o => o.isCorrect).length
  if (correctCount !== 1) {
    errors.push(`Quiz must have exactly 1 correct answer, found ${correctCount}`)
  }

  // Validate unique option IDs
  const ids = data.options.map(o => o.id)
  if (new Set(ids).size !== ids.length) {
    errors.push('Quiz options must have unique IDs')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateFocusedPracticeMiniLesson(miniLesson: unknown): ValidationResult {
  console.log('[DEBUG] validateFocusedPracticeMiniLesson: Starting validation', {
    hasMiniLesson: !!miniLesson,
    type: typeof miniLesson,
    keys: miniLesson && typeof miniLesson === 'object' ? Object.keys(miniLesson) : []
  })

  const errors: string[] = []
  const warnings: string[] = []

  if (!miniLesson || typeof miniLesson !== 'object') {
    console.log('[DEBUG] validateFocusedPracticeMiniLesson: Mini-lesson is not an object')
    return {
      valid: false,
      errors: ['Mini-lesson must be an object'],
      warnings: []
    }
  }

  const data = miniLesson as any

  console.log('[DEBUG] validateFocusedPracticeMiniLesson: Data structure check', {
    hasInstruction: !!data.instruction,
    hasExercises: Array.isArray(data.exercises),
    exercisesLength: data.exercises?.length,
    hasEstimatedMinutes: typeof data.estimatedMinutes === 'number'
  })

  // Validate instruction
  if (!data.instruction || typeof data.instruction !== 'object') {
    errors.push('Mini-lesson must have an instruction object')
  } else {
    if (!data.instruction.title || typeof data.instruction.title !== 'string') {
      errors.push('Instruction must have a title')
    }
    if (!data.instruction.content || typeof data.instruction.content !== 'string') {
      errors.push('Instruction must have content')
    }
    if (data.instruction.codeExample) {
      const code = data.instruction.codeExample.code || ''
      for (const pattern of DANGEROUS_PATTERNS) {
        if (pattern.test(code)) {
          errors.push(`Security: Instruction code example contains forbidden pattern: ${pattern.source}`)
        }
      }
    }
  }

  // Validate exercises array
  if (!Array.isArray(data.exercises) || data.exercises.length < 2 || data.exercises.length > 3) {
    console.log('[DEBUG] validateFocusedPracticeMiniLesson: Exercises array validation failed', {
      isArray: Array.isArray(data.exercises),
      length: data.exercises?.length
    })
    errors.push('Mini-lesson must have 2-3 exercises')
  } else {
    let hasCodeExercise = false
    for (let i = 0; i < data.exercises.length; i++) {
      const exercise = data.exercises[i]
      console.log(`[DEBUG] validateFocusedPracticeMiniLesson: Validating exercise ${i+1}`, {
        exerciseType: exercise?.type,
        hasType: !!exercise?.type,
        exerciseKeys: Object.keys(exercise || {})
      })
      
      if (!exercise.type || !['code-exercise', 'fill-in-blank', 'quiz'].includes(exercise.type)) {
        errors.push(`Exercise ${i + 1} must have a valid type`)
        continue
      }

      if (exercise.type === 'code-exercise') {
        hasCodeExercise = true
        const result = validateCodeExercise(exercise)
        console.log(`[DEBUG] validateFocusedPracticeMiniLesson: Code exercise ${i+1} validation`, {
          valid: result.valid,
          errors: result.errors,
          warnings: result.warnings
        })
        errors.push(...result.errors.map(e => `Exercise ${i + 1}: ${e}`))
        warnings.push(...result.warnings.map(w => `Exercise ${i + 1}: ${w}`))
      } else if (exercise.type === 'fill-in-blank') {
        const result = validateFillBlank(exercise)
        console.log(`[DEBUG] validateFocusedPracticeMiniLesson: Fill blank ${i+1} validation`, {
          valid: result.valid,
          errors: result.errors
        })
        errors.push(...result.errors.map(e => `Exercise ${i + 1}: ${e}`))
        warnings.push(...result.warnings.map(w => `Exercise ${i + 1}: ${w}`))
      } else if (exercise.type === 'quiz') {
        const result = validateQuiz(exercise)
        console.log(`[DEBUG] validateFocusedPracticeMiniLesson: Quiz ${i+1} validation`, {
          valid: result.valid,
          errors: result.errors
        })
        errors.push(...result.errors.map(e => `Exercise ${i + 1}: ${e}`))
        warnings.push(...result.warnings.map(w => `Exercise ${i + 1}: ${w}`))
      }
    }

    if (!hasCodeExercise) {
      warnings.push('Mini-lesson should include at least one code-exercise')
    }
  }

  // Validate estimatedMinutes
  if (typeof data.estimatedMinutes !== 'number' || data.estimatedMinutes < 1) {
    warnings.push('estimatedMinutes should be a positive number')
  }

  console.log('[DEBUG] validateFocusedPracticeMiniLesson: Validation complete', {
    valid: errors.length === 0,
    errorsCount: errors.length,
    warningsCount: warnings.length,
    errors,
    warnings
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}
