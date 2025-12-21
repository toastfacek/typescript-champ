import { useEffect } from 'react'
import type { InstructionStep as InstructionStepType } from '@/types'

interface InstructionStepProps {
  step: InstructionStepType
  onComplete: () => void
}

export function InstructionStep({ step, onComplete }: InstructionStepProps) {
  // Instruction steps are automatically completed when viewed
  useEffect(() => {
    onComplete()
  }, [onComplete])

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeBlockContent = ''

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={index} className="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto font-mono text-sm">
              <code>{codeBlockContent.trim()}</code>
            </pre>
          )
          codeBlockContent = ''
        }
        inCodeBlock = !inCodeBlock
        return
      }

      if (inCodeBlock) {
        codeBlockContent += line + '\n'
        return
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4">
            {line.slice(2)}
          </h1>
        )
        return
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            {line.slice(3)}
          </h2>
        )
        return
      }

      // List items
      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-4 text-gray-700 mb-1">
            {renderInlineFormatting(line.slice(2))}
          </li>
        )
        return
      }

      // Empty lines
      if (line.trim() === '') {
        elements.push(<div key={index} className="h-2" />)
        return
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      )
    })

    return elements
  }

  // Handle **bold**, *italic*, `code`
  const renderInlineFormatting = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = []
    let remaining = text
    let keyIndex = 0

    // Process inline code first
    while (remaining.includes('`')) {
      const start = remaining.indexOf('`')
      const end = remaining.indexOf('`', start + 1)
      if (end === -1) break

      if (start > 0) {
        parts.push(renderBoldItalic(remaining.slice(0, start), keyIndex++))
      }
      parts.push(
        <code key={keyIndex++} className="bg-gray-100 text-primary-600 px-1.5 py-0.5 rounded text-sm font-mono">
          {remaining.slice(start + 1, end)}
        </code>
      )
      remaining = remaining.slice(end + 1)
    }

    if (remaining) {
      parts.push(renderBoldItalic(remaining, keyIndex))
    }

    return parts.length === 1 ? parts[0] : parts
  }

  const renderBoldItalic = (text: string, keyPrefix: number): React.ReactNode => {
    // Handle **bold**
    const boldRegex = /\*\*(.+?)\*\*/g
    const parts = text.split(boldRegex)

    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={`${keyPrefix}-bold-${i}`} className="font-semibold">{part}</strong>
      }
      // Handle *italic*
      const italicParts = part.split(/\*(.+?)\*/g)
      return italicParts.map((p, j) => {
        if (j % 2 === 1) {
          return <em key={`${keyPrefix}-italic-${i}-${j}`}>{p}</em>
        }
        return p
      })
    })
  }

  return (
    <div className="lesson-content">
      {step.title && (
        <div className="flex items-center gap-2 mb-4 text-primary-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-sm font-medium">Learn</span>
        </div>
      )}

      <div className="prose prose-gray max-w-none">
        {renderContent(step.content)}
      </div>

      {step.codeExample && (
        <div className="mt-6">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-gray-400 ml-2">
                {step.codeExample.language === 'typescript' ? 'TypeScript' : 'JavaScript'}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-gray-100">
                {step.codeExample.code.split('\n').map((line, i) => (
                  <div
                    key={i}
                    className={
                      step.codeExample?.highlight?.includes(i + 1)
                        ? 'bg-primary-500/20 -mx-4 px-4'
                        : ''
                    }
                  >
                    {line || ' '}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
