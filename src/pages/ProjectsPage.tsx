import { useEffect } from 'react'
import { Button, Card, Badge, ProgressBar } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { useStudioStore } from '@/store/studio-store'
import type { StudioProject } from '@/types/studio'

export function ProjectsPage() {
    const navigate = useNavigate()
    const { savedProjects, loadProject, deleteProject, fetchProjects, isFetching } = useStudioStore()

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const handleOpenProject = (id: string) => {
        loadProject(id)
    }

    const handleNewProject = () => {
        navigate('/studio/new')
    }

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-surface-100 mb-2">My Projects</h1>
                    <p className="text-xl text-surface-400">Manage your Vibe Coding Studio projects</p>
                </div>
                <Button onClick={handleNewProject} variant="primary" className="shadow-lg shadow-accent-500/20">
                    + New Project
                </Button>
            </div>

            {isFetching && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
                </div>
            )}

            {!isFetching && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProjects.map((project: StudioProject) => (
                        <div key={project.id} onClick={() => handleOpenProject(project.id)} className="cursor-pointer group h-full">
                            <Card hover className="h-full flex flex-col relative border-surface-700 bg-surface-800/50 hover:bg-surface-800 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <Badge variant={project.language === 'typescript' ? 'accent' : 'warning'}>
                                        {project.language === 'python' ? 'Python' : 'TypeScript'}
                                    </Badge>
                                    <button
                                        onClick={(e) => handleDelete(e, project.id)}
                                        className="text-surface-500 hover:text-danger-400 transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-surface-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <h3 className="text-xl font-heading font-bold text-surface-100 mb-2 group-hover:text-accent-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-surface-400 text-sm mb-8 flex-1 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-surface-700/50">
                                    <div className="flex items-center justify-between text-xs text-surface-500 mb-2">
                                        <span>Last edited {new Date(project.updatedAt).toLocaleDateString()}</span>
                                        <span>Module {1}/{project.modules.length}</span>
                                    </div>
                                    <ProgressBar progress={0.1} size="sm" color="accent" />
                                </div>
                            </Card>
                        </div>
                    ))}

                    {savedProjects.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-surface-700 rounded-2xl bg-surface-900/30">
                            <div className="mb-6">
                                <span className="text-6xl animate-pulse inline-block">✨</span>
                            </div>
                            <h3 className="text-2xl font-bold text-surface-100 mb-2">No projects yet</h3>
                            <p className="text-large text-surface-400 mb-8 max-w-md mx-auto">
                                Start a new project to generate a custom learning path and build something amazing.
                            </p>
                            <Button onClick={handleNewProject} variant="outline" size="lg">
                                Create Your First Project
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
