import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import Loader from '../../../Components/Loader';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/UseAuth';
import useUserRole from '../../../Hooks/useUserRole';

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const {role} = useUserRole()
  const { user } = UseAuth();
  const [search, setSearch] = useState('');
  // fetch all or search results
 const { data: users = [], isLoading, refetch, isFetching } = useQuery({
  queryKey: ['allUsers', search],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users?search=${search || ''}`);
    return res.data;
  },
  enabled: true, // fetch on mount
});


  // 🕒 Debounce effect to limit API calls while typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 400); // 0.4s delay
    return () => clearTimeout(timeout);
  }, [search, refetch]);

  // 🧩 Update user role (admin only)
  const handleRoleUpdate = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: `User role updated to ${newRole}`,
          icon: 'success',
        });
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update role',
        icon: 'error',
      });
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
  try {
    const res = await axiosSecure.patch(`/users/${id}/status`, { status: newStatus });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: 'Success!',
        text: `User status updated to ${newStatus}`,
        icon: 'success',
      });
      refetch();
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to update status',
      icon: 'error',
    });
  }
};


  if (isLoading || isFetching) return <Loader />;

  return (
    <div className="px-12 py-10 bg-base-100 shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-accent mb-4">All Users</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={() => refetch()}>
          <FaSearch /> Search
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border bg-base-200 border-gray-300 rounded-lg mt-6">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-300 dark:text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {users.map((u, index) => (
    <tr key={u._id} className={u.status === 'banned' ? 'opacity-50' : ''}>
      <td>{index + 1}</td>
      <td>{u.displayName}</td>
      <td>{u.email}</td>
      <td>
        <span className={`px-2 py-1 rounded text-sm ${
          u.status === 'banned' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'
        }`}>
          {u.status || 'active'}
        </span>
      </td>
      <td className="flex gap-2">
        {/* Change Role */}
        <select
          className="select select-bordered select-sm"
          value={u.role}
          onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Ban / Unban */}
        <button
          className={`btn btn-sm ${u.status === 'banned' ? 'btn-success' : 'btn-error'}`}
          onClick={() => handleStatusUpdate(u._id, u.status === 'banned' ? 'active' : 'banned')}
        >
          {u.status === 'banned' ? 'Unban' : 'Ban'}
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default AllUsers;
