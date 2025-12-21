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
