import React from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

const Faq = () => {
  const faqs = [
    {
      q: "How does the Food Expiry Management System work?",
      a: "Our system helps you track your food items, notifies you before they expire, and allows you to manage wasted or donated food efficiently.",
    },
    {
      q: "Can I add custom reminder times for expiry alerts?",
      a: "Yes! You can set personalized reminder times from the Smart Reminder settings to receive alerts before items expire.",
    },
    {
      q: "How do I update or delete a food item?",
      a: "Go to your dashboard, find the item you want to edit, and use the edit or delete button next to it.",
    },
    {
      q: "Is my data secure in this system?",
      a: "Absolutely. We use Firebase Authentication and secure API routes to protect your personal and food inventory data.",
    },
    {
      q: "Can I access my account from multiple devices?",
      a: "Yes, your account is synced across all devices. You can log in anytime from any device using your credentials.",
    },
  ];

  return (
    <motion.section 
                   initial={{opacity:0, y:50}}
                    whileInView={{opacity:1, y:0}}
                    transition={{delay:0.2, duration:1}}  
                    className='py-20 md:px-30 px-4  bg-base-200 text-base w-full'>
          <h2 className='text-center text-3xl text-accent font-semibold mb-2'>
            Frequently <span className='text-secondary'>Asked</span> Questions
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Got questions? We’ve got answers to help you make the most of our system.
          </p>
       
        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="collapse collapse-arrow bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-lg"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-semibold text-gray-800 text-lg">
                {faq.q}
              </div>
              <div className="collapse-content text-gray-600 text-sm leading-relaxed">
                {faq.a}
              </div>
            </motion.div>
          ))}
        </div>
     
    </motion.section>
  );
};

export default Faq;
