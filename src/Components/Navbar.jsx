import React from 'react'
import { Link, NavLink } from 'react-router'



function Navbar() {
  return (
    <nav className='w-full '>
        <div className="navbar bg-base-100 shadow-sm sm:px-12 px-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       <li className='text-lg text-accent hover:text-accent '><NavLink to='/' >Home</NavLink></li>
        <li className='text-lg text-accent  hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
      </ul>
    </div>
   <div className='flex items-center '>
     <img className='w-10' src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png" alt="" />
   <h2 className='text-base sm:text-2xl text-accent font-bold'>Food<span className='text-primary '>Guard</span></h2>
   </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-base font-semibold">
        <li className='text-lg text-accent hover:text-accent '><NavLink to='/' >Home</NavLink></li>
        <li className='text-lg text-accent  hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
    </ul>
  </div>
<div className="navbar-end flex sm:gap-5 gap-2">
    <Link to='/login'>
  <button className="sm:border sm:border-secondary   text-primary   sm:px-5 sm:py-2 sm:rounded-md  sm:text-base text-sm   cursor-pointer sm:hover:text-white  sm:hover:bg-primary  duration-200">
    Login
  </button></Link>
  <Link to='/register'>
  <button className="sm:border sm:border-secondary  text-primary  sm:px-5 sm:py-2 sm:rounded-md  sm:text-base text-sm   cursor-pointer  sm:hover:text-white sm:hover:bg-primary    duration-200">
    Register
</button></Link>
</div>
  </div>
</nav>
  )
}

export default Navbar