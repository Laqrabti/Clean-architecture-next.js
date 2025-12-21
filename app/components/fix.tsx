"use client"
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // Fix this line:
    setCount(prev => prev + 1)
  }

  const handleReset = () => {
    // Fix this line:
    setCount(0)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={(prev) => setCount(prev + 1 )}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}