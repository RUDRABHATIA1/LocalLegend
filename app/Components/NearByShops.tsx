'use client'

import React, { useRef, useState, MouseEvent, TouchEvent } from "react";
import ShopCard from "./ShopCard";

import Shop1 from '../assets/Shop1.jpg'
import Shop2 from '../assets/Shop2.jpg'
import Shop3 from '../assets/Shop3.jpg'
import Shop4 from '../assets/Shop4.jpg'
import Shop5 from '../assets/Shop5.jpg'
import Shop6 from '../assets/Shop6.jpg'
import Shop7 from '../assets/Shop7.jpg'
import Shop8 from '../assets/Shop8.jpg'
import Shop9 from '../assets/Shop9.jpg'
import Shop10 from '../assets/Shop10.jpg'

type ShopData = {
  image: any
  name: string
  tagline: string
  noOfProduct: number
  noOfSale: number
  noOfStar: number
  distance: number
}

const NearByShops: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  /* ---------------- JSON DATA ---------------- */
  const shopsData: ShopData[] = [
    { image: Shop1, name: "Near Horizon", tagline: "Serving Since 1990", noOfProduct: 20, noOfSale: 0, noOfStar: 5, distance: 22 },
    { image: Shop2, name: "Urban Cart", tagline: "Quality You Can Trust", noOfProduct: 35, noOfSale: 210, noOfStar: 4, distance: 5 },
    { image: Shop3, name: "Daily Needs Hub", tagline: "Everything Under One Roof", noOfProduct: 50, noOfSale: 340, noOfStar: 4, distance: 12 },
    { image: Shop4, name: "FreshMart", tagline: "Freshness Delivered Daily", noOfProduct: 28, noOfSale: 180, noOfStar: 5, distance: 8 },
    { image: Shop5, name: "Local Legend", tagline: "Trusted by Generations", noOfProduct: 60, noOfSale: 520, noOfStar: 5, distance: 15 },
    { image: Shop6, name: "QuickBuy Store", tagline: "Fast. Easy. Reliable.", noOfProduct: 22, noOfSale: 95, noOfStar: 4, distance: 3 },
    { image: Shop7, name: "Value Bazaar", tagline: "Best Deals Everyday", noOfProduct: 45, noOfSale: 400, noOfStar: 4, distance: 18 },
    { image: Shop8, name: "Green Basket", tagline: "Healthy & Organic Choices", noOfProduct: 30, noOfSale: 260, noOfStar: 5, distance: 10 },
    { image: Shop9, name: "Neighborhood Store", tagline: "Always Around You", noOfProduct: 18, noOfSale: 75, noOfStar: 3, distance: 1 },
    { image: Shop10, name: "Smart Shopper", tagline: "Shop Smarter, Live Better", noOfProduct: 40, noOfSale: 310, noOfStar: 4, distance: 6 }
  ]

  /* ---------------- SORT (Ascending Distance) ---------------- */
  const sortedShops = [...shopsData].sort(
    (a, b) => a.distance - b.distance
  )

  /* ---------------- Drag Handlers ---------------- */
  const mouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-x-6 overflow-hidden cursor-grab select-none"
      onMouseDown={mouseDownHandler}
      onMouseLeave={() => setIsDragging(false)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={mouseMoveHandler}
      onTouchStart={(e) => {
        if (!containerRef.current) return
        setIsDragging(true)
        setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
      }}
      onTouchMove={(e) => {
        if (!isDragging || !containerRef.current) return
        const x = e.touches[0].pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2
        containerRef.current.scrollLeft = scrollLeft - walk
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      
      
      {sortedShops.map((shop, index) => (
        <ShopCard
          key={index}
          image={shop.image}
          name={shop.name}
          tagline={shop.tagline}
          noOfProduct={shop.noOfProduct}
          noOfSale={shop.noOfSale}
          noOfStar={shop.noOfStar}
          distance={shop.distance}
        />
      ))}
    </div>
  )
}

export default NearByShops
