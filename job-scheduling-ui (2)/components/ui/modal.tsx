"use client"

import { X } from "lucide-react"
import type { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  icon?: ReactNode
  children: ReactNode
  footer?: ReactNode
  maxWidth?: string
}

export const Modal = ({ isOpen, onClose, title, icon, children, footer, maxWidth = "max-w-2xl" }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-hidden`}>
        <div className="flex items-center gap-3 p-4 md:p-5 border-b bg-gray-50">
          {icon}
          <h2 className="text-lg font-semibold text-gray-900 flex-1">{title}</h2>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="p-4 md:p-5 overflow-y-auto max-h-[60vh]">{children}</div>
        {footer && <div className="flex justify-end gap-3 p-4 md:p-5 border-t bg-gray-50">{footer}</div>}
      </div>
    </div>
  )
}
