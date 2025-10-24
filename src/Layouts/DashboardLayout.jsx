import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserCircle,
  FaBell,
  FaHourglassHalf,
  FaBoxOpen,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { BookOpen } from "lucide-react";
import NotificationBar from "@/Components/NotificationBar/NotificationBar";

function DashboardLayout() {
  const { role, roleLoading } = useUserRole();
  const { user, logOut } = useContext(AuthContext);

  // 🔐 Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* ========== MAIN CONTENT ========== */}
      <div className="drawer-content flex flex-col bg-base-100">
        {/* 🌐 Top Navbar (always visible) */}
        <div className="navbar bg-base-200 shadow-md sticky top-0 z-20">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          {/* Brand */}
          <div className="flex-1">
           
          </div>

          {/* Right side (Notification + Profile) */}
          <div className="flex items-center gap-4 mr-4">
            {/* 🔔 Notifications */}
            <div className="relative cursor-pointer">
              <NotificationBar userEmail={user.email} />
             
            </div>

            {/* 👤 Profile dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" />
                  ) : (
                    <FaUserCircle className="text-3xl text-accent" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-48"
              >
                <li>
                  <Link to="/dashboard/myProfile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Outlet Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ========== SIDEBAR ========== */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-accent/10 min-h-full sm:w-80 w-[80%] p-4">
          <div className="mb-4 hidden lg:block border-b border-base-100/30 pb-4">
            <Link to="/" className="flex items-center ">
              <img
                className="w-10"
                src="https://i.ibb.co/d4vsqLQP/icons8-street-food-48.png"
                alt=""
              />
              <h2 className="text-base sm:text-2xl text-accent font-bold">
                Food<span className="text-primary">Guard</span>
              </h2>
            </Link>
          </div>

          <NavLink to="/dashboard" className=" flex items-center gap-2 mt-5 text-lg">
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/myProfile" className="dashboard_page flex items-center gap-2 mt-5 text-lg">
            <FaUserCircle /> My Profile
          </NavLink>

          <NavLink to="/dashboard/nearly-expiry-items" className="dashboard_page flex items-center gap-2 mt-5 text-lg">
            <FaHourglassHalf /> Nearly Expiry Items
          </NavLink>

          <NavLink to="/dashboard/saved-recipes" className="dashboard_page flex items-center gap-2 mt-5 text-lg">
            <BookOpen /> Saved Recipes
          </NavLink>

          {!roleLoading && role === "admin" && (
            <>
              <NavLink to="/dashboard/allUsers" className="dashboard_page flex items-center gap-2 mt-5 text-lg">
                <FaUsers /> All Users
              </NavLink>

              <NavLink to="/dashboard/allFoods" className="dashboard_page flex items-center gap-2 mt-5 text-lg">
                  <FaBoxOpen /> All Foods
               </NavLink>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;
