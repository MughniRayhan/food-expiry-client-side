import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router';
import Loader from '../Components/Loader';
import CountUp from 'react-countup';


function Fridge() {
  const initialFoods = useLoaderData();
  const today = new Date();
  const [foods,setFoods] = useState(initialFoods)
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState('All');
 const categories = ["All", ...new Set(initialFoods.map(f => f.category))]
  //  searching
      const handleSearch = async (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query){
      setFoods(initialFoods)
      return 
    };

    setLoading(true);
    try {
      const res = await fetch(`https://food-expiry-server-side.vercel.app/foods/search?q=${query}`);
      const data = await res.json();
      setFoods(data);
      setSelectedCategory('All');
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  // filter
const filteredFoods =
  selectedCategory === 'All'
      ? 
    foods
      : 
    foods.filter(food => food.category === selectedCategory);


// countup
  const expiredFood = filteredFoods.filter((food)=> new Date(food.expirydate) < today).length;
  const nearlyExpired = filteredFoods.filter((food)=>{
  const expiryDate = new Date(food.expirydate);
  const fiveDaysLater = new Date(today);
  fiveDaysLater.setDate(today.getDate()+5);
  return expiryDate >= today && expiryDate <=fiveDaysLater
}).length;

  return (
    <div className='p-10 md:px-20 px-4 mt-20 bg-base-300'>
      
<div className='flex justify-center gap-3'>
            <form onSubmit={handleSearch} className='w-[50%]'>
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

           <div className="mb-4 text-center w-[20%]">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          {categories.map((cat,i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>
</div>



       {
        loading ? <Loader/>
        :
        <div >
           {
            filteredFoods.length===0 ? 
            <p className='font-medium text-secondary text-center mt-10'>No Foods Found</p>
            :
<>
<div className='flex sm:flex-row flex-col flex-wrap justify-center items-center gap-5 mt-4'>
          <div className='bg-white rounded-2xl p-5 w-50 text-center'>
           <h2 className=' text-3xl font-extrabold '>
          <CountUp
           start={0}
           end={expiredFood}
           duration={2.75}/>+
           </h2>
          <p className='text-[#0F0F0F]/[60%]  font-semibold mt-2'> Expired Food </p>
            </div>

           <div className='bg-white rounded-2xl p-5  w-50 text-center'>
           <h2 className=' text-3xl font-extrabold '>
          <CountUp
           start={0}
           end={nearlyExpired}
           duration={2.75}/>+
           </h2>
          <p className='text-[#0F0F0F]/[60%]  font-semibold mt-2'>Nearly Expiry Food </p>
            </div>

            
        </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {
      filteredFoods.map((food, index) => {
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
    </>
      
           }
    </div>
       }
    </div>
  )
}

export default Fridge