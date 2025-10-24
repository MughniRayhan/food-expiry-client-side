import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Loader from "@/Components/Loader";
import AITipButton from "@/Components/AITipButton/AITipButton";

function Fridge() {
  const initialFoods = useLoaderData();
  const today = new Date();
  const [foods, setFoods] = useState(initialFoods);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(initialFoods.map((f) => f.category))];

  // --- Search ---
  const handleSearch = async (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) {
      setFoods(initialFoods);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://food-expiry-server-side.vercel.app/foods/search?q=${query}`
      );
      const data = await res.json();
      setFoods(data);
      setSelectedCategory("All");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Filter ---
  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

  // --- Count ---
  const expiredFood = filteredFoods.filter(
    (food) => new Date(food.expirydate) < today
  ).length;
  const nearlyExpired = filteredFoods.filter((food) => {
    const expiryDate = new Date(food.expirydate);
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5);
    return expiryDate >= today && expiryDate <= fiveDaysLater;
  }).length;

  return (
    <div className="p-10 md:px-20 px-4 mt-20 min-h-screen ">
      {/* Search + Filter */}
      <div className="flex justify-center gap-3 flex-wrap mb-6">
        <form onSubmit={handleSearch} className="w-full sm:w-[50%]">
          <label className="input w-full flex items-center gap-2  border border-gray-700 rounded-xl px-4 py-2 backdrop-blur-md">
            <svg
              className="h-[1em] opacity-70 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow bg-transparent focus:outline-none  "
              placeholder="Search by category or title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </form>

        <div className="mb-4 text-center sm:w-[20%] w-full">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full  border-gray-700"
          >
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <Loader />
      ) : filteredFoods.length === 0 ? (
        <p className="font-medium text-gray-400 text-center mt-10">
          No Foods Found
        </p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-600 to-red-400 text-white rounded-2xl p-5 w-52 text-center shadow-lg shadow-red-900/40"
            >
              <h2 className="text-3xl font-extrabold">
                <CountUp start={0} end={expiredFood} duration={2.5} />+
              </h2>
              <p className="opacity-80 font-medium mt-1">Expired Food</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white rounded-2xl p-5 w-52 text-center shadow-lg shadow-yellow-900/40"
            >
              <h2 className="text-3xl font-extrabold">
                <CountUp start={0} end={nearlyExpired} duration={2.5} />+
              </h2>
              <p className="opacity-80 font-medium mt-1">Nearly Expiry Food</p>
            </motion.div>
          </div>

          {/* Food Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredFoods.map((food, index) => {
              const isExpired = new Date(food.expirydate) < today;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <figure className="h-44 overflow-hidden">
                    <img
                      src={food.photo}
                      alt={food.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </figure>

                  <div className="p-5 text-gray-200">
                    <h2 className="text-lg font-bold text-cyan-400 mb-2">
                      {food.title}
                    </h2>
                    <p className="text-sm opacity-80">
                      Category: <span>{food.category}</span>
                    </p>
                    <p className="text-sm opacity-80">
                      Quantity: <span>{food.quantity}</span>
                    </p>

                    {isExpired && (
                      <div className="badge badge-error text-white p-2 mt-2">
                        Expired
                      </div>
                    )}

                    {/* AI Tip Button with sliding tip */}
                    <div className="mt-3">
                      <AITipButton
                        foodName={food.title}
                        expiryDate={food.expirydate}
                      />
                    </div>

                    <div className="mt-4">
                      <Link to={`/fridge/${food._id}`}>
                        <button className="btn btn-outline w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900">
                          See Details
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Subtle AI Glow Ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-cyan-400 rounded-2xl opacity-0 pointer-events-none"
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Fridge;
