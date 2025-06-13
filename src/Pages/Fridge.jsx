import React from 'react'
import { Link, useLoaderData } from 'react-router';

function Fridge() {
  const foods = useLoaderData();
  const today = new Date();

  return (
     <div className="p-10 md:px-20 px-4 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-base-300">
      
      {foods.map((food, index) => {
        const isExpired = new Date(food.expirydate) < today;

        return (
         <div key={index} className="card sm:w-96 w-full shadow-2xl bg-accent mx-auto sm:mt-4  border border-gray-100">
  <figure className='h-40'>
    <img
      src={food.photo}
      alt={food.title} />
  </figure>
  <div className=" p-4">
    <h2 className="card-title  sm:text-xl text-white  mb-2">{food.title}</h2>
    <p className="text-sm text-white duration-200">Category: <span className="font-medium">{food.category}</span></p>
    <p className="text-sm text-white duration-200 my-1">Quantity: <span className="font-medium">{food.quantity}</span></p>
    {
      isExpired && 
    <div className="badge badge-error text-white p-3">
      Expired
    </div>
    }
    <div className="card-actions sm:justify-end mt-5 sm:mt-0 ">
      <Link to={`/fridge/${food._id}`}><button className="btn btn-primary w-full sm:w-30 hover:bg-white hover:text-primary hover:border hover:border-primary">See Details</button></Link>
    </div>
  </div>
</div>
        );
      })}
    </div>
  )
}

export default Fridge