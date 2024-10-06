import React from 'react'

export function Input({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block font-edu text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        {...props}
        className="mt-1 font-edu block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )
}