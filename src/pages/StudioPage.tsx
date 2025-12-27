import { useEffect, useState } from 'react'
import { useStudioStore } from '@/store/studio-store'
import { useNavigate } from 'react-router-dom'
import { Button, Badge } from '@/components/ui'
import { LazyCodeEditor } from '@/components/editor'

export function StudioPage() {
    const navigate = useNavigate()
    const { currentProject, activeFilePath, updateFile, setActiveFile, nextStep, prevStep } = useStudioStore()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    useEffect(() => {
        if (!currentProject) {
            navigate('/studio/projects')
        }
    }, [currentProject, navigate])

    if (!currentProject) return null

    const currentModule = currentProject.modules.find(m => m.id === currentProject.currentModuleId)
    const currentStep = currentModule?.steps.find(s => s.id === currentProject.currentStepId)
    const activeFileContent = currentProject.files[activeFilePath || ''] || ''

    return (
        <div className="h-[calc(100vh-4rem)] flex overflow-hidden bg-surface-950">
            {/* Sidebar: Roadmap */}
            <aside className={`bg-surface-900 border-r border-surface-800 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-80 shadow-2xl' : 'w-0'}`}>
                <div className="p-6 border-b border-surface-800 flex items-center justify-between overflow-hidden whitespace-nowrap">
                    <h2 className="font-heading font-bold text-surface-400 uppercase tracking-widest text-[10px]">Project Roadmap</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)} className="hover:bg-surface-800">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {currentProject.modules.map((module, mIdx) => (
                        <div key={module.id} className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${module.id === currentProject.currentModuleId ? 'bg-accent-500 text-surface-900 shadow-lg shadow-accent-500/20' : 'bg-surface-800 text-surface-500'
                                    }`}>
                                    {mIdx + 1}
                                </div>
                                <h3 className={`font-bold text-xs truncate ${module.id === currentProject.currentModuleId ? 'text-surface-100' : 'text-surface-500'}`}>
                                    {module.title}
                                </h3>
                            </div>

                            <div className="ml-3 pl-6 border-l border-surface-800 space-y-2">
                                {module.steps.map((step) => (
                                    <div
                                        key={step.id}
                                        className={`text-[11px] p-2 rounded-lg transition-all ${step.id === currentProject.currentStepId
                                            ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20 shadow-sm'
                                            : 'text-surface-500 hover:text-surface-300 hover:bg-surface-800/50'
                                            }`}
                                    >
                                        {step.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-surface-800 bg-surface-900">
                    <Button variant="outline" className="w-full text-[10px] h-8" onClick={() => navigate('/studio/projects')}>
                        Exit to Dashboard
                    </Button>
                </div>
            </aside>

            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="absolute left-6 bottom-6 z-50 p-4 rounded-full bg-accent-500 text-surface-900 shadow-2xl shadow-accent-500/40 hover:scale-110 active:scale-95 transition-all"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* Left: Instructions */}
                <div className="w-full md:w-[320px] lg:w-[400px] flex flex-col bg-surface-900 border-r border-surface-800 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-surface-800 bg-surface-900/80 backdrop-blur sticky top-0 z-10">
                        <Badge variant="accent" className="mb-2 opacity-80">Module {currentProject.modules.indexOf(currentModule!) + 1}</Badge>
                        <h1 className="text-xl font-heading font-bold text-surface-100 leading-tight">{currentStep?.title}</h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-surface-700">
                        <div className="whitespace-pre-wrap text-surface-300 leading-relaxed text-sm antialiased">
                            {currentStep?.content}
                        </div>

                        <div className="mt-8 pt-6 border-t border-surface-800">
                            <h4 className="text-[10px] font-bold text-surface-500 uppercase tracking-widest mb-4">Key Concepts</h4>
                            <div className="flex flex-wrap gap-2">
                                {currentStep?.relatedConcepts.map(c => (
                                    <Badge key={c} variant="default" className="text-[10px] border-surface-700 bg-surface-800/50">{c}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-surface-900 border-t border-surface-800 flex items-center justify-between gap-3">
                        <Button variant="ghost" size="sm" onClick={prevStep} className="flex-1 text-xs">Back</Button>
                        <Button variant="primary" size="sm" onClick={nextStep} className="flex-1 text-xs shadow-lg shadow-accent-500/20">Next Step</Button>
                    </div>
                </div>

                {/* Right: Code Editor & Terminal (Stub) */}
                <div className="flex-1 flex flex-col bg-surface-950 min-w-0">
                    <div className="h-11 border-b border-surface-800 flex items-center px-4 gap-2 bg-surface-900/50 backdrop-blur">
                        {Object.keys(currentProject.files).map(path => (
                            <button
                                key={path}
                                onClick={() => setActiveFile(path)}
                                className={`px-4 h-full text-[11px] font-mono transition-all border-b-2 flex items-center gap-2 ${activeFilePath === path
                                    ? 'text-accent-400 border-accent-400 bg-accent-400/5 antialiased font-bold'
                                    : 'text-surface-500 border-transparent hover:text-surface-300 hover:bg-surface-800'
                                    }`}
                            >
                                <svg className="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {path}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 min-h-0 relative group">
                        <LazyCodeEditor
                            code={activeFileContent}
                            onChange={(code) => updateFile(activeFilePath || '', code)}
                            language={currentProject.language}
                            height="100%"
                        />

                        {/* Interactive floating buttons can go here */}
                    </div>

                    {/* Bottom: Mock Terminal */}
                    <div className="h-32 bg-black/40 border-t border-surface-800 p-4 font-mono text-[11px] overflow-hidden">
                        <div className="flex items-center justify-between mb-2 text-surface-600 uppercase tracking-tighter">
                            <span>Terminal</span>
                            <span className="text-accent-500/50">Ready</span>
                        </div>
                        <div className="text-surface-400">$ {currentProject.language} main.{currentProject.language === 'typescript' ? 'ts' : 'py'}</div>
                        <div className="text-surface-500 mt-1">[Build System Active]</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
