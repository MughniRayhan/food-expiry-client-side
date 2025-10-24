import React from "react";
import { motion } from "framer-motion";
import { Cpu, Utensils, AlertTriangle, Trash2 } from "lucide-react";

const features = [
   {
    icon: <Cpu className="w-8 h-8 text-indigo-500" />,
    title: "AI Tips for Foods",
    description:
      "Receive intelligent, AI-powered tips for your stored foods. Know the best ways to preserve freshness, avoid spoilage, and extend shelf life easily.",
  },
  {
    icon: <Utensils className="w-8 h-8 text-green-500" />,
    title: "AI Recipe Suggestions",
    description:
      "Get creative recipe ideas from AI using the ingredients you have. Reduce food waste and make delicious meals effortlessly with step-by-step instructions.",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
    title: "Food Tracking",
    description:
      "Track your groceries and their expiry dates in real time. Get notifications for foods nearing expiration and stay organized in your kitchen.",
  },
  {
    icon: <Trash2 className="w-8 h-8 text-red-500" />,
    title: "Reduce Wasted Foods",
    description:
      "By monitoring and acting on food nearing expiry, you can minimize waste. AI suggestions and recipes help you use ingredients before they spoil.",
  },
];

export default function FeaturesSection() {
  return (
    <motion.section 
               initial={{opacity:0, y:50}}
                    whileInView={{opacity:1, y:0}}
                    transition={{delay:0.2, duration:1}}  
                    className='py-20 md:px-30 px-4  bg-base-200 text-base w-full'>

            <h2 className='text-center text-3xl text-accent font-semibold mb-10'>
        App <span className="text-secondary">Features</span>
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col  "
          >
            <div className="flex items-center gap-3 mb-4">
                  <motion.div
                animate={{ y: [0, -8, 0, 8, 0] }} // float up and down
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 4 + i, // slightly different speed per icon
                  ease: "easeInOut",
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-accent">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
