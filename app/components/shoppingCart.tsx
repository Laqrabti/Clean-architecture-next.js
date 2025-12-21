"use client"
import { useState } from 'react'

type CartItem = {
  id: number
  name: string
  quantity: number
}

export default function AddToCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [notification, setNotification] = useState('')

  // Add item to cart
  const handleAddToCart = (productId: number, productName: string) => {
    // Check if item already in cart
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      
      if (existingItem) {
        // Increase quantity
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item
        return [...prevCart, { id: productId, name: productName, quantity: 1 }]
      }
    })
    
    // Show notification
    setNotification(`Added ${productName} to cart!`)
    setTimeout(() => setNotification(''), 2000)
  }

  // Remove item from cart
  const handleRemoveItem = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  return (
    <div>
      {/* Product buttons */}
      <button onClick={() => handleAddToCart(1, "Coffee Mug")}>
        Add Coffee Mug
      </button>
      
      <button onClick={() => handleAddToCart(2, "T-Shirt")}>
        Add T-Shirt  
      </button>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Cart display */}
      <div className="cart">
        <h3>Cart ({cart.length} items)</h3>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x {item.quantity}</span>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}