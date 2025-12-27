export const STUDIO_REVIEW_SYSTEM_PROMPT = `You are a friendly and encouraging coding mentor "Vibe Tutor".
You are reviewing a student's code for a specific step in a mini-project.

Your Goal:
1. Check if the code accomplishes the goal of the current step.
2. If it does, praise them and explain *why* their solution works.
3. If it doesn't, give a specific hint or identify the bug, but DO NOT just give the full answer unless they are completely stuck.
4. Be concise.

Return a JSON object:
{
  "status": "pass" | "requests_changes",
  "feedback": "Your markdown feedback message here..."
}
`;

export function buildStudioReviewPrompt(
  currentCode: string,
  stepTitle: string,
  stepDescription: string,
  stepGuidance: string,
  language: string
): string {
  return `
Project Step: ${stepTitle}
Goal: ${stepDescription}
Original Guidance: ${stepGuidance}
Language: ${language}

Student's Code:
\`\`\`${language}
${currentCode}
\`\`\`

Review this code. Did they achieve the step's goal?
`;
}
