// /components/CartPage.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { useCart } from '../Context/CartContext'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const CartPage = () => {
  const { cartItems, cartCount, removeFromCart, updateQuantity } = useCart()

  const increaseQty = (id: number) => {
    const item = cartItems.find(i => i.id === id)
    if (item) updateQuantity(id, item.quantity + 1)
  }

  const decreaseQty = (id: number) => {
    const item = cartItems.find(i => i.id === id)
    if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1)
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-center gap-4">
        <DotLottieReact src="/animations/empty-cart.lottie" loop autoplay className="w-60 h-60" />
        <h2 className="text-3xl font-bold text-gray-700">Your cart is empty.</h2>
        <p className="text-gray-500 text-xl">Browse items and add them to your cart to get started!</p>
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-600">Your Cart ({cartCount})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-4 border-2 bg-blue-50 rounded-lg">
            <Image src={item.image} alt={item.name} width={100} height={100} className="object-cover rounded mb-2 sm:mb-0" />
            <div className="flex-1 flex flex-col gap-1 sm:ml-4 text-center sm:text-left">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600 font-semibold text-lg">₹{item.price}</p>
              <p className="text-gray-500 text-md">Delivered By: {item.By}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                <button onClick={() => decreaseQty(item.id)} className="font-bold text-xl px-2 py-1 bg-white rounded hover:bg-gray-200">-</button>
                <span className="font-bold text-lg">{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)} className="font-bold text-xl px-2 py-1 bg-white rounded hover:bg-gray-200">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end items-center gap-6">
        <span className="text-xl font-semibold">Total: ₹{totalAmount}</span>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Proceed to Pay</button>
      </div>
    </div>
  )
}

export default CartPage
