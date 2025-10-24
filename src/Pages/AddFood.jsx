import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../Providers/AuthProvider'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';

function AddFood() {
  const {user} = use(AuthContext);
  const [today,setToday] = useState('');
  const [profile,setProfile] = useState('');
  const navigate = useNavigate();

  // current date 
    useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setToday(`${year}-${month}-${day}`);
  }, []);

const handleAddFood = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const newFood = Object.fromEntries(formData.entries());

  // Attach uploaded image URL
  newFood.photo = profile;

  try {
    const res = await fetch('https://food-expiry-server-side.vercel.app/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFood),
    });
    const data = await res.json();
    if (data.insertedId) {
      toast.success("Food added successfully!");
      navigate('/myitems');
    }
  } catch (err) {
    toast.error("Failed to add food");
    console.error(err);
  }
};


 const handleUploadImage = async (e) => {
  const image = e.target.files[0];
  const formData = new FormData();
  formData.append('image', image);

  const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;

  try {
    const res = await axios.post(uploadUrl, formData);
    setProfile(res.data.data.display_url); 
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};


  return (
    <div className=' md:px-[112px] py-20 px-4 bg-base-300'>
<div className='max-w-7xl mx-auto md:px-[112px] px-4 py-[70px] bg-base-100  rounded-xl shadow-lg shadow-black mt-10'>
            <h3 className='text-4xl font-semibold text-center mx-auto text-accent pb-3'>Add New Food</h3>
            
            <form  className='w-full '  onSubmit={handleAddFood}>
                <fieldset className="fieldset border-none w-full   p-4 grid grid-cols-1 md:grid-cols-2 gap-5 ">
                 
                 
                 <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80 text-base font-semibold">Food Image</label>
                 <input
  type="file"
  onChange={handleUploadImage}
  name="photo"
  className="file-input file-input-bordered  bg-base-100 
             file:bg-secondary dark:file:bg-green-200 file:border-none file:px-4 file:py-2 file:text-accdark:file:text-green-800 file:rounded file:cursor-pointer"
/>
                 </div>

                     <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80 text-base  font-semibold">Food Title</label>
                 <input type="text"  className="input w-full"  name='title' placeholder="Enter Food Title" required />
                 </div>

                  <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80 text-base  font-semibold">Category</label>
                 <select className="w-full bg-base-100 select" name='category' placeholder="Enter Category" required>
                  <option value="">Select Category</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="snacks">Snacks</option>
                 </select>
                 </div>

                  <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80  text-base font-semibold">Quantity</label>
                 <input type="number" min="1" className="input w-full"  name='quantity' placeholder="Enter Quantity" required/>
                 </div>
                 
                  <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80  text-base font-semibold">Expiry Date</label>
                 <input type="date"  className="input w-full"  name='expirydate' placeholder="Enter Expiry Date" required/>
                 </div>

                <div className=' w-full'> 
                 
                  <textarea
                  name="description"
                  placeholder="Description"
                  
                  className="textarea textarea-bordered w-full "
                  required
                  ></textarea>
                 </div>

                   <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80  text-base font-semibold">Added Date</label>
                 <input type="date" name="addedDate" value={today} className="input w-full"  readOnly  />
                 </div>

                   <div className='flex flex-col gap-4'> 
                 <label className="label text-accent/80  text-base font-semibold">User Email</label>
                 <input type="email"  className="input w-full"  name='email' readOnly defaultValue={user ? user.email : ""} />
                 </div>
                   
                
                 
 
</fieldset>
               

                 <input type="submit" className="w-full mt-5 bg-primary text-xl text-white font-semibold cursor-pointer py-[13px] rounded-xl hover:bg-white hover:border-2 hover:border-secondary hover:text-primary duration-200"   value=" Add Food " />
            </form>
        </div>
    </div>
  )
}

export default AddFood