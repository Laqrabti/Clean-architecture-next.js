"use client"

import { useEffect, useState, useRef } from "react"
import { ShoppingCart, Plus, Minus, Trash2, X, Check, 
  Coffee, Shirt, Package, AlertCircle 
} from 'lucide-react'

type CartItem = {
    id: number,
    name: string,
    quantity: number,
    price: number,
    image: string
}

type Notification = {
    id: string,
    message: string,
    type: "success" | "error" | "info"
}

