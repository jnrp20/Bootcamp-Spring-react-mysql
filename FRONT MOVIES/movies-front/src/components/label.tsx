import React from 'react'

export default function Label({ children }: { children?: React.ReactNode }) {
    return (
      <div>
        <label htmlFor="title" className="block text-gray-700 mb-2">
          {children} 
        </label>
      </div>
    )
  }
