import { useEffect, useState } from "react";

const WastedFood = () => {
  const [wastedItems, setWastedItems] = useState([]);

  useEffect(() => {
    fetch("https://food-expiry-server-side.vercel.app/wasted-food")
      .then((res) => res.json())
      .then((data) => setWastedItems(data))
      .catch((err) => console.error("Error fetching wasted food:", err));
  }, []);

  return (
    <div className="  p-4 mt-20 bg-base-300">
      <h2 className='text-4xl font-semibold text-center mx-auto text-accent pb-3'>Wasted Food Tracker</h2>
      <div className="max-w-7xl mx-auto mt-4">
        {wastedItems.length === 0 ? (
        <p>No wasted food items found.</p>
      ) : (
        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
          {wastedItems.map((item) => (
            <li
              key={item._id}
              className=" p-6 text-center shadow-sm bg-white rounded-xl"
            >
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-accent text-xl ">Category: {item.category}</p>
              <p className="text-secondary">Expired on: {item.expirydate}</p>
              <p className="text-sm text-gray-600">Reason: {item.reason || "Not specified"}</p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default WastedFood;
