import { useState, useEffect, useRef } from 'react'
import { useStudioStore } from '@/store/studio-store'
import { LazyCodeEditor } from '@/components/editor'
import { Button, Card, Badge } from '@/components/ui'
import { runTypeScriptCode } from '@/lib/typescript-runner'
import { runPythonCode } from '@/lib/python-runner'

export function StudioPage() {
    const currentProject = useStudioStore(state => state.currentProject)

    return (
        <div className="min-h-screen pt-16 pb-8">
            {currentProject ? <StudioWorkspace /> : <StudioWelcome />}
        </div>
    )
}

function StudioWelcome() {
    const [idea, setIdea] = useState('')
    const [language, setLanguage] = useState<'typescript' | 'python'>('typescript')
    const generatePlan = useStudioStore(state => state.generatePlan)
    const isGenerating = useStudioStore(state => state.isGeneratingPlan)
    const error = useStudioStore(state => state.error)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!idea.trim()) return
        generatePlan(idea, language)
    }

    return (
        <div className="max-w-2xl mx-auto px-4 mt-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-purple-400 mb-6">
                    Vibe Coding Studio
                </h1>
                <p className="text-xl text-surface-300">
                    Build anything you imagine. Your AI Vibe Tutor will guide you step-by-step.
                </p>
            </div>

            <Card className="p-8 border-surface-700 bg-surface-900/50 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">
                            What do you want to build?
                        </label>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="e.g. A Snake game, a Fibonacci calculator, a To-Do list app..."
                            className="w-full h-32 px-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-300 mb-2">
                            Preferred Language
                        </label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setLanguage('typescript')}
                                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${language === 'typescript'
                                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                                        : 'bg-surface-800 border-surface-700 text-surface-400 hover:border-surface-600'
                                    }`}
                            >
                                TypeScript
                            </button>
                            <button
                                type="button"
                                onClick={() => setLanguage('python')}
                                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${language === 'python'
                                        ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
                                        : 'bg-surface-800 border-surface-700 text-surface-400 hover:border-surface-600'
                                    }`}
                            >
                                Python
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 rounded-xl bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-4 text-lg font-bold shadow-lg shadow-accent-500/20"
                        isLoading={isGenerating}
                        disabled={!idea.trim() || isGenerating}
                    >
                        {isGenerating ? 'Designing Plan...' : 'Start Building'}
                    </Button>
                </form>
            </Card>
        </div>
    )
}

function StudioWorkspace() {
    const store = useStudioStore()
    const { currentProject, currentStepIndex, currentCode, chatHistory, reviewStatus } = store

    const [output, setOutput] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)

    const currentStep = currentProject?.steps[currentStepIndex]

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory])

    if (!currentProject || !currentStep) return null

    const handleRun = async () => {
        setIsRunning(true)
        setOutput([])
        try {
            const result = currentProject.language === 'python'
                ? await runPythonCode(currentCode)
                : await runTypeScriptCode(currentCode)

            const logs = result.logs || []
            if (!result.success && result.error) {
                logs.push(`Error: ${result.error}`)
            }
            if (logs.length === 0) {
                logs.push('Code ran successfully (no output)')
            }
            setOutput(logs)
        } catch (e) {
            setOutput([`Runtime Error: ${e}`])
        }
        setIsRunning(false)
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden">
            {/* LEFT: Editor */}
            <div className="flex-1 flex flex-col border-r border-surface-700 bg-surface-900 min-w-0">
                {/* Step Header */}
                <div className="px-6 py-4 border-b border-surface-700 bg-surface-800/50">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-surface-100">{currentStep.title}</h2>
                        <Badge variant="accent">Step {currentStepIndex + 1} of {currentProject.steps.length}</Badge>
                    </div>
                    <p className="text-surface-300 text-sm">{currentStep.description}</p>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-hidden relative">
                    <LazyCodeEditor
                        code={currentCode}
                        onChange={store.updateCode}
                        language={currentProject.language}
                        height="100%"
                    />
                </div>

                {/* Output Area */}
                <div className="h-48 border-t border-surface-700 bg-black/50 overflow-y-auto p-4 font-mono text-sm">
                    <div className="flex items-center justify-between mb-2 sticky top-0">
                        <span className="text-surface-500 uppercase tracking-wider text-xs font-bold">Terminal Output</span>
                        {isRunning && <span className="text-accent-400 animate-pulse">Running...</span>}
                    </div>
                    <div className="space-y-1">
                        {output.map((line, i) => (
                            <div key={i} className={line.startsWith('Error:') ? 'text-danger-400' : 'text-surface-300'}>
                                {line}
                            </div>
                        ))}
                        {output.length === 0 && !isRunning && <span className="text-surface-600 italic">No output yet</span>}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="p-4 border-t border-surface-700 bg-surface-800 flex items-center gap-3">
                    <Button variant="primary" onClick={handleRun} isLoading={isRunning}>
                        Run Code
                    </Button>
                    <Button variant="secondary" onClick={() => store.requestReview()} isLoading={store.isReviewing}>
                        Review Code
                    </Button>
                    <div className="ml-auto flex items-center gap-3">
                        {store.currentStepIndex > 0 && (
                            <Button variant="ghost" onClick={store.prevStep}>Back</Button>
                        )}
                        <Button
                            variant={reviewStatus === 'pass' ? 'success' : 'outline'}
                            onClick={store.nextStep}
                            className={reviewStatus === 'pass' ? 'animate-pulse' : ''}
                        >
                            Next Step
                        </Button>
                    </div>
                </div>
            </div>

            {/* RIGHT: Vibe Tutor Chat */}
            <div className="w-full md:w-[400px] flex flex-col bg-surface-800/30">
                <div className="p-4 border-b border-surface-700 font-bold text-accent-400 flex items-center gap-2">
                    <span className="text-xl">✨</span> Vibe Tutor
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[85%] rounded-2xl p-4 text-sm whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-accent-600 text-white rounded-tr-none'
                                        : 'bg-surface-700 text-surface-200 rounded-tl-none border border-surface-600'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {store.isChatting && (
                        <div className="flex justify-start">
                            <div className="bg-surface-700 rounded-2xl p-4 rounded-tl-none border border-surface-600">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-surface-700 bg-surface-800/80 backdrop-blur">
                    <ChatInput onSend={store.sendMessage} disabled={store.isChatting} />
                </div>
            </div>
        </div>
    )
}

function ChatInput({ onSend, disabled }: { onSend: (msg: string) => void, disabled: boolean }) {
    const [msg, setMsg] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!msg.trim() || disabled) return
        onSend(msg)
        setMsg('')
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Ask for help..."
                className="w-full pl-4 pr-12 py-3 bg-surface-900 border border-surface-600 rounded-xl focus:outline-none focus:border-accent-500 text-surface-200 placeholder-surface-500"
            />
            <button
                type="submit"
                disabled={!msg.trim() || disabled}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-surface-400 hover:text-accent-400 disabled:opacity-50 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </form>
    )
}
