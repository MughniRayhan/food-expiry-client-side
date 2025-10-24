import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ShoppingBasket, Refrigerator } from "lucide-react";

function Tips() {
  const tips = [
    {
      title: "Plan Your Meals 📝",
      desc: "Organize your weekly meals before shopping to avoid overbuying and wasting food.",
      icon: <ShoppingBasket size={28} className="text-green-500" />,
      color: "from-green-100 via-white to-green-50",
    },
    {
      title: "Store Leftovers Smartly 🧊",
      desc: "Keep leftovers in labeled containers and refrigerate them properly for freshness.",
      icon: <Refrigerator size={28} className="text-blue-500" />,
      color: "from-blue-100 via-white to-blue-50",
    },
    {
      title: "Use AI Tips 💡",
      desc: "Let our AI suggest creative recipes using items close to expiry — waste less, cook more!",
      icon: <Lightbulb size={28} className="text-yellow-500" />,
      color: "from-yellow-100 via-white to-yellow-50",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="py-20 md:px-30 px-4 bg-base-200 w-full"
    >
      <h2 className="text-center text-3xl text-accent font-semibold">
        Food Waste <span className="text-secondary">Awareness Tips 🌱</span>
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 mt-10">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`bg-gradient-to-br ${tip.color} shadow-lg backdrop-blur-md border border-gray-200 rounded-2xl p-6 hover:shadow-xl cursor-pointer relative overflow-hidden group`}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-green-200/30 to-transparent blur-xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="p-4 bg-white rounded-full shadow-md mb-4">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {tip.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Tips;
