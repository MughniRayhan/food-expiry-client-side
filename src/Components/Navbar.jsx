import React, { use, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { toast } from 'react-toastify';
import UseAuth from '../Hooks/UseAuth';


function Navbar() {
const {user,setUser,logOut} = UseAuth()
const [name,setName] = useState("")
 const [theme, setTheme] = useState("light");
console.log(user)
useEffect(()=>{
 if (user?.displayName) {
      setName(user.displayName);
    } else {
      setName("Guest User");
    }
    
},[user])

// theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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


const toggle = <>
  <input type="checkbox" onChange={toggleTheme} checked={theme === "light"} className="theme-controller" value="synthwave" />


  {/* moon icon */}
  <svg
    className="swap-on sm:h-10 sm:w-10 fill-current h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>

  {/* sun icon */}
  <svg
    className="swap-off sm:h-10 sm:w-10 h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>
</>

const toggleSmallDevice = (
  <div className="flex items-center gap-4">
    {/* Light mode option */}
    <label className="flex items-center gap-2 cursor-pointer text-sm text-accent">
      <input
        type="radio"
        name="theme"
        value="light"
        checked={theme === "light"}
        onChange={() => toggleTheme("light")}
        className="radio radio-sm"
      />
      Light
    </label>

    {/* Dark mode option */}
    <label className="flex items-center gap-2 cursor-pointer text-sm text-accent">
      <input
        type="radio"
        name="theme"
        value="dark"
        checked={theme === "dark"}
        onChange={() => toggleTheme("dark")}
        className="radio radio-sm"
      />
      Dark
    </label>
  </div>
);

const linksBeforeLogin = <>
 <li className='text-lg text-accent  hover:text-accent '><NavLink to='/' >Home</NavLink></li>
<li className='text-lg text-accent  hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
</>

const linksAfterLogin = <>
 <li className='text-lg text-accent  hover:text-accent '><NavLink to='/' >Home</NavLink></li>
<li className='text-lg text-accent   hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
<li className='text-lg text-accent   hover:text-accent '><NavLink to='/addfood' > Add Food</NavLink></li>
<li className='text-lg text-accent   hover:text-accent '><NavLink to='/myitems'> My Items</NavLink></li>
<li className='text-lg text-accent   hover:text-accent '><NavLink to='/wasted-food'>Wasted Food</NavLink></li>
</>

  return (
    <nav className='w-full  top-0   z-10 fixed'>
        <div className="navbar bg-base-100  shadow-sm sm:px-12 px-3 absolute">
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
        <label className=" sm:swap swap-rotate ">
  {/* this hidden checkbox controls the state */}
{toggleSmallDevice}
</label>
      </ul>
    </div>
   <div className='flex items-center '>
     <img className='w-10' src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png" alt="" />
   <h2 className='text-base sm:text-2xl text-accent  font-bold'>Food<span className='text-primary '>Guard</span></h2>
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

  <label className="sm:swap swap-rotate  hidden ">
  {/* this hidden checkbox controls the state */}
{toggle}
</label>

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