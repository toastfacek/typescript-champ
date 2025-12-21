export const GOAL_ANALYSIS_SYSTEM_PROMPT = `You are an expert TypeScript curriculum designer analyzing user learning goals.

Your task is to:
1. Understand what the user wants to build
2. Identify the TypeScript concepts they'll need
3. Map those concepts to a learning path
4. Create a theme context for personalizing exercises

Be practical and focused - identify the ESSENTIAL skills needed, not everything possible.`

export interface LessonSummary {
  id: string
  title: string
  description: string
  tags: string[]
  difficulty: string
}

export function buildGoalAnalysisPrompt(
  goalDescription: string,
  availableLessons: LessonSummary[]
): string {
  const lessonList = availableLessons
    .map(l => `- ${l.id}: "${l.title}" [${l.tags.join(', ')}] (${l.difficulty})`)
    .join('\n')

  return `Analyze this learning goal and create a personalized TypeScript curriculum.

USER'S GOAL: "${goalDescription}"

AVAILABLE LESSONS:
${lessonList}

Return a JSON object with this structure:
{
  "analysis": {
    "projectType": "What they're building (e.g., 'Slack Bot', 'CLI Tool', 'REST API')",
    "domain": "The problem domain (e.g., 'automation', 'communication', 'data processing')",
    "keyTechnologies": ["tech1", "tech2"],
    "conceptsNeeded": ["concept1", "concept2"]
  },
  "themeContext": {
    "projectType": "Slack Bot",
    "domain": "automation",
    "exampleEntities": ["message", "channel", "user", "reaction"],
    "techStack": ["Node.js", "Slack API", "TypeScript"]
  },
  "suggestedPath": {
    "title": "Build a Slack Bot with TypeScript",
    "description": "Learn TypeScript while building a functional Slack bot",
    "modules": [
      {
        "baseLessonId": "01-hello-typescript",
        "title": "TypeScript Basics for Bot Development",
        "relevance": "essential",
        "order": 1,
        "customizationNotes": "Frame examples around message handling"
      },
      {
        "baseLessonId": null,
        "title": "Working with the Slack API",
        "relevance": "essential",
        "order": 5,
        "customizationNotes": "New content - API types and async patterns"
      }
    ],
    "estimatedHours": 8
  }
}

GUIDELINES:
1. Map to existing lessons where possible (use baseLessonId)
2. Suggest new content where gaps exist (baseLessonId: null)
3. Order modules logically (basics first, advanced later)
4. Mark relevance as: "essential", "recommended", or "optional"
5. Keep the path focused - 6-12 modules maximum
6. themeContext will be used to personalize exercise content`
}
