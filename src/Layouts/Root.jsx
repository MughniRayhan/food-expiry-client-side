import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'

function Root() {
  return (
    <div className='poppins'>
      <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Root