'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MapPinCheckInside, Heart, Plus, Minus } from 'lucide-react'
import { useCart } from '../Context/CartContext'

  type ItemCardProps = {
  id: number
  name: string
  cost: number
  By: string
  Dist: number
  image: string
}


const ItemCard = ({ id, name, cost, By, Dist, image }: ItemCardProps) => {
  const { addToCart, removeFromCart, cartItems } = useCart()
  const [liked, setLiked] = useState(false)

  const cartItem = cartItems.find(item => item.id === id)
  const inCart = !!cartItem

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price: cost,
      quantity: 1,
      image: image || '/items/1.jpeg',
      By,
      Dist,
    })
  }



  const increaseQty = () => {
    addToCart({ ...cartItem, quantity: 1 })
  }

  const decreaseQty = () => {
    if (cartItem.quantity === 1) removeFromCart(id)
    else removeFromCart(id)
  }

  return (
    <div
      className="
        relative flex flex-col rounded-2xl border
        p-2 sm:p-3
        w-[45vw] sm:w-[260px] md:w-[280px]
        h-auto sm:h-[350px]
        bg-white shadow-sm hover:shadow-md transition
      "
    >
      {/* ❤️ Heart */}
      <Heart
        size={20}
        className="absolute top-2 right-2 z-10 cursor-pointer"
        stroke={liked ? 'red' : 'black'}
        fill={liked ? 'red' : 'none'}
        onClick={() => setLiked(!liked)}
      />

      {/* 🖼 Image */}
      <div className="relative w-full h-[150px] sm:h-[170px] flex items-center justify-center overflow-hidden">
        <Image
          src={image || '/items/1.jpeg'}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      {/* 📄 DETAILS (flex-grow to push cart section down) */}
      <div className="flex flex-col flex-grow mt-2 gap-1 text-sm">
        <h1 className="font-semibold text-base sm:text-lg line-clamp-2">
          {name}
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold">
          ₹{cost}
        </h2>

        <p className="text-gray-600 text-xs sm:text-sm">
          Delivered By: <span className="font-medium">{By}</span>
        </p>

        <p className="flex items-center gap-1 text-xs sm:text-sm">
          <MapPinCheckInside size={14} /> {Dist} km
        </p>
      </div>

      {/* 🛒 CART ACTIONS — ALWAYS AT BOTTOM */}
      <div className="mt-auto pt-2">
        {!inCart ? (
          <button
            onClick={handleAdd}
            className="w-full py-2 rounded-xl font-semibold bg-green-500 text-white text-sm sm:text-base"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Quantity */}
            <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2">
              <button onClick={decreaseQty} className="p-1 bg-white rounded">
                <Minus size={14} />
              </button>

              <span className="font-semibold text-sm">
                {cartItem.quantity}
              </span>

              <button onClick={increaseQty} className="p-1 bg-white rounded">
                <Plus size={14} />
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(id)}
              className="w-full py-2 rounded-xl font-semibold bg-red-500 text-white text-sm sm:text-base"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCard
