import { Modal, Button } from '@/components/ui'

interface SignOutConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function SignOutConfirmModal({ isOpen, onClose, onConfirm }: SignOutConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="danger">
      <Modal.Header>
        <Modal.Title className="text-surface-50">Sign Out?</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <Modal.Body>
        <p className="text-surface-200">
          Are you sure you want to sign out? Your progress is synced and will be available when you sign back in.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Sign Out
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
