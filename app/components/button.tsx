import React from 'react'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      data-testid="custom-button"
    >
      {children}
    </button>
  )
}

export default Button