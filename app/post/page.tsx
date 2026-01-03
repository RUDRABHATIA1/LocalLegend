'use client'

import React from 'react'
import { CartProvider } from '../Context/CartContext'
import Feed from '../Components/Feed'

const PostPage = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Community Feed</h1>
        <Feed />
      </div>
    </CartProvider>
  )
}

export default PostPage
