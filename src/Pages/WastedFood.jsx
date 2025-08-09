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
    <div className="  p-4 py-28 bg-base-300">
      <h2 className='text-3xl font-semibold text-center mx-auto text-accent pb-3'>Wasted Foods </h2>
      <div className="max-w-7xl mx-auto mt-4">
        {wastedItems.length === 0 ? (
        <p>No wasted food items found.</p>
      ) : (
        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
          {wastedItems.slice(0,9).map((item) => (
            <li
              key={item._id}
              className=" p-6 text-center shadow-sm bg-white rounded-xl"
            >
              <img src={item.photo} alt="" className="w-full h-[200px] object-cover rounded-xl"/>
              <p className="text-[#003049] text-lg font-semibold"> {item.title}</p>
              <p className="text-gray-700 text-base ">Category: {item.category}</p>
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
