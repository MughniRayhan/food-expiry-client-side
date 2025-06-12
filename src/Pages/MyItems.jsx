import React, { use, useState } from 'react'
import { Link, useLoaderData } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import UpdateFood from '../Components/UpdateFood';

function MyItems() {
  const allFoods = useLoaderData();
  const {user} = use(AuthContext);
  // const [selectedFood, setSelectedFood] = useState(null);
  
  const myFoods = allFoods.filter((food)=>food.email === user.email);
  return (
    <div className="overflow-x-auto bg-accent p-20 pt-30">
  <table className="table bg-white">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Product</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Expired Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        myFoods.map((data,i)=>(
          <tr key={i}>
        <th>{i}</th>
        <td> 
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={data.photo}
                  alt="" />
              </div>
            </div>
              <div className="font-bold">{data.title}</div>
          </div>
          </td>
        <td>{data.category}</td>
        <td>{data.quantity}</td>
        <td>{data.expirydate}</td>
        <td>
          <div className='flex  items-center gap-4'>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="bg-secondary text-white p-2 rounded-md cursor-pointer hover:bg-primary"
  onClick={() => {
    document.getElementById(`modal-${data._id}`).showModal();
  }}
>
  <MdEdit />
</button>

<dialog id={`modal-${data._id}`} className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <UpdateFood key={data._id} food={data} />
  </div>
</dialog>
            <button className='bg-secondary text-white p-2 rounded-md cursor-pointer hover:bg-primary'><MdDelete /></button>
          </div>
        </td>
      </tr>
        ))
      }
      
     
    </tbody>
  </table>
</div>
  )
}

export default MyItems