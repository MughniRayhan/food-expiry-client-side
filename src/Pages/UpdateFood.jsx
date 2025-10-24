import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import axios from "axios";
import UseAuth from "@/Hooks/UseAuth";

function UpdateFood({ food, onUpdate }) {
  const { user } = UseAuth();
  const [foodData, setFoodData] = useState(food);
  const [imageUrl, setImageUrl] = useState(food?.photo || "");
  const [uploading, setUploading] = useState(false);

  if (!foodData) return <Loader />;

  // Upload image to ImgBB
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;

    try {
      setUploading(true);
      const res = await axios.post(uploadUrl, formData);
      setImageUrl(res.data.data.display_url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // Update food
  const handleUpdateFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());

    // Attach uploaded image URL
    updatedFood.photo = imageUrl;

    try {
      const res = await fetch(
        `https://food-expiry-server-side.vercel.app/foods/${foodData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFood),
        }
      );
      const data = await res.json();
      if (data.modifiedCount) {
        toast.success("Food updated successfully!");
        setFoodData({ ...foodData, ...updatedFood });
        if (onUpdate) onUpdate({ ...foodData, ...updatedFood });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update food");
    }
  };

  return (
    <div className="">
      <h3 className="text-4xl font-semibold text-center mx-auto text-accent pb-3">
        Update Food
      </h3>

      <form className="w-full" onSubmit={handleUpdateFood}>
        <fieldset className="fieldset border-none w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Image Upload */}
          <div className="flex flex-col gap-4">
            <label className="label text-accent/80 text-base font-semibold">
              Food Image
            </label>
            <input
              type="file"
              onChange={handleUploadImage}
              className="file-input file-input-bordered  bg-base-100 
                         file:bg-secondary dark:file:bg-green-200 file:border-none file:px-4 file:py-2 file:text-white dark:file:text-green-800 file:rounded file:cursor-pointer"
            />
            {uploading ? (
              <p className="text-sm text-gray-500">Uploading image...</p>
            ) : (
              imageUrl && (
                <img
                  src={imageUrl}
                  alt="Food"
                  className="w-32 h-32 object-cover rounded-md mt-2"
                />
              )
            )}
          </div>

          {/* Food Title */}
          <div className="flex flex-col gap-4">
            <label className="label text-accent/80 text-base font-semibold">
              Food Title
            </label>
            <input
              type="text"
              className="input w-full text-gray-500"
              name="title"
              placeholder="Enter Food Title"
              defaultValue={foodData.title}
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-4">
            <label className="label text-accent/80 text-base font-semibold">
              Category
            </label>
            <select
              className="w-full bg-base-100 select text-gray-500"
              name="category"
              defaultValue={foodData.category}
              required
            >
              <option value="">Select Category</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="vegetables">Vegetables</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-4">
            <label className="label text-accent/80 text-base font-semibold">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              className="input w-full text-gray-500"
              name="quantity"
              defaultValue={foodData.quantity}
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col gap-4">
            <label className="label text-accent/80 text-base font-semibold">
              Expiry Date
            </label>
            <input
              type="date"
              className="input w-full text-gray-500"
              name="expirydate"
              defaultValue={foodData.expirydate}
              required
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="label text-accent/80 text-base font-semibold">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full text-gray-500"
              defaultValue={foodData.description}
              required
            ></textarea>
          </div>

          {/* User Email */}
          <div className="flex flex-col gap-4">
            <label className="label text-accent/80 text-base font-semibold">
              User Email
            </label>
            <input
              type="email"
              className="input w-full text-gray-500"
              name="email"
              readOnly
              defaultValue={user ? user.email : ""}
            />
          </div>
        </fieldset>

        <input
          type="submit"
          className="w-full mt-5 bg-primary text-xl text-white font-semibold cursor-pointer py-[13px] rounded-xl hover:bg-white hover:border-2 hover:border-secondary hover:text-primary duration-200"
          value="Update Food"
        />
      </form>
    </div>
  );
}

export default UpdateFood;
