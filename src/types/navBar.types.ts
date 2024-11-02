export interface IChangePasswordRequest {
  old_password: string
  new_password: string
  confirm_password: string
}

export interface IChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}
