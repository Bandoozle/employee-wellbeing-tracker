import React from 'react'

export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full font-edu flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#db6a59] hover:bg-[#c66152] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
    </button>
  )
}