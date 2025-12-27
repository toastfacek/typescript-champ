import { Router } from 'express'
import { z } from 'zod'
import { complete, completeWithJSON } from '../services/gemini.js'
import { 
  STUDIO_PLAN_SYSTEM_PROMPT, 
  buildStudioPlanPrompt 
} from '../prompts/studio-plan.js'
import { 
  STUDIO_REVIEW_SYSTEM_PROMPT, 
  buildStudioReviewPrompt 
} from '../prompts/studio-review.js'
import { 
  STUDIO_CHAT_SYSTEM_PROMPT, 
  buildStudioChatPrompt 
} from '../prompts/studio-chat.js'

export const studioRouter = Router()

// Schema definitions
const PlanProjectSchema = z.object({
  userIdea: z.string().min(3).max(500),
  preferredLanguage: z.enum(['typescript', 'python']).optional()
})

const ReviewCodeSchema = z.object({
  currentCode: z.string(),
  stepTitle: z.string(),
  stepDescription: z.string(),
  stepGuidance: z.string(),
  language: z.string()
})

const ChatSchema = z.object({
  message: z.string(),
  projectContext: z.object({
    title: z.string(),
    language: z.string(),
    currentStep: z.any(),
    currentCode: z.string().optional().default('')
  })
})

// Routes

// POST /api/studio/plan
studioRouter.post('/plan', async (req, res) => {
  try {
    const { userIdea, preferredLanguage } = PlanProjectSchema.parse(req.body)

    const userPrompt = buildStudioPlanPrompt(userIdea, preferredLanguage)
    
    // Low temperature for structured planning
    const plan = await completeWithJSON(userPrompt, {
      systemPrompt: STUDIO_PLAN_SYSTEM_PROMPT,
      temperature: 0.2 
    })

    res.json({
      success: true,
      plan
    })
  } catch (error) {
    console.error('Studio Plan Error:', error)
    res.status(500).json({ success: false, error: 'Failed to generate plan' })
  }
})

// POST /api/studio/review
studioRouter.post('/review', async (req, res) => {
  try {
    const { currentCode, stepTitle, stepDescription, stepGuidance, language } = ReviewCodeSchema.parse(req.body)

    const userPrompt = buildStudioReviewPrompt(currentCode, stepTitle, stepDescription, stepGuidance, language)

    const review = await completeWithJSON(userPrompt, {
      systemPrompt: STUDIO_REVIEW_SYSTEM_PROMPT,
      temperature: 0.4
    })

    res.json({
      success: true,
      review
    })
  } catch (error) {
    console.error('Studio Review Error:', error)
    res.status(500).json({ success: false, error: 'Failed to review code' })
  }
})

// POST /api/studio/chat
studioRouter.post('/chat', async (req, res) => {
  try {
    const { message, projectContext } = ChatSchema.parse(req.body)

    const userPrompt = buildStudioChatPrompt(message, projectContext)

    const reply = await complete(userPrompt, {
      systemPrompt: STUDIO_CHAT_SYSTEM_PROMPT,
      temperature: 0.7
    })

    res.json({
      success: true,
      reply
    })
  } catch (error) {
    console.error('Studio Chat Error:', error)
    res.status(500).json({ success: false, error: 'Failed to generate reply' })
  }
})
