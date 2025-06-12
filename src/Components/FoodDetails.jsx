import React, { use, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider';

function FoodDetails() {
    const food = useLoaderData();
    const {user} = use(AuthContext)
    const [note,setNote] = useState("");
    const [notesList, setNotesList] = useState([]);
    const [days,setDays] = useState(null)
    const [hours,setHours] = useState(null)
    const [minutes,setMinutes] = useState(null)
    const [seconds,setSeconds] = useState(null)
    const [isExpired,setIsExpired] = useState(false);
    const isUser = food.email === user.email
    

    // adding notes
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

    // countdown of expiry date
    useEffect(()=>{
      const interval = setInterval(()=>{
          const now = new Date().getTime();
          const expiry = new Date(food.expirydate).getTime();
          const difference = expiry - now;

          if(difference <= 0){
            setIsExpired(true);
            setDays("0"+0);
            setHours("0"+0);
            setMinutes("0"+0);
            setSeconds("0"+0);
            clearInterval(interval);
            return;
          }

          const daysLeft = Math.floor(difference / (1000*60*60*24));
          const hoursLeft = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
          const minutesLeft = Math.floor((difference % (1000*60*60)) / (1000*60));
          const secondsLeft = Math.floor((difference % (1000*60)) / 1000);

          setDays(()=> {return (daysLeft<10 ? "0"+daysLeft : daysLeft)});
          setHours(()=> {return (hoursLeft<10 ? "0"+hoursLeft : hoursLeft)});
          setMinutes(()=> {return (minutesLeft<10 ? "0"+minutesLeft : minutesLeft)});
          setSeconds(()=> {return (secondsLeft<10 ? "0"+secondsLeft : secondsLeft)});
         
          

      },1000);
      return ()=> clearInterval(interval);
    },[food.expirydate])

  return (
    <div className='sm:p-30 py-20 px-4  bg-base-200'>
        <div className='md:w-[80%] w-full mx-auto border border-accent/20 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-center items-center gap-5 bg-base-100'>
            <img src={food.photo} alt="" className='sm:w-[300px] w-full sm:h-[300px] h-60 rounded-2xl' />
            <div className='flex flex-col '>
                <h2 className='sm:text-2xl text-accent font-semibold '>{food.title}</h2>
                 <p className="text-sm text-gray-700  mb-1">{food.description}</p>
                <p className="text-sm text-gray-500 ">Category: <span className="font-medium">{food.category}</span></p>
                <p className="text-sm text-gray-500 ">Quantity: <span className="font-medium">{food.quantity}</span></p>
                <p className="text-sm text-gray-500 ">Expiry Date: <span className="font-medium">{food.expirydate}</span></p>
               {
                isExpired ? 
                <div>
                  <p className="badge badge-error text-base  text-white p-4 mt-4">Expired</p>
                
                    <div className='mt-4'>
                  <p className='text-secondary text-sm font-medium mb-1'>Time Left : </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4  text-center">
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{days}</p>
    <p className="text-sm uppercase">Days</p>
  </div>
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{hours}</p>
    <p className="text-sm uppercase">Hours</p>
  </div>
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{minutes}</p>
    <p className="text-sm uppercase">Minutes</p>
  </div>
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{seconds}</p>
    <p className="text-sm uppercase">Seconds</p>
  </div>
</div>
                </div>
                  </div>
                
                :
                <div className='mt-4'>
                  <p className='text-secondary text-sm font-medium mb-1'>Time Left : </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4  text-center">
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{days}</p>
    <p className="text-sm uppercase">Days</p>
  </div>
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{hours}</p>
    <p className="text-sm uppercase">Hours</p>
  </div>
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{minutes}</p>
    <p className="text-sm uppercase">Minutes</p>
  </div>
  <div className="bg-accent text-white p-4 rounded-xl shadow">
    <p className="text-3xl font-semibold">{seconds}</p>
    <p className="text-sm uppercase">Seconds</p>
  </div>
</div>
                </div>
               }
                
 
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