import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader';

const AllFoods = () => {
  const axiosSecure = UseAxiosSecure();

  // fetch all foods
  const { data: foods = [], isLoading, refetch } = useQuery({
    queryKey: ['allFoods'],
    queryFn: async () => {
      const res = await axiosSecure.get('/foods');
      return res.data;
    },
  });

  // delete food
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This food item will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/foods/${id}`);
          Swal.fire('Deleted!', 'Food item has been deleted.', 'success');
          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'Failed to delete food item.', 'error');
        }
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-12 py-10 bg-base-100 shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-accent mb-4">All Foods</h2>

      <div className="overflow-x-auto border bg-base-200 border-gray-300 rounded-lg mt-6">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-300 dark:text-white">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Added Date</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={food._id}>
                <td>{index + 1}</td>
                <td>{food.title}</td>
                <td>{food.category}</td>
                <td>{food.addedDate || 'N/A'}</td>
                <td>{food.expirydate || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {foods.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFoods;
