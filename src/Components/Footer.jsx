import React from 'react'
import { FaFacebook} from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link, NavLink } from 'react-router';
function Footer() {
  return (
        <div >
            <div className='  md:px-20 px-10 w-full bg-base-100 py-10 border-t border-primary'>
         <div className='flex flex-col md:flex-row justify-between items-center md:max-w-7xl mx-auto w-full gap-8'>

            <div >
       <div className='flex items-center '>
     <img className='w-10' src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png" alt="" />
   <h2 className='text-2xl text-accent font-bold'>Food<span className='text-primary '>Guard</span></h2>
   </div>
        <p className='text-gray-500 mt-2 sm:text-base text-sm sm:w-90'>FoodGuard is a web app that helps users track food items and get 
alerts before they expire. It aims to reduce food waste by allowing users to add, view, 
update, and manage food with expiry dates. </p>
       
       </div>

            <div >
            
             <h3 className=' text-lg text-secondary   '>Useful Links</h3>
             <div className='flex flex-col gap-4 mt-4 items-center'>
                 <li className=' text-accent hover:text-accent '><NavLink to='/' >Home</NavLink></li>
        <li className=' text-accent  hover:text-accent '><NavLink to='/fridge'>Fridge</NavLink></li>
         <li className=' text-accent hover:text-accent '><Link to='/login' >Login</Link></li>
             </div>
            
            
            
            </div>

            <div>
 <h3 className='text-xl text-accent mt-4'>Get in Touch</h3>
        <div className='flex flex-col gap-4 mt-3 text-base sm:text-xl'>
            <p className=' text-secondary text-sm sm:text-base flex gap-3 items-center'><FaPhoneAlt className='text-accent '/><span>+88 01746423366</span></p>
             <p className='text-secondary text-sm sm:text-base flex gap-3 items-center'><MdEmail className='text-accent '/><span>mughnirayhan22@gmail.com</span></p>
             <p className='text-secondary text-sm sm:text-base flex gap-3 items-center'><FaLocationDot className='text-accent '/><span>Baruthkhana Point,Sylhet</span></p>
        </div>
        <div className='flex gap-2 my-5 text-3xl text-primary mt-8 cursor-pointer '>
<li><a href="https://www.facebook.com/mughni.rayhan.tisha"><FaFacebook /></a></li>
<li><a href="https://github.com/MughniRayhan"><FaGithub/></a></li>
<li><a href="https://www.linkedin.com/in/mughni-rayhan-1aa587317/"><FaLinkedin/></a></li>
<li><a href="https://www.instagram.com/tisha_rayhan/"><FaInstagram/></a></li>
        </div>
            </div>
         </div>
        
            </div>
            <div className='bg-secondary    p-4'>
             <p className='text-center text-white text-base'> Copyright © 2025 -  <span className='text-xl  rancho'> All right reserved by FoodGuard</span></p>
            </div>
        </div>
  )
}

export default Footer