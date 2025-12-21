"use client"
import { useState } from 'react'

export default function ProductCard() {
  const [isHovered, setIsHovered] = useState(false)
  const [quickView, setQuickView] = useState(false)

  // Mouse enters product card
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Mouse leaves product card  
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div 
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src="/product.jpg" alt="Product" />
      
      {/* Show quick view button on hover */}
      {isHovered && (
        <button 
          className="quick-view-btn"
          onClick={() => setQuickView(true)}
        >
          👁️ Quick View
        </button>
      )}
      
      {/* Quick view modal */}
      {quickView && (
        <div className="modal">
          <h3>Product Details</h3>
          <button onClick={() => setQuickView(false)}>Close</button>
        </div>
      )}
    </div>
  )
}