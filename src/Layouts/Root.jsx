import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { ToastContainer} from 'react-toastify';

function Root() {
  return (
    <div className='poppins'>
      <ToastContainer/>
     <header>
      <Navbar/>
     </header>
      <main>
          <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Root