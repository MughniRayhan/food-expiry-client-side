import React from 'react';
//import { AuthContext } from '../Providers/AuthProvider';

function StorageTips() {
  const tips = [
    "Store fruits and vegetables separately to avoid premature ripening.",
    "Use clear containers or labels to easily identify stored items.",
    "Keep your fridge between 1°C – 4°C (34°F – 39°F) for optimal freshness.",
    "Freeze perishable items if you can’t consume them soon.",
    "Organize by expiry date — oldest items in front, newest in the back.",
    "Avoid overfilling the fridge to ensure air circulation.",
  ];

  return (
   <section className='py-20   bg-base-200 text-base w-full'>
     <h2 className='text-center text-3xl text-accent font-semibold mb-2'>Storage Tips & <span className='text-secondary'>Best Practices</span></h2>
     <div className=" py-16 px-6 mt-8" style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.9), rgba(17, 17, 17, 0.6)),url("https://i.ibb.co/21q7q76S/2149565225.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
     
      <div className='flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-8'>
        <ul className="max-w-3xl  list-disc pl-5 space-y-2 text-base sm:text-lg order-2 md:order-1">
        {tips.map((tip, index) => (
          <li key={index} className='text-white bg-accent/50 rounded-2xl p-4'>{tip}</li>
        ))}
      </ul>
      <img src="https://i.ibb.co/21q7q76S/2149565225.jpg" alt="" className='md:w-[40%] w-full rounded-md order-1 md:order-2'/>
      
      </div>
    </div>
   </section>
  );
}

export default StorageTips;
