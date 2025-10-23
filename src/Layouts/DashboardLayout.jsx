import React, { use } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { FaBullhorn, FaCheckCircle, FaCheckSquare, FaClipboardList, FaClock, FaLayerGroup, FaMoneyCheck, FaMoneyCheckAlt, FaTachometerAlt, FaTags, FaUsers, FaUsersCog } from 'react-icons/fa'
import { FaUserCircle } from "react-icons/fa";
import useUserRole from '../Hooks/useUserRole';

function DashboardLayout() {
  const {role,roleLoading} = useUserRole();
   
  return (
<div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
   
        {/* Navbar */}
    <div className="navbar bg-base-200 dark:bg-gray-900  text-white w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">Dashboard</div>
      
    </div>
    {/* Page content here */}
    <Outlet/>
  </div>
  <div className="drawer-side ">
     <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
<ul className="menu bg-base-200   min-h-full sm:w-80 w-[80%] p-4">
  <div className='flex items-center justify-between lg:hidden'>
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg></label>
      {/* Sidebar content here */}
     <Link to='/' className='flex items-center '>
     <img className='w-10' src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png" alt="" />
   <h2 className='text-base sm:text-2xl text-accent  font-bold'>Food<span className='text-primary '>Guard</span></h2>
   </Link>
  </div>
       <div className='mb-4 hidden lg:block border-b border-base-100/30 pb-4'>
        <Link to='/' className='flex items-center '>
     <img className='w-10' src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png" alt="" />
   <h2 className='text-base sm:text-2xl text-accent  font-bold'>Food<span className='text-primary '>Guard</span></h2>
   </Link>
   </div>    
     <NavLink to='/dashboard'  className="flex items-center gap-2 mt-5 text-lg  ">
     <FaTachometerAlt /> Dashboard
    </NavLink>
    
    <NavLink to="/dashboard/myProfile" className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUserCircle /> My Profile
</NavLink>





{
  !roleLoading && role==="admin" && 
  <>
  


<NavLink
  to='/dashboard/allUsers'  className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUsers /> All Users
</NavLink>

  </>
}
    </ul>
  </div>
</div>
  )
}

export default DashboardLayout