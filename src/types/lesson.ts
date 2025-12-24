// Key concept for glossary panel
export interface KeyConcept {
  id: string
  term: string           // e.g., "Variable"
  definition: string     // Brief explanation
  syntax?: string        // Optional syntax pattern (e.g., "let name: type = value;")
  example?: {
    code: string
    explanation: string  // What this code does
  }
  whyItMatters?: string  // Real-world context
}

// Lesson metadata and structure
export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  order: number
  estimatedMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  xpReward: number
  prerequisites: string[]
  tags: string[]
  steps: LessonStep[]
  keyConcepts?: KeyConcept[]
}

// Individual step within a lesson
export type LessonStep =
  | InstructionStep
  | CodeExerciseStep
  | FillInBlankStep
  | QuizStep

interface BaseStep {
  id: string
  order: number
  concept?: {
    id: string           // e.g., "template-literals"
    name: string         // e.g., "Template Literals"
    description: string  // Brief description for AI context
  }
}

// Tutorial/explanation content
export interface InstructionStep extends BaseStep {
  type: 'instruction'
  title?: string
  content: string
  codeExample?: {
    code: string
    language: 'typescript' | 'javascript'
    highlight?: number[]
  }
}

// Full code exercise with tests
export interface CodeExerciseStep extends BaseStep {
  type: 'code-exercise'
  title?: string
  instructions: string
  starterCode: string
  solutionCode: string
  testCases: TestCase[]
  hints: string[]
  aiHintPrompt?: string
}

// Fill in the blank exercise
export interface FillInBlankStep extends BaseStep {
  type: 'fill-in-blank'
  title?: string
  instructions: string
  codeTemplate: string
  blanks: BlankDefinition[]
  hints: string[]
}

// Multiple choice question
export interface QuizStep extends BaseStep {
  type: 'quiz'
  question: string
  codeContext?: string
  options: QuizOption[]
  explanation: string
}

// Test case for code exercises
export interface TestCase {
  id: string
  description: string
  testCode: string
  expectedOutput?: string
  hidden?: boolean
}

// Blank definition for fill-in-blank
export interface BlankDefinition {
  id: string
  placeholder: string
  correctAnswers: string[]
  caseSensitive: boolean
  hint?: string
}

// Quiz option
export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

// Curriculum structure
export interface Module {
  id: string
  title: string
  description: string
  lessons: string[] // Lesson IDs
}

export interface Curriculum {
  title: string
  description: string
  modules: Module[]
}
