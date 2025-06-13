import React from 'react'
import Banner from '../Components/Banner'
import NearlyExpiryItems from '../Components/NearlyExpiryItems'
import ExpiredFood from '../Components/ExpiredFood'

function Home() {
  
  return (
    <div>
      <Banner/>
      <NearlyExpiryItems/>
      <ExpiredFood/>
    </div>
  )
}

export default Home