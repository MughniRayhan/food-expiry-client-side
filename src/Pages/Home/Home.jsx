import React from 'react'
import Banner from './Banner'
import NearlyExpiryItems from './NearlyExpiryItems'
import ExpiredFood from './ExpiredFood'
import StorageTips from './StorageTips'
import FoodUsageSuggestions from './FoodUsageSuggestions'

function Home() {
  
  return (
    <div>
      <Banner/>
      <NearlyExpiryItems/>
      <ExpiredFood/>
      <StorageTips/>
      <FoodUsageSuggestions/>
      
    </div>
  )
}

export default Home