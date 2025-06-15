import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"

function FoodUsageSuggestions() {
  const [foods, setFoods] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/nearly-expiry")
      .then(res => res.json())
      .then(data => {
        const today = new Date();
        const twoDaysLater = new Date();
        twoDaysLater.setDate(today.getDate() + 2);

        const nearlyExpiring = data.filter(food => {
          const expDate = new Date(food.expirydate);
          return expDate >= today && expDate <= twoDaysLater;
        }).slice(0,3); 
        

        
        const enriched = nearlyExpiring.map(food => ({
          ...food,
          suggestion: food.category === 'vegetables' ? 'Use in stir fry or curry' :
                       food.category === 'snacks' ? 'Make a smoothie or salad' :
                       food.category === 'dairy' ? 'Use in baking or make sauces' :
                       'Check for creative recipes online'
        }));

        setFoods(enriched);
        setSuggestions(enriched);
      });
  }, []);

  return (
    <motion.section 
               initial={{opacity:0, y:50}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.2, duration:1}}  className='py-20 md:px-30 px-4  bg-base-200 text-base w-full'>
      <h2 className='text-center text-3xl text-accent font-semibold mb-2'>Food Usage <span className='text-secondary'>Suggestions</span></h2>
      <p className=' text-center text-primary/80  font-semibold'>These foods will expire soon. Use them quickly</p>
      <p className="text-center text-gray-500 mb-6">Get ideas to use foods before they expire</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {
        suggestions.map((food, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-xl">
            <img src={food.photo} alt={food.title} className="h-32 w-full object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2 text-accent">{food.title}</h3>
            <p className='text-secondary'>Expires on: <span className='text-gray-600'>{food.expirydate}</span></p>
            <p className="mt-2  text-gray-700 font-semibold">Suggestion: <span className="font-medium text-green-700 italic">"{food.suggestion}"</span></p>
          </div>
        ))
        }
      </div>
    </motion.section>
  );
}

export default FoodUsageSuggestions;
