import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StudioProject, ChatMessage, ReviewStatus } from '@/types/studio'

interface StudioState {
  // State
  currentProject: StudioProject | null
  currentStepIndex: number
  currentCode: string
  chatHistory: ChatMessage[]
  isGeneratingPlan: boolean
  isReviewing: boolean
  isChatting: boolean
  reviewStatus: ReviewStatus
  reviewFeedback: string | null
  error: string | null

  // Actions
  generatePlan: (idea: string, language?: 'typescript' | 'python') => Promise<void>
  sendMessage: (message: string) => Promise<void>
  requestReview: () => Promise<void>
  updateCode: (code: string) => void
  nextStep: () => void
  prevStep: () => void
  resetStudio: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const useStudioStore = create<StudioState>()(
  persist(
    (set, get) => ({
      currentProject: null,
      currentStepIndex: 0,
      currentCode: '',
      chatHistory: [],
      isGeneratingPlan: false,
      isReviewing: false,
      isChatting: false,
      reviewStatus: 'idle',
      reviewFeedback: null,
      error: null,

      generatePlan: async (idea, language) => {
        set({ isGeneratingPlan: true, error: null })
        try {
          const response = await fetch(`${API_URL}/api/studio/plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userIdea: idea, preferredLanguage: language })
          })
          
          if (!response.ok) throw new Error('Failed to generate plan')
          
          const data = await response.json()
          if (!data.success) throw new Error(data.error || 'Failed to generate plan')

          const project = data.plan as StudioProject
          set({
            currentProject: project,
            currentStepIndex: 0,
            currentCode: project.steps[0].starterCode || '',
            chatHistory: [{
              role: 'assistant',
              content: `I've created a plan for "${project.title}". Let's start with Step 1! ${project.steps[0].guidance}`,
              timestamp: Date.now()
            }],
            isGeneratingPlan: false
          })
        } catch (error) {
          set({ 
            isGeneratingPlan: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          })
        }
      },

      sendMessage: async (message) => {
        const { currentProject, currentStepIndex, currentCode, chatHistory } = get()
        if (!currentProject) return

        // Add user message immediately
        const userMsg: ChatMessage = { role: 'user', content: message, timestamp: Date.now() }
        set({ 
          chatHistory: [...chatHistory, userMsg],
          isChatting: true 
        })

        try {
          const response = await fetch(`${API_URL}/api/studio/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message,
              projectContext: {
                title: currentProject.title,
                language: currentProject.language,
                currentStep: currentProject.steps[currentStepIndex],
                currentCode
              }
            })
          })

          if (!response.ok) throw new Error('Failed to send message')
          const data = await response.json()

          const aiMsg: ChatMessage = {
            role: 'assistant',
            content: data.reply,
            timestamp: Date.now()
          }

          set(state => ({
            chatHistory: [...state.chatHistory, aiMsg],
            isChatting: false
          }))
        } catch (error) {
          set({ isChatting: false, error: 'Failed to send message' })
        }
      },

      requestReview: async () => {
        const { currentProject, currentStepIndex, currentCode } = get()
        if (!currentProject) return

        set({ isReviewing: true, reviewStatus: 'pending' })
        const step = currentProject.steps[currentStepIndex]

        try {
          const response = await fetch(`${API_URL}/api/studio/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              currentCode,
              stepTitle: step.title,
              stepDescription: step.description,
              stepGuidance: step.guidance,
              language: currentProject.language
            })
          })

          if (!response.ok) throw new Error('Failed to review code')
          const data = await response.json()
          
          set({
            isReviewing: false,
            reviewStatus: data.review.status,
            reviewFeedback: data.review.feedback
          })
          
          // Add review to chat history
          const chatMsg: ChatMessage = {
            role: 'assistant',
            content: `**Code Review**: ${data.review.feedback}`,
            timestamp: Date.now()
          }
          set(state => ({ chatHistory: [...state.chatHistory, chatMsg] }))

        } catch (error) {
          set({ isReviewing: false, error: 'Failed to review code' })
        }
      },

      updateCode: (code) => set({ currentCode: code }),

      nextStep: () => {
        const { currentProject, currentStepIndex } = get()
        if (!currentProject) return
        
        if (currentStepIndex < currentProject.steps.length - 1) {
          const nextIndex = currentStepIndex + 1
          const nextStep = currentProject.steps[nextIndex]
          
          set({
            currentStepIndex: nextIndex,
            // Preserve code or append new starter code? 
            // For now, let's keep user code but maybe append a comment?
            // actually, usually we want to keep building on the same file.
            currentCode: get().currentCode + '\n\n' + (nextStep.starterCode || ''),
            reviewStatus: 'idle',
            reviewFeedback: null
          })

          // Announce new step in chat
          const chatMsg: ChatMessage = {
            role: 'assistant',
            content: `Moving to **${nextStep.title}**. ${nextStep.guidance}`,
            timestamp: Date.now()
          }
          set(state => ({ chatHistory: [...state.chatHistory, chatMsg] }))
        }
      },

      prevStep: () => {
        const { currentStepIndex } = get()
        if (currentStepIndex > 0) {
          set({ currentStepIndex: currentStepIndex - 1 })
        }
      },

      resetStudio: () => set({
        currentProject: null,
        currentStepIndex: 0,
        currentCode: '',
        chatHistory: [],
        error: null
      })
    }),
    {
      name: 'studio-storage'
    }
  )
)
