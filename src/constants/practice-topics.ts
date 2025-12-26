import type { TopicInfo } from '@/types/practice'

export const TYPESCRIPT_TOPICS: TopicInfo[] = [
  { id: 'basics', name: 'TypeScript Basics', description: 'Variables, types, and fundamentals' },
  { id: 'types', name: 'Type System', description: 'Type annotations and inference' },
  { id: 'functions', name: 'Functions', description: 'Parameters, returns, and arrow functions' },
  { id: 'objects', name: 'Objects & Interfaces', description: 'Object types and interfaces' },
  { id: 'arrays', name: 'Arrays & Collections', description: 'Typed arrays and array methods' },
  { id: 'generics', name: 'Generics', description: 'Generic types and constraints' },
  { id: 'advanced-types', name: 'Advanced Types', description: 'Unions, intersections, and guards' },
  { id: 'async', name: 'Async TypeScript', description: 'Promises, async/await, error handling' },
  { id: 'classes', name: 'Classes', description: 'Classes, inheritance, and access modifiers' },
  { id: 'zod', name: 'Data Validation', description: 'Schema validation with Zod' },
  { id: 'http-apis', name: 'HTTP & APIs', description: 'Fetch, responses, and API clients' },
  { id: 'llm-concepts', name: 'LLM Concepts', description: 'Tokens, roles, and prompting' },
  { id: 'ai-calls', name: 'AI API Calls', description: 'Claude and OpenAI SDKs' }
]

export const PYTHON_TOPICS: TopicInfo[] = [
  { id: 'basics', name: 'Python Basics', description: 'Print, variables, and basic syntax' },
  { id: 'types', name: 'Variables & Types', description: 'Dynamic typing and type hints' },
  { id: 'input-output', name: 'Input & Output', description: 'input(), print(), and f-strings' },
  { id: 'operators', name: 'Operators', description: 'Arithmetic, comparison, and logical operators' },
  { id: 'control-flow', name: 'Control Flow', description: 'if/else, loops, and conditionals' },
  { id: 'functions', name: 'Functions', description: 'def, parameters, and return values' },
  { id: 'data-structures', name: 'Data Structures', description: 'Lists, dictionaries, tuples, and sets' },
  { id: 'classes', name: 'Classes & OOP', description: 'Classes, objects, and inheritance' }
]

export function getTopics(language: 'typescript' | 'python'): TopicInfo[] {
  return language === 'python' ? PYTHON_TOPICS : TYPESCRIPT_TOPICS
}

