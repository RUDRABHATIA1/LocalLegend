import React from 'react'
import Navbar from './Components/Navbar'
import Advertisement from './Components/Advertisement'
import NearByShops from './Components/NearByShops'
import SuggestedItemsForYou from './Components/SuggestedItemsForYou'
import Text from './Components/Text'

const page = () => {
  return (
    <div>
      <Navbar />
      <Advertisement/>
      <Text />
      <NearByShops/>
      <SuggestedItemsForYou/>
    </div>
  )
}

export default page
