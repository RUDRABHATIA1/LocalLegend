'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItemType } from './types'

export type PostType = {
  _id: string
  name: string
  content: string
  image?: string
  createdAt: string
}

type CartContextType = {
  cartItems: CartItemType[]
  cartCount: number
  addToCart: (item: CartItemType) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  selectedCategory: string | null
  setSelectedCategory: (cat: string | null) => void
  showCategories: boolean
  setShowCategories: (val: boolean) => void
  activeMenu: string | null
  setActiveMenu: (val: string | null) => void
  searchText: string
  setSearchText: (val: string) => void
  showLogin: boolean
  setShowLogin: (val: boolean) => void

  posts: PostType[]
  addPost: (name: string, content: string, image?: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategories, setShowCategories] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [showLogin, setShowLogin] = useState(false)

  // --- Posts state ---
  const [posts, setPosts] = useState<PostType[]>([])

  // --- CART LOGIC ---
  const addToCart = (item: CartItemType) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    )
  }

  // --- POST LOGIC ---

  // Fetch posts from MongoDB on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()

        // Ensure posts is always an array
        if (Array.isArray(data)) {
          setPosts(data)
        } else if (data.post) {
          setPosts([data.post])
        } else {
          setPosts([])
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    }
    fetchPosts()
  }, [])

  // Add new post to MongoDB + Cloudinary
  const addPost = async (name: string, content: string, image?: string) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content, image })
      })
      const data = await res.json()

      // If API returns single post, add to array safely
      if (data && !Array.isArray(data)) {
        setPosts(prev => [data, ...prev])
      } else if (Array.isArray(data)) {
        setPosts(prev => [...data, ...prev])
      }
    } catch (err) {
      console.error('Error creating post:', err)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
        addToCart,
        removeFromCart,
        updateQuantity,
        selectedCategory,
        setSelectedCategory,
        showCategories,
        setShowCategories,
        activeMenu,
        setActiveMenu,
        searchText,
        setSearchText,
        posts,
        addPost,
        showLogin,
        setShowLogin
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}














































































