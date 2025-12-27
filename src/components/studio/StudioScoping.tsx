import { useState, useRef, useEffect } from 'react'
import { useStudioStore } from '@/store/studio-store'
import { Button, Badge } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

const SUGGESTIONS = {
    typescript: [
        { title: 'Personal Finance API', description: 'Build a RESTful API with validation using TypeScript and Zod.' },
        { title: 'Interactive Quiz Engine', description: 'Create a state-driven quiz engine using Interfaces and Generics.' },
        { title: 'GitHub Repo Analyzer', description: 'Build a tool that analyzes repository stats using the Octokit SDK.' }
    ],
    python: [
        { title: 'Excel Data Automator', description: 'A script to process and clean messy Excel files using Pandas-like logic.' },
        { title: 'Weather Forecast CLI', description: 'Fetch and display weather data using Python Requests and formatted output.' },
        { title: 'Inventory Management', description: 'Manage a digital store inventory using Python classes and Dictionaries.' }
    ]
}

export function StudioScoping() {
    const navigate = useNavigate()
    const { scopingChatHistory, isGeneratingPlan, sendMessage, createProject, error } = useStudioStore()
    const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'python' | null>(null)
    const [idea, setIdea] = useState('')
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [scopingChatHistory])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!idea.trim()) return
        sendMessage(idea)
        setIdea('')
    }

    const handleSuggestion = (suggestion: string) => {
        sendMessage(`I want to build: ${suggestion}`)
        setIdea(suggestion)
    }

    const handleGenerate = () => {
        if (!selectedLanguage) return

        // Mock curriculum generation
        createProject({
            title: idea || 'My Custom Project',
            description: 'A project generated from your scoping session.',
            language: selectedLanguage,
            modules: [
                {
                    id: 'm1',
                    title: 'Phase 1: Foundation',
                    steps: [
                        {
                            id: 's1',
                            title: 'Project Setup',
                            content: `## Getting Started\n\nWelcome to your new **${selectedLanguage}** project. In this first step, we'll set up the core structure.`,
                            relatedConcepts: [selectedLanguage === 'typescript' ? 'Interfaces' : 'Basic Types'],
                            files: { 'main.ts': selectedLanguage === 'typescript' ? 'export interface Config { \n  version: string;\n}' : 'config = {\n    "version": "1.0"\n}\nprint(config)' }
                        }
                    ]
                }
            ]
        })
        navigate('/studio')
    }

    if (!selectedLanguage) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-purple-400">
                        Choose Your Path
                    </h1>
                    <p className="text-xl text-surface-400">Select a language to start scoping your project.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button
                        onClick={() => setSelectedLanguage('typescript')}
                        className="group p-8 rounded-3xl border-2 border-surface-700 bg-surface-900/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform text-blue-400">
                            TS
                        </div>
                        <h2 className="text-2xl font-bold text-surface-100 mb-2">TypeScript</h2>
                        <p className="text-surface-400 leading-relaxed mb-6">
                            Master Type Safety, Interfaces, and Modern Web architectures. Best for building scalable applications and APIs.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="accent">Static Typing</Badge>
                            <Badge variant="accent">Modern JS</Badge>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedLanguage('python')}
                        className="group p-8 rounded-3xl border-2 border-surface-700 bg-surface-900/50 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all text-left"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform text-yellow-400">
                            PY
                        </div>
                        <h2 className="text-2xl font-bold text-surface-100 mb-2">Python</h2>
                        <p className="text-surface-400 leading-relaxed mb-6">
                            Focus on logic, data, and rapid development. Best for automation, AI experiments, and backend scripting.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="warning">Clean Syntax</Badge>
                            <Badge variant="warning">Data Science</Badge>
                        </div>
                    </button>
                </div>
            </div>
        )
    }

    const suggestions = selectedLanguage === 'typescript' ? SUGGESTIONS.typescript : SUGGESTIONS.python

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col max-w-5xl mx-auto">
            {/* Header */}
            <header className="px-6 py-8 border-b border-surface-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedLanguage(null)} className="text-surface-500 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-heading font-bold text-surface-100">Scoping Your Project</h1>
                        <p className="text-sm text-surface-500">Language: <span className="uppercase text-accent-400 font-bold">{selectedLanguage}</span></p>
                    </div>
                </div>

                <Button
                    variant="primary"
                    onClick={handleGenerate}
                    isLoading={isGeneratingPlan}
                    disabled={scopingChatHistory.length < 1 && !idea.trim()}
                >
                    Generate Curriculum ✨
                </Button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {scopingChatHistory.length === 0 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-surface-800 rounded-3xl p-8 border border-surface-700 max-w-2xl">
                            <h2 className="text-2xl font-bold text-white mb-4">Hello! I'm your Vibe Tutor.</h2>
                            <p className="text-surface-300 text-lg leading-relaxed">
                                I'll help you turn your idea into a guided build.
                                Tell me what you want to create, or pick one of these focused suggestions to learn specific **{selectedLanguage}** concepts.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestion(s.title)}
                                    className="p-4 rounded-2xl border border-surface-700 bg-surface-900/50 hover:border-accent-500/50 hover:bg-accent-500/5 transition-all text-left"
                                >
                                    <h4 className="font-bold text-accent-400 mb-1">{s.title}</h4>
                                    <p className="text-xs text-surface-500">{s.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {scopingChatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${msg.role === 'user'
                                ? 'bg-accent-600 text-white rounded-tr-none'
                                : 'bg-surface-800 text-surface-200 border border-surface-700 rounded-tl-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-surface-700 bg-surface-900/50">
                {error && (
                    <div className="mb-4 text-xs text-danger-400 p-2 rounded bg-danger-500/10 border border-danger-500/20">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSendMessage} className="relative max-w-3xl mx-auto">
                    <input
                        type="text"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Describe your idea in a few sentences..."
                        className="w-full pl-6 pr-16 py-4 bg-surface-800 border border-surface-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all text-white"
                    />
                    <button
                        type="submit"
                        disabled={!idea.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent-500 text-white rounded-xl hover:bg-accent-400 disabled:opacity-50 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
