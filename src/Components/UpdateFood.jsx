import React, { use, useState } from 'react'
//import { useLoaderData } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import Loader from './Loader';

function UpdateFood({food}) {
    // const food = useLoaderData();
    const {user} = use(AuthContext);
     
    if (!food) {
    return <Loader/>;
  }
      

    const handleUpdateFood = (e) =>{
          e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const updatedFood = Object.fromEntries(formData.entries());

      fetch(`http://localhost:3000/foods/${food._id}`, {
                       method: 'PUT',
                       headers: {
                           'Content-Type': 'application/json'
                       },
                       body: JSON.stringify(updatedFood)
                   })
                   .then(res => res.json())
                   .then(data => {
                       if(data.modifiedCount) {
                          toast.success("Updated food successfully!");
                          
                       }
                      
                   })
    }

  return (
     <div className=''>

            <h3 className='text-4xl font-semibold text-center mx-auto text-accent pb-3'>Update Food</h3>
            
            <form  className='w-full '  onSubmit={handleUpdateFood}>
                <fieldset className="fieldset border-none w-full   p-4 grid grid-cols-1 md:grid-cols-2 gap-5 ">
                 
                 
                 <div className='flex flex-col gap-4'> 
                 <label className="label text-[#1B1A1A]/[80%] text-base font-semibold">Food Image</label>
                 <input type="text"  className="input w-full "  placeholder="Enter photo URL" defaultValue={food.photo}
                 name='photo' 
                 />
                 </div>

                     <div className='flex flex-col gap-4'> 
                 <label className="label text-[#1B1A1A]/[80%] text-base  font-semibold">Food Title</label>
                 <input type="text"  className="input w-full"  name='title' placeholder="Enter Food Title" defaultValue={food.title}/>
                 </div>

                  <div className='flex flex-col gap-4'> 
                 <label className="label text-[#1B1A1A]/[80%] text-base  font-semibold">Category</label>
                 <select className="w-full bg-base-100 select" name='category' placeholder="Enter Category" defaultValue={food.category}>
                  <option value="">{food.category}</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="snacks">Snacks</option>
                 </select>
                 </div>

                  <div className='flex flex-col gap-4'> 
                 <label className="label text-[#1B1A1A]/[80%]  text-base font-semibold">Quantity</label>
                 <input type="number" min="1" className="input w-full"  name='quantity' placeholder="Enter Quantity" defaultValue={food.quantity}/>
                 </div>
                 
                  <div className='flex flex-col gap-4'> 
                 <label className="label text-[#1B1A1A]/[80%]  text-base font-semibold">Expiry Date</label>
                 <input type="date"  className="input w-full"  name='expirydate' placeholder="Enter Expiry Date" defaultValue={food.expirydate}/>
                 </div>

                <div className=' w-full'> 
                 
                  <textarea
                  name="description"
                  placeholder="Description"
                  
                  className="textarea textarea-bordered w-full "
                  defaultValue={food.description}
                  ></textarea>
                 </div>

                   

                   <div className='flex flex-col gap-4'> 
                 <label className="label text-[#1B1A1A]/[80%]  text-base font-semibold">User Email</label>
                 <input type="email"  className="input w-full"  name='email' readOnly defaultValue={user ? user.email : ""} />
                 </div>
                   
                
                 
 
</fieldset>
               

                 <input type="submit" className="w-full mt-5 bg-primary text-xl text-white font-semibold cursor-pointer py-[13px] rounded-xl hover:bg-white hover:border-2 hover:border-secondary hover:text-primary duration-200"   value=" Update Food " />
            </form>
       
    </div>
  )
}

export default UpdateFood