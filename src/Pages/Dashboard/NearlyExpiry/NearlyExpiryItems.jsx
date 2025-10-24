import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { motion } from "framer-motion"

function NearlyExpiryItems() {
    const [nearlyExpiry,setnearlyExpiry] = useState([])

   useEffect(() => {
    fetch("https://food-expiry-server-side.vercel.app/nearly-expiry") 
      .then(res => res.json())
      .then(data => {
        
        const nearlyExpiryItems = data.slice(0,6); 
        setnearlyExpiry(nearlyExpiryItems);
      })
     
  }, []);

  return (
    <motion.section 
           initial={{opacity:0, y:50}}
            whileInView={{opacity:1, y:0}}
            transition={{delay:0.2, duration:1}} 
            className='py-20 md:px-30 px-4  text-base w-full '>
        <h2 className='text-center text-3xl text-accent font-semibold'>Nearly <span className='text-secondary'>Expiry</span> Items</h2>
        {
            nearlyExpiry.length<=0 && 
            <div className='mt-4 bg-white p-5 shadow-md'>
                <p className='text-2xl font-medium text-center text-primary'>NO Nearly Expiry Food Yet</p>
            </div>
        }
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                {
                nearlyExpiry.map((food)=>(
                    <div key={food._id} className="card bg-white shadow-xl transition-transform hover:scale-105 p-4 rounded-xl">
                        <img
                  src={food.photo}
                  alt=""
                  className="w-full h-[200px] object-cover rounded-xl"
                />
             
              <div className="card-body  ">
                <h3 className="card-title">{food.title}</h3>
                <p className="text-sm text-gray-700  mb-1">{food.description}</p>
                <p className="text-sm text-gray-500 ">Category: <span className="font-medium">{food.category}</span></p>
                <p className="text-sm text-gray-500 ">Quantity: <span className="font-medium">{food.quantity}</span></p>
                <p className="text-sm text-gray-500 ">Expiry Date: <span className="font-medium">{food.expirydate}</span></p>
               <Link to={`/fridge/${food._id}`}> <button className="btn btn-sm btn-primary  mt-4 cursor-pointer hover:bg-accent duration-200 border-none py-5">
                  See Details
                </button></Link>
              </div>
                    </div>
                ))
              }
              </div>
    </motion.section>
  )
}

export default NearlyExpiryItems