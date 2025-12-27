// @ts-nocheck
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { VibeTutorProject, ChatMessage, ReviewStatus } from '@/types/vibe-tutor'
import { useStore } from '@/store'

interface VibeTutorState {
  // Global State
  savedProjects: VibeTutorProject[]
  
  // Active Session State
  currentProject: VibeTutorProject | null
  activeFilePath: string | null
  
  // UI/Transient State
  isGeneratingPlan: boolean
  isChatting: boolean
  isReviewing: boolean
  isFetching: boolean
  reviewStatus: ReviewStatus
  reviewFeedback: string | null
  error: string | null
  
  chatHistory: ChatMessage[] // For the current session
  scopingChatHistory: ChatMessage[] // For the scoping phase

  // Actions
  fetchProjects: () => Promise<void>
  createProject: (projectData: Omit<VibeTutorProject, 'id' | 'createdAt' | 'updatedAt' | 'currentModuleId' | 'currentStepId' | 'files'>) => Promise<void>
  loadProject: (id: string) => void
  saveProject: () => Promise<void>
  deleteProject: (id: string) => Promise<void>
  closeProject: () => Promise<void>

  updateFile: (path: string, content: string) => void
  setActiveFile: (path: string) => void
  
  nextStep: () => void
  prevStep: () => void
  
  // AI Actions
  sendMessage: (message: string) => Promise<void>
  requestReview: () => Promise<void>
  generatePlan: (idea: string, language: 'typescript' | 'python') => Promise<void>
  
  // Reset
  resetStore: () => void
}

const mapRowToProject = (row: any): VibeTutorProject => ({
  id: row.id,
  user_id: row.user_id,
  title: row.title,
  description: row.description || '',
  language: row.language as 'typescript' | 'python',
  modules: row.modules as any,
  files: row.files as any,
  currentModuleId: row.current_module_id || '',
  currentStepId: row.current_step_id || '',
  createdAt: new Date(row.created_at).getTime(),
  updatedAt: new Date(row.updated_at).getTime()
})

const TABLE_NAME = 'studio_projects' as any

export const useVibeTutorStore = create<VibeTutorState>((set, get) => ({
  savedProjects: [],
  currentProject: null,
  activeFilePath: null,
  
  isGeneratingPlan: false,
  isChatting: false,
  isReviewing: false,
  isFetching: false,
  reviewStatus: 'idle',
  reviewFeedback: null,
  error: null,
  chatHistory: [],
  scopingChatHistory: [],

  fetchProjects: async () => {
    const user = useStore.getState().user
    if (!user) return

    set({ isFetching: true, error: null })
    try {
      const { data, error } = await (supabase
        .from(TABLE_NAME)
        .select('*') as any)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error

      const projects = (data || []).map(mapRowToProject)
      set({ savedProjects: projects, isFetching: false })
    } catch (err: any) {
      set({ error: err.message, isFetching: false })
    }
  },

  createProject: async (projectData) => {
    const user = useStore.getState().user
    if (!user) {
      set({ error: 'User must be logged in to create projects' })
      return
    }

    const newProjectData = {
      user_id: user.id,
      title: projectData.title,
      description: projectData.description,
      language: projectData.language,
      modules: projectData.modules as any,
      current_module_id: projectData.modules[0]?.id || '',
      current_step_id: projectData.modules[0]?.steps[0]?.id || '',
      files: projectData.modules[0]?.steps[0]?.files || { 'main.ts': '// Start coding!' }
    }

    try {
      const { data, error } = await (supabase
        .from(TABLE_NAME)
        .insert(newProjectData as any) as any)
        .select()
        .single()

      if (error) throw error

      const newProject = mapRowToProject(data)

      set(state => ({
        savedProjects: [newProject, ...state.savedProjects],
        currentProject: newProject,
        activeFilePath: Object.keys(newProject.files)[0] || null,
        chatHistory: [{
          role: 'assistant',
          content: `Welcome to **${newProject.title}**! Let's get started.`,
          timestamp: Date.now()
        }]
      }))
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  loadProject: (id) => {
    const { savedProjects } = get()
    const project = savedProjects.find(p => p.id === id)
    if (project) {
      set({
        currentProject: project,
        activeFilePath: Object.keys(project.files)[0] || null,
        error: null,
        chatHistory: [{
          role: 'assistant',
          content: `Welcome back to **${project.title}**.`,
          timestamp: Date.now()
        }]
      })
    } else {
      set({ error: 'Project not found' })
    }
  },

  saveProject: async () => {
    const { currentProject } = get()
    if (!currentProject) return

    const updatedData = {
      title: currentProject.title,
      description: currentProject.description,
      language: currentProject.language,
      modules: currentProject.modules as any,
      current_module_id: currentProject.currentModuleId,
      current_step_id: currentProject.currentStepId,
      files: currentProject.files as any,
      updated_at: new Date().toISOString()
    }

    try {
      // @ts-ignore - Supabase type inference issue with dynamic table names
      const { error } = await (supabase
        .from(TABLE_NAME)
        .update(updatedData as any) as any)
        .eq('id', currentProject.id)

      if (error) throw error

      set(state => ({
        savedProjects: state.savedProjects.map(p => 
          p.id === currentProject.id ? { ...currentProject, updatedAt: Date.now() } : p
        )
      }))
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  deleteProject: async (id) => {
    try {
      const { error } = await (supabase
        .from(TABLE_NAME)
        .delete() as any)
        .eq('id', id)

      if (error) throw error

      set(state => ({
        savedProjects: state.savedProjects.filter(p => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject
      }))
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  closeProject: async () => {
    await get().saveProject()
    set({ currentProject: null, activeFilePath: null, chatHistory: [], scopingChatHistory: [] })
  },

  updateFile: (path, content) => {
    const { currentProject } = get()
    if (!currentProject) return

    const updatedFiles = {
      ...currentProject.files,
      [path]: content
    }

    set({
      currentProject: {
        ...currentProject,
        files: updatedFiles
      }
    })
  },

  setActiveFile: (path) => {
    set({ activeFilePath: path })
  },

  nextStep: () => {
    const { currentProject } = get()
    if (!currentProject) return

    const moduleIndex = currentProject.modules.findIndex(m => m.id === currentProject.currentModuleId)
    if (moduleIndex === -1) return

    const currentModule = currentProject.modules[moduleIndex]
    const stepIndex = currentModule.steps.findIndex(s => s.id === currentProject.currentStepId)
    if (stepIndex === -1) return

    let nextModuleId = currentProject.currentModuleId
    let nextStepId = ''
    let nextFiles = { ...currentProject.files }

    if (stepIndex < currentModule.steps.length - 1) {
      const nextStep = currentModule.steps[stepIndex + 1]
      nextStepId = nextStep.id
      if (nextStep.files) {
        nextFiles = { ...nextFiles, ...nextStep.files }
      }
    } else if (moduleIndex < currentProject.modules.length - 1) {
      const nextModule = currentProject.modules[moduleIndex + 1]
      nextModuleId = nextModule.id
      const firstStep = nextModule.steps[0]
      nextStepId = firstStep.id
      if (firstStep.files) {
        nextFiles = { ...nextFiles, ...firstStep.files }
      }
    } else {
      return
    }

    set({
      currentProject: {
        ...currentProject,
        currentModuleId: nextModuleId,
        currentStepId: nextStepId,
        files: nextFiles
      }
    })
    get().saveProject()
  },

  prevStep: () => {
    const { currentProject } = get()
    if (!currentProject) return

    const moduleIndex = currentProject.modules.findIndex(m => m.id === currentProject.currentModuleId)
    const currentModule = currentProject.modules[moduleIndex]
    const stepIndex = currentModule.steps.findIndex(s => s.id === currentProject.currentStepId)

    if (stepIndex > 0) {
      set({
        currentProject: {
          ...currentProject,
          currentStepId: currentModule.steps[stepIndex - 1].id
        }
      })
    } else if (moduleIndex > 0) {
      const prevModule = currentProject.modules[moduleIndex - 1]
      set({
        currentProject: {
          ...currentProject,
          currentModuleId: prevModule.id,
          currentStepId: prevModule.steps[prevModule.steps.length - 1].id
        }
      })
    }
    get().saveProject()
  },

  sendMessage: async (message) => {
    const { chatHistory } = get()
    const userMsg: ChatMessage = { role: 'user', content: message, timestamp: Date.now() }
    set({ chatHistory: [...chatHistory, userMsg], isChatting: true })
    
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        role: 'assistant',
        content: "I'm the Vibe Tutor. I'm currently being upgraded to support the new course generator features. Please check back soon!",
        timestamp: Date.now()
      }
      set(state => ({ 
        chatHistory: [...state.chatHistory, aiMsg],
        isChatting: false
      }))
    }, 1000)
  },

  requestReview: async () => {
    set({ isReviewing: true, reviewStatus: 'pending' })
    setTimeout(() => {
      set({ 
        isReviewing: false, 
        reviewStatus: 'pass',
        reviewFeedback: "Great job! This code looks correct according to the step requirements."
      })
    }, 1500)
  },

  generatePlan: async (_idea, _language) => {
    set({ isGeneratingPlan: true, error: null })
    set({ isGeneratingPlan: false, error: "Curriculum generation not yet implemented" })
  },
  
  resetStore: () => set({ savedProjects: [], currentProject: null, chatHistory: [], scopingChatHistory: [] })
}))
