import React from 'react'

export function Card({ children }) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  )
}

export function CardHeader({ children }) {
  return <div className="p-6 space-y-6">{children}</div>
}

export function CardFooter({ children }) {
  return <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-2">{children}</div>
}