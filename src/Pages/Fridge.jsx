import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router';
import Loader from '../Components/Loader';


function Fridge() {
  const initialFoods = useLoaderData();
  const today = new Date();
  const [foods,setFoods] = useState(initialFoods)
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

 
      const handleSearch = async (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query){
      setFoods(initialFoods)
      return 
    };

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/foods/search?q=${query}`);
      const data = await res.json();
      setFoods(data);
    
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10 md:px-20 px-4 mt-20 bg-base-300'>
      
            <form onSubmit={handleSearch} className="flex justify-center">
        <label className="input w-full max-w-xl flex items-center gap-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search by category or title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>

       {
        loading ? <Loader/>
        :
        <div >
           {
            foods.length===0 ? 
            <p className='font-medium text-secondary text-center mt-10'>No Foods Found</p>
            :
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {
      foods.map((food, index) => {
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
           }
    </div>
       }
    </div>
  )
}

export default Fridge