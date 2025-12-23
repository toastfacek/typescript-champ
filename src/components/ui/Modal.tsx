import { useEffect, useRef, useContext, createContext, ReactNode, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'

interface ModalContextValue {
  onClose: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal components must be used within Modal')
  }
  return context
}

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  variant?: 'default' | 'danger' | 'fullscreen'
  className?: string
}

export function Modal({
  children,
  isOpen,
  onClose,
  variant = 'default',
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Focus the modal
    const modal = modalRef.current
    if (modal) {
      const firstFocusable = modal.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    }

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Handle focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modal) return

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTab)

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)
      document.body.style.overflow = ''
      // Restore focus
      previousActiveElement.current?.focus()
    }
  }, [isOpen, onClose])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const variants = {
    default: 'max-w-lg',
    danger: 'max-w-lg',
    fullscreen: 'max-w-full h-full m-0 rounded-none',
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-surface-900/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={clsx(
          'relative z-10 w-full rounded-2xl border border-surface-700/50',
          'bg-surface-800/95 backdrop-blur-xl shadow-2xl',
          variants[variant],
          className
        )}
      >
        <ModalContext.Provider value={{ onClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between p-6 border-b border-surface-700/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export function ModalTitle({ children, className, ...props }: ModalTitleProps) {
  return (
    <h2
      id="modal-title"
      className={clsx('text-xl font-heading font-semibold text-surface-50', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

interface ModalCloseButtonProps {
  className?: string
}

export function ModalCloseButton({ className }: ModalCloseButtonProps) {
  const { onClose } = useModalContext()

  return (
    <button
      onClick={onClose}
      className={clsx(
        'p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-700/50',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500',
        className
      )}
      aria-label="Close modal"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ModalBody({ children, className, ...props }: ModalBodyProps) {
  return (
    <div className={clsx('p-6', className)} {...props}>
      {children}
    </div>
  )
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-end gap-3 p-6 border-t border-surface-700/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Compound component exports
Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.CloseButton = ModalCloseButton
Modal.Body = ModalBody
Modal.Footer = ModalFooter

