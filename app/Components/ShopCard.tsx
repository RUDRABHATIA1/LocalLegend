import React from 'react'
import { CircleChevronRight, Star } from 'lucide-react'

import Image, { StaticImageData } from 'next/image'

type ShopCardProps ={
    name: string
    tagline: string
    noOfProduct: number
    noOfSale: number
    noOfStar: number
    distance: number
    image: StaticImageData

}

const ShopCard : React.FC<ShopCardProps> = ({image,name,tagline,noOfProduct,noOfSale,noOfStar, distance}) => {


  return (
    <div className="w-[320px] shrink-0 bg-gray-100 rounded-2xl border-4">
      
      <div className="h-40 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt="Shop Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col p-4 gap-y-3">
        <h1 className="text-gray-800 text-xl font-bold text-center">
          {name}
        </h1>

        <p className="text-blue-500 text-sm text-center">
          {tagline}
        </p>

        <div className="bg-gray-200 flex justify-between rounded-2xl text-gray-500 text-sm px-3 py-2">
          <span>{noOfProduct} Products</span>
          <span>Sales: {noOfSale}</span>
          <span className="flex items-center gap-1">
            {noOfStar} <Star size={14} fill="yellow" stroke="black" />
          </span>
        </div>

        <div className='flex flex-row'>   
            <p className="text-center text-sm ml-24">Distance: {distance}km</p> 
            <CircleChevronRight className='ml-16 hover:bg-black hover:text-white rounded-full' />
        </div>

              
      </div>

      
    </div>
  )
}

export default ShopCard
