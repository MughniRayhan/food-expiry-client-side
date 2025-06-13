import React from 'react'
import Banner from '../Components/Banner'
import NearlyExpiryItems from '../Components/NearlyExpiryItems'
import ExpiredFood from '../Components/ExpiredFood'
import FoodUsageSuggestions from '../Components/FoodUsageSuggestions'

function Home() {
  
  return (
    <div>
      <Banner/>
      <NearlyExpiryItems/>
      <ExpiredFood/>
      <FoodUsageSuggestions/>
    </div>
  )
}

export default Home