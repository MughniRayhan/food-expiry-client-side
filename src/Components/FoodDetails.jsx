import React, { use, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider';

function FoodDetails() {
    const food = useLoaderData();
    const {user} = use(AuthContext)
    const [note,setNote] = useState("");
    const [notesList, setNotesList] = useState([]);
    const isUser = food.email === user.email

    useEffect(() => {
  if (food.notes) {
    setNotesList(food.notes);
  }
}, [food]);

    const handleAddNote = () =>{
       const newNote = {
      text: note,
      date: new Date().toISOString(),
    };

    fetch(`http://localhost:3000/foods/${food._id}/notes`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
    },
      body: JSON.stringify({ note: newNote, email: user.email })
    })
    .then(res => res.json())
    .then(data => {
      setNotesList(prev => [...prev, newNote]);
      setNote('');
    });

    }

  return (
    <div className='sm:p-30 py-20 px-4  bg-base-200'>
        <div className='md:w-[80%] w-full mx-auto border border-accent/20 shadow-xl rounded-2xl p-5 flex flex-col md:flex-row justify-center items-center gap-5 bg-base-100'>
            <img src={food.photo} alt="" className='sm:w-[300px] w-full sm:h-[300px] h-60 rounded-2xl' />
            <div className='flex flex-col '>
                <h2 className='sm:text-2xl text-accent font-semibold '>{food.title}</h2>
                 <p className="text-sm text-gray-700  mb-1">{food.description}</p>
                <p className="text-sm text-gray-500 ">Category: <span className="font-medium">{food.category}</span></p>
                <p className="text-sm text-gray-500 ">Quantity: <span className="font-medium">{food.quantity}</span></p>
                <p className="text-sm text-gray-500 ">Expiry Date: <span className="font-medium">{food.expirydate}</span></p>
            </div>
        </div>

        {/* add note section */}
       <div className='py-20 sm:w-[80%] w-full mx-auto px-3'>
         <textarea
          rows={4}
          className="textarea textarea-bordered w-full  mb-2"
          placeholder="Write your note here..."
          value={note}
          onChange={(e)=>setNote(e.target.value)}
        ></textarea>

        <button className="btn  bg-accent text-white mt-2" 
        onClick={handleAddNote}
        disabled={!isUser}
        >
            Add Note
        </button>

        {!isUser && (
          <p className="text-sm text-secondary/70 mt-2">You are not allowed to add a note for this item.</p>
        )}

  <div className='mt-4'>
        {
            notesList.map((note,index)=>(
                <div key={index} className='flex gap-5 justify-between bg-white border border-gray-200 rounded-2xl p-4 mt-2 sm:text-base text-sm'>
                    <p className=' font-medium'>{note.text}</p>
                    <p className='text-secondary'>Posted: {new Date(note.date).toLocaleDateString()}</p>
                </div>
            
            ))
        }
  </div>
       </div>
    </div>
  )
}

export default FoodDetails