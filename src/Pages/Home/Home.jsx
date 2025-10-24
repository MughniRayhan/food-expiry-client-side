import React from 'react'
import Banner from './Banner'
import ExpiredFood from './ExpiredFood'
import StorageTips from './StorageTips'
import Faq from './Faq'
import Tips from './Tips'

function Home() {
  
  return (
    <div>
      <Banner/>
      <ExpiredFood/>
      <StorageTips/>
      <Tips/>
      <Faq/>
    </div>
  )
}

export default Home