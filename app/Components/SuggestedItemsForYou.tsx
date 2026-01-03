'use client'

import React from 'react'
import ItemCard from './ItemCard'
import { useCart } from '../Context/CartContext'

const SuggestedItemsForYou = () => {
  const { selectedCategory, searchText } = useCart()

  const arr = {
    products: [
      { name: 'Dabur Red Tooth Powder', cost: 70, By: 'Dabur India Ltd', Dist: 44, categories: 'Beauty', type: 'Product' },
      { name: 'Lakme 9to5 Foundation', cost: 475, By: 'Lakme', Dist: 12, categories: 'Beauty', type: 'Product' },
      { name: 'Car Steering Wheel Cover', cost: 499, By: 'AutoTrend', Dist: 15, categories: 'Automobile', type: 'Product' },
      { name: 'Bike Mobile Holder', cost: 299, By: 'RidersPro', Dist: 22, categories: 'Automobile', type: 'Product' },
      { name: 'Nivea Soft Moisturizer', cost: 225, By: 'Nivea', Dist: 19, categories: 'Beauty', type: 'Product' },
    ],
    services: [
      { name: 'Car Washing Service', cost: 399, By: 'CleanRide', Dist: 6, categories: 'Automobile', type: 'Service' },
      { name: 'Home Facial Service', cost: 999, By: 'UrbanGlow', Dist: 8, categories: 'Beauty', type: 'Service' },
      { name: 'Bike Repair Service', cost: 299, By: 'SpeedFix', Dist: 11, categories: 'Automobile', type: 'Service' },
      { name: 'Hair Spa Service', cost: 799, By: 'StyleStudio', Dist: 14, categories: 'Beauty', type: 'Service' },
      { name: 'Car Interior Cleaning', cost: 1199, By: 'AutoShine', Dist: 9, categories: 'Automobile', type: 'Service' },
    ],
  }

  const allItems = [...arr.products, ...arr.services]

  const filteredItems = allItems
    .filter(item =>
      selectedCategory ? item.categories === selectedCategory : true
    )
    .filter(item =>
      searchText
        ? item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.By.toLowerCase().includes(searchText.toLowerCase()) ||
          item.type.toLowerCase().includes(searchText.toLowerCase())
        : true
    )

  return (
    <div>
      {/* HEADING */}
      <div className="w-full flex items-center justify-center mt-10">
        <h1 className="text-4xl text-gray-800 font-bold">
          Recommended Items
        </h1>
      </div>

      {/* ITEMS */}
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ItemCard
              key={index}      // React key
              id={index + 1}   // Cart logic id
              {...item}
            />
          ))
        ) : (
          <h2 className="text-xl mt-10 text-gray-500">
            No items found
          </h2>
        )}
      </div>
    </div>
  )
}

export default SuggestedItemsForYou
