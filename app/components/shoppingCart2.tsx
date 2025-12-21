"use client"
import { useState, useEffect, useRef } from 'react'
import { 
  ShoppingCart, Plus, Minus, Trash2, X, Check, 
  Coffee, Shirt, Package, AlertCircle 
} from 'lucide-react'

type CartItem = {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

type Notification = {
  id: string // Changed to string for UUID
  message: string
  type: 'success' | 'error' | 'info'
}

export default function ShoppingCartComponent() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Coffee Mug", quantity: 1, price: 19.99, image: "/coffee-mug.jpg" },
    { id: 2, name: "Premium T-Shirt", quantity: 2, price: 29.99, image: "/tshirt.jpg" }
  ])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Use ref to track notification counter to avoid closures
  const notificationCounter = useRef(0)

  const products = [
    { id: 1, name: "Coffee Mug", price: 19.99, image: "/coffee-mug.jpg", icon: Coffee },
    { id: 2, name: "Premium T-Shirt", price: 29.99, image: "/tshirt.jpg", icon: Shirt },
    { id: 3, name: "Headphones", price: 89.99, image: "/headphones.jpg", icon: Package },
    { id: 4, name: "Notebook", price: 12.99, image: "/notebook.jpg", icon: Package },
  ]

  // Generate unique ID for notifications
  const generateNotificationId = () => {
    return `notification-${Date.now()}-${notificationCounter.current++}`
  }

  // Add notification with deduplication
  const addNotification = (message: string, type: Notification['type'] = 'success') => {
    const id = generateNotificationId()
    
    // Prevent duplicate messages within 500ms
    const hasRecentDuplicate = notifications.some(n => 
      n.message === message && 
      Date.now() - parseInt(n.id.split('-')[1]) < 500
    )
    
    if (hasRecentDuplicate) return
    
    setNotifications(prev => [...prev, { id, message, type }])
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Add item to cart - FIXED: Only one notification per action
  const handleAddToCart = (product: typeof products[0]) => {
    setIsAnimating(true)
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        // Increase quantity
        const updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        
        // Show notification (only once)
        addNotification(`Increased ${product.name} quantity to ${existingItem.quantity + 1}`, 'info')
        return updatedCart
      } else {
        // Add new item
        const newItem = { 
          id: product.id, 
          name: product.name, 
          quantity: 1, 
          price: product.price,
          image: product.image
        }
        addNotification(`Added ${product.name} to cart!`, 'success')
        return [...prevCart, newItem]
      }
    })

    // Trigger cart animation
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Update quantity - FIXED: Only one notification per action
  const handleUpdateQuantity = (itemId: number, delta: number) => {
    let notificationShown = false
    
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === itemId)
      
      const updatedCart = prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta)
          
          // Show notification only once
          if (!notificationShown) {
            if (delta > 0) {
              addNotification(`Increased ${item.name} quantity`, 'info')
            } else if (delta < 0 && item.quantity === 1) {
              addNotification(`Removed ${item.name} from cart`, 'error')
            }
            notificationShown = true
          }
          
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(item => item.quantity > 0)
      
      return updatedCart
    })
  }

  // Remove item
  const handleRemoveItem = (itemId: number) => {
    const item = cart.find(i => i.id === itemId)
    if (item) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId))
      addNotification(`Removed ${item.name} from cart`, 'error')
    }
  }

  // Clear cart
  const handleClearCart = () => {
    if (cart.length === 0) return
    setCart([])
    addNotification('Cart cleared!', 'info')
  }

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      addNotification('Add items to cart before checkout', 'error')
      return
    }
    addNotification(`Processing order for $${calculateTotal().toFixed(2)}`, 'success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Shop<span className="text-blue-600">Now</span>
        </h1>
        <p className="text-gray-600">Add products to your cart and manage your shopping</p>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-6 h-6 text-blue-600" />
                  Our Products
                </h2>
                <div className="text-sm text-gray-500">
                  {products.length} items available
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => {
                  const Icon = product.icon
                  return (
                    <div
                      key={product.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-2xl font-bold text-gray-900 mt-1">
                            ${product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center gap-2"
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <Plus className="w-4 h-4" />
                              Add to Cart
                            </button>
                            <span className="text-xs text-gray-500">
                              In cart: {cart.find(item => item.id === product.id)?.quantity || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="relative">
            <div className="sticky top-8">
              {/* Cart Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ShoppingCart className="w-8 h-8 text-blue-600" />
                      {totalItems > 0 && (
                        <div className={`absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                          {totalItems}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                      <p className="text-sm text-gray-500">{totalItems} items</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearCart}
                    disabled={cart.length === 0}
                    className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Clear cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2 py-1">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                className="text-gray-600 hover:text-red-600 p-1"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium w-6 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                className="text-gray-600 hover:text-green-600 p-1"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Total & Checkout */}
                {cart.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">Free</span>
                    </div>
                    <div className="flex justify-between items-center mb-6 text-lg font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-2xl text-blue-600">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </div>
  )
}

// Notification Component
function NotificationItem({ 
  notification, 
  onClose 
}: { 
  notification: Notification
  onClose: () => void 
}) {
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200'
  }

  const icons = {
    success: <Check className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <AlertCircle className="w-5 h-5 text-blue-600" />
  }

  return (
    <div className={`
      ${bgColors[notification.type]}
      border rounded-xl shadow-lg p-4 min-w-[300px] max-w-md
      animate-slideInRight
      flex items-start gap-3
    `}>
      {icons[notification.type]}
      <div className="flex-1">
        <p className="text-gray-900 font-medium">{notification.message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}