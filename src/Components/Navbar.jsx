import React, { use, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider'
import { toast } from 'react-toastify';


function Navbar() {
const {user,setUser,logOut} = use(AuthContext)
const [name,setName] = useState("")
console.log(user)

useEffect(()=>{
 if (user?.displayName) {
      setName(user.displayName);
    } else {
      setName("Guest User");
    }
    
},[user])

const handleLogOut = () => {
logOut()
.then(res=>{
toast.success("Logout successfully!")
setUser(null)
})
.catch(err=>{
toast.error(err.message)
})

}

const linksBeforeLogin = <>
 <li className='text-lg text-accent hover:text-accent '><NavLink to='/' >Home</NavLink></li>
<li className='text-lg text-accent  hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
</>

const linksAfterLogin = <>
 <li className='text-lg text-accent hover:text-accent '><NavLink to='/' >Home</NavLink></li>
<li className='text-lg text-accent  hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
<li className='text-lg text-accent hover:text-accent '><NavLink to='/addfood' > Add Food</NavLink></li>
<li className='text-lg text-accent  hover:text-accent '><NavLink to='/myitems'> My Items</NavLink></li>
</>

  return (
    <nav className='w-full absolute top-0 bg-base-100 z-10'>
        <div className="navbar bg-base-100 shadow-sm sm:px-12 px-3 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      {
          user? 
          linksAfterLogin
          :
          linksBeforeLogin
        }
      </ul>
    </div>
   <div className='flex items-center '>
     <img className='w-10' src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png" alt="" />
   <h2 className='text-base sm:text-2xl text-accent font-bold'>Food<span className='text-primary '>Guard</span></h2>
   </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1  font-medium">
        {
          user? 
          linksAfterLogin
          :
          linksBeforeLogin
        }
    </ul>
  </div>
<div className="navbar-end flex sm:gap-5 gap-2">
 {
  user?
  <>
 <div className='group flex-col justify-center items-center'>
   <img src={user?.photoURL} alt="" className='rounded-full sm:w-10 w-8 relative'/>
  <div className='bg-white text-sm p-3 text-accent hidden group-hover:block top-16  absolute'>
   
      {
        user.displayName?
        <p>
          {user.displayName}
        </p>
        :
        <p>
          Guest User
        </p>
      }
   </div>
 </div>
   <Link to='/'>
  <button onClick={handleLogOut}
  className="sm:border sm:border-secondary   text-primary   sm:px-5 sm:py-2 sm:rounded-md  sm:text-base text-sm   cursor-pointer sm:hover:text-white  sm:hover:bg-primary  duration-200">
    Logout
  </button></Link>

  </>
  :
  <>
     <Link to='/login'>
  <button className="sm:border sm:border-secondary   text-primary   sm:px-5 sm:py-2 sm:rounded-md  sm:text-base text-sm   cursor-pointer sm:hover:text-white  sm:hover:bg-primary  duration-200">
    Login
  </button></Link>
  <Link to='/register'>
  <button className="sm:border sm:border-secondary  text-primary  sm:px-5 sm:py-2 sm:rounded-md  sm:text-base text-sm   cursor-pointer  sm:hover:text-white sm:hover:bg-primary    duration-200">
    Register
</button></Link></>
 }
</div>
  </div>
</nav>
  )
}

export default Navbar