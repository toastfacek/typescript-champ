import type { SprintModule } from '@/types/sprints'

/**
 * TypeScript Sprint Modules
 *
 * 8 modules covering TypeScript fundamentals through AI foundations
 * Progressive difficulty with XP-gated unlocking
 */
export const TYPESCRIPT_SPRINT_MODULES: SprintModule[] = [
  {
    id: 'ts-sprint-01-fundamentals',
    slug: 'fundamentals',
    title: 'TypeScript Fundamentals',
    description: 'Master basic types, variables, and type inference through rapid-fire exercises.',
    language: 'typescript',
    order: 1,
    difficulty: 'beginner',
    unlockThresholdXP: 0, // Always unlocked
    targetExerciseCount: 8,
    topics: ['basics', 'types'],
    concepts: ['string', 'number', 'boolean', 'any', 'unknown', 'type annotations', 'type inference'],
    estimatedMinutes: 20,
    icon: '🚀'
  },
  {
    id: 'ts-sprint-02-functions',
    slug: 'functions',
    title: 'Function Mastery',
    description: 'Build fluency with function types, parameters, and return types.',
    language: 'typescript',
    order: 2,
    difficulty: 'beginner',
    unlockThresholdXP: 120,
    targetExerciseCount: 10,
    topics: ['functions'],
    concepts: ['function signatures', 'optional parameters', 'rest parameters', 'arrow functions', 'void', 'never'],
    estimatedMinutes: 25,
    icon: '⚡'
  },
  {
    id: 'ts-sprint-03-objects',
    slug: 'objects-interfaces',
    title: 'Object & Interface Sprint',
    description: 'Master object types, interfaces, and type aliases.',
    language: 'typescript',
    order: 3,
    difficulty: 'beginner',
    unlockThresholdXP: 270,
    targetExerciseCount: 10,
    topics: ['objects'],
    concepts: ['object types', 'interfaces', 'type aliases', 'optional properties', 'readonly', 'index signatures'],
    estimatedMinutes: 25,
    icon: '📦'
  },
  {
    id: 'ts-sprint-04-arrays',
    slug: 'arrays-collections',
    title: 'Array & Collections Sprint',
    description: 'Practice with typed arrays, tuples, and array methods.',
    language: 'typescript',
    order: 4,
    difficulty: 'intermediate',
    unlockThresholdXP: 450,
    targetExerciseCount: 12,
    topics: ['arrays'],
    concepts: ['Array<T>', 'tuple types', 'readonly arrays', 'map/filter/reduce typing'],
    estimatedMinutes: 30,
    icon: '📚'
  },
  {
    id: 'ts-sprint-05-advanced-types',
    slug: 'advanced-types',
    title: 'Advanced Types Sprint',
    description: 'Dive into union types, intersection types, and type guards.',
    language: 'typescript',
    order: 5,
    difficulty: 'intermediate',
    unlockThresholdXP: 650,
    targetExerciseCount: 12,
    topics: ['advanced-types'],
    concepts: ['union types', 'intersection types', 'type guards', 'discriminated unions', 'literal types', 'type narrowing'],
    estimatedMinutes: 35,
    icon: '🎯'
  },
  {
    id: 'ts-sprint-06-generics',
    slug: 'generics',
    title: 'Generics Sprint',
    description: 'Master generic functions, constraints, and utility types.',
    language: 'typescript',
    order: 6,
    difficulty: 'intermediate',
    unlockThresholdXP: 900,
    targetExerciseCount: 15,
    topics: ['generics'],
    concepts: ['type parameters', 'generic constraints', 'extends keyword', 'Pick', 'Omit', 'Partial', 'Required', 'Record'],
    estimatedMinutes: 40,
    icon: '🔧'
  },
  {
    id: 'ts-sprint-07-async',
    slug: 'async-mastery',
    title: 'Async Mastery Sprint',
    description: 'Build confidence with Promises, async/await, and error handling.',
    language: 'typescript',
    order: 7,
    difficulty: 'intermediate',
    unlockThresholdXP: 1200,
    targetExerciseCount: 12,
    topics: ['async'],
    concepts: ['Promise<T>', 'async functions', 'await', 'try/catch', 'rejection handling', 'Promise.all'],
    estimatedMinutes: 35,
    icon: '⏳'
  },
  {
    id: 'ts-sprint-08-ai-foundations',
    slug: 'ai-foundations',
    title: 'AI Foundations Sprint',
    description: 'Learn HTTP APIs, data validation, and LLM concepts.',
    language: 'typescript',
    order: 8,
    difficulty: 'advanced',
    unlockThresholdXP: 1500,
    targetExerciseCount: 15,
    topics: ['http-apis', 'zod', 'llm-concepts', 'ai-calls'],
    concepts: ['fetch', 'Zod schemas', 'API types', 'tokens', 'roles', 'structured outputs', 'function calling'],
    estimatedMinutes: 45,
    icon: '🤖'
  }
]

/**
 * Python Sprint Modules
 *
 * 7 modules covering Python basics through AI applications
 * Progressive difficulty with XP-gated unlocking
 */
export const PYTHON_SPRINT_MODULES: SprintModule[] = [
  {
    id: 'py-sprint-01-basics',
    slug: 'python-basics',
    title: 'Python Basics Sprint',
    description: 'Master Python variables, types, and input/output.',
    language: 'python',
    order: 1,
    difficulty: 'beginner',
    unlockThresholdXP: 0, // Always unlocked
    targetExerciseCount: 8,
    topics: ['basics', 'types', 'input-output'],
    concepts: ['variables', 'int', 'float', 'str', 'bool', 'print', 'input', 'type conversion'],
    estimatedMinutes: 20,
    icon: '🐍'
  },
  {
    id: 'py-sprint-02-control-flow',
    slug: 'control-flow',
    title: 'Control Flow Sprint',
    description: 'Practice if/else, loops, and boolean logic.',
    language: 'python',
    order: 2,
    difficulty: 'beginner',
    unlockThresholdXP: 120,
    targetExerciseCount: 10,
    topics: ['control-flow', 'operators'],
    concepts: ['if/elif/else', 'for loops', 'while loops', 'range', 'break', 'continue', 'boolean operators'],
    estimatedMinutes: 25,
    icon: '🔀'
  },
  {
    id: 'py-sprint-03-functions',
    slug: 'functions',
    title: 'Function Sprint',
    description: 'Build fluency with Python functions, parameters, and lambda.',
    language: 'python',
    order: 3,
    difficulty: 'beginner',
    unlockThresholdXP: 270,
    targetExerciseCount: 10,
    topics: ['functions'],
    concepts: ['def', 'parameters', 'return', 'default arguments', 'keyword arguments', 'lambda', '*args', '**kwargs'],
    estimatedMinutes: 25,
    icon: '⚙️'
  },
  {
    id: 'py-sprint-04-data-structures',
    slug: 'data-structures',
    title: 'Data Structures Sprint',
    description: 'Master Python lists, dictionaries, tuples, and sets.',
    language: 'python',
    order: 4,
    difficulty: 'intermediate',
    unlockThresholdXP: 450,
    targetExerciseCount: 12,
    topics: ['data-structures'],
    concepts: ['lists', 'dictionaries', 'tuples', 'sets', 'list comprehensions', 'dict methods', 'slicing'],
    estimatedMinutes: 30,
    icon: '📊'
  },
  {
    id: 'py-sprint-05-strings',
    slug: 'strings',
    title: 'String Mastery Sprint',
    description: 'Practice string methods, slicing, and f-strings.',
    language: 'python',
    order: 5,
    difficulty: 'intermediate',
    unlockThresholdXP: 650,
    targetExerciseCount: 10,
    topics: ['basics'],
    concepts: ['string methods', 'slicing', 'f-strings', 'format', 'split', 'join', 'strip', 'replace'],
    estimatedMinutes: 25,
    icon: '✍️'
  },
  {
    id: 'py-sprint-06-oop',
    slug: 'oop',
    title: 'OOP Sprint',
    description: 'Learn classes, objects, and inheritance in Python.',
    language: 'python',
    order: 6,
    difficulty: 'intermediate',
    unlockThresholdXP: 830,
    targetExerciseCount: 12,
    topics: ['classes'],
    concepts: ['classes', 'objects', '__init__', 'self', 'methods', 'attributes', 'inheritance', 'super()'],
    estimatedMinutes: 35,
    icon: '🏗️'
  },
  {
    id: 'py-sprint-07-ai',
    slug: 'python-ai',
    title: 'Python for AI Sprint',
    description: 'Master httpx, Pydantic, and type hints for AI applications.',
    language: 'python',
    order: 7,
    difficulty: 'advanced',
    unlockThresholdXP: 1080,
    targetExerciseCount: 15,
    topics: ['basics', 'functions'],
    concepts: ['httpx', 'Pydantic models', 'type hints', 'async/await', 'JSON handling', 'API requests'],
    estimatedMinutes: 40,
    icon: '🧠'
  }
]

/**
 * Get sprint modules for a specific language
 */
export function getSprintModules(language: 'typescript' | 'python'): SprintModule[] {
  return language === 'typescript' ? TYPESCRIPT_SPRINT_MODULES : PYTHON_SPRINT_MODULES
}

/**
 * Get a specific sprint module by ID
 */
export function getSprintModuleById(id: string, language: 'typescript' | 'python'): SprintModule | undefined {
  const modules = getSprintModules(language)
  return modules.find(m => m.id === id)
}

/**
 * Get a sprint module by slug
 */
export function getSprintModuleBySlug(slug: string, language: 'typescript' | 'python'): SprintModule | undefined {
  const modules = getSprintModules(language)
  return modules.find(m => m.slug === slug)
}
