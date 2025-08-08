import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

function ExpiredFood() {
    const [foods, setFoods] = useState([]);
     const today = new Date();

     useEffect(() => {
    fetch("https://food-expiry-server-side.vercel.app/foods")
      .then(res => res.json())
      .then(data => {setFoods(data)});
  }, [])

     const expiredFood = foods.filter((food)=>new Date(food.expirydate) < today); 
  return (
    <motion.section 
               initial={{opacity:0, y:50}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.2, duration:1}}  className='py-20 md:px-30 px-4  bg-base-300 text-base w-full '>
        <h2 className='text-center text-3xl text-accent font-semibold'>Expired <span className='text-secondary'>Food</span></h2>
        <div className="p-2 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {
                expiredFood.slice(0,6).map((food)=>
                 <div key={food._id} className="card  shadow-2xl bg-[#003049] mx-auto sm:mt-4  border border-gray-100 pb-4">
  <figure className='h-40'>
    <img
      src={food.photo}
      alt={food.title} />
  </figure>
  <div className=" p-4">
    <h2 className="card-title  sm:text-xl text-base text-white  mb-2">{food.title}</h2>
    <p className="text-sm text-white duration-200">Category: <span className="font-medium">{food.category}</span></p>
    <p className="text-sm text-white duration-200 my-1">Quantity: <span className="font-medium">{food.quantity}</span></p>
    
    <div className="badge bg-primary dark:bg-[#c71f37] text-white p-3">
      <div className="inline-grid *:[grid-area:1/1]">
  <div className="status status-error animate-ping"></div>
  <div className="status status-error"></div>
</div>Expired
    </div>
   
  </div>
</div>
                )
            }
        </div>
    </motion.section>
  )
}

export default ExpiredFood