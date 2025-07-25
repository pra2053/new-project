import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "danger" | "success"
  size?: "small" | "medium" | "large"
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-[#0066cc] text-white hover:bg-[#0052a3] disabled:bg-gray-300",
    secondary: "bg-[#6c757d] text-white hover:bg-[#5a6268] disabled:bg-gray-300",
    outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
    danger: "bg-[#dc3545] text-white hover:bg-[#bb2d3b] disabled:bg-gray-300",
    success: "bg-[#28a745] text-white hover:bg-[#218838] disabled:bg-gray-300",
  }

  const sizes = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 md:px-6 py-2 text-sm",
    large: "px-6 md:px-8 py-3 text-base",
  }

  return (
    <button
      className={cn(
        "rounded font-medium transition-colors disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
