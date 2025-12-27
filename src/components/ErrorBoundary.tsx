import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    isChunkError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        isChunkError: false,
    }

    public static getDerivedStateFromError(error: Error): State {
        const isChunkError =
            error.message.includes('Failed to fetch dynamically imported module') ||
            error.message.includes('Importing a module script failed') ||
            error.name === 'ChunkLoadError'

        // If it's a chunk error, we can try to reload immediately?
        // But it's better to show UI or do it once.
        // Let's show UI first to be safe, or auto-reload if we can track it.
        // For now, let's show a user friendly UI.

        return {
            hasError: true,
            isChunkError
        }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    private handleReload = () => {
        window.location.reload()
    }

    public render() {
        if (this.state.hasError) {
            if (this.state.isChunkError) {
                return (
                    <div className="min-h-screen flex items-center justify-center bg-surface-900 p-4">
                        <div className="max-w-md w-full bg-surface-800 border border-surface-700 rounded-lg shadow-xl p-8 text-center">
                            <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-surface-100 mb-3">
                                Update Available
                            </h1>
                            <p className="text-surface-400 mb-8">
                                A new version of the app is available. Please reload to get the latest updates.
                            </p>
                            <Button size="lg" glow onClick={this.handleReload} className="w-full">
                                Reload Page
                            </Button>
                        </div>
                    </div>
                )
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-surface-900 p-4">
                    <div className="max-w-md w-full bg-surface-800 border border-surface-700 rounded-lg shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-error-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-surface-100 mb-3">
                            Something went wrong
                        </h1>
                        <p className="text-surface-400 mb-8">
                            We encountered an unexpected error. Please try reloading the page.
                        </p>
                        <Button size="lg" glow onClick={this.handleReload} className="w-full">
                            Reload Page
                        </Button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
