import React from 'react'
import { Outlet, useNavigation } from 'react-router'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { ToastContainer} from 'react-toastify';
import Loader from '../Components/Loader';
function Root() {
  const state = useNavigation();
  return (
    <div className='poppins'>
      <ToastContainer/>
     <header>
      <Navbar/>
     </header>
      <main>
           {state=="loading" ? <Loader/> : <Outlet/>}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Root