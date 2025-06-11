import React from 'react'
import { useLoaderData } from 'react-router'

function FoodDetails() {
    const food = useLoaderData()
  return (
    <div className='p-30 '>
        <div className='w-[80%] mx-auto border border-accent/20 shadow-xl rounded-2xl p-5 flex flex-col md:flex-row justify-center items-center gap-5 bg-base-100'>
            <img src={food.photo} alt="" className='w-[300px] h-[300px] rounded-2xl' />
            <div className='flex flex-col '>
                <h2 className='sm:text-2xl text-accent font-semibold '>{food.title}</h2>
                 <p className="text-sm text-gray-700  mb-1">{food.description}</p>
                <p className="text-sm text-gray-500 ">Category: <span className="font-medium">{food.category}</span></p>
                <p className="text-sm text-gray-500 ">Quantity: <span className="font-medium">{food.quantity}</span></p>
                <p className="text-sm text-gray-500 ">Expiry Date: <span className="font-medium">{food.expirydate}</span></p>
               
            </div>

        </div>


    </div>
  )
}

export default FoodDetails