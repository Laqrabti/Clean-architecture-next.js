"use client"
import { useState, useEffect, useRef } from 'react'

const PRODUCTS = [
  "iPhone 15 Pro",
  "MacBook Air M3", 
  "iPad Pro",
  "Apple Watch",
  "AirPods Pro",
  "iMac 24-inch"
]

export default function LiveSearch() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
  // Debounce search - wait 300ms after user stops typing
  const debounceTimer = useRef<NodeJS.Timeout>()

  // Handle typing in search box
  const handleSearchTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    
    // Set new timer for debounce
    debounceTimer.current = setTimeout(() => {
      performSearch(value)
    }, 300)
  }

  // Actual search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }
    
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = PRODUCTS.filter(product =>
        product.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setLoading(false)
    }, 500)
  }

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return (
    <div className="search-container">
      <h2>Product Search</h2>
      
      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={handleSearchTyping}
        placeholder="Type to search products..."
        className="search-input"
      />
      
      {/* Loading indicator */}
      {loading && <div className="loading">Searching...</div>}
      
      {/* Search results */}
      <div className="results">
        {results.length > 0 ? (
          results.map((product, index) => (
            <div key={index} className="result-item">
              {product}
            </div>
          ))
        ) : search && !loading ? (
          <div className="no-results">No products found</div>
        ) : null}
      </div>
      
      {/* Typing feedback */}
      <div className="typing-feedback">
        {search && `Searching for: "${search}"`}
      </div>
    </div>
  )
}