import React, { use, useState } from 'react'
import { Link, useLoaderData } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import UpdateFood from '../Components/UpdateFood';
import Swal from 'sweetalert2';

function MyItems() {
  const allFoods = useLoaderData();
 
  const {user} = use(AuthContext);
  
  const myFoods = allFoods.filter((food)=>food.email === user.email);
  const [foods,setFoods] = useState(myFoods)

  const handleDelete = (id) =>{
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://food-expiry-server-side.vercel.app/foods/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount) {
         Swal.fire({
        title: "Deleted!",
        text: "Your food has been deleted.",
        icon: "success"
      });
  
      const remainingFoods = foods.filter(food => food._id !== id);
      setFoods(remainingFoods);
        }
      })
     
    }
  });
  
  }

  
  return (
    <div className="overflow-x-auto bg-accent p-20 pt-30">
      {
        foods.length<=0 && <h3 className='text-xl text-center text-white mb-3'>No Items added</h3>
      }
  <table className="table bg-white">
    
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
        foods.map((data,i)=>(
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
    <UpdateFood food={data} onUpdate={(updatedFood) => {
      const updatedList = foods.map(f =>
        f._id === data._id ? { ...f, ...updatedFood } : f
      );
      setFoods(updatedList);
    }} />
  </div>
</dialog>
            <button className='bg-secondary text-white p-2 rounded-md cursor-pointer hover:bg-primary'
            onClick={()=>handleDelete(data._id)}
            >
              <MdDelete />
            </button>
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
export default MyItems;