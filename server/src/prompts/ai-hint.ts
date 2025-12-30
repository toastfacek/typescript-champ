export const AI_HINT_SYSTEM_PROMPT = `You are a helpful coding tutor providing hints to students working on TypeScript/Python exercises.

Your goal is to provide helpful guidance that:
1. Points the student in the right direction without giving away the complete solution
2. Analyzes their current code and identifies what they're missing or doing incorrectly
3. Suggests specific next steps or concepts to consider
4. Is encouraging and educational

IMPORTANT GUIDELINES:
- DO NOT provide the complete solution code
- DO NOT write code for them - only suggest approaches or concepts
- DO focus on what's missing or what they should think about next
- DO reference specific parts of their code if relevant
- Keep hints concise (2-3 sentences max)
- Be encouraging and supportive

If their code is completely empty or just starter code, provide a gentle nudge about where to start.
If they have partial code, analyze what they have and suggest what's missing.
If they have syntax errors, point them toward fixing those first.`

export function buildAIHintPrompt(
  instructions: string,
  starterCode: string,
  currentCode: string,
  testCases: Array<{ id: string; description: string; testCode: string }>,
  language: 'typescript' | 'python',
  concept?: { id: string; name: string; description: string }
): string {
  const conceptContext = concept
    ? `
CONCEPT BEING LEARNED:
- Name: ${concept.name}
- Description: ${concept.description}
`
    : ''

  const testCasesContext = testCases.length > 0
    ? `
TEST CASES (for context - what the solution needs to achieve):
${testCases.map((tc, i) => `${i + 1}. ${tc.description}`).join('\n')}
`
    : ''

  const codeDiff = currentCode === starterCode
    ? 'The student has not yet modified the starter code.'
    : `The student has written some code. Here's what they have so far:
\`\`\`${language}
${currentCode}
\`\`\``

  return `A student is working on a coding exercise. Provide a helpful hint that guides them toward the solution without giving it away.

EXERCISE INSTRUCTIONS:
${instructions}

${conceptContext}
STARTER CODE:
\`\`\`${language}
${starterCode}
\`\`\`

${codeDiff}

${testCasesContext}

Provide a concise, helpful hint (2-3 sentences) that:
- Analyzes their current progress
- Points them toward what they need to do next
- References specific concepts or approaches if relevant
- Does NOT provide the complete solution

Your hint:`
}




