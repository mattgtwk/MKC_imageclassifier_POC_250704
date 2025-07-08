import { X } from 'lucide-react'
import React from 'react'

interface CardProps {
  title?: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export default function Card({ title, children, onClose, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-700 bg-[#111] shadow-lg/10 overflow-hidden ${className}`}
    >
      <div className="relative">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gray-600" />
        {title && (
          <div className="px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="px-6 pb-6">{children}</div>
    </div>
  )
} 